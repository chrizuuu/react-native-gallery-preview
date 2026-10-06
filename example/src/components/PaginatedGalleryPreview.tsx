import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GalleryPreview, {
  type ImageItemURI,
} from "react-native-gallery-preview";
import { images } from "../images";
import { ExampleWrapper } from "./ExampleWrapper";

const TOTAL_IMAGES = 400;
const PAGE_SIZE = 20;
const LOAD_DELAY_MS = 5000;

const sleep = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

// Reuse the example sources to simulate a larger gallery.
const getImage = (index: number): ImageItemURI => {
  const source = images[index % images.length];
  return source ? { ...source, isLoading: false } : { isLoading: true };
};

const createInitialImages = (): ImageItemURI[] =>
  Array.from({ length: TOTAL_IMAGES }, (_, index) =>
    index < PAGE_SIZE ? getImage(index) : { isLoading: true },
  );

export const PaginatedGalleryPreview = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [galleryImages, setGalleryImages] = React.useState(createInitialImages);
  const loadedPages = React.useRef(new Set([0]));
  const pendingPages = React.useRef(new Set<number>());
  const session = React.useRef(0);

  React.useEffect(() => {
    return () => {
      // Ignore outstanding requests after this example unmounts.
      session.current += 1;
    };
  }, []);

  const loadPage = React.useCallback(async (pageIndex: number) => {
    if (
      pageIndex < 0 ||
      pageIndex >= Math.ceil(TOTAL_IMAGES / PAGE_SIZE) ||
      loadedPages.current.has(pageIndex) ||
      pendingPages.current.has(pageIndex)
    ) {
      return;
    }

    const requestSession = session.current;
    pendingPages.current.add(pageIndex);

    // Simulate fetching image URLs from an API.
    await sleep(LOAD_DELAY_MS);

    // A closed or reopened gallery must not receive an old response.
    if (requestSession !== session.current) return;

    const startIndex = pageIndex * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, TOTAL_IMAGES);

    setGalleryImages((current) =>
      current.map((item, index) =>
        index >= startIndex && index < endIndex ? getImage(index) : item,
      ),
    );

    pendingPages.current.delete(pageIndex);
    loadedPages.current.add(pageIndex);
  }, []);

  const handleIndexChange = React.useCallback(
    (index: number) => {
      loadPage(Math.floor(index / PAGE_SIZE));
    },
    [loadPage],
  );

  const handleOpen = React.useCallback(() => {
    session.current += 1;
    loadedPages.current = new Set([0]);
    pendingPages.current.clear();
    setGalleryImages(createInitialImages());
    setIsVisible(true);
  }, []);

  const handleClose = React.useCallback(() => {
    session.current += 1;
    pendingPages.current.clear();
    setIsVisible(false);
  }, []);

  const readyCount = galleryImages.filter(
    (item) => item.uri && !item.isLoading,
  ).length;

  return (
    <ExampleWrapper
      title="Gallery with delayed loading"
      buttonLabel="Open loading example"
      onPress={handleOpen}
    >
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          The first 20 photos are ready. Swipe past photo 20 to load the next
          batch in 5 seconds.
        </Text>
        <Text style={styles.readyCount}>
          Ready: {readyCount} / {TOTAL_IMAGES}
        </Text>
      </View>
      <GalleryPreview
        images={galleryImages}
        isVisible={isVisible}
        initialIndex={0}
        onRequestClose={handleClose}
        onChange={handleIndexChange}
      />
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  description: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 8,
  },
  descriptionText: {
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  readyCount: {
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
});

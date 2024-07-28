import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ExampleWrapper } from "./ExampleWrapper";
import { images } from "../images";
import GalleryPreview, {
  useGalleryPreview,
} from "react-native-gallery-preview";

export const OpenOnSpecificImageExample = () => {
  const { galleryPreviewState, openGalleryPreview, closeGalleryPreview } =
    useGalleryPreview();

  return (
    <ExampleWrapper title="Open on specific image">
      <View style={styles.imagesGallery}>
        {images.map((item, index) => (
          <ImageGalleryItem
            key={index}
            uri={item.uri}
            onPress={() => openGalleryPreview(index)}
          />
        ))}
      </View>
      <GalleryPreview
        images={images}
        isVisible={galleryPreviewState.isVisible}
        initialIndex={galleryPreviewState.initIndex}
        onRequestClose={closeGalleryPreview}
      />
    </ExampleWrapper>
  );
};

const ImageGalleryItem = ({
  uri,
  onPress,
}: {
  uri: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.image} src={uri} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
  },
  imagesGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 24,
  },
});

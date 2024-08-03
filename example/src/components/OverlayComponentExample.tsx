import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../images";
import { ExampleWrapper } from "./ExampleWrapper";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { GalleryPreview } from "../../../src/GalleryPreview";
import { GalleryHeaderProps } from "../../../src/types";

export const OverlayComponentExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpenImageViewer = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseImageViewer = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ExampleWrapper
      title="Gallery with OverlayComponent"
      buttonLabel="Open Gallery with OverlayComponent"
      onPress={handleOpenImageViewer}
    >
      <GalleryPreview
        isVisible={isVisible}
        onRequestClose={handleCloseImageViewer}
        images={images}
        OverlayComponent={CustomHeader}
      />
    </ExampleWrapper>
  );
};

const CustomHeader = (props: GalleryHeaderProps) => {
  if (!props.isFocused) {
    return null;
  }

  return (
    <>
      <Animated.View entering={SlideInUp} style={styles.headerContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>
              Preview: {props.currentImageIndex + 1}/{props.imagesLength}
            </Text>
            <TouchableOpacity
              onPress={props.onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonLabel}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <Animated.View entering={SlideInDown} style={styles.footerWrapper}>
        <SafeAreaView style={styles.footer}>
          <Text style={styles.footerText}>Gallery preview</Text>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    top: 0,
    position: "absolute",
    backgroundColor: "rgb(245,245,245)",
  },
  safeArea: {
    flexGrow: 1,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 54,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "rgb(36,36,36)",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonLabel: {
    fontSize: 20,
    color: "rgb(36,36,36)",
    fontWeight: "bold",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgb(245,245,245)",
  },
  footer: { marginHorizontal: 12, marginVertical: 12 },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "rgb(36,36,36)",
  },
});

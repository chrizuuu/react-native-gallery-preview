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
import Animated, { SlideInUp } from "react-native-reanimated";
import GalleryPreview, {
  GalleryHeaderProps,
} from "react-native-gallery-preview";

export const GalleryPreviewWithCustomHeader = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpenImageViewer = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseImageViewer = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ExampleWrapper
      title="Gallery with custom header"
      buttonLabel="Open Basic example"
      onPress={handleOpenImageViewer}
    >
      <GalleryPreview
        isVisible={isVisible}
        onRequestClose={handleCloseImageViewer}
        images={images}
        HeaderComponent={CustomHeader}
      />
    </ExampleWrapper>
  );
};

const CustomHeader = (props: GalleryHeaderProps) => {
  if (!props.isFocused) {
    return null;
  }

  return (
    <Animated.View entering={SlideInUp} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Preview: {props.currentImageIndex + 1}/{props.imagesLength}
          </Text>
          <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonLabel}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    top: 0,
    position: "absolute",
    backgroundColor: "rgb(245,245,245)",
  },
  safeArea: {
    flex: 1,
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
});

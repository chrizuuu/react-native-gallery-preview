import "react-native-gesture-handler";
import React from "react";
import { View, StyleSheet } from "react-native";
import { BasicGalleryPreview } from "./src/components/BasicGalleryPreview";
import { GalleryPreviewWithCustomHeader } from "./src/components/GalleryPreviewWIthCustomHeader";
import { OpenOnSpecificImageExample } from "./src/components/OpenOnSpecificImageExample";
import { OverlayComponentExample } from "./src/components/OverlayComponentExample";
import { RTLGalleryPreview } from "./src/components/RTLGalleryPreview";

export default function App() {
  return (
    <View style={styles.container}>
      <BasicGalleryPreview />
      <GalleryPreviewWithCustomHeader />
      <OpenOnSpecificImageExample />
      <OverlayComponentExample />
      <RTLGalleryPreview />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
});

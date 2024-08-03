import "react-native-gesture-handler";
import React from "react";
import { View, StyleSheet } from "react-native";
import { BasicGalleryPreview } from "./src/components/BasicGalleryPreview";
import { GalleryPreviewWithCustomHeader } from "./src/components/GalleryPreviewWIthCustomHeader";
import { OpenOnSpecificImageExample } from "./src/components/OpenOnSpecificImageExample";
import { OverlayComponentExample } from "./src/components/OverlayComponentExample";

export default function App() {
  return (
    <View style={styles.container}>
      <BasicGalleryPreview />
      <GalleryPreviewWithCustomHeader />
      <OpenOnSpecificImageExample />
      <OverlayComponentExample />
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

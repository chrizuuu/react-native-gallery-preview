import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { BasicGalleryPreview } from "./src/components/BasicGalleryPreview";
import { GalleryPreviewWithCustomHeader } from "./src/components/GalleryPreviewWIthCustomHeader";
import { OpenOnSpecificImageExample } from "./src/components/OpenOnSpecificImageExample";
import { OverlayComponentExample } from "./src/components/OverlayComponentExample";
import { ChildrenGalleryPreview } from "./src/components/ChildrenGalleryPreview/ChildrenGalleryPreview";

export default function App() {
  return (
    <SafeAreaView style={styles.sfeAreaView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <BasicGalleryPreview />
        <GalleryPreviewWithCustomHeader />
        <OpenOnSpecificImageExample />
        <OverlayComponentExample />
        <ChildrenGalleryPreview />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sfeAreaView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    gap: 24,
    paddingVertical: 24,
  },
});

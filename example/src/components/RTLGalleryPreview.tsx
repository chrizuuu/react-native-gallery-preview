import React from "react";
import { images } from "../images";
import { ExampleWrapper } from "./ExampleWrapper";
import GalleryPreview from "react-native-gallery-preview";

export const RTLGalleryPreview = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpenImageViewer = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseImageViewer = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ExampleWrapper
      title="RTL example"
      buttonLabel="RTL Basic example"
      onPress={handleOpenImageViewer}
    >
      <GalleryPreview
        isVisible={isVisible}
        onRequestClose={handleCloseImageViewer}
        images={images}
      />
    </ExampleWrapper>
  );
};

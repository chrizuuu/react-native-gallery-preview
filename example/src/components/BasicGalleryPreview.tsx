import React from "react";
import { images } from "../images";
import GalleryPreview from "../../../src";
import { ExampleWrapper } from "./ExampleWrapper";

export const BasicGalleryPreview = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpenImageViewer = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseImageViewer = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ExampleWrapper
      title="Basic example"
      buttonLabel="Open Basic example"
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

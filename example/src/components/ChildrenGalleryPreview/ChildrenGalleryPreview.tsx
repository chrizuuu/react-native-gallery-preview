import React from "react";
import { ExampleWrapper } from "../ExampleWrapper";
import { GalleryPreview } from "../../../../src/GalleryPreview";
import { VideoItem } from "./VideoItem";
import { ImageItem } from "./ImageItem";
import { images } from "../../images";

export const ChildrenGalleryPreview = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpenImageViewer = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseImageViewer = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ExampleWrapper
      title="Children example"
      buttonLabel="Open Children example"
      onPress={handleOpenImageViewer}
    >
      <GalleryPreview
        isVisible={isVisible}
        onRequestClose={handleCloseImageViewer}
        type="children"
      >
        <ImageItem source={images[0]} />
        <VideoItem />
        <VideoItem />
        <ImageItem source={images[1]} />
        <ImageItem source={images[2]} />
        <VideoItem />
      </GalleryPreview>
    </ExampleWrapper>
  );
};

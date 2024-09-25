import React from "react";
import type { GalleryPreviewProps } from "./types";
import { GalleryPreviewForChildren } from "./components/GalleryPreviewForChildren/GalleryPreviewForChildren";
import { GalleryPreviewForImage } from "./components/GalleryPreviewForImage/GalleryPreviewForImage";

export const GalleryPreview = (props: GalleryPreviewProps) => {
  if (props.type === "children") {
    return <GalleryPreviewForChildren {...props} />;
  }
  return <GalleryPreviewForImage {...props} />;
};

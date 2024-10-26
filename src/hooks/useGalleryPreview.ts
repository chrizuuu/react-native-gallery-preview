import { useCallback, useState } from "react";
import { GalleryPreviewProps } from "src/types";

type StateType = Pick<GalleryPreviewProps, "isVisible" | "initialIndex">;

export const useGalleryPreview = () => {
  const [galleryPreviewState, setGalleryPreviewState] = useState<StateType>({
    isVisible: false,
    initialIndex: 0,
  });

  const openGalleryPreview = useCallback((imageIndex: number) => {
    setGalleryPreviewState({ isVisible: true, initialIndex: imageIndex });
  }, []);

  const closeGalleryPreview = useCallback(() => {
    setGalleryPreviewState({ isVisible: false, initialIndex: 0 });
  }, []);

  return { openGalleryPreview, closeGalleryPreview, galleryPreviewState };
};

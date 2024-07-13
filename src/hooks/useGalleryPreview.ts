import { useCallback, useState } from "react";

export const useGalleryPreview = () => {
  const [galleryPreviewState, setGalleryPreviewState] = useState<{
    isVisible: boolean;
    initIndex: number;
  }>({ isVisible: false, initIndex: 0 });

  const openGalleryPreview = useCallback((imageIndex: number) => {
    setGalleryPreviewState({ isVisible: true, initIndex: imageIndex });
  }, []);

  const closeGalleryPreview = useCallback(() => {
    setGalleryPreviewState({ isVisible: false, initIndex: 0 });
  }, []);

  return { openGalleryPreview, closeGalleryPreview, galleryPreviewState };
};

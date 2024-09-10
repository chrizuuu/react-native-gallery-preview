import type { ImageURISource } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";

export type ImageItemURI = ImageURISource;

export interface GalleryPreviewProps {
  isVisible: boolean;

  /**
   * Function to close the image viewer modal.
   */
  onRequestClose: () => void;

  images: ImageItemURI[];

  /**
   * The initial index of the image to be displayed when the viewer is opened.
   * @default 0
   */
  initialIndex?: number;

  /**
   * The gap between images in the viewer.
   * @default 24
   */
  gap?: number;

  /**
   * The number of images rendered simultaneously for optimization.
   * @default 6
   */
  simultaneousRenderedImages?: number;

  /**
   * Optional component to be rendered above the image viewer.
   * If OverlayComponent is passed, HeaderComponent will not show.
   */
  OverlayComponent?: (props: GalleryOverlayProps) => React.ReactNode;

  /**
   * Optional custom component to render each image.
   */
  ImageComponent?: (props: GalleryImageComponentProps) => React.JSX.Element;

  /**
  Spring config
     * @default
      {
        damping: 1000,
        mass: 1,
        stiffness: 250,
        restDisplacementThreshold: 0.02,
        restSpeedThreshold: 4,
      }
     */
  springConfig?: SpringConfig;

  /**
   * The maximum scale of the image.
   * @default 8
   */
  maxScale?: number;

  /**
   * @default true
   */
  doubleTabEnabled?: boolean;

  /**
   * @default true
   */
  pinchEnabled?: boolean;

  /**
   * @default true
   */
  swipeToCloseEnabled?: boolean;

  /**
   * The background color of the modal, DefaultHeader, and StatusBar.
   * @default #000
   */
  backgroundColor?: string;

  /**
   * Color of text in the header.
   * @default #fff
   */
  headerTextColor?: string;
}

export interface GalleryOverlayProps {
  /**
   * Function to close the image viewer.
   */
  onClose: () => void;

  /**
   * The index of the current image being viewed.
   */
  currentImageIndex: number;

  /**
   * The total number of images
   */
  imagesLength: number;
  isFocused: boolean;
  containerBackgroundColor?: string;
  textColor?: string;
}

export interface GalleryItemProps {
  index: number;
  currentIndex: SharedValue<number>;
  item: ImageItemURI;
  isFirst: boolean;
  isLast: boolean;
  rootTranslateX: SharedValue<number>;
  opacity: SharedValue<number>;
  width: number;
  height: number;
  dataLength: number;
  gap: number;
  onClose: () => void;
  setIsFocused: (val: boolean) => void;
  isFocused: boolean;
  ImageComponent: (props: GalleryImageComponentProps) => React.JSX.Element;
  springConfig: SpringConfig;
  maxScale: number;
  doubleTabEnabled: boolean;
  pinchEnabled: boolean;
  swipeToCloseEnabled: boolean;
  rtl?: boolean;
}

export interface GalleryImageComponentProps {
  source: ImageItemURI;
  /**
   * Function to be called when the image is loaded.
   * @param width - The width of the loaded image.
   * @param height - The height of the loaded image.
   */
  onLoad: (width: number, height: number) => void;
  style: {
    width: number;
    height: number;
  };
}

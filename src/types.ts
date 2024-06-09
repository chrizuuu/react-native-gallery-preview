import type { ImageStyle, ImageURISource, StyleProp } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
export type ImageItemURI = ImageURISource;

export interface ImageViewerProps {
  isVisible: boolean;
  onRequestClose: () => void;
  images: ImageItemURI[];
  initialIndex?: number;
  gap?: number;
  simultaneousRenderedImages?: number;
  HeaderComponent?: (props: HeaderProps) => React.ReactNode;
  ImageComponent?: (props: ImageComponentProps) => React.ReactNode;
}

export interface HeaderProps {
  onClose: () => void;
  currentImageIndex: number;
  imagesLength: number;
  isFocused: boolean;
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
  ImageComponent:(props: ImageComponentProps) => React.ReactNode;
}

export interface ImageComponentProps {
  source: ImageItemURI;
  onLoad: (width: number, height: number) => void;
  style: StyleProp<ImageStyle>;
}

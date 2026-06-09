import type { StatusBarProps } from "react-native";

export interface GalleryStatusBarProps {
  isFocused: boolean;
  backgroundColor: string;
  /**
   * Props forwarded to the underlying StatusBar, spread over the defaults.
   */
  statusBarProps?: StatusBarProps;
}

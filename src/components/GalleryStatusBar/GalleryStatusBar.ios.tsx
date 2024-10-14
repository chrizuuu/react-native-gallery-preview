import React from "react";
import { StatusBar } from "react-native";
import { GalleryStatusBarProps } from "./GalleryStatusBar.type";

export const GalleryStatusBar = (props: GalleryStatusBarProps) => {
  return <StatusBar hidden={!props.isFocused} translucent />;
};

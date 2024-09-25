import React from "react";
import { Image, ImageProps, useWindowDimensions } from "react-native";

interface ImageComponentProps {
  source: ImageProps["source"];
}

export const ImageItem = (props: ImageComponentProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <Image
      source={props.source}
      resizeMode="cover"
      width={width}
      height={height / 2}
    />
  );
};

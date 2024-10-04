import React, { useCallback, useMemo, useState } from "react";
import {
  Image,
  ImageLoadEventData,
  ImageProps,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";

interface ImageComponentProps {
  source: ImageProps["source"];
}

export const ImageItem = (props: ImageComponentProps) => {
  const { width, height } = useWindowDimensions();

  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: width,
    height: height,
  });
  const contentContainerSize = useMemo(() => {
    if (height > width) {
      return {
        width: width,
        height: (imageDimensions.height * width) / imageDimensions.width,
      };
    }
    return {
      width: (imageDimensions.width * height) / imageDimensions.height,
      height: height,
    };
  }, [width, height, imageDimensions.height, imageDimensions.width]);

  const onLoad = useCallback((e: NativeSyntheticEvent<ImageLoadEventData>) => {
    setImageDimensions({
      width: e.nativeEvent.source.width,
      height: e.nativeEvent.source.height,
    });
  }, []);

  return (
    <Image
      source={props.source}
      resizeMode="cover"
      onLoad={onLoad}
      {...contentContainerSize}
    />
  );
};

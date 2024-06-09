import React, { memo } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { ImageItemURI } from 'src/types';

interface ImageComponentProps {
  source: ImageItemURI;
  onLoad: (width: number, height: number) => void;
  style: StyleProp<ImageStyle>;
}

export const DefaultImageComponent = memo((props: ImageComponentProps) => {
  return (
    <Image
      source={props.source}
      resizeMode="contain"
      onLoad={(e) => props.onLoad(e.nativeEvent.source.width, e.nativeEvent.source.height)}
      style={props.style}
    />
  );
});

DefaultImageComponent.displayName = 'DefaultImageComponent';

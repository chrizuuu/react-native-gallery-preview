import React, { memo, useCallback, useMemo, useState } from "react";
import type { GalleryImageItemProps } from "../../types";
import { GestureItemComponent } from "../GestureItemComponent/GestureItemComponent";

export const GalleryImageItem = memo(
  ({
    item,
    width,
    height,
    ImageComponent,
    ...props
  }: GalleryImageItemProps) => {
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

    const contentCenter = useMemo(
      () => ({
        contentCenterX: contentContainerSize.width / 2,
        contentCenterY: contentContainerSize.height / 2,
      }),
      [contentContainerSize],
    );

    const onLoad = useCallback((w: number, h: number) => {
      setImageDimensions({ width: w, height: h });
    }, []);

    return (
      <GestureItemComponent
        contentCenterX={contentCenter.contentCenterX}
        contentCenterY={contentCenter.contentCenterY}
        contentContainerSize={contentContainerSize}
        width={width}
        height={height}
        {...props}
      >
        <ImageComponent
          source={item}
          onLoad={onLoad}
          style={contentContainerSize}
        />
      </GestureItemComponent>
    );
  },
);

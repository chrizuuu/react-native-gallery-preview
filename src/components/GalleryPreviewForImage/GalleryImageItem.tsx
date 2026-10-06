import React, { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { GalleryImageItemProps } from "../../types";
import { GestureItemComponent } from "../GestureItemComponent/GestureItemComponent";

export const GalleryImageItem = memo(
  ({
    item,
    width,
    height,
    ImageComponent,
    LoadingComponent,
    ...props
  }: GalleryImageItemProps) => {
    const { isLoading = false, ...source } = item;
    const showLoader = isLoading || !source.uri;
    const [imageDimensions, setImageDimensions] = useState<{
      width: number;
      height: number;
    }>({
      width: width,
      height: height,
    });
    const contentContainerSize = useMemo(() => {
      if (showLoader) {
        return { width, height };
      }
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
    }, [
      width,
      height,
      showLoader,
      imageDimensions.height,
      imageDimensions.width,
    ]);

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
        zoomEnabled={!showLoader}
      >
        {showLoader ? (
          <View style={[contentContainerSize, styles.loadingContainer]}>
            <LoadingComponent index={props.index} />
          </View>
        ) : (
          <ImageComponent
            source={source}
            onLoad={onLoad}
            style={contentContainerSize}
          />
        )}
      </GestureItemComponent>
    );
  },
);

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

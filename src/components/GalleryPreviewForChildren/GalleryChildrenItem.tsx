import React, { memo, useCallback, useState } from "react";
import type { GalleryChildrenItemProps } from "../../types";
import { GestureItemComponent } from "../GestureItemComponent/GestureItemComponent";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

export const GalleryChildrenItem = memo(
  ({ width, height, children, ...props }: GalleryChildrenItemProps) => {
    const [state, setState] = useState({
      width: 0,
      height: 0,
      contentCenterX: 0,
      contentCenterY: 0,
    });

    const onChildrenLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;

        const center = {
          x: layout.x + width / 2,
          y: layout.y + height / 2,
        };

        setState({
          width: layout.width,
          height: layout.height,
          contentCenterX: center.x,
          contentCenterY: center.y,
        });
      },
      [height, width],
    );

    return (
      <GestureItemComponent
        contentCenterX={state.contentCenterX}
        contentCenterY={state.contentCenterY}
        contentContainerSize={{ width: state.width, height: state.height }}
        width={width}
        height={height}
        {...props}
      >
        <View style={styles.children} onLayout={onChildrenLayout}>
          {children}
        </View>
      </GestureItemComponent>
    );
  },
);

const styles = StyleSheet.create({
  children: {
    justifyContent: "center",
    alignItems: "center",
  },
});

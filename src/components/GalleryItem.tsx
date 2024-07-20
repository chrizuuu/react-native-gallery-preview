import React, { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { GalleryItemProps } from "../types";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useVector } from "../utils/useVector";
import { clamp, withRubberClamp } from "../utils/clamp";
import { DURATION, MIN_SCALE } from "../constants";
// import { DebugView } from './DebugView.tsx/DebugView';

export const GalleryItem = memo(
  ({
    item,
    index,
    currentIndex,
    isFirst,
    isLast,
    rootTranslateX,
    opacity,
    dataLength,
    width,
    height,
    gap,
    onClose,
    setIsFocused,
    isFocused,
    ImageComponent,
    maxScale,
    springConfig,
    doubleTabEnabled,
    swipeToCloseEnabled,
    pinchEnabled,
  }: GalleryItemProps) => {
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

    const contentCenterX = contentContainerSize.width / 2;
    const contentCenterY = contentContainerSize.height / 2;

    const initRootTranslateX = useSharedValue(0);

    const offset = useVector(0, 0);

    const translation = useVector(0, 0);
    const savedTranslation = useVector(0, 0);

    const initialFocal = useVector(0, 0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const isPanningOut = useSharedValue(false);
    const shouldClose = useSharedValue(false);

    const animationContentContainerStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: offset.x.value + translation.x.value },
          { translateY: offset.y.value + translation.y.value },
          { scale: scale.value },
        ],
      };
    });

    const onStartInteraction = (withUnFocus?: boolean) => {
      "worklet";
      offset.x.value = offset.x.value + translation.x.value;
      offset.y.value = offset.y.value + translation.y.value;

      translation.x.value = 0;
      translation.y.value = 0;

      if (withUnFocus) {
        runOnJS(setIsFocused)(false);
      }
    };

    const getImagePositionX = useCallback(
      (i: number): readonly [number, number] => {
        "worklet";

        return [-(width + gap) * i, -width * (i + 1)];
      },
      [gap, width],
    );

    const getScaledEdgesX = (
      scaleValue?: number,
    ): readonly [number, number] => {
      "worklet";
      const _scale = scaleValue !== undefined ? scaleValue : scale.value;
      const scaledWith = _scale * contentContainerSize.width;
      const xPoint = Math.abs((scaledWith - width) / 2);

      return [-xPoint, xPoint];
    };

    const getScaledEdgesY = (
      scaleValue?: number,
    ): readonly [number, number] => {
      "worklet";
      const _scale = scaleValue !== undefined ? scaleValue : scale.value;
      const scaledHeight = _scale * contentContainerSize.height;
      const yPoint = Math.abs((scaledHeight - height) / 2);

      return [-yPoint, yPoint];
    };

    const reset = () => {
      "worklet";
      translation.x.value =
        scale.value > 1
          ? withTiming(0, { duration: DURATION })
          : withSpring(0, springConfig);
      translation.y.value =
        scale.value > 1
          ? withTiming(0, { duration: DURATION })
          : withSpring(0, springConfig);
      offset.x.value =
        scale.value > 1
          ? withTiming(0, { duration: DURATION })
          : withSpring(0, springConfig);
      offset.y.value =
        scale.value > 1
          ? withTiming(0, { duration: DURATION })
          : withSpring(0, springConfig);
      opacity.value = withTiming(1, { duration: DURATION });
      scale.value = withTiming(1, { duration: DURATION });
      rootTranslateX.value = withSpring(
        getImagePositionX(index)[0],
        springConfig,
      );
    };

    const pinchGesture = Gesture.Pinch()
      .enabled(pinchEnabled)
      .onStart((event) => {
        onStartInteraction(true);
        initialFocal.x.value = event.focalX - (width / 2 + offset.x.value);
        initialFocal.y.value = event.focalY - (height / 2 + offset.y.value);
        savedScale.value = scale.value;
      })
      .onUpdate((event) => {
        if (event.numberOfPointers !== 2) return;
        const deltaX = event.focalX - (width / 2 + offset.x.value);
        const deltaY = event.focalY - (height / 2 + offset.y.value);

        translation.x.value =
          deltaX +
          ((-1 * scale.value) / savedScale.value) * initialFocal.x.value;
        translation.y.value =
          deltaY +
          ((-1 * scale.value) / savedScale.value) * initialFocal.y.value;

        scale.value = withRubberClamp(
          savedScale.value * event.scale,
          0.45,
          maxScale,
          MIN_SCALE,
          maxScale,
        );
      })
      .onEnd(() => {
        if (scale.value <= 1) {
          reset();
        } else {
          if (scale.value > maxScale) {
            const diffX =
              ((-1 * maxScale) / savedScale.value) * initialFocal.x.value -
              ((-1 * scale.value) / savedScale.value) * initialFocal.x.value;

            const diffY =
              ((-1 * maxScale) / savedScale.value) * initialFocal.y.value -
              ((-1 * scale.value) / savedScale.value) * initialFocal.y.value;

            translation.x.value = withTiming(translation.x.value + diffX, {
              duration: DURATION,
            });
            translation.y.value = withTiming(translation.y.value + diffY, {
              duration: DURATION,
            });
            scale.value = withTiming(maxScale, {
              duration: DURATION,
            });
          } else {
            const edgesX = getScaledEdgesX();
            const edgesY = getScaledEdgesY();

            if (offset.x.value + translation.x.value > edgesX[1]) {
              translation.x.value = withSpring(
                edgesX[1] - offset.x.value,
                springConfig,
              );
            } else if (offset.x.value + translation.x.value < edgesX[0]) {
              translation.x.value = withSpring(
                edgesX[0] - offset.x.value,
                springConfig,
              );
            }

            const currHeight = contentContainerSize.height * scale.value;
            if (currHeight > height) {
              if (offset.y.value + translation.y.value > edgesY[1]) {
                translation.y.value = withSpring(
                  edgesY[1] - offset.y.value,
                  springConfig,
                );
              } else if (offset.y.value + translation.y.value < edgesY[0]) {
                translation.y.value = withSpring(
                  edgesY[0] - offset.y.value,
                  springConfig,
                );
              }
            } else {
              translation.y.value = withSpring(0, springConfig);
              offset.y.value = withSpring(0, springConfig);
            }
          }
        }
      });

    const panGesture = Gesture.Pan()
      .minDistance(10)
      .maxPointers(1)
      .onStart((event) => {
        onStartInteraction();
        if (scale.value === 1 && event.velocityY > event.velocityX) {
          rootTranslateX.value = getImagePositionX(currentIndex.value)[0];
        }
        initRootTranslateX.value = rootTranslateX.value;
        savedTranslation.x.value = translation.x.value;
        savedTranslation.y.value = translation.y.value;
        isPanningOut.value = false;
        shouldClose.value = false;
      })
      .onUpdate((event) => {
        const { translationX, translationY, velocityY, velocityX } = event;
        const edgesX = getScaledEdgesX();
        const edgesY = getScaledEdgesY();

        isPanningOut.value = !isPanningOut.value
          ? swipeToCloseEnabled &&
            scale.value === 1 &&
            getImagePositionX(index)[0] === rootTranslateX.value &&
            ((velocityY > 0 && velocityY > Math.abs(velocityX)) ||
              translationY > Math.abs(translationX))
          : isPanningOut.value;

        if (scale.value === 1 && !isPanningOut.value) {
          rootTranslateX.value = withRubberClamp(
            initRootTranslateX.value + translationX,
            { dir0: isFirst ? 0.55 : 1.15, dir1: isLast ? 0.55 : 1.15 },
            width,
            getImagePositionX(dataLength - 1)[0],
            0,
          );
          return;
        } else {
          translation.x.value = withRubberClamp(
            savedTranslation.x.value + translationX,
            0.55,
            contentContainerSize.width * scale.value,
            edgesX[0],
            edgesX[1],
          );
        }

        if (isPanningOut.value) {
          if (
            translation.y.value === 0 &&
            Math.abs(velocityY) > Math.abs(velocityX) &&
            velocityY > height
          ) {
            shouldClose.value = true;
            runOnJS(onClose)();
            return;
          }

          translation.y.value = withRubberClamp(
            savedTranslation.y.value + translationY,
            { dir0: 1, dir1: 0.55 },
            contentContainerSize.height * scale.value,
            0,
            edgesY[1],
          );
          opacity.value = interpolate(
            translation.y.value,
            [0, height / 2],
            [1, 0],
          );
          scale.value = interpolate(
            translation.y.value,
            [0, height / 2],
            [1, 0.66],
          );
          shouldClose.value =
            velocityY >= 0 &&
            translation.y.value + velocityY * 0.3 >
              contentContainerSize.height / 10;
        } else {
          translation.y.value = withRubberClamp(
            savedTranslation.y.value + translationY,
            0.55,
            contentContainerSize.height * scale.value,
            edgesY[0],
            edgesY[1],
          );
        }
      })
      .onEnd((event) => {
        if (shouldClose.value) {
          runOnJS(onClose)();
          return;
        } else if (isPanningOut.value) {
          reset();
          return;
        }

        const currentImagePositionX = getImagePositionX(index);
        const { velocityX, translationX } = event;
        const edgesX = getScaledEdgesX();
        const edgesY = getScaledEdgesY();

        if (scale.value === 1) {
          const needToTransX = Math.abs(getImagePositionX(1)[0] / 2);

          if ((isFirst && translationX > 0) || (isLast && translationX < 0)) {
            rootTranslateX.value = withSpring(
              currentImagePositionX[0],
              springConfig,
            );
          } else if (
            Math.abs(velocityX) >= needToTransX ||
            Math.abs(translationX) >= needToTransX
          ) {
            const newIndex =
              !isFirst && velocityX >= 0 && translationX > 0
                ? index - 1
                : !isLast && velocityX <= 0 && translationX < 0
                  ? index + 1
                  : index;
            const newPosition = getImagePositionX(newIndex);
            rootTranslateX.value = withSpring(newPosition[0], springConfig);
            currentIndex.value = newIndex;
          } else {
            rootTranslateX.value = withSpring(
              currentImagePositionX[0],
              springConfig,
            );
          }
        } else {
          if (
            translation.x.value + offset.x.value > edgesX[1] ||
            translation.x.value + offset.x.value < edgesX[0]
          ) {
            translation.x.value = withSpring(
              clamp(
                translation.x.value,
                edgesX[0] - offset.x.value,
                edgesX[1] - offset.x.value,
              ),
              springConfig,
            );
          }

          if (
            translation.y.value + offset.y.value > edgesY[1] ||
            translation.y.value + offset.y.value < edgesY[0]
          ) {
            translation.y.value = withSpring(
              clamp(
                translation.y.value,
                edgesY[0] - offset.y.value,
                edgesY[1] - offset.y.value,
              ),
              springConfig,
            );
          }
        }
      });

    const doubleTap = Gesture.Tap()
      .enabled(doubleTabEnabled)
      .numberOfTaps(2)
      .onStart(() => {
        onStartInteraction(true);
      })
      .onEnd((event) => {
        if (event.numberOfPointers !== 1) {
          return;
        }
        if (scale.value > 1) {
          reset();
        } else {
          const zoomScale =
            height > width
              ? Math.min(
                  contentContainerSize.width > contentContainerSize.height
                    ? (height / contentContainerSize.height) * 1.1
                    : 2.5,
                  maxScale,
                )
              : Math.min(
                  contentContainerSize.height > contentContainerSize.width
                    ? (width / contentContainerSize.width) * 1.1
                    : 2.5,
                  maxScale,
                );

          const edgesX = getScaledEdgesX(zoomScale);
          const edgesY = getScaledEdgesY(zoomScale);

          translation.x.value = withTiming(
            clamp(
              (contentCenterX - event.x) * (zoomScale - 1),
              edgesX[0],
              edgesX[1],
            ),
            { duration: DURATION },
          );

          translation.y.value = withTiming(
            clamp(
              (contentCenterY - event.y) * (zoomScale - 1),
              edgesY[0],
              edgesY[1],
            ),
            { duration: DURATION },
          );

          scale.value = withTiming(zoomScale, { duration: DURATION });
          savedScale.value = zoomScale;
        }
      });

    const tap = Gesture.Tap()
      .numberOfTaps(1)
      .requireExternalGestureToFail(doubleTap)
      .onEnd(() => {
        runOnJS(setIsFocused)(!isFocused);
      });

    const gestures = Gesture.Exclusive(
      Gesture.Race(panGesture, pinchGesture),
      tap,
    );

    return (
      <View style={styles.wrapper}>
        <GestureDetector gesture={gestures}>
          <View style={styles.container}>
            <Animated.View style={animationContentContainerStyle}>
              <GestureDetector gesture={doubleTap}>
                <ImageComponent
                  source={item}
                  onLoad={(imageWidth, imageHeight) => {
                    setImageDimensions({
                      width: imageWidth,
                      height: imageHeight,
                    });
                  }}
                  style={contentContainerSize}
                />
              </GestureDetector>
            </Animated.View>
          </View>
        </GestureDetector>
        {/* <DebugView
          values={{
            scale: scale,
            translationX: translation.x,
            translationY: translation.y,
            offsetX: offset.x,
            offsetY: offset.y,
            // contentCenterX,
            // contentCenterY,
            // width,
            // height,
          }}
        /> */}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

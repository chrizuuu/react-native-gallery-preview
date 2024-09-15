import React, { useCallback, useEffect, useState } from "react";
import { ModalContainer } from "./components/ModalContainer/ModalContainer";
import {
  Dimensions,
  I18nManager,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultHeader } from "./components/DefaultHeader/DefaultHeader";
import type { GalleryPreviewProps } from "./types";
import { DefaultImageComponent } from "./components/DefaultImageComponent/DefaultImageComponent";
import { GalleryItem } from "./components/GalleryItem";
import { SPRING_CONFIG, MAX_SCALE } from "./constants";

export const GalleryPreview = ({
  images,
  isVisible,
  onRequestClose,
  initialIndex = 0,
  gap = 24,
  simultaneousRenderedImages = 6,
  OverlayComponent = DefaultHeader,
  ImageComponent = DefaultImageComponent,
  springConfig = SPRING_CONFIG,
  maxScale = MAX_SCALE,
  doubleTabEnabled = true,
  pinchEnabled = true,
  swipeToCloseEnabled = true,
  backgroundColor = "#000",
  headerTextColor = "#fff",
}: GalleryPreviewProps) => {
  const rtl = I18nManager.isRTL;
  const dimensions = useWindowDimensions();

  const [index, setIndex] = useState(initialIndex);
  const [isFocused, setIsFocused] = useState(true);

  const translateX = useSharedValue(
    initialIndex * -(dimensions.width + gap) * (rtl ? -1 : 1),
  );
  const opacity = useSharedValue(1);
  const currentIndex = useSharedValue(initialIndex);

  useAnimatedReaction(
    () => currentIndex.value,
    (newIndex) => {
      runOnJS(setIndex)(newIndex);
    },
    [currentIndex],
  );

  const wrapperAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    [isFocused],
  );

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const isImageVisible = useCallback(
    (imageIndex: number): boolean => {
      const halfVisible = Math.floor(simultaneousRenderedImages / 2);
      const start = Math.max(0, index - halfVisible);
      const end = Math.min(
        images.length - 1,
        start + simultaneousRenderedImages - 1,
      );
      return imageIndex >= start && imageIndex <= end;
    },
    [images.length, index, simultaneousRenderedImages],
  );

  const getImagePositionX = useCallback(
    (i: number) => {
      return i * -(Dimensions.get("window").width + gap) * (rtl ? -1 : 1);
    },
    [gap, rtl],
  );

  useEffect(() => {
    if (isVisible) {
      opacity.value = 1;
      currentIndex.value = initialIndex;
      translateX.value = getImagePositionX(initialIndex);
      setIsFocused(true);
    }
  }, [
    currentIndex,
    getImagePositionX,
    initialIndex,
    isVisible,
    opacity,
    translateX,
  ]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      const { width } = window;
      translateX.value = withDelay(
        0,
        withTiming(currentIndex.value * -(width + gap) * (rtl ? -1 : 1)),
      );
    });

    return () => {
      subscription.remove();
    };
  }, [currentIndex.value, gap, rtl, translateX]);

  return (
    <ModalContainer isVisible={isVisible} onRequestClose={onRequestClose}>
      <StatusBar
        hidden={!isFocused}
        translucent
        backgroundColor={backgroundColor}
      />
      <Animated.View
        style={[wrapperAnimatedStyle, styles.wrapper, { backgroundColor }]}
      >
        <GestureHandlerRootView style={styles.gestureContainer}>
          <Animated.View
            style={[
              containerAnimatedStyle,
              styles.container,
              { columnGap: gap },
            ]}
          >
            {images.map((image, i) => {
              const visible = isImageVisible(i);

              return (
                <View key={i} style={{ ...dimensions }}>
                  {visible && (
                    <GalleryItem
                      item={image}
                      index={i}
                      currentIndex={currentIndex}
                      isFirst={i === 0}
                      isLast={i === images.length - 1}
                      rootTranslateX={translateX}
                      opacity={opacity}
                      width={dimensions.width}
                      height={dimensions.height}
                      dataLength={images.length}
                      gap={gap}
                      onClose={onRequestClose}
                      isFocused={isFocused}
                      setIsFocused={setIsFocused}
                      ImageComponent={ImageComponent}
                      springConfig={springConfig}
                      maxScale={maxScale}
                      swipeToCloseEnabled={swipeToCloseEnabled}
                      pinchEnabled={pinchEnabled}
                      doubleTabEnabled={doubleTabEnabled}
                      rtl={rtl}
                    />
                  )}
                </View>
              );
            })}
          </Animated.View>
        </GestureHandlerRootView>

        <OverlayComponent
          isFocused={isFocused}
          imagesLength={images.length}
          currentImageIndex={index}
          onClose={onRequestClose}
          containerBackgroundColor={backgroundColor}
          textColor={headerTextColor}
        />
      </Animated.View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  gestureContainer: { flex: 1 },
  container: { flexDirection: "row" },
});

import React, { useCallback, useEffect, useState } from "react";
import { ModalContainer } from "./components/ModalContainer/ModalContainer";
import { StatusBar, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
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
  HeaderComponent = DefaultHeader,
  ImageComponent = DefaultImageComponent,
  springConfig = SPRING_CONFIG,
  maxScale = MAX_SCALE,
  doubleTabEnabled = true,
  pinchEnabled = true,
  swipeToCloseEnabled = true,
}: GalleryPreviewProps) => {
  const dimensions = useWindowDimensions();

  const [index, setIndex] = useState(initialIndex);
  const [isFocused, setIsFocused] = useState(true);

  const translateX = useSharedValue(initialIndex * -(dimensions.width + gap));
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

  useEffect(() => {
    translateX.value = initialIndex * -(dimensions.width + gap);
    if (isVisible) {
      opacity.value = 1;
      currentIndex.value = initialIndex;
      translateX.value = initialIndex * -(dimensions.width + gap);
      setIsFocused(true);
    }
  }, [
    currentIndex,
    dimensions.width,
    gap,
    initialIndex,
    isVisible,
    opacity,
    translateX,
  ]);

  return (
    <ModalContainer isVisible={isVisible} onRequestClose={onRequestClose}>
      <StatusBar hidden={!isFocused} translucent />
      <Animated.View style={[wrapperAnimatedStyle, styles.wrapper]}>
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
                    />
                  )}
                </View>
              );
            })}
          </Animated.View>
        </GestureHandlerRootView>
        <HeaderComponent
          isFocused={isFocused}
          imagesLength={images.length}
          currentImageIndex={index}
          onClose={onRequestClose}
        />
      </Animated.View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#000" },
  gestureContainer: { flex: 1 },
  container: { flexDirection: "row" },
});

import React, { useCallback, useEffect, useState } from 'react';
import { ModalContainer } from './components/ModalContainer/ModalContainer';
import { StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultHeader } from './components/DefaultHeader/DefaultHeader';
import type { GalleryPreviewProps } from './types';
import { DefaultImageComponent } from './components/DefaultImageComponent/DefaultImageComponent';
import { GalleryItem } from './components/GalleryItem';

export const GalleryPreview = ({
  images,
  isVisible,
  onRequestClose,
  initialIndex = 0,
  gap = 24,
  simultaneousRenderedImages = 6,
  HeaderComponent = DefaultHeader,
  ImageComponent = DefaultImageComponent,
}: GalleryPreviewProps) => {
  const dimensions = useWindowDimensions();

  const [index, setIndex] = useState(initialIndex);
  const [isFocused, setIsFocused] = useState(true);

  const translateX = useSharedValue(initialIndex * -(dimensions.width + gap));
  const opacity = useSharedValue(1);
  const currentIndex = useSharedValue(initialIndex);

  const changeIndex = useCallback((newIndex: number) => {
    setIndex(newIndex);
  }, []);

  useAnimatedReaction(
    () => currentIndex.value,
    (newIndex) => runOnJS(changeIndex)(newIndex),
    [currentIndex, changeIndex],
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
    (index: number): boolean => {
      const halfVisible = Math.floor(simultaneousRenderedImages / 2);
      const start = Math.max(0, index - halfVisible);
      const end = Math.min(images.length - 1, start + simultaneousRenderedImages - 1);
      return index >= start && index <= end;
    },
    [images.length, simultaneousRenderedImages],
  );

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => changeIndex(initialIndex), 200);
      translateX.value = initialIndex * -(dimensions.width + gap);
      opacity.value = 1;
    }
  }, [changeIndex, dimensions.width, gap, initialIndex, isVisible, opacity, translateX]);

  return (
    <ModalContainer isVisible={isVisible} onRequestClose={onRequestClose}>
      <StatusBar hidden={!isFocused} translucent />
      <Animated.View style={[wrapperAnimatedStyle, styles.wrapper]}>
        <GestureHandlerRootView style={styles.gestureContainer}>
          <Animated.View style={[containerAnimatedStyle, styles.container, { columnGap: gap }]}>
            {images.map((image, index) => {
              const visible = isImageVisible(index);
              return (
                <View key={index} style={{ ...dimensions }}>
                  {visible && (
                    <GalleryItem
                      key={index}
                      item={image}
                      index={index}
                      currentIndex={currentIndex}
                      isFirst={index === 0}
                      isLast={index === images.length - 1}
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
  wrapper: { flex: 1, backgroundColor: '#000' },
  gestureContainer: { flex: 1 },
  container: { flexDirection: 'row' },
});

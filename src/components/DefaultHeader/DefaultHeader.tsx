import React, { memo } from "react";
import { SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GalleryOverlayProps } from "src/types";

export const DefaultHeader = memo(
  ({
    onClose,
    currentImageIndex,
    imagesLength,
    isFocused,
    containerBackgroundColor = "#000",
    textColor = "#fff",
  }: GalleryOverlayProps) => {
    if (!isFocused) {
      return null;
    }

    return (
      <Animated.View
        entering={FadeIn}
        style={[
          styles.container,
          { backgroundColor: containerBackgroundColor },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.wrapper}>
            <View style={styles.closeButtonWrapper}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={[styles.closeButtonIcon, { color: textColor }]}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.titleWrapper}>
              <Text style={[styles.title, { color: textColor }]}>
                {currentImageIndex + 1}/{imagesLength}
              </Text>
            </View>
            <View style={styles.right} />
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    top: 0,
    position: "absolute",
  },
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 54,
  },
  titleWrapper: {
    flex: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
  },
  closeButtonWrapper: {
    flex: 1,
    paddingLeft: 16,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  right: {
    flex: 1,
  },
});

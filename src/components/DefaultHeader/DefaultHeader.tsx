import React from "react";
import { SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { GalleryHeaderProps } from "src/types";

export function DefaultHeader({
  onClose,
  currentImageIndex,
  imagesLength,
  isFocused,
}: GalleryHeaderProps) {
  if (!isFocused) {
    return null;
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
          <View style={styles.closeButtonWrapper}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonIcon}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {currentImageIndex + 1}/{imagesLength}
            </Text>
          </View>
          <View style={styles.right} />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    top: 0,
    position: "absolute",
    backgroundColor: "rgb(0, 0, 0)",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgb(0, 0, 0)",
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
    color: "#fff",
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
    color: "#fff",
    fontWeight: "bold",
  },
  right: {
    flex: 1,
  },
});

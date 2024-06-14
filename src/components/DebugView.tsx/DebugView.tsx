import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { ReText } from "./ReText";

interface DebugViewProps {
  values: Record<string, SharedValue<number | boolean> | number | boolean>;
}

export const DebugView = ({ values }: DebugViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(values).map((key) => {
        const value = values[key];
        if (value === undefined) return null;
        return (
          <ReText
            style={styles.text}
            key={`item-${key}`}
            text={key}
            value={value}
          />
        );
      })}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 4,
    bottom: 0,
    padding: 2,
    backgroundColor: "rgba(0, 0,0,0.5)",
    pointerEvents: "none",
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    textAlignVertical: "center",
    height: 20,
    padding: 0,
    color: "white",
  },
});

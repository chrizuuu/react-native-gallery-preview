import React, { PropsWithChildren } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface ExampleWrapperProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
  buttonLabel?: string;
}

export const ExampleWrapper = ({
  title,
  onPress,
  buttonLabel,
  children,
}: ExampleWrapperProps) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      {onPress && buttonLabel ? (
        <Button title={buttonLabel} onPress={onPress} />
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

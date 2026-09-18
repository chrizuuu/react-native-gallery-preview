import React from "react";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface ModalContainerProps {
  isVisible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}

export function ModalContainer(props: ModalContainerProps) {
  return (
    <Modal
      transparent
      animationType={props.isVisible ? "fade" : "none"}
      presentationStyle="overFullScreen"
      visible={props.isVisible}
      onRequestClose={props.onRequestClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      <SafeAreaProvider style={styles.wrapper}>
        {props.children}
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

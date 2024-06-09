import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, View } from 'react-native';

interface ModalContainerProps {
  isVisible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}

export function ModalContainer(props: ModalContainerProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      visible={props.isVisible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.wrapper}>{props.children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

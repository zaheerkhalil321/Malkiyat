import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const NoInternetModal = ({ visible }) => (
  <Modal isVisible={visible} style={styles.modal} animationInTiming={600}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Error</Text>
      <Text style={styles.modalText}>
        It seems like you are having an internet connectivity issue. Please
        check your internet connection and try again.
      </Text>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("trying")}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity> */}
    </View>
  </Modal>
);
export default NoInternetModal;
const styles = StyleSheet.create({
  // ...
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "justify",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "justify",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

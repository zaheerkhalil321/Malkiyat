import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";

import { useTheme } from "@react-navigation/native";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";

const CalculationModal = (props) => {
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      // onRequestClose={() => props.setModalVisible(false)}
    >
      <TouchableOpacity
        // onPress={() => {
        //     props.setModalVisible(false);
        // }}
        activeOpacity={1}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Image
            style={{ resizeMode: "contain", width: wp(25), height: wp(25) }}
            source={require("@src/assets/images/market_modal.png")}
          />
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: wp(5),
              paddingVertical: wp(5),
            }}
          >
            {props.text}
            {/* <ResponsiveText>kkdjdej</ResponsiveText> */}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#2BACE3",
              width: wp(25),
              height: wp(9.2),
              borderRadius: wp(2),
              justifyContent: "center",
              alignItems: "center",
              marginTop: wp(1),
            }}
            onPress={props.onPress}
          >
            <ResponsiveText
              style={{ color: "white", fontFamily: Fonts.ManropeBold }}
            >
              Ok
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    height: "40%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(10),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(5),
  },
  btn: {
    flex: 1,
    height: wp(10),
    backgroundColor: "white",
  },
});

export default CalculationModal;

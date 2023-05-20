import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";

import { useTheme } from "@react-navigation/native";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Build2 from "@src/assets/images/build2.svg";
import Build3 from "@src/assets/images/build3.svg";
const RegisterModal = (props) => {
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <TouchableOpacity
        onPress={() => {
          props.setModalVisible(false);
        }}
        activeOpacity={1}
        style={styles.modalContainer}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={{ paddingHorizontal: wp(4) }}>
            <View style={{ alignItems: "center", marginBottom: wp(3) }}>
              {props.value ? <Build3 /> : <Build2 />}
            </View>
            {props.value ? (
              <ResponsiveText
                style={{
                  textAlign: "center",
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 5,
                  marginBottom: wp(3),
                }}
              >
                Value Calculation
              </ResponsiveText>
            ) : (
              <ResponsiveText
                style={{
                  textAlign: "center",
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 5,
                  marginBottom: wp(3),
                }}
              >
                Profit Calculation
              </ResponsiveText>
            )}
            {props.value ? (
              <ResponsiveText
                style={{ marginBottom: wp(3), textAlign: "justify" }}
              >
                Sqft value is calculated on current highest offer.
              </ResponsiveText>
            ) : (
              <ResponsiveText
                style={{ marginBottom: wp(3), textAlign: "justify" }}
              >
                Profit is calculated on the current highest offer - cost of Sqft
                at the time of purchase.
              </ResponsiveText>
            )}

            <ResponsiveText style={{ textAlign: "justify" }}>
              Note: Highest offer maynot be enough to buy all your Sqft which
              may require some wait but since highest offer reflects price
              someone is willing to pay therefore reflects value today.
            </ResponsiveText>
          </View>
          {/* <TouchableOpacity
                        style={{
                            backgroundColor: "#2BACE3",
                            width: wp(25),
                            height: wp(9.2),
                            borderRadius: wp(2),
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: wp(1),
                            position: 'absolute',
                            bottom: wp(5)
                        }}
                        onPress={() => {
                            props.setModalVisible(false);
                        }}
                    >
                        <ResponsiveText
                            style={{ color: "white", fontFamily: Fonts.ManropeBold }}
                        >
                            Ok
                        </ResponsiveText>
                    </TouchableOpacity> */}
        </TouchableOpacity>
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
    paddingVertical: wp(10),
    // height: "43%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
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

export default RegisterModal;

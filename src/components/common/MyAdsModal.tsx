import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";

import MarketImage from "@src/assets/images/market_modal.png";

import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";

const MyAdsModal = (props) => {
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
        <View style={styles.modalContent}>
          {/* <Image
            style={{
              width: "100%",
              height: wp(10),
              //   backgroundColor: "red",
              resizeMode: "contain",
              position: "absolute",
              top: -22,
            }}
            source={require("@src/assets/images/top_re.png")}
          /> */}
          <Image
            style={{ width: wp(28), height: wp(28), resizeMode: "contain" }}
            source={MarketImage}
          />
          <ResponsiveText
            style={{
              color: "#3577DB",
              fontFamily: Fonts.ManropeBold,
              fontSize: 5,
              marginVertical: wp(3),
              marginTop: wp(5),
            }}
          >
            Are you sure?
          </ResponsiveText>
          <ResponsiveText>Your Ad will be canceled</ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              width: wp(60),
              marginTop: wp(10),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible(false);
              }}
              style={{
                borderColor: "#2BACE3",
                borderWidth: 1,
                width: wp(25),
                height: wp(8),
                borderRadius: wp(2),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveText
                style={{
                  color: "#3577DB",
                  fontSize: 3.73,
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              >
                No
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.handleClick();
              }}
              style={{
                backgroundColor: "#2BACE3",
                width: wp(25),
                height: wp(8),
                borderRadius: wp(2),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveText
                style={{
                  color: "white",
                  fontSize: 3.73,
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              >
                Yes
              </ResponsiveText>
            </TouchableOpacity>
          </View>
          {/* <Image
            style={{
              width: "100%",
              height: wp(10),
              //   backgroundColor: "red",
              resizeMode: "contain",
              position: "absolute",
              bottom: -25,
            }}
            source={require("@src/assets/images/bottom_re.png")}
          /> */}
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
    borderRadius: 30,
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

export default MyAdsModal;

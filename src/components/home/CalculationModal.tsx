import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Text,
} from "react-native";

import MarketImage from "@src/assets/images/market_modal.png";

import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { Data } from "@src/helpers/constants/OnboardingData";
import { valueConverstion } from "@src/utils/helperFunction";

const CalculationModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <TouchableOpacity
        // onPress={() => {
        //   props.setModalVisible(false);
        // }}
        activeOpacity={1}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              props.setModalVisible(false);
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <Image
              style={{ width: wp(6), height: wp(6) }}
              source={require("@src/assets/images/cross.png")}
            />
          </TouchableOpacity>
          <ResponsiveText
            style={{
              fontSize: 5,
              fontFamily: Fonts.ManropeBold,
              textAlign: "center",
              marginBottom: wp(5),
              marginTop: wp(2)
            }}
          >
            Sqft Price Calculation
          </ResponsiveText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText style={{ fontSize: 4 }}>Plot price</ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  // fontFamily: Fonts.ManropeSemiBold,
                  // color: "#3577DB",
                }}
              >
                Rs{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: 4,
                  // fontFamily: Fonts.ManropeSemiBold,
                  // color: "#3577DB",
                }}
              >
                {valueConverstion(
                  props?.data?.perSmallerUnitPrice *
                  props?.data?.smallerUnitArea
                )}
              </ResponsiveText>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              height: 1.5,
              marginVertical: wp(3),
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText style={{ fontSize: 4 }}>
              Area in Marla
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 4,
                // fontFamily: Fonts.ManropeSemiBold,
                // color: "#3577DB",
              }}
            >
              {props?.data?.biggerUnitArea} {props?.data?.biggerUnit}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              height: 1.5,
              marginVertical: wp(3),
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText style={{ fontSize: 4 }}>
              Area in Sqft
            </ResponsiveText>

            <ResponsiveText
              style={{
                fontSize: 4,
                // fontFamily: Fonts.ManropeSemiBold,
                // color: "#3577DB",
              }}
            >
              {props?.data?.smallerUnitArea} Sqft
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              height: 1.5,
              marginVertical: wp(3),
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText style={{ fontSize: 4 }}>
              1 Sqft Price
            </ResponsiveText>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 3.5,
                    // fontFamily: Fonts.ManropeSemiBold,
                    // color: "#3577DB",
                  }}
                >
                  Rs{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 4,
                    // fontFamily: Fonts.ManropeSemiBold,
                    // color: "#3577DB",
                  }}
                >
                  {props?.data?.perSmallerUnitPrice}
                </ResponsiveText>
              </View>
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  // fontFamily: Fonts.ManropeSemiBold,
                  // color: "#3577DB",
                }}
              >
                {valueConverstion(
                  props?.data?.perSmallerUnitPrice *
                  props?.data?.smallerUnitArea
                )}{" "}
                / {props?.data?.smallerUnitArea} Sqft
              </ResponsiveText>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              height: 1.5,
              marginVertical: wp(3),
            }}
          />
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
    // height: "40%",
    width: "80%",
    backgroundColor: "white",
    paddingTop: wp(6),
    paddingBottom: wp(6),
    paddingHorizontal: wp(5),
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
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

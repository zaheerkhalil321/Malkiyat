import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import { PropertyDetailI } from "@src/services/model";
import Fonts from "@src/theme/fonts";
import { Route, useTheme } from "@react-navigation/native";

// interface Props {
//   modalVisible: boolean;
//   setModalVisible: (arg: boolean) => void;
//   modalContent: string;
//   selectedTileData: PropertyDetailI | undefined;
//   confirmPayment: () => void;
//   loading: boolean;
// }

const CongratsModal = (props) => {
  const { colors } = useTheme();
  return (
    <Modal
      isVisible={props.modalVisible}
      onBackdropPress={() => props.closeModal()}
    >
      <TouchableOpacity
        onPress={() => {
          props.closeModal();
        }}
        activeOpacity={1}
        style={styles.modalContainer}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              props.closeModal();
            }}
            style={{ position: "absolute", top: wp(2), right: wp(5) }}
          >
            <ResponsiveText style={{ fontSize: 5, color: colors.Primary }}>
              x
            </ResponsiveText>
          </TouchableOpacity>
          <ResponsiveText
            style={{ fontFamily: Fonts.ManropeBold, fontSize: 5 }}
          >
            Congratulations
          </ResponsiveText>
          <LottieView
            style={{ width: wp(50), height: wp(50) }}
            source={require("@src/assets/lottie/lottie_tick.json")}
            autoPlay
            loop
          />
          <ResponsiveText
            style={{ fontFamily: Fonts.ManropeBold, fontSize: 5 }}
          >
            Transaction Successful
          </ResponsiveText>

          {/* <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
            Reference ID:
          </ResponsiveText> */}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
{
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    height: "45%",
    width: "95%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: wp(20),
    // position: "absolute",
    // bottom: wp(25),
    borderRadius: wp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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

export default CongratsModal;

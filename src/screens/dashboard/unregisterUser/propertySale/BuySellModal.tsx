import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import { PropertyDetailI } from "@src/services/model";
import Fonts from "@src/theme/fonts";
import { Route, useTheme } from "@react-navigation/native";
import { valueWithCommas } from "@src/utils/helperFunction";
interface Props {
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
  modalContent: string;
  selectedTileData?: PropertyDetailI | undefined;
  confirmPayment: () => void;
  loading: boolean;
  unitPrice: number;
  sqFt: string;
  propertyName: string;
}

const BuySellModal = (props: Props) => {
  const { colors } = useTheme();
  const totalBalance =
    Math.floor(Number(props.sqFt)) == 0
      ? Number(Number(props.sqFt) * Number(props.unitPrice))
      : Math.floor(Number(props.sqFt)) * Number(props.unitPrice);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ResponsiveText
            style={{
              // color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4,
              paddingHorizontal: wp(10),
              textAlign: "center",
              marginBottom: wp(2),
            }}
          >
            {/* {props?.modalContent} */}
            Please confirm your order. PKR {valueWithCommas(totalBalance)} will
            be deducted from you wallet.
          </ResponsiveText>
          {/* <View> */}
          <ResponsiveText>Total Sqft: {props?.sqFt}</ResponsiveText>
          <ResponsiveText style={{ marginVertical: wp(1) }}>
            Property name: {props.propertyName}
          </ResponsiveText>
          <ResponsiveText>
            Amount: PKR {valueWithCommas(totalBalance)}
          </ResponsiveText>
          <ResponsiveText style={{ marginTop: wp(1) }}>
            Charges: PKR 0
          </ResponsiveText>
          {/* </View> */}

          <View
            style={{
              marginTop: wp(10),
              // position: "absolute",
              // bottom: wp(5),
              // backgroundColor: "red",
            }}
          >
            {props.loading ? (
              <ActivityIndicator color={"black"} size="large" />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    // backgroundColor: colors.Primary,
                    borderRadius: wp(2),
                    height: wp(8),
                    width: wp(25),
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: wp(5),
                  }}
                  onPress={() => {
                    props.setModalVisible(false);
                  }}
                >
                  <ResponsiveText
                    style={{
                      color: colors.Primary,
                      fontFamily: Fonts.ManropeBold,
                      fontSize: 4,
                      // padding: wp(2),
                    }}
                  >
                    Cancel
                  </ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.Primary,
                    borderRadius: wp(2),
                    height: wp(10),
                    width: wp(25),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    props.confirmPayment();
                  }}
                >
                  <ResponsiveText
                    style={{
                      color: "white",
                      fontFamily: Fonts.ManropeBold,
                      fontSize: 3.5,
                      // padding: wp(2),
                    }}
                  >
                    Confirm
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
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
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
  },
  modalContent: {
    height: "35%",
    width: "95%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: wp(20),
    position: "absolute",
    bottom: wp(25),
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

export default BuySellModal;

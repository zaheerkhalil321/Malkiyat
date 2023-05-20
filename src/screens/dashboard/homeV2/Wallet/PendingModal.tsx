import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
  Keyboard,
  ScrollView,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "../../../../components/common/ResponseiveText";
import ProgressCircle from "react-native-progress-circle";
import Fonts from "@src/theme/fonts";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import { TransactionInProcessingI } from "@src/services/model";
import {
  calculateTimeStamp,
  circleProgressHours,
  valueWithCommas,
} from "@src/utils/helperFunction";
import { handelColor } from "../CashOut/PendingState";
import moment from "moment";

interface Props {
  modalData: TransactionInProcessingI;
}
// ! DATE ISSUE & memoization
const PendingModal = React.forwardRef((props: Props, ref: any) => {
  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  return (
    <Modalize
      onOverlayPress={() => Keyboard.dismiss()}
      ref={ref}
      modalHeight={500}
      // panGestureComponentEnabled
      closeOnOverlayTap={true}
      HeaderComponent={() => (
        <ScrollView style={{ paddingHorizontal: wp(5) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: wp(8),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 5.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Details
            </ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ProgressCircle
                percent={circleProgressHours(
                  props?.modalData.createdDate,
                  props?.modalData?.expiryDate
                )}
                radius={wp(6)}
                borderWidth={6}
                color={handelColor(
                  circleProgressHours(
                    props?.modalData.createdDate,
                    props?.modalData?.expiryDate
                  )
                )}
                shadowColor="#ECECEC"
                bgColor="white"
              ></ProgressCircle>
              <View style={{ marginLeft: wp(3), marginRight: wp(4) }}>
                {props.modalData?.expiryDate && (
                  <ResponsiveText
                    style={{
                      fontSize: 3.73,
                      color: handelColor(
                        circleProgressHours(
                          props.modalData.createdDate,
                          props.modalData.expiryDate
                        )
                      ),
                      fontFamily: Fonts.ManropeBold,
                    }}
                  >
                    {moment(props?.modalData?.expiryDate).diff(
                      moment(),
                      "minutes"
                    ) > 0
                      ? calculateTimeStamp(
                          Date.now() ?? undefined,
                          moment(
                            props?.modalData?.expiryDate ?? undefined,
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        )
                      : "0 mins"}
                  </ResponsiveText>
                )}
                <ResponsiveText style={{ fontSize: 2.67, color: "#BCBCBC" }}>
                  Remaining
                </ResponsiveText>
              </View>
            </View>
          </View>
          {props.modalData?.status && (
            <View style={styles.statusView}>
              <ResponsiveText>Status: </ResponsiveText>
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 4,
                  color: "#2BACE3",
                }}
              >
                {props.modalData.status.toLowerCase() == "pending"
                  ? "In Process"
                  : props.modalData?.status?.slice(0, 1).toUpperCase() +
                    props.modalData?.status?.slice(1)}
              </ResponsiveText>
            </View>
          )}

          <ResponsiveText
            style={{
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.3,
              marginVertical: wp(2),
              marginTop: wp(10),
              color: "#2BACE3",
            }}
          >
            Contact Details
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(3),
            }}
          >
            <ResponsiveText>Account Title:</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {registerUserData?.userInfo?.firstName +
                " " +
                registerUserData?.userInfo?.lastName}
            </ResponsiveText>
          </View>

          {props.modalData?.accNo && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: wp(6),
              }}
            >
              <ResponsiveText>Account Number/{"\n"}IBAN</ResponsiveText>
              <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                {props.modalData?.accNo ?? ""}
              </ResponsiveText>
            </View>
          )}

          {props.modalData?.bankName && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: wp(3),
              }}
            >
              <ResponsiveText>Bank Name</ResponsiveText>
              <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                {props.modalData?.bankName ?? ""}
              </ResponsiveText>
            </View>
          )}
          {props.modalData?.address && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: wp(5),
              }}
            >
              <ResponsiveText>Address:</ResponsiveText>
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeSemiBold,
                  width: wp(50),
                  textAlign: "right",
                }}
              >
                {props.modalData?.address}
              </ResponsiveText>
            </View>
          )}
          <View
            style={{
              backgroundColor: "#EBEBEB",
              height: 1,
              marginVertical: wp(5),
            }}
          />

          {props?.modalData?.paymentType && (
            <>
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 4.3,
                  // marginVertical: wp(2),
                  // marginTop: wp(5),
                  color: "#2BACE3",
                  marginBottom: wp(3),
                }}
              >
                Payment Details
              </ResponsiveText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: wp(3),
                }}
              >
                <ResponsiveText>Payment Type</ResponsiveText>

                <ResponsiveText>{props?.modalData?.paymentName}</ResponsiveText>
              </View>
            </>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: wp(3),
            }}
          >
            <ResponsiveText>Amount:</ResponsiveText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                  fontSize: 3.73,
                }}
              >
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{ fontFamily: Fonts.ManropeBold, fontSize: 4 }}
              >
                {valueWithCommas(props?.modalData?.amount)}
                {/* {valueWithCommas(props.route?.params?.amount)} */}
              </ResponsiveText>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("tel:042111111111");
            }}
            disabled={
              moment(props?.modalData?.expiryDate).diff(moment(), "minutes") > 0
                ? true
                : false
            }
            style={{
              backgroundColor:
                moment(props?.modalData?.expiryDate).diff(moment(), "minutes") >
                0
                  ? "#dedede"
                  : "#2BACE3",
              borderRadius: wp(10),
              justifyContent: "center",
              alignItems: "center",
              height: wp(10),
              marginTop: wp(10),
              marginBottom: wp(10),
            }}
          >
            <ResponsiveText style={{ color: "white" }}>
              Contact Support
            </ResponsiveText>
          </TouchableOpacity>
        </ScrollView>
      )}
    ></Modalize>
  );
});

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

    // justifyContent: "center",
  },
  modalContent: {
    // height: "40%",
    width: "96%",
    backgroundColor: "white",
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    position: "absolute",
    bottom: wp(5),
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
  statusView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.memo(PendingModal);

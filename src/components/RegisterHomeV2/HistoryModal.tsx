import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import moment from "moment";

import { useTheme } from "@react-navigation/native";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { valueWithCommas } from "@src/utils/helperFunction";
import {
  userTransactions,
  userTransactionsDetailsI,
} from "@src/services/model";

interface HistoryModalPropsI {
  modalData: userTransactionsDetailsI[];
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
  historyDetailsById: any;
  amount: string;
}

const HistoryModal = (props: HistoryModalPropsI) => {
  // function showPaymentName(paymentName: string): string {
  //   let text = String(paymentName).split("-")[0];
  //   text = text.charAt(0).toUpperCase() + text.slice(1);
  //   return text;
  // }
  // const totalAmount = props.modalData.reduce(
  //   (prev, curr) => prev + curr.transactionAmount!,
  //   0
  // );

  const updatedData = props.modalData.sort(
    (a, b) => b.transactionAmount! - a.transactionAmount!
  );

  if (props.modalData.length > 0) {
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
            {/* {props.modalData[0].transactionCategory == "topup" && (
              <ResponsiveText
                style={{
                  fontSize: 4.8,
                  fontFamily: Fonts.ManropeBold,
                  // marginTop: wp(5),
                }}
              >
                Top up wallet
              </ResponsiveText>
            )}
            {props.modalData[0].transactionCategory == "sold" && (
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    // marginTop: wp(5),
                  }}
                >
                  Sold{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    color: "#3577DB",
                    // marginTop: wp(5),
                  }}
                >
                  {`${props.modalData[0].boughtSmallerUnits} ${props.modalData[0].smallerUnit}`}
                </ResponsiveText>
              </View>
            )}
            {props.modalData[0].transactionCategory == "bought" && (
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    // marginTop: wp(5),
                  }}
                >
                  Bought{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    color: "#3577DB",
                    // marginTop: wp(5),
                  }}
                >
                  {`${props.modalData[0].boughtSmallerUnits} ${props.modalData[0].smallerUnit}`}
                </ResponsiveText>
              </View>
            )} */}
            {props.historyDetailsById.item.category == "cashin" && (
              <ResponsiveText
                style={{
                  fontSize: 4.8,
                  fontFamily: Fonts.ManropeBold,
                  // marginTop: wp(5),
                }}
              >
                Top up wallet
              </ResponsiveText>
            )}
            {props.historyDetailsById.item.category == "cashout" && (
              <ResponsiveText
                style={{
                  fontSize: 4.8,
                  fontFamily: Fonts.ManropeBold,
                  // marginTop: wp(5),
                }}
              >
                Withdraw
              </ResponsiveText>
            )}
            {props.historyDetailsById.item.category == "sold" && (
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    // marginTop: wp(5),
                  }}
                >
                  Sold{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    color: "#2BACE3",
                    // marginTop: wp(5),
                  }}
                >
                  {`${props.historyDetailsById.item.boughtSmallerUnit} ${props.historyDetailsById.item.smallerUnit}`}
                </ResponsiveText>
              </View>
            )}
            {props.historyDetailsById.item.category == "bought" && (
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    // marginTop: wp(5),
                  }}
                >
                  Bought{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    color: "#2BACE3",
                    // marginTop: wp(5),
                  }}
                >
                  {`${props.historyDetailsById.item.boughtSmallerUnit} ${props.historyDetailsById.item.smallerUnit}`}
                </ResponsiveText>
              </View>
            )}

            <ResponsiveText
              style={{
                fontSize: 3.47,
                marginVertical: wp(1),
                fontFamily: Fonts.ManropeMedium,
              }}
            >
              Transaction ID: {props.modalData[0].transactionId}
            </ResponsiveText>
            <ResponsiveText style={{ fontSize: 3.47 }}>
              {/* on June 26, 2021 at 00:38 */}
              on{" "}
              {moment(props.modalData[0].transactionDate).format(
                "MMMM Do, YYYY"
              )}{" "}
              at {moment(props.modalData[0].transactionDate).format("h:mm a")}
            </ResponsiveText>
            <ResponsiveText style={{ fontSize: 3.2, marginVertical: wp(2) }}>
              {/* **************************************************** */}
            </ResponsiveText>
            {props.historyDetailsById.item.category == "cashin" ||
            props.historyDetailsById.item.category == "cashout" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: wp(70),
                  }}
                >
                  <ResponsiveText
                    style={{ fontSize: 3.47, fontFamily: Fonts.ManropeMedium }}
                  >
                    Payment Method:
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      fontSize: 3.47,
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    {props.historyDetailsById.item.paymentName}
                  </ResponsiveText>
                </View>
                {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(70),
                  marginVertical: wp(2),
                }}
              >
                <ResponsiveText style={{ fontSize: 3.47 }}>
                  Property address:
                </ResponsiveText>
                <ResponsiveText
                  numberOfLines={1}
                  style={{ fontSize: 3.47, width: wp(40) }}
                >
                  {props.modalData.propertyAddress}
                </ResponsiveText>
              </View> */}
                {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(70),
                }}
              >
                <ResponsiveText style={{ fontSize: 3.47 }}>
                  Type:
                </ResponsiveText>
                <ResponsiveText style={{ fontSize: 3.47 }}>
                  {props.modalData.propertyType}
                </ResponsiveText>
              </View> */}
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: wp(70),
                  }}
                >
                  <ResponsiveText
                    style={{ fontSize: 3.47, fontFamily: Fonts.ManropeMedium }}
                  >
                    Project:
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      fontSize: 3.47,
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    {props.modalData[0].propertyName}
                  </ResponsiveText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: wp(70),
                    marginVertical: wp(5),
                    alignItems: "center",

                    // backgroundColor: 'red'
                  }}
                >
                  <ResponsiveText
                    style={{ fontSize: 3.47, fontFamily: Fonts.ManropeMedium }}
                  >
                    Property:
                  </ResponsiveText>
                  <ResponsiveText
                    // numberOfLines={1}
                    style={{
                      fontSize: 3.47,
                      width: wp(45),
                      fontFamily: Fonts.ManropeSemiBold,
                      textAlign: "right",

                      // textAlign: 'justify'
                      // backgroundColor: "red",
                    }}
                  >
                    {props.modalData[0].propertyAddress}
                  </ResponsiveText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: wp(70),
                  }}
                >
                  <ResponsiveText
                    style={{ fontSize: 3.47, fontFamily: Fonts.ManropeMedium }}
                  >
                    Payment Method:
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      fontSize: 3.47,
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    {props.historyDetailsById.item.paymentName}
                    {/* {props.modalData[0].propertyType} */}
                  </ResponsiveText>
                </View>
              </>
            )}

            <View
              style={{
                marginVertical: wp(3),
                backgroundColor: "#BDBDBD",
                height: 1,
                width: "90%",
              }}
            />

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(70),
              }}
            >
              <ResponsiveText
                style={{ fontSize: 3.47, fontFamily: Fonts.ManropeMedium }}
              >
                Paid by:
              </ResponsiveText>
              <ResponsiveText
                style={{ fontSize: 3.47, fontFamily: Fonts.ManropeSemiBold }}
              >
                {" "}
                {showPaymentName(props.modalData[0].paidBy!)}
              </ResponsiveText>
            </View> */}
            {updatedData?.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(70),
                  marginVertical: wp(2),
                }}
              >
                <ResponsiveText
                  style={{ fontSize: 3.47, fontFamily: Fonts.ManropeMedium }}
                >
                  {item.feeType}:
                </ResponsiveText>
                <View style={{ flexDirection: "row" }}>
                  <ResponsiveText
                    style={{
                      fontSize: 3.47,
                      alignSelf: "flex-end",
                      marginBottom: wp(0.5),
                      color: "#8D8D8D",
                    }}
                  >
                    Rs.{" "}
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      fontSize: 3.47,
                      fontFamily: Fonts.ManropeBold,
                      color: "#8D8D8D",
                    }}
                  >
                    {valueWithCommas(item.transactionAmount)}
                  </ResponsiveText>
                </View>
              </View>
            ))}
            <View
              style={{
                marginVertical: wp(3),
                backgroundColor: "#BDBDBD",
                height: 1,
                width: "90%",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(70),
                marginVertical: wp(2),
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.47,
                  fontFamily: Fonts.ManropeMedium,
                  textAlignVertical: "bottom",
                  marginTop: 5,
                }}
              >
                {props.historyDetailsById?.item?.category == "sold" ||
                props.historyDetailsById?.item?.category == "cashin"
                  ? "Total Received"
                  : "Total Paid"}
              </ResponsiveText>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.73,
                    alignSelf: "flex-end",
                    marginBottom: wp(0.8),
                    color: "#2BACE3",
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 6.4,
                    fontFamily: Fonts.ManropeBold,
                    color: "#2BACE3",
                  }}
                >
                  {props.amount}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  } else {
    return null;
  }
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
    // height: "45%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: wp(10),
    borderRadius: wp(3),
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

export default React.memo(HistoryModal);

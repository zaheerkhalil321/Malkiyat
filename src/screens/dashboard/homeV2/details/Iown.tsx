import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { wp } from "@src/components/common/Responsive";
import { valueWithCommas, valueConverstion } from "@src/utils/helperFunction";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Build1 from "@src/assets/images/build4.svg";
import Build2 from "@src/assets/images/build2.svg";
import Build3 from "@src/assets/images/build3.svg";
import Icon3 from "@src/assets/images/history_one.svg";

import Fonts from "@src/theme/fonts";
import IownPer from "@src/components/common/IownPer";
import Content from "@src/components/common/Content";
import { RootState } from "@src/redux/reducers";
import { useSelector } from "react-redux";
import Frame1 from "@src/assets/images/Frame1.svg";
import Frame2 from "@src/assets/images/Frame2.svg";
import HistoryDataSet, {
  TransactionType,
} from "@src/helpers/constants/HistoryDataSet";
import moment from "moment";
import { userTransactions } from "@src/services/model";
import ViewMore from "@src/assets/images/button.svg";
import _ from "lodash";
import RegisterModal from "@src/components/AdvertiseModal/RegisterModal";

const TRANSACTION_HISTORY_LIMIT = 4;

const Iown = (props) => {
  // console.log(props, 'kkkkkkkkkkk')
  // const { params } = props.route?.params;
  const reducerState = useSelector(
    (state: RootState) => state.unregisterUser.propertyAllData
  );
  const [transactionCount, setTransactionCount] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(false);
  // console.log(reducerState.propertyIownData, 'oooooo')
  return (
    <Content
      onMomentumScrollEnd={() => {
        transactionCount * TRANSACTION_HISTORY_LIMIT <
          _.size(reducerState?.propertyIownData?.purchaseHistory) &&
          setTransactionCount((prev) => prev + 1);
      }}
    >
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingTop: wp(10),
          paddingBottom: wp(7),
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#3577DB",
            borderRadius: wp(3),
            paddingHorizontal: wp(2),
            paddingVertical: wp(4),
            paddingTop: wp(10),
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#3577DB",
              borderRadius: wp(2),
              paddingHorizontal: wp(5),
              paddingVertical: wp(2),
              position: "absolute",
              top: -wp(5),
              left: wp(30),
            }}
          >
            <ResponsiveText>
              I own{" "}
              <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
                {reducerState?.propertyIownData?.OwnedSmallerUnits ?? 0}
              </ResponsiveText>{" "}
              Sqft
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-between",
              // paddingTop: wp(4),
            }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   props.navigation.navigate("MySqFt");
              // }}
              style={{ alignItems: "center", width: wp(29) }}
            >
              <Build1 />
              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  marginTop: wp(2),
                  marginBottom: wp(1),
                }}
              >
                Purchase price
              </ResponsiveText>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    alignSelf: "flex-end",
                    marginBottom: wp(0.5),
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontSize: 4.27, fontFamily: Fonts.ManropeBold }}
                >
                  {valueConverstion(
                    reducerState?.propertyIownData?.purchasePrice ?? 0
                  )}
                </ResponsiveText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setValue(false);
              }}
              style={{ alignItems: "center", width: wp(30) }}
            >
              <Build2 />

              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  marginTop: wp(2),
                  marginBottom: wp(1),
                }}
              >
                Profit
              </ResponsiveText>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    alignSelf: "flex-end",
                    marginBottom: wp(0.5),
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontSize: 4.27, fontFamily: Fonts.ManropeBold }}
                >
                  {valueConverstion(
                    reducerState?.propertyIownData?.profit ?? 0
                  )}
                </ResponsiveText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setValue(true);
              }}
              style={{ alignItems: "center", width: wp(29) }}
            >
              <Build3 />
              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  marginTop: wp(2),
                  marginBottom: wp(1),
                }}
              >
                Value
              </ResponsiveText>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.8,
                    alignSelf: "flex-end",
                    marginBottom: wp(0.5),
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontSize: 4.27, fontFamily: Fonts.ManropeBold }}
                >
                  {valueConverstion(
                    reducerState?.propertyIownData?.currentValue
                  )}
                </ResponsiveText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: wp(5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SellSqft", {
                params: props.propInfo,
              });
            }}
            style={{
              width: wp(55),
              height: wp(8.53),
              borderRadius: wp(10),
              borderColor: "#00B9F7",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ResponsiveText
              style={{
                color: "#00B9F7",
                fontFamily: Fonts.ManropeBold,
                fontSize: 4,
                textAlign: "center",
              }}
            >
              Sell your Sqft
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
      <ResponsiveText style={styles.headerTitle}>
        Property Trends
      </ResponsiveText>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: wp(10),
        }}
      >
        <View style={{ paddingHorizontal: wp(4) }}>
          <View style={{ marginTop: wp(5) }}>
            <IownPer
              onPress={() => {
                props.navigation.navigate("IncreasePerYear");
              }}
              image={require("@src/assets/images/Frame.png")}
              title={"Property price"}
              lastThreeYearIncrease={
                reducerState?.propertyIownData?.lastThreeYearIncrease
              }
              text={"Last 3 years"}
            />
          </View>
          <View style={{ marginVertical: wp(5) }}>
            <IownPer
              onPress={() => {
                props.navigation.navigate("Iown");
              }}
              lastThreeYearIncrease={
                reducerState?.propertyIownData?.sqFtIncrease
              }
              title={"Sqft price on Malkiyat"}
              text={"Last 3 months"}
              image={require("@src/assets/images/brought.png")}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#FF9A2E",
              borderRadius: wp(4),
              paddingHorizontal: wp(5),
              paddingVertical: wp(4),
              marginBottom: wp(5),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Frame2
                  style={{
                    width: wp(6.4),
                    height: wp(7.47),
                    marginRight: wp(3),
                  }}
                />
                {/* <Image style={{ width: wp(6.4), height: wp(7.47), resizeMode: 'contain', marginRight: wp(3) }} source={require('@src/assets/images/brought.png')} /> */}
                <View>
                  <ResponsiveText style={{ fontSize: 4.27 }}>
                    Sqft demand
                  </ResponsiveText>
                  <ResponsiveText style={{ color: "#8A8A8E", fontSize: 3.47 }}>
                    No. of transactions
                  </ResponsiveText>
                  <ResponsiveText style={{ color: "#2BACE3", fontSize: 3.47 }}>
                    last week
                  </ResponsiveText>
                </View>
              </View>
              <ResponsiveText
                style={{
                  fontSize: 5.53,
                  fontFamily: Fonts.ManropeBold,
                  color:
                    Number(reducerState?.propertyIownData?.transactionsCount) >
                    0
                      ? "#4CAF50"
                      : "#2BACE3",
                }}
              >
                {findValue(
                  reducerState?.propertyIownData?.transactionsCount
                ).slice(1)}
              </ResponsiveText>
            </View>
          </View>
          {reducerState?.propertyIownData?.purchaseHistory?.length > 0 ? (
            <>
              <ResponsiveText
                style={{ fontFamily: Fonts.ManropeBold, marginBottom: wp(5) }}
              >
                My Purchase History
              </ResponsiveText>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#FF9A2E",
                  borderRadius: wp(4),
                  // paddingVertical: wp(4),
                  backgroundColor: "white",
                }}
              >
                {reducerState?.propertyIownData?.purchaseHistory
                  ?.slice(0, TRANSACTION_HISTORY_LIMIT * transactionCount)
                  ?.map((item, index) => {
                    return (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: wp(4),
                            paddingHorizontal: wp(5),
                            borderBottomColor: "red",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Icon3 width={20} height={20} />

                            <View>
                              <ResponsiveText
                                style={{
                                  fontSize: 4.27,
                                  marginBottom: wp(1),
                                  marginLeft: wp(3),
                                }}
                              >
                                {TransactionType(
                                  item as unknown as userTransactions
                                )}
                                {/* sqft */}
                              </ResponsiveText>
                              <ResponsiveText
                                style={{
                                  fontSize: 3.2,
                                  color: "#8A8A8E",
                                  // width: wp(47),
                                  marginLeft: wp(3),
                                  // backgroundColor: 'red'
                                }}
                              >
                                {moment(item.transDateTime).format("LT")}
                              </ResponsiveText>
                            </View>
                          </View>

                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <ResponsiveText
                                style={{
                                  fontSize: 3.2,
                                  marginTop: wp(1),
                                  color: "#4CAF50",
                                }}
                              >
                                Rs.{" "}
                              </ResponsiveText>
                              <ResponsiveText
                                style={{
                                  fontSize: 5,
                                  fontFamily: Fonts.ManropeBold,
                                  color: "#4CAF50",
                                }}
                              >
                                {valueWithCommas(item.amount)}
                              </ResponsiveText>
                            </View>

                            <ResponsiveText
                              style={{
                                fontSize: 3.2,
                                alignSelf: "flex-end",
                                color: "#8A8A8E",
                              }}
                            >
                              per Sqft
                            </ResponsiveText>
                          </View>
                        </View>

                        <View
                          style={{
                            backgroundColor: "#E0E6EB",
                            height: 1,
                            // marginTop: wp(2),
                            // marginVertical: wp(2),
                            marginHorizontal: wp(6),
                          }}
                        />
                      </View>
                    );
                  })}
              </View>
              {/* {transactionCount * TRANSACTION_HISTORY_LIMIT <
                _.size(reducerState?.propertyIownData?.purchaseHistory) && (
                <TouchableOpacity
                  onPress={() => setTransactionCount((prev) => prev + 1)}
                  style={{
                    alignSelf: "flex-end",
                    marginBottom: 15,
                    marginTop: 10,
                  }}
                >
                  <ViewMore />
                </TouchableOpacity>
              )} */}
              {/* <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("TransactionHistory");
                }}
                style={{
                  alignSelf: "flex-end",
                  marginBottom: wp(2),
                  marginTop: wp(5),
                }}
              >
                <ViewMore />
              </TouchableOpacity> */}
            </>
          ) : null}
        </View>
      </View>
      <RegisterModal
        value={value}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Content>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: "#565B76",
    fontFamily: Fonts.ManropeBold,
    fontSize: 4,
    marginLeft: wp(5),
    marginBottom: wp(3),
  },
});

export default Iown;

export function findValue(value: string): string {
  return Number(value) > 0 ? "+" + value : "-" + value;
}

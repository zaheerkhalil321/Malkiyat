import React, { ReactNode, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Step2 from "@src/assets/images/ad2.svg";
import Block from "@src/assets/images/advertise2.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Content from "@src/components/common/Content";
import Arrow from "@src/assets/images/left_arrow.svg";
import { PropertyI } from "@src/services/model";
import { valueConverstion, valueWithCommas } from "@src/utils/helperFunction";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux";
import { PriceGuideInterface } from "./Advertise";
import SideArrow from "@src/assets/images/sid.svg";
import SideArrow2 from "@src/assets/images/sid2.svg";
import _ from "lodash";
import AdvertiseModal from "@src/components/AdvertiseModal/AdvertiseModal";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

const AdvertiseStep2 = (props: Props) => {
  const { count, propertyInfo, priceDetail, type } = props.route.params as {
    count: number;
    propertyInfo: PropertyI;
    priceDetail: PriceGuideInterface;
    type: "Seller" | "Buyer";
  };
  var userWalletBalance = Number(
    store.getState().registerUser?.registerUserData?.propertiesData?.data
      ?.balance?.walletBalance
  );
  const [show, setShow] = useState(false);
  const [sqftPrice, setSqftPrice] = useState<string>("");
  const [modalObj, setModalObj] = useState<{
    modalVisible: boolean;
    totalCost: number;
    text: ReactNode;
  }>({
    modalVisible: false,
    totalCost: 0,
    text: undefined,
  });
  const highestValue = Math.floor(
    priceDetail?.fairPrice +
    priceDetail?.fairPrice *
    (Number(
      store.getState().registerUser?.registerUserData?.appSettings
        ?.bidUpperLimitValue
    ) /
      100)
  );
  const lowestValue = Math.floor(
    priceDetail?.fairPrice -
    (priceDetail?.fairPrice *
      (Number(
        store.getState().registerUser?.registerUserData?.appSettings
          ?.bidLowerLimitValue
      ) /
        100) +
      1)
  );

  const handleSqfts = (args: string) => {
    args = args.replace(/[^0-9]/g, "");

    //!sqftPrice = args
    setSqftPrice(args);
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        automaticallyAdjustContentInsets={true}
        extraHeight={100}
      >
        <HomeHeader
          back
          backgroundColor={"white"}
          show={true}
          {...props}
          title={"Advertise your demand"}
        />
        <View style={{ alignItems: "center", marginTop: wp(5) }}>
          <Step2 />
        </View>
        <Content style={{ paddingHorizontal: wp(3), paddingVertical: wp(5) }}>
          <View
            style={{
              paddingHorizontal: wp(5),
              paddingVertical: wp(5),
              backgroundColor: "white",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Block />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#2BACE3",
                borderRadius: wp(5),
                marginTop: wp(6),
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: wp(5),
                  paddingHorizontal: wp(6),
                  marginTop: wp(4),
                }}
              >
                <ResponsiveText style={{ color: "#9A9A9A" }}>
                  I own{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontFamily: Fonts.ManropeBold, color: "#2BACE3" }}
                >
                  {String(priceDetail?.unitsForSale) ?? 0} Sqft
                </ResponsiveText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: wp(5),
                  paddingHorizontal: wp(6),
                  marginTop: wp(2),
                }}
              >
                <ResponsiveText style={{ color: "#9A9A9A" }}>
                  I want to {type == "Seller" ? "sell" : "buy"}{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontFamily: Fonts.ManropeBold, color: "#2BACE3" }}
                >
                  {count} Sqft
                </ResponsiveText>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setShow(!show);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: wp(12),
                  paddingHorizontal: wp(6),
                  paddingVertical: wp(3.5),
                  marginTop: wp(3),
                  backgroundColor: "#2BACE3",
                }}
              >
                <ResponsiveText
                  style={{ fontFamily: Fonts.ManropeBold, color: "white" }}
                >
                  Price Guide{" "}
                </ResponsiveText>
                {!show ? (
                  <SideArrow color={"white"} />
                ) : (
                  <SideArrow2 color={"white"} />
                )}
              </TouchableOpacity>
              {show && (
                <View
                  style={{
                    backgroundColor: "#2BACE3",
                    paddingHorizontal: wp(6),
                    paddingBottom: wp(3),
                  }}
                >
                  <ResponsiveText
                    style={{
                      fontSize: 3,
                      fontFamily: Fonts.ManropeBold,
                      color: "white",
                    }}
                  >
                    Transactions
                  </ResponsiveText>
                  <View
                    style={{
                      backgroundColor: "#6CC6EC",
                      height: 1,
                      marginBottom: wp(1),
                      marginTop: wp(0.5),
                      marginLeft: wp(5),
                      marginRight: wp(5),
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingRight: wp(5),
                      alignItems: "center",
                    }}
                  >
                    <ResponsiveText style={{ color: "white" }}>
                      Last Sqft Sold{" "}
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        marginTop: wp(1),
                        fontFamily: Fonts.ManropeBold,
                        color: "white",
                      }}
                    >
                      <ResponsiveText
                        style={{
                          fontSize: 3.2,
                          fontFamily: Fonts.ManropeBold,
                          color: "white",
                        }}
                      >
                        Rs
                      </ResponsiveText>{" "}
                      {valueWithCommas(priceDetail?.lastSold)}
                    </ResponsiveText>
                  </View>

                  <>
                    <ResponsiveText
                      style={{
                        fontSize: 3,
                        fontFamily: Fonts.ManropeBold,
                        color: "white",
                        marginTop: wp(3),
                      }}
                    >
                      Demands
                    </ResponsiveText>
                    <View
                      style={{
                        backgroundColor: "#6CC6EC",
                        height: 1,
                        marginBottom: wp(1),
                        marginTop: wp(0.5),
                        marginLeft: wp(5),
                        marginRight: wp(5),
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: wp(5),
                        alignItems: "center",
                      }}
                    >
                      <ResponsiveText style={{ color: "white" }}>
                        Lowest Seller{" "}
                      </ResponsiveText>
                      <ResponsiveText
                        style={{
                          marginTop: wp(1),
                          fontFamily: Fonts.ManropeBold,
                          color: "white",
                        }}
                      >
                        <ResponsiveText
                          style={{
                            fontSize: 3.2,
                            fontFamily: Fonts.ManropeBold,
                            color: "white",
                          }}
                        >
                          Rs
                        </ResponsiveText>{" "}
                        {priceDetail?.lowestSeller
                          ? valueWithCommas(priceDetail?.lowestSeller)
                          : 0}
                      </ResponsiveText>
                    </View>
                  </>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingRight: wp(5),
                      alignItems: "center",
                    }}
                  >
                    <ResponsiveText style={{ color: "white" }}>
                      Highest Buyer{" "}
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        marginTop: wp(1),
                        fontFamily: Fonts.ManropeBold,
                        color: "white",
                      }}
                    >
                      <ResponsiveText
                        style={{
                          fontSize: 3.2,
                          fontFamily: Fonts.ManropeBold,
                          color: "white",
                        }}
                      >
                        Rs
                      </ResponsiveText>{" "}
                      {priceDetail?.highestBuyer
                        ? valueWithCommas(priceDetail?.highestBuyer)
                        : 0}
                    </ResponsiveText>
                  </View>

                  <ResponsiveText
                    style={{
                      fontSize: 3,
                      fontFamily: Fonts.ManropeBold,
                      color: "white",
                      marginTop: wp(3),
                    }}
                  >
                    Evaluation
                  </ResponsiveText>
                  <View
                    style={{
                      backgroundColor: "#6CC6EC",
                      height: 1,
                      marginBottom: wp(1),
                      marginTop: wp(0.5),
                      marginLeft: wp(5),
                      marginRight: wp(5),
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingRight: wp(5),
                      alignItems: "center",
                    }}
                  >
                    <ResponsiveText style={{ color: "white" }}>
                      Fair Price{" "}
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        marginTop: wp(1),
                        fontFamily: Fonts.ManropeBold,
                        color: "white",
                      }}
                    >
                      <ResponsiveText
                        style={{
                          fontSize: 3.2,
                          fontFamily: Fonts.ManropeBold,
                          color: "white",
                        }}
                      >
                        Rs
                      </ResponsiveText>{" "}
                      {valueWithCommas(priceDetail?.fairPrice)}
                    </ResponsiveText>
                  </View>
                </View>
              )}
            </View>
            {/* <ResponsiveText style={{ fontSize: 5, marginTop: wp(4) }}>
            Enter your demand price
          </ResponsiveText> */}

            <View
              style={{
                borderColor: "#79757F",
                borderWidth: 1,
                paddingHorizontal: wp(4),
                //   marginHorizontal: wp(4),
                borderRadius: wp(1),
                // paddingVertical: wp(4),
                height: wp(14),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: wp(10),
                // backgroundColor: "red",
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.2,
                  fontFamily: Fonts.ManropeBold,
                  color: "black",
                  position: "absolute",
                  top: -10,
                  left: 10,
                  paddingHorizontal: 5,
                  backgroundColor: "white",
                }}
              >
                My demand price
              </ResponsiveText>
              <TextInput
                maxLength={10}
                style={{ width: wp(55), height: wp(10) }}
                onChangeText={handleSqfts}
                value={valueWithCommas(sqftPrice)}
                defaultValue={""}
                keyboardType="numeric"
                placeholder="Enter your demand price"
              />
            </View>
            {sqftPrice ? (
              <ResponsiveText style={{ marginTop: wp(2), color: "#3577DB" }}>
                {" "}
                {valueWithCommas(sqftPrice)} x {count} =
                {valueWithCommas(Number(sqftPrice) * Number(count))}
              </ResponsiveText>
            ) : null}
          </View>
          <ResponsiveText
            style={{ fontSize: 3.73, color: "#9E9E9E", marginLeft: wp(5) }}
          >
            Maximum demand allowed: Rs. {valueWithCommas(highestValue)}
          </ResponsiveText>
        </Content>
        <View
          style={{
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
            borderTopColor: "#EEEEEE",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            disabled={_.isEmpty(sqftPrice) ? true : false}
            onPress={() => {
              let totalCost = Number(sqftPrice) * Number(count);
              if (
                Number(sqftPrice) <= highestValue &&
                Number(sqftPrice) >= lowestValue
              ) {
                if (
                  Number(totalCost) > Number(userWalletBalance) &&
                  type == "Buyer"
                ) {
                  !modalObj.modalVisible &&
                    setModalObj({
                      modalVisible: true,
                      totalCost: totalCost,
                      text: (
                        <ResponsiveText
                          style={{ textAlign: "center", fontSize: 4 }}
                        >
                          Insufficient Balance!{"\n"}{" "}
                          <ResponsiveText
                            style={{ fontFamily: Fonts.ManropeBold }}
                          >
                            Rs. {valueWithCommas(userWalletBalance)}
                          </ResponsiveText>
                          . You need{" "}
                          <ResponsiveText
                            style={{ fontFamily: Fonts.ManropeBold }}
                          >
                            Rs.{" "}
                            {valueWithCommas(
                              Number(Math.round(totalCost)) -
                              Number(userWalletBalance)
                            )}
                          </ResponsiveText>{" "}
                          more so that the deal can be completed if your demand
                          is met.
                        </ResponsiveText>
                      ),
                    });
                } else {
                  props.navigation.navigate("AdvertiseStep3", {
                    count,
                    sqftPrice,
                    propertyInfo,
                    priceDetail,
                    type,
                  });
                }
              }

              // Alert.alert(
              //   `Your wallet balance is ${valueWithCommas(
              //     userWalletBalance
              //   )} but sqft cost is ${valueWithCommas(totalCost)}.`
              // );
              // Alert.alert(
              //   `Not enough funds in your wallet (balance: Rs. ${valueWithCommas(
              //     userWalletBalance
              //   )}). You need Rs. ${valueWithCommas(
              //     Number(Math.round(totalCost)) - Number(userWalletBalance)
              //   )} more so that the deal can be completed if your demand is met.`
              // );
              // Alert.alert(
              //   `You can only enter demand price between ${String(
              //     lowestValue
              //   )}  and ${String(highestValue)}`
              // );
              else {
                !modalObj.modalVisible &&
                  setModalObj({
                    modalVisible: true,
                    totalCost: totalCost,
                    text: (
                      <ResponsiveText style={{ textAlign: "center" }}>
                        You can only enter demand price between{" "}
                        <ResponsiveText
                          style={{ fontFamily: Fonts.ManropeBold }}
                        >
                          {String(valueWithCommas(lowestValue))}{" "}
                        </ResponsiveText>
                        and{" "}
                        <ResponsiveText
                          style={{ fontFamily: Fonts.ManropeBold }}
                        >
                          {String(valueWithCommas(highestValue))}
                        </ResponsiveText>
                      </ResponsiveText>
                    ),
                  });
              }
            }}
            style={{
              height: wp(14.93),
              borderRadius: wp(10),
              backgroundColor: _.isEmpty(sqftPrice) ? "#dedede" : "#2BACE3",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ResponsiveText
              style={{
                color: "white",
                fontFamily: Fonts.ManropeBold,
                fontSize: 4.53,
                marginRight: wp(3),
              }}
            >
              {"Continue"}
            </ResponsiveText>
            {<Arrow />}
          </TouchableOpacity>
        </View>
        <AdvertiseModal
          modalVisible={modalObj.modalVisible}
          setModalVisible={() =>
            setModalObj((prev) => ({
              ...prev,
              modalVisible: !modalObj.modalVisible,
            }))
          }
          text={modalObj.text}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AdvertiseStep2;

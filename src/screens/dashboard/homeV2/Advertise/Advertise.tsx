import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Step1 from "@src/assets/images/ad1.svg";
import Block from "@src/assets/images/block.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Content from "@src/components/common/Content";
import Arrow from "@src/assets/images/left_arrow.svg";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { LowestBidResponseI, PropertyI } from "@src/services/model";
import { store } from "@src/redux";
import { valueConverstion, valueWithCommas } from "@src/utils/helperFunction";
import { errorModal } from "@src/redux/action-creators";
import AdvertiseModal from "@src/components/AdvertiseModal/AdvertiseModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
export interface PriceGuideInterface {
  lowestBuyer: number;
  lastSold: number;
  fairPrice: number;
  lowestSeller: number;
  unitsForSale: number;
  highestSeller: number;
  highestBuyer: number;
}

const Advertise = (props: Props) => {
  const { propertyInfo, priceDetails, type, lowestBidData } = props.route
    .params as {
    propertyInfo: PropertyI;
    priceDetails: Partial<PriceGuideInterface>;
    lowestBidData: Partial<LowestBidResponseI>;
    type: "Buyer" | "Seller";
  };

  const [count, setCount] = useState(0);
  const [priceDetail] = useState<Partial<PriceGuideInterface>>({
    ...priceDetails,
  });
  const dispatch = useSafeDispatch();
  const [loader, setLoader] = useState<boolean>(false);
  const [modalObj, setModalObj] = useState<{
    modalVisible: boolean;
    totalCost: number;
  }>({
    modalVisible: false,
    totalCost: 0,
  });
  var userWalletBalance = Number(
    store.getState().registerUser?.registerUserData?.propertiesData?.balance
      ?.walletBalance
  );

  const handleChange = (value: string) => {
    value = value.replace(/[^0-9]/g, "");
    if (type == "Seller") {
      if (Number(value) > Number(priceDetail?.unitsForSale)) {
        dispatch(
          errorModal(
            `You have only ${priceDetail?.unitsForSale} sqft to sell!`,
            true,
            "Error"
          )
        );
        // Alert.alert(`You have only ${priceDetail?.unitsForSale} sqft to sell!`);
        setCount(priceDetail?.unitsForSale!);
      } else setCount(Number(value));
    } else {
      let totalCost =
        Number(value) *
        (Number(priceDetail.fairPrice) - Number(priceDetail.fairPrice) * 0.1);

      if (totalCost > Number(userWalletBalance)) {
        !modalObj.modalVisible &&
          setModalObj({
            modalVisible: true,
            totalCost: totalCost,
          });
        // Alert.alert(
        //   `Your wallet balance is ${valueConverstion(
        //     userWalletBalance
        //   )} but sqft cost is ${valueConverstion(totalCost)}.`
        // );
        // dispatch(
        //   errorModal(
        //     `Not enough funds in your wallet Rs. ${valueWithCommas(
        //       userWalletBalance
        //     )}. You need Rs. ${valueWithCommas(
        //       Number(Math.round(totalCost)) - Number(userWalletBalance)
        //     )} more so that the deal can be completed if your demand is met.`,
        //     true,
        //     "Error"
        //   )
        // );
        // Alert.alert(
        //   `Not enough funds in your wallet (balance: Rs. ${valueWithCommas(
        //     userWalletBalance
        //   )}). You need Rs. ${valueWithCommas(
        //     Number(Math.round(totalCost)) - Number(userWalletBalance)
        //   )} more so that the deal can be completed if your demand is met.`
        // );
      } else setCount(Number(value));
    }
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        automaticallyAdjustContentInsets={true}
      >
        <HomeHeader
          back
          backgroundColor={"white"}
          show={true}
          {...props}
          title={"Advertise your demand"}
        />
        <View style={{ alignItems: "center", marginTop: wp(5) }}>
          <Step1 />
        </View>
        <Content style={{ paddingHorizontal: wp(3), paddingVertical: wp(5) }}>
          <View style={{ alignItems: "center" }}>
            <Block />
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: "#3577DB",
              borderRadius: wp(3),
              paddingHorizontal: wp(5),
              // paddingVertical: wp(5),
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#3577DB",
                borderRadius: wp(5),
                padding: wp(5),
                marginTop: wp(10),
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: wp(6), height: wp(6) }}
                source={require("@src/assets/images/brought.png")}
              />
              <View style={{ alignItems: "center" }}>
                <ResponsiveText style={{ color: "#9A9A9A", marginTop: wp(1) }}>
                  I own{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeBold,
                    color: "#2BACE3",
                    marginTop: wp(1),
                  }}
                >
                  {priceDetail?.unitsForSale ?? 0} Sqft
                </ResponsiveText>
              </View>
            </View>
            <ResponsiveText
              style={{
                fontSize: 4.5,
                marginVertical: wp(8),
                textAlign: "center",
              }}
            >
              How many square feet you want to{" "}
              {type == "Buyer" ? "buy" : "advertise"}
            </ResponsiveText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  count != 0 && count >= 1 ? setCount(count - 1) : setCount(0);
                }}
                style={{
                  backgroundColor: "#2BACE3",
                  height: wp(14.93),
                  width: wp(14.93),
                  borderRadius: wp(10),
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: -wp(5),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    color: "white",
                    // backgroundColor: "red",
                    fontFamily: Fonts.ManropeBold,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <TextInput
                // selection={{
                //   start: count.toString().length,
                //   end: count.toString().length,
                // }}
                value={count.toString()}
                onChangeText={handleChange}
                keyboardType="numeric"
                defaultValue={String(0)}
                style={{
                  // backgroundColor: "red",
                  height: wp(10),
                  width: wp(60),
                  fontSize: 25,
                  textAlign: "center",
                  borderColor: "#2BACE3",
                  borderWidth: 1,
                  padding: 0,
                }}
              />

              <TouchableOpacity
                onPress={() => handleChange(String(count + 1))}
                style={{
                  backgroundColor: "#2BACE3",
                  height: wp(14.93),
                  width: wp(14.93),
                  borderRadius: wp(10),
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: -wp(5),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    color: "white",
                    // backgroundColor: "red",
                    fontFamily: Fonts.ManropeBold,
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
            disabled={
              type == "Buyer" && count > 0
                ? false
                : type == "Seller"
                ? count > 0 && priceDetail?.unitsForSale
                  ? false
                  : true
                : true
            }
            onPress={() => {
              props.navigation.navigate("AdvertiseStep2", {
                count,
                propertyInfo,
                priceDetail,
                type,
              });
            }}
            style={{
              height: wp(14.93),
              borderRadius: wp(10),
              backgroundColor:
                type == "Buyer" && count > 0
                  ? "#2BACE3"
                  : type == "Seller"
                  ? count > 0 && priceDetail?.unitsForSale
                    ? "#2BACE3"
                    : "#dedede"
                  : "#dedede",
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
          text={
            <ResponsiveText style={{ textAlign: "center", fontSize: 4 }}>
              Not enough funds in your wallet{"\n"}{" "}
              <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
                Rs. {valueWithCommas(userWalletBalance)}
              </ResponsiveText>
              . You need{" "}
              <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
                Rs.{" "}
                {valueWithCommas(
                  Number(Math.round(modalObj.totalCost!)) -
                    Number(userWalletBalance)
                )}
              </ResponsiveText>{" "}
              more so that the deal can be completed if your demand is met.
            </ResponsiveText>
          }
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Advertise;

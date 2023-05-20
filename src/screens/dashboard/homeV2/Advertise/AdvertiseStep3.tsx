import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Step3 from "@src/assets/images/ad3.svg";
import Block from "@src/assets/images/blo.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Content from "@src/components/common/Content";
import Arrow from "@src/assets/images/left_arrow.svg";
import { CreateBidI, PropertyI } from "@src/services/model";
import { store } from "@src/redux";
import { PriceGuideInterface } from "./Advertise";
import { valueWithCommas } from "@src/utils/helperFunction";
import SideArrow from "@src/assets/images/sid.svg";
import SideArrow2 from "@src/assets/images/sid2.svg";
import moment from "moment";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

const AdvertiseStep3 = (props: Props) => {
  const { count, propertyInfo, sqftPrice, priceDetail, type } = props.route
    .params as {
      count: number;
      propertyInfo: PropertyI;
      sqftPrice: string;
      priceDetail: PriceGuideInterface;
      type: "Seller" | "Buyer";
    };
  const userId = store.getState().registerUser.registerUserData.userInfo.userId;
  const [show, setShow] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<{
    month: boolean;
    days: boolean;
    value: string;
  }>({ month: false, days: true, value: "" });
  const [errorObj, setErrorObj] = useState<{ error: boolean; text: string }>({
    error: false,
    text: "",
  });
  useEffect(() => {
    errorObj.error && setErrorObj({ error: false, text: "" });
  }, [selectedRadio.value, selectedRadio?.month, selectedRadio?.days]);

  const handlePress = () => {
    if (
      (selectedRadio.days || selectedRadio?.month) &&
      Number(selectedRadio.value) == 0
    ) {
      setErrorObj({ error: true, text: "Please enter days or months" });
    } else {
      const obj: CreateBidI = {
        propId: Number(propertyInfo.propertyId),
        userId: Number(userId),
        amount: Number(sqftPrice),
        smallerUnitCount: Number(count),
        status: "active",
        bidType: type == "Seller" ? "seller" : "buyer",
        days: selectedRadio.days ? Number(selectedRadio.value) : 0,
        months: selectedRadio.month ? Number(selectedRadio.value) : 0,
      };
      props.navigation.navigate("AdvertiseReview", { obj, propertyInfo });
    }
  };
  function getDate() {
    if (selectedRadio?.value?.length > 0) {
      if (selectedRadio?.days) {
        return moment().add("days", selectedRadio.value).format("D MMM, YYYY");
      }
      if (selectedRadio?.month) {
        return moment()
          .add("months", selectedRadio.value)
          .format("D MMM, YYYY");
      } else {
        return null;
      }
    }
    return null;
  }
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
          <Step3 />
        </View>
        <Content style={{ paddingHorizontal: wp(3), paddingVertical: wp(5) }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: "#3577DB",
              borderRadius: wp(3),
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
                borderColor: "#3577DB",
                borderRadius: wp(5),
                paddingHorizontal: wp(5),
                paddingVertical: wp(3),
                marginTop: wp(6),

                // backgroundColor: "#F9F9F9",
                //   alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: wp(5),
                }}
              >
                <ResponsiveText style={{ color: "#9A9A9A" }}>
                  I own{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontFamily: Fonts.ManropeBold, color: "#9E9E9E" }}
                >
                  {String(priceDetail?.unitsForSale)} Sqft
                </ResponsiveText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: wp(5),
                  marginTop: wp(1),
                }}
              >
                <ResponsiveText style={{ color: "#9A9A9A" }}>
                  I want to {type == "Seller" ? "sell" : "buy"}{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{ fontFamily: Fonts.ManropeBold, color: "#323232" }}
                >
                  {String(count)} Sqft
                </ResponsiveText>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setShow(!show);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: wp(5),
                  marginTop: wp(1),
                }}
              >
                <ResponsiveText style={{ color: "#9A9A9A" }}>
                  Demand Price
                </ResponsiveText>
                <View>
                  <ResponsiveText
                    style={{ color: "#323232", fontFamily: Fonts.ManropeBold }}
                  >
                    {valueWithCommas(sqftPrice)}
                  </ResponsiveText>
                  <ResponsiveText style={{ fontSize: 3, color: "#9E9E9E" }}>
                    per Sqft
                  </ResponsiveText>
                </View>
              </TouchableOpacity>
            </View>
            <ResponsiveText style={{ fontSize: 4.5, marginTop: wp(4) }}>
              Pleased cancel my demand after
            </ResponsiveText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: wp(5),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  !selectedRadio.days &&
                    setSelectedRadio({
                      month: false,
                      days: true,
                      value: "",
                    });
                }}
                style={{
                  width: wp(6),
                  height: wp(6),
                  borderRadius: wp(10),
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#2BACE3",
                }}
              >
                <View
                  style={{
                    width: wp(3.5),
                    height: wp(3.5),
                    borderRadius: wp(10),
                    // backgroundColor:
                    //   props.item?.paymentId == props.pay?.paymentId
                    //     ? "#333333"
                    //     : "white",
                    backgroundColor: selectedRadio.days ? "#2BACE3" : "white",

                    // padding: 10,
                  }}
                ></View>
              </TouchableOpacity>
              <TextInput
                keyboardType="numeric"
                placeholder="days"
                onChangeText={(text) => {
                  text = text.replace(/[^0-9]/g, "");
                  if (Number(text) > 30) {
                    // Alert.alert("Days cannot be greater then 30");
                    setErrorObj({
                      error: true,
                      text: "Days cannot be greater then 30",
                    });

                    setSelectedRadio((prev) => ({
                      ...prev,
                      value: String(30),
                    }));
                  } else setSelectedRadio((prev) => ({ ...prev, value: text }));
                }}
                editable={selectedRadio.days ? true : false}
                value={selectedRadio.days ? selectedRadio.value : ""}
                style={{
                  marginLeft: wp(3),
                  paddingLeft: wp(2),
                  height: wp(14),
                  width: wp(23),
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderStyle: "dashed",
                  borderRadius: wp(1),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: wp(5),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  !selectedRadio.month &&
                    setSelectedRadio({
                      month: true,
                      days: false,
                      value: "",
                    });
                }}
                style={{
                  width: wp(6),
                  height: wp(6),
                  borderRadius: wp(10),
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#2BACE3",
                }}
              >
                <View
                  style={{
                    width: wp(3.5),
                    height: wp(3.5),
                    borderRadius: wp(10),
                    // backgroundColor:
                    //   props.item?.paymentId == props.pay?.paymentId
                    //     ? "#333333"
                    //     : "white",
                    backgroundColor: selectedRadio.month ? "#2BACE3" : "white",

                    // padding: 10,
                  }}
                ></View>
              </TouchableOpacity>
              <TextInput
                keyboardType="numeric"
                placeholder="months"
                onChangeText={(text) => {
                  text = text.replace(/[^0-9]/g, "");
                  if (Number(text) > 12) {
                    // Alert.alert("Months cannot be grater then 12");
                    setErrorObj({
                      error: true,
                      text: "Months cannot be grater then 12",
                    });

                    setSelectedRadio((prev) => ({
                      ...prev,
                      value: String(12),
                    }));
                  } else setSelectedRadio((prev) => ({ ...prev, value: text }));
                }}
                editable={selectedRadio.month ? true : false}
                value={selectedRadio.month ? selectedRadio.value : ""}
                style={{
                  marginLeft: wp(3),
                  paddingLeft: wp(2),
                  height: wp(14),
                  width: wp(23),
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderStyle: "dashed",
                  borderRadius: wp(1),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: wp(5),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedRadio({
                    month: false,
                    days: false,
                    value: "",
                  });
                }}
                style={{
                  width: wp(6),
                  height: wp(6),
                  borderRadius: wp(10),
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#2BACE3",
                }}
              >
                <View
                  style={{
                    width: wp(3.5),
                    height: wp(3.5),
                    borderRadius: wp(10),
                    // backgroundColor:
                    //   props.item?.paymentId == props.pay?.paymentId
                    //     ? "#333333"
                    //     : "white",
                    backgroundColor:
                      !selectedRadio.days && !selectedRadio.month
                        ? "#2BACE3"
                        : "white",

                    // padding: 10,
                  }}
                ></View>
              </TouchableOpacity>
              <ResponsiveText style={{ marginLeft: wp(3) }}>
                Until I cancel myself
              </ResponsiveText>
            </View>
          </View>
        </Content>
        {errorObj?.error && (
          <ResponsiveText style={styles.errorText}>
            {errorObj?.text}.
          </ResponsiveText>
        )}
        <View
          style={{
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
            borderTopColor: "#EEEEEE",
            borderTopWidth: 1,
          }}
        >
          {(selectedRadio?.days || selectedRadio?.month) &&
            selectedRadio?.value?.length > 0 && (
              <View style={styles.expireDateView}>
                <ResponsiveText style={{ fontSize: 4.3 }}>
                  Add Expires on
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 4.5,
                    color: "#2BACE3",
                    fontFamily: Fonts.ManropeBold,
                  }}
                >
                  {getDate()}
                </ResponsiveText>
              </View>
            )}
          <TouchableOpacity
            onPress={handlePress}
            style={{
              height: wp(14.93),
              borderRadius: wp(10),
              backgroundColor: "#2BACE3",
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
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  expireDateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: wp(8),
  },
  errorText: {
    color: "red",
    marginTop: wp(2),
    textAlign: "left",
    fontSize: 3.4,
    marginHorizontal: wp(5),
  },
});
export default AdvertiseStep3;

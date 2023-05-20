import { View, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useTheme,
} from "@react-navigation/native";
import _ from "lodash";

import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import ReviewIcon from "@src/assets/images/Adsound.svg";
import Content from "@src/components/common/Content";
import Sell from "@src/assets/images/sell_i.svg";
import { CreateBidI, PropertyI } from "@src/services/model";
import { valueWithCommas } from "@src/utils/helperFunction";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
import moment from "moment";
import AdvertiseCongrateModal from "./AdvertiseCongrateModal";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const AdvertiseReview = (props: Props) => {
  const { obj, propertyInfo } = props.route.params as {
    obj: CreateBidI;
    propertyInfo: PropertyI;
  };
  const ACTUAL_ADDRESS = propertyInfo?.address ?? propertyInfo?.propertyAddress;
  const PROPERTY_TYPE =
    propertyInfo?.propertyType ?? propertyInfo?.propertyStatus;

  const [loader, setLoader] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);

  const { colors } = useTheme();

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  // function backAction(): boolean | null | undefined {
  //   if (props.route.name == "AdvertiseReview") {
  //     if (props.navigation.isFocused()) {
  //       props.navigation.navigate("HomeDrawer");
  //       return true;
  //     }
  //   } else {
  //     props.navigation.goBack();
  //     return false;
  //   }
  // }

  const handleBidApi = async () => {
    setLoader(true);

    const res = await MRegisterUserApiService.createBidByUser(obj);

    if (res?.data?.code == 200) {
      setLoader(false);
      setTimeout(() => {
        setModalVisible(true)
      }, 300);

      // props.navigation.navigate("AdvertiseCongrate", { obj, propertyInfo });
    } else {
      setLoader(false);
      // Alert.alert(
      //   res?.response?.data?.message ??
      //     "You can't make a bid due to low wallet balance!"
      // );
    }
  };

  return (
    <Container>
      <HomeHeader
        label={""}
        icon={undefined}
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Malkiyat"}
      // handleBackButtonPress={backAction}
      />
      <Content>
        <View
          style={{
            alignItems: "center",
            marginTop: wp(10),
            marginBottom: wp(5),
          }}
        >
          <ReviewIcon />
        </View>
        <ResponsiveText
          style={{
            textAlign: "center",
            fontFamily: Fonts.ManropeBold,
            fontSize: 5,
          }}
        >
          Review your information
        </ResponsiveText>
        <View
          style={{
            // borderColor: colors.Primary,
            // borderWidth: 0.8,
            borderRadius: wp(2),
            paddingHorizontal: wp(4),
            paddingVertical: wp(3),
            marginTop: wp(4),
            marginBottom: wp(3),
            // marginVertical: wp(8),
            // height: wp(44),
            marginHorizontal: wp(4),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: wp(2),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Project:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {propertyInfo?.propertyName}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(2),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.5,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Property:{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3,
                fontFamily: Fonts.ManropeSemiBold,
                width: wp(40),
                marginLeft: "auto",
                textAlign: "right",
              }}
            >
              {ACTUAL_ADDRESS}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Type:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {PROPERTY_TYPE}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: wp(1),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Sqft to {obj.bidType == "buyer" ? "buy" : "sell"}:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {valueWithCommas(Math.floor(Number(obj.smallerUnitCount ?? 0)))}
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                }}
              >
                {" "}
                Sqft
              </ResponsiveText>
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Demand Price:
            </ResponsiveText>
            <View>
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                  textAlign: "right",
                }}
              >
                Rs.{" "}
                <ResponsiveText
                  style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
                >
                  {valueWithCommas(obj.amount)}
                </ResponsiveText>
                {"\n"}per Sqft
              </ResponsiveText>
              {/* <ResponsiveText
                style={{
                  textAlign: "right",
                  color: "#3577DB",
                  fontFamily: Fonts.ManropeBold,
                  marginTop: wp(1),
                }}
              >
                Rs. {valueWithCommas(obj.amount * obj.smallerUnitCount)}
              </ResponsiveText> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(2),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Total:
            </ResponsiveText>
            <View>
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                  textAlign: "right",
                }}
              >
                Rs.{" "}
                <ResponsiveText
                  style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
                >
                  {valueWithCommas(obj.amount * obj.smallerUnitCount)}
                </ResponsiveText>
              </ResponsiveText>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "space-between",
              marginTop: wp(1),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Demand will cancel:
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.5,
                fontFamily: Fonts.ManropeSemiBold,
                width: wp(30),
                textAlign: "right",
              }}
            >
              {!obj.months && !obj.days
                ? "Untill I cancel myself"
                : obj.months
                  ? moment().add("months", obj.months).format("D MMM, YYYY")
                  : moment().add("days", obj.days).format("D MMM, YYYY")}{" "}
            </ResponsiveText>
          </View>
        </View>
      </Content>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: wp(6),
          paddingVertical: wp(1.5),
          marginBottom: wp(4),
        }}
      >
        <ResponsiveText style={{ fontSize: 4, textAlign: "center" }}>
          If your demand is accepted before cancellation, platform will execute
          without further consent and will be irreversible.
        </ResponsiveText>
      </View>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={handleBidApi}
          // onPress={handleSubmit}
          // disabled={loader ? true : false}
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {/* {!loader && <Arrow />} */}
          <Sell />
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeSemiBold,
              fontSize: 4.53,
              marginLeft: wp(3),
            }}
          >
            {/* {loader ? "Loading...." : "Continue"} */}
            Advertise my demand
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <Loader visible={loader} />
      <AdvertiseCongrateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        {...props}
        obj={obj}
        propertyInfo={propertyInfo}
      />
    </Container>
  );
};

export default AdvertiseReview;

import {
  View,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "@src/components/common/Container";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { useTheme } from "@react-navigation/native";
import HomeIcon from "@src/assets/images/home_i.svg";
import { RootState } from "@src/redux/reducers";
import Con from "@src/assets/images/cong_tick.svg";
import BottomButtons from "@src/components/common/BottomButtons";
import { valueWithCommas } from "@src/utils/helperFunction";
import Content from "@src/components/common/Content";
import Union from "@src/assets/images/Union.svg";
import Icon2 from "@src/assets/images/congrate_i.png";
const Congrates = (props) => {
  const { colors } = useTheme();
  const dashboardReducer = useSelector((state: RootState) => state);
  const { KycStatus } =
    dashboardReducer?.registerUser?.registerUserData?.propertiesData?.data ??
    {};
  const selectedProperty = dashboardReducer.registerUser.selectedTileData;
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function backAction() {
    props.navigation.push("RegisterUserStack", { screenName: "HomeDrawer" });
    return true;
  }
  function handleNavigation() {
    props.navigation.push("RegisterUserStack", { screenName: "HomeDrawer" });
  }
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#2BACE3" }} />
      <Container style={{ backgroundColor: "white" }}>
        {/* <Content
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        > */}
        <View>
          {/* <View
              style={{
                backgroundColor: "#2BACE3",
                height: wp(70),
                borderBottomEndRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 5.6,
                  color: "white",
                  marginVertical: wp(5),
                }}
              >
                Malkiyat
              </ResponsiveText>
              <Con />
              <ResponsiveText
                style={{
                  fontSize: 6.4,
                  color: "white",
                  textAlign: "center",
                  lineHeight: 35,
                  marginBottom: wp(-5),
                  marginTop: wp(5),
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 6.4,
                    fontFamily: Fonts.ManropeBold,
                    color: "white",
                  }}
                >
                  Congratulations!{"\n"}
                </ResponsiveText>
                Purchase Completed
              </ResponsiveText>
            </View> */}
          <ImageBackground
            style={{
              width: wp(100),
              height: wp(100),
              justifyContent: "center",
              alignItems: "center",
            }}
            source={Icon2}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginVertical: wp(5),
              }}
            >
              Malkiyat
            </ResponsiveText>
            <Con />
            <ResponsiveText
              style={{
                fontSize: 6.4,
                color: "white",
                textAlign: "center",
                lineHeight: 35,
                marginBottom: wp(-5),
                marginTop: wp(5),
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 6.4,
                  fontFamily: Fonts.ManropeBold,
                  color: "white",
                }}
              >
                Congratulations!{"\n"}
              </ResponsiveText>
              Purchase Completed
            </ResponsiveText>
          </ImageBackground>
          {/* <Union /> */}
        </View>
        <View
          style={{
            borderColor: colors.Primary,
            borderWidth: 0.8,
            borderRadius: wp(2),
            paddingHorizontal: wp(4),
            paddingVertical: wp(3),
            marginTop: wp(3),
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
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Owner Name:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {dashboardReducer.registerUser?.registerUserData?.userInfo
                ?.firstName +
                " " +
                dashboardReducer?.registerUser?.registerUserData?.userInfo
                  ?.lastName}
            </ResponsiveText>
          </View>
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
              {selectedProperty.propertyName}
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
              Property:
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3,
                fontFamily: Fonts.ManropeSemiBold,
                flexWrap: "wrap",
                width: wp(40),
                marginLeft: "auto",
                textAlign: "right",
              }}
            >
              {selectedProperty?.address}
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
              {selectedProperty.propertyStatus}
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
              Square Feet purchased:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {valueWithCommas(Math.floor(Number(props?.route.params?.units)))}
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
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.5,
                color: colors.Primary,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Amount Paid :
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.5,
                color: colors.Primary,
                fontFamily: Fonts.ManropeBold,
              }}
            >
              Rs {valueWithCommas(Math.ceil(props.route?.params?.amount))}
            </ResponsiveText>
          </View>
        </View>
        {props.route?.params?.showSecurityText && (
          <ResponsiveText
            style={{
              paddingHorizontal: wp(5),
              textAlign: "center",
              fontFamily: Fonts.ManropeSemiBold,
            }}
          >
            For your security, we print your picture and identity details on
            your Proof of Purchase.{" "}
          </ResponsiveText>
        )}
        {/* </Content> */}
        <View>
          {KycStatus == "3" || KycStatus == "0" || KycStatus == "2" ? (
            <BottomButtons
              img="sds"
              onPressLater={() => handleNavigation()}
              onPress={() => {
                props.navigation.navigate("KycPakistan");
                // dispatch({ type: RegisterUserType.REMOVE_USER_DATA });
                // setTimeout(() => {
                //   props.navigation.dispatch(
                //     CommonActions.reset({
                //       index: 0,
                //       routes: [
                //         {
                //           name: "HomeView",
                //         },
                //       ],
                //     })
                //   );
                // }, 200);
                // formikRef.current?.handleSubmit();
              }}
              doit
            />
          ) : (
            <TouchableOpacity
              onPress={() =>
                props.navigation.push("RegisterUserStack", {
                  screeName: "HomeDrawer",
                })
              }
              style={{
                width: wp(90),
                marginVertical: wp(5),
                alignSelf: "center",
                height: wp(14.93),
                borderRadius: wp(10),
                backgroundColor: "#2BACE3",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <HomeIcon />
              <ResponsiveText
                style={{
                  color: "white",
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 4.53,
                  marginLeft: 5,
                }}
              >
                Go to home
              </ResponsiveText>
            </TouchableOpacity>
          )}
        </View>
      </Container>
    </>
  );
};

export default Congrates;
function backAction(): boolean | null | undefined {
  throw new Error("Function not implemented.");
}

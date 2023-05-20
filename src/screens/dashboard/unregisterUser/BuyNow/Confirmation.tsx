import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { RootState } from "@src/redux/reducers";

import Container from "@src/components/common/Container";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Arrow from "@src/assets/images/left_arrow.svg";
import Img from "@src/assets/images/confirm_im.svg";
import Union from "@src/assets/images/Union.svg";
import Con from "@src/assets/images/con.svg";
import Icon2 from "@src/assets/images/congrate_i.png";
import { removeCacheData } from "@src/utils/cacheFunc";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

const Confirmation = (props) => {
  const registerUser = useSelector((state: RootState) => state.registerUser);
  const { show, errorMessage, modal_type } = useSelector(
    (state: RootState) => state.authReducer.errorModal
  );
  useEffect(() => {
    removeCacheData();
  }, []);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function backAction(): boolean | null | undefined {
    props.navigation.push("RegisterUserStack", { screenName: "HomeDrawer" });
    return true;
  }

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          {/* <View
            style={{
              backgroundColor: "#2BACE3",
              height: wp(100),
              borderBottomEndRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveText
              style={{
                // fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginTop: wp(5),
                position: "absolute",
                top: 5,
              }}
            >
              Malkiyat
            </ResponsiveText>
            <Con />
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginTop: wp(5),
              }}
            >
              Purchase confirmation is sent to
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 6.4,
                color: "white",
                marginTop: wp(2),
              }}
            >
              {registerUser?.registerUserData?.userInfo?.email}
            </ResponsiveText>
          </View> */}
          {/* <Union /> */}
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
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginTop: wp(5),
              }}
            >
              Purchase confirmation is sent to
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 6.4,
                color: "white",
                marginTop: wp(2),
              }}
            >
              {registerUser?.registerUserData?.userInfo?.email}
            </ResponsiveText>
          </ImageBackground>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Img />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: wp(4),
          // backgroundColor: "red",
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "RegisterUserStack",
                    state: {
                      routes: [
                        {
                          name: "HomeDrawer",
                        },
                      ],
                    },
                  },
                ],
              })
            );
            // props.navigation.navigate("RegisterUserStack", {
            //   screenName: "HomeDrawer",
            // });
          }}
          style={{
            // width: wp(49.07),
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#00B9F7",
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
            Go to Home
          </ResponsiveText>
          <Arrow />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Confirmation;

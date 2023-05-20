import { View, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";

import Container from "@src/components/common/Container";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import Con from "@src/assets/images/rev.svg";
import Union from "@src/assets/images/Union.svg";
import { useTheme } from "@react-navigation/native";
import Wallet from "@src/assets/images/wallet_i.svg";
import HomeIcon from "@src/assets/images/home_i.svg";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux";
import Loader from "@src/components/ui/loader/Loader";
import { valueWithCommas } from "@src/utils/helperFunction";
const Congrate = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const { item, buy, sqfts, amount } = props.route.params;

  const handlePress = () => {
    props.navigation.push("HomeDrawer");
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function backAction() {
    props.navigation.push("HomeDrawer");
    return true;
  }

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Content
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
      >
        <View>
          <View
            style={{
              backgroundColor: "#2BACE3",
              height: wp(60),
              // borderBottomEndRadius: 20,
              alignItems: "center",
              // justifyContent: "center",
              flex: 1,
            }}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginTop: wp(5),
              }}
            >
              Malkiyat
            </ResponsiveText>
          </View>
          <Union width={wp(100)} height={wp(11)} />
        </View>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View style={{ position: "absolute", top: -wp(23) }}>
            <Con width={wp(35)} height={wp(35)} />
          </View>

          {buy && (
            <View style={{ alignItems: "center" }}>
              <ResponsiveText
                style={{
                  color: "#3577DB",
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 7,
                }}
              >
                Congratulations!
              </ResponsiveText>
              <ResponsiveText
                style={{
                  marginVertical: wp(2),
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              >
                You have bought
              </ResponsiveText>
              <ResponsiveText
                style={{
                  color: "#3577DB",
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 12,
                }}
              >
                {valueWithCommas(sqfts)} Sqft
              </ResponsiveText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ResponsiveText
                  style={{
                    // fontSize: 3.2,
                    fontFamily: Fonts.ManropeBold,
                    // color: "#3577DB",
                    marginTop: wp(1.5),
                  }}
                >
                  Rs. {amount} paid
                </ResponsiveText>
              </View>
            </View>
          )}
          {!buy && (
            <ResponsiveText
              style={{
                fontSize: 6.4,
                fontFamily: Fonts.ManropeBold,
                color: "#3578D0",
                marginBottom: wp(5),
                marginTop: wp(-5),
              }}
            >
              Congratulations!
            </ResponsiveText>
          )}
          {!buy && (
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                marginBottom: wp(4),
                marginTop: wp(-2),
              }}
            >
              {`You have sold ${valueWithCommas(sqfts)} Sqft of`}
            </ResponsiveText>
          )}
          {!buy && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    fontFamily: Fonts.ManropeBold,
                    color: "#3577DB",
                    marginTop: wp(1.5),
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 8.53,
                    fontFamily: Fonts.ManropeBold,
                    color: "#3578D0",
                  }}
                >
                  {amount}
                </ResponsiveText>
              </View>

              <ResponsiveText
                style={{
                  paddingHorizontal: wp(5),
                  textAlign: "center",
                  fontFamily: Fonts.ManropeSemiBold,
                  width: wp(80),
                }}
              >
                {`and the amount has been transferred to your wallet`}
              </ResponsiveText>
            </>
          )}
        </View>
      </Content>
      {buy && (
        <View
          style={{
            // flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
            borderTopColor: "#EEEEEE",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={handlePress}
            style={{
              // width: wp(43.73),
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
            {/* <Arrow /> */}
          </TouchableOpacity>
        </View>
      )}
      {!buy && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
            borderTopColor: "#EEEEEE",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.push("Wallet");
            }}
            style={{
              width: wp(43.73),
              height: wp(14.93),
              borderRadius: wp(10),
              borderColor: "#00B9F7",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Wallet />
            <ResponsiveText
              style={{
                color: "#00B9F7",
                fontFamily: Fonts.ManropeBold,
                fontSize: 4.53,
                marginLeft: 10,
              }}
            >
              Wallet
            </ResponsiveText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: wp(43.73),
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
            {/* <Arrow /> */}
          </TouchableOpacity>
        </View>
      )}

      <Loader visible={loading} />
    </Container>
  );
};

export default Congrate;

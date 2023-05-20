import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { isTabletMode } from "react-native-device-info";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
const PaymentDetails = [
  {
    id: 1,
    title: "Internet Banking Portal",
  },
  {
    id: 2,
    title: "Mobile Banking App",
  },
  {
    id: 3,
    title: "ATM",
  },
  {
    id: 4,
    title: "OTC",
  },
];
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}
const PayPro = (props: Props) => {
  console.log(props, "..");

  const [pay, setPay] = useState<number | undefined>(undefined);
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Enter payment details"}
      />
      <View
        style={{
          borderColor: "#3577DB",
          borderWidth: 1,
          margin: wp(6),
          padding: wp(4),
          borderRadius: 10,
          flex: 1,
        }}
      >
        {PaymentDetails.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setPay(item.id)}
              style={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: wp(1),
                // paddingVertical: wp(1),
                paddingRight: wp(3),
                height: wp(12),
                marginBottom: wp(5),
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.5,
                    fontFamily: Fonts.ManropeSemiBold,
                    marginLeft: wp(5),
                  }}
                >
                  {item.title}
                </ResponsiveText>
              </View>
              <View
                style={{
                  width: wp(6),
                  height: wp(6),
                  borderRadius: wp(10),
                  borderWidth: 2.5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#2BACE3",
                }}
              >
                <View
                  style={{
                    width: wp(3),
                    height: wp(3),
                    borderRadius: wp(10),
                    backgroundColor: pay == item.id ? "#2BACE3" : "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          );
        })}
        {pay == 1 && (
          <>
            <View style={{ flexDirection: "row" }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive PayPro ID via SMS and Email.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Login to your internet banking portal.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Select PayPro from the Bill Payment Option.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Enter your PayPro ID.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Make payment after confirmation.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive payment notification via SMS and Email instantly.
              </ResponsiveText>
            </View>
          </>
        )}
        {pay == 2 && (
          <>
            <View style={{ flexDirection: "row" }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive PayPro ID via SMS and Email.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Login to your Internet Mobile Banking App.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Select PayPro from the Bill Payment Option.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Enter your PayPro ID.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Make payment after confirmation.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive payment notification via SMS and Email instantly.
              </ResponsiveText>
            </View>
          </>
        )}
        {pay == 3 && (
          <>
            <View style={{ flexDirection: "row" }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive PayPro ID via SMS and Email.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Walk into your nearby bank ATM.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Select PayPro from the Bill Payment Option.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Enter your PayPro ID.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Make payment after confirmation.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive payment notification via SMS and Email instantly.
              </ResponsiveText>
            </View>
          </>
        )}
        {pay == 4 && (
          <>
            <View style={{ flexDirection: "row" }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive PayPro ID via SMS and Email.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Present your ID to representative to the nearby Branch/TCS
                center.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Select PayPro from the Bill Payment Option.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Enter your PayPro ID.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Make payment after confirmation.
              </ResponsiveText>
            </View>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{"\u2022"}</ResponsiveText>
              <ResponsiveText
                style={{ flex: 1, paddingLeft: 5, fontSize: 3.5 }}
              >
                Receive payment notification via SMS and Email instantly.
              </ResponsiveText>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          // flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          disabled={!pay ? true : false}
          onPress={() => {
            props.navigation.navigate("ReviewDetails", {
              ...props.route.params,
            });
          }}
          style={{
            // width: wp(43.73),
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: !pay ? "#dedede" : "#2BACE3",
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
              marginLeft: 5,
            }}
          >
            Continue
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PayPro;

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import { PaymentMethods } from "@src/services/model";

const PaymentMethod = (props: {
  item: PaymentMethods;
  pay: PaymentMethods;
  setPay: (args: PaymentMethods) => void;
}) => {
  return (
    <View
      key={props.item.paymentId}
      style={{
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
        borderRadius: wp(1),
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <JazzCash /> */}
        <Image
          source={{ uri: props.item.imgUrl }}
          style={{ width: 35, height: 35 }}
          resizeMode="contain"
        />
        <ResponsiveText
          style={{
            fontSize: 3.5,
            fontFamily: Fonts.ManropeSemiBold,
            marginLeft: wp(1),
            color:
              props.item?.paymentId == props.pay?.paymentId
                ? "black"
                : "#3B4161",
          }}
        >
          {props.item.paymentName}
        </ResponsiveText>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.setPay(props.item);
        }}
        style={{
          width: wp(6),
          height: wp(6),
          borderRadius: wp(10),
          borderWidth: 2.5,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#3577DB",
        }}
      >
        <View
          style={{
            width: wp(3),
            height: wp(3),
            borderRadius: wp(10),
            backgroundColor:
              props.item?.paymentId == props.pay?.paymentId
                ? "#3577DB"
                : "white",
            // padding: 10,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;

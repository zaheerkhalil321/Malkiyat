import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import HistoryDataSet, {
  TransactionType,
} from "@src/helpers/constants/HistoryDataSet";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import {
  calculateTimeStamp,
  findFontSize,
  valueWithCommas,
} from "@src/utils/helperFunction";
import Fonts from "@src/theme/fonts";
import { userTransactions } from "@src/services/model";
import { store } from "@src/redux";
import moment from "moment";

export default function WalletHistory({ item }: { item: userTransactions }) {
  return (
    <View style={{ marginTop: wp(3) }} key={item.refNo}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: wp(3),
          // paddingHorizontal: wp(4),
          // paddingTop: wp(4),
          // paddingBottom: wp(3),
          // borderBottomWidth: 1,
          // borderColor: "#dedede",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* {HistoryDataSet(item.category)} */}
          <Image
            source={{
              uri:
                item.category == "bought"
                  ? store.getState().registerUser?.registerUserData?.appSettings
                      ?.boughtUrl
                  : item.category == "sold"
                  ? store.getState().registerUser?.registerUserData?.appSettings
                      ?.soldUrl
                  : item.iconUrl,
            }}
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
          />
          <View style={{ marginLeft: wp(3) }}>
            <ResponsiveText
              style={{
                fontSize: 3.73,
                marginBottom: wp(1),
                // color: "#3577DB",
              }}
            >
              {item.paymentName}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.2,
                color: "#757575",
              }}
            >
              {TransactionType(item)}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.2,
                color: "#757575",
              }}
            >
              {moment(item.transDateTime).format("D MMM, YYYY")}
            </ResponsiveText>
          </View>
        </View>
        <View>
          <ResponsiveText
            style={{
              fontSize: 3.2,
              alignSelf: "flex-end",
              marginBottom: wp(1),
            }}
          >
            {moment(item.transDateTime).format("h:mm a")}
          </ResponsiveText>
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <ResponsiveText
              style={{
                fontSize: 3.2,
                alignSelf: "flex-end",
                marginBottom: wp(0.5),
                color: item.category == "cashout" ? "grey" : "#4CAF50",
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: findFontSize(String(item.amount), 4.8),
                fontFamily: Fonts.ManropeBold,
                color: item.category == "cashout" ? "grey" : "#4CAF50",
              }}
            >
              {valueWithCommas(item.amount)}
            </ResponsiveText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

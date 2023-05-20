import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { DataSetI } from "@src/helpers/DataSet";
import React from "react";
import { View, TouchableOpacity } from "react-native";

import { PropertyDetailI } from "@src/services/model";
import Fonts from "@src/theme/fonts";
import ResponsiveText from "../common/ResponseiveText";
import { wp } from "../common/Responsive";

interface props {
  item: Partial<DataSetI> & { screenName: string };
  navigation: NavigationProp<ParamListBase>;
  selectedTileData?: PropertyDetailI | undefined;
  loginUser: boolean;
  obj: {
    id: number | undefined;
    latitude: number | undefined;
    longitude: number | undefined;
    title: string | undefined;
    des?: string;
  };
}

export default function ProperityHistroy(props: props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: wp(15),
        // backgroundColor: "red",
      }}
      onPress={() => {
        if (props.item.screenName == "Market" && !props.loginUser) {
          props?.navigation?.navigate("BuyNow", {
            selectedTileData: props.selectedTileData,
          });
        } else {
          props.navigation.navigate(props.item.screenName!, {
            data: props.obj,
          });
        }
      }}
    >
      <View
        style={{
          backgroundColor: "#F4F4F4",
          width: wp(13),
          height: wp(13),
          borderRadius: wp(2),
          justifyContent: "center",
          alignItems: "center",
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
        {props.item.image ? <props.item.image /> : null}
      </View>
      <View style={{ marginTop: wp(2) }}>
        <ResponsiveText
          style={{
            fontSize: 2.6,
            textAlign: "center",
            fontFamily: Fonts.ManropeBold,
          }}
        >
          {props.item.title}
        </ResponsiveText>
      </View>
    </TouchableOpacity>
  );
}

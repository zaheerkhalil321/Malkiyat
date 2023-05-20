import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  Route,
  useTheme,
} from "@react-navigation/native";

import VectorSvg from "@src/assets/images/Info_icon.svg";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import { PropertyDetailI, Route as RouteParamsI } from "@src/services/model";
interface ProperityI {
  route?: Route<string, RouteParamsI>;
  navigation: NavigationProp<ParamListBase>;
  selectedTileData: PropertyDetailI | undefined;
  setInfo: (arg: boolean) => void;
}
export default function InfoComponent(props: ProperityI) {
  const { colors } = useTheme();
  return (
    <View
      style={
        //@ts-ignore
        styles.container(colors.homeInfoComponent.backgroundColor)
      }
    >
      <View style={{ marginLeft: wp(3), marginRight: wp(3) }}>
        <VectorSvg />
      </View>
      <ResponsiveText style={styles.infoText}>
        Own property by buying one Sqft at a time
      </ResponsiveText>
      <TouchableOpacity
        onPress={() => {
          props.setInfo(false);
        }}
        style={{ position: "absolute", right: wp(1), top: wp(1) }}
      >
        <Image
          style={{
            width: wp(3.5),
            height: wp(3.5),
            tintColor: colors.Primary,
          }}
          source={require("@src/assets/images/x-mark.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  //@ts-ignore
  container: (color: string) => ({
    height: wp(12),
    shadowColor: "#000",
    backgroundColor: color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  }),
  infoText: {
    fontSize: 3.5,
    color: "#9598AA",
  },
});

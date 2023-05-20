import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import PropertyIcon from "@src/assets/images/Area.svg";
import QeematIcon from "@src/assets/images/Qeemat.svg";
import SqIcon from "@src/assets/images/Sq.svg";
import { valueConverstion, valueWithCommas } from "@src/utils/helperFunction";
import { PropertyDetailI } from "@src/services/model";
interface Props {
  selectedTileData: PropertyDetailI | undefined;
}

export default function ProperityInfo(props: Props) {
  const { selectedTileData } = props;
  const { colors } = useTheme();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: wp(3),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#F4F4F4",
              width: wp(10),
              height: wp(10),
              borderRadius: wp(2),
              borderWidth: 1,
              borderColor: colors.BorderColor,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PropertyIcon />
          </View>
          <View>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
              Property Area
            </ResponsiveText>
          </View>
        </View>
        <View>
          <ResponsiveText
            style={{
              fontSize: 5,
              color: colors.Primary,
              fontFamily: Fonts.ManropeBold,
              textAlign: "center",
            }}
          >
            {selectedTileData?.propertyArea?.split(" ")[0]}
            <ResponsiveText
              style={{
                fontSize: 4.5,
                color: colors.PlaceHolderText,
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 5,
                  color: colors.Primary,
                  fontFamily: Fonts.ManropeBold,
                }}
              >
                {selectedTileData?.biggerUnitArea}{" "}
              </ResponsiveText>
              {selectedTileData?.biggerUnit}
            </ResponsiveText>
          </ResponsiveText>
          <ResponsiveText
            style={{
              fontSize: 3,
              color: colors.PlaceHolderText,
              flexGrow: 1,
              alignSelf: "flex-end",
            }}
          >
            {selectedTileData?.smallerUnitArea} {selectedTileData?.smallerUnit}
          </ResponsiveText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.BorderColor,
          height: 1,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: wp(3),
        }}
      >
        {/* <ProperityList /> */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#F4F4F4",
              width: wp(10),
              height: wp(10),
              borderRadius: wp(2),
              borderWidth: 1,
              borderColor: colors.BorderColor,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QeematIcon />
            {/* {props.item.image ? <props.item.image /> : null} */}
          </View>
          <View>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
              {/* {props.item.title} */}
              Property ki Qeemat
            </ResponsiveText>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ResponsiveText
              style={{
                fontSize: 4,
                color: colors.PlaceHolderText,
              }}
            >
              Rs.
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 5,
                color: colors.Primary,
                fontFamily: Fonts.ManropeBold,
                textAlign: "center",
              }}
            >
              {/* {selectedTileData?.propertyArea.split(' ')[0]}{' '} */}
              {
                String(valueConverstion(selectedTileData?.totalPrice))
                  .toString()
                  .split(" ")[0]
              }
              <ResponsiveText
                style={{
                  fontSize: 4.5,
                  color: "#9699AB",

                  textAlign: "center",
                }}
              >
                {" "}
                {
                  String(valueConverstion(selectedTileData?.totalPrice))
                    .toString()
                    .split(" ")[1]
                }
              </ResponsiveText>
            </ResponsiveText>
          </View>
          <ResponsiveText
            style={{
              fontSize: 3,
              color: colors.PlaceHolderText,
              flexGrow: 1,
              alignSelf: "flex-end",
            }}
          >
            for {selectedTileData?.smallerUnitArea}{" "}
            {/* {selectedTileData?.smallerUnit} */}
            Sqft
          </ResponsiveText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.BorderColor,
          height: 1,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: wp(3),
        }}
      >
        {/* <ProperityList /> */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#F4F4F4",
              width: wp(10),
              height: wp(10),
              borderRadius: wp(2),
              borderWidth: 1,
              borderColor: colors.BorderColor,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SqIcon />
          </View>
          <View>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
              {/* {props.item.title} */}1 Sqft ki Qeemat
            </ResponsiveText>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 4,
                color: colors.PlaceHolderText,
              }}
            >
              Rs.
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 5,
                color: colors.Primary,
                fontFamily: Fonts.ManropeBold,
                textAlign: "center",
              }}
            >
              {valueWithCommas(selectedTileData?.perSmallerUnitPrice)}
            </ResponsiveText>
          </View>
          <ResponsiveText
            style={{
              fontSize: 3,
              color: colors.PlaceHolderText,
              alignSelf: "flex-end",
            }}
          >
            {
              String(valueConverstion(selectedTileData?.totalPrice))
                .toString()
                .split(" ")[0]
            }{" "}
            {
              String(valueConverstion(selectedTileData?.totalPrice))
                .toString()
                .split(" ")[1]
            }{" "}
            / {selectedTileData?.smallerUnitArea}
            {/* {selectedTileData?.smallerUnit} */} Sqft
          </ResponsiveText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.BorderColor,
          height: 1,
        }}
      />
    </>
  );
}

const syles = StyleSheet.create({
  container: {},
});

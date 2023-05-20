import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { PropertyDetailI } from "@src/services/model";
interface Props {
  selectedTileData: PropertyDetailI | undefined;
  navigation?: NavigationProp<ParamListBase>;
}
const FileCard = (props: Props) => {
  const { selectedTileData } = props;
  return (
    <View
      style={{
        backgroundColor: "#3B4161",
        // height: wp(40),
        borderRadius: wp(3),
        paddingHorizontal: wp(5),
        paddingVertical: wp(5),
      }}
    >
      <ResponsiveText
        style={{
          color: "white",
          fontSize: 5,
          fontFamily: Fonts.ManropeBold,
        }}
      >
        {selectedTileData?.propertyName}
      </ResponsiveText>
      <View style={{ paddingVertical: wp(4) }}>
        {/* <ResponsiveText
          style={{
            color: "white",
            fontSize: 3.5,
            paddingBottom: wp(1),
            // paddingVertical: wp(4),
          }}
        >
          Property Type
        </ResponsiveText> */}
        <ResponsiveText
          style={{
            color: "white",
            fontSize: 6,
            // paddingVertical: wp(4),
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontSize: 6,
              fontFamily: Fonts.ManropeBold,
              // paddingVertical: wp(4),
            }}
          >
            {" "}
            {selectedTileData?.biggerUnitArea}
          </ResponsiveText>{" "}
          {selectedTileData?.biggerUnit} {selectedTileData?.propertyStatus} File
        </ResponsiveText>
      </View>
      <View
        style={{
          // paddingVertical: wp(10),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View />
        {/* <View>
          <ResponsiveText
            style={{
              color: "white",
              fontSize: 3.5,
              paddingBottom: wp(1),
              // paddingVertical: wp(4),
            }}
          >
            Number of Properties
          </ResponsiveText>
          <ResponsiveText
            style={{
              color: "white",
              fontSize: 6,
              // paddingVertical: wp(4),
            }}
          >
            10
          </ResponsiveText>
        </View> */}

        <TouchableOpacity
          onPress={() =>
            props.navigation?.navigate("PropertyFurtherDetail", {
              data: {
                id: selectedTileData?.propertyId,
                latitude: selectedTileData?.latitude,
                longitude: selectedTileData?.longitude,
                title: selectedTileData?.propertyName,
                des: selectedTileData?.propertyDesc,
              },
            })
          }
          style={{
            backgroundColor: "white",
            // alignSelf: "flex-end",
            paddingVertical: wp(3),
            paddingHorizontal: wp(4),
            borderRadius: wp(10),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText style={{ fontSize: 3.5 }}>Details</ResponsiveText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileCard;

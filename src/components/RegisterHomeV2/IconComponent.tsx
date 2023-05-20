import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon1 from "@src/assets/images/pro.svg";
import Icon2 from "@src/assets/images/own.svg";
import Icon3 from "@src/assets/images/sqq.svg";
import Icon4 from "@src/assets/images/profit.svg";
import ResponsiveText from "../common/ResponseiveText";
import { wp } from "../common/Responsive";
import Fonts from "@src/theme/fonts";
import RegisterModal from "../AdvertiseModal/RegisterModal";
const IconComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: wp(3),
        marginTop: wp(5),
        justifyContent: "space-between",
        marginHorizontal: wp(8),
        // backgroundColor: "red",
      }}
    >
      <View
        style={{
          ...styles.iconCon,
          // ...{ backgroundColor: "red" }
        }}
      >
        <Icon1 />
        <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
          Property
        </ResponsiveText>
      </View>
      <TouchableOpacity
        // onPress={() => {
        //   props.navigation.navigate('')
        // }}
        style={{
          ...styles.iconCon,
          // ...{ backgroundColor: "yellow" }
        }}
      >
        <Icon2 />
        <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
          I own
        </ResponsiveText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setValue(true);
        }}
        style={{
          ...styles.iconCon,
          // ...{ backgroundColor: "red" }
        }}
      >
        <Icon3 />
        <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
          Sqft value (Rs.)
        </ResponsiveText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setValue(false);
        }}
        style={{
          ...styles.iconCon,
          //  ...{ backgroundColor: "yellow" }
        }}
      >
        <Icon4 />
        <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
          Profit (Rs.)
        </ResponsiveText>
      </TouchableOpacity>
      <RegisterModal
        value={value}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconCon: {
    // flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
  },
  innerCon: {
    fontSize: 3.47,
    // flex: 1,
    // backgroundColor: "red",
    // textAlign: "center",
  },
  outer: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    marginHorizontal: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  boldText: {
    fontSize: 3.47,
    flex: 1,
    // backgroundColor: "red",
    textAlign: "center",
    fontFamily: Fonts.ManropeBold,
  },
});
export default IconComponent;

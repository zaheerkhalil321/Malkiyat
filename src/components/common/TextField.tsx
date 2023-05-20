import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import Fonts from "@src/theme/fonts";
import { wp } from "./Responsive";
import DisableEye from "@src/assets/images/disableEye.svg";
import ActiveEye from "@src/assets/images/ActiveEye.svg";
interface Props {
  placeholder: any;
  show?: boolean;
  eye?: boolean;
  setEye?: (arg: boolean) => void;
  onChangeText?: (arg: string | undefined) => void;
  value?: string;
  style?: TextStyle;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
}
const TextField = (props: Props) => {
  const { colors } = useTheme();
  return (
    <View style={styles.inputContainer}>
      <TextInput
        secureTextEntry={props.show && !props.eye}
        style={{ ...styles.textField, ...{ color: "#363636", fontSize: 16 } }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholderTextColor={colors.PlaceHolderText}
        {...props}
      />
      {props.show && (
        <View>
          <TouchableOpacity
            style={styles.eyeContainer}
            onPress={() => props.setEye!(!props.eye)}
          >
            {props.eye ? <ActiveEye /> : <DisableEye />}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: "#EFEFF1",
    borderBottomWidth: 1,
    paddingBottom: Platform.OS == "ios" ? wp(3) : 0,
    width: wp(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textField: {
    fontFamily: Fonts.ManropeRegular,
    width: wp(70),
  },
  eyeContainer: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TextField;

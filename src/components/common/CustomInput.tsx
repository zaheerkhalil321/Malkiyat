import React, { useRef } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";

import IntlPhoneInput from "../phoneInput/index";
import { wp } from "./Responsive";
import Fonts from "@src/theme/fonts";
import DisableEye from "@src/assets/images/disableEye.svg";
import ActiveEye from "@src/assets/images/ActiveEye.svg";
import { KeyboardTypeOptions } from "react-native";
import {
  CUSTOM_KEYBOARD_REGIX,
  SPECIAL_CHARACTERS_REGIX,
} from "@src/utils/helperFunction";

const levels = [
  {
    label: "Weak",
    labelColor: "#ff2900",
    activeBarColor: "#ff2900",
  },

  {
    label: "Okay",
    labelColor: "#f4d744",
    activeBarColor: "#f4d744",
  },

  {
    label: "Good",
    labelColor: "#2b90ef",
    activeBarColor: "#2b90ef",
  },
  {
    label: "Strong",
    labelColor: "#25c281",
    activeBarColor: "#25c281",
  },
  {
    label: "Very strong",
    labelColor: "#00ff6b",
    activeBarColor: "#00ff6b",
  },
];
interface propsInterface {
  childState: boolean;
  field: {
    name: string;
    onBlur: (e: string) => void;
    onChange: (name: string) => (text: string) => void;
    value: string | undefined;
  };
  form: {
    errors: any;
    touched: any;
    setFieldTouched: (e: string) => void;
    setFieldValue: (T: string, U: string) => void;
  };
  eye: boolean;
  setEye: (arg: boolean) => void;
  keyboardType: KeyboardTypeOptions;
}

const CustomInput = (props: propsInterface) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    eye,
    setEye,

    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={{ marginTop: Platform.OS == "ios" ? wp(8) : wp(2) }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, hasError && styles.errorInput]}
          value={value}
          maxLength={name == "Password" ? 25 : undefined}
          secureTextEntry={
            (name == "password" || name == "cpassword") && !props.eye
          }
          onChangeText={
            (text) => onChange(name)(name == "email" ? text.trim() : text)
            // : name == "firstname" || name == "lastname"
            // ? text.replace(SPECIAL_CHARACTERS_REGIX, "")
          }
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        {(name == "password" || name == "cpassword") && (
          <TouchableOpacity
            style={styles.eyeContainer}
            onPress={() => props.setEye!(!props.eye)}
          >
            {props.eye ? <ActiveEye /> : <DisableEye />}
          </TouchableOpacity>
        )}
      </View>

      {hasError && <Text style={[styles.errorText]}>{errors[name]}</Text>}
      {name == "password" && value!?.length >= 8 ? (
        <BarPasswordStrengthDisplay
          width={wp(80)}
          password={value}
          minLength={8}
          wrapperStyle={{ marginLeft: 0 }}
          levels={levels}
        />
      ) : null}
    </View>
  );
};

const CustomCountryPicker = (props: propsInterface) => {
  const {
    field: { name, onChange },
    form: { errors, touched },
  } = props;
  const hasError = errors[name] && touched[name];

  return (
    <>
      <View
        style={[
          styles.container,
          {
            marginTop: Platform.OS == "ios" ? wp(8) : wp(2),
            borderBottomColor: "#EBECEF",
            paddingBottom: 5,
          },
        ]}
      >
        <IntlPhoneInput
          showInput={true}
          onChangeCountry={(data) => onChange(name)("")}
          onChangeText={(text: any) => {
            onChange(name)(text.unmaskedPhoneNumber);
          }}
          defaultCountry="PK"
        />
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: "#EFEFF1",
    borderBottomWidth: 1,
    paddingBottom: Platform.OS == "ios" ? wp(4) : wp(0),
    width: wp(80),
    alignItems: "center",
    justifyContent: "space-between",
  },
  //@ts-ignore
  countryContainer: (color: string) => ({
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    width: wp(80),
    borderColor: color,
    marginTop: Platform.OS == "ios" ? wp(8) : wp(6),
    paddingBottom: wp(2),
  }),
  textInput: {
    color: "#363636",
    width: wp(70),
    fontFamily: Fonts.ManropeRegular,
  },
  errorText: {
    fontSize: wp(3),
    color: "red",
    alignSelf: "flex-start",
    marginTop: wp(1),
  },
  errorInput: {
    borderColor: "red",
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    // backgroundColor: 'yellow',

    borderBottomWidth: 1,
  },
  phoneContainer: {
    width: "75%",
    height: 50,
  },
  button: {
    marginTop: 30,
    width: "75%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  textInputt: {
    paddingVertical: 0,
  },
  eyeContainer: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { CustomInput, CustomCountryPicker };

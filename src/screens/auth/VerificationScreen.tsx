import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Chevron_Right.svg";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import AuthButton from "@src/components/common/AuthButton";
import Content from "@src/components/common/Content";
import IntlPhoneInput from "@src/components/phoneInput";
import { TextInput } from "react-native-gesture-handler";
import MAuthApiService from "@src/services/MAuthApiservice";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}
const VerificationScreen = (props: Props) => {
  const [field, setField] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const { colors } = useTheme();
  const phoneVerification = async () => {
    const res = await MAuthApiService.resendOtpApi(
      props.route.params?.values?.mobileNo
    );

    if (res.data?.status == 200) {
      props.navigation.navigate("OTPVerification", {
        phone: props.route.params?.values?.mobileNo,
        userId: res.data?.data,
        moveToDashBoard: true,
        values: props.route?.params?.values,
        type: "Simple-Signup",
      });
    }
  };
  return (
    <Container>
      <Content bounces={false} contentContainerStyle={styles.container}>
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Logo style={{ marginVertical: wp(10) }} />
          </TouchableOpacity>
          <ResponsiveText style={styles.titleText}>
            Verify Mobile Number
          </ResponsiveText>
          <ResponsiveText
            style={{ ...styles.subTit, color: colors.PlaceHolderText }}
          >
            Please enter your mobile number and confirm the otp again.
          </ResponsiveText>
          <View>
            <TextInput
              style={{ fontSize: 18, paddingBottom: 10 }}
              value={props.route.params?.values?.mobileNo}
              editable={false}
            />
            {/* <IntlPhoneInput
            va
              disableCountryChange
              onChangeCountry={() => setField("")}
              // onChangeText={(text: any) => {
              //   setField(text?.unmaskedPhoneNumber);
              // }}
              defaultCountry="PK"
              showInput={true}
            /> */}
            <View
              style={{ borderWidth: 0.8, borderColor: colors.BorderColor }}
            />
            {/* {passwordError && (
              <ResponsiveText style={styles.responsiveText}>
                Enter Mobile Number!
              </ResponsiveText>
            )} */}
          </View>

          <View style={{ paddingVertical: wp(10) }}>
            {/* MAuthApiService.verifyNumber(field) */}
            <AuthButton onPress={phoneVerification} title={"Proceed"} />
          </View>

          <ResponsiveText
            style={{ ...styles.reciveText, color: colors.PlaceHolderText }}
          >
            Didn’t recieve a email/Mobile code?{" "}
          </ResponsiveText>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("CheckEmail");
            }}
          >
            <ResponsiveText
              style={{ ...styles.resendText, color: colors.Primary }}
            >
              Resend email/code | Change email/number
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: wp(10),
  },
  titleText: {
    fontFamily: Fonts.ManropeBold,
    fontSize: 6.5,
  },
  subTit: {
    marginVertical: wp(5),
    marginBottom: wp(20),
  },
  reciveText: {
    fontSize: 3.8,
    textAlign: "center",
  },
  resendText: {
    fontSize: 3.8,
    marginTop: wp(3),
    textAlign: "center",
  },
  responsiveText: {
    marginTop: wp(2),
    fontSize: 3.5,
    color: "red",
  },
});
export default VerificationScreen;

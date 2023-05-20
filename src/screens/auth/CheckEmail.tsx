import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import Container from "@src/components/common/Container";
import EmailLogo from "@src/assets/images/Mail.svg";
import CrossIcon from "@src/assets/images/Cross_icon.svg";
import AuthButton from "@src/components/common/AuthButton";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { useTheme } from "@react-navigation/native";
import Fonts from "@src/theme/fonts";

interface Props {
  navigation: any;
}
const CheckEmail = (props: Props) => {
  const { colors } = useTheme();
  return (
    <Container>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.crossBtn}
        >
          <CrossIcon />
        </TouchableOpacity>
        <EmailLogo />
        <ResponsiveText style={styles.checkText}>
          Check your Email
        </ResponsiveText>
        <ResponsiveText
          style={{ ...styles.sendText, color: colors.PlaceHolderText }}
        >
          We have sent you a reset password link on your registered email
          address.
        </ResponsiveText>
        <View style={{ marginTop: wp(15) }}>
          <AuthButton
            onPress={() => {
              props.navigation.navigate("ResetPassword");
            }}
            title={"Go to Email"}
          />
        </View>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: wp(15),
  },
  crossBtn: {
    position: "absolute",
    top: wp(5),
    right: wp(10),
  },
  checkText: {
    fontFamily: Fonts.ManropeBold,
    fontSize: 5,
    marginVertical: wp(5),
  },
  sendText: {
    fontSize: 3.5,
    textAlign: "center",
  },
});
export default CheckEmail;

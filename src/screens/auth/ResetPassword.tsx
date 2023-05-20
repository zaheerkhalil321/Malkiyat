import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
//@ts-ignore
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Chevron_Right.svg";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import TextField from "@src/components/common/TextField";
import AuthButton from "@src/components/common/AuthButton";
import Content from "@src/components/common/Content";
import MAuthApiService from "@src/services/MAuthApiservice";
import Loader from "@src/components/ui/loader/Loader";
import { FlashMessage } from "@src/helpers/FlashMessage";
import { Route } from "@src/services/model";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route?: Route;
}
const ResetPassword = (props: Props) => {
  console.log(props, "props");

  const [eye, setEye] = useState<boolean>(false);
  const [eye2, setEye2] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
  const [confirmpassword, setConfirmPassword] = useState<string | undefined>(
    undefined
  );
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const { colors } = useTheme();

  const passwordVerification = async () => {
    if (newPassword && confirmpassword && newPassword == confirmpassword) {
      if (newPassword?.length < 8) {
        FlashMessage({
          message: "Password must be 8 characters Long!",
          type: "danger",
          duration: 2000,
          animationDuration: 500,
        });
      } else {
        const passwordObj: {
          userId: number | undefined;
          password: string | undefined;
        } = {
          userId: props.route?.params?.userId,
          password: newPassword,
        };
        setLoader(true);
        let res: any = await MAuthApiService.changePassword(
          passwordObj,
          props.navigation
        );
        if (res) {
          setLoader(false);
        }
      }
    } else {
      setPasswordError(true);
    }
  };
  React.useEffect(() => {
    if (passwordError && confirmpassword && newPassword) {
      if (confirmpassword == newPassword) {
        setPasswordError(false);
      }
    }
  }, [newPassword, confirmpassword, passwordError]);
  return (
    <Container>
      <Content bounces={false} contentContainerStyle={styles.container}>
        <View style={styles.viewContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Logo style={{ marginVertical: wp(10) }} />
          </TouchableOpacity>

          <ResponsiveText style={styles.titleText}>
            Reset Your Password!
          </ResponsiveText>

          <View>
            <TextField
              setEye={setEye}
              eye={eye}
              show
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              placeholder={"New Password"}
            />
            {newPassword && newPassword!?.length >= 8 ? (
              <BarPasswordStrengthDisplay
                width={wp(80)}
                password={newPassword}
                minLength={8}
                wrapperStyle={{ marginLeft: 0 }}
              />
            ) : null}
          </View>
          <View style={{ marginTop: wp(10) }}>
            <TextField
              setEye={setEye2}
              eye={eye2}
              show
              value={confirmpassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder={"Confirm Password"}
            />
            {passwordError && (
              <ResponsiveText
                style={{ marginTop: wp(2), fontSize: 3.5, color: "red" }}
              >
                Password mismatch
              </ResponsiveText>
            )}
          </View>

          <View style={{ paddingVertical: wp(10) }}>
            <AuthButton
              disabled={!newPassword || !confirmpassword}
              onPress={passwordVerification}
              title={"Proceed"}
            />
          </View>

          {/* <ResponsiveText
            style={{ ...styles.dontRe, color: colors.PlaceHolderText }}
          >
            Didn’t recieve a email/Mobile code?{" "}
          </ResponsiveText> */}
        </View>
        <Loader visible={loader} />
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
    marginBottom: wp(10),
  },
  enterText: {
    marginVertical: wp(5),
    marginBottom: wp(20),
  },
  dontRe: {
    fontSize: 3.8,
    textAlign: "center",
  },
  resendText: {
    fontSize: 3.8,
    marginTop: wp(3),
    textAlign: "center",
  },
});
export default ResetPassword;

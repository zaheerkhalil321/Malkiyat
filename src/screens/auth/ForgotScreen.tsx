import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Chevron_Right.svg";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import AuthButton from "@src/components/common/AuthButton";
import Content from "@src/components/common/Content";
import MAuthApiService from "@src/services/MAuthApiservice";
import Loader from "@src/components/ui/loader/Loader";
import IntlPhoneInput from "@src/components/phoneInput";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
const ForgotScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [field, setField] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const dispatch = useSafeDispatch();
  const { colors } = useTheme();
  React.useEffect(() => {
    if (field!?.length > 0 && passwordError) {
      setPasswordError(false);
    } else if (field!?.length == 0 && !passwordError) {
      setPasswordError(true);
    }
  }, [field]);
  const phoneVerification = async () => {
    setLoading(true);
    let res: any = await dispatch(
      MAuthApiService.forgotPassword(field, props.navigation)
    );
    if (res.status == 200) {
      setLoading(false);
    } else {
      setLoading(false);
      console.log(res);
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
            Forgot Password
          </ResponsiveText>
          <ResponsiveText
            style={{ ...styles.subTit, color: colors.PlaceHolderText }}
          >
            Enter your registered mobile number to reset your password.
          </ResponsiveText>
          <View>
            <IntlPhoneInput
              disableCountryChange
              onChangeText={(text: any) => {
                setField(text?.unmaskedPhoneNumber);
              }}
              defaultCountry="PK"
              showInput={true}
            />
            <View style={{ borderWidth: 1, borderColor: colors.BorderColor }} />
            {passwordError && (
              <ResponsiveText style={styles.responsiveText}>
                Enter Mobile Number!
              </ResponsiveText>
            )}
          </View>

          <View style={{ paddingVertical: wp(10) }}>
            <AuthButton
              onPress={() => {
                if (field!?.length > 0) {
                  phoneVerification();
                } else {
                  setPasswordError(true);
                }
              }}
              title={"Confirm"}
            />
          </View>
        </View>
        <Loader visible={loading} />
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
export default ForgotScreen;

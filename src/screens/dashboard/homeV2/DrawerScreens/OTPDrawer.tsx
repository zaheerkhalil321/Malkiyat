import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  EmitterSubscription,
  DeviceEventEmitter,
  Platform,
  Modal,
} from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
  RouteProp,
  CommonActions,
} from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Chevron_Right.svg";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import AuthButton from "@src/components/common/AuthButton";
import MAuthApiService from "@src/services/MAuthApiservice";
import Loader from "@src/components/ui/loader/Loader";
import RnOtpTimer from "@src/utils/RnOtpTimer";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import Union from "@src/assets/images/Union.svg";
import Con from "@src/assets/images/rev.svg";
import _ from "lodash";
import CrossIcon from "@src/assets/images/crossIcon.svg";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
interface Props {
  route?: RouteProp<any>;
  navigation: NavigationProp<ParamListBase>;
}

const CELL_COUNT = 4;

const OTPDrawer = (props: Props) => {
  console.log(props, "pppp");
  const [value, setValue] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const timerRef = React.useRef<{ onFocus: () => {} }>(null);
  const dispatch = useSafeDispatch();
  const registerReducer = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  const [data, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verifyOtp = async () => {
    // props.navigation.navigate("CashOutSucess", {
    //   ...props.route?.params,
    // });

    if (otpExpired) {
      return Alert.alert("OTP has been expired");
    }
    setLoading(true);
    if (_.size(value) == 4) {
      const otp: { userId: string | undefined; otp: string } = {
        userId: String(
          store.getState().registerUser.registerUserData?.userInfo?.userId!
        ),
        otp: value,
      };

      setLoading(true);
      const res = await MRegisterUserApiService.verifyCashoutOtp(otp);

      if (res.data?.code == 200) {
        setLoading(false);

        const res: any = await dispatch(
          MRegisterUserApiService.userProfileApi(
            props.route?.params?.profileObj
          )
        );

        if (res.data.code == 200) {
          setTimeout(() => {
            setModalVisible(true);
          }, 300);
        }
      } else {
        console.log("wrong");
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <View style={styles.main}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: wp(5),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginRight: wp(5),
            }}
            onPress={() => props.navigation.goBack()}
          >
            <View
              style={{
                backgroundColor: "white",
                width: wp(11.73),
                height: wp(11.73),
                borderRadius: wp(3),
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}
            >
              <Logo width={wp(5)} height={wp(5)} />
            </View>
          </TouchableOpacity>
          <ResponsiveText
            style={{ fontSize: 4.5, fontFamily: Fonts.ManropeBold }}
          >
            Enter OTP
          </ResponsiveText>
        </View>
        <ResponsiveText
          style={{
            fontSize: 8.53,
            fontFamily: Fonts.ManropeSemiBold,
            marginTop: wp(2),
          }}
        >
          4- digit code
        </ResponsiveText>
        <ResponsiveText
          style={{
            color: "#828282",
            fontFamily: Fonts.ManropeSemiBold,
            fontSize: 4.8,
            marginTop: wp(4),
          }}
        >
          {`Please enter the OTP sent to`}
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeSemiBold,
            marginTop: wp(2),
            fontSize: 4.8,
          }}
        >
          +92 {registerReducer.userInfo?.mobileNo?.toString().slice(1)}
          {/* {props?.route?.params?.phone.length == 10 &&
                                props?.route?.params?.phone.charAt(0) != "0"
                                ? props?.route?.params?.phone
                                : props?.route?.params?.phone.slice(1)} */}
        </ResponsiveText>
        <View>
          <CodeField
            key={1}
            ref={ref}
            {...data}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View style={styles.cellStyle}>
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: wp(5),
          }}
        >
          <RnOtpTimer
            ref={timerRef}
            mobileNo={String(
              registerReducer.userInfo?.mobileNo?.toString().slice(1)
            )}
            minutes={2}
            seconds={0}
            timerStyle={{
              marginLeft: wp(2),
              marginTop: 2,
              color: "#828282",
              fontSize: 16,
            }}
            setValue={setValue}
            // resendButtonStyle={styles.button}
            // resendButtonTextStyle={styles.buttonText}
            resendButtonAction={() => {}}
            setOtpExpired={setOtpExpired}
          />
        </View>
        <View style={{ paddingVertical: wp(20), alignItems: "center" }}>
          <AuthButton
            disabled={_.size(value) == 4 ? false : true}
            onPress={verifyOtp}
            title={"Verify OTP"}
          />
        </View>
      </View>

      <Loader visible={loading} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => false}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View
              style={{
                backgroundColor: "#2BACE3",
                height: wp(45),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: "HomeDrawer",
                        },
                      ],
                    })
                  );
                }}
                style={{
                  alignSelf: "flex-end",
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <CrossIcon />
              </TouchableOpacity>
              <View style={{ marginTop: wp(10) }}>
                <Con width={wp(22)} height={wp(22)} />
              </View>
            </View>
            <View style={{ marginTop: -3 }}>
              <Union width={"100%"} />
            </View>
            <View
              style={{
                paddingVertical: wp(5),
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <ResponsiveText
                style={{
                  color: "#2BACE3",
                  fontSize: 6.4,
                  fontFamily: Fonts.ManropeBold,
                }}
              >
                Congratulations!
              </ResponsiveText>
              <ResponsiveText
                style={{ color: "#2BACE3", fontSize: 4, marginTop: wp(2) }}
              >
                Profile Updated Successfully
              </ResponsiveText>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  textBold: {
    fontFamily: Fonts.ManropeBold,
    fontSize: 4.5,
    // lineHeight: 35,
  },
  logoStyle: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(1),
    width: wp(35),
    height: wp(10),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  linkText: { fontSize: 30, textAlign: "center" },
  link: { fontSize: 30, marginTop: wp(3), textAlign: "center" },
  flexRow: {
    flexDirection: "row",
  },
  textField: {
    width: wp(1),
  },

  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 50 },
  codeFieldRoot: { marginTop: 0 },
  cell: {
    // width: wp(13.33),
    // height: wp(16),
    // lineHeight: 38,
    fontSize: 30,

    color: "#2BACE3",
    // borderBottomColor: "#EFEFF1",
    // borderBottomWidth: 1,
    // paddingBottom: 10,
    textAlign: "center",

    // backgroundColor: 'red'
  },
  focusCell: {
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  cellStyle: {
    borderColor: "#545454",
    borderWidth: 1,
    marginTop: wp(10),
    borderRadius: wp(1),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    width: wp(13.33),
    height: wp(16),
  },
  otpRestText: {},

  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    // paddingTop: wp(30),
    justifyContent: "center",
  },
  modalContent: {
    height: "50%",
    width: "90%",
    backgroundColor: "white",
    overflow: "hidden",
    // paddingHorizontal: wp(5),
    borderRadius: wp(3),
    borderWidth: 0.5,
    borderColor: "#C2C2C2",
    // position: 'absolute',
    // bottom: wp(5)
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
});
export default OTPDrawer;

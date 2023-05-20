import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Alert,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import TryAgain from "@src/assets/images/tryAgain.svg";
import ErrorMsg from "@src/assets/images/error_msg.png";
import MarketImage from "@src/assets/images/market_modal.png";
import KycImage from "@src/assets/images/Kyc_modal.png";
import WarningImage from "@src/assets/images/warning.png";
import { store } from "@src/redux";
import { RootState } from "@src/redux/reducers";
import { ModalType } from "@src/services/model";
import { closeErrorModal } from "@src/redux/action-creators";
import { navigate, navigationRef } from "@src/helpers/NavigationService";
import { CommonActions } from "@react-navigation/native";
import { removeToken } from "@src/redux/action-creators/registerUser";

const dispatch: any = store.dispatch;

type ModalObjI = {
  [key in ModalType]: {
    image: ImageSourcePropType;
    errorTitle: string | undefined;
    jsx: React.ReactNode;
  };
};

const modalObj: ModalObjI = {
  KYC: {
    image: KycImage,
    errorTitle: "",
    jsx: (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          width: wp(60),
          marginTop: wp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => dispatch(closeErrorModal())}
          style={{
            borderColor: "#3577DB",
            borderWidth: 1,
            width: wp(25),
            height: wp(9.2),
            borderRadius: wp(2),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveText
            style={{
              color: "#3577DB",
              fontSize: 3.73,
              fontFamily: Fonts.ManropeSemiBold,
            }}
          >
            Later
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(closeErrorModal());
            //@ts-ignore
            navigate("DashBoardStack", {
              screen: "UnregisterUserStack",
              params: {
                screen: "KycPakistan",
              },
            });
            // console.log(navigate, "...");
          }}
          style={{
            backgroundColor: "#2BACE3",
            width: wp(25),
            height: wp(9.2),
            borderRadius: wp(2),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontSize: 3.73,
              fontFamily: Fonts.ManropeSemiBold,
            }}
          >
            KYC Form
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    ),
  },
  Info: {
    image: undefined as unknown as ImageSourcePropType,
    errorTitle: "",
    jsx: <View></View>,
  },
  Error: {
    image: MarketImage,
    errorTitle: "",
    jsx: (
      <View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: "#2BACE3",
            width: wp(25),
            height: wp(9.2),
            borderRadius: wp(2),
            justifyContent: "center",
            alignItems: "center",
            marginTop: wp(3),
          }}
          onPress={() => {
            dispatch(closeErrorModal());
          }}
        >
          <ResponsiveText
            style={{ color: "white", fontFamily: Fonts.ManropeBold }}
          >
            Ok
          </ResponsiveText>
        </TouchableOpacity> */}
      </View>
    ),
  },
  MARKETPLACE: {
    image: undefined as unknown as ImageSourcePropType,
    errorTitle: "",
    jsx: <View></View>,
  },
  SESSION_OUT: {
    image: MarketImage,
    errorTitle: "",
    jsx: (
      <TouchableOpacity
        style={{
          marginTop: wp(5),
          backgroundColor: "#3577DB",
          paddingVertical: wp(2),
          paddingHorizontal: wp(6),
          borderRadius: 10,
        }}
        onPress={() => {
          store.dispatch(removeToken() as any);
          dispatch(closeErrorModal());
          navigationRef.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "AuthStack",
                  state: {
                    routes: [
                      {
                        name: "LoginScreen",
                      },
                    ],
                  },
                },
              ],
            })
          );
        }}
      >
        <ResponsiveText
          style={{
            fontSize: 5,
            color: "white",
          }}
        >
          OK
        </ResponsiveText>
      </TouchableOpacity>
    ),
  },
};

const CustomErrorModal = (props) => {
  let timeout: NodeJS.Timeout | undefined = undefined;
  const [showModal, setShowModal] = useState<boolean>(false);
  const { show, errorMessage, modal_type } = useSelector(
    (state: RootState) => state.authReducer.errorModal
  );
  const { image, errorTitle, jsx } = modalObj[modal_type] ?? {};

  useEffect(() => {
    // ! THIS TIMEOUT WILL UPDATED STATE AFTER CUSTOM LOADING HAS FINISHED

    timeout = setTimeout(() => {
      setShowModal(show);
    }, 500);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <Modal
      isVisible={showModal}
      backdropOpacity={0}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        width: wp(100),
        height: wp(100),
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => {
        //   dispatch(closeErrorModal());
        // }}
        style={styles.modalContainer}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              dispatch(closeErrorModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <Image
              style={{ width: wp(6), height: wp(6) }}
              source={require("@src/assets/images/cross.png")}
            />
          </TouchableOpacity>

          <Image
            style={{
              width: wp(30),
              height: wp(30),
              backgroundColor: "white",
              resizeMode: "contain",
            }}
            source={image}
          />
          {/* <Image style={{ width: wp(50), height: wp(35), backgroundColor: 'white' }} source={ErrorMsg} />
          <Image style={{ width: wp(50), height: wp(25), backgroundColor: 'white', resizeMode: 'contain' }} source={MarketImage} /> */}
          <ResponsiveText
            style={{
              fontSize: 4.5,
              fontFamily: Fonts.ManropeBold,
              color: "#3577DB",
              marginTop: wp(2),
            }}
          >
            {errorTitle}
          </ResponsiveText>
          <ResponsiveText
            style={{
              fontSize: 4.5,
              width: wp(65),
              marginVertical: wp(2),
              textAlign: "center",
              // color: "red",
              // fontFamily: Fonts.ManropeBold,
              // backgroundColor: "red",
            }}
          >
            {errorMessage}
            {/* Please fill up the KYC form to sell and purchase
            Sqfts and to further navigate in app. */}
          </ResponsiveText>
          {jsx}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    // height: "40%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: wp(5),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(5),
  },
  btn: {
    flex: 1,
    height: wp(10),
    backgroundColor: "white",
  },
});

export default CustomErrorModal;

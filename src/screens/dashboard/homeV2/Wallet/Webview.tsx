import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import WebView from "react-native-webview";

import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import {
  MeezanTransactionInterface,
  WalletCompanies,
} from "@src/services/model";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import {
  WebViewNavigation,
  WebViewProgressEvent,
} from "react-native-webview/lib/WebViewTypes";
import Loader from "@src/components/ui/loader/Loader";
import ResponsiveText from "@src/components/common/ResponseiveText";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}
import Fonts from "@src/theme/fonts";
export declare type BscurePaymentI = MeezanTransactionInterface;
import Arrow from "@src/assets/images/arrow_left.svg";
import { wp } from "@src/components/common/Responsive";
import CongratesModal from "./CongratesModal";
const Webview = (props: Props) => {
  // props.navigation.goBack();
  const {
    transactionFrom,
    purchaseAmount,
    paymentMethodId,
    orderId,
    onlyCashIn,
    companyName,
  } = props.route.params as {
    transactionFrom: number;
    purchaseAmount: number;
    paymentMethodId: number;
    orderId: number;
    onlyCashIn: number;
    companyName: WalletCompanies;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const counterRef = useRef<number>(0);
  const [modalVisibleCongrates, setModalVisibleCongrates] =
    useState<boolean>(false);
  const bsecureObj = {
    transactionFrom,
    purchaseAmount,
    paymentMethodId,
    orderRef: orderId,
    onlyCashIn,
    propertyId: 12,
    purchaseUnits: 1,
    transactionTo: 0,
    buyFromMalkiyat: "true",
    cashInAmount: purchaseAmount,
  };

  async function VerifyPaymentStatus() {
    setLoading(true);

    const res = await MRegisterUserApiService.bsecureVerification(
      bsecureObj as any
    );

    if (res.data?.status == 200) {
      setLoading(false);

      setTimeout(() => {
        setModalVisibleCongrates(true);
      }, 1000);
    } else {
      setLoading(false);
      Alert.alert(
        "Something went wrong!",
        String(res?.data?.message) ?? `Unable to purhcase Sqfts right now`,
        [
          {
            text: "Ok",
            onPress: () => props.navigation.goBack(),
          },
        ]
      );
    }
  }
  function handleFailedTransAlert() {
    Alert.alert(
      "Transaction Failed!",
      "Something went wrong while cashing payment",
      [
        {
          text: "OK",
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]
    );
  }
  function handleAndroidState(e: WebViewProgressEvent) {
    if (counterRef.current == 0) {
      let { url } = e.nativeEvent;
      if (
        url.includes("success") &&
        (companyName == "paymob-nift" ||
          companyName == "paymob-card" ||
          companyName == "paymob-ep")
      ) {
        counterRef.current = 1;
        if (new URL(url).searchParams.get("success") == "true") {
          return VerifyPaymentStatus();
        } else {
          return handleFailedTransAlert();
        }
      }
    }
  }

  function handleIosState(state: WebViewNavigation) {
    if (counterRef.current == 0) {
      let { url } = state;

      if (
        url.includes("success") &&
        (companyName == "paymob-nift" ||
          companyName == "paymob-card" ||
          companyName == "paymob-ep")
      ) {
        counterRef.current = 1;
        if (new URL(url).searchParams.get("success") == "true") {
          return VerifyPaymentStatus();
        } else {
          return handleFailedTransAlert();
        }
      }
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: wp(15),
              marginLeft: wp(5),
              marginVertical: wp(3),
            }}
            onPress={() => props.navigation.goBack()}
          >
            <View
              style={{
                backgroundColor: "#F4F4F4",
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
              <Arrow width={wp(5)} height={wp(5)} />
            </View>
          </TouchableOpacity>
          <ResponsiveText
            style={{ fontSize: 5, fontFamily: Fonts.ManropeBold }}
          >
            Add Funds
          </ResponsiveText>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <WebView
            androidLayerType="hardware"
            scalesPageToFit
            contentMode="mobile"
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoadProgress={(e) => {
              //? USING THIS CALLBACK FOR ANDROID BECAUSE ANDROID DOES NOT SHOW LAST PAGE OF SUCCESS
              if (Platform.OS == "android") {
                handleAndroidState(e);
              }
            }}
            onNavigationStateChange={(state) => {
              //? USING THIS CALLBACK MOST PROBABLY FOR IOS
              if (Platform.OS == "ios") {
                handleIosState(state);
              }
            }}
            startInLoadingState
            source={{
              uri: props.route!.params?.checkOutUrl,
            }}
          />
        </KeyboardAvoidingView>
        <Loader visible={loading} />
      </SafeAreaView>
      <CongratesModal
        modalVisible={modalVisibleCongrates}
        setModalVisible={setModalVisibleCongrates}
        data={props.route?.params}
        {...props}
      />
    </>
  );
};

export default Webview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

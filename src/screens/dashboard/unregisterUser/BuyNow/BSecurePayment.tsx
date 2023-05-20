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
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import { wp } from "@src/components/common/Responsive";
import Arrow from "@src/assets/images/arrow_left.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}
export declare type BscurePaymentI = MeezanTransactionInterface;

const BSecurePayment = (props: Props) => {
  const reducerState = useSelector((state: RootState) => state.registerUser);
  const units = reducerState.selectedTileData.units;
  // props.navigation.goBack();
  const {
    transactionFrom,
    transactionTo,
    purchaseAmount,
    purchaseUnits,
    propertyId,
    paymentMethodId,
    proofOfPurchaseId,
    proofOfDeliveryId,
    buyFromMalkiyat,
    orderId,
    onlyCashIn,
    companyName,
    cashInAmount,
  } = props.route.params as {
    transactionFrom: number;
    transactionTo: number;
    purchaseUnits: number;
    propertyId: number;
    proofOfPurchaseId: number;
    proofOfDeliveryId: number;
    buyFromMalkiyat: boolean;
    purchaseAmount: number;
    paymentMethodId: number;
    orderId: number;
    onlyCashIn: string;
    companyName: WalletCompanies;
    cashInAmount: number;
  };
  console.log(
    transactionFrom,
    transactionTo,
    purchaseAmount,
    purchaseUnits,
    propertyId,
    paymentMethodId,
    proofOfPurchaseId,
    proofOfDeliveryId,
    buyFromMalkiyat,
    orderId,
    onlyCashIn,
    companyName,
    cashInAmount
  );

  const [loading, setLoading] = useState<boolean>(false);
  const counterRef = useRef<number>(0);
  async function meezanVerifyApi() {
    const meezanVerifyObj: MeezanTransactionInterface = {
      transactionFrom,
      transactionTo,
      purchaseAmount,
      purchaseUnits,
      propertyId,
      paymentMethodId,
      proofOfPurchaseId,
      proofOfDeliveryId,
      orderRef: orderId,
      buyFromMalkiyat,
      onlyCashIn,
      cashInAmount,
    };
    await MRegisterUserApiService.meezanVerification(meezanVerifyObj);
  }
  async function VerifyPaymentStatus() {
    setLoading(true);
    const bsecureObj: BscurePaymentI = {
      transactionFrom,
      transactionTo,
      purchaseAmount,
      purchaseUnits,
      propertyId,
      paymentMethodId,
      orderRef: orderId,
      buyFromMalkiyat,
      proofOfPurchaseId,
      proofOfDeliveryId,
      onlyCashIn,
      cashInAmount,
    };

    const res = await MRegisterUserApiService.bsecureVerification(bsecureObj);
    console.log(
      "🚀 ~ file: BSecurePayment.tsx:126 ~ VerifyPaymentStatus ~ res",
      res,
      bsecureObj
    );
    if (res.data?.status == 200) {
      setLoading(false);
      !loading &&
        props.navigation.navigate("Congrates", {
          units: units,
          amount: props.route?.params?.amount,
          showSecurityText: true,
        });
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
      console.log(url);

      if (
        url.includes("success") &&
        (companyName == "paymob-nift" ||
          companyName == "paymob-card" ||
          companyName == "paymob-ep")
      ) {
        console.log(new URL(url).searchParams.get("success") == "true", url);

        counterRef.current = 1;
        if (new URL(url).searchParams.get("success") == "true") {
          return VerifyPaymentStatus();
        } else {
          return handleFailedTransAlert();
        }
      } else if (url.includes("payment_deposited") && paymentMethodId == 7) {
        counterRef.current = 1;

        meezanVerifyApi();
        props.navigation.navigate("Congrates", {
          units: units,
          amount: props.route?.params?.amount,
        });
      }
    }
  }

  function handleIosState(state: WebViewNavigation) {
    if (counterRef.current == 0) {
      let { url } = state;

      if (
        state.url.includes("success") &&
        (companyName == "paymob-nift" ||
          companyName == "paymob-card" ||
          companyName == "paymob-ep")
      ) {
        console.log(new URL(url).searchParams.get("success") == "true", url);

        counterRef.current = 1;
        if (new URL(url).searchParams.get("success") == "true") {
          return VerifyPaymentStatus();
        } else {
          return handleFailedTransAlert();
        }
      } else if (
        state.url.includes("payment_deposited") &&
        paymentMethodId == 7
      ) {
        counterRef.current = 1;

        meezanVerifyApi();
        props.navigation.navigate("Congrates", {
          units: units,
          amount: props.route?.params?.amount,
        });
      }
    }
  }
  return (
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
        <ResponsiveText style={{ fontSize: 5, fontFamily: Fonts.ManropeBold }}>
          Payment
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
  );
};

export default BSecurePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

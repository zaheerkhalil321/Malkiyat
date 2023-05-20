import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-url-polyfill/auto";

import {
  RegisterBuyNowStackI,
  RegisterUserStackI,
} from "@src/navigation/RootStackParams";
import MySqFt from "@src/screens/dashboard/homeV2/mysqft/MySqFt";
import TransactionHistory from "@src/screens/dashboard/homeV2/transactionHistory/TransactionHistory";
import SellSqft from "@src/screens/dashboard/homeV2/sellSqft";
import SellSqftCalculation from "@src/screens/dashboard/homeV2/sellSqft/SellSqftCalculation";
import SellDetails from "@src/screens/dashboard/homeV2/sellSqft/SellDetails";
import Review from "@src/screens/dashboard/homeV2/sellSqft/Review";
import Congrate from "@src/screens/dashboard/homeV2/sellSqft/Congrate";
import Advertise from "@src/screens/dashboard/homeV2/Advertise/Advertise";
import AdvertiseStep2 from "@src/screens/dashboard/homeV2/Advertise/AdvertiseStep2";
import AdvertiseStep3 from "@src/screens/dashboard/homeV2/Advertise/AdvertiseStep3";
import AdvertiseReview from "@src/screens/dashboard/homeV2/Advertise/AdvertiseReview";
import AdvertiseCongrate from "@src/screens/dashboard/homeV2/Advertise/AdvertiseCongrate";
import LowerOffer from "@src/screens/dashboard/homeV2/buySqft/LowerOffer";
import BuySqftCalculation from "@src/screens/dashboard/homeV2/buySqft/BuySqftCalculation";
import BuyDetails from "@src/screens/dashboard/homeV2/buySqft/BuyDetails";
import RegisterTiles from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterTiles";
import RegisterBuyNowStep1 from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterBuyNowStep1";
import RegisterProofPurchase from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterProofPurchase";
import RegisterPayment from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterPayment";
import RegisterTopNavigationBar from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterTopNavigationbar";
import HomeDrawer from "./RegisterUserDrawer";
import MyAds from "@src/screens/dashboard/homeV2/MyAds/MyAds";
import MyAdsReview from "@src/screens/dashboard/homeV2/MyAds/MyAdsReview";
import RegisterProofOfProcessing from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterProofOfProcessing";
import ChangePassword from "@src/screens/dashboard/homeV2/DrawerScreens/ChangePassword";
import Help from "@src/screens/dashboard/homeV2/DrawerScreens/Help";
import Account from "@src/screens/dashboard/homeV2/DrawerScreens/Account";
import Notifications from "@src/screens/dashboard/homeV2/DrawerScreens/Notifications";
import MyAdsCongrate from "@src/screens/dashboard/homeV2/MyAds/MyAdsCongrate";
import Privacy from "@src/screens/dashboard/homeV2/DrawerScreens/Privacy";
import Feedback from "@src/screens/dashboard/homeV2/DrawerScreens/Feedback";
import Wallet from "@src/screens/dashboard/homeV2/Wallet/Wallet";
import CashIn from "@src/screens/dashboard/homeV2/Wallet/CashIn";
import SellToMalkiyat from "@src/screens/dashboard/homeV2/SellToMalkiyat/SellToMalkiyat";
import MalkiyatReview from "@src/screens/dashboard/homeV2/SellToMalkiyat/MalkiyatReview";
import MalkiyatCongrates from "@src/screens/dashboard/homeV2/SellToMalkiyat/MalkiyatCongrates";
import Webview from "@src/screens/dashboard/homeV2/Wallet/Webview";
import PayPro from "@src/screens/dashboard/homeV2/Wallet/PayPro";
import ReviewDetails from "@src/screens/dashboard/homeV2/Wallet/ReviewDetails";
import Voucher from "@src/screens/dashboard/homeV2/Wallet/Voucher";
import AllVouchers from "@src/screens/dashboard/homeV2/Wallet/AllVouchers";
import Trends from "@src/screens/dashboard/homeV2/trends/Trends";
import RegisterBSecurePayment from "@src/screens/dashboard/homeV2/registerBuyProperty/RegisterBsecure";
import _handleSSE from "@src/utils/handleSSE";
import CashOutReview from "@src/screens/dashboard/homeV2/CashOut/CashOutReview";
import CashOutOtp from "@src/screens/dashboard/homeV2/CashOut/CashOutOtp";
import CashOutSucess from "@src/screens/dashboard/homeV2/CashOut/CashOutSuccess";
import PendingState from "@src/screens/dashboard/homeV2/CashOut/PendingState";
import MalkiyatBuyBack from "@src/screens/dashboard/homeV2/SellToMalkiyat/MalkiyatBuyBack";
import PropertyBuyBack from "@src/screens/dashboard/homeV2/SellToMalkiyat/PropertyBuyBack";
import BuyBackHighest from "@src/screens/dashboard/homeV2/SellToMalkiyat/BuyBackHighest";
import MalkiyatBankReview from "@src/screens/dashboard/homeV2/Wallet/MalkiyatBankReview";
import UploadRecipt from "@src/screens/dashboard/homeV2/CashOut/UploadRecipt";
import PaymentDetail from "@src/screens/dashboard/homeV2/CashOut/PaymentDetail";
import BuyBackDetail from "@src/screens/dashboard/homeV2/SellToMalkiyat/BuyBackDetail";
import ProfileScreen from "@src/screens/dashboard/homeV2/DrawerScreens/ProfileScreen";
import OTPDrawer from "@src/screens/dashboard/homeV2/DrawerScreens/OTPDrawer";

const RegisterUser = () => {
  //* TODO this will be implemement for dashboard
  const { Navigator, Screen } = createStackNavigator<RegisterUserStackI>();

  useEffect(() => {
    _handleSSE();
    return () => {
      _handleSSE();
    };
  }, []);

  // prettier-ignore

  return (
    <Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName="HomeDrawer" >
      <Screen component={HomeDrawer} name="HomeDrawer" />
      <Screen component={MyAds} name="MyAds" />
      <Screen component={Wallet} name="Wallet" />
      <Screen component={CashIn} name="CashIn" />
      <Screen component={PayPro} name="PayPro" />
      <Screen component={ReviewDetails} name="ReviewDetails" />
      <Screen component={CashOutReview} name="CashOutReview" />
      <Screen component={CashOutOtp} name="CashOutOtp" />
      <Screen component={CashOutSucess} name="CashOutSucess" />
      <Screen component={PendingState} name="PendingState" />
      <Screen component={MalkiyatBuyBack} name="MalkiyatBuyBack" />
      <Screen component={PropertyBuyBack} name="PropertyBuyBack" />
      <Screen component={BuyBackHighest} name="BuyBackHighest" />
      <Screen component={BuyBackDetail} name="BuyBackDetail" />
      <Screen component={Voucher} name="Voucher" />
      <Screen component={UploadRecipt} name="UploadRecipt" />
      <Screen component={PaymentDetail} name="PaymentDetail" />
      <Screen component={MalkiyatBankReview} name="MalkiyatBankReview" />
      <Screen component={AllVouchers} name="AllVouchers" />
      <Screen component={Webview} name="Webview" />
      <Screen component={SellToMalkiyat} name="SellToMalkiyat" />
      <Screen component={MalkiyatReview} name="MalkiyatReview" />
      <Screen component={MalkiyatCongrates} name="MalkiyatCongrates" />
      <Screen component={MyAdsReview} name="MyAdsReview" />
      <Screen component={MyAdsCongrate} name="MyAdsCongrate" />
      <Screen component={MySqFt} name="MySqFt" />
      <Screen component={Trends} name="Trends" />
      <Screen component={RegisterBSecurePayment} name="RegisterBSecurePayment" />
      <Screen component={TransactionHistory} name="TransactionHistory" />
      <Screen component={SellSqft} name="SellSqft" />
      <Screen component={SellSqftCalculation} name="SellSqftCalculation" />
      <Screen component={SellDetails} name="SellDetails" />
      <Screen component={Review} name="Review" />
      <Screen component={Congrate} name="Congrate" />
      <Screen component={LowerOffer} name="LowerOffer" />
      <Screen component={BuySqftCalculation} name="BuySqftCalculation" />
      <Screen component={Advertise} name="Advertise" />
      <Screen component={AdvertiseStep2} name="AdvertiseStep2" />
      <Screen component={AdvertiseStep3} name="AdvertiseStep3" />
      <Screen component={AdvertiseReview} name="AdvertiseReview" />
      <Screen component={AdvertiseCongrate} name="AdvertiseCongrate" />
      <Screen component={BuyDetails} name="BuyDetails" />
      <Screen component={RegisterBuyNowStack} name="RegisterBuyNowStack" />
      <Screen component={ChangePassword} name="ChangePassword" />
      <Screen component={ProfileScreen} name="ProfileScreen" />
      <Screen component={OTPDrawer} name="OTPDrawer" />
      <Screen component={Help} name="Help" />
      <Screen component={Notifications} name="Notifications" />
      <Screen component={Account} name="Account" />
      <Screen component={Privacy} name="Privacy" />
      <Screen component={Feedback} name="Feedback" />
    </Navigator>
  );
};

export default RegisterUser;
const RegisterBuyNowStack = () => {
  //Import the other screens you use!
  const { Navigator, Screen } = createStackNavigator<RegisterBuyNowStackI>();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="RegisterTiles" component={RegisterTiles} />
      <Screen name="RegisterBuyNowStep1" component={RegisterBuyNowStep1} />
      <Screen name="RegisterProofPurchase" component={RegisterProofPurchase} />
      <Screen name="RegisterPayment" component={RegisterPayment} />
      <Screen
        name="RegisterProofOfProcessing"
        component={RegisterProofOfProcessing}
      />
      <Screen
        name="RegisterTopNavigationBar"
        component={RegisterTopNavigationBar}
      />
    </Navigator>
  );
};

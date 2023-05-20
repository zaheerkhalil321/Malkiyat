import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UnregisterUserStackI } from "@src/navigation/RootStackParams";
// import Home from "@src/screens/dashboard/unregisterUser/home/Home";
import Documents from "@src/screens/dashboard/unregisterUser/documents/Documents";
import Location from "@src/screens/dashboard/unregisterUser/location/Location";
import PropertyFurtherDetail from "@src/screens/dashboard/unregisterUser/propertyFurtherDetail";
import PropertyHistory from "@src/screens/dashboard/unregisterUser/propertyHistory";
import PropertySale from "@src/screens/dashboard/unregisterUser/propertySale";
import BuyNow from "@src/screens/dashboard/unregisterUser/BuyNow/BuyNow";
import SellFt from "@src/screens/dashboard/unregisterUser/SellFt";
import ComingSoon from "@src/screens/dashboard/unregisterUser/BuyNow/ComingSoon";
import UnregisterBuyNow from "@src/screens/dashboard/unregisterUser/BuyNow/UnregisterBuyNow";
import Payment from "@src/screens/dashboard/unregisterUser/BuyNow/Payment";
import UnregisterBuyNowVal from "@src/screens/dashboard/unregisterUser/BuyNow/UnregisterBuyNowVal";
import ProofPurchase from "@src/screens/dashboard/unregisterUser/BuyNow/ProofPurchase";
import Processing from "@src/screens/dashboard/unregisterUser/BuyNow/Processing";
import Congrates from "@src/screens/dashboard/unregisterUser/BuyNow/Congrates";
import SelectCountry from "@src/screens/dashboard/unregisterUser/BuyNow/SelectCountry";
import Info from "@src/screens/dashboard/unregisterUser/BuyNow/Info";
import KycUpload from "@src/screens/dashboard/unregisterUser/BuyNow/KycUpload";
import KycPakistan from "@src/screens/dashboard/unregisterUser/BuyNow/KycPakistan";
import HavePakistani from "@src/screens/dashboard/unregisterUser/BuyNow/HavePakistani";
import UploadPicture from "@src/screens/dashboard/unregisterUser/BuyNow/UploadPicture";
import CNIC from "@src/screens/dashboard/unregisterUser/BuyNow/CNIC";
import EnterId from "@src/screens/dashboard/unregisterUser/BuyNow/EnterId";
import CNICback from "@src/screens/dashboard/unregisterUser/BuyNow/CNICback";
import Confirmation from "@src/screens/dashboard/unregisterUser/BuyNow/Confirmation";
import Gif from "@src/screens/dashboard/unregisterUser/BuyNow/Gif";
import BSecurePayment from "@src/screens/dashboard/unregisterUser/BuyNow/BSecurePayment";
import TopNavigationBar from "./TopNavigationBar";
import HomeView from "@src/screens/dashboard/unregisterUser/home/Home";

// prettier-ignore

const UnregisterUser = () => {
  const { Screen, Navigator } = createStackNavigator<UnregisterUserStackI>();
  return (
    <Navigator
      initialRouteName="HomeView" screenOptions={{ headerShown: false, gestureEnabled: false }} >
      <Screen component={Location} name="Location" />
      <Screen component={BuyNow} name="BuyNow" />
      <Screen component={UnregisterBuyNow} name="UnregisterBuyNow" />
      <Screen component={UnregisterBuyNowVal} name="UnregisterBuyNowVal" />
      <Screen options={{ gestureEnabled: false }} component={ProofPurchase} name="ProofPurchase" />
      <Screen component={HomeView} name="HomeView" />
      <Screen component={TopNavigationBar} name="TopNavigationBar" />
      <Screen component={Processing} name="Processing" />
      <Screen component={Congrates} name="Congrates" />
      <Screen component={SelectCountry} name="SelectCountry" />
      <Screen component={Info} name="Info" />
      <Screen component={KycUpload} name="KycUpload" />
      <Screen component={KycPakistan} name="KycPakistan" />
      <Screen component={HavePakistani} name="HavePakistani" />
      <Screen component={UploadPicture} name="UploadPicture" />
      <Screen component={CNIC} name="CNIC" />
      <Screen component={CNICback} name="CNICback" />
      <Screen component={Confirmation} name="Confirmation" />
      <Screen component={Gif} name="Gif" />
      <Screen component={Payment} name="Payment" />
      <Screen component={Documents} name="MalkiyatDocuments" />
      <Screen component={PropertyHistory} name="PropertyHistory" />
      <Screen component={PropertySale} name="PropertySale" />
      <Screen component={SellFt} name="SellFt" />
      <Screen component={ComingSoon} name="ComingSoon" />
      <Screen component={PropertyFurtherDetail} name="PropertyFurtherDetail" />
      <Screen component={EnterId} name="EnterId" />
      <Screen component={BSecurePayment} name="BSecurePayment" />
    </Navigator>
  );
};

export default UnregisterUser;

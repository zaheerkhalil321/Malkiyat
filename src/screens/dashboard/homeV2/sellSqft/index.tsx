import {
  ActivityIndicator,
  InteractionManager,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import _ from "lodash";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import HigherOffer from "@src/components/home/HigherOffer";
import Fonts from "@src/theme/fonts";
import Addvance from "@src/components/home/Advance";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import {
  EventMessageI,
  HighestOfferDataI,
  HighestOfferI,
  MainResponse,
  PropertyI,
} from "@src/services/model";
import { store } from "@src/redux";

import EventEmitter from "@src/events/EventEmitter";
import { Events } from "@src/events/Events";
import { calculateProfilt } from "@src/utils/helperFunction";
import SellSqLoader from "@src/components/home/SellSqLoader";
import { PriceGuideInterface } from "../Advertise/Advertise";
import Loader from "@src/components/ui/loader/Loader";


type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};
const Sell = (props: Props) => {
  const item = props.route!.params! as { params: PropertyI };
  const componentMounted = useRef(true);
  const [loader, setLoader] = useState(false);
  const ref = useRef<HighestOfferDataI>({} as HighestOfferDataI);
  const [isNavigationTransitionFinished, setIsNavigationTransitionFinished] =
    React.useState(false);
  const [bidData, setBidData] = useState<HighestOfferI>({} as HighestOfferI);
  const [priceDetails, setPriceDetails] = useState<
    Partial<PriceGuideInterface>
  >({
    lowestBuyer: undefined,
    lastSold: undefined,
    fairPrice: undefined,
    lowestSeller: undefined,
    unitsForSale: undefined,
  });
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const task = InteractionManager.runAfterInteractions(() => {
  //       setIsNavigationTransitionFinished(true);
  //     });
  //     return () => task.cancel();
  //   }, [])
  // );
  useEffect(() => {
    async function apiCall() {
      const res = await MRegisterUserApiService.highestOfferBid(
        store.getState().registerUser?.registerUserData?.userInfo?.userId,
        item.params.propertyId,
        0
      );

      const { profit, totalPurchasePrice } = calculateProfilt(
        {} as EventMessageI,
        res.data.data,
        false
      );
      let updatedData = res.data;
      updatedData.data.profit = res?.data?.data?.totalProfit;
      updatedData.data.totalPurchasePrice = totalPurchasePrice;
      ref.current = updatedData.data;

      setBidData({
        ...res.data,
        data: { ...res?.data?.data, profit: res?.data?.data?.totalProfit },
      });
    }
    apiCall();
  }, []);
  useEffect(() => {
    async function priceGuide() {
      setLoader(true);
      const userId =
        store.getState().registerUser?.registerUserData?.userInfo?.userId;
      const res = await MRegisterUserApiService.priceGuideApi(
        Number(userId),
        Number(item?.params?.propertyId)
      );

      if (res?.data?.code == 200) {
        setPriceDetails(res.data.data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
    priceGuide();
  }, []);

  useEffect(() => {
    EventEmitter.on(
      Events.ReceivedMessage,
      (message: MainResponse<EventMessageI>) => {
        const parseMessage: EventMessageI = JSON.parse(message as never);

        if (
          componentMounted.current &&
          item.params.propertyId == Number(parseMessage?.propertyId) &&
          !_.isUndefined(parseMessage?.totalForSaleSmallerUnits) &&
          !_.isUndefined(parseMessage?.highestOfferAmount)
        ) {
          if (parseMessage && _.size(parseMessage) > 0) {
            const { profit, totalPurchasePrice } = calculateProfilt(
              parseMessage,
              ref.current,
              true
            );

            setBidData((prev: HighestOfferI) => ({
              ...prev,
              data: {
                ...prev.data,
                perSmallerUnitOfferPrice:
                  parseMessage?.highestOfferAmount! ?? prev?.data?.highestOffer,
                totalForSaleSmallerUnits:
                  parseMessage?.totalForSaleSmallerUnits ??
                  prev?.data?.totalForSaleSmallerUnits,
                message: parseMessage?.message ?? prev.data?.message,
                profit: profit,
                totalPurchasePrice: totalPurchasePrice,
              },
            }));
          }
        } else {
          console.log("property id is not same!");
        }
      }
    );

    return () => {
      EventEmitter.off(Events.ReceivedMessage, () => {});
      componentMounted.current = false;
    };
  }, []);

  return (
    <Container>
      <ScrollView>
        <HomeHeader
          label={""}
          icon={undefined}
          back
          backgroundColor={"white"}
          show={true}
          {...props}
          title={"Sell my Sqft"}
        />
        {/* {isNavigationTransitionFinished ? ( */}
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
            marginTop: wp(5),
          }}
        >
          <HigherOffer
            bidData={bidData.data}
            propertyDetails={item.params}
            priceDetails={priceDetails}
            {...props}
          />
          <ResponsiveText
            style={{
              marginTop: wp(5),
              marginBottom: wp(3),
              fontSize: 4.27,
              fontFamily: Fonts.ManropeBold,
              marginLeft: wp(5),
            }}
          >
            Advance
          </ResponsiveText>
          <Addvance
            type="Seller"
            {...props}
            priceDetails={priceDetails}
            bidData={bidData.data}
          />
        </View>
        {/* ) : (
          <View style={{ paddingHorizontal: wp(5), marginTop: wp(5), flex: 1 }}>
            <SellSqLoader />
          </View>
        )} */}
      </ScrollView>
      {/* <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          disabled={item.params?.plotsPurchasePriceList ? false : true}
          onPress={() => {
            props.navigation.navigate("SellToMalkiyat", {
              item: item,
              priceDetails: priceDetails,
            });
          }}
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: item.params?.plotsPurchasePriceList
              ? "#2BACE3"
              : "#dedede",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginRight: wp(3),
            }}
          >
            {"Sell to Malkiyat"}
          </ResponsiveText>
        </TouchableOpacity>
      </View> */}
      <Loader visible={loader} />
    </Container>
  );
};

export default Sell;

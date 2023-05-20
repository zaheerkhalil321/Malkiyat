import {
  ActivityIndicator,
  InteractionManager,
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
  HighestOfferDataI,
  HighestOfferI,
  LowerBidMessageI,
  LowestBidResponseI,
  MainResponse,
  PropertyI,
} from "@src/services/model";
import { store } from "@src/redux";

import EventEmitter from "@src/events/EventEmitter";
import { Events } from "@src/events/Events";
import SellSqLoader from "@src/components/home/SellSqLoader";
import LowOffer from "@src/components/home/LowOffer";
import { PriceGuideInterface } from "../Advertise/Advertise";
import axios, { AxiosResponse } from "axios";
import Loader from "@src/components/ui/loader/Loader";

type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const LowerOffer = (props: Props) => {
  const item = props.route!.params! as { params: PropertyI };
  // console.log(item, 'lowerdata')
  const componentMounted = useRef(true);

  const [isNavigationTransitionFinished, setIsNavigationTransitionFinished] =
    React.useState(false);
  const [bidData, setBidData] = useState<HighestOfferI>({} as HighestOfferI);
  const [lowestBidData, setLowestBidData] = useState<LowestBidResponseI>(
    {} as LowestBidResponseI
  );
  const [loader, setLoader] = useState<boolean>(false);

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
    async function priceGuide() {
      setLoader(true);
      const userId =
        store.getState().registerUser?.registerUserData?.userInfo?.userId;
      const obj = {
        userId,
        propertyId: item?.params?.propertyId,
      };
      const [priceGuideResponse, lowestbidResponse] =
        await axios.all<AxiosResponse>([
          MRegisterUserApiService.priceGuideApi(
            Number(userId),
            Number(item?.params?.propertyId)
          ),
          MRegisterUserApiService.lowestBidOffer(obj),
        ]);

      if (priceGuideResponse && lowestbidResponse) {
        setLoader(false);
        setPriceDetails(priceGuideResponse.data?.data);
        setLowestBidData(lowestbidResponse?.data?.data);
        // setLoader(false);
      } else {
        // setLoader(false);
      }
    }
    priceGuide();
  }, []);
  useEffect(() => {
    EventEmitter.on(
      Events.ReceivedMessage,
      (message: MainResponse<LowerBidMessageI>) => {
        const parseMessage: LowerBidMessageI = JSON.parse(message as never);
        console.log(
          parseMessage,
          componentMounted.current,
          item.params.propertyId,
          Number(parseMessage?.propertyId),
          "......"
        );
        if (
          componentMounted.current &&
          item.params.propertyId == Number(parseMessage?.propertyId) &&
          parseMessage.bidType == "seller"
        ) {
          if (parseMessage && _.size(parseMessage) > 0) {
            setLowestBidData((prev) => ({
              ...prev,
              minimumSmallerUnitOfferPrice:
                parseMessage.minimumSmallerUnitOfferPrice,
              message: parseMessage.message,
              totalSmallerUnits: parseMessage.totalSmallerUnits,
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
      <HomeHeader
        label={""}
        icon={undefined}
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Buy Sqft"}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          marginTop: wp(5),
        }}
      >
        <LowOffer
          propertyDetails={item.params}
          priceDetails={priceDetails}
          lowestBidData={lowestBidData}
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
          type="Buyer"
          priceDetails={priceDetails}
          {...props}
          bidData={bidData.data}
          lowestBidData={lowestBidData}
        />
      </View>
      <Loader visible={loader} />
    </Container>
  );
};

export default LowerOffer;

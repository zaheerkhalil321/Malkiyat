import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  ParamListBase,
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import AnimatedNumbers from "react-native-animated-numbers";
import axios from "axios";
import _ from "lodash";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import SellIcon from "@src/assets/images/sell_icon.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import Arrow from "@src/assets/images/left_arrow.svg";
import Content from "@src/components/common/Content";
import {
  EventMessageI,
  HighestOfferDataI,
  HighestOfferI,
  MainResponse,
  PropertyI,
} from "@src/services/model";
import {
  calculateProfilt,
  calculateTotalPurchasePriceOnly,
  CHECK_DEBUGGER_STATE,
  valueConverstion,
} from "@src/utils/helperFunction";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux";
import EventEmitter from "@src/events/EventEmitter";
import { Events } from "@src/events/Events";
import UpArrow from "@src/assets/images/up_arrow.svg";
import DownArrow from "@src/assets/images/down_arrow.svg";
import CalculationModal from "@src/components/AdvertiseModal/CalculationModal";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const Sell = (props: Props) => {
  const item = props.route!.params! as {
    params: { bidData: HighestOfferDataI; propertyDetails: PropertyI };
  };

  const ref = useRef<HighestOfferDataI>({} as HighestOfferDataI);

  const {
    params: { bidData, propertyDetails },
  } = item;

  ref.current = bidData;

  var PERSIST_UNITS = String(
    bidData?.ownedSmallerUnits! < bidData?.totalForSaleSmallerUnits!
      ? bidData.ownedSmallerUnits
      : bidData?.totalForSaleSmallerUnits
  );
  const [bidDataState, setBidDataState] = useState<HighestOfferDataI>(bidData);

  const [newSqfts, setNewSqfts] = useState<string>(PERSIST_UNITS);
  const [cal, setCal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [modalObj, setModalObj] = useState<{
    modalVisible: boolean;
    unitsToSearch: string;
    text: ReactNode;
  }>({
    modalVisible: false,
    unitsToSearch: "",
    text: undefined,
  });
  useEffect(() => {
    EventEmitter.on(
      Events.ReceivedMessage,
      (message: MainResponse<EventMessageI>) => {
        const parseMessage: EventMessageI = JSON.parse(message as never);

        if (
          bidData?.propertyId == Number(parseMessage?.propertyId) &&
          !_.isUndefined(parseMessage?.totalForSaleSmallerUnits) &&
          !_.isUndefined(parseMessage?.highestOfferAmount)
        ) {
          if (!_.isEmpty(parseMessage) && _.size(parseMessage) > 0) {
            const updateRef = ref.current;

            updateRef.ownedSmallerUnits = Number(PERSIST_UNITS);
            // console.log(updateRef, PERSIST_UNITS);

            const { profit, totalPurchasePrice } = calculateProfilt(
              parseMessage,
              updateRef,
              false
            );
            setBidDataState((prev: HighestOfferDataI) => ({
              ...prev,
              perSmallerUnitOfferPrice:
                parseMessage?.highestOfferAmount! ?? bidDataState.highestOffer,
              totalForSaleSmallerUnits:
                parseMessage?.totalForSaleSmallerUnits ??
                prev?.totalForSaleSmallerUnits,
              message: parseMessage?.message ?? prev.message,
              totalProfit: profit,
              profit: profit,
              totalPurchasePrice: totalPurchasePrice,
              totalOfferPrice:
                parseMessage?.highestOfferAmount! * Number(PERSIST_UNITS!),
            }));
          }
        } else {
          console.warn("property id is not same!");
        }
      }
    );

    return () => {
      EventEmitter.off(Events.ReceivedMessage, () => {});
    };
  }, []);
  useEffect(() => {
    var cancelToken;

    async function handleSerch() {
      if (Number(newSqfts) > 0) {
        if (typeof cancelToken != typeof undefined) {
          cancelToken.cancel("Operation canceled due to new request.");
        } else {
          setLoader(true);
          cancelToken = axios.CancelToken.source();
          const res = await MRegisterUserApiService.highestOfferBid(
            store.getState().registerUser?.registerUserData?.userInfo?.userId,
            bidData.propertyId,
            newSqfts
          );
          if (res?.data?.code == 200) {
            const { totalProfit, bidOffers, highestOffer, totalOfferPrice } =
              res?.data?.data;
            const totalPurchasePrice = calculateTotalPurchasePriceOnly(
              bidDataState,
              Number(newSqfts)
            );
            setBidDataState((prev) => ({
              ...prev,
              profit: totalProfit,
              highestOffer: highestOffer,
              bidOffers: bidOffers,
              totalProfit: totalProfit,
              totalOfferPrice,
              totalPurchasePrice,
            }));
            setLoader(false);
          } else {
            !modalObj.modalVisible &&
              setModalObj({
                modalVisible: true,
                unitsToSearch: String(
                  res.data?.data?.totalAvailableUnits! ?? ""
                ),
                text: (
                  <>
                    <ResponsiveText
                      style={{
                        textAlign: "center",
                        fontSize: 4.5,
                        fontFamily: Fonts.ManropeSemiBold,
                        marginBottom: wp(2),
                      }}
                    >
                      Not enough, bids!
                    </ResponsiveText>
                    <ResponsiveText style={{ textAlign: "center" }}>
                      You are selling {newSqfts} sqfts but available bids are
                      only {res.data?.data?.totalAvailableUnits!}
                    </ResponsiveText>
                  </>
                ),
              });
            // Alert.alert(
            //   "Not enough, bids!",
            //   `You are selling ${newSqfts} sqfts but available bids are only ${res
            //     .data?.data?.totalAvailableUnits!}.`,
            //   [
            //     {
            //       text: "Ok",
            //       onPress: () =>
            //         setNewSqfts(String(res.data?.data?.totalAvailableUnits!)),
            //     },
            //   ]
            // );

            setLoader(false);
          }
        }
      }
    }
    handleSerch();
  }, [newSqfts]);

  const handleSqfts = async (sqfts) => {
    sqfts = sqfts.replace(/[^0-9]/g, "");

    if (Number(bidDataState?.ownedSmallerUnits) > 0) {
      if (Number(sqfts) <= Number(bidDataState?.ownedSmallerUnits)) {
        setNewSqfts(sqfts);
        PERSIST_UNITS = sqfts;
      } else {
        !modalObj.modalVisible &&
          setModalObj({
            modalVisible: true,
            unitsToSearch: String(PERSIST_UNITS),
            text: (
              <View>
                <ResponsiveText
                  style={{
                    textAlign: "center",
                    fontSize: 4.5,
                    fontFamily: Fonts.ManropeSemiBold,
                    marginBottom: wp(2),
                  }}
                >
                  Not enough units!
                </ResponsiveText>
                <ResponsiveText style={{ textAlign: "center" }}>
                  {`You own ${bidDataState?.ownedSmallerUnits} units but you are trying to sell ${sqfts}.`}
                </ResponsiveText>
              </View>
            ),
          });

        // Alert.alert(
        //   "Not enough units!",
        //   `You own ${bidDataState?.ownedSmallerUnits} units but you are trying to sell ${sqfts}`,
        //   [
        //     {
        //       text: "Ok",
        //       onPress: () => {
        //         setNewSqfts(String(1));
        //         // PERSIST_UNITS = sqfts;
        //       },
        //     },
        //   ]
        // );
      }
    } else {
      setNewSqfts(String(0));
      PERSIST_UNITS = "0";
    }
  };

  const handleClick = async () => {
    props.navigation.navigate("Review", {
      ...bidDataState,
      ...propertyDetails,
      newSqfts: newSqfts,
      type: "Seller",
    });
  };

  return (
    <Container>
      <HomeHeader
        label={""}
        icon={undefined}
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Sell my Sqft"}
      />
      <Content>
        <View style={{ alignItems: "center" }}>
          <SellIcon />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(4),
            marginTop: wp(10),
            marginBottom: wp(3),
          }}
        >
          <View>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                color: "#8A8A8E",
                fontSize: 3.73,
              }}
            >
              Highest offer
            </ResponsiveText>
            <ResponsiveText
              style={{
                color: "#8A8A8E",
                fontSize: 3.2,
                marginTop: wp(0.5),
              }}
            >
              {bidDataState?.message}
            </ResponsiveText>
          </View>

          <TouchableOpacity
            disabled={loader ? true : false}
            onPress={() => {
              props.navigation.navigate("SellDetails", {
                bidData: bidDataState,
                newSqfts: newSqfts,
              });
            }}
          >
            <ResponsiveText
              style={{
                color: "#3577DB",
                fontSize: 3.2,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Details
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              // marginTop: -wp(10),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 4,
                fontFamily: Fonts.ManropeSemiBold,
                color: "#8A8A8E",
                marginBottom: wp(1.5),
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 8.53,
                fontFamily: Fonts.ManropeSemiBold,
                color: "#2BACE3",
              }}
            >
              {CHECK_DEBUGGER_STATE() &&
                valueConverstion(bidDataState?.perSmallerUnitOfferPrice ?? 0)}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={Number(
                  bidDataState?.perSmallerUnitOfferPrice ?? 0
                )}
                fontStyle={{
                  fontSize: 32,
                  fontFamily: Fonts.ManropeBold,
                  color: "#2BACE3",
                }}
              />
            )}
            <ResponsiveText
              style={{
                fontSize: 4,
                fontFamily: Fonts.ManropeSemiBold,
                color: "#8A8A8E",
                marginBottom: wp(1.5),
              }}
            >
              {" "}
              per Sqft
            </ResponsiveText>
          </View>
        </View>
        <View
          style={{
            borderColor: "#3577DB",
            borderWidth: 2,
            paddingHorizontal: wp(4),
            marginHorizontal: wp(4),
            borderRadius: wp(1),
            // paddingVertical: wp(4),
            height: wp(14),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: wp(10),
            // backgroundColor: "red",
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 3.2,
              fontFamily: Fonts.ManropeBold,
              color: "#3577DB",
              position: "absolute",
              top: -10,
              left: 10,
              paddingHorizontal: 5,
              backgroundColor: "white",
            }}
          >
            I want to sell
          </ResponsiveText>
          <TextInput
            style={{ width: wp(70), height: wp(10) }}
            editable={bidData?.ownedSmallerUnits! > 0 ? true : false}
            onChangeText={handleSqfts}
            defaultValue={""}
            keyboardType="numeric"
            placeholder="Enter Sqft"
            value={newSqfts}
          />
          {loader ? (
            <ActivityIndicator size={"small"} color="black" />
          ) : (
            <ResponsiveText style={{ color: "#9E9E9E" }}>Sqft</ResponsiveText>
          )}
        </View>
        <View style={{ paddingHorizontal: wp(4) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setCal(!cal);
              }}
            >
              <ResponsiveText
                style={{
                  marginVertical: wp(3),
                  fontSize: 3.73,
                  fontFamily: Fonts.ManropeSemiBold,
                  marginRight: wp(2),
                }}
              >
                Profit: Rs. {valueConverstion(bidDataState?.totalProfit ?? 0)}
              </ResponsiveText>
            </TouchableOpacity>
            {cal ? (
              <TouchableOpacity
                onPress={() => {
                  setCal(!cal);
                }}
              >
                <UpArrow />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setCal(!cal);
                }}
              >
                <DownArrow />
              </TouchableOpacity>
            )}
          </View>

          {cal && (
            <View
              style={{
                borderColor: "#F3F3F3",
                borderWidth: 1,
                marginBottom: wp(2),
                borderRadius: 5,
              }}
            >
              <ResponsiveText
                style={{
                  marginVertical: wp(2),
                  textAlign: "center",
                }}
              >
                If i sell{" "}
                <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
                  {newSqfts}
                </ResponsiveText>{" "}
                Sqft
              </ResponsiveText>
              <View
                style={{
                  backgroundColor: "#F3F3F3",
                  height: 1,
                  // marginBottom: wp(2),
                }}
              />
              <View style={{ padding: wp(3) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ResponsiveText style={{ fontSize: 3.73 }}>
                    Purchase price:
                  </ResponsiveText>
                  <ResponsiveText style={{ fontSize: 3.73 }}>
                    <ResponsiveText style={{ color: "#9E9E9E", fontSize: 3.5 }}>
                      Rs.
                    </ResponsiveText>{" "}
                    {valueConverstion(Number(bidDataState?.totalPurchasePrice))}
                  </ResponsiveText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: wp(1.5),
                  }}
                >
                  <ResponsiveText style={{ fontSize: 3.73 }}>
                    Sale Price:
                  </ResponsiveText>
                  <ResponsiveText style={{ fontSize: 3.73 }}>
                    <ResponsiveText style={{ color: "#9E9E9E", fontSize: 3.5 }}>
                      Rs.
                    </ResponsiveText>{" "}
                    {valueConverstion(bidDataState?.totalOfferPrice ?? 0)}
                  </ResponsiveText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ResponsiveText style={{ fontSize: 3.73 }}>
                    Profit:
                  </ResponsiveText>
                  <ResponsiveText style={{ fontSize: 3.73 }}>
                    <ResponsiveText style={{ color: "#9E9E9E", fontSize: 3.5 }}>
                      Rs.
                    </ResponsiveText>{" "}
                    {valueConverstion(bidDataState?.totalProfit ?? 0)}
                  </ResponsiveText>
                </View>
              </View>
            </View>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ResponsiveText
              style={{
                fontSize: 3.73,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Total: Rs.{" "}
              {CHECK_DEBUGGER_STATE() &&
                valueConverstion(bidDataState?.totalOfferPrice ?? 0)}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={Number(bidDataState?.totalOfferPrice ?? 0)}
                fontStyle={{
                  fontSize: 14,
                  fontFamily: Fonts.ManropeBold,
                  color: "black",
                  paddingBottom: 1,
                }}
              />
            )}
          </View>
        </View>
      </Content>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={handleClick}
          disabled={
            _.isUndefined(bidData?.ownedSmallerUnits!)
              ? true
              : !Number(newSqfts)
              ? true
              : loader
              ? true
              : false
          }
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#2BACE3",
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
            {loader ? "Loading...." : "Continue"}
          </ResponsiveText>
          {!loader && <Arrow />}
        </TouchableOpacity>
      </View>
      <CalculationModal
        modalVisible={modalObj.modalVisible}
        setModalVisible={() =>
          setModalObj((prev) => ({
            ...prev,
            modalVisible: !modalObj.modalVisible,
          }))
        }
        text={modalObj.text}
        onPress={() => {
          setNewSqfts(modalObj.unitsToSearch);
          setModalObj((prev) => ({
            ...prev,
            modalVisible: !modalObj.modalVisible,
          }));
        }}
      />
    </Container>
  );
};

export default Sell;

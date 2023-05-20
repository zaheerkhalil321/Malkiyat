import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  InteractionManager,
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
  LowerBidMessageI,
  LowestBidResponseI,
  MainResponse,
  PropertyI,
} from "@src/services/model";
import {
  CHECK_DEBUGGER_STATE,
  sleep,
  valueConverstion,
  valueWithCommas,
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
const BuySqftCalculation = (props: Props) => {
  const item = props.route!.params! as {
    params: { lowestBidData: LowestBidResponseI; propertyDetails: PropertyI };
  };
  const {
    params: { lowestBidData, propertyDetails },
  } = item;
  const componentMounted = useRef(true);

  const [loader, setLoader] = useState<boolean>(false);
  const [newSqfts, setNewSqfts] = useState<string>("1");
  const [bidDataState, setBidDataState] = useState<LowestBidResponseI>(
    item.params.lowestBidData
  );
  const [continueBtn, setContinueBtn] = useState<boolean>(false);
  const [modalObj, setModalObj] = useState<{
    modalVisible: boolean;
    unitsToSearch: string;
    text: ReactNode;
  }>({
    modalVisible: false,
    unitsToSearch: "",
    text: undefined,
  });
  const handleSqfts = (args: string) => {
    args = args.replace(/[^0-9]/g, "");
    setNewSqfts(args);
  };

  const handleClick = async () => {
    props.navigation.navigate("Review", {
      ...bidDataState,
      ...propertyDetails,
      newSqfts: newSqfts,
      type: "Buyer",
    });
  };
  useEffect(() => {
    var cancelToken;

    async function handleSerch() {
      if (Number(newSqfts) > 0) {
        if (typeof cancelToken != typeof undefined) {
          cancelToken.cancel("Operation canceled due to new request.");
        } else {
          setLoader(true);
          cancelToken = axios.CancelToken.source();

          const obj = {
            userId:
              store.getState().registerUser?.registerUserData?.userInfo?.userId,
            propertyId: propertyDetails.propertyId,
            unitCount: newSqfts,
          };
          sleep(2000);

          const res = await MRegisterUserApiService.lowestBidOffer(obj);

          if (res?.data?.code == 200) {
            setLoader(false);
            if (
              res.data?.data?.userBalance < res?.data?.data?.totalPayableAmount
            ) {
              setBidDataState((prev) => ({
                ...prev,
                message: "",
                totalPayableAmount: 0,
              }));
              !modalObj.modalVisible &&
                setModalObj({
                  modalVisible: true,
                  unitsToSearch: String(""),
                  text: (
                    <View>
                      <ResponsiveText
                        style={{
                          textAlign: "center",
                          fontSize: 4,
                          fontFamily: Fonts.ManropeBold,
                          marginBottom: wp(2),
                        }}
                      >
                        Insufficient Balance!
                      </ResponsiveText>
                      <ResponsiveText style={{ textAlign: "center" }}>
                        {res?.data?.data?.message}
                      </ResponsiveText>
                    </View>
                  ),
                });
              // Alert.alert("Not enough funds!", `${res?.data?.data?.message}`, [
              //   {
              //     text: "Ok",
              //     onPress: () => {
              //       !continueBtn && setContinueBtn(true);
              //     },
              //   },
              // ]);
            } else if (
              Number(res.data?.data?.totalAvailableUnits) < Number(newSqfts)
            ) {
              setBidDataState((prev) => ({
                ...prev,
                message: "",
                totalPayableAmount: 0,
              }));
              !modalObj.modalVisible &&
                setModalObj({
                  modalVisible: true,
                  unitsToSearch: String(""),
                  text: (
                    <View>
                      <ResponsiveText style={{ textAlign: "center" }}>
                        {res?.data?.data?.message}
                      </ResponsiveText>
                    </View>
                  ),
                });
              // Alert.alert("", `${res?.data?.data?.message}`, [
              //   {
              //     text: "Okdede",
              //     onPress: () => {
              //       setNewSqfts(String(""));
              //     },
              //   },
              // ]);
              continueBtn && setContinueBtn(false);
              setBidDataState((prev) => ({
                ...prev,
                message: prev.message,
                totalPayableAmount: 0,
              }));
            } else {
              continueBtn && setContinueBtn(false);
              setBidDataState(res?.data?.data);
            }
          } else {
            setLoader(false);
          }
        }
      }
    }
    handleSerch();
  }, [newSqfts]);
  useEffect(() => {
    EventEmitter.on(
      Events.ReceivedMessage,
      (message: MainResponse<LowerBidMessageI>) => {
        const parseMessage: LowerBidMessageI = JSON.parse(message as never);

        if (
          componentMounted.current &&
          item.params.propertyDetails.propertyId ==
            Number(parseMessage?.propertyId) &&
          parseMessage?.bidType == "seller"
        ) {
          if (parseMessage && _.size(parseMessage) > 0) {
            setBidDataState((prev) => ({
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
              Lowest offer
            </ResponsiveText>
            <ResponsiveText
              style={{
                color: "#8A8A8E",
                fontSize: 3.2,
                marginTop: wp(0.5),
              }}
            >
              {item.params.lowestBidData?.message ?? ""}
            </ResponsiveText>
          </View>

          <TouchableOpacity
            disabled={loader ? true : false}
            onPress={() => {
              props.navigation.navigate("BuyDetails", {
                bidData: bidDataState,
                newSqfts: newSqfts,
                property: propertyDetails,
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
                valueConverstion(
                  bidDataState?.minimumSmallerUnitOfferPrice ?? 0
                )}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={Number(
                  bidDataState?.minimumSmallerUnitOfferPrice ?? 0
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
            I want to buy
          </ResponsiveText>
          <TextInput
            style={{ width: wp(70), height: wp(10) }}
            onChangeText={handleSqfts}
            defaultValue={""}
            keyboardType="numeric"
            placeholder="Enter Sqft"
            value={valueWithCommas(newSqfts)}
          />
          {loader ? (
            <ActivityIndicator size={"small"} color="black" />
          ) : (
            <ResponsiveText style={{ color: "#9E9E9E" }}>Sqft</ResponsiveText>
          )}
        </View>
        <View style={{ paddingHorizontal: wp(4) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: wp(5),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.73,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Total: Rs.{" "}
              {CHECK_DEBUGGER_STATE() &&
                valueConverstion(bidDataState?.totalPayableAmount ?? 0)}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={bidDataState?.totalPayableAmount ?? 0}
                fontStyle={{
                  fontSize: 14,
                  fontFamily: Fonts.ManropeBold,
                  color: "black",
                  paddingBottom: 1,
                }}
              />
            )}
          </View>
          <ResponsiveText
            style={{
              color: "#8A8A8E",
              fontSize: 3.2,
              marginTop: wp(0.5),
            }}
          >
            {item.params?.lowestBidData?.message != bidDataState?.message
              ? bidDataState?.message
              : ""}
          </ResponsiveText>
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
            continueBtn
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
            backgroundColor: continueBtn
              ? "#dedede"
              : !Number(newSqfts)
              ? "#dedede"
              : loader
              ? "#dedede"
              : "#2BACE3",
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
          !continueBtn && setContinueBtn(true);
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

export default BuySqftCalculation;

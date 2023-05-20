import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  RouteProp,
  useTheme,
} from "@react-navigation/native";
import _ from "lodash";
import Snackbar from "react-native-snackbar";

import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import ReviewIcon from "@src/assets/images/review_ic.svg";
import Content from "@src/components/common/Content";
import Sell from "@src/assets/images/sell_i.svg";
import { errorModal } from "@src/redux/action-creators";
import { store } from "@src/redux";
import {
  HighestOfferDataI,
  LowestBidResponseI,
  MyAdsInterface,
  PropertyI,
  SellSqftsI,
  SubProperties,
} from "@src/services/model";
import { sleep, valueWithCommas } from "@src/utils/helperFunction";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
import { RootState } from "@src/redux/reducers";
import { useSelector } from "react-redux";
import SellCongrateModal from "./SellCongrateModal";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const Review = (props: Props) => {
  const item = props.route!.params! as PropertyI &
    SubProperties &
    MyAdsInterface &
    (HighestOfferDataI & LowestBidResponseI) & {
      newSqfts: number;
      type: "Seller" | "Buyer";
    };
  const [loader, setLoader] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleCongrate, setModalVisibleCongrate] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState();
  const registerUserReducer = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  var bidIdsArray: number[] = [];
  let count: number = 0;
  let i: number = 0;

  for (i = 0; i < item?.bidOffers?.length; i++) {
    count += item.bidOffers[i]?.smallerUnitCount!;
    if (count >= item.newSqfts) {
      bidIdsArray = [...bidIdsArray, item.bidOffers[i]?.bidOfferId];
      break;
    } else {
      bidIdsArray = [...bidIdsArray, item.bidOffers[i]?.bidOfferId];
    }
  }

  const { colors } = useTheme();
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const percentage =
    registerReducer.registerUserData.commissionPercentage / 100;
  const malkiyatFee =
    item.type == "Seller"
      ? percentage * item?.totalOfferPrice!
      : percentage * item?.totalPayableAmount;

  const totalAmount =
    item.type == "Buyer"
      ? Math.ceil(item.totalPayableAmount + malkiyatFee)
      : Math.ceil(item?.totalOfferPrice! - malkiyatFee ?? 0);

  const handleSellSqft = async (errors) => {
    if (
      item.type == "Buyer" &&
      Number(registerUserReducer.propertiesData?.data?.balance?.walletBalance) <
      totalAmount
    ) {
      // Alert.alert("Insufficient balance");
      store.dispatch(
        errorModal("Insufficient balance", true, "Error") as any
      );
    } else {
      const obj: SellSqftsI = {
        transactionFrom: Number(registerUserReducer.userInfo?.userId!),
        bidIds: bidIdsArray,
        propertyId: Number(item?.propertyId!),
        quantity: Number(item?.newSqfts),
        type: item.type == "Seller" ? "seller" : "buyer",
      };

      setLoader(true);
      const res = await MRegisterUserApiService.sellSqftsApi(obj);

      if (res?.data?.status == 200) {
        setLoader(false);
        Snackbar.show({
          text: String(res?.data?.message),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "green",
          textColor: "white",
          fontFamily: Fonts.ManropeBold,
        });
        await sleep(2000);
        setModalVisibleCongrate(true);

        // props.navigation.navigate("Congrate", {
        //   item: valueWithCommas(item?.totalOfferPrice ?? 0),
        //   buy: item.type == "Buyer" ? true : false,
        //   sqfts: Number(item.newSqfts),
        //   amount:
        //     item.type == "Buyer"
        //       ? valueWithCommas(
        //           Math.ceil(item.totalPayableAmount + malkiyatFee)
        //         )
        //       : valueWithCommas(
        //           Math.ceil(item?.totalOfferPrice! - malkiyatFee ?? 0)
        //         ),
        // });

        // props.navigation.navigate("MySqFt");
        // Alert.alert(res?.data?.message);
      } else {
        setLoader(false);
        // if (!loader) {
        //   setTimeout(() => {
        //     setModalData(
        //       errors.response?.data?.message ??
        //         "Something went wrong. Please try again later."
        //     );
        //     setModalVisible(true);
        //   }, 300);
        // }
      }
    }
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
        title={"Review your information"}
      />
      <Content>
        <View
          style={{
            alignItems: "center",
            marginTop: wp(10),
            marginBottom: wp(5),
          }}
        >
          <ReviewIcon />
        </View>

        <View
          style={{
            marginTop: wp(5),
            marginBottom: wp(3),
            marginHorizontal: wp(6),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(4),
            }}
          >
            <ResponsiveText style={{ fontSize: 3.73 }}>Project:</ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold }}
            >
              {item.propertyName}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              marginBottom: wp(4),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.73,
              }}
            >
              Property:
            </ResponsiveText>
            <ResponsiveText
              numberOfLines={3}
              style={{
                fontSize: 3.73,
                fontFamily: Fonts.ManropeSemiBold,
                flexWrap: "wrap",
                width: wp(55),
                marginLeft: "auto",
                textAlign: "right",
                // backgroundColor: 'red'
              }}
            >
              {item?.propertyAddress ?? item.address}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(4),
            }}
          >
            <ResponsiveText style={{ fontSize: 3.73 }}>Type:</ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold }}
            >
              {/* {selectedProperty.propertyStatus} */}
              {item.propertyType ?? item?.propertyStatus}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              // marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: wp(4),
              // backgroundColor: "red"
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold }}
            >
              {item.type == "Buyer" ? "Buying:" : "Selling:"}
            </ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold }}
              >
                {valueWithCommas(Math.floor(Number(item?.newSqfts ?? 0)))}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                }}
              >
                {" "}
                Sqft
              </ResponsiveText>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginBottom: wp(4),
              // marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(4),
            }}
          >
            <ResponsiveText style={{ fontSize: 3.73 }}>Amount:</ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                }}
              >
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold }}
              >
                {item.type == "Buyer"
                  ? valueWithCommas(item?.totalPayableAmount)
                  : valueWithCommas(item?.totalOfferPrice ?? 0)}
              </ResponsiveText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(4),
            }}
          >
            <ResponsiveText style={{ fontSize: 3.73 }}>
              Malkiyat Charges{" "}
              {registerReducer?.registerUserData?.commissionPercentage + "%" ??
                ""}
              :
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                }}
              >
                Rs.{" "}
              </ResponsiveText>
              {valueWithCommas(Math.ceil(malkiyatFee))}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginBottom: wp(4),
              // marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{ fontSize: 3.73 }}>
              You will {item.type == "Seller" ? "receive" : "pay"}:
            </ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeSemiBold,
                    color: "#2BACE3",
                    fontSize: 3.73,
                    marginBottom: wp(1),
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeBold,
                    color: "#2BACE3",
                    fontSize: 6.4,
                  }}
                >
                  {item.type == "Buyer"
                    ? valueWithCommas(
                      Math.ceil(item.totalPayableAmount + malkiyatFee)
                    )
                    : valueWithCommas(
                      Math.ceil(item?.totalOfferPrice! - malkiyatFee ?? 0)
                    )}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </View>
      </Content>
      {/* <View
        style={{
          backgroundColor: "#D1ECF1",
          alignItems: "center",
          marginHorizontal: wp(6),
          borderRadius: wp(1),
          paddingVertical: wp(1.5),
          marginBottom: wp(4),
        }}
      >
        <ResponsiveText style={{ fontSize: 3.73 }}>
          {item.type == "Buyer"
            ? "You will receive Sqft instantly."
            : "You will receive amount instantly in your wallet."}
        </ResponsiveText>
      </View> */}
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={handleSellSqft}
          // onPress={handleSubmit}
          // disabled={loader ? true : false}
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {/* {!loader && <Arrow />} */}
          {/* <Sell /> */}
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginLeft: wp(3),
            }}
          >
            {/* {loader ? "Loading...." : "Continue"} */}
            {item.type == "Buyer" ? "Buy" : "Sell my"} Sqft
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <Loader visible={loader} />
      <SellCongrateModal
        {...props}
        item={valueWithCommas(item?.totalOfferPrice ?? 0)}
        buy={item.type == "Buyer" ? true : false}
        sqfts={Number(item.newSqfts)}
        amount={
          item.type == "Buyer"
            ? valueWithCommas(Math.ceil(item.totalPayableAmount + malkiyatFee))
            : valueWithCommas(
              Math.ceil(item?.totalOfferPrice! - malkiyatFee ?? 0)
            )
        }
        modalVisible={modalVisibleCongrate}
        setModalVisible={setModalVisibleCongrate}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          activeOpacity={1}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Image
              style={{ resizeMode: "contain", width: wp(25), height: wp(25) }}
              source={require("@src/assets/images/market_modal.png")}
            />
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: wp(5),
                paddingVertical: wp(5),
              }}
            >
              <ResponsiveText>{modalData}</ResponsiveText>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#2BACE3",
                width: wp(25),
                height: wp(9.2),
                borderRadius: wp(2),
                justifyContent: "center",
                alignItems: "center",
                marginTop: wp(1),
              }}
              onPress={() => {
                props.navigation.navigate("HomeDrawer");
              }}
            >
              <ResponsiveText
                style={{ color: "white", fontFamily: Fonts.ManropeBold }}
              >
                Ok
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    height: "40%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(10),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
});
export default Review;

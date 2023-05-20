import { View, TouchableOpacity, Alert } from "react-native";
import React, { ReactNode, useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useTheme,
} from "@react-navigation/native";
import _ from "lodash";

import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import ReviewIcon from "@src/assets/images/review_ic.svg";
import Content from "@src/components/common/Content";
import Sell from "@src/assets/images/sell_i.svg";
import Loader from "@src/components/ui/loader/Loader";
import { RootState } from "@src/redux/reducers";
import { useSelector } from "react-redux";
import { BuyBackPropertyListI, BuyBackResponseI } from "@src/services/model";
import { sleep, valueWithCommas } from "@src/utils/helperFunction";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import BuyBackCongratesModal from "./BuyBackCongratesModal";
import { ActivityIndicator } from "react-native-paper";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import { errorModal } from "@src/redux/action-creators";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
type modalI = BuyBackResponseI & { modalVisible: boolean } & {
  loading: boolean;
};
const MalkiyatReview = (props: Props) => {
  const registerUserReducer = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  const dispatch = useSafeDispatch();
  const { KycStatus } = registerUserReducer?.propertiesData?.data ?? {};
  const { colors } = useTheme();
  const { modalObj, item, list } = props.route.params as {
    modalObj: {
      modalVisible: boolean;
      unitsToSearch: string;
      text: ReactNode;
      totalPrice: number;
    };
    item: BuyBackPropertyListI;
    list: { subPropertyId: number; purchasedPrice: number }[];
  };
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const [buyBackModal, setBuyBackModal] = useState<modalI>({} as modalI);

  const malkiyatFee =
    (registerReducer?.registerUserData?.commissionPercentage / 100) *
      modalObj?.totalPrice ?? 0;

  const handleSubmit = async () => {
    if (KycStatus == "3" || KycStatus == "0" || KycStatus == "2") {
      return dispatch(errorModal("Proof of Identity is pending!", true, "KYC"));
    }
    setBuyBackModal((prev) => ({ ...prev, loading: true }));

    const obj = {
      userId: registerReducer?.registerUserData?.userInfo?.userId,
      plotIds: list
        .slice(0, Number(modalObj.unitsToSearch))
        .map((item) => item.subPropertyId),
      propertyId: item.propertyId,
    };

    const res = await MRegisterUserApiService.buyBackApi(obj);

    if (res.data.status == 200) {
      setBuyBackModal((prev) => ({ ...prev, loading: false }));

      await sleep(300);
      setBuyBackModal((prev) => ({
        ...prev,
        ...res.data.data,
        modalVisible: true,
      }));
    } else {
      Alert.alert(res.data?.message ?? "something went wrong!");
      setBuyBackModal((prev) => ({ ...prev, loading: false }));
    }
  };
  const handleCloseModal = async () => {
    setBuyBackModal((prev) => ({ ...prev, modalVisible: false }));
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
            paddingHorizontal: wp(3),
            paddingVertical: wp(3),
            marginTop: wp(4),
            marginBottom: wp(3),
            // marginVertical: wp(8),
            // height: wp(44),
            marginHorizontal: wp(4),
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
            <ResponsiveText style={{ fontSize: 3.5 }}>Project:</ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {item?.propertyName}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(4),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.5,
              }}
            >
              Property:{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.5,
                fontFamily: Fonts.ManropeSemiBold,
                width: wp(50),
                textAlign: "right",
              }}
            >
              {item?.address}
            </ResponsiveText>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{ fontSize: 3.5 }}>Type:</ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {item.}
            </ResponsiveText>
          </View> */}
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginTop: wp(4),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: wp(4),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Selling to Malkiyat
            </ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
              >
                {valueWithCommas(modalObj.unitsToSearch)}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: 3.5,
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
              marginBottom: wp(5),
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
            <ResponsiveText style={{ fontSize: 3.5 }}>Amount:</ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                }}
              >
                Rs{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
              >
                {valueWithCommas(modalObj.totalPrice)}
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
            <ResponsiveText style={{ fontSize: 3.5 }}>
              Malkiyat Charges{" "}
              {registerReducer?.registerUserData?.commissionPercentage + "%" ??
                ""}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              ></ResponsiveText>
              {valueWithCommas(Math.ceil(malkiyatFee))}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginBottom: wp(4),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{ fontSize: 3.5 }}>
              You will receive:
            </ResponsiveText>
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
                {valueWithCommas(
                  Math.ceil(modalObj.totalPrice - malkiyatFee ?? 0)
                )}
              </ResponsiveText>
            </View>
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
          onPress={handleSubmit}
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
              marginLeft: wp(3),
            }}
          >
            Sell my Sqft
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <Loader visible={buyBackModal.loading} />
      <BuyBackCongratesModal
        modalVisible={buyBackModal.modalVisible}
        totalPrice={Math.ceil(modalObj.totalPrice - malkiyatFee ?? 0)}
        setModalVisible={handleCloseModal}
        data={buyBackModal}
        {...props}
      />
    </Container>
  );
};

export default MalkiyatReview;

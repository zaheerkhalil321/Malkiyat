import { View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
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
import ReviewIcon from "@src/assets/images/Ads_ic.svg";
import Content from "@src/components/common/Content";
import { valueWithCommas } from "@src/utils/helperFunction";
import { store } from "@src/redux";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
import MyAdsModal from "@src/components/common/MyAdsModal";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import moment from "moment";

const MyAdsReview = (props) => {
  console.log("🚀 ~ file: MyAdsReview.tsx:26 ~ MyAdsReview ~ props", props);

  const { item } = props.route.params;
  const dispatch = useSafeDispatch();

  const [loader, setLoader] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { colors } = useTheme();
  const handleClick = async () => {
    // Alert.alert('hhhh')
    setLoader(true);
    const res = await MRegisterUserApiService.cancelAdApi(item.bidId);

    if (res.data?.code == 200) {
      dispatch(
        MRegisterUserApiService.myAdsApi(
          Number(
            store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
          )
        )
      );
      setModalVisible(false);
      setLoader(false);
      props.navigation.navigate("MyAdsCongrate");
    } else {
      setLoader(false);
      setModalVisible(false);
      Alert.alert("Ad not cancel try again");
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
        title={"Malkiyat"}
      />
      <Content>
        <View
          style={{
            alignItems: "center",
            marginTop: wp(10),
            marginBottom: wp(1),
          }}
        >
          <ReviewIcon />
        </View>
        <ResponsiveText
          style={{
            textAlign: "center",
            fontFamily: Fonts.ManropeBold,
            fontSize: 5,
          }}
        >
          Ad-Details
        </ResponsiveText>
        <View
          style={{
            // borderColor: colors.Primary,
            // borderWidth: 0.8,
            borderRadius: wp(2),
            paddingHorizontal: wp(4),
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
              marginVertical: wp(2),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Project:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {item?.propertyName}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: wp(2),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.5,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Property:{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.5,
                fontFamily: Fonts.ManropeSemiBold,
                width: wp(50),
                marginLeft: "auto",
                textAlign: "right",
              }}
            >
              {item?.address}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Type:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {item?.propertyType}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: wp(1),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Sqft to {item.bidType == "buyer" ? "buy" : "sell"}:
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              {valueWithCommas(Math.floor(Number(item.smallerUnits ?? 0)))}
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
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginVertical: wp(2),
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Demand Price:
            </ResponsiveText>
            <View>
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                  textAlign: "right",
                }}
              >
                Rs.{" "}
                <ResponsiveText
                  style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
                >
                  {valueWithCommas(item.offerPrice)}
                </ResponsiveText>
                {"\n"}per Sqft
              </ResponsiveText>
              {/* <ResponsiveText
                style={{
                  textAlign: "right",
                  color: "#3577DB",
                  fontFamily: Fonts.ManropeBold,
                  marginTop: wp(1),
                }}
              >
                Rs. {valueWithCommas(obj.amount * obj.smallerUnitCount)}
              </ResponsiveText> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(2),
            }}
          >
            <ResponsiveText
              style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
            >
              Total:
            </ResponsiveText>
            <View>
              <ResponsiveText
                style={{
                  fontSize: 3,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                  textAlign: "right",
                }}
              >
                Rs.{" "}
                <ResponsiveText
                  style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
                >
                  {valueWithCommas(item.offerPrice * item.smallerUnits)}
                </ResponsiveText>
              </ResponsiveText>
            </View>
          </View>
          {item?.cancelDateTime ? (
            <>
              <View
                style={{
                  backgroundColor: colors.BorderColor,
                  height: 1,
                  marginVertical: wp(2),
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: wp(2),
                }}
              >
                <ResponsiveText
                  style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
                >
                  Expiry Date:
                </ResponsiveText>
                <View>
                  <ResponsiveText
                    style={{
                      fontSize: 3,
                      fontFamily: Fonts.ManropeSemiBold,
                      color: "#9E9E9E",
                      textAlign: "right",
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      {moment(item.cancelDateTime).format(
                        "D MMM, YYYY  h:mm a"
                      )}
                      {}
                    </ResponsiveText>
                  </ResponsiveText>
                </View>
              </View>
            </>
          ) : null}
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
              marginVertical: wp(2),
            }}
          />
        </View>
      </Content>

      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          // onPress={handleSubmit}
          // disabled={loader ? true : false}
          style={{
            borderWidth: 1,
            borderColor: "#2BACE3",
            height: wp(14.93),
            borderRadius: wp(10),
            width: wp(42.13),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {!loader && <Arrow />} */}

          <ResponsiveText
            style={{
              color: "#2BACE3",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              textAlign: "center",
            }}
          >
            {/* {loader ? "Loading...." : "Continue"} */}
            Back
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleClick}
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            borderWidth: 1,
            borderColor: "#2BACE3",
            height: wp(14.93),
            borderRadius: wp(10),
            width: wp(42.13),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {!loader && <Arrow />} */}

          <ResponsiveText
            style={{
              color: "#2BACE3",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              textAlign: "center",
            }}
          >
            {/* {loader ? "Loading...." : "Continue"} */}
            Cancel Ad
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <Loader visible={loader} />
      <MyAdsModal
        handleClick={handleClick}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
};

export default MyAdsReview;

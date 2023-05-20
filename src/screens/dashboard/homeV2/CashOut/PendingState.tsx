import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ProgressCircle from "react-native-progress-circle";
import { store } from "@src/redux";
import Container from "@src/components/common/Container";
import { wp } from "@src/components/common/Responsive";
import Arrow from "@src/assets/images/arrow_left.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Icon from "@src/assets/images/topupIcon.svg";
import PendingModal from "@src/screens/dashboard/homeV2/Wallet/PendingModal";
import { TransactionInProcessingI } from "@src/services/model";
import {
  calculateTimeStamp,
  circleProgressHours,
} from "@src/utils/helperFunction";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import moment from "moment";
import { Modalize } from "react-native-modalize";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const PendingState = (props: Props) => {
  const pendingModalRef = useRef<Modalize>();
  const { transationState } = props.route?.params as {
    transationState: TransactionInProcessingI[];
  };
  const [modalData, setModalData] = useState<TransactionInProcessingI>(
    {} as TransactionInProcessingI
  );
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: wp(5),
          marginLeft: wp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          activeOpacity={0.8}
          style={{
            width: wp(15),
            marginRight: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
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
        <ResponsiveText
          style={{
            fontSize: 5,
            fontFamily: Fonts.ManropeBold,
          }}
        >
          In Process
        </ResponsiveText>
      </View>
      {/* <ResponsiveText style={{ marginHorizontal: wp(5), marginBottom: wp(5) }}>
        Today
      </ResponsiveText> */}
      <ScrollView>
        {_.size(transationState) > 0
          ? transationState.map((item) => {
              return (
                <Pressable
                  key={item.refNo}
                  onPress={() => {
                    setModalData({ ...item });
                    pendingModalRef?.current?.open();
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: wp(3),
                    paddingHorizontal: wp(3),
                    paddingVertical: wp(3),
                    marginHorizontal: wp(5),
                    borderRadius: wp(3),
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.iconUrl }}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                    <View style={{ marginLeft: wp(3) }}>
                      <ResponsiveText
                        style={{
                          fontSize: 4.27,
                          fontFamily: Fonts.ManropeBold,
                          marginBottom: wp(1),
                          color: "#3577DB",
                        }}
                      >
                        {item.paymentType}
                      </ResponsiveText>
                      <ResponsiveText
                        style={{
                          fontSize: 3.2,
                          color: "#757575",
                          fontFamily: Fonts.ManropeBold,
                        }}
                      >
                        {moment(item.expiryDate).format("DD-MM-YYYY")}
                      </ResponsiveText>
                      <ResponsiveText
                        style={{
                          fontSize: 3.2,
                          color: "#757575",
                          fontFamily: Fonts.ManropeBold,
                        }}
                      >
                        {item?.paymentName}
                      </ResponsiveText>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ProgressCircle
                      outerCircleStyle={{}}
                      containerStyle={{}}
                      percent={circleProgressHours(
                        item.createdDate,
                        item.expiryDate
                      )}
                      radius={wp(5.5)}
                      borderWidth={5.5}
                      color={handelColor(
                        circleProgressHours(item.createdDate, item.expiryDate)
                      )}
                      shadowColor="#ECECEC"
                      bgColor="white"
                    ></ProgressCircle>
                    <View style={{ marginLeft: wp(3), marginRight: wp(4) }}>
                      <ResponsiveText
                        style={{
                          fontSize: 3.73,
                          color: handelColor(
                            circleProgressHours(
                              item.createdDate,
                              item.expiryDate
                            )
                          ),
                          fontFamily: Fonts.ManropeBold,
                        }}
                      >
                        {moment(item?.expiryDate).diff(moment(), "minutes") > 0
                          ? calculateTimeStamp(
                              Date.now() ?? undefined,
                              moment(item?.expiryDate, "YYYY-MM-DD HH:mm:ss")
                            )
                          : "0 mins"}
                      </ResponsiveText>
                      <ResponsiveText
                        style={{ fontSize: 2.67, color: "#BCBCBC" }}
                      >
                        Remaining
                      </ResponsiveText>
                    </View>
                  </View>
                </Pressable>
              );
            })
          : null}
      </ScrollView>
      <PendingModal modalData={modalData} ref={pendingModalRef} />
    </Container>
  );
};
export function handelColor(value: number): string | undefined {
  return value >= 80
    ? "#2BACE3"
    : value < 80 && value > 50
    ? "#28E8F8"
    : value < 50 && value > 15
    ? "#FAAD39"
    : "#DB1A00";
}
export default PendingState;

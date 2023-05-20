import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import WalletIcon from "@src/assets/images/blueWallet.svg";
import DollarIcon from "@src/assets/images/sqq.svg";
import Fonts from "@src/theme/fonts";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux/store";
import Loader from "@src/components/ui/loader/Loader";
import {
  calculateTimeStamp,
  findFontSize,
  valueConverstion,
  valueWithCommas,
} from "@src/utils/helperFunction";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import {
  transactionCategory,
  userTransactions,
  userTransactionsDetailsI,
} from "@src/services/model";
import HistoryModal from "@src/components/RegisterHomeV2/HistoryModal";

import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import HistoryDataSet, {
  TransactionType,
} from "@src/helpers/constants/HistoryDataSet";
import FastImage from "react-native-fast-image";
import moment from "moment";

type Tabs = "All" | "Wallet" | "Sq";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

const TransactionHistory = (props: Props) => {
  const [tab, setTab] = useState<Tabs>(
    props.navigation.getState().routes?.length > 0 &&
      props.navigation.getState().routes[1].name == "Wallet"
      ? "Wallet"
      : "All"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<userTransactions>(
    {} as userTransactions
  );
  const dispatch = useSafeDispatch();
  const { UserTransactionHistory, filteredTransactions } = useSelector(
    (state: RootState) => state.registerUser
  );
  const userInfo = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  const [historyDetailsById, setHistoryDetailsById] = useState<{
    item: userTransactions;
  }>({ item: {} as userTransactions });
  const { All, filterSQFT, filteredWallet } = filteredTransactions;
  const [historyDetailsData, setHistoryDetailsData] = useState<
    userTransactionsDetailsI[]
  >([]);
  const [amount, setAmount] = useState<string>("");
  const selectedTab: { [key: string]: userTransactions[] } = {
    All: All,
    Sq: filterSQFT,
    Wallet: filteredWallet,
  };

  useEffect(() => {
    fetchDetails();
    return () => {
      fetchDetails();
    };
  }, []);

  useEffect(() => {
    // console.log(historyDetailsById?.item.refNo, 'hhhhhh')
    if (historyDetailsById?.item?.refNo) {
      (async () => {
        const res =
          await MRegisterUserApiService.getTransactionDetailByReferenceId(
            historyDetailsById.item.refNo,
            historyDetailsById.item.category
          );
        console.log("🚀 ~ file: TransactionHistory.tsx:99 ~ res", res);

        if (res.data.status == 200) {
          setHistoryDetailsData(res.data.data.userTransactions);
        }
      })();
    }
  }, [historyDetailsById?.item?.refNo]);
  async function fetchDetails() {
    if (_.size(UserTransactionHistory?.userTransactions) == 0) {
      setLoading(true);
    }

    const response: any = await dispatch(
      MRegisterUserApiService.useTransactionHistoryList(
        Number(
          store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
        )
      )
    );

    if (
      response ||
      (!response && loading) ||
      (!loading && _.size(UserTransactionHistory?.userTransactions) == 0)
    ) {
      setLoading(false);
    }
  }
  const renderItem = (item: userTransactions, index: number) => {
    if (
      String(item.category).toLocaleLowerCase() !=
      String("Withdraw for Ad").toLocaleLowerCase()
    ) {
      return (
        <View key={index}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setAmount(valueWithCommas(item?.amount));
              setHistoryDetailsById({
                item: item,
                // refNo: String(item.refNo),
                // transCategory: item.category,
              });
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: wp(4),
              paddingTop: wp(4),
              paddingBottom: wp(3),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage
                source={{
                  uri:
                    item.category == "bought"
                      ? userInfo.appSettings?.boughtUrl
                      : item.category == "sold"
                      ? userInfo?.appSettings?.soldUrl
                      : item.iconUrl,
                }}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <View style={{ marginLeft: wp(2) }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.73,
                    marginBottom: wp(1),
                    color: "black",
                  }}
                >
                  {TransactionType(item)}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    color: "#757575",
                  }}
                >
                  {item.paymentName}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    color: "#757575",
                  }}
                >
                  {moment(item.transDateTime).format("D MMM, YYYY")}
                </ResponsiveText>
              </View>
            </View>
            <View>
              <ResponsiveText
                style={{
                  fontSize: 3.2,
                  alignSelf: "flex-end",
                  marginBottom: wp(1),
                }}
              >
                {moment(item.transDateTime).format("h:mm a")}
              </ResponsiveText>
              <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    alignSelf: "flex-end",
                    marginBottom: wp(0.5),
                    color:
                      item.category == "cashout" || item.category == "bought"
                        ? "grey"
                        : "#4CAF50",
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: findFontSize(
                      UserTransactionHistory?.walletBalance?.walletBalance!,
                      4.8
                    ),
                    fontFamily: Fonts.ManropeBold,
                    color:
                      item.category == "cashout" || item.category == "bought"
                        ? "grey"
                        : "#4CAF50",
                  }}
                >
                  {valueWithCommas(item?.amount)}
                </ResponsiveText>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Transaction History"}
      />
      <Loader visible={loading} />
      <View style={styles.walletContainer}>
        <View style={{ flex: 1 }}>
          <WalletIcon />
          <ResponsiveText
            style={{ fontSize: 4.27, marginTop: wp(2), marginBottom: wp(1) }}
          >
            My wallet has
          </ResponsiveText>
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              style={{
                fontSize: 4,
                alignSelf: "flex-end",
                marginBottom: wp(0.5),
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: findFontSize(
                  UserTransactionHistory?.walletBalance?.walletBalance!,
                  5
                ),
                fontFamily: Fonts.ManropeBold,
              }}
            >
              {valueWithCommas(
                Number(
                  UserTransactionHistory?.walletBalance?.walletBalance ?? 0
                ) ?? 0
              )}
            </ResponsiveText>
          </View>
        </View>
        <View
          style={{ flex: 1, backgroundColor: "white", alignItems: "flex-end" }}
        >
          <View style={{ marginRight: wp(10) }}>
            <DollarIcon width={wp(11.2)} height={wp(13.87)} />
          </View>

          <ResponsiveText
            style={{ fontSize: 4.27, marginTop: wp(2), marginBottom: wp(1) }}
          >
            I own{" "}
            {valueConverstion(
              userInfo?.propertiesData?.data?.ownedSmallerUnits
            )}{" "}
            Sqft
          </ResponsiveText>
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              style={{
                fontSize: 4,
                alignSelf: "flex-end",
                marginBottom: wp(0.5),
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 5, fontFamily: Fonts.ManropeBold }}
            >
              {valueConverstion(
                userInfo?.propertiesData?.data?.currentValue ?? 0
              )}
            </ResponsiveText>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#EEEEEF",
          flexDirection: "row",
          marginTop: wp(7),
          marginVertical: wp(4),
          marginHorizontal: wp(4),
          borderRadius: wp(10),
          justifyContent: "space-between",
          padding: wp(1),
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setTab("All");
          }}
          style={{
            backgroundColor: tab == "All" ? "#2BACE3" : "#EEEEEF",
            width: wp(30.13),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{ fontSize: 4.27, color: tab == "All" ? "white" : "black" }}
          >
            All
          </ResponsiveText>
        </TouchableOpacity>
        {tab == "Sq" && (
          <View style={{ backgroundColor: "#AEAEB1", width: 1, height: 20 }} />
        )}

        <TouchableOpacity
          onPress={() => {
            setTab("Wallet");
          }}
          style={{
            backgroundColor: tab == "Wallet" ? "#2BACE3" : "#EEEEEF",
            width: wp(30.13),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 4.27,
              color: tab == "Wallet" ? "white" : "black",
            }}
          >
            Wallet
          </ResponsiveText>
        </TouchableOpacity>
        {tab == "All" ? (
          <View style={{ backgroundColor: "#AEAEB1", width: 1, height: 20 }} />
        ) : (
          <View style={{ width: 1, height: 20 }} />
        )}

        <TouchableOpacity
          onPress={() => {
            setTab("Sq");
          }}
          style={{
            backgroundColor: tab == "Sq" ? "#2BACE3" : "#EEEEEF",
            width: wp(30.13),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{ fontSize: 4.27, color: tab == "Sq" ? "white" : "black" }}
          >
            Sqft
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={selectedTab[tab]}
        renderItem={({ item, index }) => {
          return (
            <>
              {renderItem(item, index)}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E5E5",
                  width: wp(100),
                }}
              />
            </>
          );
        }}
      />
      <HistoryModal
        amount={amount}
        modalData={historyDetailsData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        historyDetailsById={historyDetailsById}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  walletContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
    marginHorizontal: wp(5),
    borderRadius: wp(2),
    padding: wp(4),
    marginTop: wp(3),
    flexDirection: "row",
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
});

export default TransactionHistory;

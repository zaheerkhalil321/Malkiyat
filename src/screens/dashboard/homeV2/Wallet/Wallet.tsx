import {
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import _ from "lodash";
import * as Progress from "react-native-progress";
import moment from "moment";
import { Modalize } from "react-native-modalize";
import { useSelector } from "react-redux";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
import Arrow from "@src/assets/images/arrow_left.svg";
import { findFontSize, valueWithCommas } from "@src/utils/helperFunction";
import WalletIcon2 from "@src/assets/images/blueWallet.svg";
import PlusIcon from "@src/assets/images/plusIcon.svg";
import CashOutIcon from "@src/assets/images/cashOut.svg";
import CashInModal from "./CashInModal";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import {
  PaymentMethods,
  BankListI,
  TransactionInProcessingI,
} from "@src/services/model";
import { setCachePaymentMethods } from "@src/utils/cacheFunc";
import CashOutModal from "@src/screens/dashboard/homeV2/Wallet/CashOutModal";
import { RootState } from "@src/redux/reducers";
import WalletHistory from "./WalletHistory";
import axios from "axios";
import TransIcon from "@src/assets/images/bank_trans2.svg";
import BankIcon from "@src/assets/images/bank_trans.svg";
import RightArrow from "@src/assets/images/right_arrow.svg";
export interface BalanceInterface {
  totalBalance: string;
  onHoldBalance: string;
  availableBalance: string;
}
const Wallet = (props) => {
  const [data, setData] = useState<BalanceInterface>({} as BalanceInterface);
  const [loading, setLoading] = useState(false);
  const [allBanks, setAllBanks] = useState<
    { id: string; title: string; testID: string }[]
  >([]);
  const [transationState, setTransactionState] = useState<
    TransactionInProcessingI[]
  >([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const cashinRef = useRef<Modalize>();
  const cashoutRef = useRef<Modalize>();

  var BankTranfer: PaymentMethods[],
    CreditDebit: PaymentMethods[],
    Voucher: PaymentMethods[] = [];

  const useTransactionArray =
    registerReducer?.UserTransactionHistory?.userTransactions?.filter(
      (item) => item.category == "cashin" || item.category == "cashout"
    );
  const fullName = String(
    registerReducer.registerUserData?.userInfo?.firstName! +
      " " +
      registerReducer?.registerUserData?.userInfo?.lastName
  );
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      (async function () {
        const res = await MUnregisterUserApiService.getAllPaymentMethods();

        if (_.size(res.data) > 0) {
          [BankTranfer, CreditDebit, Voucher] = _.reduce(
            res.data,
            ([BankTranfer, CreditDebit, Voucher], item) => {
              if (item.paymentStatus == "banktransfer") {
                BankTranfer.push({ ...item } as never);
              } else if (item.paymentStatus == "creditdebit") {
                CreditDebit.push({ ...item } as never);
              } else if (item.paymentStatus == "voucher") {
                Voucher.push({ ...item } as never);
              }
              return [BankTranfer, CreditDebit, Voucher];
            },
            [[], [], []]
          );
          setCachePaymentMethods("banktransfer", BankTranfer);
          setCachePaymentMethods("creditdebit", CreditDebit);
          setCachePaymentMethods("voucher", Voucher);
        }

        setPaymentMethods(res.data);
      })();
    });
    return unsubscribe;
  }, []);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      (async () => {
        setLoading(true);
        const [balance, bankList, transationState] = await axios.all([
          MRegisterUserApiService.balance(
            Number(registerReducer?.registerUserData?.userInfo?.userId!)
          ),
          MRegisterUserApiService.getBankList(),
          MRegisterUserApiService.getCashoutTransactionsInProcess(
            registerReducer?.registerUserData?.userInfo?.userId!
          ),
        ]);

        setTransactionState(
          _.reverse(
            transationState?.data?.data.filter(
              (item) => item.status != "approved"
            )
          )
        );
        const Blist = bankList?.data?.data?.map((item) => ({
          id: item.id,
          title: item.bankName,
          testID: item.accTitle,
        }));
        setAllBanks(Blist);
        setData(balance?.data.data);
        setLoading(false);
      })();
    });
    return unsubscribe;
  }, [props.navigation]);

  function backAction(): boolean | null | undefined {
    if (props.route.name == "Wallet") {
      if (props.navigation.isFocused()) {
        props.navigation.navigate("HomeDrawer");
        return true;
      }
    } else {
      props.navigation.goBack();
      return false;
    }
  }

  function handleProgress(
    data: BalanceInterface | undefined
  ): number | undefined {
    if (Number(data?.totalBalance) > 0) {
      return Number(data?.availableBalance) / Number(data?.totalBalance);
    }
    return 0;
  }

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
          activeOpacity={0.8}
          style={{
            width: wp(15),
            marginRight: 5,
          }}
          onPress={() => backAction()}
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
          My Wallet
        </ResponsiveText>
      </View>

      <View style={{ marginHorizontal: wp(5) }}>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            // elevation: modalVisible ? 0 : 3,
            borderRadius: wp(4),
            paddingVertical: wp(4),
            paddingHorizontal: wp(4),
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <WalletIcon2 />
            <View style={{ marginLeft: wp(3) }}>
              <ResponsiveText style={{ fontSize: 3.2, color: "#ADADAD" }}>
                Total Balance
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: findFontSize(data?.totalBalance, 6.4),
                  fontFamily: Fonts.ManropeSemiBold,
                  marginTop: wp(1),
                }}
              >
                Rs. {valueWithCommas(data?.totalBalance ?? 0)}
              </ResponsiveText>
            </View>
          </View>
          <View style={{ marginVertical: wp(5) }}>
            <Progress.Bar
              borderRadius={100}
              color={"#2BACE3"}
              unfilledColor={"#C8C1C1"}
              borderWidth={0}
              animated
              progress={handleProgress(data)}
              width={wp(82.4)}
              height={wp(2.67)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // marginTop: wp(3)
            }}
          >
            <View>
              <ResponsiveText
                style={{ fontSize: 3.2, fontFamily: Fonts.ManropeSemiBold }}
              >
                Available
              </ResponsiveText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginTop: wp(2),
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: findFontSize(data?.availableBalance, 3.73),
                    marginBottom: wp(0.5),
                    color: "#9E9E9E",
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeBold,
                    color: "#2BACE3",
                    fontSize: findFontSize(data?.availableBalance, 5.33),
                  }}
                >
                  {valueWithCommas(data?.availableBalance ?? 0)}
                </ResponsiveText>
              </View>
            </View>
            <View>
              <ResponsiveText
                style={{ fontSize: 3.2, fontFamily: Fonts.ManropeSemiBold }}
              >
                Reserved for Ads
              </ResponsiveText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: wp(2),
                  alignItems: "flex-end",
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: findFontSize(data?.onHoldBalance, 3.73),
                    marginBottom: wp(0.5),
                    color: "#9E9E9E",
                  }}
                >
                  Rs.{" "}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeBold,
                    color: "#9E9E9E",
                    fontSize: findFontSize(data?.onHoldBalance, 5.33),
                  }}
                >
                  {valueWithCommas(data?.onHoldBalance ?? 0)}
                </ResponsiveText>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingTop: wp(5),
              // paddingVertical: wp(4),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                cashinRef?.current?.open();
              }}
              style={{
                width: wp(38.67),
                height: wp(10.4),
                borderRadius: wp(10),
                backgroundColor: "#2BACE3",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <PlusIcon />
              <ResponsiveText
                style={{
                  color: "white",
                  fontFamily: Fonts.ManropeSemiBold,
                  fontSize: 3.73,
                  marginLeft: 10,
                }}
              >
                Add Funds
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                cashoutRef.current?.open();
              }}
              style={{
                width: wp(38.67),
                height: wp(10.4),
                borderRadius: wp(10),
                borderColor: "#00B9F7",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CashOutIcon />
              <ResponsiveText
                style={{
                  color: "#00B9F7",
                  fontFamily: Fonts.ManropeSemiBold,
                  fontSize: 3.73,
                  marginLeft: 10,
                }}
              >
                Cash Out
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
        {_.size(transationState) > 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate("PendingState", {
                transationState,
              });
            }}
            style={{
              backgroundColor: "#FAAD39",
              height: wp(13),
              marginTop: -wp(3),
              borderBottomLeftRadius: wp(5),
              borderBottomRightRadius: wp(5),
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingTop: wp(2),
              paddingHorizontal: wp(4),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: wp(0) }}>
                <BankIcon />
              </View>

              {/* <TransIcon /> */}

              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  fontFamily: Fonts.ManropeSemiBold,
                  marginLeft: wp(4),
                }}
              >
                Transaction(s) In Process
              </ResponsiveText>
              <RightArrow
                width={17}
                height={17}
                style={{ marginLeft: wp(20) }}
              />
            </View>

            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PendingState", {
                  transationState,
                });
              }}
            >
              <ResponsiveText
                style={{ fontSize: 3.73, fontFamily: Fonts.ManropeSemiBold, textDecorationLine: 'underline' }}
              >
                view
              </ResponsiveText>
            </TouchableOpacity> */}
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp(8),
            marginBottom: wp(4),
          }}
        >
          <ResponsiveText
            style={{ fontSize: 6.4, fontFamily: Fonts.ManropeBold }}
          >
            Recent
          </ResponsiveText>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("TransactionHistory");
            }}
          >
            <ResponsiveText
              style={{
                textDecorationLine: "underline",
                textDecorationColor: "#7E7E7E",
                fontSize: 3.73,
                color: "#7E7E7E",
              }}
            >
              View All
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#E4E4E4", height: 1 }} />
        {/* <ResponsiveText
          style={{
            color: "#B4B4B4",
            fontSize: 4.27,
            fontFamily: Fonts.ManropeSemiBold,
            marginTop: wp(3),
            marginBottom: wp(5),
          }}
        >
          {Number(useTransactionArray?.length) > 0
            ? moment(useTransactionArray![0].transDateTime).format(
                "D MMM, YYYY  h:mm a"
              )
            : ""}
        </ResponsiveText> */}
        {useTransactionArray!
          ?.slice(
            0,
            Number(useTransactionArray?.length) >= 5
              ? 4
              : Number(useTransactionArray?.length)
          )
          .map((item) => (
            <WalletHistory key={item.refNo} item={item} />
          ))}
      </View>
      <CashInModal {...props} paymentMethods={paymentMethods} ref={cashinRef} />
      <CashOutModal
        {...props}
        paymentMethods={paymentMethods}
        bankList={allBanks}
        ref={cashoutRef}
        data={data}
        fullName={fullName}
      />
      {/* <Loader visible={loading} /> */}
    </Container>
  );
};

export default Wallet;

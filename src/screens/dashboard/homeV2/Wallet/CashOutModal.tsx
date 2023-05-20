import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  Button,
  Text,
  SafeAreaView,
  Modal,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Loader from "@src/components/ui/loader/Loader";
import { Modalize } from "react-native-modalize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import CrossIcon from "@src/assets/images/Cross_icon.svg";
import _ from "lodash";
// import Modal from "react-native-modal";
import {
  CashoutDataSetI,
  Payment_Channel,
  PercentageData,
} from "@src/helpers/constants/OnboardingData";
import { BalanceInterface } from "./Wallet";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { valueWithCommas } from "@src/utils/helperFunction";
import { store } from "@src/redux";
import ModalSelector from "react-native-modal-selector";
import { PaymentMethods } from "@src/services/model";
import DownArrow from "@src/assets/images/downCash.svg";
import { Dropdown } from "react-native-material-dropdown-v2";
import Content from "@src/components/common/Content";
interface BankInterface {
  id: string;
  title: string;
  testID: string;
}
export interface CashOutUserInfoI {
  easyPaisaSelected: boolean;
  bankSelected: boolean;
  chequeSelected: boolean;
  paymentMethodId: string;
  accountTitle: string;
  commonObj: {
    accountNo?: string;
    bankName?: string;
    mobileNo?: string;
    address?: string;
    accTitle?: string;
    bankId?: string;
  };
}

interface Props {
  data: BalanceInterface;
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  paymentMethods: PaymentMethods[];
  fullName: string;
  bankList: BankInterface[];
}
const COURIER_CHARGES = 240;

const CashOutModal = React.forwardRef((props: Props, ref: any) => {
  const { fullName, data, navigation, paymentMethods, route, bankList } = props;
  const [amountError, setAmountError] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [percent, setPercent] = useState<number | undefined>(undefined);
  const [showInput, setShowInput] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const dropdownController = useRef();
  const [suggestionsList, setSuggestionsList] = useState<BankInterface[]>(
    props.bankList
  );

  const [name, setName] = useState<string>(fullName ?? "");
  const [userInfoObj, setUserInfoObj] = useState<CashOutUserInfoI>({
    easyPaisaSelected: false,
    bankSelected: false,
    chequeSelected: false,
    paymentMethodId: "",
    accountTitle: String(fullName ?? ""),
    commonObj: {
      accountNo: "",
      bankName: "",
      mobileNo: "",
      address: "",
      bankId: "",
    },
  });

  useEffect(() => {
    _.size(suggestionsList) == 0 ? setSuggestionsList(props.bankList) : void 0;
  }, [props.bankList, open]);

  useEffect(() => {
    amountError && setAmountError(false);

    if (!amount) {
      return setPercent(undefined);
    }
    if (amount && !percent) {
      const percentage = Math.round(
        (Number(amount) / Number(data?.availableBalance)) * 100
      );
      const foundPercentage = PercentageData.find(
        (item) => item.percentage == percentage
      );
      if (foundPercentage) {
        setPercent(foundPercentage.percentage);
      }
    } else if (amount && percent) {
      const percentage = Math.round(
        (Number(amount) / Number(data?.availableBalance)) * 100
      );

      const foundPercentage = PercentageData.find(
        (item) => item.percentage == percentage
      );
      if (foundPercentage) {
        setPercent(foundPercentage.percentage);
      } else {
        setPercent(undefined);
      }
    }
  }, [amount]);

  function handleState() {
    //! TODO FIX LATER ANDROID BACKHANDER IS NOT PROPERLY WORKING

    setShowInput(true);
    setAmount("");
    setShowPayment(false);
    setUserInfoObj({
      easyPaisaSelected: false,
      chequeSelected: false,
      bankSelected: false,
      paymentMethodId: "",
      accountTitle: "",
      commonObj: {},
    });
  }
  function handleCase(data: PaymentMethods) {
    switch (data.companyName) {
      case "malkiyat-account":
        setUserInfoObj((item) => ({
          ...item,
          bankSelected: true,
          easyPaisaSelected: false,
          chequeSelected: false,
          paymentMethodId: String(data.paymentId),

          commonObj: {},
        }));

        break;

      case "malkiyat-cheque":
        setUserInfoObj((item) => ({
          ...item,
          bankSelected: false,
          easyPaisaSelected: false,
          chequeSelected: true,
          paymentMethodId: String(data.paymentId),
          commonObj: {},
        }));

        break;

      default:
        break;
    }
  }

  const getSuggestions = (q) => {
    const filterToken = q.toLowerCase();
    if (q == "") {
      setSuggestionsList(props.bankList);
    }
    console.log(filterToken);

    const suggestions = props.bankList
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.id,
        title: item.title,
        testID: item.testID,
      }));

    setSuggestionsList(suggestions);
  };

  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
  }, []);
  return (
    <Modalize
      modalHeight={Platform.OS == "ios" ? 450 : 350}
      onOverlayPress={() => Keyboard.dismiss()}
      ref={ref}
      // panGestureComponentEnabled
      closeOnOverlayTap={true}
      onClose={handleState}
      HeaderComponent={
        <KeyboardAwareScrollView
          nestedScrollEnabled
          enableAutomaticScroll
          enableOnAndroid
          extraScrollHeight={Platform.OS == "ios" ? -320 : -20}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustsScrollIndicatorInsets
          automaticallyAdjustContentInsets
        >
          <View style={styles.modalContent}>
            {showInput && (
              <View>
                <ResponsiveText style={styles.cashoutText}>
                  Cash Out
                </ResponsiveText>
                <View style={styles.inputView}>
                  <ResponsiveText style={styles.inputHeaderText}>
                    Enter Amount
                  </ResponsiveText>
                  <TextInput
                    editable
                    style={{ width: wp(75), height: wp(15) }}
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9]/g, "");
                      if (Number(data?.availableBalance) < Number(text)) {
                        setAmount(String(Number(data.availableBalance)));
                      } else setAmount(text);
                    }}
                    defaultValue={""}
                    keyboardType="numeric"
                    placeholder="Enter Price"
                    value={amount ? valueWithCommas(amount) : ""}
                  />
                </View>
                {amountError && (
                  <ResponsiveText style={styles.errorText}>
                    Amount cannot be less than{" "}
                    {
                      store.getState().registerUser?.registerUserData
                        ?.appSettings?.minAmountForCashOut
                    }
                    .
                  </ResponsiveText>
                )}
                {/* {error && (
                  <ResponsiveText
                    style={{
                      // marginLeft: wp(5),
                      color: "red",
                      fontSize: 3.5,
                      marginTop: wp(1),
                    }}
                  >
                    Please enter amount!
                  </ResponsiveText>
                )} */}
                <ResponsiveText style={styles.balanceText}>
                  Available Balance: Rs.{" "}
                  {valueWithCommas(data?.availableBalance ?? 0)}
                </ResponsiveText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: wp(10),
                  }}
                >
                  {PercentageData.map((item) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          item.percentage == percent
                            ? setPercent(undefined)
                            : (setPercent(item.percentage),
                              setAmount(
                                String(
                                  Math.round(
                                    (item!.percentage! / 100) *
                                      Number(data?.availableBalance)
                                  )
                                )
                              ));
                        }}
                        key={item.id}
                        style={{
                          ...styles.percetageView,
                          borderColor:
                            item.percentage == percent ? "#2BACE3" : "#B6B6B6",
                        }}
                      >
                        <ResponsiveText
                          style={{
                            color:
                              item.percentage == percent
                                ? "#2BACE3"
                                : "#B6B6B6",
                          }}
                        >
                          {item.percentage}%
                        </ResponsiveText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity
                  disabled={
                    Number(amount) > 0 && Number(data?.availableBalance) > 0
                      ? false
                      : true
                  }
                  onPress={() => {
                    if (
                      Number(amount) <
                      Number(
                        store.getState().registerUser?.registerUserData
                          ?.appSettings?.minAmountForCashOut
                      )
                    ) {
                      return !amountError && setAmountError(true);
                      // return Alert.alert(
                      //   `Minimal amount for cash out is ${
                      //     store.getState().registerUser?.registerUserData
                      //       ?.appSettings?.minAmountForCashOut
                      //   }.`
                      // );
                    }
                    // ! IF BALANCE IS LESS THEN COURIER CHARGES THEN SHOW POPUP TO USER
                    if (Number(data?.availableBalance) <= COURIER_CHARGES) {
                      return Alert.alert("Insufficient Balance");
                    }
                    if (_.isEmpty(amount)) {
                      // setError(true);
                      // Alert.alert("Please enter amount!");
                    } else {
                      setShowPayment(true);
                      setShowInput(false);
                    }
                  }}
                  style={{
                    ...styles.nextBlncBtn,
                    backgroundColor:
                      Number(amount) > 0 && Number(data?.availableBalance) > 0
                        ? "#2BACE3"
                        : "#dedede",
                  }}
                >
                  <ResponsiveText style={{ color: "white" }}>
                    Next
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
            )}

            {showPayment && (
              <View>
                <ResponsiveText
                  style={{
                    textAlign: "center",
                    fontSize: 4.27,
                    marginTop: wp(10),
                  }}
                >
                  Please select your
                  <ResponsiveText
                    style={{
                      fontFamily: Fonts.ManropeSemiBold,
                      fontSize: 4.27,
                    }}
                  >
                    {" "}
                    Payment Method
                  </ResponsiveText>
                </ResponsiveText>
                <View style={{ marginTop: wp(5), marginBottom: wp(10) }}>
                  {paymentMethods.map((item, index) => {
                    if (item.status == "cashout") {
                      return (
                        <TouchableOpacity
                          key={item.paymentId}
                          onPress={() => {
                            showPayment && setShowPayment(false);

                            handleCase(item);
                            // setShowPayment2(true);
                          }}
                          style={styles.cashoutBtn}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              paddingLeft: wp(2),
                            }}
                          >
                            <Image
                              source={{ uri: item.imgUrl }}
                              style={{ width: wp(8), height: wp(8) }}
                            />
                            <ResponsiveText
                              style={{
                                fontSize: 3.5,
                                fontFamily: Fonts.ManropeSemiBold,
                                marginLeft: wp(4),
                              }}
                            >
                              {item.paymentName}
                            </ResponsiveText>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              </View>
            )}

            {userInfoObj.chequeSelected ? (
              <View>
                <ResponsiveText
                  style={{
                    fontSize: 6,
                    marginTop: wp(10),
                    marginBottom: wp(2),
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Details
                </ResponsiveText>

                <View style={styles.amountView}>
                  <ResponsiveText style={styles.amountTitle}>
                    Cheque In Favor Of
                  </ResponsiveText>
                  <TextInput
                    editable={false}
                    onChangeText={(text) => setName(text)}
                    style={{ width: wp(75), height: wp(15) }}
                    defaultValue={""}
                    keyboardType="numeric"
                    placeholder="Enter Price"
                    value={name}
                  />
                </View>
                <View
                  style={[
                    styles.accountABNView,
                    {
                      height: wp(20),
                      paddingTop: Platform.OS == "ios" ? wp(5) : 0,
                    },
                  ]}
                >
                  <ResponsiveText style={styles.ABNText}>
                    Enter Address
                  </ResponsiveText>
                  <TextInput
                    style={{
                      width: wp(75),
                      height: wp(20),
                      // paddingVertical: wp(10),
                      color: "black",
                    }}
                    maxLength={40}
                    multiline={true}
                    onChangeText={(text) => {
                      setUserInfoObj((item) => ({
                        ...item,
                        commonObj: {
                          ...item.commonObj,
                          address: text,
                        },
                      }));
                    }}
                    defaultValue={""}
                    placeholder="Enter Address"
                    value={userInfoObj?.commonObj?.address ?? ""}
                  />
                </View>
                {/* <TouchableOpacity
                  // disabled={Number(amount) > 0 ? false : true}
                  // onPress={() => {
                  //     if (_.isEmpty(amount)) {
                  //         setError(true);
                  //         // Alert.alert("Please enter amount!");
                  //     } else {
                  //         setShowPayment(true);
                  //         setShowInput(false);
                  //     }
                  // }}
                  onPress={() => {
                    navigation.navigate("CashOutReview");
                  }}
                  style={styles.nextBtnStyle}
                >
                  <ResponsiveText style={{ color: "white" }}>
                    Next
                  </ResponsiveText>
                </TouchableOpacity> */}
              </View>
            ) : userInfoObj.bankSelected ? (
              <View style={{ flex: 1 }}>
                <ResponsiveText
                  style={{
                    fontSize: 6,
                    marginTop: wp(10),
                    marginBottom: wp(2),
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Account Details
                </ResponsiveText>

                <TouchableOpacity
                  onPress={() => {
                    setOpen(!open);
                  }}
                  style={styles.bankView}
                >
                  <ResponsiveText style={styles.selectBankText}>
                    {userInfoObj.commonObj?.bankName ?? "Select Bank"}
                  </ResponsiveText>
                  <DownArrow />
                </TouchableOpacity>

                <View style={styles.amountView}>
                  <ResponsiveText style={styles.amountTitle}>
                    Enter Account Title
                  </ResponsiveText>
                  <TextInput
                    editable={false}
                    style={{ width: wp(75), height: wp(15) }}
                    onChangeText={(text) => {
                      text = text.replace(".", "");
                      setUserInfoObj((item) => ({
                        ...item,
                        accountTitle: text,
                        // commonObj: { ...item.commonObj, accountTitle: text },
                      }));
                    }}
                    defaultValue={""}
                    // keyboardType="numeric"
                    placeholder={props.fullName}
                    value={
                      userInfoObj.accountTitle
                        ? userInfoObj?.accountTitle
                        : props.fullName
                    }
                  />
                </View>
                <View style={styles.accountABNView}>
                  <ResponsiveText style={styles.ABNText}>
                    Enter Account Number/IBAN/Raast ID
                  </ResponsiveText>
                  <TextInput
                    style={{ width: wp(75), height: wp(15) }}
                    onChangeText={(text) => {
                      text = text.replace(".", "");
                      setUserInfoObj((item) => ({
                        ...item,
                        commonObj: { ...item.commonObj, accountNo: text },
                      }));
                    }}
                    maxLength={24}
                    defaultValue={""}
                    placeholder="Enter Account Number"
                    value={userInfoObj?.commonObj?.accountNo ?? ""}
                  />
                </View>
              </View>
            ) : userInfoObj.easyPaisaSelected ? (
              <View>
                <ResponsiveText
                  style={{
                    fontSize: 6,
                    marginTop: wp(10),
                    marginBottom: wp(2),
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Account Details
                </ResponsiveText>
                <View style={styles.amountView}>
                  <ResponsiveText
                    style={{ ...styles.amountTitle, color: "#9B9B9B" }}
                  >
                    Easypaisa Account
                  </ResponsiveText>
                  <TextInput
                    style={{ width: wp(75), height: wp(15) }}
                    defaultValue={""}
                    keyboardType="numeric"
                    placeholder="Enter Account Number"
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9]/g, "");
                      setUserInfoObj((item) => ({
                        ...item,
                        commonObj: { ...item.commonObj, mobileNo: text },
                      }));
                    }}
                    value={userInfoObj.commonObj?.mobileNo ?? ""}
                  />
                </View>
              </View>
            ) : null}

            {!showPayment && !showInput && (
              <TouchableOpacity
                disabled={handleBtnDisabled(userInfoObj)}
                // disabled={Number(amount) > 0 ? false : true}
                // onPress={() => {
                //     if (_.isEmpty(amount)) {
                //         setError(true);
                //         // Alert.alert("Please enter amount!");
                //     } else {
                //         setShowPayment(true);
                //         setShowInput(false);
                //     }
                // }}
                onPress={() => {
                  ref?.current!?.close();
                  navigation.navigate("CashOutReview", {
                    info: {
                      ...userInfoObj,
                      accountTitle: userInfoObj?.accountTitle
                        ? userInfoObj?.accountTitle
                        : props.fullName,
                      amount,
                      data,
                    },
                  });
                }}
                style={{
                  ...styles.nextBtnStyle,
                  backgroundColor: handleBtnDisabled(userInfoObj)
                    ? "#dedede"
                    : "#2BACE3",
                }}
              >
                <ResponsiveText style={{ color: "white" }}>Next</ResponsiveText>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
      }
    >
      <View style={{ height: wp(50) }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={() => setOpen(false)}
          // style={styles.modalStyle}
        >
          <View style={styles.modalContainer2}>
            <View style={styles.modalContent2}>
              <TouchableOpacity
                style={styles.crossIcon}
                onPress={() => {
                  setOpen(false);
                  setSuggestionsList(props.bankList);
                }}
              >
                <CrossIcon width={12} height={12} />
              </TouchableOpacity>

              <AutocompleteDropdown
                controller={(controller) => {
                  dropdownController.current = controller as any;
                }}
                direction={Platform.select({ ios: "down" })}
                dataSet={suggestionsList}
                onChangeText={getSuggestions}
                onSelectItem={(item) => {
                  if (item) {
                    setUserInfoObj((items) => ({
                      ...items,
                      commonObj: {
                        ...items.commonObj,
                        bankName: item.title!,
                        accTitle: item?.testID!,
                        bankId: String(item.id),
                      },
                    }));
                    setOpen(false);
                    setSuggestionsList(props.bankList);
                  }
                }}
                debounce={600}
                suggestionsListMaxHeight={
                  Dimensions.get("window").height * 0.34
                }
                // onClear={onClearPress}
                //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                // loading={loading}
                // useFilter={false} // set false to prevent rerender twice
                textInputProps={{
                  placeholder: "Search Bank",
                  autoCorrect: false,
                  autoCapitalize: "none",
                  autoFocus: true,
                  style: {
                    borderRadius: 5,
                    backgroundColor: "#EFEFF2",
                    color: "black",
                    paddingLeft: 18,
                    marginRight: 20,
                    height: 40,
                  },
                }}
                rightButtonsContainerStyle={{
                  right: 8,
                  height: 30,
                  alignSelf: "center",
                }}
                inputContainerStyle={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  width: Dimensions.get("window").width * 0.9,
                }}
                suggestionsListContainerStyle={{
                  // backgroundColor: "red",
                  borderRadius: 10,
                  elevation: 0,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                }}
                containerStyle={{}}
                renderItem={(item, text) => (
                  <Text style={{ color: "black", padding: 15 }}>
                    {item.title}
                  </Text>
                )}
                inputHeight={50}
                showChevron={false}
                // closeOnBlur={true}

                //  showClear={false}
              />
            </View>
          </View>
        </Modal>
      </View>
      <Loader visible={loading} />
    </Modalize>
  );
});

function handleBtnDisabled(userInfoObj: CashOutUserInfoI): boolean {
  return !Boolean(
    Array(userInfoObj).some((item) =>
      item.bankSelected &&
      item.commonObj?.bankName &&
      item.commonObj?.accountNo &&
      item.commonObj?.accountNo.length >= 9
        ? true
        : item.chequeSelected && item.commonObj?.address
        ? true
        : item.easyPaisaSelected && item.commonObj?.mobileNo
        ? true
        : false
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",

    // justifyContent: "center",
  },
  cashoutText: {
    marginTop: wp(13),
    fontSize: 5,
    fontFamily: Fonts.ManropeSemiBold,
  },
  inputHeaderText: {
    fontSize: 3.2,
    fontFamily: Fonts.ManropeBold,
    color: "#3577DB",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  inputView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  balanceText: {
    color: "#9B9B9B",
    fontSize: 3.2,
    marginTop: wp(2),
    alignSelf: "flex-end",
  },
  nextBlncBtn: {
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    height: wp(10),
    marginTop: wp(5),
    marginBottom: wp(30),
  },
  cashoutBtn: {
    marginHorizontal: wp(1),
    marginVertical: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(1),
    // paddingVertical: wp(1),
    paddingRight: wp(3),
    height: wp(10.93),
    borderRadius: wp(2),
  },
  bankView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  selectBankText: {
    fontSize: 3.4,
    fontFamily: Fonts.ManropeSemiBold,

    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  amountView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  amountTitle: {
    fontSize: 3.2,
    fontFamily: Fonts.ManropeBold,
    color: "#3577DB",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  accountABNView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  ABNText: {
    fontSize: 3.2,
    fontFamily: Fonts.ManropeBold,
    color: "#3577DB",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  nextBtnStyle: {
    backgroundColor: "#2BACE3",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    height: wp(10),
    marginTop: wp(10),
    marginBottom: wp(10),
  },
  paymentChannelView: {
    marginHorizontal: wp(1),
    marginVertical: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(1),
    // paddingVertical: wp(1),
    paddingRight: wp(3),
    height: wp(10.93),
    borderRadius: wp(2),
  },
  percetageView: {
    borderWidth: 1,
    borderColor: "#B6B6B6",
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: 10,
  },
  modalContent: {
    paddingHorizontal: wp(5),
  },
  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(5),
  },
  btn: {
    flex: 1,
    height: wp(10),
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginTop: wp(2),
    textAlign: "left",
    fontSize: 3.4,
  },
  modalStyle: {
    height: wp(30),
    top: 150,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    // maxHeight: 420,
    paddingTop: wp(12),
    borderRadius: 10,
  },
  crossIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  modalContainer2: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent2: {
    paddingVertical: wp(10),
    paddingHorizontal: wp(5),
    height: wp(100),
    width: "95%",
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
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

export default React.memo(CashOutModal);

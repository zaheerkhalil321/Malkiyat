import React, { LegacyRef, Ref } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle,
} from "react-native";
import data from "./Countries";
import { CountryInterface } from "@src/services/model";

type PhoneProps = {
  lang?: string;
  defaultCountry: string;
  mask?: string;
  onChangeText: ({}) => void;
  customModal?: (
    modalVisible: boolean,
    countryData: CountryInterface[],
    onCountryChange: (code: string) => void
  ) => void;
  phoneInputStyle?: StyleProp<ViewStyle>;
  containerStyle?: any;
  dialCodeTextStyle?: StyleProp<ViewStyle>;
  flagStyle?: StyleProp<ViewStyle>;
  modalContainer?: StyleProp<ViewStyle>;
  filterInputStyle?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  modalCountryItemCountryNameStyle?: StyleProp<ViewStyle>;
  filterText?: string;
  closeText?: string;
  searchIconStyle?: StyleProp<ViewStyle>;
  disableCountryChange?: boolean;
  inputRef?: any;
  placeholderTextColor?: string;
  modalCountryItemCountryDialCodeStyle?: StyleProp<ViewStyle>;
  modalFlagStyle?: StyleProp<ViewStyle>;
  countryModalStyle?: StyleProp<ViewStyle>;
  renderAction?: () => void;
  onChangeCountry?: (data: CountryInterface) => void;
  inputProps?: any;
  modalFunc?: () => void;
  showInput: boolean;
  customeCountryList?: CountryInterface[];
};

type PhoneState = {
  dialCode: string;
  mask: any;
  selectedCountry: CountryInterface;
  defaultCountry: CountryInterface;
  flag: string;
  modalVisible: boolean;
  phoneNumber: string;
  countryData: CountryInterface[];
  placeholderTextColor: string;
};

export default class PhoneInput extends React.Component<
  PhoneProps,
  PhoneState
> {
  constructor(props: PhoneProps | Readonly<PhoneProps>) {
    super(props);
    const defaultCountry =
      data.filter((obj) => obj.code === props.defaultCountry)[0] ||
      data.filter((obj) => obj.code === "TR")[0];
    this.state = {
      defaultCountry,
      flag: defaultCountry.flag,
      modalVisible: false,
      dialCode: defaultCountry.dialCode,
      phoneNumber: "",
      mask: props.mask || defaultCountry.mask,
      countryData: data,
      selectedCountry: defaultCountry,
      placeholderTextColor: "grey",
    };
  }

  onChangePropText = (
    unmaskedPhoneNumber: string | any[],
    phoneNumber: string | any[]
  ) => {
    const { dialCode, mask, selectedCountry } = this.state;
    const countOfNumber = mask.match(/9/g).length;
    if (this.props.onChangeText) {
      const isVerified =
        countOfNumber === unmaskedPhoneNumber?.length &&
        phoneNumber?.length > 0;
      this.props.onChangeText({
        dialCode,
        unmaskedPhoneNumber,
        phoneNumber,
        isVerified,
        selectedCountry,
      });
    }
  };

  onChangeText = (value: string) => {
    if (value.charAt(0) === "0") {
      value = value.substring(1);
    }
    let unmaskedPhoneNumber = (value.match(/\d+/g) || []).join("");

    if (unmaskedPhoneNumber.length === 0) {
      this.setState({ phoneNumber: "" });
      this.onChangePropText("", "");
      return;
    }

    let phoneNumber = this.state.mask.replace(/9/g, "_");
    for (let index = 0; index < unmaskedPhoneNumber.length; index += 1) {
      phoneNumber = phoneNumber.replace("_", unmaskedPhoneNumber[index]);
    }
    let numberPointer = 0;
    for (let index = phoneNumber.length; index > 0; index -= 1) {
      if (phoneNumber[index] !== " " && !isNaN(phoneNumber[index])) {
        numberPointer = index;
        break;
      }
    }
    phoneNumber = phoneNumber.slice(0, numberPointer + 1);
    unmaskedPhoneNumber = (phoneNumber.match(/\d+/g) || []).join("");

    this.onChangePropText(unmaskedPhoneNumber, phoneNumber);
    this.setState({ phoneNumber });
  };

  showModal = () =>
    this.props.disableCountryChange
      ? null
      : this.setState({ modalVisible: true });

  hideModal = () => this.setState({ modalVisible: false });

  onCountryChange = async (code: string) => {
    const countryData = await data;
    try {
      const country = await countryData.filter((obj) => obj.code === code)[0];
      this.setState({
        dialCode: country.dialCode,
        flag: country.flag,
        mask: this.props.mask || country.mask,
        phoneNumber: "",
        selectedCountry: country,
      });
      this.hideModal();
      this.props?.onChangeCountry!(country);
    } catch (err) {
      const defaultCountry = this.state.defaultCountry;
      this.setState({
        dialCode: defaultCountry.dialCode,
        flag: defaultCountry.flag,
        mask: this.props.mask || defaultCountry.mask,
        phoneNumber: "",
        selectedCountry: defaultCountry,
      });
    }
  };

  filterCountries = (value: string) => {
    const { lang } = this.props;
    const countryData = data.filter(
      (obj) =>
        obj[(lang?.toLowerCase() as keyof CountryInterface) ?? "en"]?.indexOf(
          value
        ) > -1 || obj.dialCode.indexOf(value) > -1
    );
    this.setState({ countryData });
  };

  focus() {
    this.props.inputRef.current.focus();
  }

  renderModal = () => {
    if (this.props.customModal)
      return this.props.customModal(
        this.state.modalVisible,
        this.state.countryData,
        this.onCountryChange
      );
    const {
      countryModalStyle,
      modalContainer,
      modalFlagStyle,
      filterInputStyle,
      modalCountryItemCountryNameStyle,
      modalCountryItemCountryDialCodeStyle,
      closeText,
      filterText,
      searchIconStyle,
      closeButtonStyle,
      lang,
      placeholderTextColor,
    } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.modalContainer, modalContainer]}>
            <View style={styles.filterInputStyleContainer}>
              <TextInput
                autoCapitalize="words"
                autoFocus
                onChangeText={this.filterCountries}
                placeholder={filterText || "Filter"}
                style={[styles.filterInputStyle, filterInputStyle]}
                placeholderTextColor={placeholderTextColor}
              />
              <TouchableOpacity
                onPress={() => this.hideModal()}
                style={[styles.searchIconStyle, searchIconStyle]}
              >
                <Text style={{ fontSize: 30 }}>&#215;</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              data={this.props?.customeCountryList ?? this.state.countryData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => this.onCountryChange(item.code)}
                >
                  <View style={[styles.countryModalStyle, countryModalStyle]}>
                    <Text style={[styles.modalFlagStyle, modalFlagStyle]}>
                      {item?.flag}
                    </Text>
                    <View style={styles.modalCountryItemContainer}>
                      <Text
                        style={[
                          styles.modalCountryItemCountryNameStyle,
                          modalCountryItemCountryNameStyle,
                        ]}
                      >
                        {
                          item[
                            (lang?.toLowerCase() as keyof CountryInterface) ??
                              "en"
                          ]
                        }
                      </Text>
                      <Text
                        style={[
                          styles.modalCountryItemCountryDialCodeStyle,
                          modalCountryItemCountryDialCodeStyle,
                        ]}
                      >{`  ${item?.dialCode}`}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          {/* <TouchableOpacity onPress={() => this.hideModal()} style={[styles.closeButtonStyle, closeButtonStyle]}>
          <Text style={styles.closeTextStyle}>{closeText || 'CLOSE'}</Text>
        </TouchableOpacity> */}
        </SafeAreaView>
      </Modal>
    );
  };

  renderAction = () => {
    const renderAction = this.props.renderAction;
    if (renderAction) {
      if (typeof renderAction !== "function")
        throw "The renderAction is not a function. Please set a renderAction function on there";
      else return this.props.renderAction && this.props.renderAction();
    }
    return null;
  };

  render() {
    const { flag } = this.state;
    const {
      containerStyle,
      flagStyle,
      phoneInputStyle,
      dialCodeTextStyle,
      inputProps,
      placeholderTextColor,
    } = this.props;
    return (
      <View style={{ ...styles.container, ...containerStyle }}>
        <TouchableOpacity onPress={() => this.showModal()}>
          <View style={styles.openDialogView}>
            {this.props.showInput && (
              <Text style={[styles.flagStyle, flagStyle]}>{flag}</Text>
            )}
            {this.props.showInput && (
              <Text style={[styles.dialCodeTextStyle, dialCodeTextStyle]}>
                {this.state.dialCode}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        {this.renderModal()}
        {this.props.showInput && (
          <TextInput
            {...inputProps}
            style={[styles.phoneInputStyle, phoneInputStyle]}
            // placeholder={this.props.placeholder || this.state.mask.replace(/9/g, '_')}
            placeholder="3XX-XXXXXXX"
            autoCorrect={false}
            keyboardType="number-pad"
            secureTextEntry={false}
            value={this.state.phoneNumber}
            onChangeText={this.onChangeText}
            placeholderTextColor={placeholderTextColor}
          />
        )}
        {this.renderAction()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  modalCountryItemCountryDialCodeStyle: {
    fontSize: 15,
  },
  modalCountryItemCountryNameStyle: {
    flex: 1,
    fontSize: 15,
  },
  modalCountryItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: "row",
  },
  modalFlagStyle: {
    fontSize: 25,
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 10,
    backgroundColor: "white",
  },
  flagStyle: {
    fontSize: 30,
  },
  dialCodeTextStyle: {
    // backgroundColor:'red',
    marginLeft: 5,
    color: "#3B4161",
  },
  countryModalStyle: {
    flex: 1,
    borderColor: "#EBECEF",
    borderTopWidth: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  searchIcon: {
    padding: 10,
  },
  filterInputStyleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
  },
  container: {
    flexDirection: "row",
    // paddingHorizontal: 12,
    // padding: 5,
    // borderRadius: 10,
    alignItems: "center",
    // backgroundColor: 'red',
  },
  searchIconStyle: {
    color: "black",
    fontSize: 15,
    position: "absolute",
    left: 0,
    top: -10,
  },
  buttonStyle: {
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  countryStyle: {
    flex: 1,
    borderColor: "black",
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: "center",
  },
});

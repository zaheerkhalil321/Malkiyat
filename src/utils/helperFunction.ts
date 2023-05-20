import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "@src/helpers/NavigationService";
import {
  EventMessageI,
  HighestOfferDataI,
  HighestOfferI,
  PaymentMethods,
} from "@src/services/model";
import Fonts from "@src/theme/fonts";
import _ from "lodash";
import moment, { Moment } from "moment";
import Snackbar from "react-native-snackbar";
import RNFetchBlob from "react-native-blob-util";
import Share from "react-native-share";
import { PermissionsAndroid, Platform } from "react-native";

const MAX_COINS = 12;
/**
 * @param  {Date|string|any} param
 * @returns minute
 */
export const calculateTimeStamp = (
  param: Date | string | any,
  todayDate: Moment = moment()
) => {
  if (
    !_.isEmpty(param) &&
    _.isUndefined(param) &&
    param!.toString()?.length <= 12
  ) {
    return "";
  }

  const giveDate = moment(param);

  // param = moment(param).local();

  // var diffTime = 0;
  // if (param != "null" && param.includes("T")) {
  //   diffTime = Math.abs(+new Date() - +new Date(param));
  // } else {
  //   diffTime = Math.abs(+new Date() - +new Date(param));
  // }

  let days = Math.abs(todayDate.diff(giveDate, "days"));
  let hours = Math.abs(todayDate.diff(giveDate, "hours"));
  let minutes = Math.abs(todayDate.diff(giveDate, "minutes"));
  let secs = Math.abs(todayDate.diff(giveDate, "seconds"));

  // let days = diffTime / (24 * 60 * 60 * 1000);
  // let hours = (days % 1) * 24;
  // let minutes = (hours % 1) * 60;
  // let secs = (minutes % 1) * 60;

  [days, hours, minutes, secs] = [days, hours, minutes, secs];

  if (days >= 365) {
    const year = Math.floor(days / 365);
    return `${year} year${year > 1 ? "s" : ""}`;
  }
  if (days >= 60) {
    return `${Math.floor(days / 28)} ${days > 30 ? "months" : "month"}`;
  }
  if (days > 0) {
    return `${days} ${days > 1 ? "days" : "day"}`;
  } else if (hours > 0) {
    return `${hours} ${hours > 1 ? "hours" : "hour"}`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
  } else {
    return `${secs} secs`;
  }
};
/**
 * @param  {} num
 * @param  {any=Math.abs(value} =>{letval
 */
export const valueWithCommas = (num) => {
  let nf = new Intl.NumberFormat("en-US");
  return nf.format(num);
};
const LAKH = 100000;
const CRORE = 10000000;

export const valueConverstion = (value) => {
  let val: any = Math.abs(value);
  if (val < LAKH) {
    return valueWithCommas(value);
  }

  if (val >= CRORE) {
    val = (val / CRORE).toFixed(2) + " Crore";
  } else if (val >= LAKH) {
    val = (val / LAKH).toFixed(2) + " lac";
  }
  return val;
};
/**
 * @param  {string} value
 */
export const SqftSpace = (value: string) => {
  //!rare case
  if (value.length == 0) {
    return "0".concat("  ");
  } else if (value.length == 1) {
    return value.concat("  ");
  } else if (value.length == 2) {
    return value.concat(" ");
  } else return value;
};
/**
 * @param  {} val
 * @param  {} interval
 * @param  {number[]=[];letnum=0;if(Math.round(val/interval} =>{letarr
 */

export const coinStackforPercentage = (val, interval) => {
  let arr: number[] = [];
  let num = 0;

  if (Math.round(val / interval) === 0) {
    num = 1;
  } else {
    num = Math.round(val / interval);
  }
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  // if (num <= 12) {
  //   for (let i = 1; i <= num; i++) {
  //     arr.push(i)
  //   }
  // } else {
  //   for (let i = 1; i <= 12; i++) {
  //     arr.push(i)
  //   }
  // }
  return arr;
};
/**
 * @param  {} currentYear
 * @param  {} maxValueofYears
 */
export const coinStackforYear = (currentYear, maxValueofYear) => {
  let arr: number[] = [];

  let num = 0;
  let convertedVal = (currentYear / maxValueofYear) * MAX_COINS;
  if (Math.round(convertedVal) == 0) {
    num = 1;
  } else {
    num = Math.round(convertedVal);
  }
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  // if (num <= 12) {
  //   for (let i = 1; i <= num; i++) {
  //     arr.push(i)
  //   }
  // } else {
  //   for (let i = 1; i <= 12; i++) {
  //     arr.push(i)
  //   }
  // }
  return arr;
};

export const PHONE_REGIX =
  /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{2})((-?)|( ?))([0-9]{7})$/;

export function CHECK_DEBUGGER_STATE() {
  if (global.location && global.location.pathname.includes("/debugger-ui")) {
    return true;
  }
  return false;
}

export const CUSTOM_KEYBOARD_REGIX =
  /[`~!@#$%©®™✓°¥€¢£∆¶×÷π√•^&*()_|+\-=?;:,.<>\{\}\[\]\\\/]/gi;

export const SPECIAL_CHARACTERS_REGIX = /\W/g;
export const ALPHA_CHARACTER_REGIX = /[^a-z]/gi;
export const EMAIL_REGIX = /^(?!.*[^A-Za-z0-9]{2})[A-Za-z0-9].*$/;

export const calculateProfilt = (
  message: EventMessageI | null,
  bidData: HighestOfferDataI,
  comparison: boolean
): {
  profit: number | null;
  totalPurchasePrice;
} => {
  const data = bidData;

  if (_.size(data?.userProperties) > 0) {
    var no_of_units: number | null = 0;

    if (_.isEmpty(message)) {
      no_of_units =
        data?.totalForSaleSmallerUnits! > data?.ownedSmallerUnits!
          ? data.ownedSmallerUnits
          : data.totalForSaleSmallerUnits!;
    } else if (comparison) {
      no_of_units =
        message!?.totalForSaleSmallerUnits! > data?.ownedSmallerUnits!
          ? data?.ownedSmallerUnits
          : message?.totalForSaleSmallerUnits!;
    } else {
      no_of_units = data.ownedSmallerUnits;
    }

    var totalPurchasePrice: number = 0;

    for (let i = 0; i < Number(no_of_units!); i++) {
      totalPurchasePrice += Number(data?.userProperties[i].purchasePrice);
    }

    const obj = {
      profit: no_of_units! * message?.highestOfferAmount! - totalPurchasePrice,
      totalPurchasePrice,
    };

    return obj;
  }
  // ! IF THERE IS NO PROPERTY EXIST AGAINST THIS USER

  return { profit: 0, totalPurchasePrice: 0 };
};

export const calculateTotalPurchasePriceOnly = (
  data: HighestOfferDataI,
  no_of_units: number
) => {
  var totalPurchasePrice: number = 0;

  for (let i = 0; i < Number(no_of_units!); i++) {
    totalPurchasePrice += Number(data?.userProperties[i].purchasePrice);
  }

  return totalPurchasePrice;
};

export interface ErrorObj {
  email: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  password: string;
}

export const findError = (errorObj: Partial<ErrorObj>) => {
  return Object.values(errorObj).map((item) => item.concat("\n"));
};

export function handleSessionOutNavigation() {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: "AuthStack",
          state: {
            routes: [
              {
                name: "LoginScreen",
              },
            ],
          },
        },
      ],
    })
  );
}

export const checkValueGreaterThanZero = (value: number) => {
  return Math.abs(value).toFixed(0) != 0;
};

export const circleProgressHours = (
  createdDate: Date,
  expiryDate: Date
): number => {
  const totalHours = moment
    .duration(moment(expiryDate).diff(moment(createdDate)))
    .asHours();
  const remainingHours = moment
    .duration(moment(expiryDate).diff(moment()))
    .asHours();

  const value = (Number(remainingHours) / Number(totalHours)) * 100;

  return value > 0 ? value : 1;
};

export function checkTotalAmount(
  enterAmount: number,
  actualAmount: number
): boolean {
  console.log(enterAmount, actualAmount, "dadada");

  return enterAmount == actualAmount ? true : false;
}

export function findFontSize(value: string, defaultFontSize: number): number {
  return String(value)?.length > 10 ? 3.9 : defaultFontSize;
}
export function propertyAdressCheck(
  propertyName: string,
  propertyAdress: string
): string {
  if (propertyName.length > 15 && propertyAdress.length > 35) {
    return propertyAdress.slice(0, 35) + "...";
  }
  if (propertyName.length > 15 && propertyAdress.length <= 35) {
    return propertyAdress.slice(0, 25) + "...";
  }
  if (propertyName.length < 15 && propertyAdress.length > 40) {
    return propertyAdress.slice(0, 40) + "...";
  }
  if (propertyName.length < 15 && propertyAdress.length < 35) {
    return propertyAdress.slice(0, 38) + "...";
  } else {
    return propertyAdress;
  }
}
export const sleep = (t) =>
  new Promise((resolve: any) => setTimeout(resolve, t));

export const downloadFile = (ref) => {
  ref!.current!.capture!().then(async (uri) => {
    if (await hasAndroidPermission()) {
      CameraRoll.save(uri);
      CameraRoll.save(uri, { type: "photo", album: "Images" });
    }
  });
  Snackbar.show({
    text: "Image saved successfully",
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: "green",
    textColor: "white",
    fontFamily: Fonts.ManropeBold,
  });
};
export const captureAndShareScreenshot = (ref) => {
  ref!.current!.capture!().then((uri) => {
    RNFetchBlob.fs.readFile(uri, "base64").then((res) => {
      let urlString = "data:image/jpeg;base64," + res;
      let options = {
        title: "",
        message: "",
        url: urlString,
        type: "image/jpeg",
      };
      Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    });
  });
};

async function hasAndroidPermission() {
  const permission =
    Number(Platform.Version) >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
}

import { SvgProps } from "react-native-svg";
import BankTransferIcon from "@src/assets/images/bankTransfer.svg";
import CreditDebitIcon from "@src/assets/images/creditDebit.svg";
import CashDepositIcon from "@src/assets/images/cashDeposit.svg";
import InterBankIcon from "@src/assets/images/internetIcon.svg";
import UploadIcon from "@src/assets/images/uploadRe.svg";
import MobileIcon from "@src/assets/images/mobileIcon.svg";
import AtmIcon from "@src/assets/images/atmIcon.svg";
import OTCIcon from "@src/assets/images/otcIcon.svg";
import React from "react";

export interface OnBoardData {
  type: string;
  imageUri: string;
  heading: string;
  description: string;
  key: string;
  color: string;
  subDes: string;
  sub: string;
}
export const Data: OnBoardData[] = [
  {
    type: "Humlan P",
    imageUri: require("@src/assets/images/slide11.png"),
    heading: "",
    description: "",
    key: "first",
    color: "#9dcdfa",
    subDes: "",
    sub: "",
  },
  {
    type: "Humlan P",
    imageUri: require("@src/assets/images/slide1.png"),
    heading: "",
    description: "",
    key: "first",
    color: "#9dcdfa",
    subDes: "",
    sub: "",
  },
  {
    type: "Pampas",
    imageUri: require("@src/assets/images/slide2.png"),
    heading: "",
    description: "",
    subDes: "",
    key: "second",
    color: "#db9efa",
    sub: "",
  },
  {
    type: "Humlan P",
    imageUri: require("@src/assets/images/slide3.png"),
    heading: "",
    description: "",
    subDes: "",
    sub: "",
    key: "third",
    color: "#999",
  },
  // {
  //   type: "Humlan B",
  //   imageUri: require("@src/assets/images/Walk4.png"),
  //   heading: "",
  //   description: "",
  //   subDes: "",
  //   sub: "",
  //   key: "fourth",
  //   color: "#a1e3a1",
  // },
];
export const CashinDatset: {
  id: number;
  title: string;
  image: React.FunctionComponent<SvgProps>;
  key: "banktransfer" | "creditdebit" | "voucher" | "uploadReceipt";
}[] = [
  {
    id: 1,
    title: "Transfer from Bank Account",
    image: BankTransferIcon,
    key: "banktransfer",
  },
  {
    id: 2,
    title: "Credit/Debit Card",
    image: CreditDebitIcon,
    key: "creditdebit",
  },
  {
    id: 3,
    title: "Create Voucher (Finca Pay/1Link/PayPro)",
    image: CashDepositIcon,
    key: "voucher",
  },
  // {
  //   id: 4,
  //   title: "Upload Receipt",
  //   image: UploadIcon,
  //   key: "uploadReceipt",
  // },
];

export interface CashoutDataSetI {
  id: number;
  title: string;
  image: React.FunctionComponent<SvgProps>;
  key: "creditdebit" | "easyPaisa" | "cheque";
}

// export const CashOutDatset: CashoutDataSetI[] = [
//   {
//     id: 9,
//     title: "EasyPaisa",
//     image: BankTransferIcon,
//     key: "easyPaisa",
//   },
//   {
//     id: 6,
//     title: "Transfer to Bank Account",
//     image: CreditDebitIcon,
//     key: "creditdebit",
//   },
//   {
//     id: 16,
//     title: "Cheque",
//     image: CashDepositIcon,
//     key: "cheque",
//   },
// ];
export const Payment_Channel: {
  id: number;
  title: string;
  image: React.FunctionComponent<SvgProps>;
}[] = [
  {
    id: 1,
    title: "Internet Banking",
    image: InterBankIcon,
  },
  {
    id: 2,
    title: "Mobile App",
    image: OTCIcon,
  },
  {
    id: 3,
    title: "ATM",
    image: MobileIcon,
  },
  {
    id: 4,
    title: "OTC (Over The Counter)",
    image: AtmIcon,
  },
];
export const PercentageData: {
  id: Required<number>;
  percentage: number | undefined;
}[] = [
  {
    id: 1,
    percentage: 25,
  },
  {
    id: 2,
    percentage: 50,
  },
  {
    id: 3,
    percentage: 75,
  },
  {
    id: 4,
    percentage: 100,
  },
];

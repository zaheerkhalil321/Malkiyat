import { wp } from "@src/components/common/Responsive";
import { transactionCategory, userTransactions } from "@src/services/model";
import { Image } from "react-native";
import React from "react";
import { valueWithCommas } from "@src/utils/helperFunction";
type returnType = React.ReactNode;
// prettier-ignore

export default ( category: transactionCategory): returnType => {

  

  switch (String(category).toLowerCase()) {

    case "bought":
      return (
        <Image
          style={{ width: wp(6.4), height: wp(7.73) }}
          source={require("@src/assets/images/bought.png")}
        />
      );
      // case "withdraw for ad":
      // return (
      //   <Image
      //     style={{ width: wp(6.4), height: wp(7.73) }}
      //     source={require("@src/assets/images/Wal.png")}
      //   />
      // );
        case "sold":
      return (
        <Image
          style={{
            width: wp(6.4),
            height: wp(8),
            // backgroundColor: "red",
            resizeMode: "center",
          }}
          source={require("@src/assets/images/sold.png")}
        />
      );
          case "commission":
      return (
        <Image
          style={{ width: wp(6.4), height: wp(7.73) }}
          source={require("@src/assets/images/comicon.png")}
        />
      );
            case "cashin":
      return (
        <Image
          style={{ width: wp(6.4), height: wp(7.73) }}
          source={require("@src/assets/images/Wal.png")}
        />
      );
            
                case "cashout":
      return (
        <Image
          style={{ width: wp(6.4), height: wp(7.73) }}
          source={require("@src/assets/images/chequeIcon.png")}
        />

      );
      case "withdraw":



                case "stamp_paper_fee":
      return (
        <Image
          style={{ width: wp(6.4), height: wp(7.73) }}
          source={require("@src/assets/images/dolcoin.png")}
        />
      );
                  case "courier_charges":
      return (
        <Image
          style={{ width: wp(6.4), height: wp(7.73) }}
          source={require("@src/assets/images/couri.png")}
        />
      );
                    default:
      return null;
  }
};
// prettier-ignore

export const TransactionType = (item: userTransactions) => {

    switch (String(item.category).toLowerCase()) {
    case "cashin":
      return "Top up wallet";
      case "courier_charges":
      return "Courier Charges";
        case "stamp_paper_fee":
      return "Stamp Paper fee";
         case "commission":
      return "Malkiyat Fee";
          case "bought":
      return `Bought ${  valueWithCommas(item?.boughtSmallerUnit??0)?? ""} ${
        item?.smallerUnit+(Number(item?.boughtSmallerUnit??0)>1?"s":"")??""
      }`;
            case "withdraw":
              
      return  `Withdraw ${ valueWithCommas(item?.boughtSmallerUnit??0)?? ""} ${
        item?.smallerUnit ?? ""
      }`;
      case "cashout":
        return  'Withdraw'

      //        case "withdraw for ad":
      // return `Withdraw for Ad ${ item?.boughtSmallerUnit ?? ""} ${
      //   item?.smallerUnit ?? ""
      // }`;
               case "sold":
      return `Sold ${valueWithCommas(item?.boughtSmallerUnit??0) ?? ""} ${
        item?.smallerUnit+(Number(item?.boughtSmallerUnit??0)>1?"s":"") ?? ""
      }`;
                 default:
      return null;
  }
};

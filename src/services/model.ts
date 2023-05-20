import { ImageProps, ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";

type Modify<T, R> = Omit<T, keyof R> & R;

export interface UserInfo {
  id?: number | string | null;
}
export type SignupType = "Simple-Signup" | "UnregisterBuyNowVal";
export interface Route {
  key: string;
  name: string;
  params?: any;
  path: undefined;
}
export interface OnBoardingI {
  splashId: number;
  splashTitle: string;
  splashImg: string;
  splashDescription: string;
}

export interface SignupResponse {
  userId: number;
  // active: boolean;
  // city: string | undefined;
  // cnic: string | undefined;
  // country: string | undefined;
  // deleted: boolean;
  // deviceId: string | undefined;
  // dob: string | undefined;
  // email: string | undefined;
  // fullName: string | undefined;
  // kinCnic: string | undefined;
  // kycStatus: boolean;
  // mailAddress: string | undefined;
  // mobileNo: string | undefined;
  // nextOfKin: string | undefined;
  // otpVerified: boolean;
  // userId: number;
  // walletId: number;
}
export interface Properties {
  propertyId: number;
  propertyName: string;
  ownedSqfts: string;
  totalArea?: number;
  currentOwnerId?: number;
}
export interface RegisterUserInfo {
  appSettings: {
    appVersion: string;
    bidLowerLimitValue: string;
    bidUpperLimitValue: string;
    buyBackStatus: "on" | "off";
    sessionInactivityTime: string;
    tradingStatus: "on" | "off";
    minAmountForCashOut: string;
    minAmountForCashIn: string;
    boughtUrl: string;
    soldUrl: string;
  };
  userInfo: {
    userId: number | string | null;
    cnic?: string | null;
    firstName: string | null;
    lastName: string | null;
    mobileNo?: number | string | null;
    email: string | null;
    dob?: Date | null;
    mailAddress?: string | null;
    city?: string | null;
    country?: string | null;
    property?: string | null;
    maxTransactions?: any | null;
    kycStatus: boolean;
    userTypeID?: number;
    active?: boolean;
    otpVerified?: boolean;
    deleted?: boolean;
    profilePic: string | null;
    address: string | null;
  };
  liveTransactions: LastTransactionI[];
  propertiesData: { data: RefreshI };
  commissionPercentage: number;
}
export interface RefreshI {
  KycStatus: "0" | "1" | "2" | "3";
  balance: { userId: string; walletBalance: string };
  currentValue: string | number | null;
  lastTransaction: LastTransactionI[];
  ownedSmallerUnits: string;
  profit: string;
  date: "No" | string;
  currentDate: string | null;
  ExpiryAndCreatedDate: {
    expiry_date: string | null;
    purchased_date: string | null;
  };
}
export interface LastTransactionI {
  boughtSmallerUnits: string | number | null;
  transactionDate: Date;
  propertyName: string | null;
  customerName: string | null;
  biggerUnit: string | null;
  biggerUnitArea: string | null;
  smallerUnit: string | null;
}
export interface TransactionHistoryInfoI {
  transactionId: number;
  purchaseAmount: number;
  transactionFeeType: string | null;
  transactionRef: string | null;
  refNo: null;
  transactionFrom: string | null;
  transactionTo: string | null;
  transactionStatus: string | null;
  transactionType: string | null;
  transactionDateTime: string | null;
  transactionDetails: [
    {
      transactionDetailsId: number;
      transactionRef: string | null;
      refNo: number | null;
      purchaseUnits: number | null;
      plotIdRange: string | null;
      propertyName: string | null;
      stillOwner: boolean | null;
    }
  ];
}
type StatusCode = 200 | 4000 | 4001 | 4002 | 4003 | 4004 | 4005 | 4006 | 400;
export interface MainResponse<T> {
  data: T;
  message: string;
  status: StatusCode;
}
export interface MediaResponseI<T> {
  code: number;
  data: T;
  message: string;
}
export interface UpdatedResponse
  extends Modify<
    MediaResponseI<keyof string>,
    {
      data: string;
    }
  > {
  status: number;
}
export interface ProofOfPurchaseI {
  proofId: number;
  description: string;
  popDeliveryId: number;
  price: number;
  sendEmail: boolean;
}
export type WalletCompanies =
  | "payfast"
  | "paymob-nift"
  | "meezanbank"
  | "paymob-card"
  | "paymob-ep"
  | "onelink-voucher"
  | "finja-voucher"
  | "paypro-voucher"
  | "user-wallet"
  | "EasyPaisa"
  | "Cheque"
  | "admin-portal"
  | "malkiyat-account"
  | "malkiyat-cheque"
  | "malkiyat-bank-detail";
export type PaymentStatusI =
  | "banktransfer"
  | "creditdebit"
  | "voucher"
  | "cashout"
  | "manual"
  | "userwallet"
  | "Transfer to Bank Account";
export interface PaymentMethods {
  active: boolean;
  commission: number;
  companyName: WalletCompanies;
  imgUrl: string;
  mockUpEnable: boolean;
  paymentId: number;
  paymentName: PaymentStatusI;
  paymentStatus: PaymentStatusI;
  status:
    | "cashin"
    | "all"
    | "userwallet"
    | "cashout"
    | "portal"
    | "banktransfer"
    | "creditdebit";
}
export interface MediaI {
  propertyMediaId: number;
  propertyId: number;
  propertyMediaUrl: string;
  mediaType: "1" | "2" | "3";
  documentName: string;
}
export interface ApiResult<T> {
  success: any;
  status: boolean;
  msg: string;
  data: T;
  error: any;
}
export interface FormResponse {
  id?: string | number;
  status: string | number | boolean;
}

export interface LoginApiI {
  username?: string;
  password: string;
  mobileNo?: string;
  deviceId?: string;
  deviceName?: string;
  deviceToken?: string;
}
export interface GenerateTokenI {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: string;
  expiresAt: Date;
}

export interface FacebookLoginI {
  accessToken: string | null;
  accessTokenSource: string | undefined;
  applicationID: string;
  dataAccessExpirationTime: number;
  declinedPermissions: string[];
  expirationTime: number;
  expiredPermissions: string[];
  lastRefreshTime: number;
  permissions: string[];
  userID: string;
}
// export interface PropertyI {
//   id: number;
//   title: string;
//   image: React.FC<SvgProps>;
//   screenName?: string;
// }

export interface CountryInterface {
  ru: string;
  lt: string;
  tr: string;
  en: string;
  flag: string;
  code: string;
  dialCode: string;
  mask: string;
}

export interface TransactionInterface {
  buyFromMalkiyat: boolean | false;
  transactionFrom: number;
  transactionTo: number;
  purchaseAmount: number;
  purchaseUnits: number;
  propertyId: number;
  paymentMethodId: number;
  proofOfPurchaseId?: number;
  proofOfDeliveryId?: number;
  orderRef: number;
  onlyCashIn: string;
  cashInAmount: number;
}
export interface MeezanTransactionInterface extends TransactionInterface {}
export interface TransactionSuccess extends TransactionInterface {
  transactionId: number;
  transactionFeeType: number;
  transactionRef: string;
  refNo: string;
  transactionStatus: number;
  transactionType: number;
  purchaseAmount: number;
}

export interface RefreshApiI {
  walletBalance: {
    walletBalance: string;
  };
  ownedSqftsWithPrice: {
    ownedSqfts: number;
    currentValue: number;
  };
  ownedProperties: Properties[];
}
export interface PropertyDetailI {
  propertyId: number;
  projectId: number;
  propertyName: string;
  address: string;
  propertyArea: string;
  latitude: number;
  longitude: number;
  totalPrice: number;
  biggerUnit: string;
  biggerUnitArea: string;
  smallerUnitArea: string;
  smallerUnit: string;
  perSmallerUnitPrice: number;
  totalAreaInSqFts: number;
  lastTransactionDateTime: number;
  soldSmallUnits: number;
  soldPercentage: string;
  propertyStatus: string;
  propertyDesc: string;
  subProperties: SubProperties[];
  propertyLogoUrl: string;
  units?: number;
  imageUrls: {
    imageUrl: string;
  }[];

  increaseLastThreeYears: number;
  propertyMapUrl: string;
  masterPlanUrl: string;
}

export interface BannerList {
  bannerDesc: string;
  bannerId: number;
  bannerImg: string;
  bannerName: string;
}

export interface DocumentsI {
  propertyMediaId: number;
  propertyId: number;
  propertyMediaUrl: string;
  mediaType: string;
  documentName: string;
}
export interface SubProperties {
  subPropertyId: number;
  currentOwnerId: number;
  plotId: number;
  propertyStatus: string;
}

export interface propertySoldHistoryI {
  sqFtSoldHistory: {
    totalSqFts: number;
    soldSmallerUnit: number;
    smallerUnit: string | null;
  };
  soldHistoryByMonths: [
    {
      month: string;
      soldSmallerUnits: number;
    }
  ];
  soldPropertiesHistories: [
    {
      firstName: string | null;
      lastName: string | null;
      soldSmallerUnit: number;
      price: number;
      dateTime: string | null;
      smallerUnitPrice: string | null;
      username?: string | null;
    }
  ];
}
export interface CountryI {
  countryId: number;
  countryName: string;
  countryCode: string;
}
export interface UserBalanceAfterTransaction {
  userId: number;
  walletBalance: number;
}
export interface HomeScreenI {
  propertyId: number;
  propertyName: string;
  imageUrls: {
    imageUrl: string;
  }[];
  pricePerSqFt: number;
  biggerUnitValue: number;
  biggerUnitArea: string;
  address: string;
  increaseLastThreeYears: number;
  soldPercentage: number;
  latitude: number;
  longitude: number;
}

export interface AboutProperty {
  aboutPropertyId: number;
  propertyId: number;
  description: string;
  iconUrl: string;
  type: string;
  active: boolean;
}
export interface PropMedia {
  propertyTitle: string;
  titleThumbnail: string;
  documentName: string;
}
export interface PropertyDetails {
  propMedia: PropMedia;
  aboutProperty: AboutProperty[];
  aboutProject: AboutProperty[];
}
export interface YearIncreaseI {
  year: Date;
  price: number;
  percentage: number;
}
export interface CustomYearIncreaseI extends YearIncreaseI {
  id: number;
  image: React.FC<SvgProps>;
  fontSize: number;
}
export interface PriceDetailsI {
  yearsIncreaseList: YearIncreaseI[];
  evaluationDocuments: {
    documentUrl: string;
    thumbnailUrl: string;
    dateTime: Date;
  }[];
}
export interface PropertySoldHistory {
  sqFtSoldHistory: {
    totalSqFts: number;
    soldSmallerUnit: number;
    smallerUnit: string;
    percentage: number;
  };
  soldHistoryByMonths: {
    month: string;
    soldSmallerUnits: string;
  }[];

  soldPropertiesHistories: {
    username: string;
    firstName: string;
    lastName: string;
    city: string;
    soldSmallerUnit: number;
    price: number;
    smallerUnitPrice: string;
    dateTime: Date;
  }[];
}
export interface PropertyLocationDetails {
  landmarksId: number;
  propertyId: number;
  iconUrl: string | null;
  iconName: string;
  description: string;
  active: boolean;
}

export interface PropertyAllDataI {
  propertyDetails: PropertyDetails;
  priceDetails: { price: any; documentDetails: any };
  propertySoldHistory: PropertySoldHistory;
  propertyLocationDetails: PropertyLocationDetails[];
  propertyIownData: UserOwnedUnitsI;
}
export interface PropertyI {
  propertyStatus: string;
  address: string;
  propertyId: number | null;
  logoUrl: string | null;
  propertyName: string | null;
  propertyAddress: string | null;
  currentValue: number | null;
  ownedSmallerUnits: number | null;
  smallerUnit: string | null;
  profitPerProperty: number | null;
  purchasePrice: number | null;
  propertyType: "commercial" | "residential";
  plotsPurchasePriceList: number[];
  profitPercentage: number | null;
  key?: string;
}
export interface UserPropertyInterface {
  code: StatusCode;
  data: {
    propertiesList: PropertyI & { buyBackCount: number | undefined }[];
    ownedUnitsTotal: number | null;
    totalProfit: number | null;
    totalProfitPercentage: number | null;
    currentTotalValue: number | null;
  };
  message: string;
}
export type transactionCategory =
  | "sold"
  | "cashin"
  | "withdraw"
  | "bought"
  | "courier_charges"
  | "stamp_paper_fee"
  | "commission"
  | "cashout";

export interface userTransactions {
  smallerUnit: number;
  transRef: unknown;
  amount: number;
  paymentName: WalletCompanies;
  iconUrl: string;
  displayName: string;
  refNo: string;
  transDateTime: string;
  category: transactionCategory;
  boughtSmallerUnit: number;
}

export interface userTransactionsDetailsI {
  feeType: any;
  transactionId: string;
  id: number;
  transactionID: number | null;
  boughtSmallerUnits: number | null;
  transactionAmount: number | null;
  transactionType: number | null;
  smallerUnit: string | null;
  transactionDate: Date;
  propertyName: string | null;
  propertyAddress: string | null;
  customerName: string | null;
  perUnitPrice: number | null;
  propertyType: string | null;
  paidBy: string | null;
  transRef: string;
  paymentName: WalletCompanies;
  transactionCategory: transactionCategory;
}

export interface userTransactionGroupBy {
  [transRef: string]: userTransactions[];
}

export interface UserTransactionHistoryI {
  walletBalance?: {
    walletBalance?: string | null;
  };
  userTransactions: userTransactions[];
}

export interface HighestOfferDataI {
  propertyId: number | null;
  totalOfferPrice: number | null;
  totalProfit: number | null;
  ownedSmallerUnits: number | null;
  totalPurchasePrice: number | null;
  totalForSaleSmallerUnits: number | null;
  perSmallerUnitSaleProfit: number | null;
  profit?: number | null;
  totalAvailableUnits?: number | null;
  highestOffer: {
    amount: number | null;
    bidOfferId: Required<number | null>;
    bidType: "buyer" | "seller";
    propId: Required<number | null>;
    smallerUnitCount: number | null;
    status: "active";
    transactionRef: string | null;
    userId: Readonly<number>;
    userName: "string";
  }[];
  perSmallerUnitPurchasePrice: number | null;
  perSmallerUnitOfferPrice: number | null;
  fairPrice: number | null;
  message: string | null;
  bidOffers: {
    userName: string | null;
    bidOfferId: number;
    propId: number | null;
    userId: number | null;
    amount: number | null;
    smallerUnitCount: number | null;
    status: "active" | "inactive";
    bidType: "buyer" | "seller";
    createdAt: Date;
    active: boolean;
    deleted: boolean;
  }[];
  userProperties: {
    currentOwnerId: number | null;
    purchasePrice: number | null;
    purchasedDate: Date;
    salePrice: number | null;
    saleStatusId: number | null;
    smallerPlotId: number | null;
    subPropertyId: number | null;
  }[];
}

export interface HighestOfferI {
  code: StatusCode;
  data: HighestOfferDataI;
  message: "Success";
}

export interface EventMessageI {
  highestOfferAmount: number | null;
  totalForSaleSmallerUnits: number | null;
  peopleCount: number | null;
  message: string | null;
  propertyId: number | null;
}
// export interface MessageInterface {
//   body: HighestOfferI;
//   headers: Headers;
//   statusCode: string;
//   statusCodeValue: StatusCode;
// }

export interface SellSqftsI {
  transactionFrom: number;
  bidIds: number[];
  propertyId: number;
  quantity: number;
  type: "seller" | "buyer";
}
export interface CreateBidI {
  propId: number;
  userId: number;
  amount: number;
  smallerUnitCount: number;
  status: "active" | "completed" | "inactive";
  bidType: "buyer" | "seller";
  days: number;
  months: number;
}
export interface CreateBidResponseI {
  bidOfferId: number;
  propId: number;
  userId: number;
  amount: number;
  smallerUnitCount: number;
  status: string;
  bidType: string;
  transactionRef: string;
  userName: string;
  initialCount: number;
  expiryDate: string | null;
  days: number;
  months: number;
  active: boolean;
}

export interface LowestBidResponseI {
  totalAvailableUnits: any;
  totalSmallerUnits: number | null;
  lowestOffer: {
    bidOfferId: number;
    propId: number;
    userId: number;
    smallerUnitCount: number;
    amount: number;
    status: "active" | "inactive";
    bidType: "seller";
    transactionRef: string;
    userName: string;
  }[];
  message: string;
  bidOffers: {
    bidOfferId: number;
    propId: number;
    userId: number;
    smallerUnitCount: number;
    amount: number;
    status: "active" | "inactive";
    bidType: "seller";
    transactionRef: string;
    userName: string;
  }[];
  minimumSmallerUnitOfferPrice: number;
  totalPayableAmount: number;
  userBalance: number;
}
export interface LowerBidMessageI {
  totalSmallerUnits: number;
  minimumSmallerUnitOfferPrice: number;
  message: string;
  propertyId: number;
  bidType: "seller" | "buyer";
}
export type ModalType =
  | "Error"
  | "Info"
  | "KYC"
  | "MARKETPLACE"
  | "SESSION_OUT";
export interface ErrorModalInterface {
  modal_type: ModalType;
  show: boolean;
  errorMessage: string | undefined;
}
export interface MyAdsInterface {
  bidId: number;
  propertyId: number;
  propertyName: string;
  propertyType: string;
  address: string;
  logoUrl: string;
  smallerUnits: number;
  offerPrice: number;
  lastSqFtSoldPrice: number;
  cancelDateTime: Date;
  bidType: "seller" | "buyer";
  status: "active" | "inactive" | "cancelled" | "inProgress";
}

export interface UserOwnedUnitsI {
  lastThreeYearIncrease: number;
  purchaseHistory: {
    boughtSmallerUnit: string;
    refNo: string;
    category: transactionCategory;
    amount: string;
    displayName: string;
    paymentName: WalletCompanies;
    transDateTime: Date;
  }[];
  OwnedSmallerUnits: number;
  profit: number;
  currentValue: number;
  transactionsCount: string;
  sqFtIncrease: number;
  purchasePrice: number;
}
export interface BankListI {
  id: Required<number>;
  accTitle: string;
  iban: string;
  bankName: string;
  branchAndCode: string;
  note: string;
  active: true | false;
}
export interface TransactionInProcessingI {
  accNo: number | null;
  accTitle: string | null;
  address: string | null;
  amount: number | null;
  bankName: string | null;
  createdDate: Date;
  expiryDate: Date;
  paymentName: string;
  paymentType: string;
  refNo: string;
  status: string;
  supportNumber: string | null;
  iconUrl: string;
}

export interface BuyBackDetailsI {
  propertyId: number;
  propertyName: string;
  ownedUnits: number;
  expiryDate: Date;
  iconUrl: string;
  address: string;
  smallerUnit: string;
  purchasedDate: string;
}
export interface BuyBackPropertyListI {
  propertyName: string;
  ownedUnits: number;
  purchasedPrice: number;
  expiryDate: Date;
  iconUrl: string;
  address: string;
  smallerUnit: string;
  propertyId: number;
  purchasedDate: string;
}
export interface BuyBackResponseI {
  active: boolean;
  deleted: boolean;
  paymentMethodId: number;
  purchaseAmount: number;
  refNo: string;
  transAction: string;
  transactionDateTime: Date;
  transactionFeeType: number;
  transactionFrom: number;
  transactionId: number;
  transactionRef: string;
  transactionStatus: number;
  transactionTo: number;
  transactionType: number;
}

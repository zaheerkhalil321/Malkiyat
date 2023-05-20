export type AuthStackI = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  SplashScreen: undefined;
  ForgotScreen: undefined;
  CheckEmail: undefined;
  ResetPassword: undefined;
  OTPVerification: undefined;
  VerificationScreen: undefined;
};

export type UnregisterUserStackI = {
  HomeView: undefined;
  TopNavigationBar: undefined;
  Location: undefined;
  MalkiyatDocuments: undefined;
  PropertyFurtherDetail: undefined;
  PropertySale: undefined;
  PropertyHistory: undefined;
  BuyNow: undefined;
  Payment: undefined;
  UnregisterBuyNow: undefined;
  SellFt: undefined;
  ComingSoon: undefined;
  UnregisterBuyNowVal: undefined;
  ProofPurchase: undefined;
  Processing: undefined;
  Congrates: undefined;
  Info: undefined;
  SelectCountry: undefined;
  Kyc: undefined;
  KycUpload: undefined;
  KycPakistan: undefined;
  HavePakistani: undefined;
  CNIC: undefined;
  UploadPicture: undefined;
  CNICback: undefined;
  Confirmation: undefined;
  Gif: undefined;
  EnterId: undefined;
  BSecurePayment: undefined;
};
export type RegisterUserStackI = {
  RegisterHome: undefined;
  MySqFt: undefined;
  TransactionHistory: undefined;
  SellSqft: undefined;
  SellSqftCalculation: undefined;
  SellDetails: undefined;
  Review: undefined;
  Congrate: undefined;
  Advertise: undefined;
  AdvertiseStep2: undefined;
  AdvertiseStep3: undefined;
  AdvertiseReview: undefined;
  AdvertiseCongrate: undefined;
  LowerOffer: undefined;
  BuySqftCalculation: undefined;
  BuyDetails: undefined;
  RegisterBuyNowStack: undefined;
  HomeDrawer: undefined;
  MyAds: undefined;
  MyAdsReview: undefined;
  MyAdsCongrate: undefined;
  ChangePassword: undefined;
  Help: undefined;
  Privacy: undefined;
  Feedback: undefined;
  Notifications: undefined;
  Account: undefined;
  Wallet: undefined;
  CashIn: undefined;
  SellToMalkiyat: undefined;
  Webview: undefined;
  MalkiyatReview: undefined;
  MalkiyatCongrates: undefined;
  PayPro: { amount: number };
  ReviewDetails: undefined;
  Voucher: undefined;
  AllVouchers: undefined;
  Trends: undefined;
  RegisterBSecurePayment: undefined;
};
export type RegisterBuyNowStackI = {
  RegisterTiles: undefined;
  RegisterBuyNowStep1: undefined;
  RegisterProofPurchase: undefined;
  RegisterPayment: undefined;
  RegisterTopNavigationBar: undefined;
  RegisterProofOfProcessing: undefined;
};
export type RegisterUserDrawerStackI = {
  RegisterHome: undefined;
};

export type DashBoardI = {
  UnregisterUserStack: UnregisterUserStackI;
  RegisterUserStack: RegisterUserStackI;
};

export type WalkThroughI = {
  WalkThrough: undefined;
};

export type MainStack = {
  DashBoardStack: DashBoardI;
  AuthStack: AuthStackI;
  SlideWalkthrough: undefined;
  PDFView: undefined;
  MalkiyatPossible: undefined;
};

export type WalletStack = {
  Wallet: undefined;
};

export type MarketStack = {
  Market: undefined;
};

export type AdvanceStack = {
  Advance: undefined;
};

export type BotomTabI = {
  HomeTab: DashBoardI;
  WalletTab: WalletStack;
  MarketTab: MarketStack;
  AdvanceTab: AdvanceStack;
};

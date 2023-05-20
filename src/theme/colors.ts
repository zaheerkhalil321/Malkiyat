import { ExtendedTheme } from "@react-navigation/native";
const DefaultTheme: ExtendedTheme = {
  dark: false,
  colors: {
    Primary: "#3578DB",
    Secondary: "#19959E",
    TextColor: "#3B4161",
    Alert: "#DB1A00",
    Pending: "#FAAD39",
    TitleText: "#1D2029",
    PlaceHolderText: "#9598AA",
    BorderColor: "#EBECEF",
    homeInfoComponent: {
      backgroundColor: "white",
      textColor: "#3B4161",
      mainText: "black",
    },
    defaultColor: "#F4F4F4",
  },
};
const DarkTheme: ExtendedTheme = {
  dark: false,
  colors: {
    Primary: "black",
    Secondary: "black",
    TextColor: "#3B4161",
    Alert: "#DB1A00",
    Pending: "#FAAD39",
    TitleText: "#1D2029",
    PlaceHolderText: "#9598AA",
    BorderColor: "#EBECEF",
    homeInfoComponent: {
      backgroundColor: "black",
      textColor: "#3B4161",
      mainText: "black",
    },
    defaultColor: "#F4F4F4",
  },
};

export { DefaultTheme, DarkTheme };

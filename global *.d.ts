import "@react-navigation/native";

// Override the theme in react native navigation to accept our custom theme props.

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      Primary: string;
      Secondary: string;
      TextColor: string;
      Alert: string;
      Pending: string;
      TitleText: string;
      PlaceHolderText: string;
      BorderColor: string;
      homeInfoComponent: {
        backgroundColor: string;
        textColor: string;
        mainText: string;
      };
      defaultColor: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}

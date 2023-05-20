import React from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/src/types";
import DeviceInfo from "react-native-device-info";
import { SvgProps } from "react-native-svg";

import { wp } from "@src/components/common/Responsive";

import InactiveHomeSvg from "@src/assets/images/DrawerIcons/inactive/home.svg";
import InactiveWalletSvg from "@src/assets/images/DrawerIcons/inactive/wallet.svg";
import InactiveBuySellSvg from "@src/assets/images/DrawerIcons/inactive/buysell.svg";
import InactiveMoreSvg from "@src/assets/images/DrawerIcons/inactive/more.svg";
import ActiveHomeSvg from "@src/assets/images/DrawerIcons/active/home.svg";
import ActiveWalletSvg from "@src/assets/images/DrawerIcons/active/wallet.svg";
import ActiveBuySellSvg from "@src/assets/images/DrawerIcons/active/buysell.svg";
import ActiveMoreSvg from "@src/assets/images/DrawerIcons/active/more.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";

interface customTabI {
  name: string;
  router: string;
  activeimg: React.FC<SvgProps>;
  inactiveImg: React.FC<SvgProps>;
}

const BottomTab: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  ...rest
}) => {
  const data: customTabI[] = [
    {
      name: "Home",
      router: "Home",
      activeimg: ActiveHomeSvg,
      inactiveImg: InactiveHomeSvg,
    },
    {
      name: "Sell your Sqft",
      router: "Market",
      activeimg: ActiveBuySellSvg,
      inactiveImg: InactiveBuySellSvg,
    },
    {
      name: "Wallet",
      router: "Wallet",
      activeimg: ActiveWalletSvg,
      inactiveImg: InactiveWalletSvg,
    },
    {
      name: "Advance",
      router: "Advance",
      activeimg: ActiveMoreSvg,
      inactiveImg: InactiveMoreSvg,
    },
  ];
  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      {data.map((tab, index) => (
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: wp(2),
          }}
          onPress={() => navigation.navigate(tab.router)}
          key={index}
        >
          {state.index == index ? (
            <tab.activeimg width={20} height={20} />
          ) : (
            <tab.inactiveImg width={20} height={20} />
          )}
          <ResponsiveText
            style={{
              color: state.index == index ? "black" : "#3B4161",
              fontSize: 3,
            }}
          >
            {tab.name}
          </ResponsiveText>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};
export default BottomTab;

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RegisterUserDrawerStackI } from "@src/navigation/RootStackParams";

import RegisterHome from "@src/screens/dashboard/homeV2/registerhome/RegisterHome";
import SideBar from "@src/containers/Drawer";
import { Dimensions } from "react-native";
import { wp } from "@src/components/common/Responsive";

const { Navigator, Screen } = createDrawerNavigator<RegisterUserDrawerStackI>();

const HomeDrawer: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('window').width / 1.1,
        },
      }}
      useLegacyImplementation={false}
      drawerContent={(props) => <SideBar {...props} />

      }
    >
      <Screen component={RegisterHome} name="RegisterHome" />
    </Navigator>
  );
};

export default HomeDrawer;

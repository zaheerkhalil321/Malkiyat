import { View, Switch } from "react-native";
import React, { useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";

const Notifications = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Notifications"}

      />
      <View style={{ marginHorizontal: wp(5), marginVertical: wp(5) }}>
        <ResponsiveText
          style={{ fontSize: 6.4, fontFamily: Fonts.ManropeBold }}
        >
          Change Settings
        </ResponsiveText>
        <View
          style={{
            marginVertical: wp(3),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ResponsiveText style={{ color: "#ABB4BD" }}>
            Turn notifications on or off.{" "}
          </ResponsiveText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </Container>
  );
};

export default Notifications;

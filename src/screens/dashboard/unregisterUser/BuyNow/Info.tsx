import { View, TouchableOpacity } from "react-native";
import React from "react";
import { CommonActions } from "@react-navigation/native";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Fonts from "@src/theme/fonts";
import ProfileSvg from "@src/assets/images/HomeIcons/Profile.svg";
import TickIcon from "@src/assets/images/congrate_tick.svg";
import { RegisterUserType } from "@src/redux/action-types";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
const Info = (props) => {
  const dispatch = useSafeDispatch();
  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={false}
        {...props}
        title={"Malkiyat"}
        label={"Login"}
        icon={<ProfileSvg strokeWidth={10} width={wp(5)} height={wp(5)} />}
      />
      <View style={{ alignItems: "center", marginTop: wp(10) }}>
        <TickIcon />
        <ResponsiveText
          style={{
            fontSize: 4.5,
            fontFamily: Fonts.ManropeSemiBold,
            textAlign: "center",
            marginVertical: wp(5),
          }}
        >
          Your information is being reviewed.
        </ResponsiveText>
      </View>

      <ResponsiveText
        style={{
          marginHorizontal: wp(10),
          fontSize: 4.5,
          fontFamily: Fonts.ManropeSemiBold,
          textAlign: "center",
        }}
      >
        Proof of ownership will be issued shortly which normally doesn't take
        more than 3 working days
      </ResponsiveText>
      <View style={{ alignItems: "center", marginTop: wp(10) }}>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: RegisterUserType.REMOVE_USER_DATA });
            setTimeout(() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "HomeView",
                    },
                  ],
                })
              );
            }, 200);
          }}
          style={{
            width: wp(35),
            height: wp(12),
            borderRadius: wp(10),
            backgroundColor: "#3577DB",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveText
            style={{ color: "white", fontWeight: "bold", fontSize: 3 }}
          >
            GO TO HOME
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Info;

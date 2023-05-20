import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import { RootState } from "@src/redux/reducers";

const Processing = (props) => {
  const [loading, setLoading] = useState(true);
  const reducerState = useSelector((state: RootState) => state.registerUser);
  const units = reducerState.selectedTileData.units;
  useEffect(() => {
    if (!loading) {
      props.navigation.navigate("Congrates", {
        units: units,
        amount: props.route?.params?.amount,
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [
    //       {
    //         name: "Congrates",
    //         params: { units },
    //       },
    //     ],
    //   })
    // );
  }, [setLoading, loading]);

  return (
    <Container>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <LottieView
          style={{ width: wp(30), height: wp(50) }}
          source={require("@src/assets/lottie/loader.json")}
          autoPlay
          loop
        />
        <ResponsiveText
          style={{ fontSize: 5, fontFamily: Fonts.ManropeSemiBold }}
        >
          Please Wait
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontSize: 7,
            fontFamily: Fonts.ManropeSemiBold,
            marginTop: wp(3),
          }}
        >
          Processing...
        </ResponsiveText>
      </View>
    </Container>
  );
};

export default Processing;

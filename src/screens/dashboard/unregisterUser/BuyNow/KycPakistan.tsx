import { Alert, BackHandler, View } from "react-native";
import React, { useEffect, useState } from "react";

import Container from "@src/components/common/Container";
import IdIcon from "@src/assets/images/id_icon.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";
import BottomButtons from "@src/components/common/BottomButtons";
import Radiobuttons from "@src/components/common/Radiobuttons";
import { wp } from "@src/components/common/Responsive";
import { store } from "@src/redux";
import { removeModalType } from "@src/redux/action-creators";
import { handleSessionOutNavigation } from "@src/utils/helperFunction";

const KycPakistan = (props) => {
  // props.navigation.goBack();
  const [radioBtns, setRadioBtns] = useState<{
    radio1: boolean;
    radio2: boolean;
  }>({ radio1: true, radio2: false });

  // useEffect(
  //   () =>
  //     props.navigation.addListener("beforeRemove", (e) => {
  //       if (
  //         store.getState().authReducer.errorModal.modal_type == "SESSION_OUT"
  //       ) {
  //         console.log("inside");

  //         store.dispatch(removeModalType() as any);
  //         // return handleSessionOutNavigation();
  //       } else {
  //         e.preventDefault();
  //         props.navigation.navigate("RegisterUserStack");
  //       }
  //     }),
  //   [props.navigation]
  // );
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <Container>
      <View
        style={{
          flex: 1,
          marginTop: wp(15),
          paddingHorizontal: wp(5),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <IdIcon />
        </View>

        <ResponsiveText
          style={{
            fontSize: 5.33,
            marginTop: wp(10),
            marginBottom: wp(5),
            textAlign: "center",
          }}
        >
          Do you have Pakistani ID / NICOP?
        </ResponsiveText>
        <Radiobuttons
          check={radioBtns.radio1}
          setRadioBtns={() => setRadioBtns({ radio1: true, radio2: false })}
          title={"Yes"}
        />
        <View style={{ marginTop: wp(5) }}>
          <Radiobuttons
            check={radioBtns.radio2}
            setRadioBtns={() => setRadioBtns({ radio1: false, radio2: true })}
            title={"No"}
          />
        </View>
      </View>

      <BottomButtons
        onPressLater={() => {
          props.navigation.push("RegisterUserStack", { screenName: 'HomeDrawer' });
        }}
        img={"clickable"}
        onPress={() => {
          props.navigation.navigate(
            radioBtns.radio1 ? "HavePakistani" : "SelectCountry"
          );
        }}
      />
    </Container>
  );
};

export default KycPakistan;

function backAction(): boolean | null | undefined {
  return true;
}

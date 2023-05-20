import { View } from "react-native";
import React, { useState } from "react";

import Container from "@src/components/common/Container";
import Step from "@src/assets/images/pak_step1.svg";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import SheildIcon from "@src/assets/images/Sheild.svg";
import { useTheme } from "@react-navigation/native";
import ResponsiveText from "@src/components/common/ResponseiveText";
import BottomButtons from "@src/components/common/BottomButtons";
import Radiobuttons from "@src/components/common/Radiobuttons";

const HavePakistani = (props) => {
  const { colors } = useTheme();
  const [radioBtns, setRadioBtns] = useState<{
    radio1: boolean;
    radio2: boolean;
  }>({ radio1: true, radio2: false });
  function handleNavigation() {
    props.navigation.push("RegisterUserStack", { screenName: 'HomeDrawer' });
  }
  return (
    <Container style={{ backgroundColor: "white" }}>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Malkiyat"}
      />
      <View
        style={{
          paddingTop: wp(1.5),
          alignItems: "center",
        }}
      >
        <Step />
      </View>
      {/* <Content style={{ backgroundColor: "white" }}> */}
      <View style={{ paddingHorizontal: wp(5), flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            borderColor: colors.Primary,
            borderWidth: 0.8,
            borderRadius: wp(2),
            paddingHorizontal: wp(3),
            paddingVertical: wp(5),
            marginVertical: wp(5),
          }}
        >
          <View style={{ alignItems: "center", marginBottom: wp(6) }}>
            <SheildIcon />
          </View>

          <ResponsiveText style={{ fontSize: 5.33, marginBottom: wp(5) }}>
            What would you like to upload?
          </ResponsiveText>
          <Radiobuttons
            check={radioBtns.radio1}
            setRadioBtns={() => setRadioBtns({ radio1: true, radio2: false })}
            dis
            title={"My Picture"}
          />
          <View style={{ marginTop: wp(5) }}>
            <Radiobuttons
              check={radioBtns.radio2}
              setRadioBtns={() => setRadioBtns({ radio1: false, radio2: true })}
              title={"CNIC / NICOP"}
            />
          </View>
        </View>
      </View>
      {/* </Content> */}
      <View>
        <BottomButtons
          onPressLater={() => handleNavigation()}
          img={"clickable"}
          onPress={() => {
            props.navigation.navigate(
              radioBtns.radio1 ? "UploadPicture" : "CNIC"
            );
          }}
        />
      </View>
    </Container>
  );
};

export default HavePakistani;

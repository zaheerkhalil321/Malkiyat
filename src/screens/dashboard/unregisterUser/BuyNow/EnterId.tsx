import { View, Alert } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { FloatingLabelInput } from "react-native-floating-label-input";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import GroupSvg from "@src/assets/images/svg/Group.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { handleDocumentsUpload } from "@src/services/RestApiCalls";
import Loader from "@src/components/ui/loader/Loader";
import BottomButtons from "@src/components/common/BottomButtons";
import Content from "@src/components/common/Content";

const EnterId = (props) => {
  const { colors } = useTheme();
  const [cnic, setCnic] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleSubmit = async () => {
    const withoutMaskCinic = cnic!.replace(/-/g, "");

    if (withoutMaskCinic.trim().length < 13) {
      Alert.alert("Please enter valid cnic number!");
    } else {
      setLoading(true);

      const res: any = await handleDocumentsUpload(cnic);
      if (res) {
        setLoading(false);
        //Navigate
        props.navigation.navigate("Confirmation");
      } else {
        setLoading(false);
        Alert.alert("Something went wrong!");
      }
    }
  };
  function handleNavigation() {
    props.navigation.push("RegisterUserStack", { screenName: 'HomeDrawer' });
  }
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Loader visible={loading} />
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Malkiyat"}
      />
      <Content
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <GroupSvg style={{ alignSelf: "center", marginTop: wp(20) }} />
        <ResponsiveText
          style={{
            color: "#323232",
            fontFamily: Fonts.ManropeRegular,
            fontSize: 5,
            marginHorizontal: wp(5),
            flexWrap: "wrap",
            marginTop: wp(10),
          }}
        >
          Please enter your 13 digit CNIC / NICOP
        </ResponsiveText>
        <FloatingLabelInput
          onSubmit={handleSubmit}
          label={"CNIC"}
          value={cnic}
          keyboardType="numeric"
          staticLabel
          hintTextColor={"#aaa"}
          mask="99999-9999999-9"
          hint="35201-7556315-5"
          containerStyles={{
            borderWidth: 1,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            //   borderColor: "#EEEEEE",
            borderRadius: 8,
            height: wp(12),
            width: wp(40),
            marginTop: wp(7),
            marginHorizontal: wp(5),
          }}
          customLabelStyles={{
            colorFocused: colors.Primary,
            fontSizeFocused: 12,
            colorBlurred: colors.Primary,
          }}
          labelStyles={{
            backgroundColor: "#fff",
            paddingHorizontal: 5,
            marginTop: wp(7),
            marginLeft: wp(5),
            fontFamily: Fonts.ManropeBold,
          }}
          inputStyles={{
            color: "black",
            paddingHorizontal: 10,
          }}
          onChangeText={(value) => {
            setCnic(value);
          }}
        />
        <View
          style={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <BottomButtons
            onPressLater={() => handleNavigation()}
            onPress={handleSubmit}
            img={cnic}
          />
        </View>
      </Content>
    </Container>
  );
};

export default EnterId;

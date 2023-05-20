import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { launchCamera, CameraOptions } from "react-native-image-picker";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import Step from "@src/assets/images/Stepper.svg";
import { useTheme } from "@react-navigation/native";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import SheildIcon from "@src/assets/images/Sheild.svg";
import Camera from "@src/assets/images/camera_i.svg";
import KycCamera from "@src/assets/images/kyc_camera.svg";
import BottomButtons from "@src/components/common/BottomButtons";

import { Cache } from "@src/utils/cacheFunc";
const SelectCountry = (props) => {
  const { colors } = useTheme();

  const [img, setImg] = useState<string | undefined>(undefined);

  const openCamera = () => {
    var options: CameraOptions = {
      mediaType: "photo",
      cameraType: "front",
      includeBase64: true,
    };
    try {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.error(response.errorMessage, "error Maessage");
        } else {
          response.assets?.map((e) => {
            setImg(e.base64);
          });
        }
      }).then(() => console.log("close"));
    } catch (err) {
      console.warn(err);
    }
  };
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
      <Content style={{ backgroundColor: "white" }}>
        <View style={{ paddingHorizontal: wp(5) }}>
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
            {!img && (
              <View style={{ alignItems: "center", marginBottom: wp(6) }}>
                <SheildIcon />
              </View>
            )}

            <ResponsiveText style={{ fontSize: 5.33 }}>
              For your protection, we print your picture on Proof of Purchase
            </ResponsiveText>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={openCamera}
              style={{
                backgroundColor: "white",
                borderColor: "#00B9F7",
                borderWidth: 0.8,
                borderRadius: wp(10),
                // paddingHorizontal: wp(3),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: wp(10.4),
                marginTop: wp(5),
              }}
            >
              <Camera />
              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#00B9F7",
                  marginLeft: wp(3),
                }}
              >
                Take a selfie
              </ResponsiveText>
            </TouchableOpacity>
            <ResponsiveText
              style={{
                fontSize: 3.2,
                textAlign: "center",
                marginTop: wp(1),
                marginBottom: wp(3),
                color: "#666666",
              }}
            >
              Maximum file size: 2MB
            </ResponsiveText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={openCamera}
              style={{
                // paddingLeft: 20,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {img ? (
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${img}`,
                  }}
                  style={{
                    height: wp(66),
                    width: "100%",
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={{
                    height: wp(66.13),
                    marginBottom: 10,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#00B9F7",
                    borderTopColor: "#00B9F7",
                    borderRadius: 10,
                    backgroundColor: "#F2FAFD",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <KycCamera />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Content>
      <View>
        <BottomButtons
          onPressLater={() => handleNavigation()}
          img={img}
          onPress={() => {
            Cache({ type: "selfieImg", img });
            props.navigation.navigate("KycUpload");
          }}
        />
      </View>
    </Container>
  );
};

export default SelectCountry;
{
  /* <View
              style={{
                borderColor: "#EEEEEE",
                borderWidth: 1,
                borderRadius: 5,
                height: wp(13),
              }}
            >
              <ResponsiveText
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  top: -10,
                  left: 9,
                  paddingHorizontal: 7,
                  color: "#959595",
                  fontSize: 3.5,
                }}
              >
                Identity document issued by
              </ResponsiveText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <IntlPhoneInput
                    customeCountryList={countries}
                    showInput={false}
                    ref={ref}
                    onChangeCountry={(country: CountryInterface) => {
                      setSelectedCountry(country.en);
                    }}
                    onChangeText={(data: any) => {
                      // onChange(name)(text.unmaskedPhoneNumber);
                    }}
                    defaultCountry="PK"
                  />
                  <TouchableOpacity onPress={() => ref.current!.showModal()}>
                    <ResponsiveText style={{ marginTop: -1 }}>
                      {selctedCountry}
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => ref.current!.showModal()}
                  style={{
                    justifyContent: "center",
                    marginRight: wp(2),
                    width: 30,
                    height: 30,
                  }}
                >
                  <DownIcon width={wp(2.5)} height={wp(2.5)} />
                </TouchableOpacity>
              </View>
            </View> */
}

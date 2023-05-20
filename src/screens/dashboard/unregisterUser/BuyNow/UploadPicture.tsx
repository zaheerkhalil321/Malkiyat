import { View, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import Step from "@src/assets/images/uplload_pak.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import SheildIcon from "@src/assets/images/upload_pakPro.svg";
import Camera from "@src/assets/images/download_1.svg";
import KycCamera from "@src/assets/images/download_2.svg";
import BottomButtons from "@src/components/common/BottomButtons";
import Camera2 from "@src/assets/images/camera_i.svg";
import { Cache } from "@src/utils/cacheFunc";

const UploadPicture = (props) => {
  const { colors } = useTheme();
  const [img, setImg] = useState<string | undefined>(undefined);
  const openCamera = () => {
    var options: CameraOptions = {
      mediaType: "photo",
      cameraType: "front",
      includeBase64: true,
      quality: 0.5,
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
  function openImagePicker() {
    var options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: true,
      includeExtra: true,
      quality: 0.5,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else {
        const IMAGE_SIZE = response.assets![0]?.fileSize! / 1000000;
        if (IMAGE_SIZE > 2) {
          console.warn(IMAGE_SIZE);
          Alert.alert("Image Size cannot be more then 2 mb!");
        } else {
          response.assets?.map((e) => {
            setImg(e.base64);
          });
        }
      }
    });
  }
  function handleNavigation() {
    props.navigation.push("RegisterUserStack", { screenName: "HomeDrawer" });
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
              Please upload your picture that you would like to see on Proof of
              Purchase
            </ResponsiveText>

            <View
              style={{
                flexDirection: "row",
                marginTop: wp(5),
                justifyContent: "space-between",
                marginBottom: wp(2),
              }}
            >
              <TouchableOpacity
                onPress={openImagePicker}
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
                  width: wp(37.07),
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
                  Browse File
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
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
                  width: wp(41.6),
                }}
              >
                <Camera2 />
                <ResponsiveText
                  style={{
                    fontSize: 3.73,
                    fontFamily: Fonts.ManropeSemiBold,
                    color: "#00B9F7",
                    marginLeft: wp(3),
                  }}
                >
                  Take a Picture
                </ResponsiveText>
              </TouchableOpacity>
            </View>

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
              <TouchableOpacity
                style={{
                  paddingLeft: 20,
                  height: wp(66.13),
                  marginBottom: 10,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#00B9F7",
                  borderTopColor: "#00B9F7",
                  borderRadius: 10,
                  backgroundColor: "#F2FAFD",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KycCamera />
              </TouchableOpacity>
            )}
            {/* <ResponsiveText
              style={{
                color: "#9E9E9E",
                fontSize: 3.2,
                width: wp(80),
                marginTop: wp(1),
              }}
            >
              Please ensure that the document is not cropped, covered or
              blurred.
            </ResponsiveText> */}
          </View>
        </View>
      </Content>
      <View>
        <BottomButtons
          onPressLater={() => handleNavigation()}
          onPress={() => {
            Cache({ type: "selfieImg", img });
            props.navigation.navigate("Gif");
          }}
          img={img}
        />
      </View>
    </Container>
  );
};

export default UploadPicture;

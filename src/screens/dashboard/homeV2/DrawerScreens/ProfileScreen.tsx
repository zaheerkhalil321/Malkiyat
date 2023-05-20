import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import CameraIcon from "@src/assets/images/camera_profile.svg";
import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Fonts from "@src/theme/fonts";
import Camera2 from "@src/assets/images/camera_i.svg";
import Camera from "@src/assets/images/download_1.svg";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import Loader from "@src/components/ui/loader/Loader";
import FastImage from "react-native-fast-image";
const ProfileScreen = (props) => {
  const [emailEdit, setEmailEdit] = useState(true);
  const [addressEdit, setAddressEdit] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(false);

  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  const [profileObj, setProfileObj] = useState({
    userId: registerUserData?.userInfo?.userId,
    picture: "0",
    email: registerUserData?.userInfo?.email,
    address: registerUserData?.userInfo?.address,
  });

  const dispatch = useSafeDispatch();
  const handleClick = async () => {
    setLoading(true);
    const res = await MRegisterUserApiService.sendCashOutOtp(
      Number(registerUserData.userInfo?.userId!)
    );
    if (res.data.code == 200) {
      setLoading(false);
      props.navigation.navigate("OTPDrawer", {
        phone: registerUserData.userInfo?.mobileNo,
        profileObj: {
          ...profileObj,
          picture: "0",
        },
      });
    } else {
      setLoading(false);
    }
  };
  const fullName = String(
    registerUserData?.userInfo?.firstName! +
      " " +
      registerUserData?.userInfo?.lastName
  );

  const openCamera = () => {
    var options: CameraOptions = {
      mediaType: "photo",
      cameraType: "front",
      includeBase64: true,
    };
    setModalVisible(false);
    try {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.error(response.errorMessage, "error Maessage");
        } else {
          const obj = {
            ...profileObj,
            picture: response!.assets![0]!.base64!,
          };
          dispatch(MRegisterUserApiService.userProfileApi(obj));
          response.assets?.map((e) => {
            setProfileObj((item) => ({
              ...item,
              picture: e.base64!,
            }));
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
    };
    setModalVisible(false);
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else {
        const IMAGE_SIZE = response.assets![0]?.fileSize! / 1000000;
        if (IMAGE_SIZE > 2) {
          console.warn(IMAGE_SIZE);
          Alert.alert("Image Size cannot be more then 2 mb!");
        } else {
          const obj = {
            ...profileObj,
            picture: response!.assets![0]!.base64!,
          };
          dispatch(MRegisterUserApiService.userProfileApi(obj));
          response.assets?.map((e) => {
            setProfileObj((item) => ({
              ...item,
              picture: e.base64!,
            }));
          });
        }
      }
    });
  }
  const registerProfileData = useSelector(
    (state: RootState) => state.registerUser.userProfileData
  );
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"My Profile"}
      />
      <Content>
        <View
          style={{
            alignItems: "center",
            marginTop: wp(10),
            marginBottom: wp(5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <FastImage
              source={{
                uri: registerUserData?.userInfo?.profilePic!,
              }}
              style={{
                backgroundColor: "#C4C4C4",
                width: wp(26.93),
                height: wp(26.93),
                borderRadius: wp(22),
                borderWidth: 0.5,
                borderColor: "#C4C4C4",
              }}
              resizeMode="cover"
            />
            <View style={{ position: "absolute", bottom: 5, right: 5 }}>
              <CameraIcon width={wp(6.4)} height={wp(6.4)} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: wp(5) }}>
          <ResponsiveText style={{ color: "#454545", fontSize: 3.2 }}>
            Full Name
          </ResponsiveText>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#D9D9D9",
              padding: wp(3),
              borderRadius: wp(3),
              marginTop: wp(3),
              paddingLeft: wp(7),
            }}
          >
            <ResponsiveText style={{ color: "#BDBDBD", fontSize: 3.73 }}>
              {fullName}
            </ResponsiveText>
          </View>
          <ResponsiveText
            style={{ color: "#454545", fontSize: 3.2, marginTop: wp(5) }}
          >
            Mobile No.
          </ResponsiveText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#D9D9D9",
                padding: wp(3),
                borderRadius: wp(3),
                marginTop: wp(3),
                width: wp(20.53),
                paddingLeft: wp(6),
              }}
            >
              <ResponsiveText style={{ color: "#BDBDBD", fontSize: 3.73 }}>
                +92
              </ResponsiveText>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#D9D9D9",
                padding: wp(3),
                borderRadius: wp(3),
                marginTop: wp(3),
                width: wp(65.07),
                paddingLeft: wp(10),
              }}
            >
              <ResponsiveText style={{ color: "#BDBDBD", fontSize: 3.73 }}>
                {registerUserData.userInfo?.mobileNo?.toString().slice(1)}
              </ResponsiveText>
            </View>
          </View>
          <ResponsiveText
            style={{ color: "#454545", fontSize: 3.2, marginTop: wp(5) }}
          >
            CNIC No.
          </ResponsiveText>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#D9D9D9",
              padding: wp(3),
              borderRadius: wp(3),
              marginTop: wp(3),
              paddingLeft: wp(7),
            }}
          >
            <ResponsiveText style={{ color: "#BDBDBD", fontSize: 3.73 }}>
              {registerUserData?.userInfo?.cnic ?? ""}
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: wp(5),
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{ color: "#454545", fontSize: 3.2 }}>
              Email
            </ResponsiveText>
            {/* <TouchableOpacity
                            onPress={() => {
                                setEmailEdit(!emailEdit)
                            }}
                        >
                            <ResponsiveText style={{ color: '#ABB4BD', fontSize: 3.2, textDecorationLine: 'underline' }}>Edit</ResponsiveText>
                        </TouchableOpacity> */}
          </View>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: emailEdit ? "#D9D9D9" : "#2BACE3",
              padding: wp(3),
              borderRadius: wp(3),
              marginTop: wp(3),
              paddingLeft: wp(7),
            }}
            // editable={!emailEdit}
            placeholder={"Enter Email"}
            onChangeText={(text) => {
              // text = text.replace(".", "");
              setProfileObj((item) => ({
                ...item,
                email: text,
              }));
            }}
            value={profileObj.email ?? ""}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: wp(5),
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{ color: "#454545", fontSize: 3.2 }}>
              Address
            </ResponsiveText>
            {/* <TouchableOpacity
                            onPress={() => {
                                setAddressEdit(!addressEdit)
                            }}
                        >
                            <ResponsiveText style={{ color: '#ABB4BD', fontSize: 3.2, textDecorationLine: 'underline' }}>Edit</ResponsiveText>
                        </TouchableOpacity> */}
          </View>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: addressEdit ? "#D9D9D9" : "#2BACE3",
              padding: wp(3),
              borderRadius: wp(3),
              marginTop: wp(3),
              paddingLeft: wp(7),
            }}
            placeholder={"Enter your address"}
            onChangeText={(text) => {
              text = text.replace(".", "");
              setProfileObj((item) => ({
                ...item,
                address: text,
              }));
            }}
            value={profileObj.address ?? ""}
          />
          <TouchableOpacity
            onPress={handleClick}
            // onPress={() => {
            //     const res: any = dispatch(
            //         MRegisterUserApiService.userProfileApi(profileObj)
            //     );

            //     console.log(res, "profileRespone");
            // }}
            disabled={handleBtnDisabled(profileObj)}
            style={{
              backgroundColor: handleBtnDisabled(profileObj)
                ? "#dedede"
                : "#2BACE3",
              height: wp(12.27),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              marginTop: wp(10),
            }}
          >
            <ResponsiveText style={{ color: "white" }}>Save</ResponsiveText>
          </TouchableOpacity>
        </View>
      </Content>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          activeOpacity={1}
          style={styles.modalContainer}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  // marginTop: wp(5),
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
                    marginRight: wp(4),
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
                  // marginBottom: wp(3),
                  color: "#666666",
                }}
              >
                Maximum file size: 2MB
              </ResponsiveText>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Loader visible={loading} />
    </Container>
  );
};
function handleBtnDisabled(profileObj): boolean {
  return !Boolean(
    Array(profileObj).some((item) =>
      item.email && item.address
        ? //   item.accNo >= 20
          true
        : false
    )
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    paddingVertical: wp(10),
    paddingHorizontal: wp(5),
    height: "20%",
    // width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(10),
  },
});
export default ProfileScreen;

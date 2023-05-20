import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { hp, wp } from "@src/components/common/Responsive";
import { ActionType, RegisterUserType } from "@src/redux/action-types";
import { LoginManager } from "react-native-fbsdk-next";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Icon1 from "@src/assets/images/logout_icon.png";
import Icon2 from "@src/assets/images/support_icon.png";
import Icon3 from "@src/assets/images/drawer3.svg";
import Icon4 from "@src/assets/images/changePassword_icon.png";
import Icon5 from "@src/assets/images/profile_icon.png";
import Icon6 from "@src/assets/images/drawer6.svg";
import SideIcon from "@src/assets/images/sid_icon.svg";
import CameraIcon from "@src/assets/images/camera_profile.svg";
import Camera from "@src/assets/images/download_1.svg";
import Camera2 from "@src/assets/images/camera_i.svg";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import Fonts from "@src/theme/fonts";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import { store } from "@src/redux";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
import _ from "lodash";
import FastImage from "react-native-fast-image";

interface drawerData {
  id: Readonly<number>;
  name: string;
  router: string;
  icon: Element;
}

const Drawer: React.FC<DrawerContentComponentProps> = ({
  navigation,
  descriptors,
  state,
}) => {
  const dispatch = useSafeDispatch();
  const drawerD: drawerData[] = [
    {
      id: 1,
      name: "My Profile",
      router: "ProfileScreen",
      icon: Icon5,
    },
    {
      id: 2,
      name: "Change password",
      router: "ChangePassword",
      icon: Icon4,
    },
    {
      id: 3,
      name: "Contact Us",
      router: "Help",
      icon: Icon2,
    },

    {
      id: 4,
      name: "Logout",
      router: "AuthStack",
      icon: Icon1,
    },
  ];

  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(false);

  const [profileObj, setProfileObj] = useState({
    userId: store.getState().registerUser?.registerUserData?.userInfo?.userId,
    picture: "0",
    email: registerUserData?.userInfo?.email,
    address: registerUserData?.userInfo?.address,
  });

  // }
  const fullName = String(
    registerUserData?.userInfo?.firstName! +
    " " +
    registerUserData?.userInfo?.lastName
  );
  // console.log(registerProfileData?.picture, '121')
  const openCamera = () => {
    var options: CameraOptions = {
      mediaType: "photo",
      cameraType: "front",
      includeBase64: true,
      quality: 0.5,
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
  async function openImagePicker() {
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
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#2BACE3",
          // flex: 1,
        }}
      />
      <View
        style={{
          backgroundColor: "#2BACE3",
          flex: 0.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
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
                width: wp(41.87),
                height: wp(41.87),
                borderRadius: wp(22),
                borderWidth: 0.5,
                borderColor: "#C4C4C4",
              }}
              resizeMode="cover"
            />
            <View style={{ position: "absolute", bottom: 10, right: 10 }}>
              <CameraIcon width={wp(6.4)} height={wp(6.4)} />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={{ backgroundColor: '#C4C4C4', width: wp(41.87), height: wp(41.87), borderRadius: wp(22) }}>
          <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <CameraIcon />
          </TouchableOpacity>


        </View>
        <Image style={{ width: wp(10), height: wp(10), resizeMode: 'contain', backgroundColor: 'red' }}
          source={{
            uri: registerProfileData?.picture,
          }}
        /> */}
        <ResponsiveText
          style={{
            color: "white",
            fontSize: 7,
            marginTop: wp(4),
            fontFamily: Fonts.ManropeSemiBold,
          }}
        >
          {fullName}
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontSize: 3.2,
            color: "white",
            fontFamily: Fonts.ManropeSemiBold,
          }}
        >
          {registerUserData?.userInfo?.email}
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontSize: 3.2,
            color: "white",
            marginTop: wp(1),
            fontFamily: Fonts.ManropeSemiBold,
          }}
        >
          {registerUserData.userInfo?.mobileNo}
        </ResponsiveText>
      </View>
      <View style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
        {drawerD.map((item, index) => {
          return (
            <View key={item.id} style={styles.drawerItem}>
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  if (item.name == "Logout") {
                    LoginManager.logOut();
                    dispatch({ type: ActionType.LOGOUT });
                    dispatch({ type: RegisterUserType.DELETE_SELECTED_TILE });
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{ name: "AuthStack" }],
                      })
                    );
                  } else {
                    navigation.navigate(item.router);
                    // setProfileObj((item) => ({ ...item, picture: "0" }));
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: wp(10),
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: wp(9.07), height: wp(9.07) }}
                    source={item.icon}
                  />
                  <ResponsiveText
                    style={{
                      marginLeft: wp(5),
                      color: "#4E4E4E",
                      fontSize: 4.8,
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    {item.name}
                  </ResponsiveText>
                </View>
                {item.name != "Logout" && <SideIcon />}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <SafeAreaView
        style={{
          backgroundColor: "#F1F1F1",
          // flex: 1,
        }}
      ></SafeAreaView>
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
    </View>
  );
};
const styles = StyleSheet.create({
  drawerItem: {
    top: hp(5),
    // marginVertical: hp(2),
    marginHorizontal: wp(7),
    // flexDirection: 'row'
    // backgroundColor: 'red'
  },
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
});
export default Drawer;

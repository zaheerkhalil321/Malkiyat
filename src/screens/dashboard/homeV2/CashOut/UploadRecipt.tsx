import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Content from "@src/components/common/Content";
import DownArrow from "@src/assets/images/downCash.svg";
import SideArrow from "@src/assets/images/side_a.svg";
import UploadIcon from "@src/assets/images/uploadIcon.svg";
import SheildIcon from "@src/assets/images/upload_pakPro.svg";
import Camera from "@src/assets/images/download_1.svg";
import KycCamera from "@src/assets/images/download_2.svg";
import BottomButtons from "@src/components/common/BottomButtons";
import Camera2 from "@src/assets/images/camera_i.svg";
import Loader from "@src/components/ui/loader/Loader";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import { store } from "@src/redux";
import { number } from "yup/lib/locale";
import _ from "lodash";
const UploadRecipt = (props) => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [open, setOpen] = useState(false);
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const fullName = String(
    registerReducer.registerUserData?.userInfo?.firstName! +
      " " +
      registerReducer?.registerUserData?.userInfo?.lastName
  );
  const [uploadObj, setUploadObj] = useState({
    accTitle: String(fullName),
    bankId: number,
    userId: store.getState().registerUser?.registerUserData?.userInfo?.userId,
    amount: props?.route?.params?.amount,
    accNo: "",
    transactionId: "",
    receiptImg: "",
    bankName: "",
  });
  const [bankList, setBankList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(props, "iiiii");
  React.useEffect(() => {
    fetchDetails();
  }, [props.navigation]);
  const fetchDetails = async () => {
    // setLoading(true);
    const res = await MRegisterUserApiService.getBankList();
    const Blist = res?.data?.data?.map((item) => ({
      key: item.id,
      label: item.bankName,
      testID: item.accTitle,
    }));
    setBankList(Blist);
    // setLoading(false);
    console.log(Blist, "qqq");
  };
  const UploadReciptData = async () => {
    setLoading(true);
    const res = await MRegisterUserApiService.upladRecieptApi(uploadObj);
    console.log("🚀 ~ file: UploadRecipt.tsx:81 ~ UploadReciptData ~ res", res);

    if (res.status == 200) {
      setLoading(false);
      props.navigation.navigate("PaymentDetail", {
        item: uploadObj,
        amount: props?.route?.params?.amount,
      });
      setUploadObj(() => ({
        accTitle: String(fullName),
        // commonObj: { ...item.commonObj, accountTitle: text },
      }));
      setImg("");
    } else setLoading(false);

    // console.log(res, 'ioiooooioooioioo11')
    // setBidData(res.data.data);
  };
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
          response.assets?.map((e) => {
            // console.log(e.base64, 'image')
            // setImg(e.base64);
            setImg(e.fileName);
            setUploadObj((item) => ({
              ...item,
              receiptImg: e.base64,
              // commonObj: { ...item.commonObj, accountTitle: text },
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
      quality: 0.5,
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
          response.assets?.map((e) => {
            console.log(e.fileName, "image");
            setImg(e.fileName);
            setUploadObj((item) => ({
              ...item,
              receiptImg: e.base64,
              // commonObj: { ...item.commonObj, accountTitle: text },
            }));
          });
        }
      }
    });
  }

  return (
    <Container>
      <HomeHeader
        label={""}
        icon={undefined}
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Upload Receipt"}
      />
      <Content style={{ paddingHorizontal: wp(3) }}>
        <TouchableOpacity
          style={styles.addFundsView}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ResponsiveText style={styles.amountTextHeader}>
            Upload Receipt*
          </ResponsiveText>

          {/* <TextInput
                        // maxLength={9}
                        editable={false}
                        style={[styles.amountInput, { fontSize: 12, color: '#959595', backgroundColor: 'red', width: wp(20) }]}
                        defaultValue={""}
                        // keyboardType="numeric"
                        placeholder="Click to upload"
                        value={img}
                    /> */}
          <View style={[styles.amountInput, { justifyContent: "center" }]}>
            <ResponsiveText style={{ fontSize: 3, color: "#959595" }}>
              {img ? img : "Click here to upload"}
            </ResponsiveText>
          </View>

          <UploadIcon />
        </TouchableOpacity>
      </Content>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          disabled={!_.isEmpty(img) ? false : true}
          onPress={() => {
            UploadReciptData();
          }}
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: _.isEmpty(img) ? "#dedede" : "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginRight: wp(3),
            }}
          >
            Submit
          </ResponsiveText>
          <SideArrow />
        </TouchableOpacity>
      </View>
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
              {/* {img ? (
                                // <View style={{ backgroundColor: 'red', width: wp(10), height: wp(10) }}>
                                // </View>
                                <Image
                                    source={{
                                        uri: `data:image/jpeg;base64,${img}`,
                                    }}
                                    style={{
                                        height: wp(66),
                                        width: "100%",
                                        borderRadius: 10,
                                        backgroundColor: 'red'
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
                            )} */}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Loader visible={loading} />
    </Container>
  );
};
// function handleBtnDisabled(uploadObj): boolean {
//   return !Boolean(
//     Array(uploadObj).some((item) =>
//       item.accTitle &&
//       item.bankName &&
//       item.transactionId &&
//       String(item.accNo).length >= 9 &&
//       String(item.accNo).length <= 24
//         ? true
//         : false
//     )
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  addFundsView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(10),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(10),
    // justifyContent: "center",
  },
  addFundsText: {
    marginTop: wp(13),
    fontSize: 5,
    fontFamily: Fonts.ManropeSemiBold,
  },
  amountTextHeader: {
    // height: "40%",
    fontSize: 3.2,
    fontFamily: Fonts.ManropeSemiBold,
    color: "#3577DB",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  amountInput: {
    width: wp(75),
    height: wp(15),
  },
  amountErrorText: {
    color: "red",
    fontSize: 3.5,
    marginTop: wp(1),
  },
  amountBtn: {
    backgroundColor: "#2BACE3",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    height: wp(10),
    marginTop: wp(10),
    marginBottom: wp(10),
  },
  selectedCashinBtn: {
    marginHorizontal: wp(1),
    marginVertical: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(1),
    // paddingVertical: wp(1),
    paddingRight: wp(3),
    height: wp(10.93),
    borderRadius: wp(2),
  },
  showPaymentText: {
    textAlign: "center",
    fontSize: 4.27,
    marginTop: wp(10),
  },
  imgTitleView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wp(2),
  },
  bankView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(10),
  },
  selectBankText: {
    fontSize: 3.2,
    fontFamily: Fonts.ManropeSemiBold,
    color: "#3577DB",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
});

export default UploadRecipt;

// ! FOR FUTURE PURPOSE

// {open && (
//   <>
//     <ScrollView
//       style={{
//         borderColor: "#3577DB",
//         borderWidth: 1,
//         paddingHorizontal: wp(4),
//         borderRadius: wp(1),
//         marginTop: wp(0.5),
//         paddingVertical: wp(3),
//       }}
//     >
//       {bankList.map((item, index) => {
//         return (
//           <TouchableOpacity
//             style={{}}
//             onPress={() => {
//               setUploadObj((items) => ({
//                 ...items,
//                 bankName: item.label,
//                 bankId: item.key,
//               }));
//               setOpen(false);
//             }}
//           >
//             <ResponsiveText style={{ marginBottom: wp(0) }}>
//               {item.label}
//             </ResponsiveText>
//           </TouchableOpacity>
//         );
//       })}
//     </ScrollView>
//   </>
// )}

{
  /* <TouchableOpacity
onPress={() => {
  setOpen(!open);
}}
style={styles.bankView}
>
<ResponsiveText style={styles.selectBankText}>
  Select Bank
  <ResponsiveText style={{ ...styles.amountTextHeader, ...{ color: '#DB1A00' } }}>*</ResponsiveText>
</ResponsiveText>

<TextInput
  style={{ color: "black" }}
  editable={false}
  style={{ backgroundColor: 'red', height: wp(15) }}
  defaultValue={""}
  placeholder="Select Bank"
  value={uploadObj.bankName ?? ""}
/>

<DownArrow />
</TouchableOpacity> */
}
{
  /* <View style={styles.addFundsView}>
<ResponsiveText style={styles.amountTextHeader}>
  Enter Account Title
  <ResponsiveText style={{ ...styles.amountTextHeader, ...{ color: '#DB1A00' } }}>*</ResponsiveText>
</ResponsiveText>

<TextInput
  maxLength={24}
  style={styles.amountInput}
  onChangeText={(text) => {
    text = text.replace(".", "");
    setUploadObj((item) => ({
      ...item,
      accTitle: text,
      commonObj: { ...item.commonObj, accountTitle: text },
    }));
  }}
  defaultValue={""}
  // keyboardType="numeric"
  placeholder="Enter Account Title "
  value={uploadObj.accTitle ?? ""}
/>
</View> */
}

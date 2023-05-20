import React, { useEffect, useRef, useState } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
  Platform,
  Dimensions,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import Clipboard from "@react-native-clipboard/clipboard";
import Snackbar from "react-native-snackbar";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Union from "@src/assets/images/Union.svg";
import Con from "@src/assets/images/rev.svg";
import _, { random } from "lodash";
import ShareIcon from "@src/assets/images/Share.svg";
import DownloadIcon from "@src/assets/images/downloadCongrate.svg";
import CrossIcon from "@src/assets/images/crossIcon.svg";
import moment from "moment";
import {
  captureAndShareScreenshot,
  downloadFile,
  sleep,
  valueWithCommas,
} from "@src/utils/helperFunction";
import CopyIcon from "@src/assets/images/copytext.svg";

const BuyBackCongratesModal = (props) => {
  const ref = useRef<ViewShot>(null);
  const copyToClipboard = async () => {
    await Clipboard.setString(props.data?.refNo);
    Snackbar.show({
      text: "Copied",
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: "green",
      textColor: "white",
      fontFamily: Fonts.ManropeBold,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible ? true : false}
    >
      <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <ViewShot
            ref={ref}
            options={{
              format: "jpg",
              quality: 1,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height * 0.9,
            }}
          >
            <View style={{ backgroundColor: "white" }}>
              <View
                style={{
                  backgroundColor: "#2BACE3",
                  height: wp(68.53),
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: "HomeDrawer",
                          },
                        ],
                      })
                    );
                  }}
                  style={{ alignSelf: "flex-end", padding: wp(3) }}
                >
                  <CrossIcon />
                </TouchableOpacity>

                <ResponsiveText
                  style={{
                    color: "white",
                    fontSize: 6,
                    fontFamily: Fonts.ManropeSemiBold,
                    marginTop: wp(3),
                  }}
                >
                  Malkiyat
                </ResponsiveText>
                <Con
                  width={wp(19.2)}
                  height={wp(19.2)}
                  style={{ marginVertical: wp(6) }}
                />
                <ResponsiveText
                  style={{
                    color: "white",
                    fontSize: 6.4,
                    fontFamily: Fonts.ManropeBold,
                  }}
                >
                  Congratulations!
                </ResponsiveText>
                <ResponsiveText
                  style={{ color: "white", fontSize: 4, marginTop: wp(2) }}
                >
                  Funds Added Successfully
                </ResponsiveText>
              </View>
              <View style={{ marginTop: -3 }}>
                <Union width={"100%"} />
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginTop: wp(6),
                    marginBottom: wp(3),
                  }}
                >
                  <ResponsiveText
                    style={{
                      fontSize: 3.73,
                      marginBottom: wp(2),
                      color: "#2BACE3",
                    }}
                  >
                    Rs.{" "}
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      fontSize: 9.6,
                      fontFamily: Fonts.ManropeBold,
                      color: "#2BACE3",
                    }}
                  >
                    {valueWithCommas(props?.totalPrice)}
                  </ResponsiveText>
                </View>
                <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                  instantly transferred to your account.
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    color: "#9F9F9F",
                    fontFamily: Fonts.ManropeSemiBold,
                    fontSize: 3.8,
                    marginTop: wp(1),
                  }}
                >
                  (
                  {valueWithCommas(
                    props?.route?.params?.modalObj?.unitsToSearch
                  )}{" "}
                  Sqft sold)
                </ResponsiveText>
              </View>
              <View style={{ paddingHorizontal: wp(5) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: wp(8),
                  }}
                >
                  <ResponsiveText
                    style={{
                      fontSize: 4.27,
                      color: "#2BACE3",
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    Details
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      color: "#9F9F9F",
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    {moment(props.data?.transactionDateTime).format(
                      "D MMM, YYYY  h:mm a"
                    )}
                  </ResponsiveText>
                </View>
                <View
                  style={{
                    backgroundColor: "#9F9F9F",
                    height: 1,
                    marginTop: wp(3),
                    marginBottom: wp(5),
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <ResponsiveText
                      style={{
                        fontSize: 3.2,
                        fontFamily: Fonts.ManropeSemiBold,
                        marginBottom: wp(1),
                      }}
                    >
                      Reference ID
                    </ResponsiveText>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: wp(5),
                      }}
                    >
                      <ResponsiveText
                        style={{
                          color: "#8C8C8C",
                          fontSize: 4,
                          fontFamily: Fonts.ManropeSemiBold,
                          marginRight: 10,
                        }}
                      >
                        {props.data?.refNo}
                      </ResponsiveText>
                      <TouchableOpacity onPress={copyToClipboard}>
                        <CopyIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <View>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    fontFamily: Fonts.ManropeSemiBold,
                    alignSelf: "flex-end",
                    marginBottom: wp(1),
                  }}
                >
                  Payment Method
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    color: "#8C8C8C",
                    fontSize: 4,
                    fontFamily: Fonts.ManropeSemiBold,
                    alignSelf: "flex-end",
                    marginBottom: wp(5),
                  }}
                >
                  {props?.data?.paymentName}
                </ResponsiveText>
              </View> */}
                </View>
              </View>
            </View>
          </ViewShot>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: wp(5),
            }}
          >
            <TouchableOpacity
              onPress={() => captureAndShareScreenshot(ref)}
              style={{ marginRight: wp(5) }}
            >
              <ShareIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => downloadFile(ref)}>
              <DownloadIcon />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

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
    // height: "40%",
    width: "90%",
    backgroundColor: "white",
    overflow: "hidden",
    // paddingHorizontal: wp(5),
    borderRadius: wp(2),
    // position: 'absolute',
    // bottom: wp(5)
  },
  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(5),
  },
  btn: {
    flex: 1,
    height: wp(10),
    backgroundColor: "white",
  },
});

export default React.memo(BuyBackCongratesModal);

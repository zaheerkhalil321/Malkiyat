import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React from "react";
import ReactNativeBlobUtil from "react-native-blob-util";
import Snackbar from "react-native-snackbar";

import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Download from "@src/assets/images/download_but.svg";

const ProjectMap = (props) => {
  // const { config, fs } = RNFetchBlob;
  // let PictureDir = fs.dirs.PictureDir; // this is the pictures directory. You can check the available directories in the wiki.
  // let options = {
  //   fileCache: true,
  //   addAndroidDownloads: {
  //     useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
  //     notification: false,
  //     path:
  //       PictureDir +
  //       "/me_" +
  //       Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
  //     description: "Downloading image.",
  //   },
  // };
  // config(options)
  //   .fetch("GET", "http://www.example.com/example.pdf")
  //   .then((res) => {
  //     // do some magic here
  //   });
  return (
    <View style={{}}>
      <Image
        style={{
          width: "100%",
          height: "80%",
        }}
        source={{ uri: props?.propertyMapUrl }}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: wp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            downloadDocument(props);
          }}
          style={{
            backgroundColor: "#FAFAFA",
            width: wp(80),
            height: wp(13),
            borderRadius: wp(10),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Download />
          <ResponsiveText
            style={{
              color: "#2BACE3",
              fontFamily: Fonts.ManropeBold,
              marginLeft: 10,
            }}
          >
            Download Project Map
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProjectMap;
async function downloadDocument(props) {
  const permission =
    Platform.OS == "android" &&
    (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "",
        message: "",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    ));
  if (permission === "granted" || Platform.OS == "ios") {
    const { dirs } = ReactNativeBlobUtil.fs;
    const dirToSave =
      Platform.OS == "ios" ? dirs.DocumentDir : "/storage/emulated/0/Download";
    const configfb = {
      fileCache: true,
      appendExt: "pdf",
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: "application/pdf",
        notification: true,
        mediaScannable: true,
        title: "Malkiyat Document",
        path: `${dirToSave}/${"pdfInfo.pdf"}`,
      },
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: "Malkiyat Document",
        path: configfb.addAndroidDownloads.path,
        appendExt: `pdf`,
      } as any,
      android: configfb,
    });

    await ReactNativeBlobUtil.config(configOptions)
      .fetch("GET", props.masterPlanUrl, {})
      .then((res) => {
        if (Platform.OS === "ios") {
          Snackbar.show({
            text: "Hello world",
            duration: Snackbar.LENGTH_SHORT,
          });
          //  ReactNativeBlobUtil.fs.writeFile(configfb.path, res.data, "base64");
          ReactNativeBlobUtil.ios.openDocument(
            configfb.addAndroidDownloads.path
          );
        }
        if (Platform.OS == "android") {
          Snackbar.show({
            text: "Document downloaded",
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: "DONE",
              textColor: "green",
              onPress: () => {
                /* Do something. */
              },
            },
          });
        }
      })
      .catch((e) => {
        console.log("The file saved to ERROR", e.message);
      });
  }
}

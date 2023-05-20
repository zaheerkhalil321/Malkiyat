import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { wp } from "@src/components/common/Responsive";
import LottieView from "lottie-react-native";
interface Props {
  visible: boolean;
  animationOut?: number;
}

function Loader(props: Props) {
  return (
    <View>
      <Modal
        style={{ justifyContent: "center", alignItems: "center" }}
        isVisible={props.visible}
        animationOutTiming={props?.animationOut ?? 200}
        animationIn={"bounceIn"}
        animationOut={"fadeOut"}
      >
        <View style={styles.modalView}>
          {/* <ActivityIndicator /> */}
          <LottieView
            style={{ width: wp(25), height: wp(25) }}
            source={require("@src/assets/lottie/loader.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    height: wp(30),
    width: wp(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(5),
  },
});

export default Loader;

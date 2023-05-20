import React from "react";
import {
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import NoInternetModal from "@src/components/ui/InternetModal";
import { RootState } from "@src/redux/reducers";
import { useSelector } from "react-redux";

const Container = (props: any) => {
  const [internetState, setInternetState] = React.useState<boolean>(true);
  const state = useSelector((state: RootState) => state.authReducer);

  const { backgroundImageStyle } = props;
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternetState(state.isConnected!);
    });
    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor={props.statusBarColor}
        barStyle={props.barStyle}
        translucent={props.translucent}
        hidden={props.hidden}
      />
      <NoInternetModal visible={!internetState} />
      {props.backgroundImage && (
        <Image
          source={props.backgroundImage}
          style={[styles.backgroundImage, backgroundImageStyle]}
        />
      )}
      {props.overlay && <View style={styles.overlayStyle} />}
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});

export default Container;

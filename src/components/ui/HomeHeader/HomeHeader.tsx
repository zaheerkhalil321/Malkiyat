import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  CommonActions,
  useTheme,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

import Fonts from "@src/theme/fonts";
import ResponseiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Arrow from "@src/assets/images/arrow_left.svg";
import BellIcon from "@src/assets/images/notifications.svg";
import { debounce } from "lodash";

interface HeaderProps {
  bell?: boolean;
  back?: boolean;
  backgroundColor?: string;
  title?: string;
  label?: string;
  icon?: React.FC<SvgProps> | JSX.Element;
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  show: boolean;
  routePathName?: string;
  handleBackButtonPress?: () => void;
}

function HomeHeader(props: HeaderProps) {
  var handleGoBack;
  const timeRef = useRef(false);
  const { colors } = useTheme();
  useEffect(() => {
    timeRef.current = true;
    return () => {
      timeRef.current = false;
    };
  });
  useEffect(() => {
    handleGoBack = debounce(handleGoBack, 100);
  }, []);

  handleGoBack = () => props.navigation.goBack();
  const [disable, setDisable] = useState(false);
  const pressButton = () => {
    if (timeRef.current) {
      setDisable(true);
      props.navigation.goBack();
      // enable after 5 second
      setTimeout(() => {
        if (timeRef.current) {
          // Alert.alert('11')
          setDisable(false);
        }
      }, 1000);
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props?.back && (
          <TouchableOpacity
            disabled={disable ? true : false}
            activeOpacity={0.8}
            style={{
              width: wp(15),
              marginRight: 5,
            }}
            onPress={() =>
              props?.handleBackButtonPress
                ? props.handleBackButtonPress()
                : pressButton()
            }
          >
            <View
              style={{
                backgroundColor: props.backgroundColor
                  ? props.backgroundColor
                  : "#F4F4F4",
                width: wp(11.73),
                height: wp(11.73),
                borderRadius: wp(3),
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}
            >
              <Arrow width={wp(5)} height={wp(5)} />
            </View>
          </TouchableOpacity>
        )}

        <ResponseiveText
          style={
            //@ts-ignore
            styles.header("#303030")
          }
        >
          {props?.title ?? ""}
        </ResponseiveText>
      </View>
      {!props?.show && (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AuthStack")}
          style={styles.sideView}
        >
          <ResponseiveText
            //@ts-ignore
            style={styles.sideText(colors.PlaceHolderText)}
          >
            {props.label}
          </ResponseiveText>
          {props?.icon}
        </TouchableOpacity>
      )}
      {/* {props?.bell && (
        <View>
          <BellIcon color={"#2BACE3"} />
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: wp(18),
    paddingHorizontal: wp(5),
    // backgroundColor: 'yellow',
  },
  //@ts-ignore
  header: (color: string) => ({
    fontSize: 5,
    fontFamily: Fonts.ManropeBold,
    color: color,
  }),
  sideView: {
    flexDirection: "row",
    alignItems: "center",
  },
  //@ts-ignore
  sideText: (color: string) => ({
    fontSize: 4,
    fontFamily: Fonts.ManropeRegular,
    color: color,
    marginRight: wp(1),
  }),
});

export default HomeHeader;

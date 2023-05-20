import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import UserInactivity from "react-native-user-inactivity";
import BackgroundTimer from "react-native-user-inactivity/lib/BackgroundTimer";
import Modal from "react-native-modal";
import { navigationRef } from "@src/helpers/NavigationService";
import { CommonActions } from "@react-navigation/native";
import { store } from "@src/redux";
import { removeToken } from "@src/redux/action-creators/registerUser";
import ResponsiveText from "../common/ResponseiveText";
import { wp } from "../common/Responsive";
import CustomBackgroundTimer from "./CustomeBackgroundTimer";
import MarketImage from "@src/assets/images/market_modal.png";
import { closeErrorModal, errorModal } from "@src/redux/action-creators";

const SESSION_OUT_TIME = 200 * 1000; //? MINUTS*SECONDS*MILLISECONDS

const UserInactive = (props) => {
  const [showContent, setShowContent] = useState(false);
  var count = 0;

  return (
    <UserInactivity
      timeForInactivity={SESSION_OUT_TIME}
      timeoutHandler={CustomBackgroundTimer as any}
      onAction={(isActive) => {
        console.log(isActive, count);
        count = count + 1;

        if (!isActive && store.getState().registerUser?.token?.accessToken) {
          if (!store.getState().authReducer.errorModal.show) {
            store.dispatch(
              errorModal(
                "Your session has been expired.Please login again.",
                true,
                "SESSION_OUT"
              ) as any
            );
          }
        }
      }}
      // style={{ flex: 1, paddingTop: "10%" }}
      children={
        <>
          {props.children}
          {/* <Modal
            style={{ justifyContent: "center", alignItems: "center" }}
            isVisible={showContent}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: "80%",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                paddingVertical: wp(5),
              }}
            >
              <Image
                style={{
                  width: wp(30),
                  height: wp(30),
                  backgroundColor: "white",
                  resizeMode: "contain",
                }}
                source={MarketImage}
              />
              <ResponsiveText
                style={{
                  fontSize: 5,
                  marginTop: wp(5),
                }}
              >
                Session Exprired
              </ResponsiveText>
              <TouchableOpacity
                style={{
                  marginTop: wp(5),
                  backgroundColor: "#3577DB",
                  paddingVertical: wp(2),
                  paddingHorizontal: wp(6),
                  borderRadius: 10,
                }}
                onPress={() => {
                  setShowContent(false);
                  store.dispatch(removeToken() as any);
                  navigationRef.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: "AuthStack",
                          state: {
                            routes: [
                              {
                                name: "LoginScreen",
                              },
                            ],
                          },
                        },
                      ],
                    })
                  );
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 5,
                    color: "white",
                  }}
                >
                  OK
                </ResponsiveText>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal> */}
        </>
      }
    />
  );
};
export default UserInactive;

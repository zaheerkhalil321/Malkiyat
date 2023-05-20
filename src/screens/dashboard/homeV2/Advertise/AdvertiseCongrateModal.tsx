import { View, Text, Modal, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { wp } from '@src/components/common/Responsive';
import { CommonActions } from '@react-navigation/native';
import Union from "@src/assets/images/Union.svg";
import Con from "@src/assets/images/rev.svg";
import _ from "lodash";
import CrossIcon from "@src/assets/images/crossIcon.svg";
import ResponsiveText from '@src/components/common/ResponseiveText';
import Fonts from '@src/theme/fonts';
const AdvertiseCongrateModal = (props) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => false}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                    <View
                        style={{
                            backgroundColor: "#2BACE3",
                            height: wp(45),
                            alignItems: "center",
                            justifyContent: "center",
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
                            style={{
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 15,
                                right: 20,
                            }}
                        >
                            <CrossIcon />
                        </TouchableOpacity>
                        <View style={{ marginTop: wp(10) }}>
                            <Con width={wp(22)} height={wp(22)} />
                        </View>
                    </View>
                    <View style={{ marginTop: -3 }}>
                        <Union width={"100%"} />
                    </View>
                    <View
                        style={{
                            paddingVertical: wp(5),
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <ResponsiveText
                            style={{
                                color: "#2BACE3",
                                fontSize: 6.4,
                                fontFamily: Fonts.ManropeSemiBold,
                            }}
                        >
                            Congratulations!
                        </ResponsiveText>
                        <ResponsiveText
                            style={{ fontSize: 5, marginTop: wp(2) }}
                        >
                            Your demand is advertised
                        </ResponsiveText>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: wp(4),
                            paddingVertical: wp(4),
                            borderTopColor: "#EEEEEE",
                            borderTopWidth: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                props.setModalVisible(false)
                                props.navigation.navigate("RegisterUserStack", {
                                    screen: "MyAds",
                                    params: { type: props.obj?.bidType },
                                })
                            }}
                            style={{
                                width: wp(40),
                                height: wp(14.93),
                                borderRadius: wp(10),
                                borderColor: "#00B9F7",
                                borderWidth: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <ResponsiveText
                                style={{
                                    color: "#00B9F7",
                                    fontFamily: Fonts.ManropeBold,
                                    fontSize: 4.53,
                                    textAlign: "center",
                                }}
                            >
                                View
                            </ResponsiveText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                props.setModalVisible(false)
                                props.navigation.push("HomeDrawer")
                            }
                            }
                            style={{
                                width: wp(40),
                                height: wp(14.93),
                                borderRadius: wp(10),
                                backgroundColor: "#2BACE3",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            {/* <HomeIcon /> */}
                            <ResponsiveText
                                style={{
                                    color: "white",
                                    fontFamily: Fonts.ManropeBold,
                                    fontSize: 4.53,
                                    marginLeft: 5,
                                }}
                            >
                                Go to home
                            </ResponsiveText>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        </Modal>
    )
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
        height: "60%",
        width: "90%",
        backgroundColor: "white",
        overflow: 'hidden',
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: wp(10)
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
export default AdvertiseCongrateModal
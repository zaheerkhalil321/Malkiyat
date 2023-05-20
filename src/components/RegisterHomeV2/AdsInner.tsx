import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { wp } from "../common/Responsive";
import Eden from "@src/assets/images/eden.svg";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { MyAdsInterface, PropertyI, UserPropertyInterface } from "@src/services/model";
import { valueConverstion } from "@src/utils/helperFunction";
import { Tabs } from "@src/screens/dashboard/homeV2/MyAds/MyAds";

const AdsInner = (props: MyAdsInterface & { tabs: Tabs }) => {

    return (
        <>

            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#FAAD39",
                    // marginHorizontal: wp(0.5),
                    // paddingVertical: wp(5),
                    paddingHorizontal: wp(4),
                    borderRadius: wp(2),
                    marginBottom: wp(3),
                    height: 85,
                    justifyContent: "center",
                    alignItems: "center",
                    // flexDirection: "row",
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={{ width: wp(12.8), height: wp(12.8), resizeMode: "contain" }}
                        source={{ uri: props?.logoUrl! }}
                    />

                    <View
                        style={{
                            // backgroundColor: "red",
                            flex: 1,
                            marginLeft: wp(3.5),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // backgroundColor: "red",
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <ResponsiveText
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 2.93,
                                        fontFamily: Fonts.ManropeBold,
                                        color: "#757575",
                                        maxWidth: wp(21),
                                    }}
                                >
                                    {props?.propertyName ?? ""}
                                    {/* wejwkjwehejjekqel */}
                                </ResponsiveText>
                                <ResponsiveText
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 2.93,
                                        color: "#757575",
                                        // backgroundColor: "red",
                                        maxWidth: wp(50),
                                    }}
                                >
                                    {"  "}
                                    {props?.address}
                                    {/* {props?.propertyAddress?.slice(0, 22) + "..."} */}
                                    {/* nsadnjdkwenjkewnfjkwendwm,ndwnd */}
                                </ResponsiveText>
                            </View>

                            {/* <ResponsiveText style={styles.percen}>
                            {parseFloat(String(props?.profitPercentage! ?? 0.0)).toFixed(1)}%
                        </ResponsiveText> */}
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                marginTop: wp(3),
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    // backgroundColor: "pink",
                                    width: wp(21),
                                }}
                            >
                                <ResponsiveText
                                    style={{ fontSize: 4.8, fontFamily: Fonts.ManropeBold }}
                                >
                                    {valueConverstion(props?.smallerUnits ?? 0)}{" "}
                                </ResponsiveText>
                                <ResponsiveText>{'sqt'}</ResponsiveText>
                            </View>

                            <ResponsiveText
                                style={{
                                    fontSize: 4.8,
                                    fontFamily: Fonts.ManropeBold,
                                    width: wp(21),
                                    // backgroundColor: "red",
                                }}
                            >
                                {valueConverstion(props?.offerPrice ?? 0)}
                            </ResponsiveText>
                            <ResponsiveText
                                style={{
                                    // backgroundColor: "pink",
                                    width: wp(21),
                                    fontSize: 4.8,
                                    fontFamily: Fonts.ManropeBold,
                                    textAlign: "right",
                                }}
                            >
                                {valueConverstion(props?.lastSqFtSoldPrice ?? 0)}
                            </ResponsiveText>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    percen: {
        color: "#4CAF50",
        fontSize: 2.93,
        fontFamily: Fonts.ManropeBold,
        marginBottom: wp(0.5),
    },
    iconCon: {
        // flex: 1,
        // backgroundColor: "red",
        alignItems: "center",
    },
    innerCon: {
        fontSize: 3.47,
        // flex: 1,
        // backgroundColor: "red",
        // textAlign: "center",
    },
    outer: {
        backgroundColor: "#F8F8F8",
        borderWidth: 1,
        borderColor: "#BDBDBD",
        marginHorizontal: wp(4),
        paddingVertical: wp(3),
        paddingHorizontal: wp(4),
        borderRadius: wp(2),
    },
    boldText: {
        fontSize: 3.47,
        flex: 1,
        // backgroundColor: "red",
        textAlign: "center",
        fontFamily: Fonts.ManropeBold,
    },
});
export default AdsInner;

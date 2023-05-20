import {
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import _ from "lodash";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import VirtualizedView from "@src/components/common/VirtualizedView";
import Fonts from "@src/theme/fonts";
import Coin1 from "@src/assets/images/coin_step1.svg";
import Coin2 from "@src/assets/images/coin_step2.svg";
import Coin3 from "@src/assets/images/coin_step3.svg";
import Coin4 from "@src/assets/images/coin_step4.svg";
import Content from "@src/components/common/Content";
import {
  valueConverstion,
  coinStackforPercentage,
  coinStackforYear,
  calculateTimeStamp,
} from "@src/utils/helperFunction";
import PdfImg from "@src/assets/images/svg/pdf.svg";
import coinImg from "@src/assets/images/svg/coin.png";
import { RootState } from "@src/redux/reducers";

export const DataYear = [
  {
    id: 1,
    image: Coin1,
    fontSize: 6,
  },
  {
    id: 2,
    image: Coin2,
    fontSize: 5,
  },
  {
    id: 3,
    image: Coin2,
    fontSize: 4,
  },
  {
    id: 4,
    image: Coin3,
    fontSize: 3,
  },
];

const IncreasePerYear = (props) => {
  const [isActive, setIsActive] = useState(true);
  const { colors } = useTheme();
  const reducerState = useSelector(
    (state: RootState) => state.unregisterUser.propertyAllData
  );
  console.log(
    "🚀 ~ file: IncreasePerYear.tsx:62 ~ IncreasePerYear ~ reducerState",
    reducerState
  );

  // updatedArray.push()
  const MAX_OBJ: any = _.maxBy(reducerState?.priceDetails?.price, "price");

  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };
  return (
    <VirtualizedView>
      <Content>
        <View
          style={{
            paddingHorizontal: wp(4),
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 4.27,
              fontFamily: Fonts.ManropeBold,
              marginTop: wp(5),
              marginBottom: wp(3),
            }}
          >
            Past Performance
          </ResponsiveText>
          <View>
            <Image
              style={{
                width: wp(91.47),
                height: wp(57.6),
                borderWidth: 1,
                borderColor: "#3577DB",
                borderRadius: wp(2),
                backgroundColor: "lightgrey",
              }}
              source={require("@src/assets/images/shut.png")}
            />
            <View style={{ position: "absolute", top: wp(11), left: wp(5) }}>
              <ResponsiveText
                style={{
                  fontSize: 8.53,
                  fontFamily: Fonts.ManropeBold,
                  color: colors.Primary,
                }}
              >
                {Math.floor(props?.propInfo?.increaseLastThreeYears)}%
              </ResponsiveText>
              <ResponsiveText
                style={{ width: wp(40), fontFamily: Fonts.ManropeSemiBold }}
              >
                Increase per year Last 3 Years average
              </ResponsiveText>
            </View>
          </View>
          <ResponsiveText
            style={{
              fontSize: 4.27,
              fontFamily: Fonts.ManropeBold,
              marginTop: wp(5),
              marginBottom: wp(1),
            }}
          >
            Last 3 years price
          </ResponsiveText>
          <ResponsiveText
            style={{ color: "#757575", fontSize: 3.2, marginBottom: wp(3) }}
          >
            Property evaluation reports are by State Bank approved evaluator
          </ResponsiveText>
          <View
            style={{
              borderColor: "#3577DB",
              borderWidth: 1,
              paddingHorizontal: wp(4),
              paddingVertical: wp(3),
              borderRadius: wp(2),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <ResponsiveText
                  style={{
                    fontSize: 4.27,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Property Price Trend
                </ResponsiveText>
                <View
                  style={{
                    backgroundColor: "#FF9A2E",
                    height: 2,
                    width: wp(11.2),
                    marginTop: wp(2),
                    // marginBottom: wp(4),
                  }}
                />
              </View>
              <Pressable
                onPress={() => {
                  setIsActive(!isActive);
                }}
              >
                <View
                  style={{
                    borderColor: "#3577DB",
                    paddingHorizontal: wp(2.5),
                    paddingVertical: wp(1),
                    borderRadius: wp(1),
                    borderWidth: 1,
                  }}
                >
                  <ResponsiveText style={{ color: "#3577DB", fontSize: 3.2 }}>
                    {!isActive
                      ? `Show amount per year ${">"}`
                      : `Show % per year ${">"}`}
                  </ResponsiveText>
                </View>
              </Pressable>
            </View>

            {/* {isActive ? ( */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: wp(10),
                marginLeft: wp(5),
              }}
            >
              {_.size(reducerState.priceDetails.price) > 0 &&
                reducerState.priceDetails.price?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: wp(
                          25 -
                            (reducerState.priceDetails?.price?.length -
                              index * 0.5)
                        ),
                        // alignItems: "center",
                        // justifyContent: "space-around",
                        // top: props.data?.priceDetails!?.length - index * 25,
                        marginLeft:
                          index === 1
                            ? -10
                            : index === 2
                            ? -10
                            : index === 3
                            ? 0
                            : index === 4
                            ? 20
                            : 10,

                        marginBottom:
                          index == 0
                            ? 0
                            : index == 1
                            ? -30
                            : index == 2
                            ? -40
                            : -60,
                      }}
                    >
                      {!isActive && (
                        <View
                          style={{
                            borderWidth: index == 3 ? 0 : 0.5,
                            borderColor: "#FF9A2E",
                            marginLeft: -wp(1),
                            marginBottom: 5,
                            paddingHorizontal: 9,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              index == 3 ? undefined : "rgba(0, 0, 0, 0.03)",
                            borderRadius: 20,
                            width: 55,
                          }}
                        >
                          <ResponsiveText
                            style={{
                              fontSize: 3.2 + index / 2,
                              fontFamily: Fonts.ManropeBold,
                            }}
                          >
                            {index != 3 && `${item?.percentage}%`}
                          </ResponsiveText>
                        </View>
                      )}

                      <View
                        style={{
                          alignItems: "flex-start",
                          marginBottom: -15,
                        }}
                      >
                        <ResponsiveText
                          style={{
                            color: "#3577DB",
                            fontSize: index == 3 || index == 2 ? 3 : 2.13,
                          }}
                        >
                          {`Rs.`}
                        </ResponsiveText>
                        <ResponsiveText
                          style={{
                            color: "#3577DB",
                            fontFamily: Fonts.ManropeBold,
                            fontSize: 3.5 + index / 2,
                            // fontWeight: "bold",
                          }}
                        >
                          {valueConverstion(Math.round(item?.price))}
                        </ResponsiveText>
                      </View>

                      {
                        <View
                          style={{
                            // display: "flex",
                            height: "auto",
                          }}
                        >
                          {item.image
                            ? coinStackforYear(item.price, MAX_OBJ!.price)
                                .reverse()
                                .map((d, i) => {
                                  return (
                                    <Image
                                      key={i}
                                      style={{
                                        zIndex: d,
                                        marginBottom:
                                          d === 1
                                            ? 0
                                            : -(
                                                50 +
                                                (index + index == 0
                                                  ? 8
                                                  : index == 1
                                                  ? 8
                                                  : 5)
                                              ),
                                        width:
                                          reducerState?.priceDetails?.price
                                            .length -
                                            index ===
                                          4
                                            ? 40
                                            : reducerState?.priceDetails!?.price
                                                ?.length -
                                                index ===
                                              3
                                            ? 40
                                            : reducerState?.priceDetails!?.price
                                                ?.length -
                                                index ===
                                              2
                                            ? 50
                                            : 60,
                                      }}
                                      resizeMode="contain"
                                      source={coinImg}
                                    />
                                  );
                                })
                            : null}
                        </View>
                      }
                      <ResponsiveText
                        style={{
                          fontFamily: Fonts.ManropeBold,
                          fontSize: 3.5 + index / 2,
                          alignItems: "flex-end",
                          marginTop:
                            index == 3
                              ? -5
                              : index == 2
                              ? -8
                              : index == 1
                              ? -10
                              : -10,
                          // marginLeft: index == 3 ? 10 : index == 2 ? 10 : 0,
                        }}
                      >
                        {item.year}
                      </ResponsiveText>
                    </View>
                  );
                })}
            </View>

            <View>
              <ResponsiveText
                style={{
                  fontSize: 4.27,
                  fontFamily: Fonts.ManropeSemiBold,
                  marginTop: wp(15),
                }}
              >
                Property evaluation reports
              </ResponsiveText>

              <View
                style={{
                  backgroundColor: "#FF9A2E",
                  height: 2,
                  width: wp(11.2),
                  marginTop: wp(2),
                  // marginBottom: wp(4),
                }}
              />
              {reducerState?.priceDetails?.documentDetails
                ?.sort(
                  (a, b) =>
                    moment(b.dateTime).year() - moment(a.dateTime).year()
                )
                .map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          props.navigation.navigate("PDFView", {
                            data: { ...item },
                          })
                        }
                        style={{
                          flex: 1,
                          paddingVertical: 20,
                          // borderWidth: 1,
                          borderRadius: 5,
                          // borderColor: colors.Primary,
                          // marginBottom: wp(7),
                          // flexDirection: "row",
                        }}
                      >
                        <View style={styles.pdfContainer}>
                          <Image
                            style={{ flex: 1 }}
                            source={{ uri: item.thumbnailUrl }}
                          />
                          {/* <Pdf
                            horizontal
                            enableAntialiasing
                            scale={2}
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                              // console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                              // console.log(`Current page: ${page}`);
                            }}
                            onError={(error) => {
                              console.log(error);
                            }}
                            onPressLink={(uri) => {
                              // console.log(`Link pressed: ${uri}`);
                            }}
                            style={styles.pdf} previe 
                          /> */}
                        </View>
                        <View style={styles.pdfBottomView}>
                          <PdfImg width={30} height={30} />
                          <ResponsiveText
                            style={{
                              fontSize: 3.3,
                              marginLeft: wp(2),
                              fontFamily: Fonts.ManropeSemiBold,
                            }}
                          >
                            Evaluation Report
                          </ResponsiveText>
                        </View>
                      </TouchableOpacity>
                      <View style={{ paddingRight: wp(3) }}>
                        <ResponsiveText
                          style={{
                            color: colors.Primary,
                            fontFamily: Fonts.ManropeBold,
                            fontSize: 5.33,
                          }}
                        >
                          {calculateTimeStamp(item.dateTime)}
                        </ResponsiveText>
                        <ResponsiveText
                          style={{
                            color: "#757575",
                            fontFamily: Fonts.ManropeBold,
                            fontSize: 5.33,
                            textAlign: "center",
                            marginTop: wp(2),
                          }}
                        >
                          ({moment(item.dateTime).year()})
                        </ResponsiveText>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </Content>
    </VirtualizedView>
  );
};
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: wp(40),
    height: wp(35.2),
    borderColor: "#FF9A2E",
    alignSelf: "center",
  },
  pdfContainer: {
    borderWidth: 1,
    width: wp(43.73),
    height: wp(35.2),
    // alignSelf: "center",
    borderBottomWidth: 0,
    borderColor: "#DADCE0",
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
  },
  pdfBottomView: {
    width: wp(43.73),
    // alignSelf: "center",
    height: wp(12.53),
    borderWidth: 1,
    borderColor: "#DADCE0",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
  },
  propertyDetailsComponent: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: wp(90),
    paddingHorizontal: wp(5),
    paddingTop: wp(2),
    justifyContent: "space-between",
    borderColor: "#3577DB",
    borderWidth: 1,
    borderRadius: wp(2),
    marginTop: wp(3),
  },
});
export default IncreasePerYear;

// ) : (
//   <View
//     style={{
//       flexDirection: "row",
//       alignItems: "flex-end",
//       justifyContent: "center",
//       marginTop: wp(25),
//       marginLeft: wp(5),
//     }}
//   >
//     {reducerState?.priceDetails?.price?.map((item, index) => {
//       return (
//         index != 0 && (
//           <View
//             key={index}
//             style={{
//               width: wp(
//                 30 -
//                   (reducerState.priceDetails?.price?.length -
//                     index * 1)
//               ),
//               alignItems: "center",
//               top:
//                 reducerState.priceDetails.price.length - index * 25,
//               justifyContent: "space-between",
//               marginLeft: index === 2 ? 10 : index === 3 ? -20 : 0,
//             }}
//           >
//             <ResponsiveText>
//               <ResponsiveText
//                 style={{
//                   color: "#3577DB",
//                   fontFamily: Fonts.ManropeBold,
//                   fontSize: 6,
//                   fontWeight: "bold",
//                 }}
//               >{`${item.percentage}%`}</ResponsiveText>
//             </ResponsiveText>
//             {
//               <View style={{ display: "flex" }}>
//                 {item.image
//                   ? coinStackforPercentage(item.percentage, 10)
//                       .reverse()
//                       .map((d, i) => {
//                         return (
//                           <Image
//                             key={i}
//                             style={{
//                               zIndex: d,
//                               marginBottom:
//                                 d === 1 ? 0 : -(50 + (index + 4)),
//                               width:
//                                 reducerState?.priceDetails?.price
//                                   .length -
//                                   index ===
//                                 3
//                                   ? 100
//                                   : reducerState?.priceDetails!
//                                       ?.price?.length -
//                                       index ===
//                                     2
//                                   ? 75
//                                   : 60,
//                             }}
//                             resizeMode="contain"
//                             source={coinImg}
//                           />
//                         );
//                       })
//                   : null}
//               </View>
//             }

//             <ResponsiveText
//               style={{ fontFamily: Fonts.ManropeBold }}
//             >
//               {item.year}
//             </ResponsiveText>
//           </View>
//         )
//       );
//     })}
//   </View>
// )}

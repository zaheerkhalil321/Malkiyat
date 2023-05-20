import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import Image from "react-native-fast-image";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import SfIcon from "@src/assets/images/sf_Icon.svg";
import { valueWithCommas } from "@src/utils/helperFunction";
import SideIcon from "@src/assets/images/white_side.svg";
import VirtualizedView from "@src/components/common/VirtualizedView";
import PdfImg from "@src/assets/images/svg/pdf.svg";
import AboutPropertyComponents from "@src/components/home/AboutPropertyComponents";
import DetailsSlider from "@src/components/home/DetailsSlider";
import { AboutProperty, PropertyDetailI } from "@src/services/model";
import { RootState } from "@src/redux/reducers";
import CalculationModal from "@src/components/home/CalculationModal";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: any;
  propInfo: PropertyDetailI;
}
var type: string | undefined = undefined;
const PropertyInfo = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const reducerState = useSelector(
    (state: RootState) => state.unregisterUser.propertyAllData
  );

  const source = {
    uri: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    cache: true,
    page: 1,
  };
  const { colors } = useTheme();
  function renderPropertyDetails(item: AboutProperty, index: number) {
    if (item.type == type) {
      return (
        <View key={index}>
          <AboutPropertyComponents {...item} />
        </View>
      );
    } else {
      type = item.type;
      return (
        <React.Fragment key={index}>
          <ResponsiveText
            style={{
              fontSize: 4.27,
              fontFamily: Fonts.ManropeSemiBold,
              marginTop: wp(2),
              width: wp(100),
            }}
          >
            {item.type}
          </ResponsiveText>
          <View style={{ width: wp(100) }}>
            <View
              style={{
                backgroundColor: "#FF9A2E",
                height: 2,
                width: wp(11.2),
                marginTop: wp(2),
                marginBottom: wp(4),
              }}
            />
          </View>

          <AboutPropertyComponents {...item} />
        </React.Fragment>
      );
    }
  }
  return (
    <VirtualizedView>
      <View style={{ paddingHorizontal: wp(4) }}>
        <ResponsiveText
          style={{
            fontSize: 4.27,
            fontFamily: Fonts.ManropeBold,
            marginTop: wp(5),
            marginBottom: wp(3),
          }}
        >
          Latest property picture
        </ResponsiveText>

        <DetailsSlider />
        <ResponsiveText
          style={{
            fontSize: 4.27,
            fontFamily: Fonts.ManropeBold,
            marginTop: wp(5),
            marginBottom: wp(3),
          }}
        >
          Property Title in name of Malkiyat
        </ResponsiveText>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.Primary,
            marginBottom: wp(7),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.navigation.navigate("PDFView", {
                data: { ...source },
              })
            }
          >
            <View style={styles.pdfContainer}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: reducerState?.propertyDetails?.propMedia?.titleThumbnail,
                }}
              />
              {/* <Pdf
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
              style={styles.pdf}
            /> */}
            </View>
            <View style={styles.pdfBottomView}>
              <PdfImg width={30} height={30} />
              <ResponsiveText
                style={{
                  fontSize: 3.73,
                  marginLeft: wp(2),
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              >
                Property Title
              </ResponsiveText>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#2BACE3",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: wp(2),
            height: wp(26.67),
            alignItems: "center",
            paddingHorizontal: wp(4),
            // paddingVertical: wp(5),
          }}
        >
          <View style={{}}>
            <SfIcon />
          </View>

          <View style={{}}>
            <Text>
              <Text
                style={{
                  fontSize: wp(5),
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "white",
                }}
              >
                Rs{" "}
              </Text>
              <Text
                style={{
                  fontSize: wp(6.93),
                  fontFamily: Fonts.ManropeBold,
                  color: "white",
                }}
              >
                {valueWithCommas(props?.propInfo?.perSmallerUnitPrice)}
              </Text>
            </Text>

            <ResponsiveText
              style={{
                textAlign: "center",
                fontSize: 3.73,
                color: "white",
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              1 Sqft price
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{ alignItems: "center" }}
          >
            <SideIcon />
            <ResponsiveText
              style={{
                textAlign: "center",
                fontSize: 3.73,
                color: "white",
                fontFamily: Fonts.ManropeSemiBold,
                marginTop: wp(3),
              }}
            >
              {"See\ncalculation"}
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <ResponsiveText
          style={{
            fontSize: 4.27,
            fontFamily: Fonts.ManropeBold,
            marginTop: wp(6),
          }}
        >
          About Property
        </ResponsiveText>
        <View style={styles.propertyDetailsComponent}>
          {reducerState?.propertyDetails?.aboutProperty?.map((item, index) => {
            return renderPropertyDetails(item, index);
          })}
        </View>
        <ResponsiveText
          style={{
            fontSize: 4.27,
            fontFamily: Fonts.ManropeBold,
            marginTop: wp(6),
          }}
        >
          About Project
        </ResponsiveText>
        <View style={styles.propertyDetailsComponent}>
          {reducerState?.propertyDetails?.aboutProject?.map((item, index) => {
            return renderPropertyDetails(item, index);
          })}
        </View>
      </View>
      <CalculationModal
        data={props.propInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
    alignSelf: "center",
    borderBottomWidth: 0,
    borderColor: "#FF9A2E",
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
    alignSelf: "center",
    height: wp(12.53),
    borderWidth: 1,
    borderColor: "#FF9A2E",
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
export default PropertyInfo;

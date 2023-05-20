import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Modal, TouchableOpacity } from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
  Route,
} from "@react-navigation/native";

import MapView, { Marker } from "react-native-maps";
import ImageViewer from "react-native-image-zoom-viewer";

import Container from "@src/components/common/Container";
import Header from "@src/components/common/Header";
import { hp, wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import MUnregisterUser from "@src/services/MUnregisterUserApiService";
import Content from "@src/components/common/Content";

type RouteName = "PropertyFurtherDetail";
export interface RouteObj {
  data: {
    id: number;
    latitude: number;
    longitude: number;
    title: string | undefined;
  };
}
interface Props {
  navigation: NavigationProp<ParamListBase>;

  route: Route<RouteName, RouteObj>;
}

const PropertyFurtherDetail = (props: Props) => {
  const imgRef = useRef(null);
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [media, setMedia] = React.useState<{ url: string }[]>([]);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const getMedia = async () => {
      const res = await MUnregisterUser.getUnregisterUserMedia(
        props.route?.params?.data?.id
      );
      let array: { url: string }[] = [];

      if (res) {
        res.data?.data?.map((item) => {
          if (!item.propertyMediaUrl?.includes("pdf")) {
            array.push({ url: item.propertyMediaUrl });
          }
        });
        array.length > 0 && setMedia(array ?? []);
      }
    };
    getMedia();
  }, []);
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Content>
        <Header backgroundColor="white" {...props} title="Property Details" />
        <View style={styles.container}>
          <View
            style={{
              ...styles.sub_container,
              ...styles.sub_container_style,
            }}
          >
            <ResponsiveText style={styles.title}>Description:</ResponsiveText>
            <ResponsiveText
              style={{ ...styles.des_text, color: colors.PlaceHolderText }}
            >
              {props.route.params.data.des}
            </ResponsiveText>

            {media.length > 0 && (
              <>
                <ResponsiveText style={styles.title}>Gallery</ResponsiveText>
                <View
                  style={{
                    ...styles.borderLine,
                    borderColor: colors.BorderColor,
                  }}
                />
              </>
            )}

            <View style={styles.imgContainer}>
              {media.slice(0, 4).map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setIndex(index);
                      setShowModal(true);
                    }}
                    style={{
                      backgroundColor: index == 3 ? "#141414" : "transparent",
                      borderRadius: 5,
                      // backgroundColor: "red",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    {index == 3 ? (
                      <ResponsiveText
                        style={{
                          position: "absolute",
                          top: wp(6),
                          left: wp(6),
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 5,
                          textAlign: "center",
                        }}
                      >
                        {media.length - 4 > 0
                          ? "+".concat(String(media.length - 4))
                          : null}
                      </ResponsiveText>
                    ) : null}
                    <Image
                      style={{
                        // marginRight: index == 3 ? 0 : wp(3),
                        opacity: index == 3 ? 0.3 : 1,
                        height: hp(8),
                        width: wp(18),
                      }}
                      resizeMode="contain"
                      source={{ uri: item.url }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{ ...styles.borderLine, borderColor: colors.BorderColor }}
            />
            <ResponsiveText style={styles.title}>Location</ResponsiveText>

            <MapView
              style={styles.mapStyle}
              showsUserLocation={false}
              zoomEnabled={true}
              zoomControlEnabled={true}
              initialRegion={{
                latitude: props.route.params?.data.latitude,
                longitude: props.route.params?.data.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: props.route.params?.data.latitude,
                  longitude: props.route.params?.data.longitude,
                }}
                title={props.route.params?.data?.title}
                description={props.route.params?.data?.title}
              />
            </MapView>
          </View>
          <Modal visible={showModal} transparent={true}>
            <ImageViewer
              index={index}
              ref={imgRef}
              renderHeader={() => (
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                  }}
                  style={{
                    position: "absolute",
                    top: wp(10),
                    right: wp(5),
                    zIndex: 1,
                  }}
                >
                  <ResponsiveText style={{ color: "white", fontSize: wp(4) }}>
                    {"\u00D7"}
                  </ResponsiveText>
                </TouchableOpacity>
              )}
              imageUrls={media ?? []}
            />
          </Modal>
        </View>
      </Content>
    </Container>
  );
};
export default PropertyFurtherDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  sub_container: {
    width: wp(92),
    height: "auto",
    paddingHorizontal: wp(2),
    borderRadius: 5,
  },
  sub_container_style: {
    backgroundColor: "white",
    padding: wp(5),
    paddingHorizontal: wp(5),
  },
  title: {
    fontWeight: "bold",
  },
  des_text: {
    marginTop: wp(2),
    lineHeight: wp(6),
  },
  borderLine: {
    borderBottomWidth: 1,
    marginTop: wp(5),
    marginBottom: wp(5),
  },
  mapStyle: {
    height: wp(40),
    marginTop: wp(2),
    borderRadius: 5,
  },
  imgContainer: {
    marginTop: wp(2),
    flexDirection: "row",
  },
});

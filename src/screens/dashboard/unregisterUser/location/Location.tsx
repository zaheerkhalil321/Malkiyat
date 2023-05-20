import React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
  Route,
} from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import Header from "@src/components/common/Header";
import { RouteObj } from "../../unregisterUser/propertyFurtherDetail";
import Container from "@src/components/common/Container";

type RouteName = "Location";
export interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: Route<RouteName, RouteObj>;
}
const Location = (props: Props) => {
  return (
    <Container
      style={{ backgroundColor: "#F4F4F4" }}
      statusBarColor={"#F4F4F4"}
      barStyle={"dark-content"}
    >
      <Header {...props} title="Location" />
      <Content bounces={false} contentContainerStyle={styles.container}>
        <View
          style={{
            paddingHorizontal: wp(4),
            paddingBottom: wp(10),
            backgroundColor: "#F4F4F4",
            flex: 1,
          }}
        >
          <MapView
            style={styles.mapStyle}
            showsUserLocation={false}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: props.route?.params?.data?.latitude ?? 0,
              longitude: props.route?.params?.data?.longitude ?? 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: props.route.params?.data?.latitude ?? 0,
                longitude: props.route.params?.data?.longitude ?? 0,
              }}
              title={props.route.params?.data?.title}
              description={props.route.params?.data?.title}
            />
          </MapView>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flexGrow: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Location;

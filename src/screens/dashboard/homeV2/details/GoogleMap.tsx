import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

import { wp } from "@src/components/common/Responsive";

const GoogleMap = (props) => {
  return (
    <View
      style={{
        width: wp(100),
        height: Dimensions.get("window").height,
      }}
    >
      <MapView
        style={styles.mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: props?.latitude ?? 0,
          longitude: props?.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: props?.latitude ?? 0,
            longitude: props?.longitude ?? 0,
          }}
          title={props.propertyName}
          description={props?.address}
        />
      </MapView>
    </View>
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
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default GoogleMap;

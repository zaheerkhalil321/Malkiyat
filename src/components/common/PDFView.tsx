import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";

import Container from "./Container";
import Header from "./Header";
import { wp } from "./Responsive";

export const PDFView = (props: any) => {
  const data = props.route?.params.data ?? undefined;
  const source = {
    uri: data?.documentUrl ?? data.uri,
    cache: true,
  };
  return (
    <Container
      style={{ backgroundColor: "#F4F4F4" }}
      statusBarColor={"#F4F4F4"}
      barStyle={"dark-content"}
    >
      {/* Title is missing from backend */}
      <Header {...props} title={"Property Title"} />
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingBottom: wp(10),
          backgroundColor: "#F4F4F4",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => { }}
            onPageChanged={(page, numberOfPages) => { }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => { }}
            style={styles.pdf}
          />
        </View>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

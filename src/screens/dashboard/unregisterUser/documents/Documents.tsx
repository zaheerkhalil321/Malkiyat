import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import Container from "@src/components/common/Container";
import Header from "@src/components/common/Header";
import { wp } from "@src/components/common/Responsive";
import Thumbnail from "@src/components/common/Thumbnail";
import { useSelector } from "react-redux";
import MUnregisterUser from "@src/services/MUnregisterUserApiService";
import { RootState } from "@src/redux/reducers";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

const Documents = (props: any) => {
  const { data } = props.route?.params ?? undefined;
  const dispatch = useSafeDispatch();
  const unRegisterUser = useSelector(
    (state: RootState) => state.unregisterUser
  );
  const PropertyDoc = unRegisterUser.documentDetail;
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(MUnregisterUser.getDoucmentByID(data.id));
  }, []);

  return (
    <Container
      style={{ backgroundColor: "#F4F4F4" }}
      statusBarColor={"#F4F4F4"}
      barStyle={"dark-content"}
    >
      <Header {...props} title="Malkiyat Documents" />
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingBottom: wp(10),
          backgroundColor: "#F4F4F4",
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "white",
            borderColor: colors.Primary,
            borderWidth: 0.8,
            borderRadius: wp(2),
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
          }}
        >
          {PropertyDoc!.length > 0 ? (
            <FlatList
              style={styles.container}
              numColumns={3}
              data={PropertyDoc}
              renderItem={(item) => (
                <Thumbnail navigation={props.navigation} item={item} />
              )}
            />
          ) : (
            <View style={styles.message}>
              <ResponsiveText style={styles.text}>No Document</ResponsiveText>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  message: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 6,
    justifyContent: "center",
  },
});

export default Documents;

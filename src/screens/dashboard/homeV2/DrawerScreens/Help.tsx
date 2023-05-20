import { View, Image, TouchableOpacity, Linking } from "react-native";
import React, { useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Pic from "@src/assets/images/helppic.png";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import HelpButton from "@src/assets/images/helpbutton.svg";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
interface HelpInterface {
  phoneNo: string;
  email: string;
  imgUrl: string;
}
const Help = (props) => {
  const [data, setData] = useState<HelpInterface[]>([]);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    fetchDetails();
  }, [props.navigation]);
  const fetchDetails = async () => {
    setLoading(true);
    const res = await MRegisterUserApiService.support();
    setData(res?.data.data);
    setLoading(false);
    // console.log(res?.data.data, 'qqq')
  };
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Contact Us"}
      />
      <View style={{ paddingHorizontal: wp(5) }}>
        <ResponsiveText
          style={{
            color: "#828282",
            fontFamily: Fonts.ManropeSemiBold,
            fontSize: 4.8,
            width: wp(70),
            lineHeight: 25,
            marginTop: wp(7),
            marginBottom: wp(15),
          }}
        >
          For any queries, issues or just want to have a chat :)
        </ResponsiveText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => Linking.openURL("tel:042111111111")}
            style={{
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
              width: wp(42),
              height: wp(13),
              borderRadius: wp(3),
            }}
          >
            <Image
              style={{
                width: wp(42),
                height: wp(13),
                resizeMode: "stretch",
              }}
              source={require("@src/assets/images/talktous.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `whatsapp://send?phone='042111111111'&text=Need Help?`
              );
            }}
            style={{
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
              width: wp(42),
              height: wp(13),
              borderRadius: wp(3),
            }}
          >
            <Image
              style={{
                width: wp(42),
                height: wp(13),
                resizeMode: "stretch",
              }}
              source={require("@src/assets/images/livechat.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#DCDCDC",
            height: 1,
            marginVertical: wp(12),
          }}
        />
        <ResponsiveText
          style={{
            color: "#828282",
            fontSize: 4,
            lineHeight: 25,
            marginBottom: wp(10),
          }}
        >
          You can also reach out to us on:
        </ResponsiveText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            style={{ width: wp(14), height: wp(14) }}
            source={require("@src/assets/images/insta.png")}
          />
          <Image
            style={{ width: wp(14), height: wp(14) }}
            source={require("@src/assets/images/facbook_icon.png")}
          />
          <Image
            style={{ width: wp(14), height: wp(14) }}
            source={require("@src/assets/images/youtube_icon.png")}
          />
          <Image
            style={{ width: wp(14), height: wp(14) }}
            source={require("@src/assets/images/linkdin_icon.png")}
          />
        </View>
      </View>

      {/* <View style={{ alignItems: "center" }}>

        <Image
          style={{
            width: wp(80),
            height: wp(90),
            marginTop: wp(5),
            marginBottom: wp(10),
          }}
          source={{ uri: data && data[0]?.imgUrl }}
        />
        <ResponsiveText>
          Call us at
          <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
            {data && data[0]?.phoneNo}
          </ResponsiveText>{" "}
        </ResponsiveText>
        <ResponsiveText style={{ marginVertical: wp(1) }}>
          or email us at{" "}
        </ResponsiveText>
        <ResponsiveText
          style={{ fontFamily: Fonts.ManropeBold, marginBottom: wp(10) }}
        >
          {data && data[0]?.email}
        </ResponsiveText>
        <TouchableOpacity>
          <HelpButton />
        </TouchableOpacity>
      </View> */}
      <Loader visible={loading} />
    </Container>
  );
};

export default Help;

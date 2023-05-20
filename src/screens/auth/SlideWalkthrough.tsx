import { ParamListBase, NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import InstaStory from "react-native-insta-story";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}
interface StoriesI {
  story_id: number;
  story_image: string;
  swipeText: string;
  onPress: () => void;
}
interface StoriesListI {
  user_id: number;
  user_image: string | undefined;
  user_name: string;
  stories: StoriesI[];
}
export default function App(props: Props) {
  function createData() {
    const array: StoriesListI[] = [];

    const userCount = 1;
    const imageUrls = [
      require("@src/assets/images/slide11.png"),
      require("@src/assets/images/slide1.png"),
      require("@src/assets/images/slide2.png"),
      require("@src/assets/images/slide3.png"),
    ];
    for (let i = 1; i <= userCount; i++) {
      const storyArray: StoriesI[] = [];
      for (let k = 0; k <= imageUrls.length - 1; k++) {
        storyArray.push({
          story_id: i,
          story_image: imageUrls[k],
          swipeText: "Custom swipe text for this story",
          onPress: () => console.log(`story ${i} swiped`),
        });
      }

      array.push({
        user_id: i,
        user_image: undefined,
        user_name: "",
        stories: storyArray,
      });
    }
    return array;
  }

  return (
    <View style={styles.container}>
      <InstaStory
        data={createData()}
        duration={5}
        pressedBorderColor="red"
        onClose={() => {
          props.navigation.navigate("DashBoardStack", {
            screen: "UnregisterUserStack",
            params: {
              screen: "HomeView",
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

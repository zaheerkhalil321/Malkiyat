import { View } from "react-native";
import React, { useState } from "react";

import Container from "@src/components/common/Container";
import TopTabs from "./TopTabs";
import { wp } from "@src/components/common/Responsive";
import GoogleMap from "./GoogleMap";
import ProjectMap from "./ProjectMap";
import LandMarks from "./LandMarks";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import _ from "lodash";

const LocationTabs = (props) => {
  const reducerState = useSelector(
    (state: RootState) => state.unregisterUser.propertyAllData
  );
  const [tabs, setTabs] = useState("google");
  return (
    <Container>
      <View style={{ paddingBottom: 5, overflow: "hidden" }}>
        <View
          style={{
            alignItems: "center",
            // marginVertical: wp(2),
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        >
          <TopTabs setTabs={setTabs} tabs={tabs} />
        </View>
      </View>
      <View style={{}}>
        {tabs == "google" && <GoogleMap {...props.propInfo} />}
        {tabs == "project" && <ProjectMap {...props.propInfo} />}
        <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(5) }}>
          {tabs == "land" &&
            _.size(reducerState?.propertyLocationDetails) > 0 &&
            reducerState?.propertyLocationDetails?.map((item, index) => {
              return (
                <View key={index}>
                  <LandMarks {...item} />
                </View>
              );
            })}
        </View>
      </View>
    </Container>
  );
};

export default LocationTabs;

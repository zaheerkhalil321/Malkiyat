import React from "react";
import { LineChart, YAxis, Grid, XAxis } from "react-native-svg-charts";
import { View } from "react-native";

const SoldChart = (props) => {
  const monthsArray: string[] = props.data.map((item) => item.month);
  const data = [1, 2, 3, 4, 5, 6];

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ width: 300, height: 200, flex: 1 }}>
      {monthsArray.length > 0 ? (
        <>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <YAxis
              data={monthsArray}
              contentInset={contentInset}
              svg={{
                fill: "grey",
                fontSize: 10,
              }}
              numberOfTicks={6}
              formatLabel={(value) => `${value}ºC`}
            />
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={data}
              svg={{ stroke: "#3577DB" }}
              contentInset={contentInset}
            >
              <Grid />
            </LineChart>
          </View>

          <XAxis
            data={monthsArray}
            formatLabel={(value, index) => value}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: "black" }}
          />
        </>
      ) : null}
    </View>
  );
};
export default SoldChart;

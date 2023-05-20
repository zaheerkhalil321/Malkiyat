import { useTheme } from "@react-navigation/native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

export default function Chart(props: any) {
  const { colors } = useTheme();

  const getValue = (arr, atr) => {
    let result = [];
    arr?.forEach((element) => {
      if (atr.toLowerCase() === "month") {
        result.push(element[atr].substr(0, 3) as never);
      } else {
        result.push(parseInt(element[atr]) as never);
      }
    });
    return result;
  };

  return (
    <LineChart
      data={{
        labels: getValue(props.data, "month"),
        datasets: [
          {
            data: getValue(props.data, "soldSmallerUnits"),
          },
        ],
      }}
      width={335} // from react-native
      height={170}
      yAxisLabel="sq-ft "
      yAxisSuffix=""
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(59, 65, 97, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(59, 65, 97, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "2",
          strokeWidth: "2",
          stroke: colors.Primary,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}

import React from "react";
import { useWindowDimensions, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { PieChart } from "react-native-chart-kit";

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};

const PieChartAnalysisWithDatePicker = ({ pieData }) => {
  if (!pieData || !Array.isArray(pieData)) {
    return <Text>No data available</Text>; // Or return null to not display anything
  }

  const pieDataWithColors = pieData.map((item) => ({
    ...item,
    color: generateRandomColor(),
    legendFontColor: Colors.brown100,
    legendFontSize: 15,
  }));

  const { width } = useWindowDimensions();
  const widthWithPadding = width - 30;

  return (
    <>
      <View style={styles.container}>
        <PieChart
          data={pieDataWithColors}
          width={widthWithPadding}
          height={230}
          chartConfig={{
            backgroundColor: Colors.brown500,
            backgroundGradientFrom: Colors.brown500,
            backgroundGradientTo: Colors.brown500,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"expenses"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 10]}
        />
      </View>
    </>
  );
};

export default PieChartAnalysisWithDatePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brown500,
    borderRadius: 16,
  },
});

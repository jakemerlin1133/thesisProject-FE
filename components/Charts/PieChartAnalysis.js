import React from "react";
import { useWindowDimensions, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { PieChart } from "react-native-chart-kit";

const predefinedColors = [
  "#9461f2",
  "#33FF57", 
  "#FF5733", 
  "#FF33A8", 
  "#3357FF", 
  "#FFD700", 
  "#8A2BE2", 
  "#7eabf2",
];

const PieChartAnalysis = ({ pieData }) => {
  // Ensure the pieData structure is correct and assign static colors
  const pieDataWithColors = pieData.map((item, index) => ({
    name: item.name,
    expenses: item.expenses, // Ensure this matches the "accessor" field
    color: predefinedColors[index % predefinedColors.length], 
    legendFontColor: "#795548",
    legendFontSize: 15,
  }));

  // Log the data to check if colors are assigned correctly
  console.log("Pie Data:", pieDataWithColors);

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

export default PieChartAnalysis;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brown500,
    borderRadius: 16,
  },
});

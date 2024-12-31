import React from "react";
import { useWindowDimensions, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { PieChart } from "react-native-chart-kit";

const PieChartAnalysis = () => {
  const data = [
    { name: "Food", expenses: 2100 },
    { name: "Hardware", expenses: 1150 },
    { name: "Grocery", expenses: 1100 },
    { name: "Bills", expenses: 1100 },
    { name: "Shopping", expenses: 2150 },
    { name: "Drug Store", expenses: 1180 },
    { name: "Others", expenses: 1220 },
  ];

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  const pieData = data.map((item, index) => ({
    name: item.name,
    expenses: item.expenses,
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
          data={pieData}
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

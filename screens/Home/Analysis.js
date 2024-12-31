import { View, StyleSheet, ScrollView, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import PieChartAnalysis from "../../components/Charts/PieChartAnalysis";
import { Colors } from "../../constants/Colors";

const Analysis = () => {
  return (
    <>
      <View style={styles.chartContainer}>
        <ScrollView>
          <Text style={styles.title}>
            "Comparison of Expense Categories: This Month and Chosen Month"
          </Text>
          <Text style={styles.subTitle}>This Month:</Text>
          <PieChartAnalysis />
          <Text style={styles.totalExpenses}>
            Total Expenses for this month: 24000
          </Text>
          <View style={styles.row}>
            <Text style={styles.subTitle}>From:</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "January", value: "January" },
                { label: "February", value: "February" },
                { label: "March", value: "March" },
                { label: "April", value: "April" },
                { label: "May", value: "May" },
                { label: "June", value: "June" },
                { label: "July", value: "July" },
                { label: "August", value: "August" },
                { label: "September", value: "September" },
                { label: "October", value: "October" },
                { label: "November", value: "November" },
                { label: "December", value: "December" },
              ]}
              placeholder={{ label: "Month", value: null }}
              style={pickerStyles}
            />
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "2024", value: "2024" },
                { label: "2023", value: "2023" },
              ]}
              placeholder={{ label: "2024", value: null }}
              style={pickerStyles}
            />
          </View>
          <PieChartAnalysis />
          <Text style={styles.totalExpenses}>
            Total Expenses for this month: 24000
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    textAlign: "center",
    color: Colors.brown600,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  subTitle: {
    color: Colors.brown600,
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  totalExpenses: {
    color: Colors.brown600,
    fontWeight: "bold",
    fontSize: 17,
    marginRight: 10,
    marginBottom: 25,
  },
});

const pickerStyles = {
  inputAndroid: {
    width: 140,
    backgroundColor: Colors.brown600,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: Colors.brown100,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  inputIOS: {
    width: 160,
    backgroundColor: Colors.brown600,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: Colors.brown100,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  placeholder: {
    color: Colors.brown100,
    fontWeight: "bold",
  },
};

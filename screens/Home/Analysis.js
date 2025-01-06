import { View, StyleSheet, ScrollView, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import PieChartAnalysis from "../../components/Charts/PieChartAnalysis";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

const Analysis = ({ route }) => {
  const { userId } = route.params;

  const [prediction, setPrediction] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [arrowIcon, setArrowIcon] = useState("");
  const [arrowColor, setArrowColor] = useState("");

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/expense/predict/${userId}`
        );
        console.log("Prediction Data:", response.data);
        setPrediction(parseFloat(response.data.prediction));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrediction();
  }, [userId]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}`);
        const today = new Date();
        const currentYear = today.getFullYear();

        const latestMonth = response.data.reduce((latest, expense) => {
          const expenseDate = new Date(expense.uploaded_at);
          if (expenseDate.getFullYear() === currentYear) {
            if (!latest || expenseDate > latest) {
              return expenseDate;
            }
          }
          return latest;
        }, null);

        const latestExpenses = response.data.filter((expense) => {
          const expenseDate = new Date(expense.uploaded_at);
          return (
            expenseDate.getFullYear() === currentYear &&
            expenseDate.getMonth() === latestMonth.getMonth()
          );
        });

        const total = latestExpenses.reduce(
          (acc, expense) => acc + parseFloat(expense.total_value),
          0
        );
        console.log("Total Expenses:", total);
        setTotalExpenses(total);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };
    fetchExpenses();
  }, [userId]);

  useEffect(() => {
    if (totalExpenses && prediction) {
      const isPredictionHigher = prediction > totalExpenses;
      const arrowIcon = isPredictionHigher
        ? "arrow-up-outline"
        : "arrow-down-outline";
      const arrowColor = isPredictionHigher ? "#ff4221" : "#03fc0f";

      console.log("Arrow Icon:", arrowIcon);
      console.log("Arrow Color:", arrowColor);

      setArrowIcon(arrowIcon);
      setArrowColor(arrowColor);
    }
  }, [totalExpenses, prediction]);

  return (
    <>
      <View style={styles.chartContainer}>
        <ScrollView>
          <Text style={[styles.title, { fontSize: 30 }]}>Prediction</Text>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              <Text style={{ fontSize: 19 }}>
                The expected total expenses for the next month: ₱{prediction}
                <Ionicons
                  name={arrowIcon}
                  size={20}
                  style={[styles.icon, { color: arrowColor }]}
                />
                .
              </Text>
            </Text>
          </View>

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
  predictionContainer: {
    paddingVertical: 40,
    marginVertical: 15,
    backgroundColor: Colors.brown500,
    fontWeight: "bold",
    borderRadius: 15,
  },
  icon: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  predictionText: {
    fontSize: 12,
    padding: 12,
    fontWeight: "bold",
    color: Colors.brown100,
    textAlign: "center",
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

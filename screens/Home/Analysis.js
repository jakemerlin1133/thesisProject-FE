import { View, StyleSheet, ScrollView, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import PieChartAnalysis from "../../components/Charts/PieChartAnalysis";
import PieChartAnalysisWithDatePicker from "../../components/Charts/PieChartAnalysisWithDatePicker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

const Analysis = ({ route }) => {
  const { userId } = route.params;

  const [prediction, setPrediction] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSumExpenses, setTotalSumExpenses] = useState(0);

  const [categories, setCategories] = useState([]);

  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartDataWithPicker, setPieChartDataWithPicker] = useState([]);

  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [arrowIcon, setArrowIcon] = useState("");
  const [arrowColor, setArrowColor] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/`);
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/expense/predict/${userId}`
        );
        setPrediction(parseFloat(response.data.prediction) || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrediction();
  }, [userId]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);
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
      setArrowIcon(arrowIcon);
      setArrowColor(arrowColor);
    }
  }, [totalExpenses, prediction]);

  useEffect(() => {
    if (categories.length === 0) return;

    const fetchSumExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);
        const expenses = response.data;

        if (!expenses.length) {
          console.log("No expenses found.");
          return;
        }

        const latestDate = expenses.reduce((latest, expense) => {
          const expenseDate = new Date(expense.uploaded_at);
          return expenseDate > latest ? expenseDate : latest;
        }, new Date(0));

        const latestYear = latestDate.getFullYear();
        const latestMonth = latestDate.getMonth();

        const latestMonthExpenses = expenses.filter((expense) => {
          const expenseDate = new Date(expense.uploaded_at);
          return (
            expenseDate.getFullYear() === latestYear &&
            expenseDate.getMonth() === latestMonth
          );
        });

        const totalSum = latestMonthExpenses.reduce(
          (sum, expense) => sum + parseFloat(expense.total_value),
          0
        );

        setTotalSumExpenses(totalSum);

        const categorizedData = latestMonthExpenses.reduce((acc, expense) => {
          const category = expense.matched_store_category || "Uncategorized";
          if (acc[category]) {
            acc[category] += parseFloat(expense.total_value);
          } else {
            acc[category] = parseFloat(expense.total_value);
          }
          return acc;
        }, {});

        const pieChartFormattedData = Object.keys(categorizedData).map(
          (category) => ({
            name: category,
            expenses: categorizedData[category],
          })
        );

        setPieChartData(pieChartFormattedData);
      } catch (error) {
        console.error("Error fetching expenses for the latest month:", error);
      }
    };
    fetchSumExpenses();
  }, [userId, categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);
        const data = response.data;

        const uniqueYears = [
          ...new Set(
            data.map((item) => new Date(item.uploaded_at).getFullYear())
          ),
        ];

        const sortedYears = uniqueYears.sort((a, b) => b - a);
        setYears(sortedYears);

        const latestDate = data.reduce((latest, item) => {
          const itemDate = new Date(item.uploaded_at);
          return itemDate > latest ? itemDate : latest;
        }, new Date(0));

        const latestYear = latestDate.getFullYear();
        const latestMonth = latestDate.getMonth();

        setSelectedYear(latestYear.toString());
        setSelectedMonth((latestMonth + 1).toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <>
      <View style={styles.chartContainer}>
        <ScrollView>
          <Text style={[styles.title, { fontSize: 30 }]}>Prediction</Text>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              <Text style={{ fontSize: 19 }}>
                The expected total expenses for the next month: ₱
                {prediction.toFixed(2)}
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
          <Text style={styles.subTitle}>Current Month:</Text>
          <PieChartAnalysis pieData={pieChartData} />
          <Text style={styles.totalExpenses}>
            Total Expenses for this month: ₱{totalSumExpenses.toFixed(2)}
          </Text>
          <View style={styles.row}>
            <Text style={styles.subTitle}>From:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedMonth(value)}
              items={[
                { label: "January", value: "1" },
                { label: "February", value: "2" },
                { label: "March", value: "3" },
                { label: "April", value: "4" },
                { label: "May", value: "5" },
                { label: "June", value: "6" },
                { label: "July", value: "7" },
                { label: "August", value: "8" },
                { label: "September", value: "9" },
                { label: "October", value: "10" },
                { label: "November", value: "11" },
                { label: "December", value: "12" },
              ]}
              value={selectedMonth}
              placeholder={{}}
              style={pickerStyles}
            />

            <RNPickerSelect
              onValueChange={handleYearChange}
              items={years
                .sort((a, b) => b - a)
                .filter((year, index) => index !== 0)
                .map((year) => ({
                  label: year.toString(),
                  value: year.toString(),
                }))}
              placeholder={{
                label: years.length > 0 ? `${years[0]}` : "Select Year",
                value: years.length > 0 ? years[0].toString() : null,
              }}
              value={
                selectedYear || (years.length > 0 ? years[0].toString() : null)
              }
              style={pickerStyles}
            />
          </View>
          <PieChartAnalysisWithDatePicker />
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
    fontSize: 15,
    marginLeft: 15,
    marginTop: 5,
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

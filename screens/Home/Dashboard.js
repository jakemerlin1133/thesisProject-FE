import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import axios from "axios";

import ListOfExpensesCategory from "../../components/ListOfExpensesCategory";
import { BASE_URL } from "../../config";

const Dashboard = ({ route }) => {
  const { userId } = route.params;
  const [totalSum, setTotalSum] = useState(0);
  const [latestDate, setLatestDate] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);
        const expenses = response.data;

        const latest = expenses.reduce((latestExpense, currentExpense) => {
          const latestDate = new Date(latestExpense.uploaded_at);
          const currentDate = new Date(currentExpense.uploaded_at);

          if (currentDate.getFullYear() > latestDate.getFullYear()) {
            return currentExpense;
          } else if (currentDate.getFullYear() === latestDate.getFullYear()) {
            return currentDate.getMonth() > latestDate.getMonth()
              ? currentExpense
              : latestExpense;
          }
          return latestExpense;
        });

        const latestDateFormatted = new Date(latest.uploaded_at);
        const formattedDate = `${latestDateFormatted.toLocaleString("default", {
          month: "long",
        })}, ${latestDateFormatted.getFullYear()}`;
        setLatestDate(formattedDate);

        const latestDateExpenses = expenses.filter((expense) => {
          const expenseDate = new Date(expense.uploaded_at);
          return (
            expenseDate.getFullYear() === latestDateFormatted.getFullYear() &&
            expenseDate.getMonth() === latestDateFormatted.getMonth()
          );
        });

        const sum = latestDateExpenses.reduce((acc, expense) => {
          return acc + parseFloat(expense.total_value);
        }, 0);

        setTotalSum(sum);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [userId]);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.dahboardContainer}>
          <View style={styles.ExpensesContainer}>
            <Text style={[styles.textContent]}>{latestDate}</Text>
            <Text
              style={[styles.textContent, { fontSize: 30, fontWeight: "bold" }]}
            >
              ₱{totalSum.toFixed(2)}
            </Text>
            <Text style={[styles.textContent, { fontSize: 15 }]}>
              Current Month's Expenses
            </Text>
          </View>
          <View>
            <ListOfExpensesCategory />
          </View>
        </View>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ExpensesContainer: {
    backgroundColor: Colors.brown500,
    padding: 18,
    borderRadius: 8,
  },
  dahboardContainer: {
    flex: 1,
    borderRadius: 15,
    margin: 15,
  },
  textContent: {
    color: Colors.brown50,
  },
});

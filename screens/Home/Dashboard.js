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

  const [foodSumExpenses, setFoodSumExpenses] = useState(0);
  const [grocerySumExpenses, setGrocerySumExpenses] = useState(0);
  const [shoppingSumExpenses, setShoppingSumExpenses] = useState(0);
  const [billSumExpenses, setBillSumExpenses] = useState(0);
  const [hardwareSumExpenses, setHardwareSumExpenses] = useState(0);
  const [medicineSumExpenses, setMedicineSumExpenses] = useState(0);
  const [technologySumExpenses, setTechnologySumExpenses] = useState(0);
  const [othersSumExpenses, setOthersSumExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);
        const expenses = response.data;

        if (expenses.length === 0) {
          const currentDate = new Date();
          const formattedCurrentDate = `${currentDate.toLocaleString(
            "default",
            {
              month: "long",
            }
          )}, ${currentDate.getFullYear()}`;
          setLatestDate(formattedCurrentDate);
          setTotalSum(0);
          setFoodSumExpenses(0);
          return;
        }

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

        const foodSum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Food")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setFoodSumExpenses(foodSum.toFixed(2));

        const grocerySum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Grocery")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setGrocerySumExpenses(grocerySum.toFixed(2));

        const shoppingSum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Shopping")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setShoppingSumExpenses(shoppingSum.toFixed(2));

        const billsSum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Bill")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setBillSumExpenses(billsSum.toFixed(2));

        const medicineSum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Medicine")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setMedicineSumExpenses(medicineSum.toFixed(2));

        const hardwareSum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Hardware")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setHardwareSumExpenses(hardwareSum.toFixed(2));

        const technologySum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Technology")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setTechnologySumExpenses(technologySum.toFixed(2));

        const othersSum = latestDateExpenses
          .filter((expense) => expense.matched_store_category === "Others")
          .reduce((acc, expense) => acc + parseFloat(expense.total_value), 0);
        setOthersSumExpenses(othersSum.toFixed(2));
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [userId, route.params?.refresh]);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.dahboardContainer}>
          <View style={styles.ExpensesContainer}>
            <Text style={[styles.textContent]}>{latestDate}</Text>
            <Text
              style={[styles.textContent, { fontSize: 30, fontWeight: "bold" }]}
            >
              ₱{totalSum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Text>
            <Text style={[styles.textContent, { fontSize: 15 }]}>
              Current Month's Expenses
            </Text>
          </View>
          <View>
            <ListOfExpensesCategory
              fooodExpenses={foodSumExpenses}
              groceryExpenses={grocerySumExpenses}
              shoppingExpenses={shoppingSumExpenses}
              billExpenses={billSumExpenses}
              medicineExpenses={medicineSumExpenses}
              hardwareExpenses={hardwareSumExpenses}
              technologyExpenses={technologySumExpenses}
              othersExpenses={othersSumExpenses}
              userId={userId}
            />
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

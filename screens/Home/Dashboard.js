import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Background from "../../components/Background";
import { Colors } from "../../constants/Colors";

import ListOfExpensesCategory from "../../components/ListOfExpensesCategory";

const Dashboard = ({ route }) => {
  const { userId } = route.params;
  const [selectedChart, setSelectedChart] = useState(null);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.dahboardContainer}>
          <View style={styles.ExpensesContainer}>
            <Text style={[styles.textContent, {}]}>December, 2024 </Text>
            <Text
              style={[styles.textContent, { fontSize: 30, fontWeight: "bold" }]}
            >
              ₱1000
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

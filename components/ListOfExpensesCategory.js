import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const ListOfExpensesCategory = ({
  fooodExpenses,
  groceryExpenses,
  shoppingExpenses,
  billExpenses,
  hardwareExpenses,
  medicineExpenses,
  technologyExpenses,
  othersExpenses,
}) => {


  return (
    <>
      <ScrollView>
        <View style={styles.container}>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="fast-food-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Foods</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {fooodExpenses ? Number(fooodExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="cart-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Grocery</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {groceryExpenses ? Number(groceryExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="shirt-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Shopping</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {shoppingExpenses  ? Number(shoppingExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="cash-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Bill</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {billExpenses ? Number(billExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="heart-circle-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Medicine</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {medicineExpenses ? Number(medicineExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="build-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Hardware</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>
                  P {hardwareExpenses ? Number(hardwareExpenses).toLocaleString() : "0"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="hardware-chip-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Technology</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {technologyExpenses ? Number(technologyExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.expensesCategory}>
              <View>
                <Ionicons
                  name="apps-outline"
                  size={24}
                  style={styles.iconStyle}
                />
              </View>

              <View style={styles.foodStyleContainer}>
                <Text style={styles.textCategoryandExepenses}>Others</Text>
              </View>
              <View style={styles.expensesContainer}>
                <Text style={styles.expensesText}>P {othersExpenses ? Number(othersExpenses).toLocaleString() : "0"}</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </>
  );
};

export default ListOfExpensesCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 110,
  },
  expensesCategory: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.brown50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  foodStyleContainer: { justifyContent: "flex-end" },
  expensesContainer: {
    paddingLeft: 25,
    flex: 1,
    justifyContent: "flex-end",
  },
  expensesText: {
    textAlign: "right",
    color: Colors.brown500,
  },
  iconStyle: {
    marginRight: 8,
    backgroundColor: Colors.brown600,
    padding: 11,
    borderRadius: 30,
    color: Colors.brown50,
  },

  textCategoryandExepenses: {
    color: Colors.brown500,
  },
});

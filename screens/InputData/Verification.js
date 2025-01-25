import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { BASE_URL } from "../../config";

const Verification = ({ route }) => {
  const { userId } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);

        const latestExpense = response.data.sort((a, b) => b.id - a.id)[0];
        console.log("Latest Expense:", latestExpense);

        if (latestExpense) {
          if (
            latestExpense.total_value &&
            typeof latestExpense.total_value === "string"
          ) {
            const totalValue = parseFloat(latestExpense.total_value);

            if (!isNaN(totalValue)) {
              latestExpense.total_value = totalValue.toFixed(2);
            } else {
              console.log("Invalid total_value:", latestExpense.total_value);
              latestExpense.total_value = "Invalid value";
            }
          } else {
            console.log(
              "total_value is missing or not a string:",
              latestExpense.total_value
            );
            latestExpense.total_value = "Invalid value";
          }
        } else {
          console.log("No expense data found.");
        }

        setData(latestExpense);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expense data:", error);
        Alert.alert("Error", "Failed to fetch the data.");
        setLoading(false);
      }
    };

    fetchExpenseData();
  }, [userId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data found for this user.</Text>;
  }

  const { file, matched_store, matched_store_category, total_value } = data;
  const imageUri = `${BASE_URL}${file}`;
  console.log(imageUri);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Processed Image</Text>

          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Text>No image available</Text>
            )}
          </View>

          <View>
            <View style={styles.textAmount}>
              <TextInput
                style={[styles.inputDisplay, { flex: 1 }]}
                placeholderTextColor={Colors.brown600}
                value={matched_store ? matched_store[0] : "Others"}
                editable={false}
              />

              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.brown500}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.textAmount}>
              <TextInput
                style={[styles.inputDisplay, { flex: 1 }]}
                placeholderTextColor={Colors.brown600}
                value={matched_store_category || "Others"}
                editable={false}
              />

              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.brown500}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.textAmount}>
              <TextInput
                keyboardType="numeric"
                style={[styles.inputDisplay, { flex: 1 }]}
                placeholderTextColor={Colors.brown600}
                value={total_value ? total_value : "0.00"}
                editable={false}
              />

              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.brown500}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colors.brown600,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    width: 300,
    height: 400,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.brown300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.brown100,
  },
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
    paddingTop: 5,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  textAmount: {
    backgroundColor: Colors.brown200,
    color: Colors.brown50,
    marginHorizontal: 4,
    paddingHorizontal: 20,
    height: 50,
    marginVertical: 10,
  },
  editIcon: {
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 30,
    right: -27,
    top: -5,
  },

  inputDisplay: {
    color: Colors.brown500,
  },
  buttonStyle: {
    backgroundColor: Colors.brown600,
    paddingVertical: 10,
    marginHorizontal: 4,
    paddingHorizontal: 32,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.brown50,
    fontSize: 16,
    fontWeight: "500",
  },
});

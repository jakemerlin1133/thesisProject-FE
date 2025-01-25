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
import { useNavigation } from "@react-navigation/native";

const Verification = ({ route }) => {
  const { userId } = route.params;

  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editableFields, setEditableFields] = useState(new Set());

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}/`);

        const latestExpense = response.data.sort((a, b) => b.id - a.id)[0];

        if (latestExpense) {
          if (
            latestExpense.total_value &&
            typeof latestExpense.total_value === "string"
          ) {
            const totalValue = parseFloat(latestExpense.total_value);

            if (!isNaN(totalValue)) {
              latestExpense.total_value = totalValue.toFixed(2);
            } else {
              latestExpense.total_value = "Invalid value";
            }
          } else {
            latestExpense.total_value = "Invalid value";
          }
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

  const editHandler = (field) => {
    setEditableFields((prevFields) => {
      const updatedFields = new Set(prevFields);
      if (updatedFields.has(field)) {
        updatedFields.delete(field);
      } else {
        updatedFields.add(field);
      }
      return updatedFields;
    });
  };

  const submitHandler = async () => {
    try {
      if (!data || !data.id) {
        Alert.alert("Error", "Expense ID not found.");
        return;
      }

      const expenseId = data.id;
      const endpoint = `${BASE_URL}/expense/${userId}/${expenseId}/`;

      const updatedData = {
        matched_store: data.matched_store,
        matched_store_category: data.matched_store_category,
        total_value: data.total_value,
      };

      const response = await axios.put(endpoint, updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        navigation.navigate("DashboardTabs", { refresh: true, userId });
      } else {
        Alert.alert("Error", "Failed to update expense.");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      Alert.alert("Error", "An error occurred while updating the expense.");
    }
  };

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
            <View
              style={[
                styles.textAmount,
                {
                  backgroundColor: editableFields.has("store")
                    ? Colors.brown100
                    : Colors.brown300,
                },
              ]}
            >
              <TextInput
                style={[styles.inputDisplay, { flex: 1 }]}
                placeholderTextColor={Colors.brown600}
                value={matched_store ? matched_store[0] : "Others"}
                editable={editableFields.has("store")}
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    matched_store: [
                      text,
                      ...(prevData.matched_store?.slice(1) || []),
                    ],
                  }))
                }
              />

              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.brown500}
                  style={styles.editIcon}
                  onPress={() => editHandler("store")}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.textAmount,
                {
                  backgroundColor: Colors.brown300,
                },
              ]}
            >
              <TextInput
                style={[styles.inputDisplay, { flex: 1 }]}
                placeholderTextColor={Colors.brown600}
                value={matched_store_category}
                editable={false}
              />
            </View>

            <View
              style={[
                styles.textAmount,
                {
                  backgroundColor: editableFields.has("total")
                    ? Colors.brown100
                    : Colors.brown300,
                },
              ]}
            >
              <TextInput
                keyboardType="numeric"
                style={[styles.inputDisplay, { flex: 1 }]}
                placeholderTextColor={Colors.brown600}
                value={total_value}
                editable={editableFields.has("total")}
                onChangeText={(text) => {
                  const sanitizedText = text.replace(/[^0-9.]/g, "");

                  const parts = sanitizedText.split(".");
                  if (parts.length > 2) return;
                  if (parts[1] && parts[1].length > 2) {
                    return;
                  }

                  setData((prevData) => ({
                    ...prevData,
                    total_value: sanitizedText,
                  }));
                }}
              />

              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.brown500}
                  style={styles.editIcon}
                  onPress={() => editHandler("total")}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={submitHandler}
            >
              <Text style={styles.buttonText}>Done</Text>
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

import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";


const Input = ({ route }) => {
  const { userId } = route.params;

  const navigation = useNavigation();
  const [storeOptions, setStoreOptions] = useState([]);
  const [amount, setAmount] = useState("");
  const [rawAmount, setRawAmount] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectOtherStore, setSelectOtherStore] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const formatNumberWithCommas = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const MAX_AMOUNT = 999999999999999;

  const handleChange = (input) => {
    const rawValue = input.replace(/,/g, ""); 

    if (rawValue === "" || (/^\d*\.?\d{0,2}$/.test(rawValue) && Number(rawValue) <= MAX_AMOUNT)) {
      setRawAmount(rawValue);
      setAmount(formatNumberWithCommas(rawValue)); 
    } else {
      console.log("Amount exceeds maximum allowed value.");
    }

  };

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/stores/`);
        const stores = response.data.map((store) => ({
          label: store.store,
          value: store.store,
        }));

        setStoreOptions([...stores, { label: "Others", value: "Others" }]);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };

    fetchStore();
  }, [userId]);

  const submitHandler = async () => {
    const errors = {};

    if (selectedStore === "Others" && !selectOtherStore.trim()) {
      errors.otherStore = "Please enter the store name.";
    }

    if (!selectedStore) {
      errors.store = "Please select a store.";
    }

    if (!rawAmount.trim()) {
      errors.amount = "Please enter an amount.";
    }

    setErrorMessage(errors);

    if (Object.keys(errors).length === 0) {
      const expenseData = {
        user_id: userId,
        file: null,
        matched_store:
          selectedStore === "Others" ? selectOtherStore : selectedStore,
          total_value: rawAmount || "0.00",
      };

      console.log("Submitting Expense Data:", expenseData);

      try {
        const response = await axios.post(
          `${BASE_URL}/expense/${userId}/`,
          expenseData
        );
        console.log("Expense submitted successfully:", response.data);

        Alert.alert("Success", "Expense submitted successfully", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("DashboardTabs", { refresh: true, userId });
            },
          },
        ]);
      } catch (error) {
        setErrorMessage("Invalid Credentials.");
      }
    }
  };

  return (
    <>
      <View style={{ padding: 20 }}>
        {errorMessage.otherStore && (
          <Text style={styles.errorMessage}>{errorMessage.otherStore}</Text>
        )}

        {errorMessage.store && (
          <Text style={styles.errorMessage}>{errorMessage.store}</Text>
        )}

        {errorMessage.amount && (
          <Text style={styles.errorMessage}>{errorMessage.amount}</Text>
        )}

        <RNPickerSelect
          onValueChange={(value) => setSelectedStore(value)}
          items={storeOptions}
          placeholder={{ label: "Select a store", value: null }}
          style={pickerStyles}
        />
        {selectedStore === "Others" && (
          <TextInput
            style={styles.textAmount}
            placeholder="Input Other Store"
            placeholderTextColor={Colors.brown50}
            value={selectOtherStore}
            onChangeText={setSelectOtherStore}
          />
        )}
        <TextInput
          keyboardType="numeric"
          style={styles.textAmount}
          placeholder="Enter Amount"
          placeholderTextColor={Colors.brown50}
          value={amount}
          onChangeText={handleChange}
        />

        <TouchableOpacity style={styles.buttonStyle} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  textAmount: {
    backgroundColor: Colors.brown600,
    color: Colors.brown50,
    marginHorizontal: 4,
    paddingHorizontal: 20,
    height: 50,
    marginVertical: 10,
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
  errorMessage: {
    color: Colors.red,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
});

const pickerStyles = {
  inputAndroid: {
    backgroundColor: Colors.brown600,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: Colors.brown50,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  inputIOS: {
    backgroundColor: Colors.brown600,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: Colors.brown50,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  placeholder: {
    color: Colors.brown50,
    fontWeight: "bold",
  },
};

import React, { useEffect, useState } from "react";
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

const Input = ({ route }) => {
  const { userId } = route.params;

  const [storeOptions, setStoreOptions] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectOtherStore, setSelectOtherStore] = useState(null);
  const [errorMEssage, setErrorMessage] = useState("");

  const handleChange = (input) => {
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  };

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/stores/`);
        const stores = response.data;

        const formattedStores = stores.map((store) => ({
          label: store.store,
          value: store.store,
        }));

        const updatedStores = [
          ...formattedStores,
          { label: "Others", value: "Others" },
        ];
        setStoreOptions(updatedStores);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };
    fetchStore();
  }, [userId]);

  const submitHandler = async () => {
    const expenseData = {
      user_id: userId,
      file: null,
      matched_store:
        selectedStore === "Others" ? selectOtherStore : selectedStore,
      total_value:
        amount !== undefined && amount !== null ? parseFloat(amount) : 0.0,
    };

    console.log(expenseData);

    try {
      const response = await axios.post(
        `${BASE_URL}/expense/${userId}/`,
        expenseData
      );
      console.log("Expense submitted successfully:", response.data);
    } catch (error) {
      setErrorMessage("Invalid Credentials.");
    }
  };

  return (
    <>
      <View style={{ padding: 20 }}>
        <Text style={styles.errorMessage}>{errorMEssage}</Text>

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
          <Text style={styles.buttonText}>Login</Text>
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

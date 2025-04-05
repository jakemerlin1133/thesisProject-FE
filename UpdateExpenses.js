import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import axios from "axios";
import { BASE_URL } from "./config";
import { Colors } from "./constants/Colors";
import { useNavigation } from "@react-navigation/native";


const UpdateExpenses = ({ route }) => {
    const { userId, expenseId } = route.params;
    const [expenseData, setExpenseData] = useState({
        matched_store: "",
        matched_store_category: "",
        total_value: "",
    });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/expense/${userId}/${expenseId}`);
                const data = response.data;
                setExpenseData({
                    matched_store: data.matched_store[0] || '',
                    matched_store_category: data.matched_store_category,
                    total_value: data.total_value.toString(),
                });
            } catch (error) {
                console.error("Error fetching expense data:", error);
                Alert.alert("Error", "Failed to fetch expense data.");
            }
        };

        fetchExpenseData();
    }, [userId, expenseId]);

    const handleUpdate = async () => {
        try {
            const updatedData = {
                matched_store: expenseData.matched_store,
                matched_store_category: expenseData.matched_store_category,
                total_value: parseFloat(expenseData.total_value.replace(/,/g, "")),
            };
            const response = await axios.put(`${BASE_URL}/expense/${userId}/${expenseId}/`, updatedData, {
                headers: { "Content-Type": "application/json" },
            });
    
            if (response.status === 200) {

                Alert.alert("Success", "Expense updated successfully.");
                navigation.navigate("DashboardTabs", { refresh: true, userId });
            } else {
                Alert.alert("Error", "Failed to update expense.");
            }
        } catch (error) {
            console.error("Error updating expense:", error);
            Alert.alert("Error", "Failed to update expense.");
        }
    };


    const MAX_AMOUNT = 999999999999999;

    const handleChange = (input) => {
        const rawValue = input.replace(/,/g, "");

        if (rawValue === "" || (/^\d*\.?\d{0,2}$/.test(rawValue) && Number(rawValue) <= MAX_AMOUNT)) {
            const formattedValue = formatNumberWithCommas(rawValue);
            setExpenseData({ ...expenseData, total_value: formattedValue });
        } else {
            console.log("Amount exceeds maximum allowed value.");
        }
    };

    const formatNumberWithCommas = (value) => {
        let number = value.replace(/[^\d.]/g, "");
        let parts = number.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    return (
        <>
            <View style={{ padding: 20 }}>
                <TextInput
                    style={styles.textInput}
                    value={expenseData.matched_store}
                    onChangeText={(text) => setExpenseData({ ...expenseData, matched_store: text })}
                    placeholder="Store Name"
                    placeholderTextColor={Colors.brown50}
                />

                <TextInput
                    style={styles.textInput}
                    value={expenseData.matched_store_category}
                    onChangeText={(text) =>
                        setExpenseData({ ...expenseData, matched_store_category: text })
                    }
                    placeholder="Store Category"
                    placeholderTextColor={Colors.brown50}
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.textInput}
                    placeholder="Enter Amount"
                    placeholderTextColor={Colors.brown50}
                    value={expenseData.total_value}
                    onChangeText={handleChange}
                />

                <TouchableOpacity style={styles.buttonStyle} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default UpdateExpenses;

const styles = StyleSheet.create({
    textInput: {
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

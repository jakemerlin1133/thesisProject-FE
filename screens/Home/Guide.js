import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { BASE_URL } from "../../config";

import Ionicons from "react-native-vector-icons/Ionicons";

const Guide = ({ userId }) => {
    const [guide1, setGuide1] = useState(false);
    const [guide2, setGuide2] = useState(false);
    const [guide3, setGuide3] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/${userId}`);
                const user = response.data;

                setGuide1(user.guide_1);
                setGuide2(user.guide_2);
                setGuide3(user.guide_3);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [userId]);

    if (guide1 && guide2 && guide3) {
        return null;
    }

    const guide1Handler = async () => {
        try {
            setGuide1(true);
             await axios.patch(`${BASE_URL}/users/${userId}`, { guide_1: true });
        } catch (error) {
            console.error("Error updating guide_1:", error);
        }
    };

    const guide2Handler = async () => {
        try {
            setGuide2(true);

            await axios.patch(`${BASE_URL}/users/${userId}`, { guide_2: true });
        } catch (error) {
            console.error("Error updating guide_2:", error);
        }
    };

    const guide3Handler = async () => {
        try {
            setGuide3(true);
            await axios.patch(`${BASE_URL}/users/${userId}`, { guide_3: true });
        } catch (error) {
            console.error("Error updating guide_3:", error);
        }
    };

    return (
        <>
            {!guide1 && (
                <View style={styles.overlay}>
                    <View style={styles.guideBox}>
                        <View style={styles.guideIconText}>
                            <Ionicons name="home" color={Colors.brown100} size={90}/>
                            <Text style={styles.guideText}>Dashboard</Text>
                            <Text style={[styles.guideContent, {marginBottom:20}]}>The Dashboard Page provides an overview of all your expenses, categorized into various spending types such as Food, Grocery, Shopping, Bills, Medicine, Hardware, and more. It displays the current month's expenses, allowing you to track and manage your spending efficiently.</Text>

                            <Text style={styles.guideAddExpenses} > Three Ways to Add Expenses:</Text>

                            <View style={styles.guideUseContainer}>
                                <Text style={styles.guideForAddingExpenses}>Scan – Capture a receipt using your camera and extract expense details using OCR.</Text>
                                <Text style={styles.guideForAddingExpenses}>Upload – Upload an image of a receipt, and the system will process the details.</Text>
                                <Text style={styles.guideForAddingExpenses}>Input – Manually enter expense details, including the amount and store where the purchase was made.</Text>
                            </View>

                            </View>
                        <TouchableOpacity style={styles.nextButton} onPress={guide1Handler}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {guide1 && !guide2 && (
                <View style={styles.overlay}>
                    <View style={styles.guideBox}>
                        <View style={styles.guideIconText}>
                            <Ionicons name="stats-chart" color={Colors.brown100} size={90}/>
                            <Text style={styles.guideText}>Analysis</Text>
                            <Text style={[styles.guideContent, {marginBottom:20}]}>The Analysis Page provides insights into your spending habits and helps predict future expenses based on past data. This page is designed to assist in financial planning by offering a visual representation of your expenses through pie charts and a prediction model.</Text>

                            <View style={styles.guideUseContainer}>
                                <Text style={styles.guideForUsingAnalysis}>Expense Prediction – The system analyzes your previous expenses from different months and predicts your next month’s spending trends.</Text>
                                <Text style={styles.guideForUsingAnalysis}>Current Month Pie Chart – A visual breakdown of your current month's expenses, categorized into Food, Grocery, Shopping, Bills, and more.</Text>
                                <Text style={styles.guideForUsingAnalysis}>Custom Month Comparison – Select a specific month to compare its expenses with your current month using a pie chart.</Text>
                            </View>

                            </View>
                        <TouchableOpacity style={styles.nextButton} onPress={guide2Handler}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {guide1 && guide2 && !guide3 && (
                <View style={styles.overlay}>
                    <View style={styles.guideBox}>
                        <View style={styles.guideIconText}>
                            <Ionicons name="newspaper" color={Colors.brown100} size={90}/>
                            <Text style={styles.guideText}>Report</Text>
                            <Text style={[styles.guideContent, {marginBottom:20}]}>The Report Page provides a detailed breakdown of your expenses based on your selected date and month. This feature allows for efficient tracking, sorting, and printing of all recorded expenses.</Text>

                            <View style={styles.guideUseContainer}>
                                <Text style={styles.guideForUsingReport}>Custom Date Filtering – View expenses based on your chosen date and month for a personalized financial review.</Text>
                                <Text style={styles.guideForUsingReport}>Sorting Options – Organize your expense list by Store name, Date, Category, and Expense Value</Text>
                                <Text style={styles.guideForUsingReport}> Printable Report – Generate a printable version of your expense data for documentation or budgeting purposes.</Text>
                            </View>

                            </View>
                        <TouchableOpacity style={styles.nextButton} onPress={guide3Handler}>
                            <Text style={styles.nextButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default Guide;

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        zIndex: 10,
    },
    guideBox:{
        flex:1,
        marginTop:100
    },
    nextButton: {
        backgroundColor: Colors.brown600,
        alignSelf: "flex-end",
        alignItems: "flex-end",
        marginRight: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 3
    },
    nextButtonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: Colors.brown100
    },
    guideIconText:{
        alignItems:"center"
    },
    guideText:{
        fontSize:40,
        fontWeight:"bold",
        color:Colors.brown100,
        marginBottom:15
    },
    guideContent:{
        textAlign:"left",
        marginHorizontal: 20,
        color:Colors.brown100,
        fontSize:17,
    },
    guideUseContainer:{
        marginHorizontal: 20,
    },
    guideAddExpenses:{
        fontWeight:"bold",
        color:Colors.brown100,
        fontSize:20,
        marginBottom:10,
    },
    guideForAddingExpenses:{
        textAlign:"left",
        color:Colors.brown100,
        marginBottom:10,
        fontSize:16,
    },
    guideForUsingAnalysis:{
        textAlign:"left",
        color:Colors.brown100,
        marginBottom:10,
        fontSize:16,
    },
    guideForUsingReport:{
        textAlign:"left",
        color:Colors.brown100,
        marginBottom:10,
        fontSize:16,
    }

});
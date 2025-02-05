import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { BASE_URL } from "../../config";

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

    const guide1Handler = async () => {
        try {
            setGuide1(true);

            const updateResponse = await axios.patch(`${BASE_URL}/users/${userId}`, { guide_1: true }, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Error updating guide_1:", error);
        }
    };

    const guide2Handler = async () => {
        try {
            setGuide2(true);

            const updateResponse = await axios.patch(`${BASE_URL}/users/${userId}`, { guide_2: true }, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Error updating guide_2:", error);
        }
    };

    const guide3Handler = async () => {
        try {
            setGuide3(true);

            const updateResponse = await axios.patch(`${BASE_URL}/users/${userId}`, { guide_3: true }, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Error updating guide_3:", error);
        }
    };


    return (
        <>
            {!guide1 && (
                <View style={styles.overlay}>
                    <View style={styles.guideBox}>
                        <Text style={styles.guideText}>Guide 1</Text>
                        <TouchableOpacity style={styles.nextButton} onPress={guide1Handler}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {guide1 && !guide2 && (
                <View style={styles.overlay}>
                    <View style={styles.guideBox}>
                        <Text style={styles.guideText}>Guide 2</Text>
                        <TouchableOpacity style={styles.nextButton} onPress={guide2Handler}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {guide1 && guide2 && !guide3 && (
                <View style={styles.overlay}>
                    <View style={styles.guideBox}>
                        <Text style={styles.guideText}>Guide 3</Text>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        zIndex: 10,
    },
    guideText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
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
    }
});
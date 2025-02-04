import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Colors } from "../../constants/Colors";
import { BASE_URL } from "../../config";

const Guide = ({userId}) => {
    const [guide1, setGuide1] = useState(false);

    const guide1Handler = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${userId}`);
            const user = response.data;

            const updatedUserData = {
                guide_1: true,
            };

            const updateResponse = await axios.patch(`${BASE_URL}/users/${userId}`, updatedUserData, {
                headers: { "Content-Type": "application/json" },
            });

            setGuide1(updateResponse.data.guide_1);
        } catch (error) {
            console.error("Error updating guide_1:", error);
        }
    };


    return (<>
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
      
    </>)
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
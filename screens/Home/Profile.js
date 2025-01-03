import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { BASE_URL } from "../../config";

const Profile = ({ route, navigation }) => {
  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expensense/logout/`);

      if (response.status === 200) {
        await AsyncStorage.removeItem("userId");
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/backgroundImage/bg-1.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.text}>Jake Russel L. Merlin</Text>
          <Text style={styles.position}>Student</Text>
        </View>
      </View>

      <View style={styles.listOptions}>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
          <Ionicons name="log-out-outline" size={30} style={styles.icon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    backgroundColor: Colors.brown500,
    padding: 15,
  },
  nameContainer: {
    marginHorizontal: 10,
    paddingTop: 8,
  },
  text: {
    color: Colors.brown100,
    fontWeight: "bold",
    fontSize: 20,
  },
  position: {
    color: Colors.brown100,
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 8,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 60,
  },
  icon: {
    color: Colors.brown500,
    fontWeight: "bold",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: Colors.brown100,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    marginVertical: 2,
  },
  logoutText: {
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.brown500,
  },
  imageContainer: {},
  listOptions: {
    paddingHorizontal: 10,
  },
});

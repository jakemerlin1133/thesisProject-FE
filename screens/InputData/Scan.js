import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { BASE_URL } from "../../config";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

const Scan = ({ route }) => {
  const { userId } = route.params;

  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const takeImageHandler = async () => {
      const image = await launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!image.canceled && image.assets && image.assets.length > 0) {
        const uri = image.assets[0].uri;
        console.log("Captured image URI:", uri);
        setImageUri(uri);
        submitHandler(uri);
      } else {
        navigation.navigate("DashboardTabs", userId);
      }
    };
    takeImageHandler();
  }, []);

  const submitHandler = async (uri) => {
    if (!uri) {
      Alert.alert("No Image", "Please select an image to upload.");
      return;
    }
    setIsLoading(true);
    try {
      const fileName = uri.split("/").pop();
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: fileName || "uploaded_image.jpg",
        type: mimeType,
      });

      const response = await axios.post(
        `${BASE_URL}/expense/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigation.navigate("Verification", { userId });
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Scan;

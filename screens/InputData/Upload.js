import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../../config";

import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const Upload = ({ route }) => {
  const { userId } = route.params;

  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need permission to access your gallery to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      } else {
        console.log("Image picker canceled.");
      }
    } catch (error) {
      console.error("Error opening gallery:", error);
    }
  };

  const submitHandler = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select an image to upload.");
      return;
    }
    setIsLoading(true);
    try {
      const fileName = imageUri.split("/").pop();
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
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

      Alert.alert("Success", "Image uploaded successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Verification", { userId });
          },
        },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectTouchable} onPress={openGallery}>
          <Text style={styles.text}>Select File</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {imageUri ? (
            <>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </>
          ) : (
            <>
              <Text style={styles.placeholderText}>No image selected</Text>
            </>
          )}
        </View>

        {imageUri && !isLoading ? (
          <>
            <TouchableOpacity
              style={styles.uploadTouchable}
              onPress={submitHandler}
            >
              <Text style={styles.text}>Upload</Text>
            </TouchableOpacity>
          </>
        ) : isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <></>
        )}
      </View>
      </ScrollView>
    </>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  selectTouchable: {
    backgroundColor: Colors.brown600,
    color: Colors.brown50,
    paddingVertical: 18,
    paddingHorizontal:50
  },

  uploadTouchable: {
    backgroundColor: Colors.brown600,
    color: Colors.brown50,
    marginTop: 30,
    paddingVertical: 18,
    paddingHorizontal: 70
  },

  text: {
    textAlign: "center",
    color: Colors.brown100,
    fontSize: 18,
    borderRadius: 6,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 20,
    width: 300,
    height: 400,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.brown300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.brown100,
    
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholderText: {
    color: Colors.brown600,
    fontSize: 16,
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1, // Ensures ScrollView can expand
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

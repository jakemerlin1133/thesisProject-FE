import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { Colors } from "../constants/Colors";
import Background from "../components/Background";
import axios from "axios";

const Login = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const roundedHeight = Math.ceil(height / 100) * 100;
  const marginTop = roundedHeight <= 400 ? 25 : 140;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMEssage, setErrorMessage] = useState("");
  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "http://192.168.18.10:8000/expensense/login/",
        {
          user_name: username,
          password: password,
        }
      );
      if (response.status === 200) {
        const userId = response.data.user.id;
        navigation.navigate("DashboardTabs", {
          userId,
        });
      }
    } catch (error) {
      setErrorMessage("Invalid Username or Password.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <Background>
      <View style={(styles.Container, [{ marginTop: marginTop, margin: 40 }])}>
        <View>
          <Text style={styles.title}>Expensense</Text>
          <Text style={styles.subTitle}>Personal financial manager</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          {errorMEssage && (
            <Text style={styles.errorMessage}>{errorMEssage}</Text>
          )}

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle} onPress={submitHandler}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerNotification}>
              Don't you have an account already?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}> Register Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  Container: {
    position: "static",
    flex: 1,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.brown50,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.brown200,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: Colors.brown100,
    color: Colors.brown500,
    marginVertical: 7,
    paddingLeft: 10,
    borderRadius: 7,
  },
  registerContainer: {
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
    marginTop: 8,
  },
  registerNotification: {
    color: Colors.brown600,
    fontSize: 13,
  },
  registerLink: {
    color: Colors.brown300,
    fontWeight: "bold",
  },
  forgotPassword: {
    textAlign: "right",
    color: Colors.brown400,
    marginBottom: 7,
    paddingRight: 10,
  },
  errorMessage: {
    color: Colors.red,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.brown500,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.brown50,
    fontSize: 18,
    fontWeight: "400",
  },
});

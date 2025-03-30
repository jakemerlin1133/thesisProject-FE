import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import { Ionicons } from "react-native-vector-icons";

import Login from "./screens/Login";
import Register from "./screens/Register";
import SuccessRegister from "./screens/SuccessRegister";
import BottomTabNavigator from "./screens/Navigator/BottomTabNavigator";
import TermsAndConditions from "./screens/TermsAndConditions";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import ExpensesPerCategory from "./ExpensesPerCategory";

import Input from "./screens/InputData/Input";
import Upload from "./screens/InputData/Upload";
import Scan from "./screens/InputData/Scan";
import Verification from "./screens/InputData/Verification";

import { Colors } from "./constants/Colors";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          {userId ? (
            <Stack.Screen
              name="LoggedDashboardTabs"
              component={BottomTabNavigator}
              initialParams={{ userId }}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="FailedLogin"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuccessRegister"
            component={SuccessRegister}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
            options={{
              animation: "none",
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
              title: "Terms and Conditions",
            }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{
              animation: "none",
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
              title: "Privacy Policy",
            }}
          />
          <Stack.Screen
            name="DashboardTabs"
            component={BottomTabNavigator}
            initialParams={{ userId }}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Input"
            component={Input}
            initialParams={{ userId }}
            options={{
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
              title: "Input Expenses",
            }}
          />
          <Stack.Screen
            name="Upload"
            component={Upload}
            initialParams={{ userId }}
            options={{
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
              title: "Upload Receipt",
            }}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
            initialParams={{ userId }}
            options={{
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
              title: "Scan Receipt",
            }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            initialParams={{ userId }}
            options={{
              headerLeft: () => null,
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
            }}
          />
          <Stack.Screen
            name="ExpensesPerCategory"
            component={ExpensesPerCategory}
            initialParams={{ userId }}
            options={{
              headerStyle: {
                backgroundColor: Colors.brown500,
              },
              headerTintColor: Colors.brown100,
              title: "Expenses Per Category",
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

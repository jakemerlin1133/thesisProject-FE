import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

import Login from "./screens/Login";
import Register from "./screens/Register";
import SuccessRegister from "./screens/SuccessRegister";
import BottomTabNavigator from "./screens/Navigator/BottomTabNavigator";

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

  const handleLogin = async (userId) => {
    try {
      await AsyncStorage.setItem("userId", userId); // Save userId to AsyncStorage
      setUserId(userId); // Update the state with the userId
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

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
              name="DashboardTabs"
              component={BottomTabNavigator}
              initialParams={{ userId }}
              options={{ headerShown: false }}
            />
          ) : (
            <>
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
            </>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

import Dashboard from "../Home/Dashboard";
import Report from "../Home/Report";
import Profile from "../Home/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.brown400,
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#805e40",
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#805e40",
        },
        headerTintColor: Colors.brown100,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerTitle: "Expensense",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="newspaper" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

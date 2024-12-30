import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

import Dashboard from "../Home/Dashboard";
import Report from "../Home/Report";
import Profile from "../Home/Profile";
import Analysis from "../Home/Analysis";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // const { userId } = route.params;
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
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        // initialParams={{ userId }}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" color={color} size={size} />;
          },
          headerRight: () => (
            <Ionicons
              name="add"
              size={35}
              color={Colors.brown100}
              style={{ marginRight: 10 }}
              onPress={() => {
                // Handle the "+" icon press here
                console.log("Plus icon pressed");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        // initialParams={{ userId }}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="stats-chart" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Report"
        component={Report}
        // initialParams={{ userId }}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="newspaper" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        // initialParams={{ userId }}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

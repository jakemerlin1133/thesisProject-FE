import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Menu, Provider } from "react-native-paper";
import { Colors } from "../../constants/Colors";

import Dashboard from "../Home/Dashboard";
import Report from "../Home/Report";
import Profile from "../Home/Profile";
import Analysis from "../Home/Analysis";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const { userId } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
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
          initialParams={{ userId }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="home" color={color} size={size} />;
            },
            headerRight: () => (
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <Ionicons
                    name="add-outline"
                    size={30}
                    color={Colors.brown50}
                    style={{ marginRight: 15 }}
                    onPress={openMenu}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    // Action for "Scan receipt"
                    console.log("Scan receipt");
                  }}
                  title="Scan Receipt"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    // Action for "Upload receipt"
                    console.log("Upload receipt");
                  }}
                  title="Upload Receipt"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    // Action for "Input expenses"
                    console.log("Input expenses");
                  }}
                  title="Input Expenses"
                />
              </Menu>
            ),
          }}
        />

        <Tab.Screen
          name="Analysis"
          component={Analysis}
          initialParams={{ userId }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="stats-chart" color={color} size={size} />;
            },
          }}
        />

        <Tab.Screen
          name="Report"
          component={Report}
          initialParams={{ userId }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="newspaper" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ userId }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="person" color={color} size={size} />;
            },
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
}

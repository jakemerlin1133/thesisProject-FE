import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Background from "../../components/Background";

const Dashboard = ({ route }) => {
  const { userId } = route.params;
  return (
    <>
      <Background>
        <View>
          <Text>Dashboard</Text>
          <Text>User ID: {userId}</Text>
        </View>
      </Background>
    </>
  );
};

export default Dashboard;

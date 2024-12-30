import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Background from "../../components/Background";

const Report = ({ route }) => {
  // const { userId } = route.params;
  return (
    <>
      <Background>
        <View>
          <Text>Report</Text>
          <Text>User ID: </Text>
        </View>
      </Background>
    </>
  );
};

export default Report;

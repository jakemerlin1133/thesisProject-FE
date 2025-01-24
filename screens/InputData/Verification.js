import React from "react";
import { View, Text } from "react-native";

const Verification = ({ route }) => {
  const { userId } = route.params;
  return (
    <>
      <View>
        <Text>Verification</Text>
        <Text>User ID: {userId}</Text>
      </View>
    </>
  );
};

export default Verification;

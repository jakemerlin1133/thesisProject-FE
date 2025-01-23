import React from "react";
import { Text, View } from "react-native";

const Scan = ({ route }) => {
  const { useId } = route.params;
  console.log(useId);
  return (
    <>
      <View>
        <Text>Scan</Text>
      </View>
    </>
  );
};

export default Scan;

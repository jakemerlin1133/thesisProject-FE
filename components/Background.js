import React from "react";
import { ImageBackground, useWindowDimensions, View, StyleSheet } from "react-native";

const Background = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const roundedHeight = Math.ceil(height / 100) * 100;

  return (
    <>
      <ImageBackground
        source={require("../assets/backgroundImage/bg-1.jpg")}
        style={{ height: roundedHeight }}
        resizeMode="cover"
      >
         <View
    style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  />
        {children}
      </ImageBackground>
    </>
  );
};

export default Background;

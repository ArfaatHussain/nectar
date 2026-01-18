import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const { width, height } = Dimensions.get('window');
const CustomButton = ({
  buttonColor,
  mode = "contained",
  style,
  buttonText,
  rippleColor,
  onPress,
  textColor
}) => {
  return (
    <Button
      mode={mode}
      {...(mode === "contained" && {
        buttonColor: buttonColor || "#53B175",
      })}
      style={[
        { width: width * 0.8, borderRadius: 15, marginVertical: 10 },
        style,
      ]}
      contentStyle={{ paddingVertical: height * 0.010 }}
      rippleColor={rippleColor}
      onPress={onPress || (() => console.log("Button Pressed"))}
      textColor= {textColor || (mode === "contained" ? "#FFFFFF" : "#808080")}
    >
      {buttonText || "Get Started"}
    </Button>
  );
};


export default CustomButton
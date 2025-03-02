import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>App Screen is working!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AppScreen;

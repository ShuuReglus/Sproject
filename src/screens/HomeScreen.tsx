import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import { type RootStackParamList } from "../navigation/types";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  console.log("HomeScreenがマウントされたよ！");

  const navigateToRegister = () => {
    console.log("RegisterScreenに遷移します");
    navigation.navigate("RegisterScreen");
  };

  const GoToAppButton = () => {
    return (
      <Button title="アプリへ" onPress={() => navigation.navigate("MainApp")} />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ようこそ！</Text>
      <Pressable style={styles.button} onPress={navigateToRegister}>
        <Text style={styles.buttonText}>新規登録へ</Text>
      </Pressable>
      <GoToAppButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f2937",
  },
  title: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;

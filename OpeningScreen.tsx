import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import OpeningImage from "./src/assets/images/icon-fixed.png";

const OpeningScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // 2.5秒後にメイン画面へ

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={OpeningImage} style={styles.image} />
      <Text style={styles.text}>AIが画像を見て名言を作るよ。</Text>
    </View>
  );
};

export default OpeningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 1250,
    height: 1250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

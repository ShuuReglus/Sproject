import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { type RootStackParamList } from "../navigation/types";

// 👇 type定義はコンポーネントの外！
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  console.log("HomeScreenがマウントされたよ！");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Home Screen</Text>
      <Button
        title="アプリ起動"
        onPress={() => navigation.navigate("MainApp")}
      />
    </View>
  );
};

export default HomeScreen;

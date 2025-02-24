import React from "react";
import { Text, View } from "react-native";

import AppButton from "../components/AppButton"; // 追加
import RegisterButton from "../components/RegisterButton";

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <RegisterButton /> {/* navigationを渡す必要はありません */}
      <AppButton /> {/* 追加 */}
    </View>
  );
};

export default HomeScreen;

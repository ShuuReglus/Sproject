import React from "react";
import { Button } from "react-native";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

import { type RootStackParamList } from "../navigation/AppNavigator";
import AppScreen  from "../screens/AppScreen"; // AppScreenのインポートを追加

const GoToAppButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      title="アプリ画面へ"
      onPress={() => navigation.navigate("AppScreen")}
    />
  );
};

export default GoToAppButton;

import React from "react";
import { Button } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import { type RootStackParamList } from "../navigation/AppNavigator";

const RegisterButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      title="ユーザー登録"
      onPress={() => navigation.navigate("RegisterScreen")}
    />
  );
};

export default RegisterButton;

import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import GoToAppButton from "../components/GoToAppButton"; // 追加
import { registerUser } from "../services/authService"; // 追加

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, username });
      Alert.alert("登録成功", "ユーザー登録が成功しました");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("登録失敗", `登録エラー: ${error.message}`);
      } else {
        Alert.alert("登録失敗", "Unknown error occurred");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>メールアドレス</Text>
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>ユーザー名</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザー名"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>パスワード</Text>
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="登録" onPress={handleRegister} />
      <GoToAppButton /> {/* 追加 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "white", // 入力フィールドの背景色を白に設定
  },
});

export default RegisterScreen;

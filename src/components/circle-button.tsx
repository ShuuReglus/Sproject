import React, { type FC } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Expo のアイコンライブラリをインポート

// ボタンのプロパティ（props）の型定義
type ButtonProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined; // ボタンが押されたときの処理を設定できる（オプション）
};

// 円形のボタンコンポーネント
export const CircleButton: FC<ButtonProps> = (props) => {
  return (
    // ボタンのレイアウトを整えるためのコンテナ
    <View style={styles.circleButtonContainer}>
      {/* ボタンとして機能するPressableコンポーネント */}
      <Pressable style={styles.circleButton} onPress={props.onPress}>
        {/* アイコンを表示（"add" アイコンを 38px の大きさで表示） */}
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
};

// スタイルの定義
const styles = StyleSheet.create({
  // ボタンの外側のコンテナ（装飾用）
  circleButtonContainer: {
    width: 84, // 幅
    height: 84, // 高さ
    marginHorizontal: 60, // 左右の余白
    borderWidth: 4, // 枠線の太さ
    borderColor: "#ffd33d", // 枠線の色（黄色）
    borderRadius: 42, // 角を丸くする（円形にする）
    padding: 3, // 内側の余白
  },
  // 実際のボタン部分
  circleButton: {
    flex: 1, // 親要素（circleButtonContainer）に対して全体を埋める
    justifyContent: "center", // 縦方向の中央揃え
    alignItems: "center", // 横方向の中央揃え
    borderRadius: 42, // 角を丸くする（円形にする）
    backgroundColor: "#fff", // 背景色（白）
  },
});

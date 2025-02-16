// React の Functional Component (FC) を型指定するために import
import { type FC } from "react";
// React Native の基本コンポーネントを import
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// ボタンコンポーネントの props の型定義
type ButtonProps = {
  label: string; // ボタンに表示するテキスト（必須）
  theme?: "primary" | undefined;
  onPress?: (event: GestureResponderEvent) => void;
};

// Button コンポーネントの定義
export const Button: FC<ButtonProps> = (props) => {
  if (props.theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={props.onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {props.label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    // ボタンを囲む View（ボタンのレイアウトを調整する）
    <View style={styles.buttonContainer}>
      {/* Pressable は押せるボタンを作成できるコンポーネント */}
      <Pressable
        style={styles.button} // スタイル適用
        onPress={props.onPress} // ボタンが押されたときの処理
      >
        {/* ボタンのラベルを表示 */}
        <Text style={styles.buttonLabel}>{props.label ?? "ボタン"}</Text>
      </Pressable>
    </View>
  );
};

// スタイルの定義（CSS のようなもの）
const styles = StyleSheet.create({
  // ボタンを囲むコンテナのスタイル
  buttonContainer: {
    width: 320, // 幅
    height: 68, // 高さ
    marginHorizontal: 20, // 水平方向の余白
    alignItems: "center", // 子要素を中央揃え（横）
    justifyContent: "center", // 子要素を中央揃え（縦）
    padding: 3, // 内側の余白
  },
  // 実際のボタンのスタイル
  button: {
    borderRadius: 10, // 角を丸くする
    width: "100%", // 親要素いっぱいに広げる
    height: "100%", // 親要素いっぱいに広げる
    alignItems: "center", // 中央揃え（横）
    justifyContent: "center", // 中央揃え（縦）
    flexDirection: "row", // 子要素を横並びにする
  },
  // ボタンのアイコン（もし使う場合）
  buttonIcon: {
    paddingRight: 8, // 右側に余白を追加
  },
  // ボタンのラベルのスタイル
  buttonLabel: {
    color: "#fff", // 文字色を白にする
    fontSize: 16, // フォントサイズ
  },
});

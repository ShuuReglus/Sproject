import { type FC } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";

// 絵文字リストを定義
import emoji1 from "@/assets/images/emoji1.png";
import emoji2 from "@/assets/images/emoji2.png";
import emoji3 from "@/assets/images/emoji3.png";
import emoji4 from "@/assets/images/emoji4.png";
import emoji5 from "@/assets/images/emoji5.png";

export const emojiList: ImageSourcePropType[] = [
  emoji1,
  emoji2,
  emoji3,
  emoji4,
  emoji5,
];

// `EmojiList` コンポーネントのプロパティ（props）の型定義
type EmojiListProps = {
  onSelect: (item: ImageSourcePropType) => void; // 絵文字が選択されたときの処理
  onCloseModal: () => void; // モーダルを閉じる処理
};

export const EmojiList: FC<EmojiListProps> = ({ onSelect, onCloseModal }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emojiList}
      keyExtractor={(_, index) => index.toString()} // keyを設定
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            console.log("選択された絵文字:", item); // デバッグ用
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} style={styles.image} />
        </Pressable>
      )}
    />
  );
};

// スタイル定義
const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10, // 上の右角を丸くする
    borderTopLeftRadius: 10, // 上の左角を丸くする
    paddingHorizontal: 20, // 左右の余白
    flexDirection: "row", // 横並びに配置
    alignItems: "center", // 縦の中央揃え
    justifyContent: "space-between", // 均等配置
  },
  image: {
    width: 100, // 画像の幅
    height: 100, // 画像の高さ
    marginRight: 20, // 右の余白
  },
});

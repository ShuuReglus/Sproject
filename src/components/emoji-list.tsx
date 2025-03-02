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
import emoji1 from "../assets/images/emoji1.png";
import emoji2 from "../assets/images/emoji2.png";
import emoji3 from "../assets/images/emoji3.png";
import emoji4 from "../assets/images/emoji4.png";
import emoji5 from "../assets/images/emoji5.png";

export const emojiList: ImageSourcePropType[] = [
  emoji1,
  emoji2,
  emoji3,
  emoji4,
  emoji5,
];

type EmojiListProps = {
  onSelect: (item: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export const EmojiList: FC<EmojiListProps> = ({ onSelect, onCloseModal }) => {
  console.log("emojiListの中身:", emojiList);
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emojiList}
      keyExtractor={(_, index) => String(index)}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            console.log("選択された絵文字:", item);
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

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
});

import React, { type FC, type ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { EmojiList } from "../components/emoji-list";
import { type ImageSourcePropType } from "react-native";

type ButtonProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelect?: (emoji: ImageSourcePropType) => void;
  children?: ReactNode;
};

export const EmojiPicker: FC<ButtonProps> = ({
  isVisible,
  onClose,
  onSelect,
}) => {
  if (!isVisible) return null; // 表示されないときは何もレンダリングしない

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {/* EmojiListをここに追加 */}
        <EmojiList onSelect={onSelect ?? (() => {console.log('Something happened!');})} onCloseModal={onClose} />
      </View>
    </Modal>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  childrenContainer: {
    flex: 1, // 子要素が適切にレイアウトされるようにする
    alignItems: "center",
    justifyContent: "center",
  },
});


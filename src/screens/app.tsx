import { useEffect, useRef, useState, type FC } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { registerRootComponent } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import PlaceholderImage from "@/assets/images/background-image.png";
import { Button } from "@/components/button";
import { CircleButton } from "@/components/circle-button";
import { emojiList } from "@/components/emoji-list";
import { EmojiPicker } from "@/components/emoji-picker";
import { EmojiSticker } from "@/components/emoji-sticker";
import { IconButton } from "@/components/icon-button";
import { ImageViewer } from "@/components/image-viewer";

void SplashScreen.preventAutoHideAsync();

const App: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(
    null,
  );

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef(null);

  useEffect(() => {
    if (status === null) {
      void requestPermission();
    }
  }, [status, requestPermission]);

  useEffect(() => {
    const prepare = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await SplashScreen.hideAsync();
    };

    void prepare();
  }, []);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      if (imageRef.current) {
        const uri = await captureRef(imageRef, {
          format: "png",
          quality: 0.8,
        });
        console.log("Captured Image URI:", uri);
        await MediaLibrary.saveToLibraryAsync(uri);
        alert("画像を保存しました！");
      }
    } catch (error) {
      console.error("画像の保存に失敗しました:", error);
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("画像が選択されていません");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(null);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={Platform.OS === "web"}
          data={emojiList}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(_, index) => index.toString()} // keyを追加
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log("選択された絵文字:", item);
                setPickedEmoji(item);
                onModalClose();
              }}
            >
              <Image source={item} style={styles.image} />
            </Pressable>
          )}
        />
      </EmojiPicker>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="リセット" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="保存"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="写真を選択" onPress={pickImageAsync} />
          <Button
            label="この写真を使用"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    margin: 6, //test
  },
});

registerRootComponent(App);

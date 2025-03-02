import React, { useEffect, useRef, useState, type FC } from "react";
import {
  FlatList,
  Image,
  //Platform,
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PlaceholderImage from "./src/assets/images/background-image.png";
import { Button } from "./src/components/button";
import { CircleButton } from "./src/components/circle-button";
import { emojiList } from "./src/components/emoji-list";
import { EmojiPicker } from "./src/components/emoji-picker";
import { EmojiSticker } from "./src/components/emoji-sticker";
import { IconButton } from "./src/components/icon-button";
import { ImageViewer } from "./src/components/image-viewer";
import { type RootStackParamList } from "./src/navigation/types";
import HomeScreen from "./src/screens/HomeScreen";

console.log("Execution Environment:", Constants.executionEnvironment);
const someTestVar = "test"

void SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

const MainApp: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(
    null,
  );

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef(null);

  useEffect(() => {
    console.log("MediaLibraryのステータス:", status);
    if (status === null) {
      void requestPermission();
    }
  }, [status, requestPermission]);

  useEffect(() => {
    console.log("useEffect発火!");
    const prepare = async () => {
      try {
        console.log("スプラッシュスクリーンを隠す準備中...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
        console.log("スプラッシュスクリーンを隠しました");
      } catch (error) {
        console.error("スプラッシュスクリーンの非表示に失敗:", error);
      }
    };

    void prepare();
  }, []);

  const onModalClose = () => {
    console.log("絵文字ピッカーが閉じられました");
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    console.log("ステッカーボタンが押されました");
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
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

    console.log("画像選択の結果:", result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("画像が選択されていません");
    }
  };

  const onReset = () => {
    console.log("リセットボタンが押されました");
    setShowAppOptions(false);
    setPickedEmoji(null);
  };

  console.log("emojiListの中身:", emojiList);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.imageContainer}>
          <Image
            source={PlaceholderImage}
            style={{ width: 100, height: 100 }}
          />
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
            ref={imageRef}
          />
          {showAppOptions && (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton
                  icon="save-alt"
                  label="Save"
                  onPress={onSaveImageAsync}
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" onPress={pickImageAsync} />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
        <EmojiPicker
          isVisible={isModalVisible}
          onClose={onModalClose}
          onSelect={(emoji) => {
            console.log("選択された絵文字:", emoji);
            setPickedEmoji(emoji);
          }}
        />
        <FlatList
          data={emojiList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log("絵文字がタップされました:", item);
                setPickedEmoji(item);
              }}
            >
              <EmojiSticker imageSize={40} stickerSource={item} />
            </Pressable>
          )}
          keyExtractor={(_, index) => String(index)}
          horizontal
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
});

registerRootComponent(App);

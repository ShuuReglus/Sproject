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
import AppNavigator from "../navigation/AppNavigator"; // 修正

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

  return <AppNavigator />;
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
    margin: 6,
  },
});

registerRootComponent(AppNavigator);

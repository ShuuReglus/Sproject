import React, { useEffect, useRef, useState, type FC } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Amplify, type ResourcesConfig } from "aws-amplify";

import awsExports from "@/aws-exports"; // ファイル名はプロジェクトによるかも

import PlaceholderImage from "./src/assets/images/background-image.png";
import { Button } from "./src/components/button";
import { IconButton } from "./src/components/icon-button";
import { ImageViewer } from "./src/components/image-viewer";
import { type RootStackParamList } from "./src/navigation/types";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

Amplify.configure(awsExports as ResourcesConfig);

console.log("App.tsx が読み込まれたよ！");
console.log("Execution Environment:", Constants.executionEnvironment);

const Stack = createStackNavigator<RootStackParamList>();

const MainApp: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef(null);

  useEffect(() => {
    console.log("MediaLibraryのステータス:", status);
    if (status === null) {
      void requestPermission();
    }
  }, [status, requestPermission]);

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
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
            ref={imageRef}
          />
        </View>
        {!showAppOptions && (
          <View style={styles.footerContainer}>
            <Button label="写真を選ぶ" onPress={pickImageAsync} />
            <Button
              label="この写真を使う"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        {showAppOptions && (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="リセット" onPress={onReset} />
              <View style={styles.spacer} />
              <IconButton
                icon="save-alt"
                label="保存"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
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
  spacer: {
    width: 20, // ボタン間のスペースを設定
  },
});

registerRootComponent(App);

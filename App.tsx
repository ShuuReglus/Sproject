import React, { useEffect, useRef, useState, type FC } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios"; // Axiosをインポート
import { uploadImageToS3 } from "./src/awsS3Utils";

import PlaceholderImage from "./src/assets/images/background-image.png";
import CharacterImage from "./src/assets/images/character.png";
import { Button } from "./src/components/button";
import { ImageViewer } from "./src/components/image-viewer";
import { type RootStackParamList } from "./src/navigation/types";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import "react-native-get-random-values";

const Stack = createStackNavigator<RootStackParamList>();

const MainApp: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("画像を選んでね！");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const imageRef = useRef(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (status === null) {
      void requestPermission();
    }
  }, [status, requestPermission]);

  // 画像選択処理
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);

      // アップロード処理
      setIsUploading(true);
      try {
        // S3に画像をアップロード
        const fileName = uri.split("/").pop() ?? "uploaded-image.jpg";
        await uploadImageToS3(uri);

        // Flaskサーバーにリクエストを送信してコメントを生成
        const response = await axios.post("http://192.168.0.100:5001/generate-comment", {
          bucket_name: "sproject-app-image-storage", // S3バケット名
          object_key: fileName, // アップロードした画像のキー
          rekognition_labels: "No labels provided", // 必要に応じてRekognitionのラベルを渡す
        });

        // コメントを設定
        setComment(response.data.comment);
      } catch (error) {
        console.error("エラー:", error);
        setComment("コメント生成に失敗しました");
      }
      setIsUploading(false);
    } else {
      Alert.alert("画像が選択されていません");
    }
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
          {isUploading ? (
            <ActivityIndicator size="large" color="#fff" style={styles.loading} />
          ) : (
            selectedImage && (
              <View style={styles.commentContainer}>
                <Image source={CharacterImage} style={styles.character} />
                <View style={styles.commentBox}>
                  <Text style={styles.commentText}>{comment}</Text>
                </View>
              </View>
            )
          )}
        </View>
        <View style={styles.footerContainer}>
          <Button label="写真を選ぶ" onPress={pickImageAsync} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
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
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  commentContainer: {
    position: "absolute",
    top: 20,
    left: "10%",
    flexDirection: "row",
    alignItems: "center",
  },
  character: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  commentBox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  commentText: {
    color: "black",
  },
  loading: {
    marginTop: 20,
  },
});

registerRootComponent(App);





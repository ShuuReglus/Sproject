import React, { useEffect, useRef, useState, type FC } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Amplify } from "aws-amplify";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as FileSystem from "expo-file-system";
import 'react-native-polyfill-globals/auto';


import awsExports from "./aws-exports";
import PlaceholderImage from "./src/assets/images/background-image.png";
import CharacterImage from "./src/assets/images/character.png"; // キャラ画像を追加
import { Button } from "./src/components/button";
import { IconButton } from "./src/components/icon-button";
import { ImageViewer } from "./src/components/image-viewer";
import { type RootStackParamList } from "./src/navigation/types";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

// Amplifyの設定
Amplify.configure(awsExports);

const Stack = createStackNavigator<RootStackParamList>();

// AWS S3設定のためのアクセスキー取得 (expo-constants経由)
const awsAccessKeyId = Constants.expoConfig?.extra?.AWS_ACCESS_KEY_ID as string;
const awsSecretAccessKey = Constants.expoConfig?.extra?.AWS_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
  forcePathStyle: true, // ✅ パススタイルを有効化
});


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

  // 画像アップロード処理
  const uploadImageToS3 = async (uri: string) => {
    setIsUploading(true);  // アップロード中に切り替え
    try {
      console.log("画像をアップロード中:", uri);

      const fileData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer = new Uint8Array(atob(fileData).split("").map(c => c.charCodeAt(0)));
      const fileName = uri.split("/").pop() ?? "uploaded-image.jpg";
      const fileType = "image/jpeg";

      const command = new PutObjectCommand({
        Bucket: "sproject-app-image-storage",
        Key: fileName,
        Body: buffer,
        ContentType: fileType,
        ACL: "public-read",
      });

      const result = await s3Client.send(command);
    console.log("アップロード成功:", result);
    setComment("おぉ、これは良い画像だね！");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("アップロード失敗:", errorMessage);
    setComment("うーん、アップロードに失敗したよ…");
  }
  setIsUploading(false);
};

  // 画像選択処理
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      await uploadImageToS3(uri);  // 画像をアップロード
    } else {
      alert("画像が選択されていません");
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





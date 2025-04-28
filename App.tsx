import React, { useEffect, useRef, useState, type FC } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Image, Text, ActivityIndicator, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import axios from "axios"; // Axiosをインポート
import { uploadImageToS3 } from "./src/awsS3Utils";

import PlaceholderImage from "./src/assets/images/background-image.png";
import CharacterImage from "@/assets/images/character.png";
import { Button } from "./src/components/button";
import { ImageViewer } from "./src/components/image-viewer";

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
        console.log("画像をアップロード中:", uri);
        const fileName = uri.split("/").pop() ?? "uploaded-image.jpg";
        console.log("ファイル名:", fileName);
  
        await uploadImageToS3(uri);
        console.log("S3アップロード完了");
  
        console.log("Flaskサーバーにコメントリクエスト送信");
        const response = await generateComment(fileName);
        console.log("Flaskサーバーからレスポンス受信:", response);
  
        setComment(response.comment);
      } catch (error) {
        console.error("エラー:", error);
        setComment("コメント生成に失敗しました");
      }
      setIsUploading(false);
    } else {
      Alert.alert("画像が選択されていません");
    }
  };

  // Flaskサーバーにリクエストを送信する関数
  const generateComment = async (fileName: string) => {
    const response = await axios.post("https://0530-2404-7a85-24e1-5000-3534-4ff7-4339-ac36.ngrok-free.app/generate-comment", {
      bucket_name: "sproject-app-image-storage", // S3バケット名
      object_key: fileName, // アップロードした画像のキー
    },
    { timeout: 5000 } // タイムアウト5秒
    );
    return response.data;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
            ref={imageRef}
          />
          {isUploading ? (
            <ActivityIndicator size="large" color="#fff" style={styles.loading} />
          ) : (
            selectedImage && (
              <SafeAreaView style={styles.commentContainer}>
                <Image source={CharacterImage} style={styles.character} />
                <SafeAreaView style={styles.commentBox}>
                  <ScrollView>
                    <Text
                     style={{ ...styles.commentText, flexShrink: 1, flexWrap: "wrap" }}
                     numberOfLines={0}
                     >
                     {comment}
                    </Text>
                  </ScrollView>
                </SafeAreaView>

              </SafeAreaView>
            )
          )}
        </SafeAreaView>
        <SafeAreaView style={styles.footerContainer}>
          <Button label="写真を選ぶ" onPress={pickImageAsync} />
        </SafeAreaView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default registerRootComponent(MainApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 5,
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "column", // 水平方向でなく縦に並べる
    justifyContent: "flex-start", // 上から配置
    position: "relative", // absolute から relative に変更
    alignItems: "center", // 真ん中に配置
  },
  
  character: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  commentBox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    maxHeight: 70, // 最大高さを指定
    overflow: "hidden", // 超えた分は隠す
  },
  
  
  commentText: {
    color: "black",
  },
  loading: {
    marginTop: 20,
  },
});





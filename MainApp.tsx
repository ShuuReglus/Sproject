import React, { useEffect, useState, type FC } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  Alert,
  View,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { uploadImageToS3 } from "@/awsS3Utils";

import PlaceholderImage from "@/assets/images/background-image.png";
import CharacterImage from "@/assets/images/character.png";
import { Button } from "@/components/button";
import { ImageViewer } from "@/components/image-viewer";
import UploadForm from "@/components/UploadForm"; // Web用コンポーネント

type CommentResponse = {
  comment: string;
};

const MainApp: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("画像を選んでね！");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!status?.granted) {
      void requestPermission();
    }
  }, [status]);

  if (Platform.OS === "web") {
    // Webならアップロードフォームを表示（File APIを使う）
    return <UploadForm />;
  }

  const pickImageAsync = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);

        setIsUploading(true);
        const fileName = uri.split("/").pop() ?? `image-${Date.now()}.jpg`;

        await uploadImageToS3(uri);
        const response = await generateComment(fileName);
        setComment(response.comment);
      } else {
        Alert.alert("画像が選択されていません");
      }
    } catch (error) {
      console.error("画像処理エラー:", error);
      setComment("コメント生成に失敗しました");
    } finally {
      setIsUploading(false);
    }
  };

  const generateComment = async (fileName: string): Promise<CommentResponse> => {
    const response = await axios.post<CommentResponse>(
      "https://3e2ebad520f4.ngrok-free.app/generate-comment",
      {
        bucket_name: "sproject-app-image-storage",
        object_key: fileName,
      },
      { timeout: 5000 }
    );
    return response.data;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {isUploading ? (
            <ActivityIndicator size="large" color="#fff" style={styles.loading} />
          ) : (
            selectedImage && (
              <View style={styles.commentContainer}>
                <Image source={CharacterImage} style={styles.character} />
                <View style={styles.commentBox}>
                  <ScrollView>
                    <Text style={styles.commentText}>{comment}</Text>
                  </ScrollView>
                </View>
              </View>
            )
          )}
        </View>
        <View style={styles.footerContainer}>
          <Button label="写真を選ぶ" onPress={pickImageAsync} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MainApp;

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
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    alignItems: "center",
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
    maxHeight: 70,
    overflow: "hidden",
  },
  commentText: {
    color: "black",
  },
  loading: {
    marginTop: 20,
  },
});




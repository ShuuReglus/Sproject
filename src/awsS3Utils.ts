import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

declare const global: any;

// Bufferをグローバルに設定
if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer;
}

// API Gatewayのエンドポイント
const API_ENDPOINT = "https://kehm6xw1xh.execute-api.ap-northeast-1.amazonaws.com/develop";

export const uploadImageToS3 = async (uri: string) => {
  try {
    console.log("画像をアップロード中:", uri);

    // ファイル名を取得
    const fileName = uri.split("/").pop() ?? "uploaded-image.jpg";
    console.log("ファイル名:", fileName);

    // ファイルをBase64形式で読み込む
    const fileData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("ファイルデータを読み込みました");

    // Base64データをバイナリに変換
    const binaryData = Buffer.from(fileData, "base64");

    // API GatewayにPUTリクエストを送信
    const response = await axios.put(`${API_ENDPOINT}/${fileName}`, binaryData, {
      headers: {
        "Content-Type": "image/jpeg", // 必要に応じて変更
      },
    });

    console.log("アップロード成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("アップロード失敗:", error);
    throw error;
  }
};
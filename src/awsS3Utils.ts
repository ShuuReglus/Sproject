import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

interface GlobalWithBuffer {
  Buffer?: typeof Buffer;
  [key: string]: unknown;
}

declare const global: GlobalWithBuffer;

if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer;
}

const API_ENDPOINT = "https://kehm6xw1xh.execute-api.ap-northeast-1.amazonaws.com/develop";

interface UploadResponse {
  message?: string;
  url?: string;
  
  [key: string]: unknown;


}

export const uploadImageToS3 = async (uri: string): Promise<UploadResponse> => {
  try {
    console.log("画像をアップロード中:", uri);

    const fileName = uri.split("/").pop() ?? "uploaded-image.jpg";
    console.log("ファイル名:", fileName);

    const fileData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("ファイルデータを読み込みました");

    const binaryData = Buffer.from(fileData, "base64");

    const response = await axios.put<UploadResponse>(
      `${API_ENDPOINT}/${fileName}`,
      binaryData,
      {
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    );

    console.log("アップロード成功:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("アップロード失敗:", error.message);
    } else {
      console.error("アップロード失敗: 不明なエラー", error);
    }
    throw error;
  }
};

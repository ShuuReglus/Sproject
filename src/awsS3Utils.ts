import { S3 } from 'aws-sdk';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';


// S3の設定
const s3 = new S3({
  region: 'ap-northeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string|| '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string|| '',
});

const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const uploadImageToS3 = async (uri: string) => {
    setIsUploading(true);
    try {
      console.log('画像をアップロード中:', uri);

      const fileData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer = Buffer.from(fileData, 'base64');
      const fileName = uri.split('/').pop() ?? 'uploaded-image.jpg';
      const fileType = 'image/jpeg';

      const params = {
        Bucket: 'sproject-app-image-storage',
        Key: fileName,
        Body: buffer,
        ContentType: fileType,
        ACL: 'public-read',
      };

      const result = await s3.upload(params).promise();
      console.log('アップロード成功:', result.Location);
      setComment('アップロード成功！');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('アップロード失敗:', errorMessage);
      setComment('アップロードに失敗しました');
    }
    setIsUploading(false);
  };

  return { uploadImageToS3, isUploading, comment };
};

export default useUploadImage;










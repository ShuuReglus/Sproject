import { S3 } from 'aws-sdk';
 // URLエンコード

// S3の設定
const s3 = new S3({
  region: 'us-east-1',  // バケットのリージョン
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string|| '', // 環境変数からキーを取得
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string|| '', // 環境変数からキーを取得
});

// アップロード処理
const uploadImageToS3 = async (file: File) => {
  const safeFileName = encodeURIComponent(file.name); // URLエンコードでファイル名を安全にする

  // paramsの設定
  const params = {
    Bucket: 'your-bucket-name', // ここにバケット名を指定
    Key: safeFileName,
    Body: file,
    ContentType: file.type, // ファイルタイプを指定
    ACL: 'public-read', // アクセス権限を設定（必要に応じて変更）
  };

  try {
    const result = await s3.upload(params).promise(); // アップロード処理
    console.log('アップロード成功:', result);
  } catch (error) {
    console.error('アップロード失敗:', error);
  }
};

// 例えば、HTMLのファイル選択で呼び出す場合
const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
if (fileInput) {
    fileInput.addEventListener('change', (event) => {
        (async () => {
          const input = event.target as HTMLInputElement;
          const file = input.files?.[0];
          if (file) {
            await uploadImageToS3(file);
          }
        })().catch((error) => {
          console.error('アップロード中にエラーが発生しました:', error);
        });
      });
      
} else {
  console.error('ファイル入力要素が見つかりません');
}





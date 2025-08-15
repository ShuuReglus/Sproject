import boto3
import os

# AWSの設定（適宜変更）
BUCKET_NAME = "sproject-app-image-storage"
FILE_PATH = "images/your-image.jpg"  # アップロードしたい画像のパス
S3_KEY = os.path.basename(FILE_PATH)  # S3 上のファイル名

# S3 クライアントを作成
s3 = boto3.client("s3")

def upload_to_s3():
    try:
        s3.upload_file(FILE_PATH, BUCKET_NAME, S3_KEY)
        print(f"✅ アップロード成功！S3 URL: https://{BUCKET_NAME}.s3.amazonaws.com/{S3_KEY}")
        return f"https://{BUCKET_NAME}.s3.amazonaws.com/{S3_KEY}"
    except Exception as e:
        print(f"❌ アップロード失敗: {e}")

if __name__ == "__main__":
    upload_to_s3()

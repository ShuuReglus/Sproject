import boto3

# AWS の設定
AWS_REGION = "ap-northeast-1"  # 必要に応じて変更
S3_BUCKET = "sproject-app-image-storage"  # 自分の S3 バケット名
IMAGE_NAME = "your-image.jpg"  # アップロードした画像のファイル名

# Rekognition クライアントを作成
rekognition = boto3.client("rekognition", region_name=AWS_REGION)

def analyze_image():
    response = rekognition.detect_labels(
        Image={"S3Object": {"Bucket": S3_BUCKET, "Name": IMAGE_NAME}},
        MaxLabels=10,  # 最大10個のラベルを取得
        MinConfidence=70,  # 信頼度70%以上のラベルのみ取得
    )

    # 結果を表示
    print("\n✅ 解析結果:")
    for label in response["Labels"]:
        print(f"- {label['Name']} ({label['Confidence']:.2f}%)")

if __name__ == "__main__":
    analyze_image()

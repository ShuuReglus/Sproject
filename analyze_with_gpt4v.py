import asyncio
import openai
import os
import boto3
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging
import uuid
import mimetypes
from datetime import datetime

MAX_RETRIES = 3
RETRY_DELAY = 1  # 秒

load_dotenv()

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# AWSクライアント設定
AWS_REGION = os.getenv("AWS_REGION")

S3_BUCKET = os.getenv("S3_BUCKET_NAME")
print(f"S3_BUCKET={S3_BUCKET}")  # 確認用

if not S3_BUCKET:
    raise ValueError("環境変数 S3_BUCKET_NAME が設定されていません。")


s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=AWS_REGION
)

rekognition_client = boto3.client(
    "rekognition",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=AWS_REGION
)

# --- S3アップロード ---
def upload_to_s3(file_bytes, filename):
    content_type, _ = mimetypes.guess_type(filename)
    if not content_type:
        content_type = "application/octet-stream"

    unique_name = f"uploads/{datetime.utcnow().strftime('%Y-%m-%d')}/{uuid.uuid4()}_{filename}"
    try:
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=unique_name,
            Body=file_bytes,
            ContentType=content_type
        )
        logging.info(f"S3アップロード成功: {unique_name} ({content_type})")
        return unique_name
    except Exception as e:
        logging.error(f"S3アップロード失敗", exc_info=True)
        return None

# --- Rekognition（S3オブジェクト版） ---
def analyze_image_with_rekognition_s3(s3_key):
    try:
        response = rekognition_client.detect_labels(
            Image={'S3Object': {'Bucket': S3_BUCKET, 'Name': s3_key}},
            MaxLabels=10,
            MinConfidence=70
        )
        labels = [label["Name"] for label in response["Labels"]]
        logging.info(f"Rekognition解析結果: {labels}")
        return ", ".join(labels)
    except Exception as e:
        logging.error(f"Rekognition解析失敗: {e}", exc_info=True)
        return None

# --- OpenAIコメント生成 ---
def generate_ogiri_comment(rekognition_labels):
    prompt = f"""
    あなたは、画像を見て「写真で一言」の名言コメントを考えるAIです。
    以下のテクニックを参考にしながら、短くてインパクトのある面白いコメントを作成してください。

    【テクニック】
    1. 写真の細部に注目する
    2. 予想外の展開を考える
    3. 擬人化してみる
    4. 自分の経験を取り入れる
    5. 言葉遊びを使う
    6. 他の視点から考える
    7. タイミングを大切にする

    【画像の分析結果】 {rekognition_labels}
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4",  # 必要に応じて gpt-3.5-turbo などに変更可
            messages=[
                {"role": "system", "content": "あなたは大喜利AIです。"},
                {"role": "user", "content": prompt},
            ],
            max_tokens=100
        )
        return response.choices[0].message.content
    except Exception as e:
        logging.error(f"OpenAI APIエラー: {e}", exc_info=True)
        return None

# --- リトライ関数 ---
async def retry_async(func, *args, **kwargs):
    last_exception = None
    for attempt in range(MAX_RETRIES):
        try:
            return await asyncio.wait_for(func(*args, **kwargs), timeout=15)
        except Exception as e:
            last_exception = e
            logging.warning(f"リトライ中: {e} (試行 {attempt+1}/{MAX_RETRIES})")
            await asyncio.sleep(RETRY_DELAY)
    raise last_exception

# --- APIエンドポイント ---
@app.route("/generate-comment", methods=["POST"])
def generate_comment():
    try:
        logging.debug("ステップ1: リクエスト受信")

        if "image" not in request.files:
            raise ValueError("画像ファイルがアップロードされていません。")
        image_file = request.files["image"]
        image_bytes = image_file.read()
        logging.debug(f"ステップ2: 画像読み込み成功 - {len(image_bytes)} bytes")

        logging.debug("ステップ3: S3アップロード開始")
        s3_key = upload_to_s3(image_bytes, image_file.filename)
        if not s3_key:
            raise ValueError("S3アップロードに失敗しました。")
        logging.debug(f"ステップ3完了: S3アップロード成功 - {s3_key}")

        logging.debug("ステップ4: Rekognition解析開始")
        rekognition_labels = analyze_image_with_rekognition_s3(s3_key)
        if not rekognition_labels:
            raise ValueError("ラベル取得に失敗しました。")
        logging.debug(f"ステップ4完了: Rekognition解析成功 - {rekognition_labels}")

        logging.debug("ステップ5: OpenAIコメント生成開始")
        comment = generate_ogiri_comment(rekognition_labels)
        if not comment:
            raise ValueError("コメント生成に失敗しました。")
        logging.debug(f"ステップ5完了: OpenAIコメント生成成功 - {comment}")

        logging.info(f"最終結果: {comment}")
        return jsonify({"comment": comment}), 200

    except Exception as e:
        logging.error(f"Error in generate_comment: {e}", exc_info=True)
        return jsonify({"comment": f"エラー詳細: {e}"}), 500



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)






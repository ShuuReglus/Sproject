import asyncio
import openai
import os
import boto3
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging


MAX_RETRIES = 3
RETRY_DELAY = 1  # 秒数

# .envファイル読み込み
load_dotenv()

# --- ロギング設定 ---
logging.basicConfig(
    level=logging.DEBUG,  # すべてのログを出す
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

# Flaskアプリケーション初期化
app = Flask(__name__)

CORS(app)

# OpenAI APIクライアント
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# AWSクライアント
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)
rekognition_client = boto3.client(
    'rekognition',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

# --- 非同期関数たち ---

async def analyze_image_with_rekognition_async(bucket_name, object_key):
    logging.info(f"Start Rekognition async: {bucket_name}/{object_key}")
    try:
        result = await asyncio.to_thread(analyze_image_with_rekognition, bucket_name, object_key)
        logging.info(f"End Rekognition async: {result}")
        return result
    except Exception as e:
        logging.error(f"Error in Rekognition async: {e}")
        return "Error in Rekognition"

async def generate_ogiri_comment_async(image_url, rekognition_labels):
    logging.info(f"Start OpenAI async: {image_url}")
    try:
        result = await asyncio.to_thread(generate_ogiri_comment, image_url, rekognition_labels)
        logging.info(f"End OpenAI async: {result[:50]}...")  # 先頭だけ表示
        return result
    except Exception as e:
        logging.error(f"Error in OpenAI async: {e}")
        return "Error in OpenAI"
    

async def retry_async(func, *args, **kwargs):
    """ 非同期関数をリトライするヘルパー """
    last_exception = None
    for attempt in range(MAX_RETRIES):
        try:
            return await asyncio.wait_for(func(*args, **kwargs), timeout=10)
        except Exception as e:
            last_exception = e
            logging.warning(f"Retrying due to error: {e} (Attempt {attempt+1}/{MAX_RETRIES})")
            await asyncio.sleep(RETRY_DELAY)
    raise last_exception    

# --- 同期関数たち（元々あったやつ） ---

def generate_presigned_url(bucket_name, object_key, expiration=3600):
    try:
        url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": bucket_name, "Key": object_key},
            ExpiresIn=expiration
        )
        logging.info(f"Generated presigned URL: {url}")
        return url
    except Exception as e:
        logging.error(f"Error generating presigned URL: {e}")
        return None

def analyze_image_with_rekognition(bucket_name, object_key):
    try:
        response = rekognition_client.detect_labels(
            Image={"S3Object": {"Bucket": bucket_name, "Name": object_key}},
            MaxLabels=10,
            MinConfidence=70
        )
        labels = [label["Name"] for label in response["Labels"]]
        logging.info(f"Detected labels: {labels}")
        return ", ".join(labels)
    except Exception as e:
        logging.error(f"Rekognition error: {e}")
        return "No labels provided"

def generate_ogiri_comment(image_url, rekognition_labels):
    prompt = f"""
    あなたは、画像を見て「写真で一言」の大喜利コメントを考えるAIです。
    以下の大喜利テクニックを参考にしながら、短くてインパクトのある面白いコメントを作成してください。

    【大喜利のテクニック】
    1. **写真の細部に注目する**: 目立たない部分を見つけてコメントに活かす。
    2. **予想外の展開を考える**: 普通の発想ではない意外性のあるボケを入れる。
    3. **擬人化してみる**: 物や動物に人間のような感情や行動を持たせる。
    4. **自分の経験を取り入れる**: 「あるある」と共感を得られるネタにする。
    5. **言葉遊びを使う**: ダジャレや比喩表現を交えてユーモラスにする。
    6. **他の視点から考える**: 画像に映っているもの以外の視点で考える。
    7. **タイミングを大切にする**: 写真が撮られた瞬間に注目し、その直前直後のシチュエーションを想像する。

    【画像URL】 {image_url}
    【画像の分析結果】 {rekognition_labels}
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4",##3.5-turbo
            messages=[
                {"role": "system", "content": "あなたは大喜利AIです。"},
                {"role": "user", "content": prompt},
            ],
            max_tokens=100
        )
        return response.choices[0].message.content
    except Exception as e:
        logging.error(f"OpenAI APIエラー: {e}")
        return "OpenAI APIでエラーが発生しました。"

# --- APIエンドポイント ---


@app.route("/generate-comment", methods=["POST"])
async def generate_comment():
    """ コメント生成API（超安定版） """
    try:
        bucket_name = None
        object_key = None
        image_url = None
        rekognition_labels = []

        data = request.json
        logging.info(f"Received request data: {data}")
        bucket_name = data.get("bucket_name")
        object_key = data.get("object_key")

        if not bucket_name or not object_key:
            raise ValueError("バケット名またはオブジェクトキーが指定されていません。")

        image_url = generate_presigned_url(bucket_name, object_key)
        if not image_url:
            raise ValueError("署名付きURLの生成に失敗しました。")

        rekognition_labels = await retry_async(analyze_image_with_rekognition_async, bucket_name, object_key)
        if not rekognition_labels:
            raise ValueError("ラベル取得に失敗しました。")

        comment = await retry_async(generate_ogiri_comment_async, image_url, rekognition_labels)
        if not comment:
            raise ValueError("コメント生成に失敗しました。")

        logging.info(f"Generated comment: {comment}")

        del data
        del rekognition_labels

        return jsonify({"comment": comment}), 200

    except Exception as e:
        logging.error(f"Error in generate_comment: {e}")
    # 軽めの遊び心あるエラーコメントを返す
        safe_message = "目が開かなくて見えない！もう一回！"
        return jsonify({"comment": safe_message}), 200



# --- サーバー起動 ---

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)



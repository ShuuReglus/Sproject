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

rekognition_client = boto3.client(
    'rekognition',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

# --- 非同期処理関数 ---
async def analyze_image_with_rekognition_async(image_bytes):
    logging.info(f"Start Rekognition async")
    try:
        result = await asyncio.to_thread(analyze_image_with_rekognition, image_bytes)
        logging.info(f"End Rekognition async: {result}")
        return result
    except Exception as e:
        logging.error(f"Error in Rekognition async: {e}")
        return "Error in Rekognition"

async def generate_ogiri_comment_async(rekognition_labels):
    logging.info(f"Start OpenAI async")
    try:
        result = await asyncio.to_thread(generate_ogiri_comment, rekognition_labels)
        logging.info(f"End OpenAI async: {result[:50]}...")
        return result
    except Exception as e:
        logging.error(f"Error in OpenAI async: {e}")
        return "Error in OpenAI"

async def retry_async(func, *args, **kwargs):
    last_exception = None
    for attempt in range(MAX_RETRIES):
        try:
            return await asyncio.wait_for(func(*args, **kwargs), timeout=10)
        except Exception as e:
            last_exception = e
            logging.warning(f"Retrying due to error: {e} (Attempt {attempt+1}/{MAX_RETRIES})")
            await asyncio.sleep(RETRY_DELAY)
    raise last_exception

# --- 同期関数 ---
def analyze_image_with_rekognition(image_bytes):
    try:
        response = rekognition_client.detect_labels(
            Image={'Bytes': image_bytes},
            MaxLabels=10,
            MinConfidence=70
        )
        labels = [label["Name"] for label in response["Labels"]]
        logging.info(f"Detected labels: {labels}")
        return ", ".join(labels)
    except Exception as e:
        logging.error(f"Rekognition error: {e}")
        return "No labels provided"

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
    ※画像はフロントエンドから直接アップロードされました。
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
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
    try:
        if "image" not in request.files:
            raise ValueError("画像ファイルがアップロードされていません。")

        image_file = request.files["image"]
        image_bytes = image_file.read()

        rekognition_labels = await retry_async(analyze_image_with_rekognition_async, image_bytes)
        if not rekognition_labels:
            raise ValueError("ラベル取得に失敗しました。")

        comment = await retry_async(generate_ogiri_comment_async, rekognition_labels)
        if not comment:
            raise ValueError("コメント生成に失敗しました。")

        logging.info(f"Generated comment: {comment}")

        return jsonify({"comment": comment}), 200

    except Exception as e:
        logging.error(f"Error in generate_comment: {e}")
        return jsonify({"comment": "目が開かなくて見えない！もう一回！"}), 200

# --- 起動 ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)




from flask import Flask, request, jsonify
import openai
import os
import boto3
from flask_cors import CORS

# Flaskアプリケーションの初期化
app = Flask(__name__)
CORS(app)  # CORSを有効化


# OpenAI APIキー
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# AWS S3 クライアントの設定
s3_client = boto3.client("s3")

def generate_presigned_url(bucket_name, object_key, expiration=3600):
    """ 署名付きURLを生成（デフォルト有効期限: 1時間） """
    url = s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket_name, "Key": object_key},
        ExpiresIn=expiration
    )
    return url

def generate_ogiri_comment(image_url, rekognition_labels):
    """ 大喜利コメントを生成 """
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

    上記を踏まえて、大喜利のコメントをお願いします。
    """
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは大喜利AIです。"},
            {"role": "user", "content": prompt},
        ],
        max_tokens=100
    )
    return response.choices[0].message.content

@app.route("/generate-comment", methods=["POST"])
def generate_comment():
    """ コメント生成API """
    data = request.json
    bucket_name = data["bucket_name"]
    object_key = data["object_key"]

    # 署名付きURLを生成
    image_url = generate_presigned_url(bucket_name, object_key)

    # Rekognitionのラベル（仮）
    rekognition_labels = data.get("rekognition_labels", "No labels provided")

    # コメント生成
    comment = generate_ogiri_comment(image_url, rekognition_labels)
    return jsonify({"comment": comment})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
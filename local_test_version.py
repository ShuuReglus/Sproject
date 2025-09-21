import openai
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging
import base64

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

# --- OpenAI Vision APIで直接画像解析 ---
def analyze_image_with_openai_vision(image_bytes):
    """OpenAI Vision APIで画像を直接解析"""
    try:
        # 画像をbase64エンコード
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "この画像に写っているものを簡潔に説明してください。物体名をカンマ区切りで列挙してください。"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=300
        )
        
        description = response.choices[0].message.content
        logging.info(f"OpenAI Vision解析結果: {description}")
        return description
        
    except Exception as e:
        logging.error(f"OpenAI Vision解析失敗: {e}", exc_info=True)
        return None

# --- 大喜利コメント生成 ---
def generate_ogiri_comment(image_description):
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

    【画像の内容】 {image_description}
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
        logging.error(f"OpenAI APIエラー: {e}", exc_info=True)
        return None

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

        logging.debug("ステップ3: OpenAI Vision解析開始")
        image_description = analyze_image_with_openai_vision(image_bytes)
        if not image_description:
            raise ValueError("画像解析に失敗しました。")
        logging.debug(f"ステップ3完了: 画像解析成功 - {image_description}")

        logging.debug("ステップ4: 大喜利コメント生成開始")
        comment = generate_ogiri_comment(image_description)
        if not comment:
            raise ValueError("コメント生成に失敗しました。")
        logging.debug(f"ステップ4完了: コメント生成成功 - {comment}")

        logging.info(f"最終結果: {comment}")
        return jsonify({"comment": comment}), 200

    except Exception as e:
        logging.error(f"Error in generate_comment: {e}", exc_info=True)
        return jsonify({"comment": f"エラー詳細: {e}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)
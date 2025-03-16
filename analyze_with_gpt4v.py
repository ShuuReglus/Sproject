import openai
import os

# OpenAI APIキーを設定（環境変数から取得が推奨）
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

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

    上記を踏まえて、大喜利のコメントをお願いします。
    """
    
    def generate_ogiri_comment(image_url, rekognition_labels):
        response = openai.ChatCompletion.create(  # 直接 `openai.ChatCompletion.create` を呼ぶ
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "あなたは大喜利AIです。"},
            {"role": "user", "content": f"画像: {image_url}, ラベル: {rekognition_labels}"},
        ],
        max_tokens=100
        )
        return response["choices"][0]["message"]["content"]
    

# 例: 画像のURLとRekognitionの分析結果
image_url = "https://sproject-app-image-storage.s3.amazonaws.com/your-image.jpg"
rekognition_labels = "- Book (99.81%)\n- Comics (99.81%)\n- Publication (99.81%)\n- Cartoon (96.46%)\n- Person (84.76%)\n- Face (70.72%)\n- Head (70.72%)"

# コメント生成
comment = generate_ogiri_comment(image_url, rekognition_labels)
print("\n🗨️ GPT-4Vの大喜利コメント: ", comment)


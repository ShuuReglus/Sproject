# 📸 名言ガチャアプリ
AI がアップロード画像を解析して「写真で一言」風コメントを生成する Web / モバイル対応アプリ。

---

## 🏗️ アーキテクチャ
```mermaid
flowchart TD
    U[🧑 ユーザー<br>画像アップロード] --> S[💾 サーバー<br>S3に保存]
    S --> R[🔍 AWS Rekognition<br>画像解析]
    R --> O[🤖 OpenAI API<br>コメント生成]
    O --> C[💬 一言風コメントを返却]
````

---

## ⚙️ 技術スタック

* **バックエンド**: Python / Flask / boto3 / OpenAI API
* **フロントエンド (Web)**: React + TypeScript
* **フロントエンド (Mobile)**: React Native (Expo)
* **インフラ**: AWS S3, AWS Rekognition
* **その他**: dotenv, flask-cors

---

## 🚀 セットアップ

### 🔧 バックエンド

```bash
git clone <this-repo>
cd backend
python -m venv venv
source venv/bin/activate
pip install flask boto3 openai flask-cors python-dotenv
python analyze_with_gpt4v.py
```

`.env` に以下を設定：

```env
OPENAI_API_KEY=sk-...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-northeast-1
S3_BUCKET_NAME=your-bucket-name
```

---

## 🐱 デモフロー

1. 画像をアップロード
2. 数秒後に AI がコメントを生成
3. 結果を画面に表示 🎉

---

## ✨ 工夫ポイント

* Web / Expo 両対応のアップロード処理
* S3 のキー名を「日付+UUID」で衝突防止
* OpenAI SDK のレスポンス変化に対応
* CORS / multipart の安定対応

---

## 💡 今後の改善案

* 🌍 多言語対応
* 🎭 コメントのテンション切り替え（真面目 / おふざけ）
* 🖼️ コメントを画像にオーバーレイ

---

## 😵 苦労したことと決断

デプロイには何度も挑戦しましたが、環境依存や CORS などで多くの時間を費やしました。
最終的に **「無理に中途半端なデプロイをせず、ローカル動作と README＋図解で説明する」** という判断をしました。

この経験から学んだこと：

* 技術的な粘り強さ
* 状況に応じた意思決定の重要性

```

---






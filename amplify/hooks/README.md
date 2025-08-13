@ -0,0 +1,136 @@

# 名言コメントメーカー

## 概要
アップロードした画像から AI が即興で「写真で一言」風コメントを生成する Web / モバイル対応アプリ。  
AWS Rekognition で画像解析 → OpenAI API でコメント生成 → フロントに返却します。

---

## アーキテクチャ
1. ユーザーが画像をアップロード
2. サーバーが S3 に保存
3. AWS Rekognition でラベル解析
4. 解析結果を元に OpenAI (GPT) でコメント生成
5. 結果をフロントに返却

---

## 技術スタック
- **バックエンド**: Python, Flask, boto3, OpenAI API
- **フロントエンド(Web)**: React + TypeScript
- **フロントエンド(Mobile)**: React Native (Expo)
- **インフラ**: AWS S3, AWS Rekognition
- **その他**: dotenv, flask-cors

---

## セットアップ手順

### 1. バックエンド
```bash
git clone <this-repo>
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\Activate.ps1
pip install -r requirements.txt
````

`.env` に以下を設定

```
OPENAI_API_KEY=sk-...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-northeast-1
S3_BUCKET_NAME=your-bucket-name
```

サーバー起動

```bash
python analyze_with_gpt4v.py
```

---

### 2. フロントエンド(Web)

```bash
cd web
npm install
npm start
```

APIエンドポイントは `.env` またはコード内で `http://localhost:5003` を指定。

---

## API エンドポイント

**POST** `/generate-comment`

* Content-Type: `multipart/form-data`
* フィールド: `image` (画像ファイル)

**レスポンス例**

```json
{
  "comment": "このネコ、会議中もずっと寝てる。"
}
```

---

## IAM ポリシー例

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::your-bucket/*"
    },
    {
      "Effect": "Allow",
      "Action": ["rekognition:DetectLabels"],
      "Resource": "*"
    }
  ]
}
```

---

## 工夫したポイント

* **CORS や multipart/form-data の安定対応**：Web/Expo 両対応コード
* **S3 キー名に日付+UUID付与**：衝突防止
* **OpenAI レスポンスの構造変化対応**：SDKバージョン差異を吸収
* **Expo Web/Native 両対応**：環境別にアップロード処理を分岐

---

## デモフロー

1. 画像を選択してアップロード
2. 数秒後にコメントが生成されて画面に表示
3. 再アップロードで別のコメントが楽しめる

---

## 今後の改善案

* 複数言語対応（解析と生成を言語別に）
* コメントテンションのカスタマイズ（真面目/おふざけ）
* 生成コメントを画像上にオーバーレイ

---

```

---
```
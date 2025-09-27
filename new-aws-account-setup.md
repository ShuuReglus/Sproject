# 新しいAWSアカウント作成ガイド

## 現在の状況
- `admin-shuu-@` ユーザーが検疫ポリシーでロックアウト
- ルートユーザーアクセスも困難
- **解決策**: 新しいAWSアカウントを作成

## Step 1: 新しいAWSアカウント作成

### 必要なもの
- **新しいメールアドレス** (Gmailの+記号も使える)
- **クレジットカード**
- **電話番号**

### 作成手順
1. **https://aws.amazon.com/ にアクセス**
2. **「Create an AWS Account」をクリック**
3. **新しいメールアドレスを入力**
   - 例: `your-email+aws2@gmail.com`
4. **アカウント名を入力**
   - 例: `sproject-new-account`
5. **パスワードを設定**
6. **連絡先情報を入力**
7. **クレジットカード情報を入力**
8. **電話認証を完了**

## Step 2: 新しいアカウントでIAMユーザー作成

### 2.1 ルートユーザーでログイン
- 新しいアカウントのメールアドレスとパスワードでログイン

### 2.2 IAMユーザー作成
```bash
# AWS CLIで作業する場合
aws configure
# 新しいアカウントのアクセスキーを設定

# 新しいIAMユーザー作成
aws iam create-user --user-name sproject-secure-user

# 管理者権限を付与
aws iam attach-user-policy \
  --user-name sproject-secure-user \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# アクセスキー作成
aws iam create-access-key --user-name sproject-secure-user
```

### 2.3 最小権限ポリシー作成
```bash
# S3、Rekognition、API Gateway用の最小権限ポリシー作成
aws iam create-policy \
  --policy-name SProjectMinimalAccess \
  --policy-document file://aws-iam-policies/combined-minimal-policy.json

# ポリシーをアタッチ
aws iam attach-user-policy \
  --user-name sproject-secure-user \
  --policy-arn arn:aws:iam::NEW_ACCOUNT_ID:policy/SProjectMinimalAccess
```

## Step 3: リソースの移行

### 3.1 S3バケット
```bash
# 新しいアカウントでS3バケット作成
aws s3 mb s3://sproject-app-image-storage-new

# 古いアカウントからデータをコピー（可能であれば）
# aws s3 sync s3://old-bucket s3://new-bucket
```

### 3.2 API Gateway
- 新しいアカウントでAPI Gatewayを再作成
- エンドポイントURLが変わるため、アプリケーションの設定更新が必要

### 3.3 Rekognition
- 設定不要（リージョンベースのサービス）

## Step 4: アプリケーション設定更新

### 4.1 環境変数更新
```bash
# .env ファイルを更新
AWS_ACCESS_KEY_ID=新しいアクセスキーID
AWS_SECRET_ACCESS_KEY=新しいシークレットアクセスキー
AWS_REGION=ap-northeast-1
S3_BUCKET_NAME=sproject-app-image-storage-new
API_GATEWAY_URL=新しいAPI GatewayのURL
```

### 4.2 設定ファイル更新
- `src/config/aws.js` などの設定ファイルを更新
- 新しいリソースのARNやURLに変更

## Step 5: 古いアカウントの処理

### 5.1 請求停止
1. **古いアカウントの全リソースを削除**
   - S3バケット
   - API Gateway
   - その他のリソース

2. **アカウント閉鎖**
   - AWS Supportに連絡してアカウント閉鎖を依頼

### 5.2 セキュリティ対策
- 古いアクセスキー `AKIAR7HWXWCYXENKE2HH` は既に無効化済み
- 新しいアカウントでは最初から最小権限で運用

## 費用について

### 新しいアカウントの費用
- **12ヶ月間の無料利用枠**が再度利用可能
- S3、Rekognition、API Gatewayの無料枠が復活

### 移行作業の費用
- データ転送費用（少額）
- 一時的な重複費用（数日程度）

## 作業時間の見積もり

- **アカウント作成**: 30分
- **IAMユーザー設定**: 30分
- **リソース再作成**: 1-2時間
- **アプリケーション設定更新**: 1時間
- **テスト**: 1時間

**合計**: 約4-5時間

## メリット

1. **完全にクリーンな環境**
2. **セキュリティリスクの完全排除**
3. **無料利用枠の再利用**
4. **管理権限の確実な確保**

## 今すぐやること

1. **新しいメールアドレスを準備**
2. **https://aws.amazon.com/ で新しいアカウント作成**
3. **作成完了後、IAMユーザー設定**

これが一番確実で早い解決方法です！どうしますか？
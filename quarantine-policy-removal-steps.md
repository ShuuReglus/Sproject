# 検疫ポリシー削除の詳細手順

## ルートユーザーでログイン後の作業

### Step 1: IAMユーザーページに移動

1. **AWSコンソールにルートユーザーでログイン済み**の状態で
2. 上部の検索バーに「IAM」と入力してEnter
3. 「IAM」サービスをクリック

### Step 2: 問題のユーザーを見つける

1. 左サイドバーの「Users」をクリック
2. ユーザー一覧から「admin-shuu-」を探してクリック

### Step 3: アタッチされているポリシーを確認

ユーザー詳細ページで「Permissions」タブをクリックすると、以下のようなセクションが表示されます：

```
Permissions policies
├── Permissions policies directly attached
│   ├── QuarantinePolicy (inline policy) ← これが検疫ポリシー
│   └── SomeOtherPolicy
└── Permissions from groups
    └── (グループがあれば表示)
```

### Step 4: 検疫ポリシーを削除

#### パターンA: インラインポリシーの場合
1. 「QuarantinePolicy」や「DenyAllPolicy」のような名前のポリシーを探す
2. そのポリシーの右側にある「Remove」または「Delete」ボタンをクリック
3. 確認ダイアログで「Delete」をクリック

#### パターンB: 管理ポリシーの場合
1. 検疫ポリシーの右側にある「Detach」ボタンをクリック
2. 確認ダイアログで「Detach」をクリック

### Step 5: 検疫ポリシーの特定方法

検疫ポリシーは通常以下のような名前です：
- `QuarantinePolicy`
- `DenyAllPolicy`
- `SecurityIncidentPolicy`
- `EmergencyLockdownPolicy`

または、ポリシーの内容を確認して以下のようなものを探します：
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

### Step 6: ポリシー内容の確認方法

1. ポリシー名をクリック
2. 「JSON」タブをクリック
3. 内容を確認して、全てを拒否する（Deny）ポリシーかどうか判断

### Step 7: 削除後の確認

1. 「Permissions」タブに戻る
2. 検疫ポリシーが削除されていることを確認
3. 必要に応じて適切な権限ポリシーをアタッチ

## 画面キャプチャでの説明

### 1. ユーザー一覧画面
```
IAM > Users
┌─────────────────────────────────────┐
│ User name        │ Groups │ Tags    │
├─────────────────────────────────────┤
│ admin-shuu-      │   -    │   -     │ ← これをクリック
│ other-user       │   -    │   -     │
└─────────────────────────────────────┘
```

### 2. ユーザー詳細画面
```
admin-shuu- > Permissions
┌─────────────────────────────────────┐
│ Permissions policies                │
│                                     │
│ ✓ QuarantinePolicy (inline)  [Remove] ← これを削除
│ ✓ AdministratorAccess        [Detach] │
└─────────────────────────────────────┘
```

### 3. 削除確認ダイアログ
```
┌─────────────────────────────────────┐
│ Remove inline policy                │
│                                     │
│ Are you sure you want to remove     │
│ the inline policy "QuarantinePolicy"│
│ from user admin-shuu-?              │
│                                     │
│         [Cancel]    [Remove]        │
└─────────────────────────────────────┘
```

## トラブルシューティング

### Q: 検疫ポリシーが見つからない
A: 以下を確認してください：
- グループに所属していないか確認
- 他の名前のポリシーがないか確認
- ポリシーの内容を一つずつ確認

### Q: 削除ボタンが押せない
A: ルートユーザーでログインしているか確認してください

### Q: 削除後も権限エラーが出る
A: ブラウザのキャッシュをクリアするか、一度ログアウト→ログインしてください

## 削除後にやること

1. **適切な権限を再設定**
   - AdministratorAccessをアタッチ、または
   - 必要最小限の権限をアタッチ

2. **アクセスキーの更新**
   - 侵害されたキーを削除
   - 新しいキーを生成

3. **動作確認**
   - AWS CLIで `aws sts get-caller-identity` を実行

これで検疫ポリシーが削除できるはずです！
# GitHub Actions 自動デプロイ設定ガイド

このガイドでは、GitHub Actionsを使用してFTPサーバーへの自動デプロイを設定します。

## 🎯 設定後の動作

```bash
git add .
git commit -m "Update website"
git push
# ↑ この時点で自動的にFTPサーバーにデプロイされます！
```

---

## 📋 必要な情報

以下の情報を準備してください：

### FTP接続情報
- **FTPサーバー**: 例: `ftp.lea-schritt.com`
- **FTPユーザー名**: 例: `leaschritt@lea-schritt.com`
- **FTPパスワード**: FTPアカウントのパスワード
- **サーバーディレクトリ**: 例: `/public_html/` または `/www/`

### メール設定情報（.envの内容）
- **SMTP_HOST**: `smtp-mail.outlook.com`
- **SMTP_PORT**: `587`
- **SMTP_USERNAME**: `info@lea-schritt.com`
- **SMTP_PASSWORD**: Outlookメールのパスワード
- **SMTP_FROM_EMAIL**: `info@lea-schritt.com`
- **SMTP_FROM_NAME**: `Lea Schritt`
- **ALLOWED_DOMAINS**: `lea-schritt.com,www.lea-schritt.com,localhost`
- **RATE_LIMIT_MAX_REQUESTS**: `5`
- **RATE_LIMIT_TIME_WINDOW**: `3600`

---

## 🔐 GitHub Secretsの設定手順

### 1. GitHubリポジトリにアクセス
https://github.com/lea-schritt/lea-schritt-website

### 2. Settingsタブをクリック

### 3. 左サイドバーから「Secrets and variables」→「Actions」をクリック

### 4. 「New repository secret」をクリックして、以下のSecretを1つずつ追加

#### FTP関連（3つ）
| Name | Value（例） |
|------|-------------|
| `FTP_SERVER` | `ftp.lea-schritt.com` |
| `FTP_USERNAME` | `leaschritt@lea-schritt.com` |
| `FTP_PASSWORD` | `あなたのFTPパスワード` |

#### メール設定（9つ）
| Name | Value |
|------|-------|
| `SMTP_HOST` | `smtp-mail.outlook.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USERNAME` | `info@lea-schritt.com` |
| `SMTP_PASSWORD` | `あなたのメールパスワード` |
| `SMTP_FROM_EMAIL` | `info@lea-schritt.com` |
| `SMTP_FROM_NAME` | `Lea Schritt` |
| `ALLOWED_DOMAINS` | `lea-schritt.com,www.lea-schritt.com,localhost` |
| `RATE_LIMIT_MAX_REQUESTS` | `5` |
| `RATE_LIMIT_TIME_WINDOW` | `3600` |

**合計12個のSecretを設定します**

### 5. 各Secretの追加方法

1. 「New repository secret」ボタンをクリック
2. **Name**欄に上記の名前（例: `FTP_SERVER`）を入力
3. **Secret**欄に対応する値を入力
4. 「Add secret」をクリック
5. 次のSecretも同様に追加

---

## ✅ 設定完了の確認

すべてのSecretsを追加したら、以下の手順で動作確認します：

### 1. ワークフローファイルをコミット＆プッシュ

```bash
cd "c:\Users\LeaSchritt\HP"
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push
```

### 2. GitHubでデプロイ状況を確認

1. https://github.com/lea-schritt/lea-schritt-website にアクセス
2. 「Actions」タブをクリック
3. 最新のワークフロー実行を確認
4. ✅ 緑色のチェックマークが表示されれば成功！

### 3. Webサイトで確認

ブラウザで `https://lea-schritt.com` にアクセスして、サイトが正しく表示されるか確認

---

## 🚀 今後の使い方

### ファイルを更新してデプロイ

```bash
# 1. ファイルを編集（例：contact.phpを修正）
code contact.php

# 2. 変更をコミット
git add .
git commit -m "Fix contact form validation"

# 3. GitHubにプッシュ（この時点で自動デプロイ開始）
git push

# 4. GitHubのActionsタブでデプロイ状況を確認
# 5. 数分後、本番サイトに反映される！
```

---

## 🐛 トラブルシューティング

### デプロイが失敗する場合

#### エラー: "Authentication failed"
→ FTP_USERNAME、FTP_PASSWORDが正しいか確認

#### エラー: "Directory not found"
→ `deploy.yml`の`server-dir`が正しいか確認
   - `/public_html/` または `/www/` など

#### エラー: メール送信エラー
→ SMTP_PASSWORDが正しいか確認

### デプロイログの確認方法

1. GitHubリポジトリの「Actions」タブ
2. 失敗したワークフローをクリック
3. 「Deploy to FTP」のログを確認
4. エラーメッセージを確認

---

## 📝 注意事項

### セキュリティ
- ✅ パスワードはGitHub Secretsに保存されるため、コードには含まれません
- ✅ .envファイルは自動生成されるため、GitHubにプッシュ不要
- ✅ FTPパスワードは絶対にコードに書かないでください

### デプロイタイミング
- `main`ブランチにプッシュされたときのみ自動デプロイ
- 開発中のブランチでは自動デプロイされません

### 初回デプロイ
- 初回は全ファイルがアップロードされるため、数分かかる場合があります
- 2回目以降は変更されたファイルのみアップロードされるため高速です

---

## 🎉 設定完了！

これで、コードを変更して`git push`するだけで、自動的に本番環境にデプロイされるようになりました！

何か問題があれば、GitHubのActionsタブでログを確認してください。

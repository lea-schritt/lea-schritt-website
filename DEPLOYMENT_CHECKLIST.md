# 本番環境デプロイチェックリスト

## 📋 デプロイ前の確認

### 必須項目
- [ ] `.env`ファイルに実際のメールパスワードを設定済み
- [ ] `.env`の`ALLOWED_DOMAINS`に本番ドメインを追加
- [ ] `contact.php`の`display_errors`が`0`になっているか確認
- [ ] `index_backup.html`などの不要ファイルを削除
- [ ] すべてのファイル・フォルダを準備

### セキュリティ確認
- [ ] `.env`ファイルのパーミッションを`600`に設定
- [ ] `.htaccess`が正しくアップロードされているか確認
- [ ] `contacts.json`と`rate_limit.json`へのWebアクセスが拒否されるか確認

---

## 🚀 デプロイ手順

### 1. FTPでファイルをアップロード
```
アップロード先: /public_html/ または /www/
```

必要なファイル・フォルダ:
- ✅ `_next/`
- ✅ `404/`
- ✅ `images/`
- ✅ `phpmailer/`
- ✅ `videos/`
- ✅ `404.html`
- ✅ `contact.php`
- ✅ `favicon.ico`
- ✅ `file.svg`
- ✅ `index.html`
- ✅ `.htaccess`
- ✅ `.env`
- ⚠️ `.env.example` (任意)
- ⚠️ `SECURITY_SETUP.md` (任意)

### 2. ファイルのパーミッション設定

FTPクライアントで以下のパーミッションを設定:
```
.env            → 600
.htaccess       → 644
contact.php     → 644
index.html      → 644
phpmailer/      → 755 (フォルダ)
_next/          → 755 (フォルダ)
images/         → 755 (フォルダ)
videos/         → 755 (フォルダ)
```

### 3. .envファイルの編集（本番環境用）

本番環境に合わせて以下を変更:
```env
# 本番ドメインを追加
ALLOWED_DOMAINS=lea-schritt.com,www.lea-schritt.com,localhost

# メール設定（確認）
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USERNAME=info@lea-schritt.com
SMTP_PASSWORD=実際のパスワード  # ← 必ず設定！
```

### 4. HTTPSリダイレクトの有効化（任意）

`.htaccess`ファイルで以下のコメントアウトを解除:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## ✅ デプロイ後の動作確認

### 1. サイトの表示確認
- [ ] `https://lea-schritt.com` にアクセスできるか
- [ ] すべてのページ（Home, Services, Cases, About, Contact）が表示されるか
- [ ] 画像・動画が正しく表示されるか

### 2. フォーム送信テスト
- [ ] Contactフォームに情報を入力して送信
- [ ] 送信後に「お問い合わせありがとうございます」画面が表示されるか
- [ ] `info@lea-schritt.com` にメールが届くか（3分以内）

### 3. セキュリティ確認
- [ ] `https://lea-schritt.com/.env` にアクセスして403エラーが表示されるか
- [ ] `https://lea-schritt.com/contacts.json` にアクセスして403エラーが表示されるか
- [ ] 連続6回フォーム送信して、レート制限エラーが表示されるか

### 4. HTTPSの確認（SSL証明書がある場合）
- [ ] `http://lea-schritt.com` が自動的に `https://` にリダイレクトされるか
- [ ] ブラウザのアドレスバーに鍵マークが表示されるか

---

## 🐛 トラブルシューティング

### メールが届かない場合
1. `.env`ファイルの`SMTP_PASSWORD`が正しいか確認
2. サーバーのPHPエラーログを確認（`error_log`ファイル）
3. Outlookのセキュリティ設定を確認
4. サーバーからポート587への接続が許可されているか確認

### フォーム送信がブロックされる場合
1. `.env`の`ALLOWED_DOMAINS`に本番ドメインが含まれているか確認
2. ブラウザのコンソールでエラーメッセージを確認
3. CORSエラーの場合、`contact.php`のCORS設定を本番ドメインに変更

### 403エラーが頻発する場合
1. `.htaccess`の設定が厳しすぎる可能性
2. サーバーの`mod_rewrite`が有効か確認
3. ファイルのパーミッションを確認

### ページが真っ白になる場合
1. PHPのエラーログを確認
2. `contact.php`の`display_errors`を一時的に`1`にして、エラーメッセージを確認
3. PHPのバージョンが8.0以上か確認

---

## 📞 サポート

問題が解決しない場合は、以下の情報を準備してサポートに連絡:
- エラーメッセージ（ブラウザのコンソール、サーバーのエラーログ）
- 実行した手順
- サーバー環境（PHPバージョン、Webサーバー種類）

---

## 🎉 デプロイ完了後

- [ ] チームメンバーに本番環境URLを共有
- [ ] Google Analytics、Google Search Consoleを設定（必要に応じて）
- [ ] 定期的なバックアップ設定（`contacts.json`）
- [ ] SSL証明書の有効期限を確認（Let's Encrypt使用時）

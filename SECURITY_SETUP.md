# セキュリティ設定ガイド

このドキュメントは、Lea Schritt Webサイトのセキュリティ設定手順を説明します。

## 1. 環境変数の設定

### 手順:
1. `.env.example`ファイルを`.env`にコピーする
   ```bash
   cp .env.example .env
   ```

2. `.env`ファイルを編集して、実際の設定値を入力する
   ```
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USERNAME=info@lea-schritt.com
   SMTP_PASSWORD=実際のパスワード  # ここに実際のパスワードを入力
   SMTP_FROM_EMAIL=info@lea-schritt.com
   SMTP_FROM_NAME=Lea Schritt

   ALLOWED_DOMAINS=lea-schritt.com,localhost,127.0.0.1
   RATE_LIMIT_MAX_REQUESTS=5
   RATE_LIMIT_TIME_WINDOW=3600
   ```

3. `.env`ファイルのパーミッションを制限する
   ```bash
   chmod 600 .env
   ```

## 2. 実装済みのセキュリティ対策

### DOS攻撃対策
- **レート制限**: 同一IPから1時間あたり最大5回までのリクエストに制限
- **入力長制限**: 各フィールドに最大文字数制限を設定

### CSRF攻撃対策
- **リファラーチェック**: 許可されたドメインからのリクエストのみ受け付け
- 許可ドメイン: `lea-schritt.com`, `localhost`, `127.0.0.1`

### XSS攻撃対策
- **入力サニタイゼーション**: すべての入力に`htmlspecialchars()`を適用
- **セキュリティヘッダー**: X-XSS-Protection, X-Content-Type-Options

### 情報漏洩対策
- **エラー表示の無効化**: 本番環境ではPHPエラーを表示しない
- **機密ファイルの保護**: .htaccessで.env、JSONファイルへのアクセスを拒否
- **ディレクトリリスティング無効化**: フォルダ内容の一覧表示を防止

### その他の対策
- **HTTPセキュリティヘッダー**:
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - Content-Security-Policy
  - Referrer-Policy

## 3. 本番環境へのデプロイ前チェックリスト

- [ ] `.env`ファイルを作成し、実際の認証情報を設定
- [ ] `.env`ファイルのパーミッションを600に設定
- [ ] `contact.php`の`display_errors`が0になっていることを確認
- [ ] `.htaccess`のHTTPSリダイレクトを有効化（必要に応じて）
- [ ] `debug.php`が削除されていることを確認
- [ ] `contacts.json`と`rate_limit.json`へのWebアクセスが拒否されることを確認
- [ ] メール送信のテストを実施
- [ ] フォーム送信のテストを実施

## 4. セキュリティテスト

### レート制限のテスト
1. 連続して6回フォームを送信
2. 6回目のリクエストで「リクエストが多すぎます」というエラーが表示されることを確認

### CSRF対策のテスト
1. 外部サイトからフォームを送信
2. 「不正なリクエストです」というエラーが表示されることを確認

### 機密ファイルの保護テスト
1. ブラウザで`https://lea-schritt.com/.env`にアクセス
2. アクセスが拒否されることを確認
3. `https://lea-schritt.com/contacts.json`にアクセス
4. アクセスが拒否されることを確認

## 5. 定期的なメンテナンス

- **週次**: `rate_limit.json`のサイズを確認（大きすぎる場合は削除して再生成）
- **月次**: `contacts.json`のバックアップを作成
- **四半期**: PHPMailerライブラリの更新を確認
- **半年**: セキュリティヘッダーの設定を見直し

## 6. トラブルシューティング

### メールが送信されない場合
1. `.env`ファイルの`SMTP_PASSWORD`が正しいか確認
2. Outlook/Microsoft 365のセキュリティ設定を確認
3. サーバーのエラーログを確認

### レート制限が機能しない場合
1. `rate_limit.json`ファイルの書き込み権限を確認
2. サーバーのタイムゾーン設定を確認

### フォーム送信がブロックされる場合
1. `.env`の`ALLOWED_DOMAINS`にドメインが含まれているか確認
2. HTTPSを使用している場合、リファラーが正しく送信されているか確認

## 7. 緊急時の対応

### サイトが攻撃を受けている場合
1. `.htaccess`で該当IPアドレスをブロック
   ```apache
   <RequireAll>
       Require all granted
       Require not ip 123.456.789.0
   </RequireAll>
   ```

2. レート制限を一時的に厳しくする
   ```
   RATE_LIMIT_MAX_REQUESTS=3
   RATE_LIMIT_TIME_WINDOW=7200
   ```

3. `contact.php`を一時的に無効化
   ```bash
   mv contact.php contact.php.disabled
   ```

## 8. 連絡先

セキュリティに関する問題を発見した場合は、`info@lea-schritt.com`までご連絡ください。

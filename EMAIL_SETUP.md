# メール送信設定ガイド

## 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を設定してください：

```env
# メール送信設定（Outlook Exchange）
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

## Outlook Exchangeを使用する場合

1. **Microsoftアカウントの2段階認証を有効にする**
2. **アプリパスワードを生成する**
   - Microsoftアカウント設定 → セキュリティ → 2段階認証 → アプリパスワード
   - 「メール」を選択してパスワードを生成
3. **生成されたパスワードを `EMAIL_PASS` に設定**

## その他のメールサービス

### Gmail
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Yahoo Mail
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### カスタムSMTPサーバー
```env
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
```

## 本番環境での設定

本番環境（Vercel、Netlify等）では、環境変数を以下のように設定してください：

- `EMAIL_USER`: 送信元メールアドレス
- `EMAIL_PASS`: メールパスワードまたはアプリパスワード

## セキュリティ注意事項

- `.env.local` ファイルは絶対にGitにコミットしないでください
- 本番環境では環境変数として設定してください
- アプリパスワードを使用することを強く推奨します

## テスト方法

1. 開発サーバーを起動: `npm run dev`
2. Contactページでフォームを送信
3. info@lea-schritt.com にメールが届くことを確認
4. 申し込み者にも自動返信メールが届くことを確認

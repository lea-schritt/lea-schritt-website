# Lea Schritt Website デプロイ手順

## 1. ファイルの準備

### アップロードするファイル
以下のファイルをサーバーにアップロードしてください：

```
lea-schritt-website/
├── src/                    # ソースコード
├── public/                 # 静的ファイル
├── package.json           # 依存関係
├── package-lock.json      # ロックファイル
├── next.config.ts         # Next.js設定
├── tsconfig.json          # TypeScript設定
├── tailwind.config.js     # Tailwind設定
├── postcss.config.mjs     # PostCSS設定
├── ecosystem.config.js    # PM2設定
├── env.template           # 環境変数テンプレート
└── DEPLOYMENT.md          # デプロイメントガイド
```

### 除外するファイル
以下のファイルはアップロード不要です：
- `node_modules/`
- `.next/`
- `.env.local`
- `*.log`

## 2. サーバーでの設定

### 環境変数の設定
```bash
# サーバーで .env.local ファイルを作成
nano .env.local
```

以下の内容を設定：
```env
NODE_ENV=production
EMAIL_USER=info@lea-schritt.com
EMAIL_PASS=your-app-password
```

### 依存関係のインストール
```bash
npm install --production
```

### 本番用ビルド
```bash
npm run build
```

### PM2での起動
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 3. 確認事項

- [ ] Node.js v18以上がインストールされている
- [ ] PM2がインストールされている
- [ ] Nginxが設定されている
- [ ] SSL証明書が設定されている
- [ ] 環境変数が正しく設定されている
- [ ] メール送信が動作する

## 4. トラブルシューティング

### アプリケーションが起動しない場合
```bash
pm2 logs lea-schritt-website
```

### メール送信が失敗する場合
- 環境変数（EMAIL_USER, EMAIL_PASS）を確認
- Outlook のアプリパスワードが正しく設定されているか確認

### パフォーマンス監視
```bash
pm2 monit
```

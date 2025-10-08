# Lea Schritt Website デプロイメントガイド

## 本番サーバーでの設定手順

### 1. サーバー環境の準備

```bash
# Node.jsのインストール（Ubuntu/Debian）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2のインストール
sudo npm install -g pm2

# プロジェクトディレクトリの作成
sudo mkdir -p /var/www/lea-schritt
sudo chown -R $USER:$USER /var/www/lea-schritt
```

### 2. ファイルのアップロード

1. プロジェクトファイルをZIPで圧縮
2. FTPでサーバーの `/var/www/lea-schritt` にアップロード
3. サーバーで解凍

```bash
cd /var/www/lea-schritt
unzip lea-schritt-website.zip
```

### 3. 依存関係のインストール

```bash
cd /var/www/lea-schritt
npm install --production
npm run build
```

### 4. 環境変数の設定

```bash
# .env.localファイルを作成
nano .env.local
```

以下の内容を設定：
```env
NODE_ENV=production
EMAIL_USER=info@lea-schritt.com
EMAIL_PASS=your-app-password
```

### 5. PM2でのプロセス管理

```bash
# アプリケーションの起動
pm2 start npm --name "lea-schritt-website" -- start

# 自動起動設定
pm2 startup
pm2 save

# ステータス確認
pm2 status
pm2 logs lea-schritt-website
```

### 6. Nginx設定

```bash
# Nginx設定ファイルを作成
sudo nano /etc/nginx/sites-available/lea-schritt
```

以下の内容を設定：
```nginx
server {
    listen 80;
    server_name lea-schritt.com www.lea-schritt.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 設定を有効化
sudo ln -s /etc/nginx/sites-available/lea-schritt /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. SSL設定（既存の証明書を使用）

```bash
# Let's Encrypt証明書の確認
sudo certbot certificates

# Nginx設定にSSLを追加
sudo nano /etc/nginx/sites-available/lea-schritt
```

SSL設定を追加：
```nginx
server {
    listen 443 ssl http2;
    server_name lea-schritt.com www.lea-schritt.com;
    
    ssl_certificate /etc/letsencrypt/live/lea-schritt.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lea-schritt.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name lea-schritt.com www.lea-schritt.com;
    return 301 https://$server_name$request_uri;
}
```

### 8. ファイアウォール設定

```bash
# 必要なポートを開放
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 9. ログローテーション設定

```bash
# PM2ログローテーション
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## トラブルシューティング

### アプリケーションが起動しない場合
```bash
pm2 logs lea-schritt-website
pm2 restart lea-schritt-website
```

### メール送信が失敗する場合
- 環境変数（EMAIL_USER, EMAIL_PASS）を確認
- Outlook のアプリパスワードが正しく設定されているか確認

### パフォーマンス監視
```bash
pm2 monit
```

## 更新手順

1. 新しいファイルをアップロード
2. `npm install --production`
3. `npm run build`
4. `pm2 restart lea-schritt-website`

#!/bin/bash

# Lea Schritt Website 自動デプロイスクリプト

echo "🚀 Starting deployment..."

# プロジェクトディレクトリに移動
cd /var/www/lea-schritt

# 最新のコードを取得
echo "📥 Pulling latest code..."
git pull origin main

# 依存関係をインストール
echo "📦 Installing dependencies..."
npm ci --production

# 本番用ビルド
echo "🔨 Building application..."
npm run build

# PM2でアプリケーションを再起動
echo "🔄 Restarting application..."
pm2 restart lea-schritt-website

# ステータス確認
echo "✅ Deployment completed!"
pm2 status

echo "🎉 Website is now live at https://lea-schritt.com"

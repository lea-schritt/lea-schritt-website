# Lea Schritt Corporate Website

## 概要
株式会社Lea Schritt（レア・シュリット）のコーポレートウェブサイト。データ×AIによるコンサルティングサービスを展開する企業のプロフェッショナルサイト。

## 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **アニメーション**: Framer Motion
- **スワイプ機能**: react-swipeable
- **フォント**: 
  - 和文: Noto Sans JP
  - 欧文: Inter

## 特徴
- **スワイプナビゲーション**: モバイルファーストのUIで横スワイプによる直感的なページ遷移
- **レスポンシブデザイン**: モバイル〜デスクトップまで最適化
- **洗練されたアニメーション**: Framer Motionによる滑らかなトランジション効果
- **プロフェッショナルデザイン**: 青×金のブランドカラーを活用した上品なデザイン
- **多機能コンタクトフォーム**: バリデーション付きの問い合わせフォーム

## サイト構成
1. **Hero** - メインビジュアル・価値提案・実績
2. **Services** - 4つの主要サービス紹介
3. **Case Studies** - 3つの導入事例（切り替え可能）
4. **About** - 代表プロフィール・会社概要・専門領域
5. **Contact** - 問い合わせフォーム（バリデーション付き）

## 開発・実行コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# リント
npm run lint
```

## 操作方法
### デスクトップ
- 左右矢印キー、マウスクリック、サイドボタンでナビゲーション
- 数字キー1-5で直接セクション移動

### モバイル
- 横スワイプでページ遷移
- ドットナビゲーションでダイレクトジャンプ
- ハンバーガーメニューからセクション選択

## カスタマイズポイント
### ブランドカラー
- プライマリー: Blue系 (#2563eb)
- アクセント: Gold系 (#d97706)

### コンテンツ更新箇所
- `/src/components/Hero.tsx` - 実績数値・メインメッセージ
- `/src/components/Services.tsx` - サービス内容
- `/src/components/CaseStudies.tsx` - 導入事例
- `/src/components/About.tsx` - 代表・会社情報
- `/src/components/Contact.tsx` - フォーム項目

### メタデータ
- `/src/app/layout.tsx` - SEO・OGP設定

## パフォーマンス最適化
- 画像最適化: Next.js Image コンポーネント使用
- フォント最適化: Google Fonts with display=swap
- コード分割: 自動的なページベース分割
- CSS最適化: Tailwind CSS v4によるJIT処理

## ブラウザサポート
- iOS Safari (最新2版)
- Android Chrome (最新2版)
- Chrome/Edge/Safari (デスクトップ)

## 今後の拡張予定
- [ ] CMS連携（Notion/Contentful）
- [ ] 多言語対応（英語）
- [ ] GA4/GTM設定
- [ ] お問い合わせフォーム送信機能（Resend/SendGrid）
- [ ] ブログ機能
- [ ] 資料ダウンロード機能

## 本番環境への展開
推奨ホスティング: Vercel（自動デプロイ・プレビュー機能・最適化）

## 注意事項
- ロゴファイル: `/public/images/logo.png`
- フォーム送信は現在シミュレーション（2秒待機後成功表示）
- 実際のメール送信機能は要別途実装
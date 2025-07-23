# Portfolio Landing Page

React + Vite を使用したモダンなポートフォリオランディングページです。美しいアニメーションとレスポンシブデザインを特徴としています。

## 🎨 デモ

プロジェクトを確認するには：
```bash
npm run dev
```
http://localhost:5173 でアクセスできます。

## ✨ 機能

- **レスポンシブデザイン** - モバイル、タブレット、デスクトップに対応
- **アニメーション** - React Springを使用したスムーズなアニメーション
- **インタラクティブUI** - ホバーエフェクト、モーダル表示
- **コンタクトフォーム** - バリデーション機能付き
- **プロジェクトギャラリー** - 作品の詳細表示
- **アクセシビリティ** - キーボードナビゲーション対応

## 🛠️ 技術スタック

- **React 18** - UIライブラリ
- **Vite** - ビルドツール
- **Styled Components** - CSS-in-JS
- **React Spring** - アニメーションライブラリ

## 📦 インストール

```bash
# プロジェクトをクローン
git clone <repository-url>

# ディレクトリに移動
cd portfolio-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 🏗️ プロジェクト構造

```
src/
├── components/
│   ├── animations/     # アニメーションコンポーネント
│   ├── layout/         # レイアウトコンポーネント
│   ├── sections/       # ページセクション
│   └── ui/             # UIコンポーネント
├── hooks/              # カスタムフック
├── styles/             # グローバルスタイル
├── data/               # サンプルデータ
└── utils/              # ユーティリティ関数
```

## 📝 カスタマイズ

### プロジェクトデータの編集
`src/data/projects.js` でプロジェクト情報を編集できます。

### テーマの変更
`src/styles/theme.js` でカラーパレットやタイポグラフィを変更できます。

### コンタクト情報の変更
`src/components/sections/Contact.jsx` と `src/components/layout/Footer.jsx` で連絡先情報を更新してください。

### お問い合わせフォームの設定
お問い合わせフォームをGoogle Sheetsに連携するには：
1. `google-apps-script-setup.md` の手順に従ってGoogle Apps Scriptを設定
2. `src/components/sections/Contact.jsx` の `YOUR_SCRIPT_ID` を実際のスクリプトIDに置き換え

## 🎯 主要コンポーネント

### Hero セクション
- タイプライターエフェクト
- フローティングアニメーション
- パララックス効果

### Projects セクション
- プロジェクトカードグリッド
- モーダル詳細表示
- スムーズなスクロールアニメーション

### Contact セクション
- バリデーション付きフォーム
- 連絡先情報表示
- ソーシャルリンク

## 📱 レスポンシブ対応

- **Mobile**: ~768px
- **Tablet**: 768px~992px
- **Desktop**: 992px~

## 🚀 ビルド

```bash
# 本番用ビルド
npm run build

# プレビュー
npm run preview
```

## 📄 ライセンス

MIT

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。

---

作成者: Claude  
作成日: 2025-07-23
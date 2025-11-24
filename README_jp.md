# 🗺️ 地図クイズゲーム

地図上の地域を当てて学ぶ Web ベースのクイズゲームです。

## ✨ 特徴
- モード: 中国省、世界地図（面積/GDP TopN）、ヨーロッパ地図
- 統計: スコア、正解/不正解カウント、正確率
- UI: グラデーション、レスポンシブ（モバイル対応）、多言語（英/中/日）

## 🚀 使い方
```bash
npm install
npm run dev   # http://localhost:3000
npm run build # dist/ に出力
npm run preview
```

## 📁 構成
```
map_game/
├── index.html
├── style.css
├── game.js
├── package.json
├── vite.config.js
├── README.md     # 英語（デフォルト）
├── README_zh.md  # 中文
└── README_jp.md  # 日本語
```

## 🛠 技術
- 素の JavaScript + Vite
- D3（実際の地図）、SVG（抽象地図）

## 📄 ライセンス
ISC

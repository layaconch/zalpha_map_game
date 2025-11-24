# 🗺️ Map Quiz Game

[中文说明](README_zh.md) | [日本語の説明](README_jp.md)

A web-based map quiz game to learn geography by identifying regions.

## ✨ Features
- Modes: China provinces, World map (Area/GDP TopN), Europe map
- Stats: Score, correct/wrong count, accuracy
- UI: Modern gradients, responsive (mobile-friendly), multi-language (en/zh/jp)

## 🚀 Quick Start
```bash
npm install
npm run dev   # http://localhost:3000
npm run build # output to dist/
npm run preview
```

## 📁 Structure
```
map_game/
├── index.html
├── style.css
├── game.js
├── package.json
├── vite.config.js
├── README.md       # English (default)
├── README_zh.md    # 中文
└── README_jp.md    # 日本語
```

## 🛠 Tech
- Vanilla JavaScript + Vite
- D3 (real maps), SVG (abstract maps)

## 📄 License
ISC

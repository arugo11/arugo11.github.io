---
title: PRISM — 政治記事の可視化ツール
description: JPHACKS 2024参加作品。記事本文/URLからClaude APIで関係性を抽出し、2D/3D相関図で可視化。
date: 2024-10-27
importance: 1
layout: page
permalink: /projects/prism-jphacks-2024/
github: https://github.com/jphacks/tk_2428
github_stars: jphacks/tk_2428
img: /assets/img/PRISM.png
---

{% include figure.liquid path=page.img alt="PRISM thumbnail" sizes="(min-width: 768px) 720px, 100vw" %}

<div class="mb-3">
  <a class="btn btn-sm z-depth-0" href="{{ page.github }}" target="_blank">
    <i class="fa-brands fa-github"></i> GitHubで見る
  </a>
</div>

<p>
  <span class="badge bg-secondary">Python</span>
  <span class="badge bg-secondary">Claude API</span>
  <span class="badge bg-secondary">2D/3D Visualization</span>
  <span class="badge bg-secondary">Backend</span>
  <span class="badge bg-secondary">Team Lead</span>
</p>

## 概要

大学2年の夏に JPHACKS に参加し、政治記事を直感的に理解できる可視化ツール「PRISM」を開発しました。記事本文やURLを入力すると Claude API により JSON を生成し、人物・政策・法令などの関係性を抽出して 2D・3D の相関図として表示します。

## ハイライト

- 記事本文/URLからの関係抽出と可視化の一連のパイプラインを設計
- Claude APIによるJSON生成→グラフ抽出→2D/3D相関図レンダリング
- 安定動作のための3D描画調整とデータ処理の堅牢化

## 期間 / 体制 / 役割

- 期間: 2025年10月
- 体制: 4名（ドキュメント・テスト1、フロント2、バックエンド兼リード1）
- 役割: 開発リーダー兼バックエンド担当

## 主な貢献

- JSON データ処理の設計・実装
- Claude API との連携部分の実装
- 3D 表示の安定化（レイアウト・パフォーマンス調整）
- タスク管理と役割分担の推進

## 得られた学び

短期間での開発における意思決定と優先順位付け、リーダーシップの重要性を体感し、実装力を強化しました。

## リポジトリ

- GitHub: https://github.com/jphacks/tk_2428

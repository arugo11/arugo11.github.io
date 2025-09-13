---
title: 松尾研 LLM 開発コンペ 2025 — DNAチーム DPO班リーダー
description: LLMの安全性向上を目的にDPOデータの合成と拡張を主導。<think>タグを含む推論過程データ生成やHPC環境での大規模データ生成に取り組み、総合5位・DNA 3位・MVPを獲得。
date: 2025-07-01
importance: 4
layout: page
permalink: /projects/matsuo-llm-competition-2025/
img: /assets/img/llmcompe2025.png
---

{% include figure.liquid path=page.img alt="LLM Compe 2025 thumbnail" sizes="(min-width: 768px) 720px, 100vw" %}

<div class="mb-3">
  <a class="btn btn-sm z-depth-0" href="https://weblab.t.u-tokyo.ac.jp/lm-compe-2025/" target="_blank" rel="noopener">
    公式サイトを開く
  </a>
</div>

<p>
  <span class="badge bg-secondary">LLM</span>
  <span class="badge bg-secondary">DPO</span>
  <span class="badge bg-secondary">Safety</span>
  <span class="badge bg-secondary">Reasoning</span>
  <span class="badge bg-secondary">HPC</span>
  <span class="badge bg-secondary">Weights &amp; Biases</span>
  <span class="badge bg-secondary">Hugging Face</span>
</p>

## 概要
松尾研LLM開発コンペ2025にて、DNAチームのDPO班リーダーとして学習用データの拡張・合成を主導。Do Not Answer（DNA）スコア向上のため、好ましい/好ましくない応答を対で学習させるDPOデータ、およびReasoning model向けの<code>&lt;think&gt;</code>タグ付きデータを設計・生成。

## 期間 / 体制 / 役割
- 期間: 2025年7月 - 2025年9月
- 体制: データ合成（HLE/DNA）・学習・評価の3チーム構成
- 役割: DNAチームDPO班リーダー（データ設計・生成フロー構築・品質管理）

## 主な取り組み
- DPO用データの拡張：好ましくない応答を意図的に生成・収集するプロンプト設計
- Reasoningデータ生成：<code>&lt;think&gt;</code>タグを含む推論過程の構造化と整合性チェック
- HPC環境での大規模ジョブ実行と管理（キュー投入・再開戦略）
- W&amp;B/Hugging Faceを用いた実験管理・モデル/データのバージョニング

## 成果
- 総合順位: 全10チーム中5位、DNAスコア3位
- 大会全体MVPを受賞（開発過程の評価）

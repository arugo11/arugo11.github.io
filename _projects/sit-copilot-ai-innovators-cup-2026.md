---
title: SIT Copilot — AI Innovators Cup @ Shibaura 金賞
description: AI Innovators Cup @ Shibaura にて、講義中の理解支援と講義後の復習支援を目的とした学習支援アプリ「SIT Copilot」を開発し、金賞を受賞。
date: 2026-03-13
importance: 5
featured: true
layout: page
permalink: /projects/sit-copilot-ai-innovators-cup-2026/
github: https://github.com/arugo11/sit-copilot
github_stars: arugo11/sit-copilot
---

<div class="mb-3">
  <a class="btn btn-sm z-depth-0" href="https://github.com/arugo11/sit-copilot" target="_blank" rel="noopener">
    <i class="fa-brands fa-github"></i> GitHubで見る
  </a>
</div>

<p>
  <span class="badge bg-secondary">AI</span>
  <span class="badge bg-secondary">EdTech</span>
  <span class="badge bg-secondary">Accessibility</span>
  <span class="badge bg-secondary">FastAPI</span>
  <span class="badge bg-secondary">React</span>
  <span class="badge bg-secondary">Azure OpenAI</span>
  <span class="badge bg-secondary">Azure AI Speech</span>
</p>

## 概要

芝浦工業大学の学内コンペ「AI Innovators Cup @ Shibaura」において、講義中の理解支援と講義後の復習支援を目的とした学習支援アプリ `SIT Copilot` を開発し、金賞を受賞しました。

`SIT Copilot` は、ライブ字幕表示、やさしい日本語・英語への切り替え、要点や用語の補助、講義内容を根拠にしたミニ質問QAなどを通じて、講義を追いやすくすることを目指したアプリです。留学生やアクセシビリティ支援が必要な学生を主な対象としつつ、日本語モードでは一般の学生も利用できる形を意識して設計しました。

## コンペとの対応

このコンペでは、AIそのものを新規開発することよりも、既存のAIサービスをどう組み合わせ、どのように課題解決へつなげたかが重視されていました。`SIT Copilot` では、音声認識、翻訳、要約、根拠付きQAといった機能を実際に動くWebアプリとして統合し、講義理解の支援という具体的な課題に対してプロトタイプを提示しました。

## 技術構成

- Backend: FastAPI / Python
- Frontend: React + Vite + TypeScript
- 主な活用技術: Azure OpenAI, Azure AI Speech, Azure AI Search

## 補足

現時点では、公式の受賞発表や詳細情報がまだ出ていないため、このページでは簡潔な記録にとどめています。詳細は今後追記予定です。

## ポスター

<p>
  <a class="btn btn-sm z-depth-0" href="/assets/pdf/SIT_Copilot_Poster.pdf" target="_blank" rel="noopener">
    ポスターPDF
  </a>
</p>

<div class="mt-3">
  <h3>ポスター プレビュー</h3>
  <object data="/assets/pdf/SIT_Copilot_Poster.pdf" type="application/pdf" width="100%" height="600px">
    <p>PDFを表示できません。<a href="/assets/pdf/SIT_Copilot_Poster.pdf" target="_blank" rel="noopener">こちらからダウンロード</a>してください。</p>
  </object>
</div>

---
title: RoboCup Junior Rescue Line — センサ処理とNXT制御
description: ロボカップジュニア・レスキューラインでソフトウェア制御を担当。Arduinoで各種センサ値を取得しI2CでNXTへ連携、NXCで制御ロジックを実装。ノイズ対策とチーム開発の難しさを経験。
date: 2025-09-01
importance: 1
layout: page
permalink: /projects/robocup-rescue-line-2019-2025/
img: /assets/img/robocupjunior.png
---

{% include figure.liquid path=page.img alt="RoboCup Junior Rescue Line thumbnail" sizes="(min-width: 768px) 720px, 100vw" %}

<p>
  <span class="badge bg-secondary">Arduino</span>
  <span class="badge bg-secondary">NXT</span>
  <span class="badge bg-secondary">I2C</span>
  <span class="badge bg-secondary">NXC</span>
  <span class="badge bg-secondary">センサ処理</span>
  <span class="badge bg-secondary">チーム開発</span>
  <span class="badge bg-secondary">Rescue Line</span>
  <span class="badge bg-secondary">Embedded</span>
  <span class="badge bg-secondary">Control</span>
  <span class="badge bg-secondary">Robotics</span>
  <span class="badge bg-secondary">Noise Robustness</span>
  <span class="badge bg-secondary">Signal Processing</span>
  <span class="badge bg-secondary">Hysteresis</span>
</p>

## 概要
ロボカップジュニア・レスキューラインにおいて、ソフトウェア制御を担当しました。超音波・カラー・光・タッチといった複数センサの信号を Arduino で受信し、I2C 通信で NXT へ送信。NXC（C言語派生）で走行・ライン追従・障害物回避などの制御ロジックを実装しました。

## 期間 / 役割
- 期間: 2019年5月 - 2019年11月
- 役割: ソフトウェア制御（センサ入力処理・通信・NXT制御）

## 技術構成
- センサ入力: 超音波・カラー・光・タッチを Arduino に集約
- 通信: Arduino → NXT を I2C で連携
- 制御: NXC による NXT モータ・状態管理

## 直面した課題
- ノイズに弱い超音波センサ: 外れ値や瞬間的なノイズで制御が過敏になり不安定化。
- 対応の要点: 外れ値抑制・平滑化・ヒステリシスなど、単純な閾値分岐だけに依らない設計の必要性を認識。

## チーム開発で学んだこと
- 役割分担（回路/機体/ソフト）間の依存関係により、前工程待ちで着手が遅れる状況を経験。
- ハード/ソフト間の意見衝突を通じ、ソフトだけでは解決できない領域の理解と、ハードとの協調の重要性を学習。

## 成果
- 関東大会に出場。コロナ禍の影響で活動が制限される中、後輩へ確実に引き継ぎを実施。

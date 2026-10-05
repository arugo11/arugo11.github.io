---
layout: page
title: プロジェクト
permalink: /projects/
description: 研究・競技・開発で取り組んだプロジェクトの一覧です。
nav: true
nav_order: 2
horizontal: false
---

{% assign sorted_projects = site.projects | sort: "importance" | reverse %}
{% assign featured_projects = site.projects | where: "featured", true | sort: "importance" | reverse %}

<div class="project-index">
  <div class="header-bar">
    <p>研究・競技・個人開発を横断して、動くものを作った記録です。</p>
  </div>
  <section class="portfolio-section">
    <div class="section-heading"><div><p class="portfolio-kicker">代表</p><h2>代表プロジェクト</h2></div></div>
    <div class="portfolio-grid">
      {% for project in featured_projects %}{% include project-card.liquid project=project %}{% endfor %}
    </div>
  </section>
  <section class="portfolio-section portfolio-block">
    <div class="section-heading"><div><p class="portfolio-kicker">一覧</p><h2>すべてのプロジェクト</h2></div></div>
    <div class="portfolio-grid">
      {% for project in sorted_projects %}{% include project-card.liquid project=project %}{% endfor %}
    </div>
  </section>
</div>

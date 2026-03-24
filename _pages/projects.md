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

<div class="post project-index">
  <div class="header-bar">
    <h1>プロジェクト</h1>
    <h2>研究・競技・個人開発を横断して、動くものを作った記録です。</h2>
  </div>

  <section class="portfolio-section">
    <div class="section-heading">
      <p class="section-heading__eyebrow">代表</p>
      <h2>代表プロジェクト</h2>
    </div>
    <div class="portfolio-grid">
      {% for project in featured_projects %}
        <a class="portfolio-card portfolio-card--project" href="{{ project.url | relative_url }}">
          {% if project.img %}
            <div class="portfolio-card__image">
              {% include figure.liquid path=project.img alt=project.title class="card-img-top" sizes="(min-width: 768px) 320px, 100vw" %}
            </div>
          {% endif %}
          <div class="portfolio-card__body">
            <p class="portfolio-card__meta">{{ project.date | date: '%Y' }} 代表</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description | strip_html }}</p>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>

  <section class="portfolio-section">
    <div class="section-heading">
      <p class="section-heading__eyebrow">一覧</p>
      <h2>すべてのプロジェクト</h2>
    </div>
    <div class="projects">
      <div class="row row-cols-1 row-cols-md-3">
        {% for project in sorted_projects %}
          {% include projects.liquid %}
        {% endfor %}
      </div>
    </div>
  </section>
</div>

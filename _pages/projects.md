---
layout: default
permalink: /projects/
title: "Projects"
---

<section class="content-page">
  <header class="page-header page-header--split">
    <div>
      <p class="eyebrow" data-lang="ko">프로젝트</p>
      <p class="eyebrow" data-lang="en">Selected work</p>
      <h1 data-lang="ko">프로젝트</h1>
      <h1 data-lang="en">Projects</h1>
    </div>
    <p class="page-header__summary" data-lang="ko">직접 만들고 배포한 소프트웨어, AI, 하드웨어/앱 프로젝트를 정리한 공간입니다.</p>
    <p class="page-header__summary" data-lang="en">A growing collection of software, AI, and creative coding work.</p>
  </header>

  <div class="project-grid">
    {% assign visible_projects = site.data.projects | where_exp: "project", "project.hidden != true" %}
    {% for project in visible_projects %}
      <article class="project-card">
        <div class="project-card__topline">
          <span data-lang="ko">{{ project.status_ko | default: project.status }}</span>
          <span data-lang="en">{{ project.status }}</span>
        </div>
        {% if project.award %}
          <p class="project-card__award" data-lang="ko">{{ project.award_ko }}</p>
          <p class="project-card__award" data-lang="en">{{ project.award }}</p>
        {% endif %}
        <h2 data-lang="ko">{{ project.title_ko | default: project.title }}</h2>
        <h2 data-lang="en">{{ project.title }}</h2>
        <p data-lang="ko">{{ project.summary_ko | default: project.summary }}</p>
        <p data-lang="en">{{ project.summary }}</p>
        <div class="tag-list">
          {% for item in project.stack %}
            <span>{{ item }}</span>
          {% endfor %}
        </div>
        <div class="project-card__links">
          {% for link in project.links %}
            {% if link.url contains 'http' %}
              {% assign project_link_url = link.url %}
            {% else %}
              {% assign project_link_url = link.url | relative_url %}
            {% endif %}
            <a href="{{ project_link_url }}"><span data-lang="ko">{{ link.label_ko | default: link.label }}</span><span data-lang="en">{{ link.label }}</span></a>
          {% endfor %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

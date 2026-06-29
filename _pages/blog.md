---
layout: default
permalink: /blog/
title: "Blog"
---

<section class="content-page">
  <header class="page-header page-header--split">
    <div>
      <p class="eyebrow" data-lang="ko">글</p>
      <p class="eyebrow" data-lang="en">Writing</p>
      <h1 data-lang="ko">글</h1>
      <h1 data-lang="en">Blog</h1>
    </div>
    <p class="page-header__summary" data-lang="ko">AI, 프로그래밍, 시스템, 그리고 오래 생각해볼 만한 아이디어를 정리합니다.</p>
    <p class="page-header__summary" data-lang="en">Notes on AI, programming, systems, and ideas worth thinking through carefully.</p>
  </header>

  <div class="post-list">
    {% for post in site.posts %}
      <article class="post-card">
        <p class="post-card__date">{{ post.date | date: "%B %-d, %Y" }}</p>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        {% if post.excerpt %}
          <p>{{ post.excerpt | markdownify | strip_html | truncate: 180 }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>

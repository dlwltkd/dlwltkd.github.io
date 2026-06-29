---
layout: default
permalink: /
title: "Birken Silitch"
redirect_from:
  - /about/
  - /about.html
---

<section class="hero">
  <div class="hero__content">
    <p class="eyebrow" data-lang="ko">인공지능학과 학생 · 개발자 · 이지상</p>
    <p class="eyebrow" data-lang="en">AI student · Developer · Birken Silitch</p>
    <h1 data-lang="ko">이지상 / Birken Silitch</h1>
    <h1 data-lang="en">Birken Silitch</h1>
    <p class="hero__summary" data-lang="ko">연세대학교 인공지능학과 학생입니다. AI, 소프트웨어 개발, 창의적인 시스템을 중심으로 프로젝트를 만들고, 배운 것과 실험한 내용을 이곳에 정리합니다.</p>
    <p class="hero__summary" data-lang="en">I am an undergraduate student studying Artificial Intelligence at Yonsei University. This site is a home for my projects, writing, and the technical work I build as I grow as a developer.</p>
    <div class="hero__actions">
      <a class="button button--primary" href="{{ '/projects/' | relative_url }}"><span data-lang="ko">프로젝트 보기</span><span data-lang="en">View projects</span></a>
      <a class="button button--secondary" href="{{ '/files/Academic_CV_BirkenSilitch.pdf' | relative_url }}"><span data-lang="ko">CV 보기</span><span data-lang="en">Open CV</span></a>
      <a class="button button--icon" href="https://github.com/{{ site.author.github }}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C16.6 4.3 17.6 4.6 17.6 4.6c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4V22c0 .4.2.7.8.6A11.2 11.2 0 0 0 12 .8Z"/></svg>
        GitHub
      </a>
      <a class="button button--icon" href="https://www.linkedin.com/in/{{ site.author.linkedin }}/">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.2 9h3.6v11.5H3.2V9Zm6 0h3.4v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.2H17v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.2V9Z"/></svg>
        LinkedIn
      </a>
    </div>
  </div>
  <div class="hero__profile">
    <div class="hero__portrait-wrap">
      <img class="hero__portrait" src="{{ '/images/profile1.png' | relative_url }}" alt="Birken Silitch">
    </div>
    <div class="quick-card">
      <div>
        <span data-lang="ko">학교</span><span data-lang="en">School</span>
        <strong>Yonsei University</strong>
      </div>
      <div>
        <span data-lang="ko">전공</span><span data-lang="en">Major</span>
        <strong data-lang="ko">인공지능학과</strong>
        <strong data-lang="en">Artificial Intelligence</strong>
      </div>
      <div>
        <span data-lang="ko">이메일</span><span data-lang="en">Email</span>
        <strong><a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></strong>
      </div>
      <div>
        <span data-lang="ko">기술</span><span data-lang="en">Skills</span>
        <strong>Python · C++ · JavaScript · PyTorch</strong>
      </div>
      <div>
        <span data-lang="ko">언어</span><span data-lang="en">Languages</span>
        <strong data-lang="ko">한국어 · 영어</strong>
        <strong data-lang="en">Korean · English</strong>
      </div>
    </div>
  </div>
</section>

<section class="section section--intro">
  <div class="section__header section__header--inline">
    <div>
      <p class="eyebrow" data-lang="ko">프로젝트</p>
      <p class="eyebrow" data-lang="en">Selected work</p>
      <h2 data-lang="ko">대표 프로젝트</h2>
      <h2 data-lang="en">Featured projects</h2>
    </div>
    <a class="text-link" href="{{ '/projects/' | relative_url }}"><span data-lang="ko">전체 보기</span><span data-lang="en">All projects</span></a>
  </div>
  <div class="project-grid project-grid--featured">
    {% assign visible_projects = site.data.projects | where_exp: "project", "project.hidden != true" %}
    {% for project in visible_projects limit:3 %}
      <article class="project-card">
        <div class="project-card__topline">
          <span data-lang="ko">{{ project.status_ko | default: project.status }}</span>
          <span data-lang="en">{{ project.status }}</span>
        </div>
        {% if project.award %}
          <p class="project-card__award" data-lang="ko">{{ project.award_ko }}</p>
          <p class="project-card__award" data-lang="en">{{ project.award }}</p>
        {% endif %}
        <h3 data-lang="ko">{{ project.title_ko | default: project.title }}</h3>
        <h3 data-lang="en">{{ project.title }}</h3>
        <p data-lang="ko">{{ project.summary_ko | default: project.summary }}</p>
        <p data-lang="en">{{ project.summary }}</p>
        <div class="tag-list">
          {% for item in project.stack %}
            <span>{{ item }}</span>
          {% endfor %}
        </div>
        {% if project.detail_url %}
          <a class="project-card__cta" href="{{ project.detail_url | relative_url }}"><span data-lang="ko">자세히 보기</span><span data-lang="en">View details</span></a>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>

<section class="section">
  <div class="section__header">
    <p class="eyebrow" data-lang="ko">관심 분야</p>
    <p class="eyebrow" data-lang="en">Focus</p>
    <h2 data-lang="ko">지금 집중하고 있는 것</h2>
    <h2 data-lang="en">What I am building toward</h2>
    <p class="section__summary" data-lang="ko">AI를 공부하면서 실제로 동작하는 소프트웨어, 실험 가능한 프로젝트, 그리고 생각을 정리한 글을 쌓아가고 있습니다.</p>
    <p class="section__summary" data-lang="en">I am building practical software, experiments, and notes around AI, programming, and interactive systems.</p>
  </div>
  <div class="focus-grid">
    <article>
      <h3 data-lang="ko">인공지능</h3>
      <h3 data-lang="en">Artificial Intelligence</h3>
      <p data-lang="ko">모델이 정보를 표현하고 추론하며 실제 시스템으로 연결되는 방식을 공부합니다.</p>
      <p data-lang="en">Learning how models reason, represent information, and turn data into useful systems.</p>
    </article>
    <article>
      <h3 data-lang="ko">소프트웨어 개발</h3>
      <h3 data-lang="en">Software Development</h3>
      <p data-lang="ko">읽기 좋은 코드, 명확한 구조, 사용성을 고려한 도구를 만드는 데 관심이 있습니다.</p>
      <p data-lang="en">Building practical tools with clear structure, readable code, and attention to user experience.</p>
    </article>
    <article>
      <h3 data-lang="ko">창의적 시스템</h3>
      <h3 data-lang="en">Creative Systems</h3>
      <p data-lang="ko">게임, 시뮬레이션, 인터페이스처럼 기술적 아이디어가 상호작용으로 이어지는 영역을 탐구합니다.</p>
      <p data-lang="en">Exploring games, simulations, and interfaces where technical ideas become interactive experiences.</p>
    </article>
  </div>
</section>

<section class="section section--split">
  <div>
    <p class="eyebrow" data-lang="ko">글</p>
    <p class="eyebrow" data-lang="en">Writing</p>
    <h2 data-lang="ko">최근 기록</h2>
    <h2 data-lang="en">Recent notes</h2>
  </div>
  <div class="mini-post-list">
    {% for post in site.posts limit:2 %}
      <article>
        <p>{{ post.date | date: "%B %-d, %Y" }}</p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      </article>
    {% endfor %}
  </div>
</section>

<section id="contact" class="section contact-section">
  <div>
    <p class="eyebrow" data-lang="ko">연락</p>
    <p class="eyebrow" data-lang="en">Contact</p>
    <h2 data-lang="ko">지원, 협업, 프로젝트 이야기를 위해 언제든 연락할 수 있습니다.</h2>
    <h2 data-lang="en">Open to applications, collaborations, and project conversations.</h2>
  </div>
  <div class="contact-links">
    <a class="social-link" href="mailto:{{ site.author.email }}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5Zm2.4 2 6.6 5.1L18.6 7H5.4Zm13.6 10V9.3l-7 5.4-7-5.4V17h14Z"/></svg>
      Email
    </a>
    <a class="social-link" href="https://github.com/{{ site.author.github }}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C16.6 4.3 17.6 4.6 17.6 4.6c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4V22c0 .4.2.7.8.6A11.2 11.2 0 0 0 12 .8Z"/></svg>
      GitHub
    </a>
    <a class="social-link" href="https://www.linkedin.com/in/{{ site.author.linkedin }}/">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.2 9h3.6v11.5H3.2V9Zm6 0h3.4v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.2H17v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.2V9Z"/></svg>
      LinkedIn
    </a>
  </div>
</section>

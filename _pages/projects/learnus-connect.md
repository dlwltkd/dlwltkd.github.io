---
layout: default
permalink: /projects/learnus-connect/
title: "LearnUs Connect"
---

<article class="content-page project-detail">
  <header class="project-hero">
    <p class="eyebrow" data-lang="ko">배포 프로젝트</p>
    <p class="eyebrow" data-lang="en">Published app</p>
    <h1>LearnUs Connect</h1>
    <p class="page-header__summary" data-lang="ko">연세대학교 학생들이 LearnUs를 모바일 환경에서 더 빠르고 직관적으로 사용할 수 있도록 만든 비공식 모바일 앱입니다. 현재 Google Play Store에 배포되어 있으며, 약 50명의 월간 활성 사용자가 계속 사용하고 있습니다.</p>
    <p class="page-header__summary" data-lang="en">An unofficial mobile-first LearnUs client for Yonsei students, published on Google Play and currently used by around 50 monthly active users.</p>
    <div class="project-detail__actions">
      <a class="button button--icon" href="https://github.com/dlwltkd/learnus-scraper-app">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C16.6 4.3 17.6 4.6 17.6 4.6c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4V22c0 .4.2.7.8.6A11.2 11.2 0 0 0 12 .8Z"/></svg>
        GitHub
      </a>
      <a class="button button--icon" href="https://play.google.com/store/apps/details?id=com.jisang.learnusconnect&hl=ko">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4.2 2.4 10.9 9.6L4.2 21.6c-.1-.3-.2-.6-.2-1V3.4c0-.4.1-.7.2-1Zm12.3 10.9 2.7 2.4-11.7 6.6 9-9Zm2.7-5-2.7 2.4-9-9 11.7 6.6Zm1.4 1.2 1.1.6c1.7.9 1.7 2.9 0 3.8l-1.1.6-3-2.5 3-2.5Z"/></svg>
        Google Play
      </a>
    </div>
  </header>

  <section class="detail-band">
    <div>
      <span data-lang="ko">상태</span>
      <span data-lang="en">Status</span>
      <strong data-lang="ko">Google Play Store 배포 중</strong>
      <strong data-lang="en">Published on Google Play</strong>
    </div>
    <div>
      <span data-lang="ko">사용자</span>
      <span data-lang="en">Users</span>
      <strong data-lang="ko">약 50명 월간 활성 사용자</strong>
      <strong data-lang="en">Around 50 monthly active users</strong>
    </div>
    <div>
      <span data-lang="ko">범위</span>
      <span data-lang="en">Scope</span>
      <strong>Mobile app · Scraping API · AI features · Deployment</strong>
    </div>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">무엇을 만들었나</h2>
    <h2 data-lang="en">What I built</h2>
    <p data-lang="ko">LearnUs Connect는 기존 웹 기반 LearnUs를 모바일에서 더 편하게 쓰기 위한 비공식 학생 프로젝트입니다. 대시보드, 과제/공지 확인, 강의 자료 접근, AI 공지 요약, 스마트 알림 등을 앱 중심의 경험으로 다시 구성했습니다.</p>
    <p data-lang="en">LearnUs Connect is an unofficial student-built mobile client for Yonsei University's LearnUs platform. It reorganizes dashboard, assignments, notices, course materials, AI summaries, and notifications into a mobile-first experience.</p>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">핵심 구현 포인트</h2>
    <h2 data-lang="en">Key implementation points</h2>
    <div class="detail-grid">
      <article>
        <h3 data-lang="ko">SSO 세션 흐름 분석</h3>
        <h3 data-lang="en">SSO/session flow analysis</h3>
        <p data-lang="ko">연세대학교 포털 및 LearnUs 로그인 흐름을 분석해 세션 쿠키 기반 인증 구조를 구현했습니다. 비밀번호를 별도 저장하지 않고, SSO 이후 발급되는 세션 정보를 이용해 서버 API가 LearnUs 데이터를 가져오도록 설계했습니다.</p>
        <p data-lang="en">Analyzed Yonsei Portal/LearnUs login and session behavior to build a cookie-based authenticated scraping API without separately storing user passwords.</p>
      </article>
      <article>
        <h3 data-lang="ko">Scraping API</h3>
        <h3 data-lang="en">Scraping API</h3>
        <p data-lang="ko">FastAPI 서버에서 Selenium/BeautifulSoup 기반 scraping 로직을 사용해 과목, 과제, VOD, 게시판, 공지 데이터를 앱에서 쓰기 쉬운 API 형태로 정리했습니다.</p>
        <p data-lang="en">Built a FastAPI backend that uses Selenium/BeautifulSoup scraping to expose courses, assignments, VODs, boards, and notices as app-friendly API data.</p>
      </article>
      <article>
        <h3 data-lang="ko">AI와 알림 기능</h3>
        <h3 data-lang="en">AI and notifications</h3>
        <p data-lang="ko">공지 요약, 강의 요약, 과제 요약, AI 질문답변, 추천 알림 기능을 실제 배포 버전에 포함했습니다. Push notification과 background task를 활용해 마감, 출석, 강의 활동을 놓치지 않도록 설계했습니다.</p>
        <p data-lang="en">Shipped AI notice summaries, lecture summaries, assignment summaries, AI Q&A, and recommendation notifications in the production app, backed by push notifications and background tasks.</p>
      </article>
    </div>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">기술 스택</h2>
    <h2 data-lang="en">Tech stack</h2>
    <div class="tag-list tag-list--large">
      <span>React Native</span>
      <span>Expo</span>
      <span>TypeScript</span>
      <span>FastAPI</span>
      <span>Python</span>
      <span>Selenium</span>
      <span>BeautifulSoup</span>
      <span>SQLAlchemy</span>
      <span>PostgreSQL</span>
      <span>SQLite</span>
      <span>OpenAI GPT-4o-mini</span>
      <span>Expo Notifications</span>
      <span>Docker</span>
      <span>Caddy</span>
    </div>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">배포와 사용자</h2>
    <h2 data-lang="en">Launch and users</h2>
    <p data-lang="ko">이 프로젝트는 개인 실험에서 끝나지 않고 Google Play Store에 실제 배포되었습니다. 현재 약 50명의 월간 활성 사용자가 유지되고 있으며, 실제 연세대학교 학생들이 반복적으로 사용하는 앱이라는 점에서 단순 프로토타입보다 높은 완성도와 운영 경험을 보여줍니다.</p>
    <p data-lang="en">This project moved beyond a prototype and was published on the Google Play Store. With around 50 monthly active users, it demonstrates production deployment, real student usage, and ongoing maintenance rather than a one-off demo.</p>
  </section>
</article>

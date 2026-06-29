---
layout: default
permalink: /projects/aha/
title: "AH! Cognitive Assistive Lighting System"
---

<article class="content-page project-detail">
  <header class="project-hero">
    <p class="eyebrow" data-lang="ko">수상 프로젝트</p>
    <p class="eyebrow" data-lang="en">Awarded project</p>
    <h1 data-lang="ko">AH! 인지 보조 스마트 조명 시스템</h1>
    <h1 data-lang="en">AH! Cognitive Assistive Lighting System</h1>
    <p class="page-header__summary" data-lang="ko">치매 환자의 재가 생활을 돕기 위해 실내 이동을 감지하고, 조명과 음성 안내로 안전한 경로 이동을 지원하며, 보호자 앱에 실시간 상태를 전달하는 통합 시스템입니다.</p>
    <p class="page-header__summary" data-lang="en">An integrated dementia care system that detects indoor movement, guides patients with lighting and voice feedback, and streams realtime status updates to a caregiver mobile app.</p>
    <div class="project-detail__actions">
      <a class="button button--primary" href="https://github.com/dlwltkd/aha">GitHub</a>
      <a class="button button--secondary" href="{{ '/projects/' | relative_url }}"><span data-lang="ko">프로젝트 목록</span><span data-lang="en">All projects</span></a>
    </div>
  </header>

  <section class="detail-band">
    <div>
      <span data-lang="ko">수상</span>
      <span data-lang="en">Award</span>
      <strong data-lang="ko">2025 연세-넥슨 RC 창의플랫폼 우수상</strong>
      <strong data-lang="en">Excellence Award, 2025 Yonsei-Nexon RC Creative Platform</strong>
    </div>
    <div>
      <span data-lang="ko">역할</span>
      <span data-lang="en">Role</span>
      <strong data-lang="ko">개발팀, 소프트웨어 개발</strong>
      <strong data-lang="en">Development team, software engineering</strong>
    </div>
    <div>
      <span data-lang="ko">범위</span>
      <span data-lang="en">Scope</span>
      <strong>Edge vision · Backend · Mobile · IoT</strong>
    </div>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">무엇을 만들었나</h2>
    <h2 data-lang="en">What I built</h2>
    <p data-lang="ko">AH!는 단순 자동조명이 아니라, 치매 환자의 공간 혼동과 야간 이동 위험을 줄이기 위한 인지 보조 시스템입니다. Raspberry Pi 기반 카메라와 PIR 센서로 환자의 이동 이벤트를 감지하고, 스포트라이트 조명과 개인화된 음성 안내로 이동 방향을 부드럽게 유도합니다. 동시에 MQTT, FastAPI, PostgreSQL, WebSocket으로 이벤트를 저장·중계하고, React Native 앱에서 보호자가 환자의 위치와 이상 움직임을 실시간으로 확인할 수 있게 했습니다.</p>
    <p data-lang="en">AH! is more than an automatic light. It is an assistive system designed to reduce spatial confusion and nighttime movement risk for dementia patients. Raspberry Pi cameras and PIR sensors detect movement events, spotlight modules and personalized audio guide the patient, and a FastAPI/WebSocket backend streams events to a React Native caregiver app.</p>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">핵심 기술적 판단</h2>
    <h2 data-lang="en">Key engineering decisions</h2>
    <div class="detail-grid">
      <article>
        <h3 data-lang="ko">클라우드 비전에서 엣지 비전으로 전환</h3>
        <h3 data-lang="en">Moved from cloud vision to edge vision</h3>
        <p data-lang="ko">초기에는 OpenAI Vision API로 객체/위치 인식을 실험했지만, 2-3초 지연과 가정 내 영상 프라이버시 문제가 있었습니다. 그래서 OpenCV 기반 로컬 비전 파이프라인으로 전환해 외부 서버 없이 감지하도록 설계했습니다.</p>
        <p data-lang="en">An early OpenAI Vision API prototype was dropped because of latency and privacy concerns. The final system uses a local OpenCV pipeline on Raspberry Pi.</p>
      </article>
      <article>
        <h3 data-lang="ko">PIR + 카메라 융합</h3>
        <h3 data-lang="en">Fused PIR and camera signals</h3>
        <p data-lang="ko">PIR 센서를 단순 트리거가 아니라 비전 감도 부스팅 신호로 활용했습니다. 야간 첫 프레임 손실을 줄이고, IR 조명과 NoIR 카메라를 결합해 환자가 눈치채지 못하는 방식으로 안정적인 감지를 구현했습니다.</p>
        <p data-lang="en">PIR signals boost camera sensitivity and trigger low-visibility IR support, improving nighttime detection without startling the patient.</p>
      </article>
      <article>
        <h3 data-lang="ko">실시간 이벤트 파이프라인</h3>
        <h3 data-lang="en">Realtime event pipeline</h3>
        <p data-lang="ko">센서와 비전 이벤트는 MQTT로 수집되고, FastAPI 게이트웨이에서 PostgreSQL에 저장됩니다. WebSocket으로 앱에 즉시 방송해 보호자가 환자의 이동을 실시간으로 확인할 수 있게 했습니다.</p>
        <p data-lang="en">Sensor events flow through MQTT into a FastAPI gateway, persist to PostgreSQL, and broadcast through WebSocket to the mobile app.</p>
      </article>
    </div>
  </section>

  <section class="project-detail__section">
    <h2 data-lang="ko">기술 스택</h2>
    <h2 data-lang="en">Tech stack</h2>
    <div class="tag-list tag-list--large">
      <span>Raspberry Pi 5</span>
      <span>Raspberry Pi Zero W</span>
      <span>Python</span>
      <span>OpenCV</span>
      <span>PiCamera2</span>
      <span>PIR Sensor</span>
      <span>MQTT</span>
      <span>Eclipse Mosquitto</span>
      <span>FastAPI</span>
      <span>SQLAlchemy</span>
      <span>PostgreSQL</span>
      <span>WebSocket</span>
      <span>React Native</span>
      <span>Expo</span>
      <span>TypeScript</span>
      <span>Docker</span>
    </div>
  </section>
</article>

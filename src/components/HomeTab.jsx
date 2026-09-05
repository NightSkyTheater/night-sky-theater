import React, { useState, useEffect } from "react";
import { ACCENT, LIME, white } from "../theme";

import {
  ALBUMS,
  ALL_TRACKS,
  SUB_DATA,
  PLATFORMS,
  RELEASE_SCHEDULE,
  NEWS_ITEMS,
} from "../data";

import { formatCompact } from "./Common";


/* =========================================
   HOME TAB
========================================= */

export default function HomeTab() {
  const [liveSubs, setLiveSubs] = useState(null);
  const [newsExpanded, setNewsExpanded] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${
            import.meta.env.VITE_YOUTUBE_API_KEY
          }`
        );

        const data = await res.json();

        if (data.items?.[0]) {
          setLiveSubs(
            Number(data.items[0].statistics.subscriberCount)
          );
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();

    const interval = setInterval(fetchStats, 600000);

    return () => clearInterval(interval);
  }, []);


  const albumCount = ALBUMS.length;
  const trackCount = ALL_TRACKS.length;

  const currentSubs =
    liveSubs ??
    SUB_DATA[SUB_DATA.length - 1].subs;

  /* ALBUMS가 발매순으로 들어가 있다는 현재 데이터 구조 기준 */
  const latestAlbum =
    ALBUMS[ALBUMS.length - 1];

  const visibleNews = newsExpanded
    ? NEWS_ITEMS
    : NEWS_ITEMS.slice(0, 4);


  return (
    <div className="nst-home">

      {/* =====================================
          HERO
      ====================================== */}
      <section className="nst-hero">

        <img
          className="nst-hero-image"
          src="https://down.mixtape.so/NAS/img/b/d/d/c/bddc807264d156fa82fd1a98208a4856.png"
          alt="밤하늘극장"
        />

        <div className="nst-hero-overlay" />

        <div className="nst-hero-grain" />

        <div className="nst-hero-top">
          <span>NIGHT SKY THEATER</span>

          <span className="nst-hero-top-right">
            EST. 2025
          </span>
        </div>

        <div className="nst-hero-content">

          <p className="nst-hero-category">
            VIRTUAL INDIE BAND
          </p>

          <h1>밤하늘극장</h1>

          <p className="nst-hero-en">
            NIGHT SKY THEATER
          </p>

          <div className="nst-scroll-hint">
            <span>EXPLORE</span>
            <span className="nst-scroll-line" />
          </div>

        </div>
      </section>


      {/* =====================================
          BRAND INTRO
      ====================================== */}
      <section className="nst-section nst-intro">

        <div className="nst-section-label">
          <span>01</span>
          <span>ABOUT</span>
        </div>

        <div className="nst-intro-main">

          <h2>
            사랑과 시간,
            <br />
            기억에 깃든 감정을
            <br />
            <span>음악으로 기록합니다.</span>
          </h2>

          <p>
            밤하늘극장은 사랑과 청춘, 삶과 죽음,
            그리고 우리에게 남겨진 기억을 노래하는
            버츄얼 인디 밴드입니다.
          </p>

        </div>


        {/* STATS */}
        <div className="nst-stats">

          <div className="nst-stat">
            <strong>
              {formatCompact(currentSubs)}
            </strong>
            <span>SUBSCRIBERS</span>
          </div>

          <div className="nst-stat">
            <strong>{albumCount}</strong>
            <span>ALBUMS</span>
          </div>

          <div className="nst-stat">
            <strong>{trackCount}</strong>
            <span>TRACKS</span>
          </div>

        </div>

      </section>


      {/* =====================================
          LATEST RELEASE
      ====================================== */}

      {latestAlbum && (
        <section className="nst-section">

          <div className="nst-section-head">

            <div className="nst-section-label">
              <span>02</span>
              <span>LATEST RELEASE</span>
            </div>

            <span className="nst-section-year">
              {latestAlbum.year}
            </span>

          </div>


          <div className="nst-release-feature">

            {/* COVER */}
            <div className="nst-release-cover-wrap">

              <div
                className="nst-release-glow"
                style={{
                  background: latestAlbum.color,
                }}
              />

              <img
                className="nst-release-cover"
                src={latestAlbum.cover}
                alt={latestAlbum.title}
              />

            </div>


            {/* INFO */}
            <div className="nst-release-info">

              <p className="nst-release-type">
                NEW RELEASE
              </p>

              <h2>
                {latestAlbum.title}
              </h2>

              {latestAlbum.desc && (
                <p className="nst-release-desc">
                  {latestAlbum.desc}
                </p>
              )}

              <div className="nst-release-meta">

                <span>
                  {latestAlbum.tracks?.length ?? 0} TRACKS
                </span>

                <span>·</span>

                <span>
                  {latestAlbum.year}
                </span>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* =====================================
          RELEASE SCHEDULE
      ====================================== */}
      <section className="nst-section">

        <div className="nst-section-head">

          <div className="nst-section-label">
            <span>03</span>
            <span>UPCOMING</span>
          </div>

          <h2 className="nst-section-title">
            발매 일정
          </h2>

        </div>


        <div className="nst-list">

          {RELEASE_SCHEDULE.map((item, index) => (

            <div
              className="nst-schedule-row"
              key={`${item.title}-${item.date}`}
            >

              <div className="nst-row-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="nst-row-date">
                {item.date}
              </div>

              <div className="nst-row-main">

                <span
                  className="nst-release-tag"
                  style={{
                    color: item.tagC,
                  }}
                >
                  {item.tag}
                </span>

                <p>{item.title}</p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================
          NEWS
      ====================================== */}
      <section className="nst-section">

        <div className="nst-section-head">

          <div className="nst-section-label">
            <span>04</span>
            <span>NEWS</span>
          </div>

          <h2 className="nst-section-title">
            Latest Updates
          </h2>

        </div>


        <div className="nst-list">

          {visibleNews.map((item, index) => (

            <div
              className="nst-news-row"
              key={`${item.title}-${item.date}`}
            >

              <span className="nst-news-date">
                {item.date}
              </span>

              <p>
                {item.title}
              </p>

              <span className="nst-news-arrow">
                ↗
              </span>

            </div>

          ))}

        </div>


        {NEWS_ITEMS.length > 4 && (

          <button
            className="nst-more"
            onClick={() =>
              setNewsExpanded((v) => !v)
            }
          >
            <span>
              {newsExpanded
                ? "CLOSE"
                : "VIEW ALL NEWS"}
            </span>

            <span>
              {newsExpanded ? "↑" : "↓"}
            </span>
          </button>

        )}

      </section>


      {/* =====================================
          OFFICIAL LINKS
      ====================================== */}
      <section className="nst-section">

        <div className="nst-section-head">

          <div className="nst-section-label">
            <span>05</span>
            <span>OFFICIAL CHANNELS</span>
          </div>

          <h2 className="nst-section-title">
            Listen & Follow
          </h2>

        </div>


        <div className="nst-platforms">

          {PLATFORMS.map((p) => (

            <a
              key={p.name}
              href={`https://${p.url}`}
              target="_blank"
              rel="noreferrer"
              className="nst-platform"
            >

              <div className="nst-platform-left">

                <span
                  className="nst-platform-dot"
                  style={{
                    background: p.color,
                    boxShadow:
                      `0 0 16px ${p.color}77`,
                  }}
                />

                <span>{p.name}</span>

              </div>

              <span className="nst-platform-arrow">
                ↗
              </span>

            </a>

          ))}

        </div>

      </section>


      {/* =====================================
          CONTACT / FOOTER
      ====================================== */}
      <footer className="nst-footer">

        <div className="nst-footer-brand">

          <p>
            NIGHT SKY
            <br />
            THEATER
          </p>

        </div>


        <div className="nst-footer-contact">

          <span>CONTACT</span>

          <a href="mailto:hps_in@naver.com">
            hps_in@naver.com
          </a>

        </div>


        <div className="nst-footer-bottom">

          <span>
            © 2026 NIGHT SKY THEATER
          </span>

          <span>
            ALL RIGHTS RESERVED
          </span>

        </div>

      </footer>


      {/* =====================================
          STYLE
      ====================================== */}

      <style>{`

        .nst-home {
          width: 100%;
          overflow-x: hidden;
          color: ${white};
          background: #0e0a2e;
          text-align: left;
        }


        /* ===================================
           HERO
        =================================== */

        .nst-hero {
          position: relative;
          height: min(720px, 86vh);
          min-height: 570px;
          overflow: hidden;
          background: #080518;
        }

        .nst-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transform: scale(1.025);
        }

        .nst-hero-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(5,3,14,0.08) 0%,
              rgba(5,3,14,0.05) 27%,
              rgba(5,3,14,0.22) 48%,
              rgba(8,5,28,0.66) 72%,
              #0e0a2e 100%
            );
        }


        .nst-hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          pointer-events: none;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
        }


        .nst-hero-top {
          position: absolute;
          z-index: 3;
          top: 20px;
          left: 20px;
          right: 20px;

          display: flex;
          justify-content: space-between;

          font-size: 8px;
          letter-spacing: 0.17em;
          font-weight: 700;

          color: rgba(255,255,255,0.62);
        }

        .nst-hero-top-right {
          color: rgba(255,255,255,0.35);
        }


        .nst-hero-content {
          position: absolute;
          z-index: 3;

          left: 22px;
          right: 22px;
          bottom: 34px;
        }


        .nst-hero-category {
          margin: 0 0 11px;

          font-size: 9px;
          font-weight: 800;

          letter-spacing: .17em;

          color: ${LIME};
        }


        .nst-hero-content h1 {
          margin: 0;

          font-size: clamp(42px, 10vw, 70px);
          line-height: 0.98;

          font-weight: 900;

          letter-spacing: -0.065em;

          color: white;
        }


        .nst-hero-en {
          margin: 12px 0 0;

          font-size: 10px;
          letter-spacing: .17em;

          color: rgba(255,255,255,.40);
        }


        .nst-scroll-hint {
          margin-top: 34px;

          display: flex;
          align-items: center;
          gap: 12px;

          font-size: 7.5px;

          letter-spacing: .15em;

          color: rgba(255,255,255,.28);
        }

        .nst-scroll-line {
          display: block;

          width: 48px;
          height: 1px;

          background:
            rgba(255,255,255,.25);
        }



        /* ===================================
           GENERAL SECTIONS
        =================================== */

        .nst-section {
          padding: 70px 22px;
          border-bottom:
            1px solid rgba(255,255,255,.065);
        }


        .nst-section-head {
          margin-bottom: 28px;
        }


        .nst-section-label {
          display: flex;
          align-items: center;
          gap: 10px;

          margin-bottom: 12px;

          font-size: 8px;
          font-weight: 750;

          letter-spacing: .16em;

          color: rgba(255,255,255,.27);
        }


        .nst-section-label span:first-child {
          color: ${LIME};
          opacity: .82;
        }


        .nst-section-title {
          margin: 0;

          font-size: 28px;
          font-weight: 850;

          letter-spacing: -.05em;
        }


        .nst-section-year {
          font-size: 9px;
          color: rgba(255,255,255,.28);
        }



        /* ===================================
           INTRO
        =================================== */

        .nst-intro-main h2 {
          margin: 0;

          font-size: clamp(27px, 7vw, 40px);
          line-height: 1.4;

          font-weight: 800;

          letter-spacing: -.055em;

          word-break: keep-all;
        }


        .nst-intro-main h2 span {
          color: ${ACCENT};
        }


        .nst-intro-main > p {
          margin: 27px 0 0;

          max-width: 480px;

          font-size: 13px;
          line-height: 1.95;

          color: rgba(255,255,255,.48);

          word-break: keep-all;
        }



        /* STATS */

        .nst-stats {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          margin-top: 45px;

          border-top:
            1px solid rgba(255,255,255,.08);

          border-bottom:
            1px solid rgba(255,255,255,.08);
        }


        .nst-stat {
          position: relative;

          padding: 21px 5px;

          text-align: center;
        }


        .nst-stat + .nst-stat {
          border-left:
            1px solid rgba(255,255,255,.07);
        }


        .nst-stat strong {
          display: block;

          font-size: 22px;
          line-height: 1;

          font-weight: 900;

          letter-spacing: -.04em;
        }


        .nst-stat span {
          display: block;

          margin-top: 8px;

          font-size: 7px;

          color: rgba(255,255,255,.25);

          letter-spacing: .11em;
        }



        /* ===================================
           LATEST RELEASE
        =================================== */

        .nst-release-feature {
          display: grid;
          gap: 27px;
        }


        .nst-release-cover-wrap {
          position: relative;

          width: 100%;
        }


        .nst-release-glow {
          position: absolute;

          inset: 15%;

          filter: blur(55px);

          opacity: .26;
        }


        .nst-release-cover {
          position: relative;

          display: block;

          width: 100%;
          aspect-ratio: 1 / 1;

          object-fit: cover;

          border-radius: 3px;

          box-shadow:
            0 28px 65px rgba(0,0,0,.36);
        }


        .nst-release-type {
          margin: 0 0 10px;

          font-size: 8px;

          font-weight: 800;

          letter-spacing: .16em;

          color: ${LIME};
        }


        .nst-release-info h2 {
          margin: 0;

          font-size: clamp(27px, 7vw, 38px);

          font-weight: 850;

          line-height: 1.3;

          letter-spacing: -.055em;

          word-break: keep-all;
        }


        .nst-release-desc {
          margin: 18px 0 0;

          font-size: 12.5px;

          line-height: 1.85;

          color:
            rgba(255,255,255,.46);

          word-break: keep-all;
        }


        .nst-release-meta {
          display: flex;
          align-items: center;

          gap: 8px;

          margin-top: 22px;

          font-size: 8px;

          letter-spacing: .10em;

          color:
            rgba(255,255,255,.27);
        }



        /* ===================================
           LIST
        =================================== */

        .nst-list {
          border-top:
            1px solid rgba(255,255,255,.09);
        }


        .nst-schedule-row {
          display: grid;

          grid-template-columns:
            30px 54px 1fr;

          gap: 9px;

          padding: 18px 0;

          border-bottom:
            1px solid rgba(255,255,255,.065);
        }


        .nst-row-index {
          font-size: 8px;

          color:
            rgba(255,255,255,.17);
        }


        .nst-row-date {
          font-size: 9.5px;

          font-weight: 700;

          color:
            rgba(255,255,255,.42);
        }


        .nst-row-main {
          min-width: 0;
        }


        .nst-release-tag {
          display: block;

          margin-bottom: 7px;

          font-size: 7px;

          font-weight: 800;

          letter-spacing: .1em;
        }


        .nst-row-main p {
          margin: 0;

          font-size: 13px;

          line-height: 1.55;

          font-weight: 600;

          color:
            rgba(255,255,255,.80);

          word-break: keep-all;
        }



        /* ===================================
           NEWS
        =================================== */

        .nst-news-row {
          display: grid;

          grid-template-columns:
            60px 1fr 18px;

          gap: 10px;

          align-items: start;

          padding: 17px 0;

          border-bottom:
            1px solid rgba(255,255,255,.065);
        }


        .nst-news-date {
          padding-top: 2px;

          font-size: 8.5px;

          color:
            rgba(255,255,255,.28);
        }


        .nst-news-row p {
          margin: 0;

          font-size: 12.5px;
          line-height: 1.65;

          color:
            rgba(255,255,255,.69);

          word-break: keep-all;
        }


        .nst-news-arrow {
          color:
            rgba(255,255,255,.20);

          font-size: 13px;
        }


        .nst-more {
          width: 100%;

          display: flex;

          justify-content:
            space-between;

          margin-top: 18px;

          padding: 11px 0;

          border: none;
          background: none;

          cursor: pointer;

          font-family: inherit;

          font-size: 8px;

          letter-spacing: .13em;

          color:
            rgba(255,255,255,.34);
        }



        /* ===================================
           PLATFORMS
        =================================== */

        .nst-platforms {
          border-top:
            1px solid rgba(255,255,255,.09);
        }


        .nst-platform {
          min-height: 64px;

          display: flex;

          justify-content:
            space-between;

          align-items: center;

          border-bottom:
            1px solid rgba(255,255,255,.065);

          text-decoration: none;

          transition:
            padding .22s ease,
            opacity .22s ease;
        }


        .nst-platform:hover {
          padding-left: 7px;
          opacity: .75;
        }


        .nst-platform-left {
          display: flex;

          align-items: center;

          gap: 14px;

          color:
            rgba(255,255,255,.78);

          font-size: 13px;

          font-weight: 650;
        }


        .nst-platform-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;
        }


        .nst-platform-arrow {
          color:
            rgba(255,255,255,.22);
        }



        /* ===================================
           FOOTER
        =================================== */

        .nst-footer {
          padding: 58px 22px 32px;

          background:
            rgba(0,0,0,.12);
        }


        .nst-footer-brand p {
          margin: 0;

          font-size: 34px;

          line-height: .9;

          font-weight: 900;

          letter-spacing: -.065em;
        }


        .nst-footer-contact {
          margin-top: 36px;

          display: flex;

          flex-direction: column;

          gap: 8px;
        }


        .nst-footer-contact span {
          font-size: 7px;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.20);
        }


        .nst-footer-contact a {
          width: fit-content;

          font-size: 12px;

          color:
            rgba(255,255,255,.58);

          text-decoration: none;
        }


        .nst-footer-bottom {
          display: flex;

          justify-content:
            space-between;

          gap: 10px;

          margin-top: 42px;

          padding-top: 16px;

          border-top:
            1px solid rgba(255,255,255,.06);

          font-size: 6.5px;

          letter-spacing: .08em;

          color:
            rgba(255,255,255,.14);
        }



        /* ===================================
           DESKTOP / TABLET
        =================================== */

        @media (min-width: 700px) {

          .nst-section {
            padding:
              90px 42px;
          }


          .nst-intro-main {
            display: grid;

            grid-template-columns:
              minmax(0, 1.45fr)
              minmax(220px, .55fr);

            gap: 60px;

            align-items: end;
          }


          .nst-intro-main > p {
            margin: 0;
          }


          .nst-release-feature {
            grid-template-columns:
              minmax(260px, .9fr)
              minmax(0, 1.1fr);

            gap: 50px;

            align-items: center;
          }


          .nst-release-cover {
            max-width: 440px;
          }


          .nst-footer {
            padding:
              75px 42px 35px;
          }

        }


      `}</style>

    </div>
  );
}
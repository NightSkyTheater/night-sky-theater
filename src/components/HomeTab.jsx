import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  ALBUMS,
  ALL_TRACKS,
  NEWS_ITEMS,
  RELEASE_SCHEDULE,
  SUB_DATA,
} from "../data";
import { SectionTitle, formatCompact } from "./Common";

const HERO_IMAGE = "/img/homebg.png";

const RELEASE_DATE =
  new Date("2026-09-06T12:00:00+09:00");

/*
  추천 앨범
  data.js의 album.id를 원하는 순서대로 입력
*/
const FEATURED_ALBUM_IDS = [
  30,
  24,
  21,
  18,
  11,
  7,
];

export default function HomeTab({ setTab }) {
  const [liveSubs, setLiveSubs] = useState(null);
  const [liveViews, setLiveViews] = useState(null);

  const [countdown, setCountdown] = useState({
    released: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const latest = ALBUMS[ALBUMS.length - 1];

  /*
    추천 앨범 ID를 실제 ALBUMS 데이터와 연결
  */
  const featured = useMemo(
    () =>
      FEATURED_ALBUM_IDS
        .map((id) =>
          ALBUMS.find(
            (album) => album.id === id
          )
        )
        .filter(Boolean),
    []
  );

  /*
    YouTube 통계
  */
  useEffect(() => {
    async function fetchStats() {
      try {
        const key =
          import.meta.env.VITE_YOUTUBE_API_KEY;

        if (!key) return;

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${key}`
        );

        const data = await res.json();

        if (data.items?.[0]) {
          setLiveSubs(
            Number(
              data.items[0].statistics
                .subscriberCount
            )
          );

          setLiveViews(
            Number(
              data.items[0].statistics
                .viewCount
            )
          );
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchStats();
  }, []);

  /*
    발매 카운트다운
    발매 전 = 남은 시간
    발매 후 = 발매 후 경과 시간
  */
  useEffect(() => {
    function updateCountdown() {
      const now = new Date();

      const diff =
        RELEASE_DATE.getTime() -
        now.getTime();

      const released = diff <= 0;

      const distance =
        Math.abs(diff);

      const days = Math.floor(
        distance /
          (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance /
          (1000 * 60 * 60)) %
          24
      );

      const minutes = Math.floor(
        (distance /
          (1000 * 60)) %
          60
      );

      const seconds = Math.floor(
        (distance / 1000) %
          60
      );

      setCountdown({
        released,
        days,
        hours,
        minutes,
        seconds,
      });
    }

    updateCountdown();

    const timer =
      setInterval(
        updateCountdown,
        1000
      );

    return () =>
      clearInterval(timer);
  }, []);

  return (
    <main>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero-corporate">
        <img
          className="hero-media"
          src={HERO_IMAGE}
          alt="밤하늘극장"
        />

        <div className="hero-overlay" />

        <div className="page-shell hero-grid">

          <div className="hero-copy">

            <span className="hero-label">
              INDEPENDENT MUSIC LABEL
            </span>

            <h1>
              모든 밤에는
              <br />

              <em>남겨야 할</em>
              <br />

              노래가 있다.
            </h1>

            <p>
              밤하늘극장은 청춘과 사랑,
              삶과 죽음에 관한 이야기를
              음악으로 풀어내는 버츄얼
              인디 밴드입니다. 한 곡의
              노래에서 시작된 감정과 서사를
              가사와 캐릭터, 비주얼, 영상으로
              확장하며 밤하늘극장만의 세계를
              만들어갑니다.
            </p>

            <div className="hero-actions">

              <button
                className="btn primary"
                onClick={() =>
                  setTab("music")
                }
              >
                음악 둘러보기

                <ArrowRight
                  size={16}
                />
              </button>

              <button
                className="btn ghost"
                onClick={() =>
                  setTab("about")
                }
              >
                밤하늘극장 소개
              </button>

            </div>

          </div>

          <div className="hero-index">
            <span>EST. 2025</span>
            <span>
              ROCK · K-POP · J-POP
            </span>
            <span>
              VIRTUAL INDIE BAND
            </span>
          </div>

        </div>
      </section>


      {/* =========================
          STATS
      ========================= */}

      <section className="stats-strip">

        <div className="page-shell stats-grid">

          {[
            [
              formatCompact(
                liveSubs ??
                  SUB_DATA.at(-1)?.subs
              ),
              "YOUTUBE SUBSCRIBERS",
            ],

            [
              formatCompact(
                liveViews ?? 0
              ),
              "YOUTUBE VIEWS",
            ],

            [
              ALBUMS.length,
              "RELEASES",
            ],

            [
              ALL_TRACKS.length,
              "ORIGINAL TRACKS",
            ],

          ].map(
            ([value, label]) => (

              <div
                className="stat"
                key={label}
              >
                <strong>
                  {value}
                </strong>

                <span>
                  {label}
                </span>
              </div>

            )
          )}

        </div>

      </section>


      {/* =========================
          LATEST RELEASE
      ========================= */}

      <section className="section page-shell latest-section">

        <SectionTitle
          kicker="최신 발매"
          title="완전한 무조건적 사랑의 형태"
          body="사랑이라는 감정이 도달할 수 있는 가장 깊고 숭고한 경지, ‘조건 없음’에 대하여."
        />

        <div className="latest-layout">

          <div className="latest-cover-wrap">

            <img
              src={latest.cover}
              alt={latest.title}
            />

          </div>


          <div className="latest-info">

            {/* 발매 카운터 */}

            <div className="release-countdown">

              <div className="countdown-head">

                <span className="countdown-label">
  발매 카운트다운
</span>

                <span
  className={`countdown-status ${
    countdown.released ? "is-live" : "is-upcoming"
  }`}
>
  <i />

  {countdown.released
    ? "공개 중"
    : "공개 예정"}
</span>

              </div>


              <div className="countdown-time">

                <div className="countdown-unit">

                  <strong>

                    {countdown.released
                      ? "+"
                      : ""}

                    {String(
                      countdown.days
                    ).padStart(
                      2,
                      "0"
                    )}

                  </strong>

                  <span>DAYS</span>

                </div>


                <div className="countdown-unit">

                  <strong>

                    {String(
                      countdown.hours
                    ).padStart(
                      2,
                      "0"
                    )}

                  </strong>

                  <span>HRS</span>

                </div>


                <div className="countdown-unit">

                  <strong>

                    {String(
                      countdown.minutes
                    ).padStart(
                      2,
                      "0"
                    )}

                  </strong>

                  <span>MIN</span>

                </div>


                <div className="countdown-unit">

                  <strong>

                    {String(
                      countdown.seconds
                    ).padStart(
                      2,
                      "0"
                    )}

                  </strong>

                  <span>SEC</span>

                </div>

              </div>

            </div>


            <p className="release-meta">
              SINGLE ALBUM ·{" "}
              {latest.tracks.length} TRACKS
            </p>


            <h3>
              {latest.title}
            </h3>


            <p>
              {latest.desc}
            </p>


            <ol>

              {latest.tracks.map(
                (t) => (

                  <li key={t.n}>

                    <span>
                      {String(
                        t.n
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <b>
                      {t.title}
                    </b>

                  </li>

                )
              )}

            </ol>


            <button
              className="text-link"
              onClick={() =>
                setTab("music")
              }
            >
              앨범 자세히 보기

              <ArrowRight
                size={15}
              />
            </button>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURED RELEASES
      ========================= */}

      <section className="section section-dark featured-section">

        <div className="page-shell">

          <SectionTitle
            kicker="추천 앨범"
            title="우리가 지나온 밤의 소리"
            body="청춘과 사랑, 상실과 위로, 삶과 죽음에 관한 이야기를 밤하늘극장만의 음악으로 기록해갑니다."
            action={
              <button
                className="text-link"
                onClick={() =>
                  setTab("music")
                }
              >
                전체 발매작 보기

                <ArrowRight
                  size={15}
                />
              </button>
            }
          />

        </div>


        {/* 자동 가로 슬라이드 */}

        <div className="featured-slider">

          <div className="featured-track">

            {[
              ...featured,
              ...featured,
            ].map(
              (album, i) => (

                <button
                  className="featured-card"
                  key={`${album.id}-${i}`}
                  onClick={() =>
                    setTab("music")
                  }
                >

                  <div className="featured-art">

                    <img
                      src={album.cover}
                      alt={album.title}
                      loading="lazy"
                    />

                  </div>


                  <div className="featured-copy">

                    <h3>
                      {album.title}
                    </h3>

                    <p>
                      {album.year}
                      {" · "}
                      NIGHT SKY THEATER
                    </p>

                  </div>

                </button>

              )
            )}

          </div>

        </div>

      </section>


      {/* =========================
          WHAT WE DO
      ========================= */}

      <section className="section page-shell manifesto-grid">

        <div className="manifesto-title">

          <span className="eyebrow">
            WHAT WE DO
          </span>

          <h2>
            FROM A SONG
            <br />
            TO A WORLD.
          </h2>

        </div>


        <div className="manifesto-list">

          {[
            [
              "01",
              "MUSIC PRODUCTION",
              "작사·작곡·프로듀싱을 중심으로 장르보다 서사와 감정의 밀도를 우선합니다.",
            ],

            [
              "02",
              "ARTIST & IP",
              "가상 아티스트 유우레이를 중심으로 음악, 캐릭터, 이야기의 장기적인 IP를 구축합니다.",
            ],

            [
              "03",
              "VISUAL DIRECTION",
              "앨범 아트, 리릭 콘텐츠, 뮤직비디오까지 작품의 언어를 하나의 시각 체계로 확장합니다.",
            ],

            [
              "04",
              "DISTRIBUTION & COLLAB",
              "국내외 음원 유통과 채널 협업을 통해 독립 프로젝트의 접점을 넓혀갑니다.",
            ],

          ].map(
            ([n, t, d]) => (

              <div
                className="manifesto-item"
                key={t}
              >

                <span>
                  {n}
                </span>

                <h3>
                  {t}
                </h3>

                <p>
                  {d}
                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* =========================
          NEWS & SCHEDULE
      ========================= */}

      <section className="section page-shell news-layout">

        <SectionTitle
          kicker="UPDATES"
          title="News & Schedule"
        />


        <div className="news-columns">

          <div className="news-block">

            <h3>
              RELEASE SCHEDULE
            </h3>

            {[...RELEASE_SCHEDULE]
              .reverse()
              .slice(0, 4)
              .map((n) => (

                <div
                  className="news-row"
                  key={
                    n.date +
                    n.title
                  }
                >

                  <span>
                    {n.date}
                  </span>

                  <b>
                    {n.title}
                  </b>

                  <i>
                    {n.tag}
                  </i>

                </div>

              ))}

          </div>


          <div className="news-block">

            <h3>
              NEWSROOM
            </h3>

            {[...NEWS_ITEMS]
              .reverse()
              .slice(0, 4)
              .map((n) => (

                <div
                  className="news-row"
                  key={
                    n.date +
                    n.title
                  }
                >

                  <span>
                    {n.date}
                  </span>

                  <b>
                    {n.title}
                  </b>

                </div>

              ))}

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT CTA
      ========================= */}

      <section className="cta-band">

        <div className="page-shell cta-inner">

          <div>

            <Sparkles
              size={22}
            />

            <h2>
              Let’s make something
              <br />
              worth remembering.
            </h2>

          </div>


          <button
            className="btn light"
            onClick={() =>
              setTab("contact")
            }
          >
            CONTACT US

            <ArrowRight
              size={16}
            />
          </button>

        </div>

      </section>

    </main>
  );
}
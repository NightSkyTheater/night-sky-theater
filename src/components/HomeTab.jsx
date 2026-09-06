import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  2,
  3,
  5,
  10,
  11,
  12,
  14,
  17,
  19,
  20,
  21,
  25,
  29,
];

export default function HomeTab({
  setTab,
  setSelectedAlbum,
}) {
  const sliderRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const didDrag = useRef(false);

  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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


  // 추천 앨범 자동 스크롤
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let animationFrame;

    function autoScroll() {
      if (!isSliderPaused && !isDragging) {
        slider.scrollLeft += 0.45;

        const halfWidth = slider.scrollWidth / 2;

        if (slider.scrollLeft >= halfWidth) {
          slider.scrollLeft -= halfWidth;
        }
      }

      animationFrame = requestAnimationFrame(autoScroll);
    }

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isSliderPaused, isDragging]);

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
              MUSIC · CREATIVE STUDIO
            </span>

            <h1>
              모든 밤에는
              <br />
              <em>남겨야 할</em>
              <br />
              노래가 있다.
            </h1>

            <div className="hero-copy">
              <p>밤하늘극장은 하루의 끝, 저마다의 삶과 마음을 돌아보고 잠시 내려놓을 수 있는 작은 극장입니다.</p>
              <p>이곳에서만큼은 누구도 조연이 아닌, 모두가 자기 삶이라는 이야기의 주인공이기를 바랍니다.</p>
            </div>

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
          kicker="LATEST RELEASE"
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
    ? "발매 완료"
    : "발매 예정"}
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
            kicker="OUR MUSIC"
            title="밤하늘극장의 음악"
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

        <div
          className={`featured-slider ${
            isDragging ? "is-dragging" : ""
          }`}
          ref={sliderRef}
          onMouseEnter={() => {
            setIsSliderPaused(true);
          }}
          onMouseLeave={() => {
            setIsSliderPaused(false);
            setIsDragging(false);
          }}
          onPointerDown={(e) => {
            didDrag.current = false;
            setIsDragging(true);

            dragStartX.current = e.clientX;
            dragStartScroll.current = e.currentTarget.scrollLeft;

            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!isDragging) return;

            const distance = e.clientX - dragStartX.current;

            if (Math.abs(distance) > 5) {
              didDrag.current = true;
            }

            e.currentTarget.scrollLeft =
              dragStartScroll.current - distance;
          }}
          onPointerUp={(e) => {
            setIsDragging(false);

            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={() => {
            setIsDragging(false);
          }}
        >

          <div className="featured-track">

            {[
              ...featured,
              ...featured,
            ].map(
              (album, i) => (

<div
  className="featured-card"
  key={`${album.id}-${i}`}
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

                </div>

              )
            )}

          </div>

        </div>

      </section>


   
    {/* =========================
    소식 & 발매 일정
========================= */}

<section className="section page-shell news-layout">

  <SectionTitle
    kicker="NEWS"
    title="소식 및 발매 일정"
  />

  <div className="news-columns">

    {/* 발매 일정 */}
    <div className="news-block">

      <h3>발매 일정</h3>

      {[...RELEASE_SCHEDULE]
        .reverse()
        .slice(0, 4)
        .map((n) => (

<div
  className="news-row"
  key={n.date + n.title}
>
  <span className="news-date">
    {n.date}
  </span>

  <span
    className={`release-label release-label-${n.tag}`}
  >
    {n.tag}
  </span>

  <b>
    {n.title}
  </b>
</div>

        ))}

    </div>


    {/* 새소식 */}
    <div className="news-block">

      <h3>새소식</h3>

      {[...NEWS_ITEMS]
        .reverse()
        .slice(0, 4)
        .map((n) => (

          <div
            className="news-row"
            key={n.date + n.title}
          >
            <span className="news-date">
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

    <section className="cta-band"><div className="page-shell cta-inner"><div>
            <h2>
              우리의 밤이,
              <br />
              누군가의 오랜 기억이 되도록.
            </h2>
            <p>프로젝트 제안과 협업 문의를 기다립니다.</p></div>
            <button
            className="btn light"
            onClick={() =>
              setTab("contact")
            }
          >
            문의하기

            <ArrowRight
              size={16}
            />
          </button>
            </div>
            
    </section>



    </main>
  );
}
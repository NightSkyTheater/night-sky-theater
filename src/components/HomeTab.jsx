import React, { useState, useEffect } from "react";
import {
  ACCENT,
  LIME,
  muted,
  soft,
  white
} from "../theme";

import {
  ALBUMS,
  ALL_TRACKS,
  SUB_DATA,
  PLATFORMS,
  RELEASE_SCHEDULE,
  NEWS_ITEMS
} from "../data";

import { formatCompact } from "./Common";


/* =========================
   HERO
========================= */
function HeroBanner({
  currentSubs,
  albumCount,
  trackCount
}) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: 570,
        overflow: "hidden"
      }}
    >
      {/* Background */}
      <img
        src="https://down.mixtape.so/NAS/img/b/d/d/c/bddc807264d156fa82fd1a98208a4856.png"
        alt="밤하늘극장"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          transform: "scale(1.025)"
        }}
      />

      {/* Dark gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(3,1,14,0.02) 0%,
              rgba(3,1,14,0.12) 30%,
              rgba(3,1,14,0.52) 55%,
              rgba(14,10,46,0.90) 78%,
              #0e0a2e 100%
            )
          `
        }}
      />

      {/* subtle glow */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          left: "50%",
          bottom: -170,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,255,0,0.10), rgba(91,79,245,0.10) 35%, transparent 70%)",
          filter: "blur(35px)",
          pointerEvents: "none"
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 30,
          zIndex: 2,
          textAlign: "center"
        }}
      >
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 9,
            fontWeight: 800,
            color: LIME,
            letterSpacing: "0.2em"
          }}
        >
          NIGHT SKY THEATER
        </p>

        <h1
          style={{
            margin: 0,
            color: white,
            fontSize: 34,
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.055em"
          }}
        >
          밤하늘극장
        </h1>

        <p
          style={{
            margin: "14px auto 0",
            maxWidth: 360,
            fontSize: 13,
            color: "rgba(255,255,255,0.66)",
            lineHeight: 1.8,
            wordBreak: "keep-all"
          }}
        >
          사랑과 시간, 그리고 기억에 깃든 감정을
          <br />
          섬세하게 노래하는{" "}
          <strong
            style={{
              color: white,
              fontWeight: 750
            }}
          >
            버츄얼 인디 밴드
          </strong>
          입니다.
        </p>

        {/* stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: 28,
            paddingTop: 20,
            borderTop:
              "1px solid rgba(255,255,255,0.10)"
          }}
        >
          {[
            {
              value: formatCompact(currentSubs),
              label: "SUBSCRIBERS"
            },
            {
              value: albumCount,
              label: "ALBUMS"
            },
            {
              value: trackCount,
              label: "TRACKS"
            }
          ].map((item, index) => (
            <div
              key={item.label}
              style={{
                textAlign: "center",
                borderLeft:
                  index > 0
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none"
              }}
            >
              <div
                style={{
                  fontSize: 21,
                  fontWeight: 900,
                  lineHeight: 1,
                  color: white,
                  letterSpacing: "-0.03em"
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  marginTop: 7,
                  fontSize: 8,
                  color:
                    "rgba(255,255,255,0.30)",
                  letterSpacing: "0.12em"
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================
   SECTION HEADER
========================= */
function SectionHeader({
  eyebrow,
  title,
  right
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 15
      }}
    >
      <div>
        {eyebrow && (
          <p
            style={{
              margin: "0 0 5px",
              fontSize: 8.5,
              fontWeight: 700,
              color:
                "rgba(255,255,255,0.28)",
              letterSpacing: "0.15em"
            }}
          >
            {eyebrow}
          </p>
        )}

        <h2
          style={{
            margin: 0,
            color: white,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-0.04em"
          }}
        >
          {title}
        </h2>
      </div>

      {right}
    </div>
  );
}


/* =========================
   HOME TAB
========================= */
export default function HomeTab() {
  const [liveSubs, setLiveSubs] =
    useState(null);

  const [liveViews, setLiveViews] =
    useState(null);

  const [newsExpanded, setNewsExpanded] =
    useState(false);


  /* -------------------------
     YouTube Stats
  ------------------------- */
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${
            import.meta.env
              .VITE_YOUTUBE_API_KEY
          }`
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
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();

    const interval = setInterval(
      fetchStats,
      600000
    );

    return () =>
      clearInterval(interval);
  }, []);


  const albumCount = ALBUMS.length;
  const trackCount = ALL_TRACKS.length;

  const currentSubs =
    liveSubs ??
    SUB_DATA[SUB_DATA.length - 1].subs;

  const visibleNews = newsExpanded
    ? NEWS_ITEMS
    : NEWS_ITEMS.slice(0, 5);


  return (
    <div
      style={{
        width: "100%",
        overflowX: "hidden",
        paddingBottom: 100
      }}
    >
      {/* =========================
          HERO
      ========================= */}
      <HeroBanner
        currentSubs={currentSubs}
        albumCount={albumCount}
        trackCount={trackCount}
      />


      {/* =========================
          CONTENT
      ========================= */}
      <div
        style={{
          padding: "36px 20px 0"
        }}
      >

        {/* =========================
            RELEASE SCHEDULE
        ========================= */}
        <section>
          <SectionHeader
            eyebrow="UPCOMING"
            title="발매 일정"
            right={
              <span
                style={{
                  fontSize: 9,
                  color:
                    "rgba(255,255,255,0.25)"
                }}
              >
                {RELEASE_SCHEDULE.length} RELEASES
              </span>
            }
          />

          <div
            style={{
              borderTop:
                "1px solid rgba(255,255,255,0.08)"
            }}
          >
            {RELEASE_SCHEDULE.map(
              (n, i) => (
                <div
                  key={n.title + n.date}
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns:
                      "54px 1fr",
                    gap: 13,
                    padding: "16px 4px",
                    borderBottom:
                      "1px solid rgba(255,255,255,0.065)"
                  }}
                >
                  {/* date */}
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 10,
                        fontWeight: 700,
                        color:
                          "rgba(255,255,255,0.40)"
                      }}
                    >
                      {n.date}
                    </p>

                    <div
                      style={{
                        marginTop: 8,
                        display:
                          "inline-flex",
                        padding:
                          "4px 7px",
                        borderRadius: 999,
                        background:
                          `${n.tagC}12`,
                        border:
                          `1px solid ${n.tagC}30`,
                        fontSize: 8,
                        fontWeight: 700,
                        color: n.tagC
                      }}
                    >
                      {n.tag}
                    </div>
                  </div>

                  {/* release title */}
                  <div
                    style={{
                      minWidth: 0
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: white,
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        fontWeight: 650,
                        letterSpacing:
                          "-0.02em",
                        wordBreak: "keep-all"
                      }}
                    >
                      {n.title}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>


        {/* =========================
            NEWS
        ========================= */}
        <section
          style={{
            marginTop: 46
          }}
        >
          <SectionHeader
            eyebrow="NEWS"
            title="공지사항"
          />

          <div
            style={{
              borderTop:
                "1px solid rgba(255,255,255,0.08)"
            }}
          >
            {visibleNews.map((n) => (
              <div
                key={n.title + n.date}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "54px 1fr",
                  gap: 13,
                  padding: "15px 4px",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.065)"
                }}
              >
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 650,
                    color:
                      "rgba(255,255,255,0.30)",
                    paddingTop: 2
                  }}
                >
                  {n.date}
                </span>

                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 500,
                    color:
                      "rgba(255,255,255,0.72)",
                    lineHeight: 1.6,
                    letterSpacing:
                      "-0.015em",
                    wordBreak: "keep-all"
                  }}
                >
                  {n.title}
                </p>
              </div>
            ))}
          </div>

          {NEWS_ITEMS.length > 5 && (
            <button
              onClick={() =>
                setNewsExpanded(
                  (v) => !v
                )
              }
              style={{
                width: "100%",
                marginTop: 12,
                padding: "9px 0",
                border: "none",
                background: "none",
                color:
                  "rgba(255,255,255,0.35)",
                fontSize: 10,
                fontWeight: 650,
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {newsExpanded
                ? "접기 ↑"
                : "공지 더보기 ↓"}
            </button>
          )}
        </section>


        {/* =========================
            LINKS
        ========================= */}
        <section
          style={{
            marginTop: 46
          }}
        >
          <SectionHeader
            eyebrow="STREAMING & SOCIAL"
            title="Links"
          />

          <div
            style={{
              borderTop:
                "1px solid rgba(255,255,255,0.08)"
            }}
          >
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={"https://" + p.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: 58,
                  gap: 13,
                  textDecoration: "none",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.065)",
                  transition:
                    "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft =
                    "6px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft =
                    "0";
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: p.color,
                    boxShadow:
                      `0 0 11px ${p.color}66`,
                    flexShrink: 0
                  }}
                />

                <span
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color:
                      "rgba(255,255,255,0.76)",
                    fontWeight: 650
                  }}
                >
                  {p.name}
                </span>

                <span
                  style={{
                    fontSize: 15,
                    color:
                      "rgba(255,255,255,0.22)",
                    transform:
                      "rotate(-45deg)"
                  }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </section>


        {/* =========================
            FOOTER
        ========================= */}
        <footer
          style={{
            marginTop: 52,
            padding:
              "30px 0 10px",
            textAlign: "center",
            borderTop:
              "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <a
            href="mailto:hps_in@naver.com"
            style={{
              fontSize: 11,
              color:
                "rgba(255,255,255,0.45)",
              textDecoration: "none"
            }}
          >
            hps_in@naver.com
          </a>

          <p
            style={{
              margin: "8px 0 0",
              fontSize: 8.5,
              color:
                "rgba(255,255,255,0.16)",
              letterSpacing: "0.08em"
            }}
          >
            © 2026 NIGHT SKY THEATER
          </p>
        </footer>
      </div>
    </div>
  );
}
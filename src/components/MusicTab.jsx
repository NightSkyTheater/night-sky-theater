import React, { useState } from "react";
import { ACCENT, LIME, glass, gb, muted, soft, white } from "../theme";
import { ALBUMS } from "../data";
import { G, Hr } from "./Common";

function CDDisc({
  cover,
  color,
  size = 220,
  spinning = true,
  glow = false,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
        filter: glow
          ? `drop-shadow(0 14px 42px ${color}77)`
          : "drop-shadow(0 10px 26px rgba(0,0,0,0.5))",
        transition: "filter 0.4s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: color,
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow:
            "0 0 0 6px rgba(255,255,255,0.025), inset 0 0 30px rgba(0,0,0,0.25)",
          overflow: "hidden",
          position: "relative",
          animation: spinning ? "cdspin 26s linear infinite" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.22) 8%, rgba(255,255,255,0.02) 18%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.18) 75%, rgba(255,255,255,0.02) 100%)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.28), transparent 45%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "9%",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "20%",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: size * 0.15,
          height: size * 0.15,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3), rgba(10,6,24,0.92) 62%)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.6)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: size * 0.045,
          height: size * 0.045,
          borderRadius: "50%",
          background: "rgba(3,1,14,0.92)",
        }}
      />
    </div>
  );
}


export default function MusicTab() {
  const displayAlbums = [...ALBUMS].reverse();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
const [albumPage, setAlbumPage] = useState(0);
const ALBUMS_PER_PAGE = 6;
const totalPages = Math.ceil(displayAlbums.length / ALBUMS_PER_PAGE);

const pagedAlbums = displayAlbums.slice(
  albumPage * ALBUMS_PER_PAGE,
  albumPage * ALBUMS_PER_PAGE + ALBUMS_PER_PAGE
);

const alb = displayAlbums[index];

/* =========================
     앨범 상세 화면
  ========================= */
if (selected) {
  const tr = alb.tracks[trackIdx];

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
        paddingBottom: 100,
      }}
    >
      {/* 뒤로가기 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          padding: "10px 0 12px",
          background:
            "linear-gradient(to bottom, rgba(7,5,18,0.96), rgba(7,5,18,0.78), transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => setSelected(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            border: "none",
            background: "none",
            color: "rgba(255,255,255,0.72)",
            padding: "4px 2px",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "inherit",
          }}
        >
          <span
            style={{
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ‹
          </span>
          앨범
        </button>
      </div>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "8px 4px 30px",
        }}
      >
        {/* 앨범 컬러 배경 */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: 360,
            background: `
              radial-gradient(
                ellipse at center,
                ${alb.color}55 0%,
                ${alb.color}20 34%,
                transparent 72%
              )
            `,
            filter: "blur(40px)",
            pointerEvents: "none",
            opacity: 0.8,
          }}
        />

        {/* 커버 */}
        <div
          style={{
            position: "relative",
            width: "min(76vw, 300px)",
            aspectRatio: "1 / 1",
            margin: "0 auto",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow:
              "0 28px 65px rgba(0,0,0,0.50), 0 6px 18px rgba(0,0,0,0.28)",
          }}
        >
          <img
            src={alb.cover}
            alt={alb.title}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.18))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* 앨범 정보 */}
        <div
          style={{
            position: "relative",
            marginTop: 25,
            textAlign: "center",
            padding: "0 12px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 9,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {alb.year} · NIGHT SKY THEATER
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(22px, 6vw, 30px)",
              lineHeight: 1.28,
              fontWeight: 850,
              color: white,
              letterSpacing: "-0.045em",
              wordBreak: "keep-all",
            }}
          >
            {alb.title}
          </h1>

          {alb.desc && (
            <p
              style={{
                maxWidth: 420,
                margin: "16px auto 0",
                fontSize: 12.5,
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.56)",
                wordBreak: "keep-all",
              }}
            >
              {alb.desc}
            </p>
          )}
        </div>
      </section>

      {/* 트랙리스트 */}
      <section
        style={{
          marginTop: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px 13px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: "rgba(255,255,255,0.92)",
              fontWeight: 750,
              letterSpacing: "-0.01em",
            }}
          >
            TRACKLIST
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 9,
              color: "rgba(255,255,255,0.32)",
            }}
          >
            {alb.tracks.length} TRACKS
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {alb.tracks.map((t, j) => {
            const active = j === trackIdx;

            return (
              <div
                key={`${t.title}-${j}`}
                onClick={() => setTrackIdx(j)}
                style={{
                  position: "relative",
                  padding: active
                    ? "17px 10px 18px"
                    : "15px 10px",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.065)",
                  cursor: "pointer",
                  background: active
                    ? "linear-gradient(90deg, rgba(91,79,245,0.12), rgba(91,79,245,0.025) 70%, transparent)"
                    : "transparent",
                  transition:
                    "background 0.22s ease, padding 0.22s ease",
                }}
              >
                {/* 선택 표시 */}
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 17,
                      bottom: 17,
                      width: 2,
                      borderRadius: 999,
                      background: ACCENT,
                      boxShadow: `0 0 12px ${ACCENT}`,
                    }}
                  />
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr",
                    gap: 9,
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      paddingTop: 2,
                      fontSize: 10,
                      fontWeight: active ? 700 : 500,
                      color: active
                        ? ACCENT
                        : "rgba(255,255,255,0.26)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(t.n).padStart(2, "0")}
                  </span>

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: active ? 14 : 13,
                        fontWeight: active ? 750 : 520,
                        color: active
                          ? white
                          : "rgba(255,255,255,0.72)",
                        lineHeight: 1.45,
                        letterSpacing: "-0.025em",
                        wordBreak: "keep-all",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {t.title}
                    </p>

                    {/* 현재 트랙 설명 */}
                    {active && t.mood && (
                      <div
                        style={{
                          marginTop: 10,
                          paddingRight: 10,
                          animation:
                            "trackFadeIn 0.25s ease forwards",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 11.5,
                            lineHeight: 1.8,
                            color:
                              "rgba(255,255,255,0.46)",
                            wordBreak: "keep-all",
                          }}
                        >
                          {t.mood}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 하단 정보 */}
      <div
        style={{
          padding: "27px 10px 10px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 8.5,
            lineHeight: 1.8,
            letterSpacing: "0.11em",
            color: "rgba(255,255,255,0.20)",
          }}
        >
          NIGHT SKY THEATER
          <br />
          밤하늘극장
        </p>
      </div>

      <style>{`
        @keyframes trackFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

  /* =========================
     앨범 목록 화면
  ========================= */
  return (
  <div
    style={{
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 90,
      boxSizing: "border-box",
    }}
  >
    {/* 타이틀 */}
    <div style={{ padding: "16px 4px 18px" }}>
      <h2
        style={{
          margin: "0 0 4px 0",
          fontSize: 16,
          fontWeight: 700,
          color: LIME,
          textAlign: "center",
        }}
      >
        앨범
      </h2>

      <p
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.6)",
          margin: 0,
          textAlign: "center",
        }}
      >
        밤하늘극장의 모든 음악을 만나보세요.
      </p>
    </div>

    {/* 앨범 2열 */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "22px 14px",
        padding: "0 4px",
      }}
    >
      {pagedAlbums.map((album, pageIndex) => {
        const realIndex =
          albumPage * ALBUMS_PER_PAGE + pageIndex;

        return (
          <div
            key={`${album.id}-${realIndex}`}
            onClick={() => {
              setIndex(realIndex);
              setTrackIdx(0);
              setSelected(true);
            }}
            style={{
              cursor: "pointer",
              minWidth: 0,
            }}
          >
            <div
  style={{
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: 10,
    overflow: "hidden",
    background: glass,
    border: `1px solid ${gb}`,
    boxShadow: "0 8px 22px rgba(0,0,0,0.28)",
  }}
>
  <img
    src={album.cover}
    alt={album.title}
    loading="lazy"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />

  
</div>

            <div
              style={{
                padding: "9px 2px 0",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: white,
                  margin: "0 0 4px",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {album.title}
              </p>

              <p
                style={{
                  fontSize: 9.5,
                  color: muted,
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {album.year}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {/* 페이지 이동 */}
    {totalPages > 1 && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          marginTop: 30,
        }}
      >
        <button
          onClick={() =>
            setAlbumPage((p) => Math.max(0, p - 1))
          }
          disabled={albumPage === 0}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: albumPage === 0 ? muted : white,
            cursor: albumPage === 0 ? "default" : "pointer",
            opacity: albumPage === 0 ? 0.35 : 1,
            fontSize: 18,
            fontFamily: "inherit",
          }}
        >
          ‹
        </button>

        <span
          style={{
            fontSize: 11,
            color: muted,
            minWidth: 44,
            textAlign: "center",
          }}
        >
          {albumPage + 1} / {totalPages}
        </span>

        <button
          onClick={() =>
            setAlbumPage((p) =>
              Math.min(totalPages - 1, p + 1)
            )
          }
          disabled={albumPage === totalPages - 1}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color:
              albumPage === totalPages - 1
                ? muted
                : white,
            cursor:
              albumPage === totalPages - 1
                ? "default"
                : "pointer",
            opacity:
              albumPage === totalPages - 1
                ? 0.35
                : 1,
            fontSize: 18,
            fontFamily: "inherit",
          }}
        >
          ›
        </button>
      </div>
    )}
  </div>
);
}
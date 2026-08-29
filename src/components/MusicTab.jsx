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
const [sheetTrack, setSheetTrack] = useState(null);

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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingBottom: 80,
          }}
        >
          <button
            onClick={() => setSelected(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: ACCENT,
              fontSize: 13,
              fontFamily: "inherit",
              padding: 0,
              marginBottom: 4,
            }}
          >
            ← 목록으로
          </button>

          <G acc>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <CDDisc
                  cover={alb.cover}
                  color={alb.color}
                  size={92}
                  spinning
                  glow
                />
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: ACCENT,
                    fontWeight: 700,
                    margin: "0 0 4px",
                    letterSpacing: "0.1em",
                    opacity: 0.8,
                  }}
                >
                  {alb.year}
                </p>

                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: white,
                    margin: "0 0 6px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {alb.title}
                </p>

                <p
                  style={{
                    fontSize: 11.5,
                    color: muted,
                    lineHeight: 1.6,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  "{alb.desc}"
                </p>
              </div>
            </div>

            <Hr my={16} />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
              }}
            >
              {alb.tracks.map((_, j) => (
                <div
                  key={j}
                  onClick={() => setTrackIdx(j)}
                  style={{
                    width: j === trackIdx ? 20 : 6,
                    height: 4,
                    borderRadius: 2,
                    background:
                      j === trackIdx
                        ? ACCENT
                        : "rgba(91,79,245,0.2)",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </G>

          <G
            style={{
              textAlign: "center",
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "24px 20px",
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: muted,
                margin: "0 0 6px",
                letterSpacing: "0.1em",
              }}
            >
              TRACK {tr.n} / {alb.tracks.length}
            </p>

            <p
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: white,
                margin: "0 0 10px",
                lineHeight: 1.35,
              }}
            >
              {tr.title}
            </p>

            {tr.mood && (
              <p
                style={{
                  fontSize: 13,
                  color: soft,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                "{tr.mood}"
              </p>
            )}
          </G>

          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            <button
              onClick={() =>
                setTrackIdx((i) => Math.max(0, i - 1))
              }
              disabled={trackIdx === 0}
              style={{
                flex: 1,
                padding: "12px",
                background: glass,
                border: `1px solid ${gb}`,
                borderRadius: 12,
                cursor:
                  trackIdx === 0
                    ? "not-allowed"
                    : "pointer",
                color: trackIdx === 0 ? muted : soft,
                fontSize: 13,
                fontFamily: "inherit",
                opacity: trackIdx === 0 ? 0.4 : 1,
                transition: "all 0.2s",
              }}
            >
              ← 이전
            </button>

            <button
              onClick={() =>
                setTrackIdx((i) =>
                  Math.min(
                    alb.tracks.length - 1,
                    i + 1
                  )
                )
              }
              disabled={
                trackIdx === alb.tracks.length - 1
              }
              style={{
                flex: 1,
                padding: "12px",
                background:
                  trackIdx === alb.tracks.length - 1
                    ? glass
                    : "rgba(91,79,245,0.09)",
                border: `1px solid ${
                  trackIdx === alb.tracks.length - 1
                    ? gb
                    : "rgba(91,79,245,0.25)"
                }`,
                borderRadius: 12,
                cursor:
                  trackIdx === alb.tracks.length - 1
                    ? "not-allowed"
                    : "pointer",
                color:
                  trackIdx === alb.tracks.length - 1
                    ? muted
                    : ACCENT,
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: 700,
                opacity:
                  trackIdx === alb.tracks.length - 1
                    ? 0.4
                    : 1,
                transition: "all 0.2s",
              }}
            >
              다음 →
            </button>
          </div>

          <G pad="0">
            <div
              style={{
                padding: "14px 18px 10px",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: white,
                  margin: 0,
                }}
              >
                수록곡
              </p>
            </div>

            <Hr />

            {alb.tracks.map((t, j) => (
              <div key={`${t.title}-${j}`}>
                <div
                  onClick={() => setTrackIdx(j)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 18px",
                    cursor: "pointer",
                    background:
                      j === trackIdx
                        ? "rgba(184,255,0,0.06)"
                        : "transparent",
                    transition:
                      "background 0.15s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color:
                        j === trackIdx
                          ? ACCENT
                          : muted,
                      width: 16,
                      flexShrink: 0,
                    }}
                  >
                    {t.n}
                  </span>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 1px",
                        fontSize: 13,
                        fontWeight:
                          j === trackIdx
                            ? 700
                            : 400,
                        color:
                          j === trackIdx
                            ? white
                            : soft,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                      }}
                    >
                      {t.title}
                    </p>
                  </div>
{t.sheets?.length > 0 && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setSheetTrack(t);
    }}
    style={{
      flexShrink: 0,
      fontSize: 9,
      fontWeight: 700,
      color: ACCENT,
      border: `1px solid ${ACCENT}55`,
      background: `${ACCENT}12`,
      borderRadius: 6,
      padding: "3px 7px",
      letterSpacing: "-0.2px",
      cursor: "pointer",
      fontFamily: "inherit",
    }}
  >
    악보
  </button>
)}
                  {j === trackIdx && (
                    <span
                      style={{
                        fontSize: 10,
                        color: ACCENT,
                        flexShrink: 0,
                      }}
                    >
                      ▶
                    </span>
                  )}
                </div>

                {j <
                  alb.tracks.length - 1 && <Hr />}
              </div>
            ))}
          </G>
          {sheetTrack && (
  <div
    onClick={() => setSheetTrack(null)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.72)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      boxSizing: "border-box",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: 360,
        background: "rgba(16,14,30,0.97)",
        border: `1px solid ${gb}`,
        borderRadius: 20,
        boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
        overflow: "hidden",
      }}
    >
      {/* 팝업 상단 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 18px",
          borderBottom: `1px solid ${gb}`,
        }}
      >
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: 10,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "0.08em",
            }}
          >
            SHEET MUSIC
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 700,
              color: white,
            }}
          >
            악보
          </p>
        </div>

        <button
          onClick={() => setSheetTrack(null)}
          style={{
            background: "none",
            border: "none",
            color: muted,
            cursor: "pointer",
            fontSize: 18,
            padding: 4,
            fontFamily: "inherit",
          }}
        >
          ×
        </button>
      </div>

      {/* 곡명 */}
      <div
        style={{
          padding: "16px 18px 10px",
          textAlign: "left",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: white,
            lineHeight: 1.5,
          }}
        >
          {sheetTrack.title}
        </p>
      </div>

      {/* 악보 목록 */}
      <div
        style={{
          padding: "4px 14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {sheetTrack.sheets.map((sheet, i) => (
          <div
            key={`${sheet.type}-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: `${ACCENT}12`,
                border: `1px solid ${ACCENT}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {sheet.type === "drum"
                ? "🥁"
                : sheet.type === "guitar"
                ? "🎸"
                : sheet.type === "bass"
                ? "🎸"
                : sheet.type === "piano"
                ? "🎹"
                : sheet.type === "vocal"
                ? "🎤"
                : "🎼"}
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: white,
                }}
              >
                {sheet.label}
              </p>

              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 10,
                  color: muted,
                }}
              >
                PDF 악보
              </p>
            </div>

            <button
              onClick={() =>
                window.open(
                  sheet.url,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              style={{
                flexShrink: 0,
                background: `${ACCENT}12`,
                border: `1px solid ${ACCENT}44`,
                color: ACCENT,
                borderRadius: 8,
                padding: "7px 10px",
                fontSize: 10,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              보기 →
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
        </div>
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
        DISCOGRAPHY
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
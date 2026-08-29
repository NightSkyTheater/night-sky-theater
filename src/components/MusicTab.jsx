import React, { useState } from "react";
import { ACCENT, glass, gb, muted, soft, white } from "../theme";
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
      <div
        style={{
          textAlign: "center",
          padding: "18px 0 22px",
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: muted,
            letterSpacing: "0.16em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          DISCOGRAPHY
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "24px 14px",
          padding: "0 4px",
        }}
      >
        {displayAlbums.map((album, i) => (
          <div
            key={`${album.id}-${i}`}
            onClick={() => {
              setIndex(i);
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
                boxShadow:
                  "0 8px 22px rgba(0,0,0,0.28)",
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
        ))}
      </div>
    </div>
  );
}
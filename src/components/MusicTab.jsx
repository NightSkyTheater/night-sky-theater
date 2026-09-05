import React, { useState } from "react";
import { ACCENT, LIME, glass, gb, muted, soft, white } from "../theme";
import { ALBUMS } from "../data";

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
     앨범 상세 화면 (redesigned)
  ========================= */
  if (selected) {
    const tr = alb.tracks[trackIdx];
    const progress = ((trackIdx + 1) / alb.tracks.length) * 100;

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
        <div style={{ display: "flex", flexDirection: "column", paddingBottom: 80 }}>

          {/* ---- Hero: blurred cover backdrop ---- */}
          <div
            style={{
              position: "relative",
              borderRadius: "0 0 26px 26px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${alb.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(30px) saturate(1.35) brightness(0.5)",
                transform: "scale(1.35)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(8,5,20,0.1) 0%, rgba(8,5,20,0.55) 55%, rgba(8,5,20,0.95) 100%)",
              }}
            />

            <button
              onClick={() => setSelected(false)}
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(0,0,0,0.28)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 20,
                padding: "6px 14px 6px 10px",
                margin: "14px 0 0 14px",
                cursor: "pointer",
                color: white,
                fontSize: 12.5,
                fontFamily: "inherit",
                width: "fit-content",
              }}
            >
              ← 목록으로
            </button>

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px 26px 28px",
              }}
            >
              <CDDisc cover={alb.cover} color={alb.color} size={132} spinning glow />

              <p
                style={{
                  fontSize: 11.5,
                  color: LIME,
                  fontWeight: 700,
                  margin: "18px 0 5px",
                  opacity: 0.9,
                }}
              >
                {alb.year}
              </p>

              <p
                style={{
                  fontSize: 19,
                  fontWeight: 900,
                  color: white,
                  margin: "0 0 9px",
                  lineHeight: 1.32,
                  textAlign: "center",
                  letterSpacing: "-0.3px",
                }}
              >
                {alb.title}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                  margin: 0,
                  textAlign: "center",
                  maxWidth: 280,
                  fontStyle: "italic",
                }}
              >
                "{alb.desc}"
              </p>
            </div>
          </div>

          {/* ---- Now playing ---- */}
          <div style={{ padding: "24px 20px 4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 12, color: muted }}>
                {trackIdx + 1}번째 곡 · 총 {alb.tracks.length}곡
              </span>
              <span style={{ fontSize: 12, color: ACCENT, fontWeight: 700 }}>
                {tr.n}
              </span>
            </div>

            <div
              style={{
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: LIME,
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <p
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: white,
                margin: "0 0 12px",
                lineHeight: 1.3,
                letterSpacing: "-0.5px",
              }}
            >
              {tr.title}
            </p>

            {tr.mood && (
              <p
                style={{
                  fontSize: 14,
                  color: soft,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  margin: "0 0 24px",
                }}
              >
                "{tr.mood}"
              </p>
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
              <button
                onClick={() => setTrackIdx((i) => Math.max(0, i - 1))}
                disabled={trackIdx === 0}
                style={{
                  flex: 1,
                  padding: "13px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${gb}`,
                  borderRadius: 14,
                  cursor: trackIdx === 0 ? "not-allowed" : "pointer",
                  color: trackIdx === 0 ? muted : soft,
                  fontSize: 13,
                  fontFamily: "inherit",
                  opacity: trackIdx === 0 ? 0.4 : 1,
                  transition: "all 0.2s",
                }}
              >
                이전 곡
              </button>

              <button
                onClick={() =>
                  setTrackIdx((i) => Math.min(alb.tracks.length - 1, i + 1))
                }
                disabled={trackIdx === alb.tracks.length - 1}
                style={{
                  flex: 1,
                  padding: "13px",
                  background:
                    trackIdx === alb.tracks.length - 1
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(184,255,0,0.1)",
                  border: `1px solid ${
                    trackIdx === alb.tracks.length - 1 ? gb : "rgba(184,255,0,0.3)"
                  }`,
                  borderRadius: 14,
                  cursor:
                    trackIdx === alb.tracks.length - 1 ? "not-allowed" : "pointer",
                  color: trackIdx === alb.tracks.length - 1 ? muted : LIME,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "inherit",
                  opacity: trackIdx === alb.tracks.length - 1 ? 0.4 : 1,
                  transition: "all 0.2s",
                }}
              >
                다음 곡
              </button>
            </div>
          </div>

          {/* ---- Track list: flat rows, no card wrapper ---- */}
          <div style={{ padding: "0 20px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: white, margin: "0 0 2px" }}>
              수록곡
            </p>

            <div>
              {alb.tracks.map((t, j) => (
                <div
                  key={`${t.title}-${j}`}
                  onClick={() => setTrackIdx(j)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "13px 4px",
                    cursor: "pointer",
                    borderBottom: j < alb.tracks.length - 1 ? `1px solid ${gb}` : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: j === trackIdx ? LIME : muted,
                      fontWeight: j === trackIdx ? 800 : 400,
                      width: 18,
                      flexShrink: 0,
                    }}
                  >
                    {t.n}
                  </span>

                  <p
                    style={{
                      flex: 1,
                      minWidth: 0,
                      margin: 0,
                      fontSize: 13.5,
                      fontWeight: j === trackIdx ? 700 : 400,
                      color: j === trackIdx ? white : soft,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >
                    {t.title}
                  </p>

                  {j === trackIdx && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: LIME,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     앨범 목록 화면 (unchanged)
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "22px 14px",
          padding: "0 4px",
        }}
      >
        {pagedAlbums.map((album, pageIndex) => {
          const realIndex = albumPage * ALBUMS_PER_PAGE + pageIndex;

          return (
            <div
              key={`${album.id}-${realIndex}`}
              onClick={() => {
                setIndex(realIndex);
                setTrackIdx(0);
                setSelected(true);
              }}
              style={{ cursor: "pointer", minWidth: 0 }}
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

              <div style={{ padding: "9px 2px 0", textAlign: "left" }}>
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

                <p style={{ fontSize: 9.5, color: muted, margin: 0, fontWeight: 600 }}>
                  {album.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>

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
            onClick={() => setAlbumPage((p) => Math.max(0, p - 1))}
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

          <span style={{ fontSize: 11, color: muted, minWidth: 44, textAlign: "center" }}>
            {albumPage + 1} / {totalPages}
          </span>

          <button
            onClick={() => setAlbumPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={albumPage === totalPages - 1}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: albumPage === totalPages - 1 ? muted : white,
              cursor: albumPage === totalPages - 1 ? "default" : "pointer",
              opacity: albumPage === totalPages - 1 ? 0.35 : 1,
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
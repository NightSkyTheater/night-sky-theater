import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ACCENT, FADE, HAIRLINE, MONO, PAPER, SITE_MAX } from "../theme";
import { ALBUMS } from "../data";
import { LedgerRow, SectionHead } from "../components/Common";

export default function Music() {
  const displayAlbums = [...ALBUMS].reverse();
  const [selected, setSelected] = useState(null); // album object or null
  const [trackIdx, setTrackIdx] = useState(0);

  const codeFor = (album) => `NST-${String(album.id).padStart(3, "0")}`;

  if (selected) {
    const tr = selected.tracks[trackIdx];
    return (
      <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "140px 20px 90px" }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: FADE,
            fontSize: 13,
            fontFamily: "inherit",
            marginBottom: 32,
            padding: 0,
          }}
        >
          <ArrowLeft size={16} /> 디스코그래피로
        </button>

        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 260px" }}>
            <img
              src={selected.cover}
              alt={selected.title}
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 16, border: `1px solid ${HAIRLINE}` }}
            />
          </div>

          <div style={{ flex: "1 1 320px", minWidth: 280 }}>
            <p style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, margin: "0 0 10px" }}>
              {codeFor(selected)} · {selected.year}
            </p>
            <h1 style={{ fontSize: "clamp(24px,3.4vw,34px)", fontWeight: 800, color: PAPER, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              {selected.title}
            </h1>
            <p style={{ fontSize: 14, color: FADE, lineHeight: 1.8, margin: "0 0 28px", fontStyle: "italic" }}>“{selected.desc}”</p>

            <p style={{ fontSize: 12, fontWeight: 700, color: PAPER, margin: "0 0 6px", fontFamily: MONO }}>
              TRACKLIST — {selected.tracks.length}
            </p>
            <div>
              {selected.tracks.map((t, j) => (
                <div
                  key={t.title + j}
                  onClick={() => setTrackIdx(j)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "13px 4px",
                    cursor: "pointer",
                    borderBottom: j < selected.tracks.length - 1 ? `1px solid ${HAIRLINE}` : "none",
                    background: j === trackIdx ? "rgba(184,255,0,0.05)" : "transparent",
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, color: j === trackIdx ? ACCENT : FADE, width: 18, flexShrink: 0, paddingTop: 2 }}>
                    {String(t.n).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: j === trackIdx ? 700 : 500, color: j === trackIdx ? PAPER : "rgba(244,242,250,0.85)" }}>
                      {t.title}
                    </p>
                    {j === trackIdx && t.mood && (
                      <p style={{ margin: "6px 0 0", fontSize: 12, color: FADE, lineHeight: 1.7, whiteSpace: "pre-line" }}>{t.mood}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "140px 20px 90px" }}>
      <SectionHead index="DISCOGRAPHY" title="음악" desc={`총 ${ALBUMS.length}장의 앨범, ${ALBUMS.reduce((s, a) => s + a.tracks.length, 0)}개의 트랙.`} />
      <div>
        {displayAlbums.map((album) => (
          <LedgerRow
            key={album.id}
            code={codeFor(album)}
            title={album.title}
            tag={`${album.tracks.length} TR`}
            meta={album.year}
            onClick={() => {
              setSelected(album);
              setTrackIdx(0);
            }}
          />
        ))}
      </div>
    </div>
  );
}

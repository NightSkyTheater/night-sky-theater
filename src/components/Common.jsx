import React, { useRef } from "react";
import { ACCENT, FADE, HAIRLINE, MONO, PAPER } from "../theme";

// 고정 배경 별빛 — 사이트 전역에서 한 번만 렌더
export function Stars({ density = 140 }) {
  const s = useRef(
    Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.4 + 0.2,
      o: Math.random() * 0.4 + 0.06,
      d: Math.random() * 5 + 2,
    }))
  ).current;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {s.map((st) => (
        <div
          key={st.id}
          style={{
            position: "absolute",
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.r * 2,
            height: st.r * 2,
            borderRadius: "50%",
            background: "#fff",
            opacity: st.o,
            animation: `tw ${st.d}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function formatCompact(num) {
  if (num === null || num === undefined) return "···";
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(num);
}

// 섹션 상단에 붙는 카탈로그 넘버 스타일 헤더.
// (숫자 매김은 실제로 발매 순번 등 "시퀀스"인 콘텐츠에만 사용)
export function SectionHead({ index, title, desc, align = "left" }) {
  return (
    <div style={{ textAlign: align, marginBottom: 28 }}>
      {index && (
        <p style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, margin: "0 0 10px", letterSpacing: "0.02em" }}>
          {index}
        </p>
      )}
      <h2
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 800,
          color: PAPER,
          letterSpacing: "-0.02em",
          margin: "0 0 10px",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h2>
      {desc && (
        <p style={{ fontSize: 14, color: FADE, lineHeight: 1.7, margin: 0, maxWidth: 560, marginInline: align === "center" ? "auto" : 0 }}>
          {desc}
        </p>
      )}
    </div>
  );
}

// 레이블 원장(카탈로그) 스타일의 리스트 로우
export function LedgerRow({ code, meta, title, tag, tagColor, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 4px",
        borderBottom: `1px solid ${HAIRLINE}`,
        cursor: onClick ? "pointer" : "default",
        transition: "background .15s ease",
        background: active ? "rgba(184,255,0,0.05)" : "transparent",
      }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = active ? "rgba(184,255,0,0.05)" : "transparent")}
    >
      <span style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, width: 78, flexShrink: 0 }}>{code}</span>
      <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 600, color: PAPER, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {title}
      </span>
      {tag && (
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            color: tagColor || ACCENT,
            border: `1px solid ${(tagColor || ACCENT)}44`,
            borderRadius: 20,
            padding: "3px 9px",
            flexShrink: 0,
          }}
        >
          {tag}
        </span>
      )}
      <span style={{ fontFamily: MONO, fontSize: 11.5, color: FADE, width: 64, textAlign: "right", flexShrink: 0 }}>{meta}</span>
    </div>
  );
}

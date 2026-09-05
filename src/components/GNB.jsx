import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ACCENT, HAIRLINE, INK, LABEL_INFO, NAV_ITEMS, PAPER, SITE_MAX } from "../theme";

export default function GNB({ tab, setTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setTab(id);
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        background: scrolled || open ? "rgba(5,4,12,0.85)" : "transparent",
        backdropFilter: scrolled || open ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled || open ? HAIRLINE : "transparent"}`,
        transition: "background .25s ease, border-color .25s ease",
      }}
    >
      <div
        style={{
          maxWidth: SITE_MAX,
          margin: "0 auto",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <button
          onClick={() => go("HOME")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0 }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              fontSize: 13,
              color: INK,
              flexShrink: 0,
            }}
          >
            NS
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: PAPER, letterSpacing: "-0.01em" }}>
            {LABEL_INFO.name}
          </span>
        </button>

        {/* 데스크톱 내비 */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="gnb-desktop">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px 16px",
                fontFamily: "inherit",
                fontSize: 13.5,
                fontWeight: 600,
                color: tab === item.id ? ACCENT : "rgba(244,242,250,0.65)",
                transition: "color .15s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 모바일 햄버거 */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="gnb-burger"
          style={{ background: "none", border: "none", cursor: "pointer", color: PAPER, display: "none", padding: 6 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${HAIRLINE}`, padding: "6px 20px 18px" }} className="gnb-mobile-panel">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "14px 4px",
                fontFamily: "inherit",
                fontSize: 15,
                fontWeight: 700,
                color: tab === item.id ? ACCENT : PAPER,
                borderBottom: `1px solid ${HAIRLINE}`,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

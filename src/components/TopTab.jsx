import React, { useState, useEffect } from "react";
import { ACCENT, MOBILE_SHELL_WIDTH, TOP_NAV_HEIGHT, NAV_ITEMS } from "../theme";

export default function TopTab({ tab, setTab }) {
  const tabs = NAV_ITEMS;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: MOBILE_SHELL_WIDTH,
        height: TOP_NAV_HEIGHT,
        zIndex: 1000,
        background: scrolled ? "rgba(3,1,14,0.72)" : "#070510",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(184,255,0,.08)",
        transition: "background .22s ease, backdrop-filter .22s ease, border-color .22s ease",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          padding: "0 18px",
        }}
      >
        <button
  onClick={() => setTab(NAV_ITEMS[0].id)}
  style={{
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  }}
>
  <span
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.08)",
    }}
  >
    <img
      src="/favicon.svg"
      alt="밤하늘극장"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  </span>
</button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          {tabs.map((item) => (
            <button
  key={item.id}
  onClick={() => setTab(item.id)}
  style={{
    width: 42,
    height: 42,
    borderRadius: 999,
    background: "transparent",
    border: "none",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color:
  tab === item.id
    ? ACCENT
    : "#666666",

    transition: "all .2s ease",
  }}
>
  {item.svg}
</button>
          ))}
        </div>
      </div>
    </div>
  );
}

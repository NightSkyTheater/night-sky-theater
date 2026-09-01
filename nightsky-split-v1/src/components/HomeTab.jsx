import React, { useState, useEffect } from "react";
import { ACCENT, muted, soft, white } from "../theme";
import { ALBUMS, ALL_TRACKS, SUB_DATA, PLATFORMS, RELEASE_SCHEDULE, NEWS_ITEMS } from "../data";
import { SecHead, Tag, HomeCard, HomeHr, formatCompact } from "./Common";

function HeroBanner({ currentSubs, albumCount, trackCount }) {
  return (
    <div
      style={{
        position: "relative",
        height: 520,
        overflow: "hidden",
      }}
    >
      <img
        src="https://down.mixtape.so/NAS/img/b/d/d/c/bddc807264d156fa82fd1a98208a4856.png"
          alt=""
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    transform: "scale(1.03)",
  }}
/>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
linear-gradient(
to bottom,
rgba(0,0,0,0) 0%,
rgba(3,1,14,0.08) 35%,
rgba(3,1,14,0.45) 55%,
rgba(3,1,14,0.82) 72%,
#0e0a2e 100%
)
`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 0,
        }}
      >
<div
  style={{
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    padding: "30px 22px 24px"
  }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 900, color: white, letterSpacing: "-0.03em", margin: "0 0 14px" }}>
        밤하늘극장
      </h2>
      <p style={{ fontSize: 12.5, color: soft, lineHeight: 1.8, margin: 0, maxWidth: 380, marginInline: "auto" }}>
        밤하늘극장은 사랑과 시간, 그리고 기억에 깃든 감정을<br /> 섬세하게 노래하는 <strong>버츄얼 인디 밴드</strong>입니다.
      </p>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 34,
    marginTop: 24,
  }}
>
  {[
    { value: formatCompact(currentSubs), label: "Subscribers" },
    { value: albumCount, label: "Albums" },
    { value: trackCount, label: "Tracks" },
  ].map((item) => (
    <div
      key={item.label}
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: ACCENT,
          lineHeight: 1,
        }}
      >
        {item.value}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 10,
          color: muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {item.label}
      </div>
    </div>
  ))}
</div>
    </div>
      </div>
    </div>
  );
}

export default function HomeTab() {
  const [liveSubs, setLiveSubs] = useState(null);
  const [liveViews, setLiveViews] = useState(null);
  const [newsExpanded, setNewsExpanded] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        const data = await res.json();

        if (data.items?.[0]) {
          setLiveSubs(Number(data.items[0].statistics.subscriberCount));
          setLiveViews(Number(data.items[0].statistics.viewCount));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();

    const interval = setInterval(fetchStats, 600000); // 10분마다 갱신

    return () => clearInterval(interval);
  }, []);

  const albumCount = ALBUMS.length;
  const trackCount = ALL_TRACKS.length;
  const currentSubs = liveSubs ?? SUB_DATA[SUB_DATA.length - 1].subs;

  const visibleNews = newsExpanded ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 4);

  const ReleaseSchedule = (
    <HomeCard>
      <div style={{ padding: "18px 18px 12px" }}><SecHead title="발매일정" /></div>
      <HomeHr />
      {RELEASE_SCHEDULE.map((n, i, arr) => (
        <div key={n.title + n.date}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "12px 18px" }}>
            <div style={{ width: 56, flexShrink: 0 }}><Tag c={n.tagC}>{n.tag}</Tag></div>
            <span style={{ width: 44, flexShrink: 0, fontSize: 11, color: "rgba(220,210,255,0.75)", fontWeight: 600 }}>{n.date}</span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{n.title}</p>
          </div>
          {i < arr.length - 1 && <HomeHr />}
        </div>
      ))}
    </HomeCard>
  );

  const News = (
    <HomeCard>
      <div style={{ padding: "18px 18px 12px" }}><SecHead title="공지사항" /></div>
      <HomeHr />
      {visibleNews.map((n, i, arr) => (
        <div key={n.title + n.date}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px" }}>
            <span style={{ width: 44, flexShrink: 0, fontSize: 11, color: "rgba(220,210,255,0.75)", fontWeight: 600 }}>{n.date}</span>
            <p
  style={{
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    color: white,
    flex: 1,
    lineHeight: "20px",

    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  }}
>
  {n.title}
</p>
          </div>
          {i < arr.length - 1 && <HomeHr />}
        </div>
      ))}
      {NEWS_ITEMS.length > 4 && (
        <>
          <HomeHr />
          <button
            onClick={() => setNewsExpanded((v) => !v)}
            style={{
              width: "100%", background: "none", border: "none", cursor: "pointer",
              padding: "10px 0", fontFamily: "inherit", fontSize: 11, color: muted, fontWeight: 600
            }}
          >
            {newsExpanded ? "접기 ▲" : "더보기 ▼"}
          </button>
        </>
      )}
    </HomeCard>
  );

  const OfficialLinks = (
   <HomeCard>
      <div style={{ padding: "18px 18px 12px" }}><SecHead title="Links" /></div>
      <HomeHr />
  <div
    style={{
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      padding: "0 14px 18px"
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
          justifyContent: "space-between",
          padding: "12px 18px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          textDecoration: "none",
          transition: "all .2s ease",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(4px)";
          e.currentTarget.style.borderColor = p.color + "66";
          e.currentTarget.style.background = p.color + "10";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            background: p.color
          }}
        />

        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 800,
            color: white
          }}
        >
          {p.name}
        </p>

        <span
          style={{
            color: "rgba(255,255,255,.4)",
            fontSize: 14,
            fontWeight: 700
          }}
        >
          →
        </span>
      </a>
    ))}
  </div>
</HomeCard>
  );

  const Footer = (
    <div style={{ textAlign: "center", padding: "40px 0 4px" }}>
      <a href="mailto:hps_in@naver.com" style={{ fontSize: 12, color: soft, textDecoration: "none" }}>
        ✉ hps_in@naver.com
      </a>
      <p style={{ fontSize: 10, color: muted, margin: "6px 0 0" }}>
        © 2026 Night Sky Theater. All rights reserved.
      </p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
      <HeroBanner
  currentSubs={currentSubs}
  albumCount={albumCount}
  trackCount={trackCount}
/>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "12px 14px 0" }}>
        {ReleaseSchedule}
        {News}
        {OfficialLinks}
        {Footer}
      </div>
    </div>
  );
}

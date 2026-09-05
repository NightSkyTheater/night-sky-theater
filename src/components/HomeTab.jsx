import React, { useState, useEffect } from "react";
import { ACCENT, LIME, muted, soft, white } from "../theme";
import { ALBUMS, ALL_TRACKS, SUB_DATA, PLATFORMS, RELEASE_SCHEDULE, NEWS_ITEMS } from "../data";
import { formatCompact } from "./Common";

const RULE = "1px solid rgba(255,255,255,0.08)";

function HeroBanner() {
  return (
    <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
      <img
        src="https://down.mixtape.so/NAS/img/b/d/d/c/bddc807264d156fa82fd1a98208a4856.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(3,1,14,0) 0%, rgba(3,1,14,0.15) 45%, rgba(3,1,14,0.94) 100%)",
        }}
      />

      <div style={{ position: "absolute", left: 20, right: 20, bottom: 22 }}>
        <p style={{ fontSize: 11, color: LIME, margin: "0 0 8px", letterSpacing: "0.03em" }}>
          Night Sky Theater
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: white,
            letterSpacing: "-0.03em",
            margin: "0 0 8px",
          }}
        >
          밤하늘극장
        </h1>
        <p style={{ fontSize: 12.5, color: soft, lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
          사랑과 시간, 그리고 기억에 깃든 감정을 섬세하게 노래하는 버츄얼 인디 밴드
        </p>
      </div>
    </div>
  );
}

function StatsStrip({ currentSubs, albumCount, trackCount }) {
  const items = [
    { value: formatCompact(currentSubs), label: "구독자" },
    { value: albumCount, label: "앨범" },
    { value: trackCount, label: "트랙" },
  ];

  return (
    <div style={{ display: "flex", borderTop: RULE, borderBottom: RULE }}>
      {items.map((item, i) => (
        <div
          key={item.label}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "18px 8px",
            borderLeft: i > 0 ? RULE : "none",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: white }}>{item.value}</div>
          <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ index, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "24px 20px 12px" }}>
      <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700 }}>{index}</span>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: white, margin: 0 }}>{title}</h3>
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

  const visibleNews = newsExpanded ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 5);

  const ReleaseSchedule = (
    <div>
      <SectionHeader index="01" title="발매일정" />
      <div>
        {RELEASE_SCHEDULE.map((n, i) => (
          <div
            key={n.title + n.date}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "13px 20px",
              borderTop: i === 0 ? RULE : "none",
              borderBottom: RULE,
            }}
          >
            <span style={{ fontSize: 11, color: muted, width: 62, flexShrink: 0 }}>{n.date}</span>
            <span
              style={{
                fontSize: 10.5,
                color: n.tagC || ACCENT,
                border: `1px solid ${(n.tagC || ACCENT)}55`,
                borderRadius: 4,
                padding: "2px 6px",
                flexShrink: 0,
              }}
            >
              {n.tag}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 500,
                color: white,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {n.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const News = (
    <div>
      <SectionHeader index="02" title="공지사항" />
      <div>
        {visibleNews.map((n, i) => (
          <div
            key={n.title + n.date}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              padding: "13px 20px",
              borderTop: i === 0 ? RULE : "none",
              borderBottom: RULE,
            }}
          >
            <span style={{ fontSize: 11, color: muted, width: 62, flexShrink: 0, paddingTop: 2 }}>
              {n.date}
            </span>
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
              }}
            >
              {n.title}
            </p>
          </div>
        ))}
      </div>
      {NEWS_ITEMS.length > 5 && (
        <div style={{ padding: "12px 20px 4px" }}>
          <button
            onClick={() => setNewsExpanded((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
              fontSize: 11.5,
              color: soft,
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            {newsExpanded ? "접기" : "더보기"}
          </button>
        </div>
      )}
    </div>
  );

  const OfficialLinks = (
    <div>
      <SectionHeader index="03" title="링크" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", padding: "0 20px 24px" }}>
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={"https://" + p.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 13,
              fontWeight: 700,
              color: white,
              textDecoration: "none",
              transition: "color .15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = p.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = white;
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            {p.name}
          </a>
        ))}
      </div>
    </div>
  );

  const Footer = (
    <div
      style={{
        borderTop: RULE,
        padding: "18px 20px 6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <p style={{ fontSize: 10.5, color: muted, margin: 0 }}>
        © 2026 Night Sky Theater. All rights reserved.
      </p>
      <a href="mailto:hps_in@naver.com" style={{ fontSize: 11, color: soft, textDecoration: "none" }}>
        hps_in@naver.com
      </a>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
      <HeroBanner />
      <StatsStrip currentSubs={currentSubs} albumCount={albumCount} trackCount={trackCount} />
      {ReleaseSchedule}
      {News}
      {OfficialLinks}
      {Footer}
    </div>
  );
}
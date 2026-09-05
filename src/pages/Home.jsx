import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ACCENT, FADE, HAIRLINE, LABEL_INFO, MONO, PAPER, SITE_MAX, VIOLET } from "../theme";
import { ALBUMS, ALL_TRACKS, NEWS_ITEMS, RELEASE_SCHEDULE, SUB_DATA } from "../data";
import { LedgerRow, SectionHead, formatCompact } from "../components/Common";

function Stat({ value, label }) {
  return (
    <div>
      <p style={{ fontFamily: MONO, fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: ACCENT, margin: 0 }}>{value}</p>
      <p style={{ fontSize: 11.5, color: FADE, margin: "6px 0 0" }}>{label}</p>
    </div>
  );
}

export default function Home({ setTab }) {
  const [liveSubs, setLiveSubs] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const data = await res.json();
        if (data.items?.[0]) setLiveSubs(Number(data.items[0].statistics.subscriberCount));
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
    const interval = setInterval(fetchStats, 600000);
    return () => clearInterval(interval);
  }, []);

  const currentSubs = liveSubs ?? SUB_DATA[SUB_DATA.length - 1].subs;
  const latest = ALBUMS[ALBUMS.length - 1];
  const latestCode = `NST-${String(ALBUMS.length).padStart(3, "0")}`;
  const feed = [
    ...RELEASE_SCHEDULE.map((n) => ({ date: n.date, title: n.title, tag: n.tag, tagColor: n.tagC })),
    ...NEWS_ITEMS.map((n) => ({ date: n.date, title: n.title, tag: "NEWS", tagColor: VIOLET })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────── */}
      <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "148px 20px 80px" }}>
        <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px", minWidth: 300 }}>
            <p style={{ fontFamily: MONO, fontSize: 12.5, color: ACCENT, margin: "0 0 18px", letterSpacing: "0.02em" }}>
              VIRTUAL INDIE LABEL · SEOUL
            </p>
            <h1
              style={{
                fontSize: "clamp(34px, 5.2vw, 58px)",
                fontWeight: 800,
                color: PAPER,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: "0 0 22px",
              }}
            >
              사랑과 시간, 그리고
              <br />
              기억에 깃든 감정을
              <br />
              기록합니다.
            </h1>
            <p style={{ fontSize: 15, color: FADE, lineHeight: 1.8, margin: "0 0 32px", maxWidth: 440 }}>
              {LABEL_INFO.name}은 버추얼 아티스트 유우레이와 함께 사랑, 청춘, 삶의 감정을
              섬세한 시선으로 노래하는 인디 레이블입니다.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setTab("MUSIC")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  borderRadius: 12,
                  background: ACCENT,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: "#05040C",
                }}
              >
                디스코그래피 보기 <ArrowRight size={15} />
              </button>
              <button
                onClick={() => setTab("LABEL")}
                style={{
                  padding: "13px 22px",
                  borderRadius: 12,
                  background: "transparent",
                  border: `1px solid ${HAIRLINE}`,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: PAPER,
                }}
              >
                레이블 소개
              </button>
            </div>
          </div>

          <div
            onClick={() => setTab("MUSIC")}
            style={{ flex: "1 1 300px", minWidth: 260, maxWidth: 380, marginInline: "auto", cursor: "pointer" }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: 20,
                overflow: "hidden",
                border: `1px solid ${HAIRLINE}`,
                boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
              }}
            >
              <img src={latest.cover} alt={latest.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 55%, rgba(5,4,12,0.9) 100%)",
                }}
              />
              <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: ACCENT, margin: "0 0 6px" }}>{latestCode} · LATEST</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: PAPER, margin: 0, lineHeight: 1.35 }}>{latest.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: `1px solid ${HAIRLINE}`,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
            gap: 24,
          }}
        >
          <Stat value={formatCompact(currentSubs)} label="유튜브 구독자" />
          <Stat value={ALBUMS.length} label="발매 앨범" />
          <Stat value={ALL_TRACKS.length} label="수록 트랙" />
          <Stat value="63.9%" label="해외 청취 비율" />
        </div>
      </div>

      {/* ── NEWS / SCHEDULE LEDGER ──────────────────────── */}
      <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "20px 20px 80px" }}>
        <SectionHead index="RECENT" title="발매 일정 & 소식" desc="가장 최근의 발매 일정과 소식을 모았습니다." />
        <div>
          {feed.map((n, i) => (
            <LedgerRow key={n.title + i} code={n.date} title={n.title} tag={n.tag} tagColor={n.tagColor} meta="" />
          ))}
        </div>
      </div>
    </div>
  );
}

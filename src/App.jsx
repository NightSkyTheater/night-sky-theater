import { useState, useEffect, useRef } from "react";

const ADMIN_PW = "bam2026!";

const TICKER_MESSAGES = [
  "🌌 유우레이 · 임보성 — 밤하늘극장에 오신 걸 환영합니다",
  "🎵 새 싱글 2026.05.28 발매! 모든 플랫폼에서 지금 감상하세요",
  "💿 정규앨범 2026.06.09 발매 예정 — 7곡의 새 이야기",
  "⭐ 구독자 400명 돌파! 함께해주셔서 감사합니다",
];

const ALBUMS = [
  { title: "오늘이 가장 어렸던 날이야", year: "2024", color: "#3a2a5a", tracks: ["겨울의 대삼각형","우리들의 발라드","오늘이 가장 어렸던 날이야","20에 50","나 지금도 충분히 버티고 있는데","조명이 켜지고","사탄탱고","별이 비처럼 내리던 날"] },
  { title: "운명애", year: "2025", color: "#1a3a4a", tracks: ["운명애","운외창천 (雲外蒼天)","테세우스의 배","사랑엔 자막이 필요해","지구는 잘 돌아가네, 나 없이도","내 소중한 마음은 비밀이야","지금 이 순간"] },
  { title: "자발적으로 표류하는 우주비행사", year: "2025", color: "#2a3a1a", tracks: ["자발적으로 표류하는 우주비행사","출근하기 싫은데 알람은 또 맞춰놨어","사막에서 수영하기","별자리를 잇다"] },
  { title: "이 봄은 다른 이름이 될까", year: "2025", color: "#3a1a2a", tracks: ["이 봄은 다른 이름이 될까","갑자기 오래된 노래가 떠오른 이유","말하지 않은 것들의 무게","꿈은 없고요, 돈은 많고 싶네요","방해 금지 모드"] },
  { title: "사랑은 말이야", year: "2025", color: "#3a2a1a", tracks: ["사랑은 말이야","F로 살기엔 세상은 너무 차가워","고백 연습"] },
  { title: "사막 위의 잠수함", year: "2025", color: "#1a2a3a", tracks: ["사막 위의 잠수함","붐비는 무인도","잠수함 일지"] },
  { title: "죽어가는 모든 것들을 사랑해야지", year: "2026", color: "#2a1a3a", tracks: ["죽어가는 모든 것들을 사랑해야지","꽃이 피든 말든","푸른 하늘 은하수","마지막 여름"] },
  { title: "나는 오늘 또 어떤 핑계를 대었는가", year: "2026", color: "#1a3a2a", tracks: ["나는 오늘 또 어떤 핑계를 대었는가","가짜의 삶","인생은 산과 계곡","핑계의 목록"] },
  { title: "不完全な踊り (불완전한 춤)", year: "2025", color: "#3a3a1a", tracks: ["不完全な踊り","闇が怖い幽霊 (어둠이 무서운 유령)","星影の叫び (별빛의 외침)"] },
  { title: "ただ (그냥)", year: "2026", color: "#1a1a3a", tracks: ["ただ (그냥)","夜の終わり (밤의 끝)"] },
  { title: "그대였죠", year: "2023", color: "#2a2a3a", tracks: ["그대였죠","고장난시계","그 계절에"] },
];

const ALL_TRACKS = ALBUMS.flatMap(a => a.tracks.map(t => ({ track: t, album: a.title })));

const CHART = [
  { rank: 1, title: "우리들의 발라드", album: "오늘이 가장 어렸던 날이야", amount: "50,011", badge: null },
  { rank: 2, title: "말하지 않은 것들의 무게", album: "이 봄은 다른 이름이 될까", amount: "1,910", badge: "▲" },
  { rank: 3, title: "꽃이 피든 말든", album: "죽어가는 모든 것들을 사랑해야지", amount: "1,768", badge: "NEW" },
  { rank: 4, title: "내 소중한 마음은 비밀이야", album: "운명애", amount: "1,709", badge: "▼" },
  { rank: 5, title: "자발적으로 표류하는 우주비행사", album: "자발적으로 표류하는 우주비행사", amount: "1,433", badge: "▲" },
];

const PLATFORMS = [
  { name: "유튜브", icon: "🎬", url: "https://youtube.com/@밤하늘극장", color: "#ff4444" },
  { name: "멜론", icon: "🍈", url: "https://melon.com", color: "#00c73c" },
  { name: "지니", icon: "🎵", url: "https://genie.co.kr", color: "#0066ff" },
  { name: "바이브", icon: "💜", url: "https://vibe.naver.com", color: "#06d6a0" },
  { name: "플로", icon: "🌊", url: "https://flo.kr", color: "#4fc3f7" },
  { name: "벅스", icon: "🎶", url: "https://bugs.co.kr", color: "#ff6b35" },
  { name: "애플뮤직", icon: "🍎", url: "https://music.apple.com", color: "#fc3c44" },
  { name: "스포티파이", icon: "🟢", url: "https://spotify.com", color: "#1db954" },
];

const YOUTUBE_VIDEOS = [
  { title: "우리들의 발라드 (Official Lyrics Video)", date: "2024.11.20", views: "12.4만", thumb: "🎬" },
  { title: "겨울의 대삼각형 M/V", date: "2024.10.05", views: "8.1만", thumb: "🌌" },
  { title: "꽃이 피든 말든 (Lyric Video)", date: "2026.04.10", views: "3.2만", thumb: "🌸" },
  { title: "오늘의 밤하늘극장 Live Session", date: "2026.03.22", views: "2.8만", thumb: "🎙️" },
];

const CALENDAR_EVENTS = [
  { date: "05.28", label: "싱글 발매", type: "release" },
  { date: "06.09", label: "정규앨범 발매", type: "release" },
  { date: "06.15", label: "유튜브 라이브", type: "live" },
];

const OVERSEAS = [
  { flag: "🇺🇸", country: "미국", pct: 32 },
  { flag: "🇯🇵", country: "일본", pct: 18 },
  { flag: "🇹🇼", country: "대만", pct: 12 },
  { flag: "🇮🇳", country: "인도", pct: 10 },
  { flag: "🇦🇺", country: "호주", pct: 8 },
  { flag: "🇨🇦", country: "캐나다", pct: 6 },
  { flag: "🇹🇭", country: "태국", pct: 5 },
  { flag: "🌍", country: "기타", pct: 9 },
];

const INIT_GUESTBOOK = [
  { id: 1, name: "새벽여행자", pw: "1234", msg: "우리들의 발라드 듣고 밤새 울었어요. 고맙습니다.", time: "2026.05.25", likes: 14, reply: "늦은 새벽에 함께해줘서 저도 고마워요 🌙 — 밤하늘극장" },
  { id: 2, name: "별빛수집가", pw: "1234", msg: "자발적으로 표류하는 우주비행사 진짜 제 얘기 같아요…", time: "2026.05.24", likes: 9, reply: "" },
  { id: 3, name: "moonlight", pw: "1234", msg: "밤하늘극장 발견한 날이 올해 최고의 날이었어요", time: "2026.05.23", likes: 11, reply: "그 말이 저희한테도 최고의 댓글이에요 ✨ — 밤하늘극장" },
];

// 별 배경
function Stars() {
  const stars = useRef(Array.from({ length: 100 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2.2 + 0.4, opacity: Math.random() * 0.55 + 0.15,
    dur: Math.random() * 4 + 2,
  }))).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%", background: "white",
          opacity: s.opacity, animation: `twinkle ${s.dur}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// 상단 티커
function Ticker() {
  const text = TICKER_MESSAGES.join("　　✦　　");
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: "rgba(6,4,22,0.94)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(147,114,229,0.18)",
      height: 34, display: "flex", alignItems: "center", overflow: "hidden",
    }}>
      <div style={{ animation: "ticker 45s linear infinite", whiteSpace: "nowrap", fontSize: 11, color: "#9080c8", paddingLeft: "100%" }}>
        {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
      </div>
    </div>
  );
}

// 섹션 구분선 타이틀
function STitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 22, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 17 }}>{icon}</span>
          <h2 style={{ fontFamily: "'Noto Serif KR',serif", fontSize: 17, fontWeight: 700, color: "#e2d9f3", margin: 0, letterSpacing: "-0.3px" }}>{title}</h2>
        </div>
        {sub && <p style={{ fontSize: 11, color: "#484870", marginTop: 3, marginLeft: 25 }}>{sub}</p>}
      </div>
      <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(147,114,229,0.2), transparent)", marginLeft: 16, marginBottom: 4 }} />
    </div>
  );
}

// ── 히어로
function Hero() {
  return (
    <header style={{ textAlign: "center", padding: "44px 0 52px", position: "relative" }}>
      <div style={{ fontSize: 52, marginBottom: 14, display: "inline-block", animation: "floatY 5s ease-in-out infinite" }}>🌌</div>
      <h1 style={{
        fontFamily: "'Noto Serif KR',serif", fontSize: 38, fontWeight: 900, margin: "0 0 8px",
        background: "linear-gradient(130deg, #d4beff 0%, #90c4fa 45%, #a8e8ea 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1.5px",
      }}>밤하늘극장</h1>
      <p style={{ fontSize: 12, color: "#4a4a72", letterSpacing: "0.18em", margin: "0 0 20px" }}>유우레이 · 임보성 · 감성 인디</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: "rgba(147,114,229,0.1)", border: "1px solid rgba(147,114,229,0.2)", borderRadius: 30 }}>
          <span style={{ fontSize: 11, color: "#9370cc" }}>구독자</span>
          <span style={{ fontSize: 15, fontWeight: 900, color: "#c4a8f0" }}>400+</span>
          <span style={{ fontSize: 10, color: "#63dcb4" }}>▲ 성장중</span>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: "rgba(99,220,180,0.08)", border: "1px solid rgba(99,220,180,0.18)", borderRadius: 30 }}>
          <span style={{ fontSize: 11, color: "#63dcb4" }}>🎵 05.28 싱글 발매</span>
        </div>
      </div>
    </header>
  );
}

// ── 소개
function About() {
  return (
    <section style={{ marginBottom: 56 }}>
      <STitle icon="🌌" title="밤하늘극장 소개" />
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 24px" }}>
        <p style={{ fontSize: 13, color: "#a8a0c4", lineHeight: 2, margin: 0 }}>
          밤하늘극장은 유우레이와 임보성이 함께하는 감성 인디 프로젝트입니다.<br />
          어둠 속에서도 빛나는 별처럼, 위로가 필요한 새벽에 당신 곁에 머물고 싶습니다.<br />
          <span style={{ color: "#7055aa", fontSize: 11.5 }}>유통: (주)와이지플러스 · 국내외 모든 음원 플랫폼 정식 발매</span>
        </p>
      </div>
    </section>
  );
}

// ── 오늘의 추천곡 AI
function TodayTrack() {
  const [track, setTrack] = useState(null);
  const [aiMsg, setAiMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seed = new Date().toDateString();
    let hash = 0;
    for (let c of seed) hash = (hash * 31 + c.charCodeAt(0)) % ALL_TRACKS.length;
    const picked = ALL_TRACKS[Math.abs(hash)];
    setTrack(picked);
    const h = new Date().getHours();
    const timeCtx = h >= 22 || h < 5 ? "늦은 새벽" : h < 10 ? "이른 아침" : h < 15 ? "한낮" : h < 19 ? "오후" : "저녁";
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514", max_tokens: 1000,
        messages: [{ role: "user", content: `밤하늘극장의 곡 "${picked.track}" (앨범: ${picked.album})을 오늘 ${timeCtx}에 추천하는 감성적인 한두 문장 멘트를 써줘. 50자 이내로, 말투는 따뜻하고 시적으로. 이모지 1개만 끝에.` }]
      })
    }).then(r => r.json()).then(d => {
      setAiMsg((d.content?.map(c => c.text || "").join("") || "").trim());
      setLoading(false);
    }).catch(() => { setAiMsg(`${timeCtx}의 밤하늘에 어울리는 한 곡을 골랐어요 🌙`); setLoading(false); });
  }, []);

  if (!track) return null;
  return (
    <section style={{ marginBottom: 56 }}>
      <STitle icon="⭐" title="오늘의 추천곡" sub={`${new Date().toLocaleDateString("ko-KR")} · 매일 자정 변경`} />
      <div style={{ background: "linear-gradient(135deg, rgba(100,70,180,0.18) 0%, rgba(60,110,180,0.12) 100%)", border: "1px solid rgba(147,114,229,0.28)", borderRadius: 18, padding: "26px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 20, top: 14, fontSize: 56, opacity: 0.06, pointerEvents: "none" }}>🎵</div>
        <p style={{ fontSize: 10, color: "#7855b8", margin: "0 0 7px", letterSpacing: "0.12em", fontWeight: 700 }}>TODAY'S PICK</p>
        <p style={{ fontSize: 22, fontWeight: 800, color: "#e8dff8", margin: "0 0 4px", fontFamily: "'Noto Serif KR',serif" }}>{track.track}</p>
        <p style={{ fontSize: 12, color: "#636088", margin: "0 0 16px" }}>{track.album}</p>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14 }}>
          {loading
            ? <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9370cc", animation: "pulse 1.2s ease-in-out infinite" }} />
                <span style={{ fontSize: 12, color: "#555580" }}>AI가 오늘의 멘트를 쓰고 있어요...</span>
              </div>
            : <p style={{ fontSize: 13, color: "#c0b0e0", margin: 0, lineHeight: 1.75, fontStyle: "italic" }}>"{aiMsg}"</p>
          }
        </div>
      </div>
    </section>
  );
}

// ── 최신 소식 + 캘린더 (나란히)
function NewsAndCalendar() {
  const news = [
    { date: "2026.05.28", tag: "발매", title: "새 싱글 발매 🎉", desc: "모든 플랫폼에서 지금 바로 감상하세요." },
    { date: "2026.06.09", tag: "예정", title: "정규앨범 7곡 발매", desc: "6월 9일, 7곡의 새 이야기가 찾아옵니다." },
    { date: "2026.05.26", tag: "채널", title: "구독자 400명 돌파", desc: "함께해주신 모든 분들 덕분입니다." },
  ];
  const tagColor = t => t === "발매" ? "#63dcb4" : t === "예정" ? "#f0c060" : "#9370cc";
  const evColor = t => t === "release" ? "#63dcb4" : "#f0c060";

  return (
    <section style={{ marginBottom: 56 }}>
      <STitle icon="📡" title="최신 소식 & 일정" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* 뉴스 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {news.map((n, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 13, padding: "13px 15px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: tagColor(n.tag), border: `1px solid ${tagColor(n.tag)}44`, borderRadius: 5, padding: "2px 6px", display: "block", textAlign: "center" }}>{n.tag}</span>
                <p style={{ fontSize: 10, color: "#383858", margin: "4px 0 0", textAlign: "center" }}>{n.date.slice(5)}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd5f0", margin: "0 0 2px" }}>{n.title}</p>
                <p style={{ fontSize: 11, color: "#606080", margin: 0, lineHeight: 1.5 }}>{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* 캘린더 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontSize: 11, color: "#484870", margin: "0 0 4px" }}>📅 2026년 주요 일정</p>
          {CALENDAR_EVENTS.map((ev, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
              <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#7855b8", flexShrink: 0, width: 34 }}>{ev.date}</span>
              <span style={{ fontSize: 10, padding: "2px 7px", background: `${evColor(ev.type)}18`, color: evColor(ev.type), border: `1px solid ${evColor(ev.type)}44`, borderRadius: 6, flexShrink: 0 }}>{ev.type === "release" ? "발매" : "라이브"}</span>
              <span style={{ fontSize: 12, color: "#b0a8cc" }}>{ev.label}</span>
            </div>
          ))}
          {/* 해외 현황 미니 */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px", marginTop: 2 }}>
            <p style={{ fontSize: 11, color: "#484870", margin: "0 0 8px" }}>🌍 해외 청취 TOP5</p>
            {OVERSEAS.slice(0, 5).map((o, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 4 ? 6 : 0 }}>
                <span style={{ fontSize: 14 }}>{o.flag}</span>
                <span style={{ fontSize: 11, color: "#8888aa", width: 34, flexShrink: 0 }}>{o.country}</span>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 3, height: 4 }}>
                  <div style={{ width: `${o.pct}%`, height: "100%", background: "linear-gradient(90deg,#7855b8,#5599ee)", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, color: "#7855b8", fontFamily: "monospace", width: 26, textAlign: "right" }}>{o.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 인기 순위 + 플랫폼 (나란히)
function ChartAndPlatforms() {
  const badgeStyle = b => {
    if (b === "NEW") return { bg: "rgba(99,220,180,0.14)", color: "#63dcb4" };
    if (b === "▲") return { bg: "rgba(99,180,255,0.12)", color: "#63b4ff" };
    if (b === "▼") return { bg: "rgba(255,120,120,0.11)", color: "#ff7878" };
    return null;
  };
  return (
    <section style={{ marginBottom: 56 }}>
      <STitle icon="🎵" title="인기 순위 & 플랫폼" sub="※ 3월 판매 기준 정산 데이터" />
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12, alignItems: "start" }}>
        {/* 차트 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CHART.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 13px", borderRadius: 11, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(147,114,229,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
              <span style={{ width: 22, textAlign: "center", fontSize: t.rank === 1 ? 15 : 11, fontWeight: 900, color: t.rank === 1 ? "#f0d060" : t.rank <= 3 ? "#a090d0" : "#38385a", fontFamily: "monospace", flexShrink: 0 }}>
                {t.rank === 1 ? "👑" : t.rank}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#ddd5f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</p>
                <p style={{ margin: 0, fontSize: 10, color: "#484870", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.album}</p>
              </div>
              {t.badge && (() => { const bs = badgeStyle(t.badge); return <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 5, background: bs.bg, color: bs.color, fontWeight: 700, flexShrink: 0 }}>{t.badge}</span>; })()}
              <span style={{ fontSize: 10, color: "#484870", fontFamily: "monospace", flexShrink: 0 }}>{t.amount}원</span>
            </div>
          ))}
        </div>
        {/* 플랫폼 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {PLATFORMS.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 11, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}55`; e.currentTarget.style.background = `${p.color}12`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
              <span style={{ fontSize: 17 }}>{p.icon}</span>
              <span style={{ fontSize: 11, color: "#b0a8cc", fontWeight: 600 }}>{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 발매 음반
function Discography() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ marginBottom: 56 }}>
      <STitle icon="💿" title="발매 음반" sub={`총 ${ALBUMS.length}개 앨범`} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        {ALBUMS.map((a, i) => (
          <div key={i} style={{ borderRadius: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: open === i ? `${a.color}dd` : "rgba(255,255,255,0.04)", border: `1px solid ${open === i ? "rgba(147,114,229,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: open === i ? "12px 12px 0 0" : 12, borderBottom: open === i ? "none" : undefined, cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.2s" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#e0d8f8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 10, color: "#7070a0", marginTop: 2 }}>{a.year} · {a.tracks.length}곡</p>
              </div>
              <span style={{ color: "#7855b8", fontSize: 10, flexShrink: 0, marginLeft: 8 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ background: `${a.color}99`, border: "1px solid rgba(147,114,229,0.2)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "8px 14px 12px" }}>
                {a.tracks.map((t, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: j < a.tracks.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontSize: 9, color: "#484870", fontFamily: "monospace", width: 14, flexShrink: 0, paddingTop: 1 }}>{j + 1}</span>
                    <span style={{ fontSize: 11, color: "#b8b0d0" }}>{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 유튜브
function Youtube() {
  return (
    <section style={{ marginBottom: 56 }}>
      <STitle icon="🎬" title="유튜브 최신 영상" sub="밤하늘극장 공식 채널" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {YOUTUBE_VIDEOS.map((v, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,68,68,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
            <div style={{ width: 46, height: 34, background: "rgba(255,68,68,0.12)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{v.thumb}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#ddd5f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.title}</p>
              <p style={{ margin: 0, fontSize: 10, color: "#484870", marginTop: 2 }}>{v.date} · {v.views}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="https://youtube.com/@밤하늘극장" target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", fontSize: 12, color: "#7855b8", padding: "10px", marginTop: 8, textDecoration: "none", border: "1px solid rgba(147,114,229,0.18)", borderRadius: 10, transition: "border-color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(147,114,229,0.4)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(147,114,229,0.18)"}>
        채널 전체 보기 →
      </a>
    </section>
  );
}

// ── 방명록
function Guestbook() {
  const [entries, setEntries] = useState(INIT_GUESTBOOK);
  const [name, setName] = useState(""); const [pw, setPw] = useState(""); const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [adminTarget, setAdminTarget] = useState(null); const [adminPwInput, setAdminPwInput] = useState(""); const [adminReply, setAdminReply] = useState(""); const [adminErr, setAdminErr] = useState(false);
  const [editTarget, setEditTarget] = useState(null); const [editPw, setEditPw] = useState(""); const [editMsg, setEditMsg] = useState(""); const [editErr, setEditErr] = useState(false);
  const nextId = useRef(4);

  const IS = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, color: "#ddd5f0", padding: "9px 12px", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };

  const submit = () => {
    if (!name.trim() || !pw.trim() || !msg.trim()) return;
    setEntries(p => [{ id: nextId.current++, name: name.trim(), pw: pw.trim(), msg: msg.trim(), time: new Date().toLocaleDateString("ko-KR").replace(/\. /g,".").slice(0,-1), likes: 0, reply: "" }, ...p]);
    setName(""); setPw(""); setMsg(""); setDone(true); setTimeout(() => setDone(false), 2000);
  };
  const like = id => setEntries(p => p.map(e => e.id === id ? { ...e, likes: e.likes + 1 } : e));
  const submitAdmin = id => {
    if (adminPwInput !== ADMIN_PW) { setAdminErr(true); return; }
    setEntries(p => p.map(e => e.id === id ? { ...e, reply: adminReply } : e));
    setAdminTarget(null); setAdminPwInput(""); setAdminReply(""); setAdminErr(false);
  };
  const startEdit = e => { setEditTarget(e.id); setEditMsg(e.msg); setEditPw(""); setEditErr(false); };
  const submitEdit = entry => {
    if (editPw !== entry.pw) { setEditErr(true); return; }
    setEntries(p => p.map(e => e.id === entry.id ? { ...e, msg: editMsg } : e));
    setEditTarget(null); setEditPw(""); setEditMsg(""); setEditErr(false);
  };
  const deleteEntry = entry => {
    const v = window.prompt("비밀번호를 입력하세요");
    if (v === entry.pw) setEntries(p => p.filter(e => e.id !== entry.id));
  };

  return (
    <section style={{ marginBottom: 40 }}>
      <STitle icon="💌" title="방명록" sub="밤하늘극장을 찾아주신 분들의 이야기" />
      {/* 입력 */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(147,114,229,0.18)", borderRadius: 15, padding: "16px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="닉네임" maxLength={12} style={{ ...IS, width: 96 }} />
          <input value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" type="password" maxLength={20} style={{ ...IS, width: 106 }} />
        </div>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="밤하늘극장에 남기고 싶은 말을 적어주세요 🌙" maxLength={150} rows={2} style={{ ...IS, width: "100%", resize: "none", lineHeight: 1.6, marginBottom: 8 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#383858" }}>{msg.length}/150 · 비밀번호로 수정·삭제 가능</span>
          <button onClick={submit} style={{ background: done ? "rgba(99,220,180,0.18)" : "rgba(147,114,229,0.22)", border: `1px solid ${done ? "rgba(99,220,180,0.38)" : "rgba(147,114,229,0.38)"}`, color: done ? "#63dcb4" : "#c4a8f0", borderRadius: 9, padding: "7px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}>
            {done ? "✓ 등록됨" : "남기기 ✨"}
          </button>
        </div>
      </div>
      {/* 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {entries.map(entry => (
          <div key={entry.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 13, padding: "13px 15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#a888d8" }}>{entry.name}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#383858" }}>{entry.time}</span>
                <button onClick={() => startEdit(entry)} style={{ fontSize: 10, color: "#484870", background: "none", border: "none", cursor: "pointer", padding: 0 }}>수정</button>
                <button onClick={() => deleteEntry(entry)} style={{ fontSize: 10, color: "#5a2a3a", background: "none", border: "none", cursor: "pointer", padding: 0 }}>삭제</button>
              </div>
            </div>
            {editTarget === entry.id ? (
              <div style={{ marginBottom: 8 }}>
                <textarea value={editMsg} onChange={e => setEditMsg(e.target.value)} maxLength={150} rows={2} style={{ ...IS, width: "100%", resize: "none", marginBottom: 6 }} />
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input value={editPw} onChange={e => setEditPw(e.target.value)} placeholder="비밀번호 확인" type="password" style={{ ...IS, flex: 1 }} />
                  <button onClick={() => submitEdit(entry)} style={{ background: "rgba(147,114,229,0.22)", border: "1px solid rgba(147,114,229,0.38)", color: "#c4a8f0", borderRadius: 8, padding: "7px 13px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>저장</button>
                  <button onClick={() => setEditTarget(null)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#555578", borderRadius: 8, padding: "7px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>취소</button>
                </div>
                {editErr && <p style={{ fontSize: 11, color: "#ff7878", margin: "4px 0 0" }}>비밀번호가 틀렸어요</p>}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: "#b8b0d0", margin: "0 0 10px", lineHeight: 1.75 }}>{entry.msg}</p>
            )}
            {entry.reply && (
              <div style={{ background: "rgba(120,90,200,0.1)", border: "1px solid rgba(120,90,200,0.2)", borderRadius: 9, padding: "10px 12px", marginBottom: 10 }}>
                <p style={{ fontSize: 10, color: "#7855b8", fontWeight: 700, margin: "0 0 4px" }}>🌌 밤하늘극장</p>
                <p style={{ fontSize: 12, color: "#a898c8", margin: 0, lineHeight: 1.7 }}>{entry.reply}</p>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => like(entry.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, color: "#8880b8", fontFamily: "inherit", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,80,120,0.13)"; e.currentTarget.style.borderColor = "rgba(220,80,120,0.28)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                🤍 <span style={{ fontSize: 11 }}>{entry.likes}</span>
              </button>
              <button onClick={() => { setAdminTarget(adminTarget === entry.id ? null : entry.id); setAdminPwInput(""); setAdminReply(entry.reply || ""); setAdminErr(false); }} style={{ fontSize: 10, color: "#383858", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                {adminTarget === entry.id ? "닫기" : "관리자 답글"}
              </button>
            </div>
            {adminTarget === entry.id && (
              <div style={{ marginTop: 10, background: "rgba(0,0,0,0.28)", border: "1px solid rgba(120,90,200,0.22)", borderRadius: 10, padding: "12px" }}>
                <p style={{ fontSize: 11, color: "#7855b8", margin: "0 0 8px", fontWeight: 700 }}>🔐 관리자 답글 작성</p>
                <input value={adminPwInput} onChange={e => { setAdminPwInput(e.target.value); setAdminErr(false); }} placeholder="관리자 비밀번호" type="password" style={{ ...IS, width: "100%", marginBottom: 6 }} />
                <textarea value={adminReply} onChange={e => setAdminReply(e.target.value)} placeholder="답글 내용을 입력하세요" rows={2} style={{ ...IS, width: "100%", resize: "none", marginBottom: 6 }} />
                {adminErr && <p style={{ fontSize: 11, color: "#ff7878", margin: "0 0 6px" }}>비밀번호가 틀렸어요</p>}
                <button onClick={() => submitAdmin(entry.id)} style={{ background: "rgba(120,90,200,0.28)", border: "1px solid rgba(120,90,200,0.48)", color: "#c4a8f0", borderRadius: 8, padding: "7px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>답글 등록</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 메인
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg,#030218 0%,#07051e 35%,#0b0828 65%,#05031a 100%)", color: "#e0d8f8", fontFamily: "'Noto Sans KR','Apple SD Gothic Neo',sans-serif", position: "relative" }}>
      <style>{`
        @keyframes twinkle { from{opacity:.1} to{opacity:.8} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        *{box-sizing:border-box}
        textarea::placeholder,input::placeholder{color:#30304a}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(120,85,184,0.25);border-radius:3px}
        @media(max-width:600px){
          .two-col{grid-template-columns:1fr !important}
          .disc-grid{grid-template-columns:1fr !important}
        }
      `}</style>
      <Stars />
      <Ticker />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "34px 24px 60px", animation: "fadeUp 0.7s ease both" }}>
        <Hero />
        <About />
        <TodayTrack />
        <div className="two-col"><NewsAndCalendar /></div>
        <ChartAndPlatforms />
        <div className="disc-grid"><Discography /></div>
        <Youtube />
        <Guestbook />
        <footer style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, marginTop: 10 }}>
          <p style={{ fontSize: 10, color: "#22223a", margin: 0 }}>© 2026 밤하늘극장 · 유통 (주)와이지플러스</p>
        </footer>
      </div>
    </div>
  );
}
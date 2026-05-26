import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
// 데이터
// ═══════════════════════════════════════════════
const ADMIN_PW = "bam2026!";

const TICKER_MESSAGES = [
  "🌌 유우레이 · 임보성 — 밤하늘극장에 오신 걸 환영합니다",
  "🎵 새 싱글 2026.05.28 발매! 모든 플랫폼에서 지금 감상하세요",
  "💿 정규앨범 2026.06.09 발매 예정 — 7곡의 새 이야기",
  "⭐ 구독자 400명 돌파! 함께해주셔서 감사합니다",
];

const ALBUMS = [
  {
    title: "오늘이 가장 어렸던 날이야", year: "2024", color: "#3a2a5a",
    tracks: ["겨울의 대삼각형", "우리들의 발라드", "오늘이 가장 어렸던 날이야", "20에 50", "나 지금도 충분히 버티고 있는데", "조명이 켜지고", "사탄탱고", "별이 비처럼 내리던 날"],
  },
  {
    title: "운명애", year: "2025", color: "#1a3a4a",
    tracks: ["운명애", "운외창천 (雲外蒼天)", "테세우스의 배", "사랑엔 자막이 필요해", "지구는 잘 돌아가네, 나 없이도", "내 소중한 마음은 비밀이야", "지금 이 순간"],
  },
  {
    title: "자발적으로 표류하는 우주비행사", year: "2025", color: "#2a3a1a",
    tracks: ["자발적으로 표류하는 우주비행사", "출근하기 싫은데 알람은 또 맞춰놨어", "사막에서 수영하기", "별자리를 잇다"],
  },
  {
    title: "이 봄은 다른 이름이 될까", year: "2025", color: "#3a1a2a",
    tracks: ["이 봄은 다른 이름이 될까", "갑자기 오래된 노래가 떠오른 이유", "말하지 않은 것들의 무게", "꿈은 없고요, 돈은 많고 싶네요", "방해 금지 모드"],
  },
  {
    title: "사랑은 말이야", year: "2025", color: "#3a2a1a",
    tracks: ["사랑은 말이야", "F로 살기엔 세상은 너무 차가워", "고백 연습"],
  },
  {
    title: "사막 위의 잠수함", year: "2025", color: "#1a2a3a",
    tracks: ["사막 위의 잠수함", "붐비는 무인도", "잠수함 일지"],
  },
  {
    title: "죽어가는 모든 것들을 사랑해야지", year: "2026", color: "#2a1a3a",
    tracks: ["죽어가는 모든 것들을 사랑해야지", "꽃이 피든 말든", "푸른 하늘 은하수", "마지막 여름"],
  },
  {
    title: "나는 오늘 또 어떤 핑계를 대었는가", year: "2026", color: "#1a3a2a",
    tracks: ["나는 오늘 또 어떤 핑계를 대었는가", "가짜의 삶", "인생은 산과 계곡", "핑계의 목록"],
  },
  {
    title: "不完全な踊り (불완전한 춤)", year: "2025", color: "#3a3a1a",
    tracks: ["不完全な踊り", "闇が怖い幽霊 (어둠이 무서운 유령)", "星影の叫び (별빛의 외침)"],
  },
  {
    title: "ただ (그냥)", year: "2026", color: "#1a1a3a",
    tracks: ["ただ (그냥)", "夜の終わり (밤의 끝)"],
  },
  {
    title: "그대였죠", year: "2023", color: "#2a2a3a",
    tracks: ["그대였죠", "고장난시계", "그 계절에"],
  },
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
  { id: 1, name: "새벽여행자", msg: "우리들의 발라드 듣고 밤새 울었어요. 고맙습니다.", time: "2026.05.25", likes: 14, reply: "늦은 새벽에 함께해줘서 저도 고마워요 🌙 — 밤하늘극장" },
  { id: 2, name: "별빛수집가", msg: "자발적으로 표류하는 우주비행사 진짜 제 얘기 같아요…", time: "2026.05.24", likes: 9, reply: "" },
  { id: 3, name: "moonlight", msg: "밤하늘극장 발견한 날이 올해 최고의 날이었어요", time: "2026.05.23", likes: 11, reply: "그 말이 저희한테도 최고의 댓글이에요 ✨ — 밤하늘극장" },
];

// ═══════════════════════════════════════════════
// 별 배경
// ═══════════════════════════════════════════════
function Stars() {
  const stars = useRef(Array.from({ length: 90 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.4, opacity: Math.random() * 0.6 + 0.2,
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

// ═══════════════════════════════════════════════
// 티커
// ═══════════════════════════════════════════════
function Ticker() {
  const text = TICKER_MESSAGES.join("　　　✦　　　");
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,6,30,0.92)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(147,114,229,0.2)",
      height: 36, overflow: "hidden", display: "flex", alignItems: "center",
    }}>
      <div style={{ animation: "ticker 40s linear infinite", whiteSpace: "nowrap", fontSize: 11, color: "#a090d0", paddingLeft: "100%" }}>
        {text}&nbsp;&nbsp;&nbsp;{text}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// 섹션 타이틀
// ═══════════════════════════════════════════════
function STitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <h2 style={{ fontFamily: "'Noto Serif KR',serif", fontSize: 18, fontWeight: 700, color: "#e2d9f3", margin: 0, letterSpacing: "-0.5px" }}>{title}</h2>
      </div>
      {sub && <p style={{ fontSize: 11, color: "#555580", marginTop: 3, marginLeft: 26 }}>{sub}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════
// 소개 섹션
// ═══════════════════════════════════════════════
function AboutSection() {
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="🌌" title="밤하늘극장" sub="유우레이 · 임보성" />
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 22px" }}>
        <p style={{ fontSize: 13, color: "#b0a8cc", lineHeight: 1.9, margin: 0 }}>
          밤하늘극장은 유우레이와 임보성이 함께하는 감성 인디 프로젝트입니다.<br />
          어둠 속에서도 빛나는 별처럼, 위로가 필요한 새벽에 당신 곁에 머물고 싶습니다.<br />
          <span style={{ color: "#9370cc", fontSize: 12 }}>유통: (주)와이지플러스 · 국내 모든 음원 플랫폼 정식 발매</span>
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 오늘의 추천곡 (AI)
// ═══════════════════════════════════════════════
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

    const now = new Date();
    const h = now.getHours();
    const timeCtx = h >= 22 || h < 5 ? "늦은 새벽" : h < 10 ? "이른 아침" : h < 15 ? "한낮" : h < 19 ? "오후" : "저녁";

    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `밤하늘극장의 곡 "${picked.track}" (앨범: ${picked.album})을 오늘 ${timeCtx}에 추천하는 감성적인 한두 문장 멘트를 써줘. 50자 이내로, 말투는 따뜻하고 시적으로. 이모지 1개만 끝에 붙여줘.`
        }]
      })
    })
      .then(r => r.json())
      .then(d => {
        const txt = d.content?.map(c => c.text || "").join("") || "";
        setAiMsg(txt.trim());
        setLoading(false);
      })
      .catch(() => {
        setAiMsg(`${timeCtx}의 밤하늘에 어울리는 한 곡을 골랐어요 🌙`);
        setLoading(false);
      });
  }, []);

  if (!track) return null;

  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="⭐" title="오늘의 추천곡" sub={`${new Date().toLocaleDateString("ko-KR")} · 매일 자정 변경`} />
      <div style={{
        background: "linear-gradient(135deg, rgba(147,114,229,0.15) 0%, rgba(100,150,220,0.1) 100%)",
        border: "1px solid rgba(147,114,229,0.3)", borderRadius: 18, padding: "24px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, opacity: 0.08 }}>🎵</div>
        <p style={{ fontSize: 11, color: "#9370cc", margin: "0 0 6px", letterSpacing: "0.1em" }}>TODAY'S PICK</p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "#e2d9f3", margin: "0 0 4px", fontFamily: "'Noto Serif KR',serif" }}>{track.track}</p>
        <p style={{ fontSize: 12, color: "#7070a0", margin: "0 0 14px" }}>{track.album}</p>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
          {loading
            ? <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9370cc", animation: "pulse 1s infinite" }} />
                <span style={{ fontSize: 12, color: "#666688" }}>AI가 오늘의 멘트를 쓰고 있어요...</span>
              </div>
            : <p style={{ fontSize: 13, color: "#c0b0e0", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>"{aiMsg}"</p>
          }
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 최신 소식
// ═══════════════════════════════════════════════
function NewsSection() {
  const news = [
    { date: "2026.05.28", tag: "발매", title: "새 싱글 발매 🎉", desc: "밤하늘극장의 새 싱글이 오늘 모든 플랫폼에서 공개됩니다." },
    { date: "2026.06.09", tag: "예정", title: "정규앨범 7곡 발매", desc: "6월 9일, 7곡의 새 이야기가 찾아옵니다. 많은 기대 부탁드려요." },
    { date: "2026.05.26", tag: "채널", title: "구독자 400명 돌파", desc: "함께해주신 모든 분들 덕분입니다. 더 좋은 음악으로 보답할게요." },
  ];
  const tagColor = t => t === "발매" ? "#63dcb4" : t === "예정" ? "#f0c060" : "#9370cc";

  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="📡" title="최신 소식" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {news.map((n, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <div style={{ flexShrink: 0, textAlign: "center", paddingTop: 2 }}>
              <span style={{ fontSize: 10, background: `rgba(0,0,0,0.3)`, color: tagColor(n.tag), border: `1px solid ${tagColor(n.tag)}44`, borderRadius: 6, padding: "2px 7px" }}>{n.tag}</span>
              <p style={{ fontSize: 10, color: "#444466", margin: "4px 0 0" }}>{n.date}</p>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#ddd5f0", margin: "0 0 3px" }}>{n.title}</p>
              <p style={{ fontSize: 12, color: "#7070a0", margin: 0, lineHeight: 1.6 }}>{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 인기 순위
// ═══════════════════════════════════════════════
function ChartSection() {
  const badgeStyle = b => {
    if (b === "NEW") return { bg: "rgba(99,220,180,0.15)", color: "#63dcb4" };
    if (b === "▲") return { bg: "rgba(99,180,255,0.12)", color: "#63b4ff" };
    if (b === "▼") return { bg: "rgba(255,120,120,0.12)", color: "#ff7878" };
    return null;
  };
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="🎵" title="인기 순위" sub="※ 3월 판매 기준 정산 데이터 (2개월 후 반영)" />
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {CHART.map((t, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
            borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(147,114,229,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >
            <span style={{ width: 24, textAlign: "center", fontSize: t.rank === 1 ? 16 : 12, fontWeight: 900, color: t.rank === 1 ? "#f0d060" : t.rank <= 3 ? "#a090d0" : "#44446a", fontFamily: "monospace", flexShrink: 0 }}>
              {t.rank === 1 ? "👑" : t.rank}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#ddd5f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</p>
              <p style={{ margin: 0, fontSize: 10, color: "#555570", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.album}</p>
            </div>
            {t.badge && (() => { const bs = badgeStyle(t.badge); return <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6, background: bs.bg, color: bs.color, fontWeight: 700, flexShrink: 0 }}>{t.badge}</span>; })()}
            <span style={{ fontSize: 10, color: "#555578", fontFamily: "monospace", flexShrink: 0 }}>{t.amount}원</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 발매 음반
// ═══════════════════════════════════════════════
function DiscographySection() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="💿" title="발매 음반" sub={`총 ${ALBUMS.length}개 앨범`} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ALBUMS.map((a, i) => (
          <div key={i}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderRadius: open === i ? "12px 12px 0 0" : 12,
              background: open === i ? `${a.color}cc` : "rgba(255,255,255,0.04)",
              border: `1px solid ${open === i ? "rgba(147,114,229,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderBottom: open === i ? "none" : undefined,
              cursor: "pointer", transition: "all 0.2s", textAlign: "left", fontFamily: "inherit",
            }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#e0d8f8" }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 10, color: "#7070a0", marginTop: 2 }}>{a.year} · {a.tracks.length}곡</p>
              </div>
              <span style={{ color: "#9370cc", fontSize: 12 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ background: `${a.color}88`, border: "1px solid rgba(147,114,229,0.2)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "10px 16px 14px" }}>
                {a.tracks.map((t, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: j < a.tracks.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontSize: 10, color: "#555578", fontFamily: "monospace", width: 18, flexShrink: 0 }}>{j + 1}</span>
                    <span style={{ fontSize: 12, color: "#c0b8d8" }}>{t}</span>
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

// ═══════════════════════════════════════════════
// 플랫폼 링크
// ═══════════════════════════════════════════════
function PlatformSection() {
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="🔗" title="음원 플랫폼" sub="모든 플랫폼에서 감상 가능합니다" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {PLATFORMS.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12, textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}55`; e.currentTarget.style.background = `${p.color}15`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            <span style={{ fontSize: 20 }}>{p.icon}</span>
            <span style={{ fontSize: 13, color: "#c0b8d8", fontWeight: 600 }}>{p.name}</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: "#444466" }}>↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 유튜브 영상
// ═══════════════════════════════════════════════
function YoutubeSection() {
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="🎬" title="유튜브 최신 영상" sub="밤하늘극장 공식 채널" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {YOUTUBE_VIDEOS.map((v, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, alignItems: "center", padding: "12px 14px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,68,68,0.35)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
          >
            <div style={{ width: 52, height: 38, background: "rgba(255,68,68,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{v.thumb}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#ddd5f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.title}</p>
              <p style={{ margin: 0, fontSize: 10, color: "#555578", marginTop: 3 }}>{v.date} · 조회 {v.views}</p>
            </div>
          </div>
        ))}
        <a href="https://youtube.com/@밤하늘극장" target="_blank" rel="noreferrer" style={{ textAlign: "center", fontSize: 12, color: "#9370cc", padding: "10px", textDecoration: "none", border: "1px solid rgba(147,114,229,0.2)", borderRadius: 10 }}>
          채널 전체 보기 →
        </a>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 활동 캘린더
// ═══════════════════════════════════════════════
function CalendarSection() {
  const typeColor = t => t === "release" ? "#63dcb4" : "#f0c060";
  const typeLabel = t => t === "release" ? "발매" : "라이브";
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="📅" title="활동 캘린더" sub="2026년 주요 일정" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CALENDAR_EVENTS.map((ev, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
            <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#9370cc", flexShrink: 0, width: 36 }}>{ev.date}</span>
            <span style={{ fontSize: 10, padding: "2px 8px", background: `${typeColor(ev.type)}22`, color: typeColor(ev.type), border: `1px solid ${typeColor(ev.type)}44`, borderRadius: 6, flexShrink: 0 }}>{typeLabel(ev.type)}</span>
            <span style={{ fontSize: 13, color: "#c0b8d8" }}>{ev.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 해외 청취 현황
// ═══════════════════════════════════════════════
function OverseasSection() {
  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="🌍" title="해외 청취 현황" sub="5월 유튜브 기준 해외 스트리밍 비율" />
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "18px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {OVERSEAS.map((o, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{o.flag}</span>
              <span style={{ fontSize: 12, color: "#a0a0cc", width: 50, flexShrink: 0 }}>{o.country}</span>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${o.pct}%`, height: "100%", background: "linear-gradient(90deg, #9370cc, #63b4ff)", borderRadius: 4, transition: "width 1s ease" }} />
              </div>
              <span style={{ fontSize: 11, color: "#9370cc", fontFamily: "monospace", width: 30, textAlign: "right", flexShrink: 0 }}>{o.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 방명록
// ═══════════════════════════════════════════════
function GuestbookSection() {
  const [entries, setEntries] = useState(INIT_GUESTBOOK);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [adminTarget, setAdminTarget] = useState(null);
  const [adminPwInput, setAdminPwInput] = useState("");
  const [adminReply, setAdminReply] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editPw, setEditPw] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [editErr, setEditErr] = useState(false);
  const nextId = useRef(entries.length + 1);

  const inputStyle = {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 9, color: "#ddd5f0", padding: "9px 12px", fontSize: 12,
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  const submit = () => {
    if (!name.trim() || !pw.trim() || !msg.trim()) return;
    setEntries(prev => [{ id: nextId.current++, name: name.trim(), pw: pw.trim(), msg: msg.trim(), time: new Date().toLocaleDateString("ko-KR").replace(/\. /g, ".").slice(0, -1), likes: 0, reply: "" }, ...prev]);
    setName(""); setPw(""); setMsg("");
    setDone(true); setTimeout(() => setDone(false), 2000);
  };

  const like = (id) => setEntries(prev => prev.map(e => e.id === id ? { ...e, likes: e.likes + 1 } : e));

  const submitAdmin = (id) => {
    if (adminPwInput !== ADMIN_PW) { setAdminErr(true); return; }
    setEntries(prev => prev.map(e => e.id === id ? { ...e, reply: adminReply } : e));
    setAdminTarget(null); setAdminPwInput(""); setAdminReply(""); setAdminErr(false);
  };

  const startEdit = (entry) => { setEditTarget(entry.id); setEditMsg(entry.msg); setEditPw(""); setEditErr(false); };

  const submitEdit = (entry) => {
    if (editPw !== entry.pw) { setEditErr(true); return; }
    setEntries(prev => prev.map(e => e.id === entry.id ? { ...e, msg: editMsg } : e));
    setEditTarget(null); setEditPw(""); setEditMsg(""); setEditErr(false);
  };

  const deleteEntry = (entry) => {
    const inputPw = window.prompt("비밀번호를 입력하세요");
    if (inputPw === entry.pw) setEntries(prev => prev.filter(e => e.id !== entry.id));
  };

  return (
    <section style={{ marginBottom: 48 }}>
      <STitle icon="💌" title="방명록" sub="밤하늘극장을 찾아주신 분들의 이야기" />

      {/* 입력 */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(147,114,229,0.2)", borderRadius: 16, padding: "18px", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="닉네임" maxLength={12} style={{ ...inputStyle, width: 100 }} />
          <input value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" type="password" maxLength={20} style={{ ...inputStyle, width: 110 }} />
        </div>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="밤하늘극장에 남기고 싶은 말을 적어주세요 🌙" maxLength={150} rows={2} style={{ ...inputStyle, width: "100%", resize: "none", lineHeight: 1.6, marginBottom: 8 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#444466" }}>{msg.length}/150 · 비밀번호로 수정·삭제 가능</span>
          <button onClick={submit} style={{ background: done ? "rgba(99,220,180,0.2)" : "rgba(147,114,229,0.25)", border: `1px solid ${done ? "rgba(99,220,180,0.4)" : "rgba(147,114,229,0.4)"}`, color: done ? "#63dcb4" : "#c4a8f0", borderRadius: 9, padding: "7px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}>
            {done ? "✓ 등록됨" : "남기기 ✨"}
          </button>
        </div>
      </div>

      {/* 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {entries.map(entry => (
          <div key={entry.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#b49de0" }}>{entry.name}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#444466" }}>{entry.time}</span>
                <button onClick={() => startEdit(entry)} style={{ fontSize: 10, color: "#555578", background: "none", border: "none", cursor: "pointer", padding: 0 }}>수정</button>
                <button onClick={() => deleteEntry(entry)} style={{ fontSize: 10, color: "#663344", background: "none", border: "none", cursor: "pointer", padding: 0 }}>삭제</button>
              </div>
            </div>

            {editTarget === entry.id ? (
              <div style={{ marginBottom: 8 }}>
                <textarea value={editMsg} onChange={e => setEditMsg(e.target.value)} maxLength={150} rows={2} style={{ ...inputStyle, width: "100%", resize: "none", marginBottom: 6 }} />
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input value={editPw} onChange={e => setEditPw(e.target.value)} placeholder="비밀번호 확인" type="password" style={{ ...inputStyle, flex: 1 }} />
                  <button onClick={() => submitEdit(entry)} style={{ background: "rgba(147,114,229,0.25)", border: "1px solid rgba(147,114,229,0.4)", color: "#c4a8f0", borderRadius: 8, padding: "7px 14px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>저장</button>
                  <button onClick={() => setEditTarget(null)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#666688", borderRadius: 8, padding: "7px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>취소</button>
                </div>
                {editErr && <p style={{ fontSize: 11, color: "#ff7878", margin: "4px 0 0" }}>비밀번호가 틀렸어요</p>}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: "#c0b8d8", margin: "0 0 10px", lineHeight: 1.7 }}>{entry.msg}</p>
            )}

            {/* 관리자 답글 */}
            {entry.reply && (
              <div style={{ background: "rgba(147,114,229,0.1)", border: "1px solid rgba(147,114,229,0.2)", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
                <p style={{ fontSize: 10, color: "#9370cc", fontWeight: 700, margin: "0 0 4px" }}>🌌 밤하늘극장</p>
                <p style={{ fontSize: 12, color: "#b8a8d8", margin: 0, lineHeight: 1.7 }}>{entry.reply}</p>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={() => like(entry.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, color: "#a090c8", fontFamily: "inherit", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,100,150,0.15)"; e.currentTarget.style.borderColor = "rgba(255,100,150,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                <span>🤍</span><span style={{ fontSize: 11 }}>{entry.likes}</span>
              </button>
              <button onClick={() => { setAdminTarget(adminTarget === entry.id ? null : entry.id); setAdminPwInput(""); setAdminReply(entry.reply || ""); setAdminErr(false); }} style={{ fontSize: 10, color: "#444460", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                {adminTarget === entry.id ? "닫기" : "관리자 답글"}
              </button>
            </div>

            {adminTarget === entry.id && (
              <div style={{ marginTop: 10, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(147,114,229,0.25)", borderRadius: 10, padding: "12px" }}>
                <p style={{ fontSize: 11, color: "#9370cc", margin: "0 0 8px", fontWeight: 700 }}>🔐 관리자 답글 작성</p>
                <input value={adminPwInput} onChange={e => { setAdminPwInput(e.target.value); setAdminErr(false); }} placeholder="관리자 비밀번호" type="password" style={{ ...inputStyle, width: "100%", marginBottom: 6 }} />
                <textarea value={adminReply} onChange={e => setAdminReply(e.target.value)} placeholder="답글 내용을 입력하세요" rows={2} style={{ ...inputStyle, width: "100%", resize: "none", marginBottom: 6 }} />
                {adminErr && <p style={{ fontSize: 11, color: "#ff7878", margin: "0 0 6px" }}>비밀번호가 틀렸어요</p>}
                <button onClick={() => submitAdmin(entry.id)} style={{ background: "rgba(147,114,229,0.3)", border: "1px solid rgba(147,114,229,0.5)", color: "#c4a8f0", borderRadius: 8, padding: "7px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  답글 등록
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// 탭 네비
// ═══════════════════════════════════════════════
const TABS = [
  { id: "home", label: "🏠" },
  { id: "music", label: "🎵" },
  { id: "schedule", label: "📅" },
  { id: "guestbook", label: "💌" },
];

// ═══════════════════════════════════════════════
// 메인
// ═══════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("home");

  // 반응형 컬럼 계산
const getColumns = () => {
  if (window.innerWidth >= 700) return "repeat(2, 1fr)";
  return "1fr";
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#04031a 0%,#080520 40%,#0c0830 70%,#060318 100%)",
        color: "#e0d8f8",
        fontFamily: "'Noto Sans KR','Apple SD Gothic Neo',sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes twinkle {
          from { opacity:.15 }
          to { opacity:.85 }
        }

        @keyframes ticker {
          from { transform:translateX(0) }
          to { transform:translateX(-50%) }
        }

        @keyframes fadeUp {
          from {
            opacity:0;
            transform:translateY(16px)
          }
          to {
            opacity:1;
            transform:translateY(0)
          }
        }

        @keyframes pulse {
          0%,100% { opacity:.4 }
          50% { opacity:1 }
        }

        * {
          box-sizing:border-box;
        }

        textarea::placeholder,
        input::placeholder {
          color:#3a3a58;
        }

        ::-webkit-scrollbar {
          width:3px;
        }

        ::-webkit-scrollbar-thumb {
          background:rgba(147,114,229,0.25);
          border-radius:3px;
        }

        @media (max-width: 700px) {
          .main-grid {
            display:flex !important;
            flex-direction:column !important;
          }
        }
      `}</style>

      <Stars />
      <Ticker />

      {/* 메인 컨테이너 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1700,
          width: "100%",
          margin: "0 auto",
          padding: "56px 24px 100px",
        }}
      >
        {/* 헤더 */}
        <header
          style={{
            textAlign: "center",
            padding: "32px 0 40px",
            animation: "fadeUp 0.7s ease both",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>🌌</div>

          <h1
            style={{
              fontFamily: "'Noto Serif KR',serif",
              fontSize: 34,
              fontWeight: 900,
              background:
                "linear-gradient(135deg,#c4a8f0 0%,#8ab4f8 50%,#a8d8ea 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 6px",
              letterSpacing: "-1px",
            }}
          >
            밤하늘극장
          </h1>

          <p
            style={{
              fontSize: 12,
              color: "#555580",
              letterSpacing: "0.15em",
              margin: 0,
            }}
          >
            유우레이 · 임보성 · 감성 인디
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 14,
              padding: "5px 14px",
              background: "rgba(147,114,229,0.12)",
              border: "1px solid rgba(147,114,229,0.22)",
              borderRadius: 30,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "#9370cc",
              }}
            >
              구독자
            </span>

            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#c4a8f0",
              }}
            >
              400+
            </span>

            <span
              style={{
                fontSize: 10,
                color: "#63dcb4",
              }}
            >
              ▲ 성장중
            </span>
          </div>
        </header>

        {/* 콘텐츠 */}
        <div
          key={tab}
          className="main-grid"
          style={{
            animation: "fadeUp 0.4s ease both",
            display: "grid",
            gridTemplateColumns: getColumns(),
            gap: 20,
            alignItems: "start",
          }}
        >
          {tab === "home" && (
            <>
              <div
                style={{
                  height: "fit-content",
                }}
              >
                <AboutSection />
              </div>

              <div
                style={{
                  height: "fit-content",
                }}
              >
                <TodayTrack />
              </div>

              <div
                style={{
                  height: "fit-content",
                }}
              >
                <NewsSection />
              </div>

              <div
                style={{
                  height: "fit-content",
                }}
              >
                <OverseasSection />
              </div>
            </>
          )}

          {tab === "music" && (
            <>
              <div
                style={{
                  height: "fit-content",
                }}
              >
                <ChartSection />
              </div>

              <div
                style={{
                  height: "fit-content",
                }}
              >
                <DiscographySection />
              </div>

              <div
                style={{
                  height: "fit-content",
                }}
              >
                <PlatformSection />
              </div>

              <div
                style={{
                  height: "fit-content",
                }}
              >
                <YoutubeSection />
              </div>
            </>
          )}

          {tab === "schedule" && (
            <div
              style={{
                gridColumn: "1 / -1",
                maxWidth: 900,
                width: "100%",
                margin: "0 auto",
              }}
            >
              <CalendarSection />
            </div>
          )}

          {tab === "guestbook" && (
            <div
              style={{
                gridColumn: "1 / -1",
                maxWidth: 900,
                width: "100%",
                margin: "0 auto",
              }}
            >
              <GuestbookSection />
            </div>
          )}
        </div>

        {/* 푸터 */}
        <footer
          style={{
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 20,
            marginTop: 40,
          }}
        >
          <p
            style={{
              fontSize: 10,
              color: "#2a2a44",
              margin: 0,
            }}
          >
            © 2026 밤하늘극장 · 유통 (주)와이지플러스
          </p>
        </footer>
      </div>

      {/* 하단 탭바 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(8,5,28,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(147,114,229,0.15)",
          display: "flex",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              opacity: tab === t.id ? 1 : 0.35,
              transition: "opacity 0.2s",
              position: "relative",
            }}
          >
            {t.label}

            {tab === t.id && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 24,
                  height: 2,
                  background: "#9370cc",
                  borderRadius: 2,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
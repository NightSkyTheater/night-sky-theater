import { useState, useEffect, useRef } from "react";

/* ────────────── THEME ────────────── */
const ACCENT = "#B8FF00";
const LIME = ACCENT;
const glass = "rgba(30,20,60,0.72)";
const gb = "rgba(255,255,255,0.13)";
const muted = "rgba(220,210,255,0.36)";
const soft = "rgba(220,210,255,0.70)";
const white = "#F2EEF9";

const EMOJI_FONT =
  "'Twemoji Mozilla','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";

/* ────────────── DATA ────────────── */

const INIT_GB = [
  {
    id: 1,
    name: "새벽여행자",
    pw: "1234",
    msg: "우리들의 발라드 듣고 밤새 울었어요.",
    time: "05.25",
    x: 15,
    y: 12,
    color: "#fff",
  },
];

const CHART = [
  { rank: 1, title: "우리들의 발라드", trend: null },
  { rank: 2, title: "말하지 않은 것들의 무게", trend: "up" },
  { rank: 3, title: "꽃이 피든 말든", trend: "new" },
];

const SUB_DATA = [
  { month: "11월", subs: 132 },
  { month: "12월", subs: 182 },
  { month: "1월", subs: 219 },
  { month: "2월", subs: 262 },
  { month: "3월", subs: 300 },
  { month: "4월", subs: 345 },
  { month: "5월", subs: 410 },
];

/* ────────────── UI PRIMITIVES ────────────── */

function Stars() {
  const s = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.4 + 0.1,
      d: Math.random() * 5 + 2,
    }))
  ).current;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
      {s.map((st) => (
        <div
          key={st.id}
          style={{
            position: "absolute",
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.r,
            height: st.r,
            borderRadius: "50%",
            background: "#fff",
            opacity: st.o,
          }}
        />
      ))}
    </div>
  );
}

const Box = ({ children }) => (
  <div
    style={{
      background: glass,
      border: `1px solid ${gb}`,
      borderRadius: 16,
      padding: 16,
      backdropFilter: "blur(20px)",
    }}
  >
    {children}
  </div>
);

/* ────────────── HOME ────────────── */

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Box>
        <h3 style={{ color: white, margin: 0 }}>밤하늘극장</h3>
        <p style={{ color: muted, fontSize: 12 }}>
          감정이 흐르는 음악 프로젝트
        </p>
      </Box>

      <Box>
        <h4 style={{ color: white }}>구독자</h4>
        <p style={{ color: ACCENT, fontSize: 22, margin: 0 }}>410</p>
      </Box>

      <Box>
        <h4 style={{ color: white }}>TOP 3</h4>
        {CHART.map((c) => (
          <p key={c.rank} style={{ color: soft, margin: "6px 0" }}>
            {c.rank}. {c.title}
          </p>
        ))}
      </Box>
    </div>
  );
}

/* ────────────── MUSIC (최소 버전) ────────────── */

function Music() {
  return (
    <Box>
      <h3 style={{ color: white }}>디스코그래피</h3>
      <p style={{ color: muted }}>앨범 리스트 영역</p>
    </Box>
  );
}

/* ────────────── GUESTBOOK (완전 정상 버전) ────────────── */

function Guestbook() {
  const [entries, setEntries] = useState(INIT_GB);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const add = () => {
    if (!name || !msg) return;

    setEntries((p) => [
      ...p,
      {
        id: Date.now(),
        name,
        msg,
        time: new Date().toLocaleDateString(),
        x: Math.random() * 70 + 10,
        y: Math.random() * 50 + 10,
        color: "#fff",
      },
    ]);

    setName("");
    setMsg("");
  };

  return (
    <div style={{ position: "relative", minHeight: 400 }}>
      <Box>
        <h3 style={{ color: white }}>방명록</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{ width: "100%", marginBottom: 6 }}
        />

        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="메시지"
          style={{ width: "100%" }}
        />

        <button onClick={add} style={{ marginTop: 8 }}>
          작성
        </button>
      </Box>

      <div style={{ position: "relative", marginTop: 20 }}>
        {entries.map((e) => (
          <div
            key={e.id}
            style={{
              position: "absolute",
              left: `${e.x}%`,
              top: `${e.y}%`,
              color: e.color,
              fontSize: 12,
            }}
          >
            <b>{e.name}</b>
            <div>{e.msg}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────── APP ────────────── */

export default function App() {
  const [tab, setTab] = useState("홈");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0a2e",
        color: white,
        padding: 16,
      }}
    >
      <Stars />

      {/* NAV */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["홈", "음악", "방명록"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: 10,
              background: tab === t ? ACCENT : glass,
              border: "none",
              borderRadius: 10,
              color: tab === t ? "#000" : white,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* PAGE */}
      {tab === "홈" && <Home />}
      {tab === "음악" && <Music />}
      {tab === "방명록" && <Guestbook />}
    </div>
  );
}
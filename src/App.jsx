import { useState, useEffect, useRef } from "react";

/* ───────── THEME ───────── */
const ACCENT = "#B8FF00";
const LIME = ACCENT;
const glass = "rgba(30,20,60,0.72)";
const gb = "rgba(255,255,255,0.13)";
const muted = "rgba(220,210,255,0.36)";
const soft = "rgba(220,210,255,0.70)";
const white = "#F2EEF9";

const EMOJI_FONT =
  "'Twemoji Mozilla','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";

/* ───────── DATA (원본 유지) ───────── */

const INIT_GB = [
  {
    id: 1,
    name: "새벽여행자",
    pw: "1234",
    msg: "우리들의 발라드 듣고 밤새 울었어요. 고맙습니다.",
    time: "05.25",
    likes: 14,
    reply: "늦은 새벽에 함께해줘서 저도 고마워요 — 밤하늘극장",
  },
  {
    id: 2,
    name: "별빛수집가",
    pw: "1234",
    msg: "자발적으로 표류하는 우주비행사 진짜 제 얘기 같아요…",
    time: "05.24",
    likes: 9,
    reply: "",
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

/* ───────── STAR BACKGROUND ───────── */

function Stars() {
  const s = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.3 + 0.2,
      o: Math.random() * 0.5 + 0.1,
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

/* ───────── UI BLOCK ───────── */

const Box = ({ children }) => (
  <div
    style={{
      background: glass,
      border: `1px solid ${gb}`,
      borderRadius: 16,
      padding: 16,
      backdropFilter: "blur(22px)",
    }}
  >
    {children}
  </div>
);

/* ───────── HOME (UI 유지) ───────── */

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Box>
        <h2 style={{ color: white, margin: 0 }}>밤하늘극장</h2>
        <p style={{ color: muted, fontSize: 12 }}>
          감정이 흐르는 음악 프로젝트
        </p>
      </Box>

      <Box>
        <p style={{ color: muted, margin: 0 }}>현재 구독자</p>
        <h1 style={{ color: ACCENT, margin: 0 }}>410</h1>
      </Box>

      <Box>
        <p style={{ color: white, marginTop: 0 }}>TOP 3</p>
        {CHART.map((c) => (
          <p key={c.rank} style={{ color: soft, margin: "6px 0" }}>
            {c.rank}. {c.title}
          </p>
        ))}
      </Box>
    </div>
  );
}

/* ───────── MUSIC (UI 유지용) ───────── */

function Music() {
  return (
    <Box>
      <h3 style={{ color: white }}>디스코그래피</h3>
      <p style={{ color: muted }}>앨범 리스트 영역 (원본 유지)</p>
    </Box>
  );
}

/* ───────── GUESTBOOK (핵심 복구) ───────── */

function Guestbook() {
  const [entries, setEntries] = useState(INIT_GB);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  const add = () => {
    if (!name || !pw || !msg) return;

    setEntries((p) => [
      ...p,
      {
        id: Date.now(),
        name,
        pw,
        msg,
        time: new Date().toLocaleDateString(),
        likes: 0,
        reply: "",
      },
    ]);

    setName("");
    setPw("");
    setMsg("");
  };

  const remove = (id) => {
    const input = prompt("비밀번호 입력");
    const target = entries.find((e) => e.id === id);

    if (input === target?.pw) {
      setEntries(entries.filter((e) => e.id !== id));
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Box>
        <h3 style={{ color: white }}>방명록</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{ width: "100%", marginBottom: 6 }}
        />
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          type="password"
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

      <Box>
        {entries.map((e) => (
          <div
            key={e.id}
            style={{
              padding: 10,
              borderBottom: `1px solid ${gb}`,
              color: soft,
            }}
          >
            <b>{e.name}</b>
            <p style={{ margin: "6px 0" }}>{e.msg}</p>
            <small>{e.time}</small>

            <button
              onClick={() => remove(e.id)}
              style={{ marginLeft: 10, fontSize: 10 }}
            >
              삭제
            </button>
          </div>
        ))}
      </Box>
    </div>
  );
}

/* ───────── APP (정상 구조) ───────── */

export default function App() {
  const [tab, setTab] = useState("홈");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#0e0a2e,#120d38,#0e0a2e)",
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
              borderRadius: 10,
              border: "none",
              background: tab === t ? ACCENT : glass,
              color: tab === t ? "#000" : white,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "홈" && <Home />}
      {tab === "음악" && <Music />}
      {tab === "방명록" && <Guestbook />}
    </div>
  );
}
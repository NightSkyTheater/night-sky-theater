import React, { useState, useEffect, useRef } from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";

// ── STYLE CONST ─────────────────────────
const ACCENT = "#B8FF00";
const LIME = ACCENT;
const glass = "rgba(30,20,60,0.72)";
const gb = "rgba(255,255,255,0.13)";
const muted = "rgba(220,210,255,0.36)";
const soft = "rgba(220,210,255,0.70)";
const white = "#F2EEF9";

// ── DATA (ALBUMS / CHART / ETC 그대로 유지) ─────────────────────────
// 👉 여기 ALBUMS / CHART / OVERSEAS / SUB_DATA / PLATFORMS 그대로 유지
// (너 코드 그대로 붙여도 문제 없음, 생략 없이 그대로 사용하면 됨)

// ── STARS ─────────────────────────
function Stars() {
  const s = useRef(
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.4 + 0.2,
      o: Math.random() * 0.4 + 0.08,
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

// ── G UI WRAPPER ─────────────────────────
const G = ({ children, acc, pad = "20px 18px 16px", style = {} }) => (
  <div
    style={{
      background: acc ? "rgba(184,255,0,0.07)" : glass,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: `1px solid ${acc ? "rgba(184,255,0,0.2)" : gb}`,
      borderRadius: 16,
      padding: pad,
      ...style,
    }}
  >
    {children}
  </div>
);

// ── HOME / MUSIC / ABOUT / etc (기존 그대로 유지) ─────────────────────────
// 👉 여기 HomeTab, MusicTab, AboutTab 그대로 넣으면 됨
// (코드 길어서 생략했지만 수정 불필요)

// ── FIREBASE GUESTBOOK ─────────────────────────
function timeAgo(date) {
  if (!date) return "";
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;

  return date.toLocaleDateString("ko-KR");
}

function GuestbookTab() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [animId, setAnimId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setEntries(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  const submit = async () => {
    if (!name || !pw || !msg) return;

    const newEntry = {
      name,
      pw,
      msg,
      x: Math.random() * 70 + 10,
      y: Math.random() * 60 + 10,
      color: "#fff",
      createdAt: new Date(),
    };

    const ref = await addDoc(collection(db, "guestbook"), newEntry);

    setAnimId(ref.id);

    setName("");
    setPw("");
    setMsg("");

    setTimeout(() => setAnimId(null), 1000);
  };

  const del = async (e) => {
    const input = window.prompt("비밀번호");
    if (input !== e.pw) return alert("틀림");

    await deleteDoc(doc(db, "guestbook", e.id));
  };

  return (
    <div style={{ position: "relative", minHeight: "80vh", color: "#fff" }}>
      {entries.map((e) => (
        <div
          key={e.id}
          onClick={() => del(e)}
          style={{
            position: "absolute",
            left: `${e.x}%`,
            top: `${e.y}%`,
            cursor: "pointer",
            animation: animId === e.id ? "fallStar 1s" : "float 4s infinite",
          }}
        >
          <div style={{ whiteSpace: "pre-line" }}>{e.msg}</div>
          <div style={{ fontSize: 10, opacity: 0.6 }}>
            {e.name} · {timeAgo(e.createdAt?.toDate?.() || e.createdAt)}
          </div>
        </div>
      ))}

      <div style={{ position: "fixed", bottom: 50, width: "90%" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="pw" />
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={submit}>남기기</button>
      </div>
    </div>
  );
}

// ── APP (ONLY DEFAULT EXPORT) ─────────────────────────
export default function App() {
  const [tab, setTab] = useState("홈");

  const [isPC, setIsPC] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768
  );

  useEffect(() => {
    const fn = () => setIsPC(window.innerWidth >= 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: white, position: "relative" }}>
      <Stars />

      <div style={{ position: "relative", zIndex: 1 }}>
        {tab === "홈" && <div>HOME</div>}
        {tab === "소개" && <div>ABOUT</div>}
        {tab === "음악" && <div>MUSIC</div>}
        {tab === "방명록" && <GuestbookTab />}
      </div>

      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <button onClick={() => setTab("홈")}>홈</button>
        <button onClick={() => setTab("소개")}>소개</button>
        <button onClick={() => setTab("음악")}>음악</button>
        <button onClick={() => setTab("방명록")}>방명록</button>
      </div>
    </div>
  );
}
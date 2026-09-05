import React, { useState } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ACCENT, FADE, HAIRLINE, MONO, PAPER, SITE_MAX } from "../theme";
import { SectionHead } from "../components/Common";

function timeAgo(date) {
  if (!date) return "";
  const targetDate = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date);
  const now = new Date();
  const diff = Math.floor((now - targetDate) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return targetDate.toLocaleDateString("ko-KR");
}

const AVATAR_COLORS = ["#B8FF00", "#8ab4ff", "#ff8b94", "#a8e6cf", "#ffcc44", "#c4b5fd", "#fbcfe8", "#7dd3fc", "#fca5a5", "#86efac"];

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function Avatar({ id }) {
  const seed = hashSeed(id || "anon");
  const color = AVATAR_COLORS[seed % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: `${color}22`,
        border: `1px solid ${color}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    </div>
  );
}

export default function Community({ entries, loadMore, hasMore, loadGuestbook }) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!name.trim() || !pw.trim() || !msg.trim()) return;
    const newEntry = { name: name.trim(), pw: pw.trim(), msg: msg.trim(), createdAt: new Date() };
    try {
      await addDoc(collection(db, "guestbook"), newEntry);
      await loadGuestbook();
      setName("");
      setPw("");
      setMsg("");
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch (err) {
      console.error(err);
    }
  };

  const del = async (entry) => {
    if (!window.confirm("이 글을 삭제하시겠습니까?")) return;
    const input = window.prompt("비밀번호를 입력하세요");
    if (!input) return;
    if (input === entry.pw) {
      try {
        await deleteDoc(doc(db, "guestbook", entry.id));
        await loadGuestbook();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: `1px solid ${HAIRLINE}`,
    borderRadius: 12,
    color: PAPER,
    padding: "12px 14px",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
  };

  return (
    <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "140px 20px 90px" }}>
      <SectionHead index="COMMUNITY" title="커뮤니티" desc="밤하늘에 지워지지 않을 당신의 한 줄을 남겨주세요." />

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${HAIRLINE}`,
          borderRadius: 18,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 40,
          maxWidth: 640,
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임" style={{ ...inputStyle, flex: "1 1 140px" }} />
          <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호" type="password" style={{ ...inputStyle, flex: "1 1 140px" }} />
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="메시지를 남겨주세요..."
            style={{ ...inputStyle, flex: "1 1 220px" }}
          />
          <button
            onClick={submit}
            style={{
              flexShrink: 0,
              padding: "0 22px",
              borderRadius: 12,
              border: "none",
              background: done ? ACCENT : "rgba(255,255,255,0.9)",
              color: "#111",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {done ? "완료 ✨" : "남기기"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {entries.map((e) => (
          <div
            key={e.id}
            style={{
              position: "relative",
              display: "flex",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.025)",
              border: `1px solid ${HAIRLINE}`,
            }}
          >
            <Avatar id={e.id} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: PAPER }}>{e.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: FADE }}>{timeAgo(e.createdAt)}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "rgba(244,242,250,0.82)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {e.msg}
              </p>
            </div>
            <button
              onClick={() => del(e)}
              style={{ position: "absolute", top: 10, right: 12, background: "none", border: "none", color: "rgba(255,255,255,0.28)", cursor: "pointer", fontSize: 12 }}
            >
              ✕
            </button>
          </div>
        ))}
        {entries.length === 0 && <p style={{ textAlign: "center", fontSize: 13, color: FADE, padding: "30px 0" }}>아직 남겨진 글이 없어요.</p>}
        {hasMore && (
          <button
            onClick={loadMore}
            style={{
              width: "100%",
              marginTop: 10,
              padding: "13px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${HAIRLINE}`,
              color: PAPER,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
}

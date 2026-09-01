import React, { useState } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ACCENT, LIME, muted, soft, white } from "../theme";

function timeAgo(date) {
  if (!date) return "";
  const targetDate =
    date instanceof Date ? date : (date.toDate ? date.toDate() : new Date(date));
  const now = new Date();
  const diff = Math.floor((now - targetDate) / 1000);

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;

  return targetDate.toLocaleDateString("ko-KR");
}

// 어나니머스 아바타용 색상 팔레트 (기존 낙서 색상과 통일감 있게)
const AVATAR_COLORS = [
  "#B8FF00", "#8ab4ff", "#ff8b94", "#a8e6cf", "#ffcc44",
  "#c4b5fd", "#fbcfe8", "#7dd3fc", "#fca5a5", "#86efac",
];

// entry.id 기반으로 매번 같은 색/아이콘이 나오도록 결정론적 해시
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function AnonymousAvatar({ id }) {
  const seed = hashSeed(id || "anon");
  const color = AVATAR_COLORS[seed % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
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

export default function GuestbookTab({
  entries,
  loadMore,
  hasMore,
  loadGuestbook,
}) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);



  const submit = async () => {
    if (!name.trim() || !pw.trim() || !msg.trim()) return;

    const newEntry = {
      name: name.trim(),
      pw: pw.trim(),
      msg: msg.trim(),
      color: [
        "#FFFFFF", "#F8FAFC", "#F1F5F9", "#E0F2FE", "#BAE6FD",
        "#CFFAFE", "#CCFBF1", "#D1FAE5", "#DCFCE7", "#ECFCCB",
        "#FEF9C3", "#FEF3C7", "#FDE68A", "#FCE7F3", "#FBCFE8",
        "#E9D5FF", "#DDD6FE", "#C4B5FD", "#BFDBFE", "#B8FF00"
      ][Math.floor(Math.random() * 20)],
      createdAt: new Date(),
    };

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
    if (!window.confirm("이 낙서를 삭제하시겠습니까?")) return;

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
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "12px",
    color: "#fff",
    padding: "10px 14px",
    fontSize: "12px",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        color: "#fff",
      }}
    >
      {/* 🌌 타이틀 */}
      <div style={{ padding: "16px 4px 6px" }}>
        <h2 style={{ margin: "0 0 4px 0", fontSize: 16, fontWeight: 700, color: LIME }}>
          밤하늘 낙서장
        </h2>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>
          밤하늘에 지워지지 않을 당신의 한 줄을 남겨주세요.
        </p>
      </div>

      {/* ✍️ 인라인 작성 카드 */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임"
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
            type="password"
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="방명록을 작성해 주세요..."
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            onClick={submit}
            style={{
              flexShrink: 0,
              padding: "0 18px",
              borderRadius: 12,
              border: "none",
              background: done ? ACCENT : "rgba(255,255,255,0.9)",
              color: "#111",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {done ? "완료 ✨" : "남기기"}
          </button>
        </div>
      </div>

      {/* 📜 낙서 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {entries.map((e) => (
          <div
            key={e.id}
            style={{
              position: "relative",
              display: "flex",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <AnonymousAvatar id={e.id} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: white }}>{e.name}</span>
                <span style={{ fontSize: 10.5, color: muted }}>{timeAgo(e.createdAt)}</span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: soft,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  textAlign: "left",
                }}
              >
                {e.msg}
              </p>
            </div>
            <button
              onClick={() => del(e)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.28)",
                cursor: "pointer",
                fontSize: 12,
                padding: 4,
              }}
              onMouseEnter={(ev) => (ev.target.style.color = "#ff4d4d")}
              onMouseLeave={(ev) => (ev.target.style.color = "rgba(255,255,255,0.28)")}
            >
              ✕
            </button>
          </div>
        ))}
        {entries.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 12, color: muted, padding: "20px 0" }}>
            아직 낙서가 없어요. 첫 별을 남겨보세요.
          </p>
        )}
        {hasMore && (
  <button
    onClick={loadMore}
    style={{
      width: "100%",
      marginTop: 16,
      padding: "12px",
      borderRadius: 12,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "#fff",
      cursor: "pointer",
      fontSize: 13,
    }}
  >
    더보기
  </button>
)}
      </div>
    </div>
  );
}

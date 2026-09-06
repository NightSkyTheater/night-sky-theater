import React, { useState } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Send, Trash2 } from "lucide-react";

function timeAgo(date) {
  if (!date) return "";
  const d = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return d.toLocaleDateString("ko-KR");
}
const AVATAR_COLORS = [
  "#B8FF00", "#8ab4ff", "#ff8b94", "#a8e6cf", "#ffcc44",
  "#c4b5fd", "#fbcfe8", "#7dd3fc", "#fca5a5", "#86efac",
];

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
      className="anonymous-avatar"
      style={{
        background: `${color}22`,
        borderColor: `${color}55`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    </div>
  );
}
export default function GuestbookTab({ entries, loadMore, hasMore, loadGuestbook }) {
  const [name,setName]=useState(""); const [pw,setPw]=useState(""); const [msg,setMsg]=useState("");
  const submit=async()=>{if(!name.trim()||!pw.trim()||!msg.trim()) return; await addDoc(collection(db,"guestbook"),{name:name.trim(),pw:pw.trim(),msg:msg.trim(),createdAt:new Date()}); setName("");setPw("");setMsg(""); await loadGuestbook();};
  const del=async(e)=>{if(!window.confirm("이 메시지를 삭제하시겠습니까?")) return; const input=window.prompt("비밀번호를 입력하세요"); if(input===e.pw){await deleteDoc(doc(db,"guestbook",e.id));await loadGuestbook();}else if(input){alert("비밀번호가 틀렸습니다.");}};

  return <main className="subpage">
    <section className="page-shell community-layout">
  <div className="guestbook-list">
    {entries.map((e, i) => (
      <article key={e.id}>
        <AnonymousAvatar id={e.id} />

        <div className="note-body">
          <div>
            <b>{e.name}</b>
            <span>{timeAgo(e.createdAt)}</span>
          </div>
          <p>{e.msg}</p>
        </div>

        <button onClick={() => del(e)} aria-label="삭제">
          <Trash2 size={15} />
        </button>
      </article>
    ))}

    {entries.length === 0 && (
      <p className="empty-note">아직 남겨진 메시지가 없습니다.</p>
    )}

    {hasMore && (
      <button className="load-more" onClick={loadMore}>
        LOAD MORE
      </button>
    )}
  </div>

  <div className="guestbook-form">
    <span className="eyebrow">LEAVE A NOTE</span>
    <h2>당신의 한 줄을 남겨주세요.</h2>

    <div className="form-row">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="닉네임"
      />
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="삭제 비밀번호"
      />
    </div>

    <textarea
      value={msg}
      onChange={(e) => setMsg(e.target.value)}
      placeholder="메시지를 입력해 주세요."
      rows={6}
    />

    <button className="btn primary" onClick={submit}>
      SEND NOTE <Send size={15} />
    </button>
  </div>
</section>
  </main>
}

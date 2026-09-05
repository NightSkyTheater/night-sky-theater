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

export default function GuestbookTab({ entries, loadMore, hasMore, loadGuestbook }) {
  const [name,setName]=useState(""); const [pw,setPw]=useState(""); const [msg,setMsg]=useState("");
  const submit=async()=>{if(!name.trim()||!pw.trim()||!msg.trim()) return; await addDoc(collection(db,"guestbook"),{name:name.trim(),pw:pw.trim(),msg:msg.trim(),createdAt:new Date()}); setName("");setPw("");setMsg(""); await loadGuestbook();};
  const del=async(e)=>{if(!window.confirm("이 메시지를 삭제하시겠습니까?")) return; const input=window.prompt("비밀번호를 입력하세요"); if(input===e.pw){await deleteDoc(doc(db,"guestbook",e.id));await loadGuestbook();}else if(input){alert("비밀번호가 틀렸습니다.");}};

  return <main className="subpage">
    <section className="page-shell sub-hero community-hero"><span className="eyebrow">COMMUNITY</span><h1>NIGHT NOTES</h1><p>밤하늘극장의 음악을 지나간 분들이 남기는 짧은 기록입니다.</p></section>
    <section className="page-shell community-layout">
      <div className="guestbook-form"><span className="eyebrow">LEAVE A NOTE</span><h2>당신의 한 줄을 남겨주세요.</h2><div className="form-row"><input value={name} onChange={e=>setName(e.target.value)} placeholder="닉네임"/><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="삭제 비밀번호"/></div><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="메시지를 입력해 주세요." rows={6}/><button className="btn primary" onClick={submit}>SEND NOTE <Send size={15}/></button></div>
      <div className="guestbook-list">{entries.map((e,i)=><article key={e.id}><div className="note-index">{String(i+1).padStart(2,"0")}</div><div className="note-body"><div><b>{e.name}</b><span>{timeAgo(e.createdAt)}</span></div><p>{e.msg}</p></div><button onClick={()=>del(e)} aria-label="삭제"><Trash2 size={15}/></button></article>)}{entries.length===0&&<p className="empty-note">아직 남겨진 메시지가 없습니다.</p>}{hasMore&&<button className="load-more" onClick={loadMore}>LOAD MORE</button>}</div>
    </section>
  </main>
}

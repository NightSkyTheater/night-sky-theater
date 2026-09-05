import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import TopTab from "./components/TopTab";
import HomeTab from "./components/HomeTab";
import AboutTab from "./components/AboutTab";
import MusicTab from "./components/MusicTab";
import GuestbookTab from "./components/GuestbookTab";
import ContactTab from "./components/ContactTab";

export default function App(){
  const [tab,setTab]=useState("home");
  const [entries,setEntries]=useState([]); const [lastDoc,setLastDoc]=useState(null); const [hasMore,setHasMore]=useState(true);
  const loadGuestbook=async()=>{try{const q=query(collection(db,"guestbook"),orderBy("createdAt","desc"),limit(10));const s=await getDocs(q);setEntries(s.docs.map(d=>({id:d.id,...d.data()})));setLastDoc(s.docs.at(-1)||null);setHasMore(s.docs.length===10);}catch(e){console.error(e);}};
  const loadMore=async()=>{if(!lastDoc)return;const q=query(collection(db,"guestbook"),orderBy("createdAt","desc"),startAfter(lastDoc),limit(10));const s=await getDocs(q);setEntries(v=>[...v,...s.docs.map(d=>({id:d.id,...d.data()}))]);setLastDoc(s.docs.at(-1)||lastDoc);if(s.docs.length<10)setHasMore(false);};
  useEffect(()=>{loadGuestbook();},[]);

  return <div className="app"><TopTab tab={tab} setTab={setTab}/>{tab==="home"&&<HomeTab setTab={setTab}/>} {tab==="about"&&<AboutTab setTab={setTab}/>} {tab==="music"&&<MusicTab/>} {tab==="community"&&<GuestbookTab entries={entries} loadMore={loadMore} hasMore={hasMore} loadGuestbook={loadGuestbook}/>} {tab==="contact"&&<ContactTab/>}<footer className="site-footer"><div className="page-shell"><div><b>NIGHT SKY THEATER</b><span>Independent Music Label / Creative Studio</span></div><div><span>SEOUL · SOUTH KOREA</span><span>© 2026 NIGHT SKY THEATER</span></div></div></footer></div>;
}

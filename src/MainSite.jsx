import React, { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "./firebase";

import { INK } from "./theme";
import { Stars } from "./components/Common";
import GNB from "./components/GNB";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Label from "./pages/Label";
import Music from "./pages/Music";
import Community from "./pages/Community";
import Contact from "./pages/Contact";

export default function App() {
  const [tab, setTab] = useState("HOME");
  const scrollPositions = useRef({});

  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const changeTab = (nextTab) => {
    scrollPositions.current[tab] = window.scrollY;
    setTab(nextTab);
  };

  const loadGuestbook = async () => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"), limit(10));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setGuestbookEntries(data);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length >= 10);
  };

  useEffect(() => {
    loadGuestbook();
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositions.current[tab] ?? 0);
    });
  }, [tab]);

  const loadMore = async () => {
    if (!lastDoc) return;
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(10));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setGuestbookEntries((prev) => [...prev, ...data]);
    if (snapshot.docs.length > 0) setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    if (snapshot.docs.length < 10) setHasMore(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: INK, color: "#F4F2FA", fontFamily: "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
        @keyframes tw { from{opacity:.05} to{opacity:.65} }
        @keyframes fin { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        body { margin:0; }
        textarea::placeholder, input::placeholder { color:rgba(255,255,255,0.32) }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:rgba(184,255,0,0.16);border-radius:3px }
        strong { font-weight:800 }
        @media (max-width: 760px) {
          .gnb-desktop { display: none !important; }
          .gnb-burger { display: flex !important; }
        }
      `}</style>
      <Stars />

      <GNB tab={tab} setTab={changeTab} />

      <div style={{ position: "relative", zIndex: 1, animation: "fin 0.3s ease both" }} key={tab}>
        {tab === "HOME" && <Home setTab={changeTab} />}
        {tab === "LABEL" && <Label />}
        {tab === "MUSIC" && <Music />}
        {tab === "COMMUNITY" && (
          <Community entries={guestbookEntries} loadMore={loadMore} hasMore={hasMore} loadGuestbook={loadGuestbook} />
        )}
        {tab === "CONTACT" && <Contact />}
        <Footer setTab={changeTab} />
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

import { MOBILE_SHELL_WIDTH, TOP_NAV_HEIGHT, NAV_ITEMS } from "./theme";
import { Stars } from "./components/Common";
import TopTab from "./components/TopTab";
import HomeTab from "./components/HomeTab";
import MusicTab from "./components/MusicTab";
import GuestbookTab from "./components/GuestbookTab";

// ── APP (메인 컴포넌트 단일 Export Default) ───────────────────
export default function App() {
  const [tab, setTab] = useState(NAV_ITEMS[0].id);
  const scrollPositions = useRef({});
  // 💡 방명록 데이터를 최상위 App에서 관리하여 앱이 켜지자마자 미리 로딩합니다.
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const changeTab = (nextTab) => {
    // 현재 탭 위치 저장
    scrollPositions.current[tab] = window.scrollY;

    // 탭 변경
    setTab(nextTab);
  };

  // Chart.js 로드용 useEffect
  useEffect(() => {
    if (document.querySelector('script[src*="chart.umd.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    document.head.appendChild(s);
  }, []);

  const loadGuestbook = async () => {
    const q = query(
      collection(db, "guestbook"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setGuestbookEntries(data);

    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

    // 항상 초기화
    setHasMore(true);

    if (snapshot.docs.length < 10) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadGuestbook();
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(
        0,
        scrollPositions.current[tab] ?? 0
      );
    });
  }, [tab]);

  // 🎵 뮤직탭 전용: 탑 nav 아래 영역을 화면에 고정시키는 동안
  //    바디 자체 스크롤(바운스 포함)도 잠가서 콘텐츠가 위/아래로 밀리지 않게 합니다.
  useEffect(() => {
    if (tab === NAV_ITEMS[1].id) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [tab]);

  const loadMore = async () => {
    if (!lastDoc) return;

    const q = query(
      collection(db, "guestbook"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(10)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setGuestbookEntries((prev) => [...prev, ...data]);

    // 마지막 문서 저장
    if (snapshot.docs.length > 0) {
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    }

    // 더 가져올 데이터가 없으면 버튼 숨김
    if (snapshot.docs.length < 10) {
      setHasMore(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0e0a2e", color: "#fff", fontFamily: "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @keyframes tw    { from{opacity:.05} to{opacity:.65} }
        @keyframes fin   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cdspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideUpIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDownIn { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        body { font-family:'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif; text-align:left; margin:0; }
        p, span, div { text-align:inherit; }
        textarea::placeholder, input::placeholder { color:rgba(255,255,255,0.3) }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:rgba(184,255,0,0.16);border-radius:3px }
        strong { font-weight:800 }
      `}</style>
      <Stars />

      <TopTab
        tab={tab}
        setTab={changeTab}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: MOBILE_SHELL_WIDTH, margin: "0 auto", display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            padding:
              tab === NAV_ITEMS[0].id
                ? `${TOP_NAV_HEIGHT}px 0 60px`
                : tab === NAV_ITEMS[1].id
                  ? 0 // 뮤직탭은 아래 고정 레이어가 자체적으로 위치를 잡으므로 부모 패딩 불필요
                  : tab === NAV_ITEMS[2].id
                    ? `${TOP_NAV_HEIGHT + 12}px 14px 40px`
                    : `${TOP_NAV_HEIGHT + 12}px 14px 60px`,
            animation: "fin 0.3s ease both"
          }}
        >
          <div style={{ display: tab === NAV_ITEMS[0].id ? "block" : "none" }}>
            <HomeTab />
          </div>

          {/* 🎵 뮤직탭: 탑 nav 바로 아래부터 화면 하단까지 고정 영역.
              페이지 스크롤과 완전히 분리되어, 콘텐츠가 스크롤되어도 nav가 밀리거나
              콘텐츠가 화면 밖으로 흘러내려가지 않습니다. */}
          <div
            style={{
              display: tab === NAV_ITEMS[1].id ? "block" : "none",
              position: "fixed",
              top: TOP_NAV_HEIGHT,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: MOBILE_SHELL_WIDTH,
              padding: "12px 14px 30px",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <MusicTab />
          </div>

          <div style={{ display: tab === NAV_ITEMS[2].id ? "block" : "none" }}>
            {/* 💡 미리 로드한 데이터(entries)를 GuestbookTab에 전달합니다. */}
            <GuestbookTab
              entries={guestbookEntries}
              loadMore={loadMore}
              hasMore={hasMore}
              loadGuestbook={loadGuestbook}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
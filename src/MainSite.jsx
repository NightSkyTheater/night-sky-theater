import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

import TopTab from "./components/TopTab";
import HomeTab from "./components/HomeTab";
import AboutTab from "./components/AboutTab";
import MusicTab from "./components/MusicTab";
import GuestbookTab from "./components/GuestbookTab";
import ContactTab from "./components/ContactTab";

export default function MainSite() {
  const [tab, setTab] = useState("home");

  const [entries, setEntries] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadGuestbook = async () => {
    try {
      const q = query(
        collection(db, "guestbook"),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEntries(data);
      setLastDoc(snapshot.docs.at(-1) || null);
      setHasMore(snapshot.docs.length === 10);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = async () => {
    if (!lastDoc) return;

    try {
      const q = query(
        collection(db, "guestbook"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(10)
      );

      const snapshot = await getDocs(q);

      const newEntries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEntries((prev) => [...prev, ...newEntries]);

      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs.at(-1));
      }

      if (snapshot.docs.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadGuestbook();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [tab]);

  return (
    <div className="app">
      <TopTab tab={tab} setTab={setTab} />

      {tab === "home" && <HomeTab setTab={setTab} />}

      {tab === "about" && <AboutTab setTab={setTab} />}

      {tab === "music" && <MusicTab />}

      {tab === "community" && (
        <GuestbookTab
          entries={entries}
          loadMore={loadMore}
          hasMore={hasMore}
          loadGuestbook={loadGuestbook}
        />
      )}

      {tab === "contact" && <ContactTab />}

      <footer className="site-footer">
        <div className="page-shell">
          <div>
            <b>NIGHT SKY THEATER</b>
            <span>Independent Music Label / Creative Studio</span>
          </div>

          <div>
            <span>SEOUL · SOUTH KOREA</span>
            <span>© 2026 NIGHT SKY THEATER</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
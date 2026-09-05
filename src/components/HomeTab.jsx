import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { ALBUMS, ALL_TRACKS, NEWS_ITEMS, RELEASE_SCHEDULE, SUB_DATA } from "../data";
import { SectionTitle, formatCompact } from "./Common";

const HERO_IMAGE = "https://down.mixtape.so/NAS/img/b/d/d/c/bddc807264d156fa82fd1a98208a4856.png";

export default function HomeTab({ setTab }) {
  const [liveSubs, setLiveSubs] = useState(null);
  const latest = ALBUMS[ALBUMS.length - 1];
  const featured = useMemo(() => [...ALBUMS].slice(-6).reverse(), []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const key = import.meta.env.VITE_YOUTUBE_API_KEY;
        if (!key) return;
        const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${key}`);
        const data = await res.json();
        if (data.items?.[0]) setLiveSubs(Number(data.items[0].statistics.subscriberCount));
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, []);

  return (
    <main>
      <section className="hero-corporate">
        <img className="hero-media" src={HERO_IMAGE} alt="밤하늘극장" />
        <div className="hero-overlay" />
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <span className="hero-label">INDEPENDENT MUSIC LABEL · SEOUL</span>
            <h1>WE MAKE<br /><em>STORIES</em> SOUND.</h1>
            <p>밤하늘극장은 음악과 서사, 비주얼을 하나의 세계관으로 설계하는 독립 뮤직 레이블이자 크리에이티브 스튜디오입니다.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => setTab("music")}>EXPLORE RELEASES <ArrowRight size={16} /></button>
              <button className="btn ghost" onClick={() => setTab("about")}>ABOUT THE LABEL</button>
            </div>
          </div>
          <div className="hero-index">
            <span>EST. 2025</span><span>SEOUL, KR</span><span>VIRTUAL ARTIST PROJECT</span>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="page-shell stats-grid">
          {[
            [formatCompact(liveSubs ?? SUB_DATA.at(-1)?.subs), "YOUTUBE SUBSCRIBERS"],
            [ALBUMS.length, "RELEASES"],
            [ALL_TRACKS.length, "ORIGINAL TRACKS"],
            ["KR / JP", "LANGUAGE PROJECTS"],
          ].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="section page-shell latest-section">
        <SectionTitle kicker="LATEST RELEASE" title="완전한 무조건적 사랑의 형태" body="사랑이라는 감정이 도달할 수 있는 가장 깊고 숭고한 경지, ‘조건 없음’에 대하여." />
        <div className="latest-layout">
          <div className="latest-cover-wrap"><img src={latest.cover} alt={latest.title} /><span className="release-stamp">OUT NOW</span></div>
          <div className="latest-info">
            <p className="release-meta">NST · 2026 · {latest.tracks.length} TRACKS</p>
            <h3>{latest.title}</h3>
            <p>{latest.desc}</p>
            <ol>{latest.tracks.map(t => <li key={t.n}><span>0{t.n}</span><b>{t.title}</b></li>)}</ol>
            <button className="text-link" onClick={() => setTab("music")}>VIEW RELEASE <ArrowRight size={15}/></button>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="page-shell">
          <SectionTitle kicker="SELECTED CATALOG" title="Music that stays after the night." body="청춘, 사랑, 상실, 삶과 죽음. 밤하늘극장의 카탈로그는 한 사람의 밤을 오래 비추는 이야기에서 출발합니다." action={<button className="text-link" onClick={() => setTab("music")}>ALL RELEASES <ArrowRight size={15}/></button>} />
          <div className="release-grid">
            {featured.map((album, i) => (
              <button className="release-card" key={`${album.id}-${i}`} onClick={() => setTab("music")}>
                <div className="release-art"><img src={album.cover} alt={album.title}/><span>{String(i + 1).padStart(2,"0")}</span></div>
                <div className="release-card-copy"><h3>{album.title}</h3><p>{album.year} · NIGHT SKY THEATER</p></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-shell manifesto-grid">
        <div className="manifesto-title"><span className="eyebrow">WHAT WE DO</span><h2>FROM A SONG<br/>TO A WORLD.</h2></div>
        <div className="manifesto-list">
          {[
            ["01", "MUSIC PRODUCTION", "작사·작곡·프로듀싱을 중심으로 장르보다 서사와 감정의 밀도를 우선합니다."],
            ["02", "ARTIST & IP", "가상 아티스트 유우레이를 중심으로 음악, 캐릭터, 이야기의 장기적인 IP를 구축합니다."],
            ["03", "VISUAL DIRECTION", "앨범 아트, 리릭 콘텐츠, 뮤직비디오까지 작품의 언어를 하나의 시각 체계로 확장합니다."],
            ["04", "DISTRIBUTION & COLLAB", "국내외 음원 유통과 채널 협업을 통해 독립 프로젝트의 접점을 넓혀갑니다."],
          ].map(([n,t,d]) => <div className="manifesto-item" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>

      <section className="section page-shell news-layout">
        <SectionTitle kicker="UPDATES" title="News & Schedule" />
        <div className="news-columns">
          <div className="news-block"><h3>RELEASE SCHEDULE</h3>{[...RELEASE_SCHEDULE].reverse().slice(0,4).map(n => <div className="news-row" key={n.date+n.title}><span>{n.date}</span><b>{n.title}</b><i>{n.tag}</i></div>)}</div>
          <div className="news-block"><h3>NEWSROOM</h3>{[...NEWS_ITEMS].reverse().slice(0,4).map(n => <div className="news-row" key={n.date+n.title}><span>{n.date}</span><b>{n.title}</b></div>)}</div>
        </div>
      </section>

      <section className="cta-band">
        <div className="page-shell cta-inner">
          <div><Sparkles size={22}/><h2>Let’s make something<br/>worth remembering.</h2></div>
          <button className="btn light" onClick={() => setTab("contact")}>CONTACT US <ArrowRight size={16}/></button>
        </div>
      </section>
    </main>
  );
}

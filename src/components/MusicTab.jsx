import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { ALBUMS } from "../data";

export default function MusicTab() {
  const albums = useMemo(() => [...ALBUMS].reverse(), []);
  const [selected, setSelected] = useState(null);

  return <main className="subpage">
    <section className="page-shell sub-hero releases-hero">
      <span className="eyebrow">DISCOGRAPHY / CATALOG</span>
      <h1>RELEASES</h1>
      <p>밤하늘극장이 지금까지 기록해 온 모든 정규·EP·싱글을 한곳에 모았습니다.</p>
      <div className="catalog-count"><b>{String(albums.length).padStart(2,"0")}</b><span>CATALOG RELEASES</span></div>
    </section>

    <section className="page-shell catalog-grid-section">
      <div className="catalog-grid">
        {albums.map((album, i) => <button className="catalog-card" onClick={()=>setSelected(album)} key={`${album.id}-${i}`}>
          <div className="catalog-art"><img src={album.cover} alt={album.title}/><div className="catalog-hover">VIEW RELEASE <ArrowRight size={15}/></div></div>
          <div className="catalog-copy"><span>{album.year} / NST</span><h3>{album.title}</h3><p>{album.tracks.length} TRACKS</p></div>
        </button>)}
      </div>
    </section>

    {selected && <div className="release-modal" role="dialog" aria-modal="true">
      <button className="modal-close" onClick={()=>setSelected(null)}><X size={22}/></button>
      <div className="modal-backdrop" style={{backgroundImage:`url(${selected.cover})`}}/>
      <div className="modal-content page-shell">
        <div className="modal-art"><img src={selected.cover} alt={selected.title}/></div>
        <div className="modal-info"><span className="eyebrow">{selected.year} · NIGHT SKY THEATER</span><h2>{selected.title}</h2><p className="modal-desc">{selected.desc}</p><div className="tracklist">{selected.tracks.map(t => <div key={t.n}><span>{String(t.n).padStart(2,"0")}</span><div><b>{t.title}</b>{t.mood && <p>{t.mood}</p>}</div></div>)}</div><button className="text-link" onClick={()=>setSelected(null)}><ArrowLeft size={15}/> BACK TO CATALOG</button></div>
      </div>
    </div>}
  </main>
}

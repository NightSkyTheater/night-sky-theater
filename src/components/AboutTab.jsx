import React from "react";
import { PLATFORMS } from "../data";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "./Common";

export default function AboutTab({ setTab }) {
  return <main className="subpage">
    <section className="page-shell sub-hero">
      <span className="eyebrow">ABOUT NIGHT SKY THEATER</span>
      <h1>AN INDEPENDENT LABEL<br/>BUILT AROUND <em>STORY.</em></h1>
      <p>밤하늘극장은 사랑과 시간, 기억, 청춘의 감정을 음악으로 기록하는 독립 레이블입니다. 한 곡을 만드는 데서 끝나지 않고, 작품이 가진 세계와 언어를 오래 남기는 일을 합니다.</p>
    </section>

    <section className="about-image-band"><div className="about-image" /></section>

    <section className="section page-shell two-column-copy">
      <div><span className="eyebrow">OUR POINT OF VIEW</span><h2>아름답기 때문에<br/>노래하는 것이 아니라,<br/>사라지기 때문에 기록합니다.</h2></div>
      <div className="long-copy"><p>밤하늘극장의 음악은 완벽한 사람보다 흔들리는 사람, 거대한 성공보다 오늘을 버텨낸 작은 마음, 영원보다 유한함을 바라봅니다.</p><p>그래서 작품은 ‘좋은 노래’ 한 곡을 넘어서 앨범의 문장, 커버, 캐릭터, 영상, 공연과 아카이브까지 하나의 방향을 갖도록 설계됩니다.</p></div>
    </section>

    <section className="section section-dark"><div className="page-shell"><SectionTitle kicker="ARTIST PROJECT" title="YUREI / 유우레이" body="밤하늘극장 소속의 가상 아티스트 프로젝트. 사랑과 청춘, 삶과 죽음의 경계에서 발견한 감정을 자신만의 언어로 노래합니다."/><div className="artist-panel"><div className="artist-portrait"/><div><span>VIRTUAL ARTIST · VOCAL PROJECT</span><h3>YUREI</h3><p>음원 검색 시에는 아티스트 프로젝트명보다 <b>‘밤하늘극장’</b>으로 검색하시면 발매 작품을 더 정확하게 확인하실 수 있습니다.</p></div></div></div></section>

    <section className="section page-shell"><SectionTitle kicker="STREAMING & SOCIAL" title="Find us everywhere."/><div className="platform-grid">{PLATFORMS.map(p => <a key={p.name} href={`https://${p.url}`} target="_blank" rel="noreferrer"><span>{p.name}</span><ArrowRight size={15}/></a>)}</div></section>

    <section className="cta-band"><div className="page-shell cta-inner"><div><h2>Project, press or collaboration?</h2><p>프로젝트 제안과 협업 문의를 기다립니다.</p></div><button className="btn light" onClick={()=>setTab("contact")}>CONTACT <ArrowRight size={16}/></button></div></section>
  </main>
}

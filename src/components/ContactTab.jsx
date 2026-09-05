import React from "react";
import { Mail, ArrowRight, Instagram, Youtube, Music2 } from "lucide-react";
import { PLATFORMS } from "../data";

export default function ContactTab() {
  const instagram = PLATFORMS.find(p=>p.name==="Instagram");
  return <main className="subpage contact-page">
    <section className="page-shell contact-hero">
      <span className="eyebrow">CONTACT US</span>
      <h1>LET’S CREATE<br/><em>SOMETHING REAL.</em></h1>
      <p>음원·콘텐츠 협업, 플레이리스트/미디어 제안, 유통·프로젝트 관련 문의를 보내주세요.</p>
    </section>
    <section className="page-shell contact-grid">
      <a className="contact-primary" href="mailto:hps_in@naver.com"><div><span>GENERAL / BUSINESS INQUIRY</span><h2>hps_in@naver.com</h2><p>협업 제안 시 프로젝트 개요, 일정, 예산 또는 조건을 함께 적어주시면 보다 빠르게 검토할 수 있습니다.</p></div><Mail size={28}/></a>
      <div className="contact-side">
        <div className="contact-box"><span>BASED IN</span><h3>SEOUL, SOUTH KOREA</h3><p>Independent music label & creative studio</p></div>
        <a className="contact-box link" href={`https://${instagram?.url}`} target="_blank" rel="noreferrer"><span>SOCIAL</span><h3>INSTAGRAM</h3><ArrowRight size={18}/></a>
        <a className="contact-box link" href="https://youtube.com/channel/UCagbKVKMsqoHsD1_LLk2W2w" target="_blank" rel="noreferrer"><span>OFFICIAL CHANNEL</span><h3>YOUTUBE</h3><ArrowRight size={18}/></a>
      </div>
    </section>
    <section className="page-shell contact-note"><span>For press, playlist, distribution, visual production and creative partnerships.</span><b>Night Sky Theater © 2026</b></section>
  </main>
}

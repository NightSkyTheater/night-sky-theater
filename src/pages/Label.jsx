import React from "react";
import { ACCENT, FADE, HAIRLINE, LABEL_INFO, MONO, PAPER, SITE_MAX, VIOLET } from "../theme";
import { OVERSEAS, SUB_DATA } from "../data";
import { SectionHead } from "../components/Common";
import SubscriberChart from "../components/SubscriberChart";

export default function Label() {
  return (
    <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "148px 20px 80px" }}>
      {/* ── 미션 ─────────────────────────────── */}
      <div style={{ maxWidth: 620 }}>
        <p style={{ fontFamily: MONO, fontSize: 12.5, color: ACCENT, margin: "0 0 18px" }}>LABEL</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: PAPER, letterSpacing: "-0.02em", lineHeight: 1.3, margin: "0 0 20px" }}>
          우리는 눈에 보이지 않는 감정에
          <br />
          형태를 만들어주는 일을 합니다.
        </h1>
        <p style={{ fontSize: 14.5, color: FADE, lineHeight: 1.9, margin: 0 }}>
          {LABEL_INFO.name}은 사랑, 청춘, 상실, 기억처럼 말로 다 담기 어려운 감정들을
          음악으로 옮기는 버추얼 인디 레이블입니다. {LABEL_INFO.founded}년 시작한 이래,
          가상의 아티스트를 통해 오히려 더 솔직하고 보편적인 이야기를 전하고자 합니다.
          현재 음원은 {LABEL_INFO.distributor}를 통해 유통되고 있습니다.
        </p>
      </div>

      {/* ── 아티스트 로스터 ─────────────────────────── */}
      <div style={{ marginTop: 90 }}>
        <SectionHead index="ROSTER" title="아티스트" />
        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            padding: 28,
            borderRadius: 20,
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          <img
            src="https://yt3.googleusercontent.com/GcJswGDJvAePBqoBSXrr3J5UCFX-IW3zmjyioyEGsltfXr5nX63rB51QQWZXNV5sl0IclJK5=s160-c-k-c0x00ffffff-no-rj"
            alt="유우레이"
            style={{ width: 108, height: 108, borderRadius: 16, objectFit: "cover", flexShrink: 0, border: `1px solid ${HAIRLINE}` }}
          />
          <div style={{ flex: "1 1 260px", minWidth: 240 }}>
            <p style={{ fontFamily: MONO, fontSize: 11, color: VIOLET, margin: "0 0 6px" }}>VOCAL · LYRICS</p>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: PAPER, margin: "0 0 10px" }}>유우레이</h3>
            <p style={{ fontSize: 13.5, color: FADE, lineHeight: 1.8, margin: 0 }}>
              가상의 한·일 혼혈 여성 솔로 아티스트. 사랑과 청춘, 삶의 감정을 자신만의 시선으로
              노래하며, {LABEL_INFO.name}의 모든 음원과 작품에서 목소리와 가사를 맡고 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── 성장 지표 ─────────────────────────── */}
      <div style={{ marginTop: 90 }}>
        <SectionHead index="GROWTH" title="채널 성장 추이" desc="최근 7개월간 유튜브 구독자 추이입니다." />
        <div style={{ padding: 28, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: `1px solid ${HAIRLINE}` }}>
          <SubscriberChart data={SUB_DATA} />
        </div>
      </div>

      {/* ── 해외 청취 비율 ─────────────────────────── */}
      <div style={{ marginTop: 90, marginBottom: 40 }}>
        <SectionHead index="AUDIENCE" title="청취자 지역 분포" desc="전체 청취의 절반 이상이 해외에서 발생합니다." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {OVERSEAS.map((o) => (
            <div key={o.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: PAPER, width: 88, flexShrink: 0 }}>{o.name}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{ width: `${o.pct}%`, height: "100%", background: ACCENT, borderRadius: 4 }} />
              </div>
              <span style={{ fontFamily: MONO, fontSize: 12, color: FADE, width: 46, textAlign: "right", flexShrink: 0 }}>{o.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

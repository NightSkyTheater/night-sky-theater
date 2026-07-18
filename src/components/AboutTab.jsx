import React from "react";
import { ACCENT, LIME, muted, soft, white } from "../theme";
import { PLATFORMS } from "../data";
import { G, Hr, SecHead } from "./Common";

export default function AboutTab() {
  const Hero = (
    <G
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "34px 22px"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(184,255,0,.10), transparent 70%)",
          pointerEvents: "none"
        }}
      />

<img
  src="https://yt3.googleusercontent.com/GcJswGDJvAePBqoBSXrr3J5UCFX-IW3zmjyioyEGsltfXr5nX63rB51QQWZXNV5sl0IclJK5=s160-c-k-c0x00ffffff-no-rj"
  alt="밤하늘극장"
  style={{
    width:90,
    height:90,
    borderRadius:"50%",
    objectFit:"cover",
    margin:"0 auto 18px",
    display:"block",
    border:"1px solid rgba(184,255,0,.18)",
    boxShadow:
      "0 0 40px rgba(184,255,0,.18), 0 0 80px rgba(91,79,245,.12)",
    animation:"floatHero 4s ease-in-out infinite"
  }}
/>

      <p
        style={{
          fontSize: 11,
          color: LIME,
          fontWeight: 700,
          margin: "0 0 6px",
          letterSpacing: "0.12em"
        }}
      >
        NIGHT SKY THEATER
      </p>

      <h2
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: white,
          letterSpacing: "-0.04em",
          margin: "0 0 6px"
        }}
      >
        밤하늘극장
      </h2>

      <p
        style={{
          fontSize: 12,
          color: muted,
          margin: "0 0 14px"
        }}
      >
        @NightSkyTheater
      </p>

<Hr my={14} />

<div
  style={{
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    textAlign: "left"
  }}
>
  <div
    style={{
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)"
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: 13,
        lineHeight: 1.9,
        color: soft
      }}
    >
      <span style={{ color: ACCENT, fontWeight: 800 }}>
        밤하늘극장
      </span>
      은 사랑과 시간, 그리고 기억에 깃든 감정을 섬세하게
      노래하는 <strong>가상 인디 밴드</strong>입니다.
    </p>
  </div>

  <div
    style={{
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)"
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: 13,
        lineHeight: 1.9,
        color: soft
      }}
    >
      소속 아티스트인
      <span style={{ color: "#8ab4ff", fontWeight: 800 }}>
        {" "}유우레이
      </span>
      는 가상의 <strong>한·일 혼혈 여성 솔로 아티스트</strong>
      로,<br />사랑과 청춘, 삶의 감정을 자신만의 시선으로
      노래하고 있습니다.
    </p>
  </div>

  <div
    style={{
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(184,255,0,0.06)",
      border: "1px solid rgba(184,255,0,0.15)"
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: 13,
        lineHeight: 1.8,
        color: white,
        fontWeight: 400
      }}
    >
      🔍 음원 검색 시에는
      <span style={{ color: ACCENT }}>
        {" "}‘밤하늘극장’
      </span>
      으로 검색해 주셔야 관련 음원과 작품들을 확인하실 수 있습니다.
    </p>
  </div>
</div>
  </G>
);

  const Streaming = (
    <G>
      <SecHead title="링크" sub="Streaming & Social" />

      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 10
        }}
      >
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={"https://" + p.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 30px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              textDecoration: "none",
              transition: "all .2s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.borderColor = p.color + "66";
              e.currentTarget.style.background = p.color + "10";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.06)";
              e.currentTarget.style.background =
                "rgba(255,255,255,0.04)";
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 5,
                background: p.color
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0
              }}
            >

              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 800,
                  color: white
                }}
              >
                {p.name}
              </p>
            </div>

            <span
              style={{
                color: "rgba(255,255,255,.4)",
                fontSize: 14,
                fontWeight: 700
              }}
            >
              →
            </span>
          </a>
        ))}
      </div>
    </G>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: "100%",
        margin: "0 auto"
      }}
    >
      {Hero}
      {Streaming}
    </div>
  );
}

import React from "react";
import { ACCENT } from "./theme";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08090B",
        color: "#F5F7F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 18px",
            color: ACCENT,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.2em",
          }}
        >
          NIGHT SKY THEATER
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(42px, 8vw, 92px)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
            fontWeight: 900,
          }}
        >
          UNDER
          <br />
          CONSTRUCTION
        </h1>

        <div
          style={{
            width: 52,
            height: 3,
            background: ACCENT,
            margin: "30px auto",
          }}
        />

        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(255,255,255,.68)",
          }}
        >
          밤하늘극장 공식 홈페이지를 새롭게 준비하고 있습니다.
          <br />
          더 나은 모습으로 곧 다시 찾아뵙겠습니다.
        </p>

        <a
          href="mailto:hps_in@naver.com"
          style={{
            display: "inline-block",
            marginTop: 36,
            color: "#F5F7F8",
            textDecoration: "none",
            fontSize: 13,
            borderBottom: `1px solid ${ACCENT}`,
            paddingBottom: 4,
          }}
        >
          CONTACT — hps_in@naver.com
        </a>

        <p
          style={{
            margin: "70px 0 0",
            fontSize: 10,
            color: "rgba(255,255,255,.28)",
            letterSpacing: "0.08em",
          }}
        >
          © 2026 NIGHT SKY THEATER
        </p>
      </div>
    </div>
  );
}
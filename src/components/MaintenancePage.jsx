import React from "react";

const ACCENT = "#B8FF00";
const BG = "#08090B";
const MUTED = "rgba(255,255,255,.52)";
const SOFT = "rgba(255,255,255,.72)";
const WHITE = "#F5F7F8";

export default function MaintenancePage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        background: BG,
        color: WHITE,
        fontFamily:
          "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,255,0,.07) 0%, rgba(184,255,0,.025) 35%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 75%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 75%, transparent)",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px clamp(22px, 5vw, 72px)",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            NIGHT SKY THEATER
          </div>

          <div
            style={{
              marginTop: 4,
              color: MUTED,
              fontSize: 9,
              letterSpacing: "0.16em",
            }}
          >
            MUSIC LABEL · CREATIVE STUDIO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: MUTED,
            fontSize: 10,
            letterSpacing: "0.08em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              display: "inline-block",
              borderRadius: "50%",
              background: ACCENT,
              boxShadow: `0 0 12px ${ACCENT}`,
            }}
          />
          WEBSITE UPDATE
        </div>
      </header>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 100px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 22px",
              color: ACCENT,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.22em",
            }}
          >
            CURRENTLY REBUILDING
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(48px, 10vw, 132px)",
              lineHeight: 0.88,
              fontWeight: 900,
              letterSpacing: "-0.075em",
              color: WHITE,
            }}
          >
            THE THEATER
            <br />
            IS GETTING
            <br />
            <span style={{ color: ACCENT }}>A NEW STAGE.</span>
          </h1>

          <p
            style={{
              maxWidth: 590,
              margin: "42px auto 0",
              color: SOFT,
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.9,
              wordBreak: "keep-all",
            }}
          >
            밤하늘극장 공식 홈페이지를 새롭게 준비하고 있습니다.
            <br />
            음악과 이야기가 머무를 새로운 공간으로 곧 다시 찾아뵙겠습니다.
          </p>

          <div
            style={{
              width: 1,
              height: 54,
              margin: "38px auto",
              background:
                "linear-gradient(to bottom, rgba(184,255,0,.9), rgba(184,255,0,0))",
            }}
          />

          <a
            href="mailto:hps_in@naver.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 20px",
              border: "1px solid rgba(255,255,255,.14)",
              color: WHITE,
              textDecoration: "none",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            CONTACT US&nbsp;&nbsp;→
          </a>
        </div>
      </section>

      <footer
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: "26px clamp(22px, 5vw, 72px)",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          color: MUTED,
          fontSize: 9,
          letterSpacing: "0.08em",
          zIndex: 2,
        }}
      >
        <span>© 2026 NIGHT SKY THEATER</span>
        <span>SEOUL · SOUTH KOREA</span>
      </footer>
    </main>
  );
}

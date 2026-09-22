import React from "react";

const DEMOS = {
  "260831": {
    title: "쓸쓸한 어른이 되어버렸거든요",
    artist: "밤하늘극장",
    file: "/music/260831.wav",
  },

  "260913": {
    title: "너에게 나는 왜 사랑이 아니었을까",
    artist: "밤하늘극장",
    file: "/music/260913.wav",
  },
    "261109": {
    title: "선택할 수 있는 건 하나도 없는데",
    artist: "밤하늘극장",
    file: "/music/261109.wav",
  },
      "261123": {
    title: "지친 나를 충전해줘",
    artist: "밤하늘극장",
    file: "/music/261123.wav",
  },
};

export default function DemoPage() {
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get("track");

  const demo = DEMOS[trackId];

  if (!demo) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0e0a2e",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#b8ff00",
              fontWeight: 700,
            }}
          >
            NIGHT SKY THEATER
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: 22,
            }}
          >
            데모 파일을 찾을 수 없습니다.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0a2e",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        {/* 상단 */}
        <header
          style={{
            marginBottom: 38,
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#b8ff00",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.17em",
            }}
          >
            NIGHT SKY THEATER · DEMO
          </p>

          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1.35,
              letterSpacing: "-0.045em",
              wordBreak: "keep-all",
            }}
          >
            {demo.title}
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "rgba(255,255,255,0.42)",
              fontSize: 12,
            }}
          >
            {demo.artist}
          </p>
        </header>

        {/* 오디오 */}
        <section>
          <audio
            controls
            preload="metadata"
            src={demo.file}
            style={{
              display: "block",
              width: "100%",
            }}
          />

          {/* 다운로드 */}
          <a
            href={demo.file}
            download={`${demo.artist} - ${demo.title}.wav`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              minHeight: 52,
              borderRadius: 12,
              background: "#b8ff00",
              color: "#080510",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            WAV 다운로드
          </a>
        </section>

        {/* 안내 */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.28)",
              fontSize: 10,
              lineHeight: 1.8,
              wordBreak: "keep-all",
            }}
          >
            본 음원은 유통 및 관계자 검토를 위한 데모 파일입니다.
            <br />
            무단 배포 및 재업로드를 금합니다.
          </p>
        </div>

        {/* footer */}
        <footer
          style={{
            marginTop: 55,
            color: "rgba(255,255,255,0.15)",
            fontSize: 8,
            letterSpacing: "0.1em",
          }}
        >
          © 2026 NIGHT SKY THEATER
        </footer>
      </main>
    </div>
  );
}
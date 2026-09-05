
import React from "react";
import { Mail, ArrowRight, Music2 } from "lucide-react";
import { ACCENT, muted, soft, white } from "../theme";
import { PLATFORMS } from "../data";

export default function ContactTab() {
  const instagram = PLATFORMS.find((p) => p.name === "Instagram");
  const youtubeMusic = PLATFORMS.find((p) => p.name === "YouTube Music");

  const links = [
    {
      label: "Instagram",
      href: instagram ? `https://${instagram.url}` : "#",
      icon: <Music2 size={18} strokeWidth={1.8} />,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@NightSkyTheater",
      icon: <Music2 size={18} strokeWidth={1.8} />,
    },
    {
      label: "YouTube Music",
      href: youtubeMusic ? `https://${youtubeMusic.url}` : "#",
      icon: <Music2 size={18} strokeWidth={1.8} />,
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "150px 24px 100px",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.3fr) minmax(320px, 0.7fr)",
          gap: 80,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        <section>
          <p
            style={{
              margin: "0 0 20px",
              color: ACCENT,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.18em",
            }}
          >
            CONTACT US
          </p>

          <h1
            style={{
              margin: 0,
              maxWidth: 850,
              color: white,
              fontSize: "clamp(48px, 7vw, 100px)",
              lineHeight: 0.98,
              letterSpacing: "-0.06em",
              fontWeight: 900,
            }}
          >
            LET&apos;S MAKE
            <br />
            SOMETHING
            <br />
            <span style={{ color: ACCENT }}>MEMORABLE.</span>
          </h1>

          <p
            style={{
              maxWidth: 650,
              margin: "42px 0 0",
              fontSize: 17,
              lineHeight: 1.85,
              color: soft,
            }}
          >
            밤하늘극장은 음악 제작, 아티스트 및 콘텐츠 협업,
            플레이리스트·미디어 제휴, 유통과 비주얼 프로젝트에 열려 있습니다.
            함께 만들고 싶은 이야기가 있다면 언제든 연락해주세요.
          </p>
        </section>

        <aside
          style={{
            borderTop: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              padding: "28px 0",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <p
              style={{
                margin: "0 0 12px",
                color: muted,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              GENERAL / BUSINESS INQUIRY
            </p>

            <a
              href="mailto:hps_in@naver.com"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                color: white,
                textDecoration: "none",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Mail size={19} strokeWidth={1.8} />
                hps_in@naver.com
              </span>

              <ArrowRight size={18} />
            </a>
          </div>

          <div
            style={{
              padding: "28px 0",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <p
              style={{
                margin: "0 0 18px",
                color: muted,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              SOCIAL
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: soft,
                    textDecoration: "none",
                    fontSize: 15,
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    {item.icon}
                    {item.label}
                  </span>

                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ padding: "28px 0" }}>
            <p
              style={{
                margin: "0 0 10px",
                color: muted,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              BASED IN
            </p>

            <p
              style={{
                margin: 0,
                color: white,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Seoul, South Korea
            </p>
          </div>
        </aside>
      </div>

      <div
        style={{
          marginTop: 120,
          paddingTop: 26,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, fontSize: 11, color: muted }}>
          © 2026 NIGHT SKY THEATER. ALL RIGHTS RESERVED.
        </p>

        <p style={{ margin: 0, fontSize: 11, color: muted }}>
          MUSIC LABEL & CREATIVE STUDIO
        </p>
      </div>
    </main>
  );
}
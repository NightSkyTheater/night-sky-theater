import React from "react";
import { FADE, HAIRLINE, LABEL_INFO, MONO, PAPER, SITE_MAX } from "../theme";
import { PLATFORMS } from "../data";

export default function Footer({ setTab }) {
  return (
    <div style={{ borderTop: `1px solid ${HAIRLINE}`, marginTop: 60 }}>
      <div
        style={{
          maxWidth: SITE_MAX,
          margin: "0 auto",
          padding: "48px 20px 28px",
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: 320 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: PAPER, margin: "0 0 8px" }}>{LABEL_INFO.name}</p>
          <p style={{ fontSize: 12.5, color: FADE, lineHeight: 1.8, margin: 0 }}>{LABEL_INFO.tagline}</p>
          <p style={{ fontFamily: MONO, fontSize: 11, color: FADE, margin: "14px 0 0" }}>
            유통 · {LABEL_INFO.distributor}
          </p>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, color: FADE, fontWeight: 700, margin: "0 0 12px", fontFamily: MONO }}>SITE</p>
            {["HOME", "LABEL", "MUSIC", "COMMUNITY", "CONTACT"].map((id) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: PAPER, fontSize: 13, fontFamily: "inherit", padding: "4px 0", opacity: 0.85 }}
              >
                {id}
              </button>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, color: FADE, fontWeight: 700, margin: "0 0 12px", fontFamily: MONO }}>LINKS</p>
            {PLATFORMS.slice(0, 5).map((p) => (
              <a
                key={p.name}
                href={"https://" + p.url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", color: PAPER, fontSize: 13, textDecoration: "none", padding: "4px 0", opacity: 0.85 }}
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${HAIRLINE}`,
          padding: "18px 20px",
          maxWidth: SITE_MAX,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p style={{ fontSize: 11, color: FADE, margin: 0 }}>© 2026 {LABEL_INFO.nameEn}. All rights reserved.</p>
        <a href={`mailto:${LABEL_INFO.email}`} style={{ fontSize: 11, color: FADE, textDecoration: "none" }}>
          {LABEL_INFO.email}
        </a>
      </div>
    </div>
  );
}

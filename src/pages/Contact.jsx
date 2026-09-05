import React, { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { ACCENT, FADE, HAIRLINE, LABEL_INFO, MONO, PAPER, SITE_MAX } from "../theme";
import { PLATFORMS } from "../data";
import { SectionHead } from "../components/Common";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    const subject = encodeURIComponent(`[${LABEL_INFO.name}] ${form.name}님의 문의`);
    const body = encodeURIComponent(`보낸 사람: ${form.name} (${form.email})\n\n${form.message}`);
    window.location.href = `mailto:${LABEL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: `1px solid ${HAIRLINE}`,
    borderRadius: 12,
    color: PAPER,
    padding: "13px 15px",
    fontSize: 13.5,
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: SITE_MAX, margin: "0 auto", padding: "140px 20px 100px" }}>
      <SectionHead index="CONTACT" title="함께 이야기해요" desc="협업, 음원 관련 문의, 그 밖의 이야기 무엇이든 편하게 남겨주세요." />

      <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
        {/* 직접 연락처 */}
        <div style={{ flex: "1 1 260px", minWidth: 240 }}>
          <p style={{ fontFamily: MONO, fontSize: 11, color: FADE, margin: "0 0 14px" }}>DIRECT</p>
          <a
            href={`mailto:${LABEL_INFO.email}`}
            style={{ display: "flex", alignItems: "center", gap: 10, color: PAPER, textDecoration: "none", fontSize: 15, fontWeight: 700, marginBottom: 28 }}
          >
            <Mail size={17} color={ACCENT} /> {LABEL_INFO.email}
          </a>

          <p style={{ fontFamily: MONO, fontSize: 11, color: FADE, margin: "0 0 14px" }}>SOCIAL</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PLATFORMS.filter((p) => ["Instagram", "Facebook", "TikTok"].includes(p.name)).map((p) => (
              <a
                key={p.name}
                href={"https://" + p.url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: PAPER, textDecoration: "none", fontSize: 14, padding: "10px 0", borderBottom: `1px solid ${HAIRLINE}` }}
              >
                {p.name} <ArrowRight size={14} color={FADE} />
              </a>
            ))}
          </div>
        </div>

        {/* 문의 폼 */}
        <div style={{ flex: "2 1 360px", minWidth: 300 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input value={form.name} onChange={set("name")} placeholder="이름" style={{ ...inputStyle, flex: "1 1 140px" }} />
              <input value={form.email} onChange={set("email")} placeholder="이메일" type="email" style={{ ...inputStyle, flex: "1 1 180px" }} />
            </div>
            <textarea
              value={form.message}
              onChange={set("message")}
              placeholder="메시지를 남겨주세요"
              rows={6}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
            <button
              onClick={send}
              style={{
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 24px",
                borderRadius: 12,
                background: ACCENT,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: 13.5,
                color: "#05040C",
              }}
            >
              메일 보내기 <ArrowRight size={15} />
            </button>
            <p style={{ fontSize: 11.5, color: FADE, margin: "4px 0 0" }}>
              보내기 버튼을 누르면 기본 메일 앱이 열립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

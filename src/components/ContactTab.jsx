import React, { useState } from "react";
import { ACCENT, MUTED, WHITE } from "../theme";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactTab() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "협업",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(
        "https://formspree.io/f/xgaelyep",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            이름: form.name,
            이메일: form.email,
            문의유형: form.category,
            문의내용: form.message,
            _subject: `[밤하늘극장 문의] ${form.category} - ${form.name}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("문의 전송 실패");
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        category: "협업",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const fieldStyle = {
    width: "100%",
    height: 52,
    padding: "0 15px",
    background: "#08090b",
    border: "1px solid rgba(255,255,255,0.14)",
    color: WHITE,
    outline: "none",
    borderRadius: 0,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "180px 24px 100px",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div className="contact-grid">
        {/* LEFT */}
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
              color: WHITE,
              fontSize: "clamp(58px, 7vw, 100px)",
              lineHeight: 0.98,
              letterSpacing: "-0.06em",
              fontWeight: 900,
            }}
          >
            LET&apos;S MAKE
            <br />
            SOMETHING
            <br />
            <span style={{ color: ACCENT }}>
              MEMORABLE.
            </span>
          </h1>

          <div
            className="hero-copy"
            style={{ marginTop: 28 }}
          >
            <p>
              밤하늘극장은 음악 제작, 아티스트 및 콘텐츠
              협업과 제휴에 열려 있습니다.
            </p>

            <p>
              함께 만들고 싶은 이야기가 있다면 언제든
              연락해주세요.
            </p>
          </div>
        </section>

        {/* RIGHT / CONTACT FORM */}
        <aside
          style={{
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
          }}
        >
          {status === "success" ? (
            <div
              style={{
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <CheckCircle2
                size={38}
                color={ACCENT}
              />

              <h2
                style={{
                  margin: "24px 0 12px",
                  fontSize: 26,
                  color: WHITE,
                }}
              >
                문의가 전달되었습니다.
              </h2>

              <p
                style={{
                  margin: 0,
                  color: MUTED,
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                보내주신 내용을 확인한 후
                <br />
                가능한 빠르게 답변드리겠습니다.
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: 32,
                  padding: 0,
                  border: 0,
                  background: "none",
                  color: ACCENT,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                새로운 문의 작성 →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p
                style={{
                  margin: "0 0 30px",
                  color: MUTED,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                }}
              >
                SEND AN INQUIRY
              </p>

              {/* NAME */}
              <div style={{ marginBottom: 22 }}>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: "block",
                    marginBottom: 9,
                    color: MUTED,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                  }}
                >
                  NAME
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="이름 또는 닉네임"
                  autoComplete="name"
                  style={fieldStyle}
                />
              </div>

              {/* EMAIL */}
              <div style={{ marginBottom: 22 }}>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: "block",
                    marginBottom: 9,
                    color: MUTED,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                  }}
                >
                  EMAIL
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="답변 받을 이메일"
                  autoComplete="email"
                  style={fieldStyle}
                />
              </div>

              {/* CATEGORY */}
              <div style={{ marginBottom: 22 }}>
                <label
                  htmlFor="contact-category"
                  style={{
                    display: "block",
                    marginBottom: 9,
                    color: MUTED,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                  }}
                >
                  CATEGORY
                </label>

                <select
                  id="contact-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={{
                    ...fieldStyle,
                    cursor: "pointer",
                  }}
                >
                  <option value="협업">협업</option>
                  <option value="음악 및 콘텐츠">
                    음악 및 콘텐츠
                  </option>
                  <option value="기타">기타</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div style={{ marginBottom: 24 }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block",
                    marginBottom: 9,
                    color: MUTED,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                  }}
                >
                  MESSAGE
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="문의 내용을 입력해주세요."
                  rows={7}
                  style={{
                    ...fieldStyle,
                    height: "auto",
                    minHeight: 170,
                    padding: "15px",
                    resize: "vertical",
                    lineHeight: 1.7,
                  }}
                />
              </div>

              {/* 스팸봇 방지 */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn primary"
                style={{
                  width: "100%",
                  opacity:
                    status === "sending" ? 0.6 : 1,
                }}
              >
                {status === "sending"
                  ? "SENDING..."
                  : "SEND INQUIRY"}

                <Send size={15} />
              </button>

              {status === "error" && (
                <p
                  style={{
                    margin: "15px 0 0",
                    color: "#ff8b94",
                    fontSize: 12,
                  }}
                >
                  전송 중 오류가 발생했습니다.
                  잠시 후 다시 시도해주세요.
                </p>
              )}
            </form>
          )}
        </aside>
      </div>

      {/* BOTTOM */}
      <div
        style={{
          marginTop: 120,
          paddingTop: 26,
          borderTop:
            "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: MUTED,
          }}
        >
          © 2026 NIGHT SKY THEATER. ALL RIGHTS RESERVED.
        </p>

        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: MUTED,
          }}
        >
          MUSIC LABEL &amp; CREATIVE STUDIO
        </p>
      </div>
    </main>
  );
}
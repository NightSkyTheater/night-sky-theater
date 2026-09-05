// ── 밤하늘극장 레이블 사이트 — 디자인 토큰 ─────────────────────────
// 포인트 컬러(#B8FF00)는 기존 팬사이트에서 그대로 계승합니다.

export const INK = "#05040C";       // 배경 (deep space)
export const PANEL = "#0F0C1E";     // 카드/섹션 배경
export const PANEL_SOFT = "rgba(255,255,255,0.035)";
export const HAIRLINE = "rgba(255,255,255,0.09)";
export const PAPER = "#F4F2FA";     // 본문 텍스트
export const FADE = "#8D87A6";      // 보조 텍스트

export const ACCENT = "#B8FF00";    // 기존 라임 포인트 컬러 (고정 계승)
export const LIME = ACCENT;
export const VIOLET = "#6C5CE7";    // 보조 액센트 (기존 그라데이션 계열 계승)

// 하위 호환용 別名 (기존 컴포넌트 잔존 참조 대비)
export const glass = PANEL_SOFT;
export const gb = HAIRLINE;
export const muted = FADE;
export const soft = "rgba(244,242,250,0.72)";
export const white = PAPER;

export const MONO = "'JetBrains Mono', ui-monospace, monospace";
export const SANS = "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

export const SITE_MAX = 1180;

export const NAV_ITEMS = [
  { id: "HOME", label: "홈" },
  { id: "LABEL", label: "레이블" },
  { id: "MUSIC", label: "음악" },
  { id: "COMMUNITY", label: "커뮤니티" },
  { id: "CONTACT", label: "Contact" },
];

export const LABEL_INFO = {
  name: "밤하늘극장",
  nameEn: "Night Sky Theater",
  tagline: "사랑과 시간, 그리고 기억에 깃든 감정을 기록하는 버추얼 인디 레이블",
  distributor: "(주)와이지플러스",
  email: "hps_in@naver.com",
  founded: "2025",
};

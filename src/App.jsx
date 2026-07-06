import React, { useState, useEffect, useRef } from "react";
import.meta.env;
// 🌍 Firebase 관련 임포트 최상단 통합
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";



function PatchModal({ onClose, saveOnClose = true }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: 20
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%", maxWidth: 420,
          background: "rgba(20,16,40,0.95)",
          border: "1px solid rgba(184,255,0,0.15)",
          borderRadius: 18, padding: 22,
          color: "#fff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          maxHeight: "80vh", overflowY: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
          <div>
            <p style={{ fontSize: 10, color: "#B8FF00", letterSpacing: "0.15em", margin: "0 0 4px", fontWeight: 700 }}>
              PATCH NOTE
            </p>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>업데이트 히스토리</h3>
          </div>
        </div>

        {/* 타임라인 */}
        <div style={{ position: "relative", paddingLeft: 20 }}>
          {/* 세로선 */}
          <div style={{
            position: "absolute", left: 6, top: 8, bottom: 8,
            width: 1, background: "rgba(184,255,0,0.15)"
          }} />

          {PATCH_HISTORY.map((patch, i) => (
            <div key={patch.version} style={{ position: "relative", marginBottom: i < PATCH_HISTORY.length - 1 ? 22 : 0 }}>
              {/* 타임라인 점 */}
              <div style={{
                position: "absolute", left: -17, top: 5,
                width: 8, height: 8, borderRadius: "50%",
                background: patch.isLatest ? "#B8FF00" : "rgba(184,255,0,0.3)",
                boxShadow: patch.isLatest ? "0 0 8px rgba(184,255,0,0.6)" : "none"
              }} />

              {/* 버전 + 날짜 */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: patch.isLatest ? "#B8FF00" : "rgba(184,255,0,0.5)" }}>
                  {patch.version}
                </span>
                <span style={{ fontSize: 10, color: "rgba(220,210,255,0.4)" }}>
                  {patch.date}
                </span>
                {patch.isLatest && (
                  <span style={{
                    fontSize: 8, fontWeight: 700,
                    background: "rgba(184,255,0,0.15)",
                    color: "#B8FF00", borderRadius: 10,
                    padding: "2px 7px", letterSpacing: "0.05em"
                  }}>
                    LATEST
                  </span>
                )}
              </div>

              {/* 로그 목록 */}
              <div style={{
                background: patch.isLatest ? "rgba(184,255,0,0.05)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${patch.isLatest ? "rgba(184,255,0,0.12)" : "rgba(255,255,255,0.05)"}`,
                borderRadius: 12, padding: "10px 14px",
                display: "flex", flexDirection: "column", gap: 6
              }}>
                {patch.logs.map((log, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#B8FF00", opacity: patch.isLatest ? 0.7 : 0.3, flexShrink: 0, marginTop: 1 }}>•</span>
                    <span style={{ fontSize: 12, lineHeight: 1.6, color: patch.isLatest ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={() => {
            if (saveOnClose) localStorage.setItem("patch_seen", PATCH_VERSION);
            onClose();
          }}
          style={{
            marginTop: 20, width: "100%", padding: "11px",
            borderRadius: 12, border: "none",
            background: "#B8FF00", color: "#111",
            fontWeight: 800, cursor: "pointer", fontSize: 13,
            fontFamily: "inherit"
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

// ── 패치 버전 관리 (다음 패치 때 PATCH_VERSION만 바꾸면 팝업 재등장)──
const PATCH_VERSION = "v 1.1";

const PATCH_HISTORY = [
  {
    version: "v 1.1",
    date: "2026.06.13",
    isLatest: true,
    logs: [
      "방명록 게시판 UI 수정",
      "패치노트 추가",
      "유튜브 구독자 수 자동화",
    ]
  },
  // 다음 패치 때: 이 위에 새 항목 추가, 기존 항목 isLatest: false 로 변경
];

const ACCENT = "#B8FF00";
const LIME   = ACCENT;
const glass  = "rgba(30,20,60,0.72)";
const gb     = "rgba(255,255,255,0.13)";
const muted  = "rgba(220,210,255,0.36)";
const soft   = "rgba(220,210,255,0.70)";
const white  = "#F2EEF9";
const EMOJI_FONT = "'Twemoji Mozilla','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
const MOBILE_SHELL_WIDTH = 430;
const TOP_NAV_HEIGHT = 64;

const ALBUMS = [
  {
    id: 1,
    title: "그대였죠",
    cover: "https://down.mixtape.so/NAS/img/7/6/f/3/76f3d3a05650169617f620233f904430.jpg",
    year: "2025",
    color: "#1a1428",
    desc: "끝난 사랑의 흔적과 그리움을 담담하게 되새기는 이야기.",
    tracks: [
      { n: 1, title: "그대였죠", mood: "그댄 나, 그댄 우리, 너무나 행복해" },
      { n: 2, title: "회색", mood: "회색의 그림자도 결국 너를 비추잖아" },
      { n: 3, title: "고장난시계", mood: "고장난 시계처럼 그 자리에 있어줘" }
    ]
  },
  {
    id: 2,
    title: "자발적으로 표류하는 우주비행사",
    cover: "https://down.mixtape.so/NAS/img/e/9/4/e/e94ea7b70700d9e54afa0685f87d376b.png",
    year: "2026",
    color: "#0a1a10",
    desc: "고독과 방황 속에서도 자신만의 자유와 빛을 찾아가는 여정.",
    tracks: [
      { n: 1, title: "조명이 켜지고", mood: "조명이 켜지고, 별빛이 내려와, 내 안의 희망이 천천히 퍼져 가" },
      { n: 2, title: "마술을 믿나요?", mood: "마술을 믿나요? 기적이 있다고 믿나요?" },
      { n: 3, title: "별이 비처럼 내리던 날", mood: "별들이 비처럼 내리던 날, 현실과 꿈 사이 서 있던 난\n왜 무너지는 별들을 가만히 세고만 있었을까" },
      { n: 4, title: "자발적으로 표류하는 우주비행사", mood: "검은 캔버스 위 흩뿌려진\n은하수 강을 천천히 헤엄쳐" },
      { n: 5, title: "출근하기 싫은데 알람은 또 맞춰놨어", mood: "오늘이 끝나길 바라면서 내일을 또 기대하며,\n알람은 또 맞춰 놨어" },
      { n: 6, title: "사탄탱고", mood: "이제 말해봐, 여기에 어떻게 오게 된 거지?" },
      { n: 7, title: "Sing again", mood: "I will sing again, for those who fall" }
    ]
  },
  {
    id: 3,
    title: "오늘이 가장 어렸던 날이야",
    cover: "https://down.mixtape.so/NAS/img/4/9/1/8/4918f58f94d2aa27de14b0cefc88e62d.png",
    year: "2026",
    color: "#0d1a2a",
    desc: "지금 이 순간의 청춘과 삶을 온전히 살아내는 이야기.",
    tracks: [
      { n: 1, title: "겨울의 대삼각형", mood: "가깝운 듯 멀게 엇갈린 세 점처럼\n우린 서로를 바라보며 빛나고 있어" },
      { n: 2, title: "오늘이 가장 어렸던 날이야", mood: "오늘이 가장 어렸던 날이야\n내일은 우리가 그린 꿈이야" },
      { n: 3, title: "너 때문에", mood: "너 때문에 사는 거야\n너라서 이러는 거야" },
      { n: 4, title: "우리들의 발라드", mood: "밤하늘에 울려 퍼지는 우리들의 발라드\n별빛보다 더 오래 반짝일 이야기" },
      { n: 5, title: "20에 50", mood: "같이 커질 줄 알았는데\n왜 점점 작아지는 걸까" },
      { n: 6, title: "나 지금도 충분히 버티고 있는데", mood: "이건 노력의 문제가 아냐\n그냥 그저 살아 내는 일이야" },
      { n: 7, title: "비극의 목적은 카타르시스", mood: "괜찮아, 다 지나갈 거야\n구름 뒤엔 늘 태양이 숨어 있어" }
    ]
  },
  {
    id: 4,
    title: "전우치",
    cover: "https://down.mixtape.so/NAS/img/7/3/6/e/736ee53e3492b77c0e6ed60a6aac2df8.jpg",
    year: "2026",
    color: "#0d1a2a",
    desc: "혼탁한 세상 속에서 정의와 용기를 잃지 않으려는 저항",
    tracks: [
      { n: 1, title: "전우치", mood: "굿판처럼 뒤집히는 이 밤\n전우치, 그 이름 노래가 된다" },
      { n: 2, title: "구름이 날 어디로 데려갈까", mood: "구름 위를 걸어, 높이 날아올라\n차가운 바람이 내 맘을 흔들어" },
      { n: 3, title: "옥황상제의 비밀클럽", mood: "Move! Move! 엉덩이를 흔들어\nJump! Jump! 힘껏 흔들어" },
      { n: 4, title: "사랑이라 부르지 않을 수 없네", mood: "Stay with me, 잠시만이라도\n짧은 이 밤이 우리를 멀게 하네" }
    ]
  },
  {
    id: 5,
    title: "사랑은 말이야",
    cover: "https://down.mixtape.so/NAS/img/d/c/d/4/dcd4139ef2f9fc4928d13c232c647e58.jpg",
    year: "2026",
    color: "#1a1408",
    desc: "상처받을 걸 알면서도 결국 다시 사랑을 선택하는 인간의 마음",
    tracks: [
      { n: 1, title: "사랑은 말이야", mood: "왜냐면 사랑은 찬란하게 빛나고,\n황홀하게 반짝이고 눈부시게 아름다워서" },
      { n: 2, title: "Deep Blue", mood: "손을 잡아도 내가 떠오르지 못할 거야\n조금만 더 나를 내버려둬" },
      { n: 3, title: "F로 살기엔 세상은 너무 차가워", mood: "느낀 대로 말하고 울고 웃고 싶은데\n여긴 표정 하나에도 설명이 필요한 세상 같아" },
      { n: 4, title: "낭만을 쫓는 히어로", mood: "부서진 세상 속을 달려\n사라진 모든 낭만을 위해" },
      { n: 5, title: "나 다시 사랑할 수 있을까", mood: "말 한마디에 흔들리던 그때처럼\n다시 한번 설렘을 느낄 수 있을까" },
      { n: 6, title: "네가 외로울 때 가장 먼저 떠오르는 사람이 되고 싶어", mood: "네가 혼자인 밤, 너를 끌어안아 줄 한 사람으로\n가장 먼저 네 손을 잡을 수 있게" },
      { n: 7, title: "잠들어버린 나의 날개", mood: "하기 싫은 게 아니야, 간절히 원하는데\n도저히 할 수가 없는 걸" }
    ]
  },
  {
    id: 6,
    title: "이 봄은 다른 이름이 될까",
    cover: "https://down.mixtape.so/NAS/img/d/c/f/9/dcf91e3880c53a65fef13899e16a60d9.jpg",
    year: "2026",
    color: "#1a0d14",
    desc: "우리의 계절이 단순히 봄으로 남지 않기를 바라는 마음으로.",
    tracks: [
      { n: 1, title: "이 봄은 다른 이름이 될까", mood: "만약 내가 조금 더 다가가면\n이 봄은 다른 이름이 될까" },
      { n: 2, title: "갑자기 오래된 노래가 떠오른 이유", mood: "이유는 모르지만\n그땐 아무 걱정 없이 웃고 있었던 것 같아" },
      { n: 3, title: "말하지 않은 것들의 무게", mood: "숨겨오던 진심, 잠시 미뤄둔 사과\n말하지 않은 것들의 무게는 과연 얼마일까" },
      { n: 4, title: "꿈은 없고요, 돈은 많고 싶네요", mood: "꿈은 없고요, 돈은 많고 싶네요\n가난한 천재보다 행복한 바보가 될래요" },
      { n: 5, title: "방해 금지 모드", mood: "날 방해하지 마, 날 찾지 말아 줘\n괜찮아질 때까지만 불러도 못 들은 척할게" },
      { n: 6, title: "울지 못하는 닭", mood: "소리 내어 운다는 건 참 중요한데\n울지 못하는 닭들이 설마 우리는 아니겠지" },
      { n: 7, title: "혹시, 신이 나를 잊어버린 건 아닐까", mood: "모두를 보살피는 시선 끝에\n한 번도 머물지 못한 난 어쩌죠" }
    ]
  },
  {
    id: 7,
    title: "不完全な踊り (불완전한 춤)",
    cover: "https://down.mixtape.so/NAS/img/4/6/a/8/46a838a2a7a75c0a0336cd1e51677f4f.png",
    year: "2026",
    color: "#1a1a08",
    desc: "불완전한 자신을 받아들이고 자신만의 속도로 살아가는 청춘.",
    tracks: [
      { n: 1, title: "今日が一番幼い日 (오늘이 가장 어렸던 날이야)", mood: "今日が一番幼い日\n明日は私たちの描く夢" },
      { n: 2, title: "不完全な踊り (불완전한 춤)", mood: "天国と地獄 あぁ-\nちょうどその中にいるじゃん!" },
      { n: 3, title: "音の出ない心 (소리나지않는마음)", mood: "心は鈍くなって\nもう音がしなくなった" },
      { n: 4, title: "星影の叫び (별빛의외침)", mood: "星の間で君を呼ぶ\n静かに風が流れる" },
      { n: 5, title: "君のために (너 때문에)", mood: "生まれて生きるのだから\nただ生きているけど 私は" },
      { n: 6, title: "私、ドラゴンじゃないのに (나, 드래곤도 아닌데)", mood: "白い息が出ちゃう\n私、ドラゴンじゃないのに" },
      { n: 7, title: "闇が怖い幽霊 (어둠이 무서운 유령)", mood: "暗くて 見えなくて\n静寂に飲まれそうで" }
    ]
  },
  {
    id: 8,
    title: "운명애",
    cover: "https://down.mixtape.so/NAS/img/6/0/7/8/60785c797f4b679f80f7fafecfd2ed0d.jpg",
    year: "2026",
    color: "#1a0d28",
    desc: "주어진 삶과 운명을 끝까지 받아들이고 살아내려는 의지.",
    tracks: [
      { n: 1, title: "운명애", mood: "과거도 미래도 영원히 부정하지 않고\n사랑할래, 내게 주어진 이 서툰 운명을" },
      { n: 2, title: "환상통", mood: "그래, 닿지 못할 미래라도 그 환상 하나로\n너의 시간은 충분히 눈부시게 아름다웠어" },
      { n: 3, title: "테세우스의 배", mood: "모두 바뀌어도 괜찮아, 부서져도 계속 가면 돼\n이름 없는 바다를 건너 나를 나로 데려가는 중" },
      { n: 4, title: "지구는 잘 돌아가네, 나 없이도", mood: "이미 놓여 있던 자리에는 각자의 이름들이 적힌 듯해\n나라는 오답을 지워야 너희의 정답이 완성되려나" },
      { n: 5, title: "운외창천 (雲外蒼天)", mood: "푸르른 하늘이 다시 너를 부를 때\n짙은 구름은 한 조각 추억이 되고" },
      { n: 6, title: "사랑엔 자막이 필요해", mood: "사랑엔 자막이 필요해, 지금 이 장면에 우리\n서로 다른 해석을 붙이지 않도록" },
      { n: 7, title: "내 소중한 마음은 비밀이야", mood: "소중함은 알아달라고 존재하는 마음이 아냐\n다치지 않게 조용히 머무는 마음이야" }
    ]
  },
  {
    id: 9,
    title: "사막 위의 잠수함",
    cover: "https://down.mixtape.so/NAS/img/a/0/8/e/a08eb2cceaf21bdefa2a3be973cba92f.jpg",
    year: "2026",
    color: "#081420",
    desc: "현실과 환상의 경계에서 마주한 내면의 감정과 존재에 대한 탐험.",
    tracks: [
      { n: 1, title: "Wi-Fi Kiss!", mood: "Wi-Fi Kiss! Wi-Fi Kiss!\n닿지 않아도 충분해 지금 이 떨림" },
      { n: 2, title: "사막 위의 잠수함", mood: "사막 위를 헤매는 잠수함처럼\n우린 물 없는 사랑에 잠겨" },
      { n: 3, title: "붐비는 무인도", mood: "붐비는 무인도, 여긴 슬픔의 수용소\n세상이 우리를 얼마나 숨차게 한걸까" },
      { n: 4, title: "지루한 천국", mood: "기적이 매일 반복돼서 기적이 아니게 돼\n행복이 이렇게 차가운 게 정말 축복이 맞을까" },
      { n: 5, title: "부드러운 가시", mood: "부드러운 가시는 아무도 찌르지 않아\n만져보지 않은 상상 속에서만 끝없이 날카로워질 뿐" }
    ]
  },
  {
    id: 10,
    title: "나는 오늘 또 어떤 핑계를 대었는가",
    cover: "https://down.mixtape.so/NAS/img/7/c/2/5/7c25454f6f31e309b5001a57ddd2e479.jpg",
    year: "2026",
    color: "#141420",
    desc: "변명과 합리화를 내려놓고 다시 한 걸음을 내딛다.",
    tracks: [
      { n: 1, title: "나는 오늘 또 어떤 핑계를 대었는가", mood: "나는 오늘 또 무엇 뒤로 숨었는가\n나약함이라는 가면이 너무나 달콤해서 벗겨질까 두려워" },
      { n: 2, title: "가짜의 삶", mood: "과연 진짜 나는 누구일까\n어디에서 숨 쉬고 있을까" },
      { n: 3, title: "결과보단 과정을 봐줄래", mood: "결과보단 과정을 봐줄래\n우린 완성이 아닌 살아가기 위해 이곳에 온 거니까" },
      { n: 4, title: "그럼에도 불구하고", mood: "더 나은 내일만 바라보다\n잘 살려고만 했지, 행복하게 살려 하진 않았어" },
      { n: 5, title: "인생은 산과 계곡", mood: "오르막과 내리막 사이에서\n네가 지금 어디에 있든 삶을 위해 절대 포기하지 말기" },
      { n: 6, title: "낮에도 별은 떠 있어", mood: "낮에도 별은 떠 있어\n오늘을 견딘 만큼 하나씩 떠 있을 거야" },
      { n: 7, title: "불패의 여름", mood: "한겨울 속에서 나는 내 안의 여름을 봤어\n꺼지지 않던 작은 불빛이 나를 다시 부르고 있어" }
    ]
  },
  {
    id: 11,
    title: "죽어가는 모든 것들을 사랑해야지",
    cover: "https://down.mixtape.so/NAS/img/3/8/1/c/381c5833f2b6841534134fe7f6106fa3.jpg",
    year: "2026",
    color: "#0d1a0d",
    desc: "유한한 삶과 상실 속에서도 끝까지 사랑하려는 마음.",
    tracks: [
      { n: 1, title: "푸른 하늘 은하수", mood: "푸른 하늘 은하수 맑은 물결에\n내 마음 가득 담은 별빛들을 실었죠" },
      { n: 2, title: "죽어가는 모든 것들을 사랑해야지", mood: "사라질 걸 알면서도 피어나는 저 꽃들처럼\n온 세상을 끌어안고 후회 없이 사랑할 거야" },
      { n: 3, title: "우연이 반복되면 운명이 될 수 있을까", mood: "우연이 반복되면 운명이 될 수 있을까\n반복되는 우연이 운명이 될 수 있을까" },
      { n: 4, title: "꽃이 피든 말든", mood: "꽃이 피든 말든 무슨 상관이야\n남들의 봄이 나의 봄일 순 없잖아" },
      { n: 5, title: "묘하게 외로운 달", mood: "달을 향해 쏘아올려\n빗나가도 별이 될 테니" }
    ]
  },
  {
    id: 12,
    title: "ただ (그냥)",
    cover: "https://down.mixtape.so/NAS/img/4/0/f/5/40f55cce47f495b360f9f6f325857044.jpg",
    year: "2026",
    color: "#10101a",
    desc: "이유 없이도 괜찮은 순간들을 받아들이며, 있는 그대로의 삶을 살아가다.",
    tracks: [
      { n: 1, title: "ただ風が好きだから (그냥 바람이 좋아서)", mood: "ただ風が好きだから\nもう少し歩くことにしたよ" },
      { n: 2, title: "ただやるだけさ (그냥 하는거지, 뭐)", mood: "ただやるだけさ\nドラマチックな展開はないけれど" },
      { n: 3, title: "ただ普通に生きたいんだ (그냥 평범하게 살고 싶어)", mood: "ただ普通に生きたいんだ\n私の歩幅まで急かさないでよ" }
    ]
  },
  {
    id: 13,
    title: "어느 새벽에 또 울었어",
    cover: "https://down.mixtape.so/NAS/img/6/c/f/3/6cf3a1ed5c784f62bc3290f730c0fd0e.png",
    year: "2026",
    color: "#10101a",
    desc: "아무 일도 없는 무너짐 속에서 스스로를 받아들이는 위로.",
    tracks: [
      { n: 1, title: "어느 새벽에 또 울었어", mood: "어느 새벽에 또 울었어\n대단한 일도 없었는데" }
    ]
  },
  {
    id: 14,
    title: "엄마가 띄워줬던 나는 점점 가라앉고 있어",
    cover: "https://down.mixtape.so/NAS/img/5/e/f/f/5eff9a42aafa3cd9ccd86c6cc298aa28.jpg",
    year: "2026",
    color: "#10101a",
    desc: "가라앉는 삶 속에서도 버텨낸 존재를 조용히 안아주는 위로",
    tracks: [
      { n: 1, title: "엄마가 띄워줬던 나는 점점 가라앉고 있어", mood: "결국 난 특별하지 않은 평범한 사람이었고\n엄마가 띄워줬던 나는 점점 가라앉고 있어" },
      { n: 2, title: "유치한 꿈을 꾸던 나", mood: "유치한 꿈을 꾸던 나는 어느새 어른이 되어버렸고\n찬란할 줄 알았던 미래는 생각보다 눈부시지 않았어" },
      { n: 3, title: "어제와 오늘 사이 나는 무엇을 남겼나", mood: "어제와 오늘 사이, 나는 무엇을 남겼나\n우리는 무엇이 되어 어디서 멈추게 될까" },
      { n: 4, title: "너를 함부로 미워하지마", mood: "사실 누구보다 사랑받길 원했던 건\n바로 너였단 걸 제일 잘 알고 있잖아" },
      { n: 5, title: "날아올라 나의 파랑새야", mood: "바다는 저토록 시리게 제 몸을 물들이는데\n한 움큼 쥐어보면 투명한 눈물만 남네" },
      { n: 6, title: "고장난 놀이기구", mood: "그래, 우리가 타고 있는 이 삶이라는 건\n고장 난 놀이기구 같아" },
      { n: 7, title: "悲喜交加 (비희교가)", mood: "다 아픈 날이지만\n너만은 내게 기쁨이었어" }
    ]
  },
  {
    id: 15,
    title: "아픈 청춘들아",
    cover: "https://down.mixtape.so/NAS/img/7/a/9/e/7a9e3105e8cdd6657fd9f3846ac3123b.jpg",
    year: "2026",
    color: "#10101a",
    desc: "죽고 싶은 게 아니라, 이렇게 살기 싫은 것뿐인 우리에게",
    tracks: [
      { n: 1, title: "아픈 청춘들아", mood: "죽고 싶은 게 아니라 이렇게 살기 싫은 거야\n세상은 여전히 아름답고 조금씩 흘러가고 있어" },
      { n: 2, title: "우리에게 남겨진 영원", mood: "기억해, 영원할 것 같던 한여름 밤의 꿈도\n결국엔, 우리 안에 남아 더 넓은 세상으로 나아갈 용기가 될 거야" },
      { n: 3, title: "세상을 잠시 꺼둘게", mood: "세상을 잠시 꺼둘게\n불안이 멈출 수 있게" },
      { n: 4, title: "가끔씩만 그리워해요", mood: "더 아프기 싫어서, 가장 예쁜 순간에\n나는 마침표를 찍어" },
      { n: 5, title: "축하해, 오늘도 무사히 패배했어", mood: "축하해, 오늘도 무사히 패배했어\n너만의 차가운 슬픔을 즐겨 봐" },
      { n: 6, title: "무너지지 말기로 해요", mood: "거창하게 살지 않아도 괜찮아\n내일은 오늘과 크게 다르지 않을 테니까" },
      { n: 7, title: "오늘도 나에게 지고 말았어", mood: "오늘도 나에게 지고 말았어\n내뱉은 말들은 다 가벼운 거품이었나" }
    ]
  },
  {
    id: 16,
    title: "허수아비에게",
    cover: "https://down.mixtape.so/NAS/img/c/4/c/3/c4c3e7c275c12fad4cca331183f84e7c.jpg",
    year: "2026",
    color: "#10101a",
    desc: "흔들리면서도 자신의 자리를 지켜낸 존재들에게 보내는 위로와 헌사.",
    tracks: [
      { n: 1, title: "1등들이 무너질 때", mood: "중력에 나를 맡긴 채 무너져 내릴 때\n추락하는 기분은 생각보다 다정해" },
      { n: 2, title: "안녕, 나의 멋진 신세계야", mood: "안녕, 나의 멋진 신세계야\n기다려 온 파멸 혹은 구원," },
      { n: 3, title: "우리 기쁜 좋은 날에 사랑을 할거야", mood: "우리 기쁜 좋은 날에 사랑을 할 거야\n가장 서툴고 뜨거운 사랑을 할 거야" },
      { n: 4, title: "허수아비에게", mood: "스스로를 쓸모없다 말하지 않았으면 해\n서 있는 시간도 분명 의미는 있으니까" }
    ]
  },
  {
    id: 17,
    title: "SKIP",
    cover: "https://down.mixtape.so/NAS/img/3/1/4/a/314a4b1e3920993092995bc882c88866.jpg",
    year: "2026",
    color: "#10101a",
    desc: "고통을 견디는 대신 불필요한 어둠을 건너뛰는 용기",
    tracks: [
      { n: 1, title: "SKIP", mood: "I just skip, skip Like a broken scene\nBad days fade away Like they've never been" },
      { n: 2, title: "We didn't win, we just went numb", mood: "Is this what it means to finally grow up?\nTo pour out the soul and just fill the cup?" },
      { n: 3, title: "Oh, how beautiful this world can be", mood: "Oh, how beautiful this world can be\nThe breath we take, the stars above" }
    ]
  },
  {
    id: 18,
    title: "두려운 것 투성이야, 세상은",
    cover: "https://down.mixtape.so/NAS/img/5/e/1/8/5e189235a24647116bb79f07ce27d70c.jpg",
    year: "2026",
    color: "#10101a",
    desc: "끝이 있음을 알면서도 사랑과 꿈을 선택하는, 유한한 삶의 용기.",
    tracks: [
      { n: 1, title: "두려운 것 투성이야, 세상은", mood: "두려운 것 투성이야, 세상은\n사랑도 미래도 영원은 없대" }
    ]
  },
    {
    id: 19,
    title: "별 하나와 달 하나, 그리고 나의 마음",
    cover: "https://down.mixtape.so/NAS/img/e/1/5/3/e15380e4bc1f50857f0c320e174604b0.jpg",
    year: "2026",
    color: "#10101a",
    desc: "외로운 존재들이 서로를 만나 하나의 우주가 되어가는 순간.",
    tracks: [
      { n: 1, title: "별 하나와 달 하나, 그리고 나의 마음", mood: "인생의 절반도 채 오지 않았는데\n여기서 멈추기엔 우린 너무 아깝잖아" },
      { n: 2, title: "세상이 나를 망쳤어", mood: "나의 다정함은 나약함이 되었고\n나의 사색은 시간 낭비가 되었지" },
      { n: 3, title: "텅 빈 알맹이", mood: "한 걸음 떼는 게 죽기보다 무섭겠지만\n그 공포 너머에만 네가 살 곳이 있어" },
      { n: 4, title: "두렵고 우울해, 힘들다 오늘도", mood: "다들 그렇게 살아간대, 부서질 것 같은 마음을\n겨우 다독이며 아픈 마음 감춘 채로" },
      { n: 5, title: "정을 주지 않게 노력하고 있어", mood: "서툰 나의 다정함은 결국 나를 먼저 태우고\n떠나가는 뒷모습엔 딱히 아무 의미도 없더라" },
      { n: 6, title: "웃으면 슬퍼지고 울면 기뻐지는 밤", mood: "밤하늘 별들도 빛나려\n수많은 어둠을 견뎌냈을 거야" },
      { n: 7, title: "행복하지 않아도 되니 힘든 일만 없게 해주세요", mood: "난 이제 행복을 바라지 않아요\n그건 너무 먼 이야기라는 걸 충분히 알았으니까요" }
    ]
  },
    {
    id: 20,
    title: "불행마저 사랑하게 만들까 봐",
    cover: "https://down.mixtape.so/NAS/img/6/1/8/8/61889e345b8f337c1cc9c40898ab3403.jpg",
    year: "2026",
    color: "#10101a",
    desc: "상처로 가득했던 시간을 그리움이라 부르게 될 미래가 두려운 청춘의 노래.",
    tracks: [
      { n: 1, title: "불행마저 사랑하게 만들까 봐", mood: "난 청춘이 두려워\n불행마저 사랑하게 만들까 봐" }
    ]
  },
      {
    id: 21,
    title: "청춘과 죽음과 낭만에 대하여",
    cover: "https://down.mixtape.so/NAS/img/0/b/c/d/0bcd4d1de831c62aa52bfdf01a2f714c.jpg",
    year: "2026",
    color: "#10101a",
    desc: "유한한 삶이기에 비로소 빛나는 청춘과 낭만.",
    tracks: [
      { n: 1, title: "혼자가 아니어서 좋아", mood: "혼자가 아니어서 좋아\n모두 하나 되어 내일을 비춰" },
      { n: 2, title: "앞으로 나아가는 중이라 힘든 거야", mood: "앞으로 나아가는 중이라 힘든 거야\n지쳤다는 건 노력했다는 거니까" },
      { n: 3, title: "어쩌다 보니 그렇게 된 거야", mood: "어쩌다 보니 그렇게 된 거야\n누구의 잘못도 아닌 거야" },
      { n: 4, title: "보고 싶은 시제가 없다", mood: "보고 싶은 시제가 없다\n되돌아갈 장면도 없다" },
      { n: 5, title: "청춘과 죽음과 낭만에 대하여", mood: "삶이라는 건 사라짐을 향해\n천천히 걸어가는 일이란다" },
      { n: 6, title: "창백한 푸른 점에서의 우리", mood: "먼지보다 작은 존재라면 서로의 온기라도 되어야지\n우린 무엇을 차지하려 하는 걸까" },
      { n: 7, title: "이제 나도 기뻐서 울고 싶어", mood: "내일의 걱정은 내일에 맡긴 채\n아늑한 꿈속을 걸어" }
    ]
  },
    {
    id: 22,
    title: "星の世界 (별의 세계)",
    cover: "https://down.mixtape.so/NAS/img/a/a/3/9/aa39a7feee0dfebef9d62ba7f30a5e35.jpg",
    year: "2026",
    color: "#10101a",
    desc: "아무 일도 없는 무너짐 속에서 스스로를 받아들이는 위로.",
    tracks: [
      { n: 1, title: "星の世界 (별의 세계)", mood: "もし私があの星のひとつだとしたら\n誰かの夜を癒す光になれるだろうか" }
    ]
  },
  {
    id: 22,
    title: "아마 모르겠지",
    cover: "https://down.mixtape.so/NAS/img/6/a/f/a/6afa718386f53fc5bf25cf6eb04f73e2.jpg",
    year: "2026",
    color: "#10101a",
    desc: "거대한 바다 같은 진심을 홀로 삼켜내며 지독하게 담아둔 짝사랑의 고백.",
    tracks: [
      { n: 1, title: "아마 모르겠지", mood: "수면 위로 드러난 내 마음은\n겨우 손바닥만 한 미소뿐이라 아마 모르겠지" }
    ]
  }
];

const ALL_TRACKS = ALBUMS.flatMap(a => a.tracks.map(t => ({...t, album:a.title})));

const CHART = [
  { rank: 1, title: "죽어가는 모든 것들을 사랑해야지", trend: "up" },
  { rank: 2, title: "우리들의 발라드", trend: null },
  { rank: 3, title: "나는 오늘 또 어떤 핑계를 대었는가", trend: null },
  { rank: 4, title: "결과보단 과정을 봐줄래", trend: null },
  { rank: 5, title: "푸른 하늘 은하수", trend: null },
  { rank: 6, title: "이 봄은 다른 이름이 될까", trend: "down" },
  { rank: 7, title: "운외창천 (雲外蒼天)", trend: "up" },
  { rank: 8, title: "ただ風が好きだから (그냥 바람이 좋아서)", trend: "down" },
  { rank: 9, title: "고장난시계", trend: "down" },
  { rank: 10, title: "꽃이 피든 말든", trend: "new" },
];

const OVERSEAS = [
  { flag: "https://flagcdn.com/in.svg", emoji: "🇮🇳", name: "인도", pct: 42.1 },
  { flag: "https://flagcdn.com/tr.svg", emoji: "🇹🇷", name: "튀르키예", pct: 8.2 },
  { flag: "https://flagcdn.com/jp.svg", emoji: "🇯🇵", name: "일본", pct: 7.1 },
  { flag: "https://flagcdn.com/us.svg", emoji: "🇺🇸", name: "미국", pct: 6.4 },
  { flag: "https://flagcdn.com/pk.svg", emoji: "🇵🇰", name: "파키스탄", pct: 4.9 },
  { flag: "https://flagcdn.com/ua.svg", emoji: "🇺🇦", name: "우크라이나", pct: 4.5 },
  { flag: "https://flagcdn.com/tw.svg", emoji: "🇹🇼", name: "대만", pct: 3.1 },
  { flag: null, emoji: "🌍", name: "기타", pct: 23.6 },
];

const SUB_DATA = [
  {month:"12월", subs:182},
  {month:"1월", subs:219},
  {month:"2월", subs:262},
  {month:"3월", subs:300},
  {month:"4월", subs:345},
  {month:"5월", subs:410},
  {month:"6월", subs:765},
];

const PLATFORMS = [
  { name:"Instagram", url:"instagram.com/happy__in", color:"#E1306C" },
  { name:"Facebook", url:"facebook.com/Happyin0", color:"#1877F2" },
  { name:"TikTok", url:"tiktok.com/@nightsky_theater", color:"#111111"},
  { name:"Melon", url:"melon.com/artist/timeline.htm?artistId=4565131", color:"#00D564"},
  { name:"Genie Music", url:"genie.co.kr/detail/artistInfo?xxnm=83039013", color:"#3DA5FF" },
  { name:"FLO", url:"music-flo.com/detail/artist/412503816/track?sortType=POPULARITY", color:"#7C4DFF"},
  { name:"VIBE", url:"vibe.naver.com/artist/10046198", color:"#00C73C"},
  { name:"Bugs", url:"music.bugs.co.kr/artist/14382832", color:"#FF3B30" },
  { name:"YouTube Music", url:"music.youtube.com/channel/UCGCMDvnVgg508GYghgeT3vw", color:"#FF0000" },
  { name:"Spotify", url:"open.spotify.com/artist/3QiNf9Qb6lJukt8ljMcZuR", color:"#1DB954" },
  { name:"Apple Music", url:"music.apple.com/kr/artist/%EB%B0%A4%ED%95%98%EB%8A%98%EA%B7%B9%EC%9E%A5/1838608388", color:"#FA2D48" }
];

// ── 발매 일정 & 뉴스 ─────────────────────────────
const RELEASE_SCHEDULE = [
  { tag:"정규", tagC:"#ff8b94", date:"06.26", title:"'청춘과 죽음과 낭만에 대하여' 발매" },
  { tag:"싱글", tagC:"#a8e6cf", date:"06.30", title:"'星の世界 (별의 세계)' 발매" },
  { tag:"싱글", tagC:"#a8e6cf", date:"07.03", title:"'아마 모르겠지' 발매" },
  { tag:"예정", tagC:"#ffcc44", date:"07.14", title:"'바다와 어른, 소년의 노래' 발매예정" },
];

const NEWS_ITEMS = [
  { date:"06.27", title:"유튜브 구독자 700명 돌파" },
];

function Stars() {
  const s = useRef(Array.from({length:100},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,r:Math.random()*1.4+0.2,o:Math.random()*0.4+0.08,d:Math.random()*5+2}))).current;
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
      {s.map(st=><div key={st.id} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.r*2,height:st.r*2,borderRadius:"50%",background:"#fff",opacity:st.o,animation:`tw ${st.d}s ease-in-out infinite alternate`}}/>)}
    </div>
  );
}


const Hr = ({my=0}) => <div style={{height:1,background:gb,margin:`${my}px 0`}}/>;

const Tag = ({c=LIME,children}) => (
  <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.05em",padding:"5px 10px",borderRadius:20,color:c,background:`${c}18`,border:`1px solid ${c}38`,whiteSpace:"nowrap"}}>{children}</span>
);

const SecHead = ({title,sub}) => (
  <div style={{marginBottom:0}}>
    <p style={{fontSize:17,fontWeight:800,lineHeight:1,color:white,margin:0,letterSpacing:"-0.3px"}}>{title}</p>
    {sub&&<p style={{fontSize:10,color:muted,margin:"3px 0 0"}}>{sub}</p>}
  </div>
);

function formatCompact(num) {
  if (num === null || num === undefined) return "···";
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(num);
}

const NAV_ITEMS = [
  {id:"\uD648",    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>},
  {id:"\uC74C\uC545",  svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>},
  {id:"\uBC29\uBA85\uB85D",svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>},
];

function TopTab({ tab, setTab }) {
  const tabs = NAV_ITEMS.map((item) => item.id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: MOBILE_SHELL_WIDTH,
        height: TOP_NAV_HEIGHT,
        zIndex: 1000,
        background: scrolled ? "rgba(3,1,14,0.72)" : "#070510",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(184,255,0,.08)",
        transition: "background .22s ease, backdrop-filter .22s ease, border-color .22s ease",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          padding: "0 18px",
        }}
      >
        <button
  onClick={() => setTab(NAV_ITEMS[0].id)}
  style={{
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  }}
>
  <span
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.08)",
    }}
  >
    <img
      src="/favicon.svg"
      alt="밤하늘극장"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  </span>
</button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: tab === t ? ACCENT : "rgba(255,255,255,.62)",
                fontSize: 14,
                fontWeight: tab === t ? 800 : 600,
                position: "relative",
                padding: "22px 10px 20px",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {t}
              {tab === t && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 12,
                    margin: "auto",
                    width: "100%",
                    height: 2,
                    borderRadius: 10,
                    background: ACCENT,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
function HeroBanner({ currentSubs, albumCount, trackCount }) {
  return (
    <div
      style={{
        position: "relative",
        height: 360,
        overflow: "hidden",
      }}
    >
      <img
        src="https://down.mixtape.so/NAS/img/b/d/d/c/bddc807264d156fa82fd1a98208a4856.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.15), rgba(3,1,14,.96))",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 30,
        }}
      >
        <G
      acc
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "30px 22px 24px"
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 900, color: white, letterSpacing: "-0.03em", margin: "0 0 14px" }}>
        밤하늘극장
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap", marginBottom: 16 }}>
        {[
          { val: formatCompact(currentSubs), label: "구독자" },
          { val: albumCount, label: "앨범" },
          { val: trackCount, label: "곡" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: white }}>
              {s.val}
            </p>
            <p style={{ margin: 0, fontSize: 9, color: muted, letterSpacing: "0.05em" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12.5, color: soft, lineHeight: 1.8, margin: 0, maxWidth: 380, marginInline: "auto" }}>
        사랑과 시간, 그리고 기억에 깃든 감정을 섬세하게 노래하는 가상 인디 밴드.
        보컬 유우레이가 청춘과 삶의 순간들을 자신만의 시선으로 들려드립니다.
      </p>
    </G>
      </div>
    </div>
  );
}
function BottomNav({tab,setTab}) {
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:MOBILE_SHELL_WIDTH,zIndex:200,background:"rgba(3,1,14,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:`1px solid rgba(184,255,0,0.1)`,display:"flex"}}>
      {NAV_ITEMS.map(it=>(
        <button key={it.id} onClick={()=>setTab(it.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"9px 0 7px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",color:tab===it.id?LIME:muted,transition:"color 0.2s",position:"relative"}}>
          {tab===it.id&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:22,height:2,background:ACCENT,borderRadius:2}}/>}
          {it.svg}
          <span style={{fontSize:9.5,fontWeight:tab===it.id?700:400}}>{it.id}</span>
        </button>
      ))}
    </div>
  );
}

function HomeTab({ onOpenPatch }) {
  const [liveSubs, setLiveSubs] = useState(null);
  const [liveViews, setLiveViews] = useState(null);
  const [newsExpanded, setNewsExpanded] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCagbKVKMsqoHsD1_LLk2W2w&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        const data = await res.json();

        if (data.items?.[0]) {
          setLiveSubs(Number(data.items[0].statistics.subscriberCount));
          setLiveViews(Number(data.items[0].statistics.viewCount));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();

    const interval = setInterval(fetchStats, 600000); // 10분마다 갱신

    return () => clearInterval(interval);
  }, []);

  const albumCount = ALBUMS.length;
  const trackCount = ALL_TRACKS.length;
  const currentSubs = liveSubs ?? SUB_DATA[SUB_DATA.length - 1].subs;

  const visibleNews = newsExpanded ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 3);

  const PatchBadge = (
    <button
      onClick={onOpenPatch}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(184,255,0,0.08)",
        border: "1px solid rgba(184,255,0,0.2)",
        borderRadius: 20,
        padding: "8px 20px",
        justifyContent: "space-between",
        cursor: "pointer",
        fontFamily: "inherit",
        marginBottom: 4,
        width: "100%",
      }}
    >
      <span style={{ fontSize: 9, color: ACCENT, fontWeight: 700, letterSpacing: "0.1em" }}>
        🔔 PATCH NOTE
      </span>
      <span style={{ fontSize: 10, color: "rgba(220,210,255,0.6)" }}>
        {PATCH_VERSION} 업데이트 보기 →
      </span>
    </button>
  );

 

  const ReleaseSchedule = (
    <G pad="0">
      <div style={{ padding: "18px 18px 10px" }}><SecHead title="📀 발매 일정" /></div>
      <Hr />
      {RELEASE_SCHEDULE.map((n, i, arr) => (
        <div key={n.title + n.date}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "11px 18px" }}>
            <div style={{ width: 56, flexShrink: 0 }}><Tag c={n.tagC}>{n.tag}</Tag></div>
            <span style={{ width: 44, flexShrink: 0, fontSize: 11, color: "rgba(220,210,255,0.75)", fontWeight: 600 }}>{n.date}</span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{n.title}</p>
          </div>
          {i < arr.length - 1 && <Hr />}
        </div>
      ))}
    </G>
  );

  const News = (
    <G pad="0">
      <div style={{ padding: "18px 18px 10px" }}><SecHead title="📢 NEWS" /></div>
      <Hr />
      {visibleNews.map((n, i, arr) => (
        <div key={n.title + n.date}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px" }}>
            <span style={{ width: 44, flexShrink: 0, fontSize: 11, color: "rgba(220,210,255,0.75)", fontWeight: 600 }}>{n.date}</span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{n.title}</p>
          </div>
          {i < arr.length - 1 && <Hr />}
        </div>
      ))}
      {NEWS_ITEMS.length > 3 && (
        <>
          <Hr />
          <button
            onClick={() => setNewsExpanded((v) => !v)}
            style={{
              width: "100%", background: "none", border: "none", cursor: "pointer",
              padding: "10px 0", fontFamily: "inherit", fontSize: 11, color: muted, fontWeight: 600
            }}
          >
            {newsExpanded ? "접기 ▲" : "더보기 ▼"}
          </button>
        </>
      )}
    </G>
  );

  const OfficialLinks = (
    <G>
      <SecHead title="Official Links" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14, justifyContent: "center" }}>
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={"https://" + p.url}
            target="_blank"
            rel="noreferrer"
            title={p.name}
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: p.color, flexShrink: 0,
              boxShadow: `0 4px 14px ${p.color}55`,
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "transform 0.15s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
          />
        ))}
      </div>
    </G>
  );

  const Footer = (
    <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
      <a href="mailto:nightskytheater@gmail.com" style={{ fontSize: 12, color: soft, textDecoration: "none" }}>
        nightskytheater@gmail.com
      </a>
      <p style={{ fontSize: 10, color: muted, margin: "6px 0 0" }}>
        © 2026 Night Sky Theater. All rights reserved.
      </p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
      <HeroBanner
  currentSubs={currentSubs}
  albumCount={albumCount}
  trackCount={trackCount}
/>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 14px 0" }}>
        {PatchBadge}
        {ReleaseSchedule}
        {News}
        {OfficialLinks}
        {Footer}
      </div>
    </div>
  );
}

function AboutTab() {
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

function MusicTab() {
  const [selected,setSelected]=useState(null);
  const [trackIdx,setTrackIdx]=useState(0);

  if (selected !== null) {
    const alb=ALBUMS[selected], tr=alb.tracks[trackIdx];
    return (
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={()=>{setSelected(null);setTrackIdx(0);}} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:ACCENT,fontSize:13,fontFamily:"inherit",padding:0,marginBottom:4}}>← 음반 목록</button>
        <G acc>
          <div style={{textAlign:"center"}}>
            <div style={{width:120,height:120,borderRadius:18,backgroundImage:`url(${alb.cover})`,backgroundColor:alb.color,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",border:"1px solid rgba(184,255,0,0.15)",margin:"0 auto 16px",overflow:"hidden",boxShadow:`0 10px 30px ${alb.color}44`}}/>
            <p style={{fontSize:10,color:ACCENT,fontWeight:700,margin:"0 0 4px",letterSpacing:"0.1em",opacity:0.8}}>{alb.year}</p>
            <p style={{fontSize:17,fontWeight:900,color:white,margin:"0 0 8px",fontFamily:"'Noto Serif KR',serif",lineHeight:1.3,letterSpacing:"-0.3px"}}>{alb.title}</p>
            <p style={{fontSize:12,color:muted,lineHeight:1.7,margin:0,fontStyle:"italic"}}>"{alb.desc}"</p>
          </div>
          <Hr my={16}/>
          <div style={{display:"flex",justifyContent:"center",gap:5}}> {/* 💡 justifyCenter -> justifyContent 수정 */}
            {alb.tracks.map((_,j)=>(
              <div key={j} onClick={()=>setTrackIdx(j)} style={{width:j===trackIdx?20:6,height:4,borderRadius:2,background:j===trackIdx?ACCENT:"rgba(91,79,245,0.2)",transition:"all 0.2s",cursor:"pointer"}}/>
            ))}
          </div>
        </G>
        <G style={{textAlign:"center",minHeight:120,display:"flex",flexDirection:"column",justifyContent:"center",padding:"24px 20px"}}>
          <p style={{fontSize:10,color:muted,margin:"0 0 6px",letterSpacing:"0.1em"}}>TRACK {tr.n} / {alb.tracks.length}</p>
          <p style={{fontSize:20,fontWeight:800,color:white,margin:"0 0 10px",fontFamily:"'Noto Serif KR',serif",lineHeight:1.35}}>{tr.title}</p>
          {tr.mood&&<p style={{fontSize:13,color:soft,lineHeight:1.75,fontStyle:"italic",margin:0}}>"{tr.mood}"</p>}
        </G>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setTrackIdx(i=>Math.max(0,i-1))} disabled={trackIdx===0} style={{flex:1,padding:"12px",background:glass,border:`1px solid ${gb}`,borderRadius:12,cursor:trackIdx===0?"not-allowed":"pointer",color:trackIdx===0?muted:soft,fontSize:13,fontFamily:"inherit",opacity:trackIdx===0?0.4:1,transition:"all 0.2s"}}>← 이전</button>
          <button onClick={()=>setTrackIdx(i=>Math.min(alb.tracks.length-1,i+1))} disabled={trackIdx===alb.tracks.length-1} style={{flex:1,padding:"12px",background:trackIdx===alb.tracks.length-1?glass:"rgba(91,79,245,0.09)",border:`1px solid ${trackIdx===alb.tracks.length-1?gb:"rgba(91,79,245,0.25)"}`,borderRadius:12,cursor:trackIdx===alb.tracks.length-1?"not-allowed":"pointer",color:trackIdx===alb.tracks.length-1?muted:ACCENT,fontSize:13,fontFamily:"inherit",fontWeight:700,opacity:trackIdx===alb.tracks.length-1?0.4:1,transition:"all 0.2s"}}>다음 →</button>
        </div>
        <G pad="0">
          <div style={{padding:"14px 18px 10px"}}><p style={{fontSize:13,fontWeight:700,color:white,margin:0}}>수록곡</p></div>
          <Hr/>
          {alb.tracks.map((t,j)=>(
            <div key={t.title}>
              <div onClick={()=>setTrackIdx(j)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",cursor:"pointer",background:j===trackIdx?"rgba(184,255,0,0.06)":"transparent",transition:"background 0.15s"}}>
                <span style={{fontSize:10,color:j===trackIdx?ACCENT:muted,width:16,flexShrink:0}}>{t.n}</span>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{margin:"0 0 1px",fontSize:13,fontWeight:j===trackIdx?700:400,color:j===trackIdx?white:soft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</p>
                </div>
                {j===trackIdx&&<span style={{fontSize:10,color:ACCENT,flexShrink:0}}>▶</span>}
              </div>
              {j<alb.tracks.length-1&&<Hr/>}
            </div>
          ))}
        </G>
      </div>
    );
  }

  const cols = "1fr 1fr";
  return (
    <div>
      <div style={{marginBottom:16}}><SecHead title="디스코그래피" sub={`총 ${ALBUMS.length}개 앨범`}/></div>
      <div style={{display:"grid",gridTemplateColumns:cols,gap:12}}>
        {[...ALBUMS].reverse().map((a,i)=>(
          <button key={a.id} onClick={()=>{setSelected(ALBUMS.length-1-i);setTrackIdx(0);}} style={{background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"left",fontFamily:"inherit",width:"100%",minWidth:0}}>
            <div
              style={{width:"100%",aspectRatio:"1/1",borderRadius:14,backgroundImage:`url(${a.cover})`,backgroundColor:a.color,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",border:"1px solid rgba(255,255,255,0.08)",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s ease",overflow:"hidden",position:"relative",boxShadow:`0 10px 35px ${a.color}33`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(184,255,0,0.35)";e.currentTarget.style.transform="translateY(-4px) scale(1.02)";e.currentTarget.style.boxShadow=`0 18px 45px ${a.color}55`;}}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = `0 10px 35px ${a.color}33`;
              }}
            />
            <p style={{fontSize:12,fontWeight:700,color:white,margin:"0 0 2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.3}}>{a.title}</p>
            <p style={{fontSize:10,color:muted,margin:0}}>{a.tracks.length}곡</p>
          </button>
        ))}
      </div>
    </div>
  );
}
// ── 방명록 (Firebase 기능 유지 + 투명 유리 파스텔 UI + 세로 스크롤 Flex형) ─────────────────────────────
function timeAgo(date) {
  if (!date) return "";
  const targetDate =
    date instanceof Date ? date : (date.toDate ? date.toDate() : new Date(date));
  const now = new Date();
  const diff = Math.floor((now - targetDate) / 1000);

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;

  return targetDate.toLocaleDateString("ko-KR");
}

function GuestbookTab() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cols = 1;

  useEffect(() => {
const q = query(
      collection(db, "guestbook"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setEntries(data);
    });

    return () => {

      unsub();
    };
  }, []);

  const submit = async () => {
    if (!name.trim() || !pw.trim() || !msg.trim()) return;

    const newEntry = {
      name: name.trim(),
      pw: pw.trim(),
      msg: msg.trim(),
      color: [
        "#FFFFFF", "#F8FAFC", "#F1F5F9", "#E0F2FE", "#BAE6FD",
        "#CFFAFE", "#CCFBF1", "#D1FAE5", "#DCFCE7", "#ECFCCB",
        "#FEF9C3", "#FEF3C7", "#FDE68A", "#FCE7F3", "#FBCFE8",
        "#E9D5FF", "#DDD6FE", "#C4B5FD", "#BFDBFE", "#B8FF00"
      ][Math.floor(Math.random() * 20)],
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "guestbook"), newEntry);
      setName("");
      setPw("");
      setMsg("");
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const del = async (entry) => {
    if (!window.confirm("이 낙서를 삭제하시겠습니까?")) return;

    const input = window.prompt("비밀번호를 입력하세요");
    if (!input) return;

    if (input === entry.pw) {
      try {
        await deleteDoc(doc(db, "guestbook", entry.id));
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "14px",
    color: "#fff",
    padding: "10px 14px",
    fontSize: "12px",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* 🌌 타이틀 */}
      <div style={{
        padding: "16px 20px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        zIndex: 2,
        flexShrink: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ textAlign: "left" }}>
          <h2 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600, color: "#B8FF00" }}>
            밤하늘 낙서장
          </h2>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
            밤하늘에 지워지지 않을 당신의 한 줄을 남겨주세요.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#B8FF00",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
            lineHeight: 0
          }}
        >
          ＋
        </button>
      </div>

      {/* 📌 포스트잇 감성 자유형 보드 */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "flex-start"
        }}
      >
        {Array.from({ length: cols }).map((_, colIndex) => (
          <div 
            key={colIndex} 
            style={{ 
              flex: 1, 
              display: "flex", 
              flexDirection: "column", 
              gap: "20px"
            }}
          >
            {entries
              .filter((_, idx) => idx % cols === colIndex)
              .map((e) => {
                const baseColor = e.color || "#fff";

                return (
                  <div
                    key={e.id}
                    style={{
                      position: "relative", // ✕ 버튼 절대 배치를 위해 고정
                      width: "100%",
                      minHeight: "90px",
                      padding: "28px 24px 20px 24px", // 상단 여백 확보
                      borderRadius: "20px",
                      background: `linear-gradient(135deg, ${baseColor}15, ${baseColor}05)`,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 1px 1px rgba(255, 255, 255, 0.05)`,
                      textAlign: "left",
                    }}
                  >
                    {/* ✕ 삭제 버튼 (깔끔한 인터랙션 적용) */}
                    <button
                      onClick={() => del(e)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "12px",
                        background: "none",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.3)",
                        cursor: "pointer",
                        fontSize: "12px",
                        padding: "4px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => e.target.style.color = "#ff4d4d"}
                      onMouseLeave={(e) => e.target.style.color = "rgba(255, 255, 255, 0.3)"}
                    >
                      ✕
                    </button>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        lineHeight: "22px",
                        fontWeight: 300,
                        whiteSpace: "pre-wrap",
                        wordBreak: "keep-all",
                        color: "rgba(255, 255, 255, 0.95)", 
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)"
                      }}
                    >
                      {e.msg}
                    </p>

                    <div
                      style={{
                        marginTop: "12px",
                        paddingTop: "8px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        fontSize: "11px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        opacity: 0.7,
                      }}
                    >
                      <span style={{ color: baseColor, fontWeight: 600, textShadow: `0 0 8px ${baseColor}44` }}>
                        ✦ {e.name}
                      </span>
                      <span>{timeAgo(e.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* 📥 글쓰기 모달 창 */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 20
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              background: "rgba(18,18,18,0.9)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#B8FF00" }}>낙서 남기기</span>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "16px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임"
              style={{ ...inputStyle, width: "100%" }}
            />

            <input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
              type="password"
              style={{ ...inputStyle, width: "100%" }}
            />

            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="당신의 한 줄이 별이 됩니다."
              rows={4}
              style={{
                ...inputStyle,
                width: "100%",
                resize: "none",
                fontSize: "13px",
              }}
            />

            <button
              onClick={submit}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: "12px",
                border: "none",
                fontWeight: "700",
                background: done ? "#B8FF00" : "rgba(255,255,255,0.9)",
                color: "#111",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {done ? "기록완료 ✨" : "남기기"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── APP (메인 컴포넌트 단일 Export Default) ───────────────────
export default function App() {
  const [tab, setTab] = useState(NAV_ITEMS[0].id);
const [showPatch, setShowPatch] = useState(false);
useEffect(() => {
  const seen = localStorage.getItem("patch_seen");

  if (seen !== PATCH_VERSION) setShowPatch(true);
}, []);


  useEffect(() => {
    if (document.querySelector('script[src*="chart.umd.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    document.head.appendChild(s);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0e0a2e 0%,#120d38 35%,#160f42 65%,#0e0a2e 100%)", color: "#fff", fontFamily: "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @keyframes tw    { from{opacity:.05} to{opacity:.65} }
        @keyframes fin   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        body { font-family:'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif; text-align:left; margin:0; }
        p, span, div { text-align:inherit; }
        textarea::placeholder, input::placeholder { color:rgba(255,255,255,0.3) }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:rgba(184,255,0,0.16);border-radius:3px }
        strong { font-weight:800 }
      `}</style>
      <Stars />
      
      {showPatch && <PatchModal onClose={() => setShowPatch(false)} />}
        <TopTab
    tab={tab}
    setTab={setTab}
/>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: MOBILE_SHELL_WIDTH, margin: "0 auto", display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        <div
  style={{
    flex: 1,
    padding:
      tab === NAV_ITEMS[0].id
        ? `${TOP_NAV_HEIGHT}px 0 140px`
        : tab === NAV_ITEMS[2].id
          ? `${TOP_NAV_HEIGHT + 12}px 14px 0`
          : `${TOP_NAV_HEIGHT + 12}px 14px 140px`,
    animation: "fin 0.3s ease both"
  }}
  key={tab}
>
          {tab === NAV_ITEMS[0].id && <HomeTab onOpenPatch={() => setShowPatch(true)} />}
          
          {tab === NAV_ITEMS[1].id && <MusicTab />}
          {tab === NAV_ITEMS[2].id && <GuestbookTab />}
        </div>
      </div>
    </div>
  );
}
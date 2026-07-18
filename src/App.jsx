import React, { useState, useEffect, useRef } from "react";
import { House, Disc3, NotebookPen } from "lucide-react";
import.meta.env;
// 🌍 Firebase 관련 임포트 최상단 통합
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "./firebase";

const ACCENT = "#B8FF00";
const LIME   = ACCENT;
const glass  = "rgba(30,20,60,0.72)";
const gb     = "rgba(255,255,255,0.13)";
const muted  = "rgba(220,210,255,0.36)";
const soft   = "rgba(220,210,255,0.70)";
const white  = "#F2EEF9";
const EMOJI_FONT = "'Twemoji Mozilla','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
const MOBILE_SHELL_WIDTH = 460;
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
  },
        {
    id: 23,
    title: "바다와 어른, 소년의 노래",
    cover: "https://down.mixtape.so/NAS/img/c/4/1/c/c41c287eff537002a7dd77ff91efa98a.jpg",
    year: "2026",
    color: "#10101a",
    desc: "어른이라는 바다에서 비로소 나를 찾아가는 청춘의 이야기.",
    tracks: [
      { n: 1, title: "바다와 어른, 소년의 노래", mood: "그토록 바라왔던 그 바다는\n별거 없는 그냥 바다였더라고" },
      { n: 2, title: "조용히 숨 쉬는 작은 별들아", mood: "별의 크기보다 중요한 건\n얼마나 오래 빛나는지야" },
      { n: 3, title: "마음이 가는대로 가게 해줘", mood: "마음이 가는 대로 가게 해줘\n굳이 이유는 묻지 말아줘" },
      { n: 4, title: "가만히 있으면 그냥 가만히 있을 뿐이야", mood: "가만히 있으면 그냥 가만히 있을 뿐이야\n아무것도 하지 않으면 아무것도 달라지지 않아" },
      { n: 5, title: "인생은 테트리스 같아", mood: "계속 버티면서 살다 보면\n언젠간 잘 풀릴 날이 반드시 올 거야" },
      { n: 6, title: "희망의 끈", mood: "내가 가진 건 이 끈 하나가 전부인 걸\n그래서 오늘도 놓지 못하는 거야" },
      { n: 7, title: "같은 극끼리는 서로 붙지 않아", mood: "같은 극끼리는 서로 붙지 않아\n다르니까 서로 끌리는 거야" }
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
  { tag:"싱글", tagC:"#a8e6cf", date:"06.30", title:"'星の世界 (별의 세계)' 발매" },
  { tag:"싱글", tagC:"#a8e6cf", date:"07.03", title:"'아마 모르겠지' 발매" },
  { tag:"정규", tagC:"#ff8b94", date:"07.14", title:"'바다와 어른, 소년의 노래' 발매" },
  { tag:"예정", tagC:"#ffcc44", date:"07.23", title:"'문득 그 시절이 사무치게 그리워질 때면' 발매" },
];

const NEWS_ITEMS = [
  { date:"04.03", title:"'겨울의 대삼각형' 제주도교육청 교육자료 수록" },
  { date:"06.11", title:"밤하늘극장 공식 팬페이지 오픈" },
  { date:"06.28", title:"오마이걸 효정님의 추천곡으로 '죽어가는 모든 것들을 사랑해야지' 라디오 소개" },
  { date:"07.11", title:"유튜브 구독자 1,000명 달성" },
];

function Stars() {
  const s = useRef(Array.from({length:100},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,r:Math.random()*1.4+0.2,o:Math.random()*0.4+0.08,d:Math.random()*5+2}))).current;
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
      {s.map(st=><div key={st.id} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.r*2,height:st.r*2,borderRadius:"50%",background:"#fff",opacity:st.o,animation:`tw ${st.d}s ease-in-out infinite alternate`}}/>)}
    </div>
  );
}

const G = ({children,acc,pad="20px 18px 16px",style={}}) => (
  <div
  style={{
    background: acc ? "rgba(184,255,0,0.07)" : glass,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${acc ? "rgba(184,255,0,0.2)" : gb}`,
    borderRadius: 16,
    padding: pad,
    ...style
  }}
>
    {children}
  </div>
);

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
  {
    id: "홈",
    svg: <House size={25} strokeWidth={2.2} />,
  },
  {
    id: "음악",
    svg: <Disc3 size={25} strokeWidth={2.2} />,
  },
  {
    id: "방명록",
    svg: <NotebookPen size={25} strokeWidth={2.2} />,
  },
];

function TopTab({ tab, setTab }) {
  const tabs = NAV_ITEMS;
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
          {tabs.map((item) => (
            <button
  key={item.id}
  onClick={() => setTab(item.id)}
  style={{
    width: 42,
    height: 42,
    borderRadius: 999,
    background: "transparent",
    border: "none",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color:
  tab === item.id
    ? ACCENT
    : "#666666",

    transition: "all .2s ease",
  }}
>
  {item.svg}
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
        height: 520,
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
    objectPosition: "center top",
    transform: "scale(1.03)",
  }}
/>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
linear-gradient(
to bottom,
rgba(0,0,0,0) 0%,
rgba(3,1,14,0.08) 35%,
rgba(3,1,14,0.45) 55%,
rgba(3,1,14,0.82) 72%,
#0e0a2e 100%
)
`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 0,
        }}
      >
<div
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
      <p style={{ fontSize: 12.5, color: soft, lineHeight: 1.8, margin: 0, maxWidth: 380, marginInline: "auto" }}>
        밤하늘극장은 사랑과 시간, 그리고 기억에 깃든 감정을<br /> 섬세하게 노래하는 <strong>버츄얼 인디 밴드</strong>입니다.
      </p>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 34,
    marginTop: 24,
  }}
>
  {[
    { value: formatCompact(currentSubs), label: "Subscribers" },
    { value: albumCount, label: "Albums" },
    { value: trackCount, label: "Tracks" },
  ].map((item) => (
    <div
      key={item.label}
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: ACCENT,
          lineHeight: 1,
        }}
      >
        {item.value}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 10,
          color: muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {item.label}
      </div>
    </div>
  ))}
</div>
    </div>
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

const HomeCard = ({ children, pad = "0" }) => (
  <div
    style={{
      position: "relative",
      background: "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
      backdropFilter: "blur(22px)",
      WebkitBackdropFilter: "blur(22px)",
      border: "1px solid rgba(184,255,0,0.10)",
      borderRadius: 20,
      padding: pad,
      boxShadow: "0 14px 36px rgba(3,1,14,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 12% 0%, rgba(184,255,0,0.06), transparent 55%)",
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative" }}>{children}</div>
  </div>
);

const HomeHr = () => <div style={{ height: 1, background: "rgba(184,255,0,0.08)" }} />;

function HomeTab() {
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

  const visibleNews = newsExpanded ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 4);

  const ReleaseSchedule = (
    <HomeCard>
      <div style={{ padding: "18px 18px 12px" }}><SecHead title="발매일정" /></div>
      <HomeHr />
      {RELEASE_SCHEDULE.map((n, i, arr) => (
        <div key={n.title + n.date}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "12px 18px" }}>
            <div style={{ width: 56, flexShrink: 0 }}><Tag c={n.tagC}>{n.tag}</Tag></div>
            <span style={{ width: 44, flexShrink: 0, fontSize: 11, color: "rgba(220,210,255,0.75)", fontWeight: 600 }}>{n.date}</span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{n.title}</p>
          </div>
          {i < arr.length - 1 && <HomeHr />}
        </div>
      ))}
    </HomeCard>
  );

  const News = (
    <HomeCard>
      <div style={{ padding: "18px 18px 12px" }}><SecHead title="공지사항" /></div>
      <HomeHr />
      {visibleNews.map((n, i, arr) => (
        <div key={n.title + n.date}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px" }}>
            <span style={{ width: 44, flexShrink: 0, fontSize: 11, color: "rgba(220,210,255,0.75)", fontWeight: 600 }}>{n.date}</span>
            <p
  style={{
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    color: white,
    flex: 1,
    lineHeight: "20px",

    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  }}
>
  {n.title}
</p>
          </div>
          {i < arr.length - 1 && <HomeHr />}
        </div>
      ))}
      {NEWS_ITEMS.length > 4 && (
        <>
          <HomeHr />
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
    </HomeCard>
  );

  const OfficialLinks = (
   <HomeCard>
      <div style={{ padding: "18px 18px 12px" }}><SecHead title="Links" /></div>
      <HomeHr />
  <div
    style={{
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      padding: "0 14px 18px"
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
          padding: "12px 18px",
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
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
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
</HomeCard>
  );

  const Footer = (
    <div style={{ textAlign: "center", padding: "40px 0 4px" }}>
      <a href="mailto:hps_in@naver.com" style={{ fontSize: 12, color: soft, textDecoration: "none" }}>
        ✉ hps_in@naver.com
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
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "12px 14px 0" }}>
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

function CDDisc({ cover, color, size = 220, spinning = true, glow = false }) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
        filter: glow ? `drop-shadow(0 14px 42px ${color}77)` : "drop-shadow(0 10px 26px rgba(0,0,0,0.5))",
        transition: "filter 0.4s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: color,
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 0 0 6px rgba(255,255,255,0.025), inset 0 0 30px rgba(0,0,0,0.25)",
          overflow: "hidden",
          position: "relative",
          animation: spinning ? "cdspin 26s linear infinite" : "none",
        }}
      >
        <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"conic-gradient(from 0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.22) 8%, rgba(255,255,255,0.02) 18%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.18) 75%, rgba(255,255,255,0.02) 100%)",mixBlendMode:"overlay",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle at 30% 22%, rgba(255,255,255,0.28), transparent 45%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:"9%",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:"20%",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: size * 0.15,
          height: size * 0.15,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3), rgba(10,6,24,0.92) 62%)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: size * 0.045,
          height: size * 0.045,
          borderRadius: "50%",
          background: "rgba(3,1,14,0.92)",
        }}
      />
    </div>
  );
}

function MusicTab() {
  const displayAlbums = [...ALBUMS].reverse();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [direction, setDirection] = useState("next");
  const lockRef = useRef(false);
  const touchStartY = useRef(null);

  const alb = displayAlbums[index];
  const prevAlb = index > 0 ? displayAlbums[index - 1] : null;
  const nextAlb = index < displayAlbums.length - 1 ? displayAlbums[index + 1] : null;

  const goTo = (newIndex, dir) => {
    if (lockRef.current) return;
    if (newIndex < 0 || newIndex >= displayAlbums.length) return;
    lockRef.current = true;
    setDirection(dir);
    setIndex(newIndex);
    setTrackIdx(0);
    setTimeout(() => { lockRef.current = false; }, 360);
  };

  const goNext = () => goTo(index + 1, "next");
  const goPrev = () => goTo(index - 1, "prev");

  const onTouchStart = (e) => {
    if (selected) return;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (selected || touchStartY.current === null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;
    if (Math.abs(dy) < 40) return;
    if (dy < 0) goNext(); else goPrev();
  };
  const onWheel = (e) => {
    if (selected) return;
    if (Math.abs(e.deltaY) < 12) return;
    if (e.deltaY > 0) goNext(); else goPrev();
  };

  const dotWindow = 7;
  let dStart = Math.max(0, index - Math.floor(dotWindow / 2));
  const dEnd = Math.min(displayAlbums.length, dStart + dotWindow);
  dStart = Math.max(0, dEnd - dotWindow);
  const dotIndices = Array.from({ length: dEnd - dStart }, (_, k) => dStart + k);

  // 가독성을 위해 배경 대비용 어두운 그림자 강도를 세팅합니다.
  const mainShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";
  const sideShadow = "0 10px 25px rgba(0, 0, 0, 0.5)";

  if (selected) {
    const tr = alb.tracks[trackIdx];
    return (
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={()=>setSelected(false)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:ACCENT,fontSize:13,fontFamily:"inherit",padding:0,marginBottom:4}}>← 목록으로</button>
        <G acc>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{flexShrink:0}}>
              <CDDisc cover={alb.cover} color={alb.color} size={92} spinning glow />
            </div>
            <div style={{flex:1,minWidth:0,textAlign:"left"}}>
              <p style={{fontSize:9,color:ACCENT,fontWeight:700,margin:"0 0 4px",letterSpacing:"0.1em",opacity:0.8}}>{alb.year}</p>
              <p style={{fontSize:16,fontWeight:900,color:white,margin:"0 0 6px",fontFamily:"'Noto Serif KR',serif",lineHeight:1.3,letterSpacing:"-0.3px"}}>{alb.title}</p>
              <p style={{fontSize:11.5,color:muted,lineHeight:1.6,margin:0,fontStyle:"italic"}}>"{alb.desc}"</p>
            </div>
          </div>
          <Hr my={16}/>
          <div style={{display:"flex",justifyContent:"center",gap:5}}>
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

return (
  <div
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    onWheel={onWheel}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "66dvh",
      boxSizing: "border-box",
      
      // 핵심: 이 영역 안에서는 브라우저의 기본 스크롤/제스처를 작동시키지 않음
      touchAction: "none" 
    }}
  >
      {/* [수정] 최상단으로 이동한 앨범 타이틀 및 정보 영역 */}
      <div style={{ textAlign: "center", marginBottom: 20, minHeight: 70 }}>
        <p style={{ fontSize: 10, color: muted, letterSpacing: "0.16em", margin: "0 0 8px", textTransform: "uppercase" }}>
          DISCOGRAPHY
        </p>
        <p
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: white,
            margin: "0 0 4px",
            fontFamily: "'Noto Serif KR',serif",
            letterSpacing: "-0.3px"
          }}
        >
          {alb.title}
        </p>
        <p
          style={{
            fontSize: 11,
            color: ACCENT,
            fontWeight: 700,
            margin: 0,
          }}
        >
          {alb.year}
        </p>
      </div>

      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          height: 520, // 텍스트가 빠진 만큼 전체 컨테이너 높이를 620 -> 520으로 밸런스를 맞췄습니다.
          width: "100%",
          padding: "20px 0",
          animation: `${direction === "next" ? "slideUpIn" : "slideDownIn"} .36s ease both`,
        }}
      >
        {/* [이전 앨범] */}
        {prevAlb && (
          <div
            onClick={goPrev}
            style={{
              position: "absolute",
              top: 0, 
              transform: "scale(.58)", 
              opacity: 0.25,
              cursor: "pointer",
              zIndex: 1,
              filter: `drop-shadow(${sideShadow})`,
              transition: "all 0.3s"
            }}
          >
            <CDDisc
              cover={prevAlb.cover}
              color={prevAlb.color}
              size={190}
              spinning={false}
            />
          </div>
        )}

        {/* [현재 메인 앨범] 내부 텍스트를 제거하고 CD만 깔끔하게 노출 */}
        <div 
          style={{ 
            zIndex: 2, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            height: 250, // 텍스트 영역이 없어져서 순수 CD 사이즈에 맞춤
            justifyContent: "center"
          }}
        >
          <div 
            onClick={() => setSelected(true)} 
            style={{ 
              cursor: "pointer",
              filter: `drop-shadow(${mainShadow})` 
            }}
          >
            <CDDisc
              cover={alb.cover}
              color={alb.color}
              size={250}
              spinning
              glow
            />
          </div>
        </div>

        {/* [다음 앨범] */}
        {nextAlb && (
          <div
            onClick={goNext}
            style={{
              position: "absolute",
              bottom: 0, 
              transform: "scale(.58)", 
              opacity: 0.25,
              cursor: "pointer",
              zIndex: 1,
              filter: `drop-shadow(${sideShadow})`,
              transition: "all 0.3s"
            }}
          >
            <CDDisc
              cover={nextAlb.cover}
              color={nextAlb.color}
              size={190}
              spinning={false}
            />
          </div>
        )}
      </div>

      {/* 하단 인디케이터 및 안내문 */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 18 }}>
        {dotIndices.map(i => (
          <div key={i} onClick={() => goTo(i, i > index ? "next" : "prev")} style={{ width: i === index ? 18 : 6, height: 6, borderRadius: 3, background: i === index ? ACCENT : "rgba(255,255,255,0.18)", cursor: "pointer", transition: "all 0.2s" }} />
        ))}
      </div>
      <p style={{ fontSize: 10, color: muted, marginTop: 18, letterSpacing: "0.06em" }}>{index + 1} / {displayAlbums.length}</p>
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", marginTop: 14 }}>↕ 스와이프해서 앨범 넘기기 · 탭하면 재생목록</p>
    </div>
  );
}
// ── 방명록 (Firebase 기능 유지 + 인라인 작성형 + 랜덤 어나니머스 아바타) ─────────────────────────────
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

// 어나니머스 아바타용 색상 팔레트 (기존 낙서 색상과 통일감 있게)
const AVATAR_COLORS = [
  "#B8FF00", "#8ab4ff", "#ff8b94", "#a8e6cf", "#ffcc44",
  "#c4b5fd", "#fbcfe8", "#7dd3fc", "#fca5a5", "#86efac",
];

// entry.id 기반으로 매번 같은 색/아이콘이 나오도록 결정론적 해시
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function AnonymousAvatar({ id }) {
  const seed = hashSeed(id || "anon");
  const color = AVATAR_COLORS[seed % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `${color}22`,
        border: `1px solid ${color}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    </div>
  );
}

function GuestbookTab({
  entries,
  loadMore,
  hasMore,
  loadGuestbook,
}) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);



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

await loadGuestbook();

setName("");
setPw("");
setMsg("");
setDone(true);
      setTimeout(() => setDone(false), 1600);
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

await loadGuestbook();
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
    borderRadius: "12px",
    color: "#fff",
    padding: "10px 14px",
    fontSize: "12px",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        color: "#fff",
      }}
    >
      {/* 🌌 타이틀 */}
      <div style={{ padding: "16px 4px 6px" }}>
        <h2 style={{ margin: "0 0 4px 0", fontSize: 16, fontWeight: 700, color: LIME }}>
          밤하늘 낙서장
        </h2>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>
          밤하늘에 지워지지 않을 당신의 한 줄을 남겨주세요.
        </p>
      </div>

      {/* ✍️ 인라인 작성 카드 */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임"
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
            type="password"
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="방명록을 작성해 주세요..."
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            onClick={submit}
            style={{
              flexShrink: 0,
              padding: "0 18px",
              borderRadius: 12,
              border: "none",
              background: done ? ACCENT : "rgba(255,255,255,0.9)",
              color: "#111",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {done ? "완료 ✨" : "남기기"}
          </button>
        </div>
      </div>

      {/* 📜 낙서 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {entries.map((e) => (
          <div
            key={e.id}
            style={{
              position: "relative",
              display: "flex",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <AnonymousAvatar id={e.id} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: white }}>{e.name}</span>
                <span style={{ fontSize: 10.5, color: muted }}>{timeAgo(e.createdAt)}</span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: soft,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  textAlign: "left",
                }}
              >
                {e.msg}
              </p>
            </div>
            <button
              onClick={() => del(e)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.28)",
                cursor: "pointer",
                fontSize: 12,
                padding: 4,
              }}
              onMouseEnter={(ev) => (ev.target.style.color = "#ff4d4d")}
              onMouseLeave={(ev) => (ev.target.style.color = "rgba(255,255,255,0.28)")}
            >
              ✕
            </button>
          </div>
        ))}
        {entries.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 12, color: muted, padding: "20px 0" }}>
            아직 낙서가 없어요. 첫 별을 남겨보세요.
          </p>
        )}
        {hasMore && (
  <button
    onClick={loadMore}
    style={{
      width: "100%",
      marginTop: 16,
      padding: "12px",
      borderRadius: 12,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "#fff",
      cursor: "pointer",
      fontSize: 13,
    }}
  >
    더보기
  </button>
)}
      </div>
    </div>
  );
}

// ── APP (메인 컴포넌트 단일 Export Default) ───────────────────
export default function App() {
  const [tab, setTab] = useState(NAV_ITEMS[0].id);
  const scrollPositions = useRef({});
  // 💡 방명록 데이터를 최상위 App에서 관리하여 앱이 켜지자마자 미리 로딩합니다.
  const [guestbookEntries, setGuestbookEntries] = useState([]);
const [lastDoc, setLastDoc] = useState(null);
const [hasMore, setHasMore] = useState(true);
const changeTab = (nextTab) => {
  // 현재 탭 위치 저장
  scrollPositions.current[tab] = window.scrollY;

  // 탭 변경
  setTab(nextTab);
};
  // Chart.js 로드용 useEffect
  useEffect(() => {
    if (document.querySelector('script[src*="chart.umd.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    document.head.appendChild(s);
  }, []);

 const loadGuestbook = async () => {
  const q = query(
    collection(db, "guestbook"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  setGuestbookEntries(data);

setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

// 항상 초기화
setHasMore(true);

if (snapshot.docs.length < 10) {
  setHasMore(false);
}
};

useEffect(() => {
  loadGuestbook();
}, []);
useEffect(() => {
  requestAnimationFrame(() => {
    window.scrollTo(
      0,
      scrollPositions.current[tab] ?? 0
    );
  });
}, [tab]);
const loadMore = async () => {
  if (!lastDoc) return;

  const q = query(
    collection(db, "guestbook"),
    orderBy("createdAt", "desc"),
    startAfter(lastDoc),
    limit(10)
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  setGuestbookEntries((prev) => [...prev, ...data]);

  // 마지막 문서 저장
  if (snapshot.docs.length > 0) {
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  }

  // 더 가져올 데이터가 없으면 버튼 숨김
  if (snapshot.docs.length < 10) {
    setHasMore(false);
  }
};
  return (
    <div style={{ minHeight: "100vh", background: "#0e0a2e", color: "#fff", fontFamily: "'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @keyframes tw    { from{opacity:.05} to{opacity:.65} }
        @keyframes fin   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cdspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideUpIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDownIn { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        body { font-family:'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif; text-align:left; margin:0; }
        p, span, div { text-align:inherit; }
        textarea::placeholder, input::placeholder { color:rgba(255,255,255,0.3) }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:rgba(184,255,0,0.16);border-radius:3px }
        strong { font-weight:800 }
      `}</style>
      <Stars />

     <TopTab
  tab={tab}
  setTab={changeTab}
/>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: MOBILE_SHELL_WIDTH, margin: "0 auto", display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            padding:
              tab === NAV_ITEMS[0].id
                ? `${TOP_NAV_HEIGHT}px 0 60px`
                : tab === NAV_ITEMS[2].id
                  ? `${TOP_NAV_HEIGHT + 12}px 14px 40px`
                  : `${TOP_NAV_HEIGHT + 12}px 14px 60px`,
            animation: "fin 0.3s ease both"
          }}
        >
          <div style={{ display: tab === NAV_ITEMS[0].id ? "block" : "none" }}>
            <HomeTab />
          </div>

          <div style={{ display: tab === NAV_ITEMS[1].id ? "block" : "none" }}>
            <MusicTab />
          </div>

          <div style={{ display: tab === NAV_ITEMS[2].id ? "block" : "none" }}>
            {/* 💡 미리 로드한 데이터(entries)를 GuestbookTab에 전달합니다. */}
            <GuestbookTab
  entries={guestbookEntries}
  loadMore={loadMore}
  hasMore={hasMore}
  loadGuestbook={loadGuestbook}
/>
          </div>
        </div>
      </div>
    </div>
  );
}
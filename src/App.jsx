import { useState, useEffect, useRef } from "react";

const ACCENT = "#B8FF00";
const LIME   = ACCENT;
const glass  = "rgba(30,20,60,0.72)";
const gb     = "rgba(255,255,255,0.13)";
const muted  = "rgba(220,210,255,0.36)";
const soft   = "rgba(220,210,255,0.70)";
const white  = "#F2EEF9";
const EMOJI_FONT_STACK = "'Twemoji Mozilla','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";

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
      { n: 1, title: "겨울의 대삼각형", mood: "가까운 듯 멀게 엇갈린 세 점처럼\n우린 서로를 바라보며 빛나고 있어" },
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
      { n: 1, title: "今日が一番幼い日", mood: "今日が一番幼い日\n明日は私たちの描く夢" },
      { n: 2, title: "不完全な踊り", mood: "プラスマイナスのない世界\n天国と地獄 その中にいるじゃん" },
      { n: 3, title: "音の出ない心", mood: "慣れた日々に溶けていくように\n私の手をすり抜けていった" },
      { n: 4, title: "星影の叫び", mood: "星の間で君を呼ぶ\n静かに風が流れる" },
      { n: 5, title: "君のために", mood: "君のために生きてるんだよ\n君だからこうしてるんだよ" },
      { n: 6, title: "私、ドラゴンじゃないのに", mood: "白い息が出ちゃう\n私、ドラゴンじゃないのに" },
      { n: 7, title: "闇が怖い幽霊", mood: "暗くて 見えなくて\n静寂に飲まれそうで" }
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
      { n: 6, title: "낮에도 별은 떠 있어", mood: "밤이 오면 별을 세어 보자\n오늘을 견딘 만큼 하나씩 떠 있을 거야" },
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
      { n: 1, title: "ただ風が好きだから", mood: "ただ風が好きだから\nもう少し歩くことにしたよ" },
      { n: 2, title: "ただやるだけさ", mood: "ただやるだけさ\nドラマチックな展開はないけれど" },
      { n: 2, title: "ただ普通に生きたいんだ", mood: "ただ普通に生きたいんだ\n私の歩幅まで急かさないでよ" }
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
      { n: 2, title: "We didn't win, we just went numb", mood: "s this what it means to finally grow up?\nTo pour out the soul and just fill the cup?" },
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
  }
];

const ALL_TRACKS = ALBUMS.flatMap(a => a.tracks.map(t => ({...t, album:a.title})));

const CHART = [
  {rank:1, title:"우리들의 발라드",                    trend:null},
  {rank:2, title:"말하지 않은 것들의 무게",             trend:"up"},
  {rank:3, title:"꽃이 피든 말든",                     trend:"new"},
  {rank:4, title:"내 소중한 마음은 비밀이야",           trend:null},
  {rank:5, title:"자발적으로 표류하는 우주비행사",      trend:"up"},
  {rank:6, title:"운외창천 (雲外蒼天)",                 trend:"down"},
  {rank:7, title:"운명애",                    trend:"down"},
  {rank:8, title:"나는 오늘 또 어떤 핑계를 대었는가",  trend:"new"},
  {rank:9, title:"출근하기 싫은데 알람은 또 맞춰놨어", trend:"down"},
  {rank:10,title:"죽어가는 모든 것들을 사랑해야지",  trend:"new"},
];

const OVERSEAS = [
  { flag: "https://flagcdn.com/in.svg", emoji: "🇮🇳", name: "인도", pct: 32 },
  { flag: "https://flagcdn.com/jp.svg", emoji: "🇯🇵", name: "일본", pct: 14 },
  { flag: "https://flagcdn.com/tw.svg", emoji: "🇹🇼", name: "대만", pct: 10 },
  { flag: "https://flagcdn.com/us.svg", emoji: "🇺🇸", name: "미국", pct: 8 },
  { flag: "https://flagcdn.com/ua.svg", emoji: "🇺🇦", name: "우크라이나", pct: 7 },
  { flag: "https://flagcdn.com/id.svg", emoji: "🇮🇩", name: "인도네시아", pct: 5 },
  { flag: "https://flagcdn.com/tr.svg", emoji: "🇹🇷", name: "튀르키예", pct: 5 },
  { flag: null, emoji: "🌍", name: "기타", pct: 19 },
];

const SUB_DATA = [
  {month:"11월", subs:132},
  {month:"12월", subs:182},
  {month:"1월",  subs:219},
  {month:"2월",  subs:262},
  {month:"3월",  subs:300},
  {month:"4월",  subs:345},
  {month:"5월",  subs:410},
];

const TIMELINE = [
  {year:"2025.09", tag:"싱글",   tagC:LIME,      desc:"첫 싱글 [그대였죠] 발매. 밤하늘극장의 첫 목소리"},
  {year:"2026.01", tag:"정규",   tagC:LIME,      desc:"[자발적으로 표류하는 우주비행사] 발매"},
  {year:"2026.01", tag:"정규",   tagC:LIME,      desc:"[오늘이 가장 어렸던 날이야] 발매"},
  {year:"2026.01", tag:"EP",   tagC:LIME,      desc:"[전우치] 발매"},
  {year:"2026.01", tag:"정규",   tagC:LIME,      desc:"[사랑은 말이야] 발매"},
  {year:"2026.02", tag:"정규",   tagC:LIME,      desc:"[이 봄은 다른 이름이 될까] 발매"},
  {year:"2026.02", tag:"정규",   tagC:LIME,      desc:"[不完全な踊り (불완전한 춤)] 발매"},
  {year:"2026.02", tag:"정규",   tagC:LIME,      desc:"[운명애] 발매"},
  {year:"2026.02", tag:"EP",   tagC:LIME,      desc:"[사막 위의 잠수함] 발매"},
  {year:"2026.03", tag:"정규",   tagC:LIME,      desc:"[나는 오늘 또 어떤 핑계를 대었는가] 발매"},
  {year:"2026.03", tag:"EP",   tagC:LIME,      desc:"[죽어가는 모든 것들을 사랑해야지] 발매"},
  {year:"2026.03", tag:"싱글",   tagC:LIME,      desc:"[ただ (그냥)] 발매"},
  {year:"2026.03", tag:"구독",   tagC:"#ffcc44",      desc:"유튜브 구독자 300명 돌파."},
  {year:"2026.04", tag:"싱글",   tagC:LIME,      desc:"[어느 새벽에 또 울었어] 발매"},
  {year:"2026.04", tag:"정규",   tagC:LIME,      desc:"[엄마가 띄워줬던 나는 점점 가라앉고 있어] 발매"},
  {year:"2026.04", tag:"정규",   tagC:LIME,      desc:"[아픈 청춘들아] 발매"},
  {year:"2026.05", tag:"EP",   tagC:LIME,      desc:"[허수아비에게] 발매"},
  {year:"2026.05", tag:"싱글",   tagC:LIME,      desc:"[SKIP] 발매"},
  {year:"2026.05", tag:"싱글",   tagC:LIME,      desc:"[두려운 것 투성이야, 세상은] 발매"}
];

const INIT_GB = [
  {id:1,name:"새벽여행자",pw:"1234",msg:"우리들의 발라드 듣고 밤새 울었어요. 고맙습니다.",time:"05.25",likes:14,reply:"늦은 새벽에 함께해줘서 저도 고마워요 — 밤하늘극장"},
  {id:2,name:"별빛수집가",pw:"1234",msg:"자발적으로 표류하는 우주비행사 진짜 제 얘기 같아요…",time:"05.24",likes:9,reply:""},
  {id:3,name:"moonlight", pw:"1234",msg:"밤하늘극장 발견한 날이 올해 최고의 날이었어요",time:"05.23",likes:11,reply:"그 말이 저희한테도 최고의 댓글이에요 — 밤하늘극장"},
];

// 이모지 전용 폰트스택
const EMOJI_FONT = EMOJI_FONT_STACK;

// ── PRIMITIVES ──────────────────────────────────────
function Stars() {
  const s = useRef(Array.from({length:100},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,r:Math.random()*1.4+0.2,o:Math.random()*0.4+0.08,d:Math.random()*5+2}))).current;
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
      {s.map(st=><div key={st.id} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.r*2,height:st.r*2,borderRadius:"50%",background:"#fff",opacity:st.o,animation:`tw ${st.d}s ease-in-out infinite alternate`}}/>)}
    </div>
  );
}

const G = ({children,acc,pad="20px 18px 16px",style={}}) => (
  <div style={{background:acc?"rgba(184,255,0,0.07)":glass,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:`1px solid ${acc?"rgba(184,255,0,0.2)":gb}`,borderRadius:16,padding:pad,...style}}>
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

// ── BOTTOM NAV ──────────────────────────────────────
const NAV_ITEMS = [
  {id:"홈",    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>},
  {id:"소개",  svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>},
  {id:"음악",  svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>},
  {id:"방명록",svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>},
];

function BottomNav({tab,setTab}) {
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:900,zIndex:200,background:"rgba(3,1,14,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:`1px solid rgba(184,255,0,0.1)`,display:"flex"}}>
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

// ── 유튜브 채널 분석 ─────────────────
function SubChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const loadChart = () => {
      if (!window.Chart) { setTimeout(loadChart, 50); return; }
      if (chartRef.current) chartRef.current.destroy();
      const ctx = canvasRef.current.getContext("2d");
      const grad = ctx.createLinearGradient(0, 0, 0, 130);
      grad.addColorStop(0, "rgba(184,255,0,0.22)");
      grad.addColorStop(1, "rgba(184,255,0,0.00)");
      chartRef.current = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: SUB_DATA.map(d => d.month),
          datasets: [{
            data: SUB_DATA.map(d => d.subs),
            borderColor: ACCENT,
            borderWidth: 2,
            tension: 0.45,
            pointRadius: SUB_DATA.map((_, i) => i === SUB_DATA.length - 1 ? 5 : 3),
            pointBackgroundColor: ACCENT,
            pointBorderColor: ACCENT,
            pointHoverRadius: 6,
            fill: true,
            backgroundColor: grad,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(20,14,50,0.92)",
              borderColor: "rgba(184,255,0,0.25)",
              borderWidth: 1,
              titleColor: "rgba(220,210,255,0.55)",
              bodyColor: ACCENT,
              bodyFont: { size: 13, weight: "700" },
              displayColors: false,
              callbacks: { label: ctx => ctx.parsed.y + "명" }
            }
          },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.04)" },
              ticks: {
                color: "rgba(220,210,255,0.38)",
                font: { size: 10, family: "monospace" },
                maxRotation: 0,
                autoSkip: false,
              },
              border: { display: false }
            },
            y: {
              min: 100,
              max: 440,
              grid: { color: "rgba(255,255,255,0.05)" },
              ticks: {
                color: "rgba(220,210,255,0.30)",
                font: { size: 9 },
                stepSize: 80,
                callback: v => v + "명"
              },
              border: { display: false }
            }
          },
          interaction: { mode: "index", intersect: false },
          animation: { duration: 800, easing: "easeInOutQuart" }
        }
      });
    };
    loadChart();
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ position: "relative", width: "100%", height: 160 }}>
        <canvas ref={canvasRef} role="img" aria-label="유튜브 채널 분석" />
      </div>
    </div>
  );
}

// ── 홈 ──────────────────────────────────────────────
function HomeTab({isPC}) {
  const [track,setTrack]=useState(null);

  useEffect(()=>{
    const seed=new Date().toDateString(); let h=0;
    for(let c of seed) h=(h*31+c.charCodeAt(0))%ALL_TRACKS.length;
    setTrack(ALL_TRACKS[Math.abs(h)]);
  },[]);

  const rankColor = r => r===1?ACCENT:r===2?"rgba(91,79,245,0.65)":r===3?"rgba(91,79,245,0.4)":muted;
  const trendColor = t => t==="up"?"#4f8ef7":t==="down"?"#f87171":t==="new"?ACCENT:muted;
  const trendLabel = t => t==="up"?"▲":t==="down"?"▼":t==="new"?"N":"—";

  const TodayPick = (
    <G acc style={{padding:"26px 20px",position:"relative",overflow:"hidden", textAlign:"center"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(184,255,0,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <p style={{fontSize:10,fontWeight:600,color:LIME,letterSpacing:"0.12em",margin:"0 0 18px",opacity:0.8}}>Today's Pick</p>
      {track&&<>
        <p style={{fontSize:22,fontWeight:700,color:white,margin:"0 0 6px",lineHeight:1.3,letterSpacing:"-0.3px"}}>{track.title}</p>
        <p style={{fontSize:12,color:muted,margin:"0 0 10px"}}>{track.album}</p>
        {track.mood&&<p style={{fontSize:13,color:`${LIME}88`,margin:0,fontFamily:"'Noto Serif KR',serif",transform: "skewX(-12deg)",
display: "inline-block",whiteSpace:"pre-line"}}>"{track.mood}"</p>}
      </>}
    </G>
  );

  const Notice = (
    <G pad="0">
      <div style={{padding:"20px 18px 12px"}}><SecHead title="공지사항"/></div>
      <Hr/>
      {[
        {tag:"채널",   tagC:"#aaaaff", date:"04.25",title:"유튜브 구독자 400명 돌파"},
        {tag:"정규",   tagC:"#ff8b94",      date:"05.28",title:"'허수아비에게' 발매"},
        {tag:"미니",   tagC:"#ffd3b6",      date:"05.28",title:"'SKIP' 발매"},
        {tag:"싱글",   tagC:"#a8e6cf",      date:"05.28",title:"'두려운 것 투성이야, 세상은' 발매"},
        {tag:"예정", tagC:"#ffcc44", date:"06.09",title:"'별 하나와 달 하나, 그리고 나의 마음' 발매 예정"},
        
      ].map((n,i,arr)=>(
        <div key={i}>
          <div style={{display:"flex",alignItems:"center",gap:0,padding:"11px 18px"}}>
            <div style={{width:56,flexShrink:0}}><Tag c={n.tagC}>{n.tag}</Tag></div>
            <span style={{width:44,flexShrink:0,fontSize:11,color:"rgba(220,210,255,0.75)",fontWeight:600}}>{n.date}</span>
            <p style={{margin:0,fontSize:13,fontWeight:500,color:white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{n.title}</p>
          </div>
          {i<arr.length-1&&<Hr/>}
        </div>
      ))}
    </G>
  );
const currentSubs = SUB_DATA[SUB_DATA.length - 1].subs;
const prevSubs    = SUB_DATA[SUB_DATA.length - 2].subs;

const increase = currentSubs - prevSubs;
const growth   = ((increase / prevSubs) * 100).toFixed(1);
  const SubSection = (
    <G>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <SecHead title="유튜브 채널 분석" sub="최근 7개월 기준"/>
        <div style={{textAlign:"right"}}>
          <p style={{fontSize:20,fontWeight:900,color:ACCENT,margin:0,lineHeight:1}}>410</p>
          <p style={{fontSize:9,color:muted,margin:"3px 0 0"}}>현재 구독자</p>
        </div>
      </div>
      <SubChart/>
<div style={{display:"flex",justifyContent:"space-around",marginTop:14}}>
  {[
  {label:"최근 30일 증가",val:`+${increase}`},
  {label:"채널 성장률",val:`+${growth}%`},
  {label:"조회수",val:"17.7만회"},
].map((s,i)=>(
    <div key={i} style={{textAlign:"center"}}>
      <p style={{
        fontSize:14,
        fontWeight:800,
        color:
          i===0 ? ACCENT :
          i===1 ? "#4f8ef7" :
          "#c8d98a"
      }}>
        {s.val}
      </p>

      <p style={{
        fontSize:9,
        color:muted,
        margin:"-2px 0 0"
      }}>
        {s.label}
      </p>
    </div>
  ))}
</div>
    </G>
  );

  const Top10 = (
    <G pad="0">
      <div style={{padding:"20px 18px 12px"}}><SecHead title="밤하늘극장 인기차트 TOP 10" sub="'26년 5월 기준"/></div>
      <Hr/>
      {CHART.map((t,i)=>(
        <div key={i}>
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px"}}>
            <span style={{width:22,textAlign:"center",fontWeight:900,flexShrink:0,fontSize:t.rank<=3?14:12,color:rankColor(t.rank)}}>{t.rank}</span>
            <p style={{flex:1,margin:0,fontSize:13,fontWeight:t.rank<=3?700:400,color:t.rank===1?white:t.rank<=3?"rgba(242,238,249,0.85)":soft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</p>
            <span style={{fontSize:11,fontWeight:700,color:trendColor(t.trend),width:14,textAlign:"center",flexShrink:0}}>{trendLabel(t.trend)}</span>
          </div>
          {i<CHART.length-1&&<Hr/>}
        </div>
      ))}
    </G>
  );

  // 해외 청취율 — 이모지 폰트 명시
  const Overseas = (
    <G>
      <SecHead title="해외 청취율" sub="5월 유튜브 기준"/>
      <div style={{marginTop:10}}>
        {OVERSEAS.map((o,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",marginBottom:i<OVERSEAS.length-1?10:0}}>
<div style={{
  width:34,
  flexShrink:0,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
}}>
  {isPC ? (
    o.flag ? (
      <div style={{
        width:18,
        height:18,
        borderRadius:"50%",
        overflow:"hidden",
        boxShadow:"0 0 6px rgba(255,255,255,0.12)",
      }}>
        <img
          src={o.flag}
          alt={o.name}
          draggable={false}
          style={{
            width:"100%",
            height:"100%",
            objectFit:"cover",
            display:"block",
            userSelect:"none",
            pointerEvents:"none",
          }}
        />
      </div>
    ) : (
      <span
        style={{
          fontSize:18,
          fontFamily:EMOJI_FONT,
          lineHeight:1,
        }}
      >
        🌍
      </span>
    )
  ) : (
    <span
      style={{
        fontSize:18,
        fontFamily:EMOJI_FONT,
        lineHeight:1,
      }}
    >
      {o.emoji}
    </span>
  )}
</div>
            <span style={{fontSize:12,color:muted,width:68,flexShrink:0}}>{o.name}</span>
            <div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:4,height:5,overflow:"hidden"}}>
              <div style={{width:`${o.pct}%`,height:"100%",background:`linear-gradient(90deg,${ACCENT}cc,#4f8ef7)`,borderRadius:4}}/>
            </div>
            <span style={{fontSize:11,color:ACCENT,width:32,textAlign:"right"}}>{o.pct}%</span>
          </div>
        ))}
      </div>
    </G>
  );

  if (isPC) {
    return (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,textAlign:"left",alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>{TodayPick}{Top10}</div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>{Notice}{SubSection}{Overseas}</div>
      </div>
    );
  }
  return <div style={{display:"flex",flexDirection:"column",gap:10,textAlign:"left"}}>{TodayPick}{Notice}{Top10}{SubSection}{Overseas}</div>;
}

// ── 소개 ────────────────────────────────────────────
function AboutTab({isPC}) {
  const STREAMING = [
    {
      name: "YouTube",
      color: "#FF0000",
      bg: "rgba(255,0,0,0.12)",
      border: "rgba(255,0,0,0.25)",
      url: "https://www.youtube.com/@NightSkyTheater",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "Melon",
      color: "#00CD3C",
      bg: "rgba(0,205,60,0.10)",
      border: "rgba(0,205,60,0.25)",
      url: "https://www.melon.com",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <ellipse cx="12" cy="13" rx="9" ry="8" fill="#00CD3C"/>
          <path d="M12 5C12 5 7 7 6 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 5 Q14 2 17 3" stroke="#00CD3C" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M12 4.5 Q13.5 1.5 17.5 2.5" stroke="#4a4a4a" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <text x="12" y="15.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">melon</text>
        </svg>
      )
    },
    {
      name: "Spotify",
      color: "#1DB954",
      bg: "rgba(29,185,84,0.10)",
      border: "rgba(29,185,84,0.25)",
      url: "https://open.spotify.com",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      )
    },
    {
      name: "Apple Music",
      color: "#FA243C",
      bg: "rgba(250,36,60,0.10)",
      border: "rgba(250,36,60,0.25)",
      url: "https://music.apple.com",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#FA243C">
          <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208a5.494 5.494 0 0 0-.39 1.548c-.04.27-.066.543-.077.817v13.5c.016.297.04.595.09.89.196 1.164.715 2.14 1.582 2.955.672.628 1.47 1.01 2.353 1.206.41.09.83.128 1.25.147l.484.019H18.44c.303-.012.604-.036.904-.084 1.07-.176 2.003-.651 2.76-1.42.58-.592.975-1.31 1.2-2.11.1-.36.158-.727.188-1.098.012-.15.02-.298.026-.448l.001-.139V6.124zm-7.54 5.897c-.044.057-.094.107-.148.154l-4.957 4.127a.826.826 0 0 1-.536.193.831.831 0 0 1-.536-1.465l4.423-3.68-4.423-3.68a.831.831 0 0 1 1.072-1.272l4.957 4.127c.055.047.105.097.148.154.104.137.166.308.166.496 0 .188-.062.358-.166.496v-.65z"/>
        </svg>
      )
    },
    {
      name: "YouTube Music",
      color: "#FF0000",
      bg: "rgba(255,0,0,0.10)",
      border: "rgba(255,0,0,0.22)",
      url: "https://music.youtube.com",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <circle cx="12" cy="12" r="12" fill="#FF0000"/>
          <circle cx="12" cy="12" r="4.5" fill="white"/>
          <circle cx="12" cy="12" r="2" fill="#FF0000"/>
          <polygon points="10.5,9.5 15.5,12 10.5,14.5" fill="white"/>
        </svg>
      )
    },
    {
      name: "Genie",
      color: "#00A2E0",
      bg: "rgba(0,162,224,0.10)",
      border: "rgba(0,162,224,0.25)",
      url: "https://www.genie.co.kr",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <circle cx="12" cy="12" r="11" fill="#00A2E0"/>
          <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">genie</text>
        </svg>
      )
    },
    {
      name: "Bugs",
      color: "#FF5500",
      bg: "rgba(255,85,0,0.10)",
      border: "rgba(255,85,0,0.25)",
      url: "https://music.bugs.co.kr",
      svg: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <circle cx="12" cy="12" r="11" fill="#FF5500"/>
          <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">bugs</text>
        </svg>
      )
    },
  ];

  const Hero = (
    <G style={{textAlign:"center",position:"relative",overflow:"hidden",padding:"26px 22px"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(184,255,0,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{width:68,height:68,borderRadius:"50%",background:LIME,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,boxShadow:`0 0 28px ${LIME}44`,animation:"fl 4s ease-in-out infinite", fontFamily: EMOJI_FONT}}>🪐</div>
      <p style={{fontSize:11,color:LIME,fontWeight:700,margin:"0 0 6px",letterSpacing:"0.1em"}}>NIGHT SKY THEATER</p>
      <h2 style={{fontSize:22,fontWeight:900,color:white,margin:"0 0 6px",fontFamily:"'Noto Serif KR',serif"}}>밤하늘극장</h2>
      <p style={{fontSize:12,color:muted,margin:"0 0 16px",lineHeight:1.7}}>@NightSkyTheater · 구독자 401명 · 유통 (주)와이지플러스</p>
      <Hr my={4}/>
      <p style={{fontSize:13,color:soft,lineHeight:1.95,margin:"14px 0 0",textAlign:"left"}}>
        감정이 흐르는 무대, 별빛 같은 노래가 머무는 곳.<br/>
        <strong style={{color:white}}>유우레이</strong>와 <strong style={{color:white}}>임보성</strong>이 함께하는 감성 인디 프로젝트입니다.<br/>
        어둠 속에서도 빛나는 별처럼, 위로가 필요한 새벽에 당신 곁에 머물고 싶습니다.
      </p>
    </G>
  );

  const Artists = (
    <G>
      <SecHead title="아티스트"/>
      {[
        {name:"유우레이",role:"보컬 · 작사",desc:"목소리로 감정의 결을 만드는 사람. 밤하늘극장의 감성적 언어를 담당한다.", emoji:"🎤"},
        {name:"임보성",role:"프로듀서 · 작곡",desc:"사운드로 세계관을 구축하는 사람. 밤하늘극장의 음악적 방향을 이끈다.", emoji:"🎹"},
      ].map((a,i)=>(
        <div key={i} style={{marginBottom:i===0?16:0}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(184,255,0,0.1)",border:"1px solid rgba(184,255,0,0.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,fontFamily:EMOJI_FONT}}>{a.emoji}</div>
            <div>
              <p style={{margin:0,fontSize:14,fontWeight:800,color:white}}>{a.name}</p>
              <p style={{margin:0,fontSize:10,color:LIME,opacity:0.75,fontWeight:600}}>{a.role}</p>
            </div>
          </div>
          <p style={{fontSize:12,color:muted,lineHeight:1.75,margin:0}}>{a.desc}</p>
          {i===0&&<Hr my={14}/>}
        </div>
      ))}
    </G>
  );

  const Streaming = (
    <G>
      <SecHead title="음원 스트리밍" sub="밤하늘극장 음악 바로 듣기"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginTop:14}}>
        {STREAMING.map((s, i) => (
          
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              gap:7,
              padding:"14px 8px 12px",
              background:s.bg,
              border:`1px solid ${s.border}`,
              borderRadius:14,
              textDecoration:"none",
              transition:"all 0.2s",
              cursor:"pointer",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 20px ${s.color}22`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
          >
            <div style={{
              width:44,
              height:44,
              borderRadius:"50%",
              background:"rgba(0,0,0,0.25)",
              border:`1.5px solid ${s.border}`,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              flexShrink:0,
            }}>
              {s.svg}
            </div>
            <span style={{fontSize:10,color:soft,fontWeight:600,textAlign:"center",lineHeight:1.3,whiteSpace:"nowrap"}}>{s.name}</span>
          </a>
        ))}
      </div>
    </G>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {Hero}
      {Artists}
      {Streaming}
    </div>
  );
}

// ── 음악 ────────────────────────────────────────────
function MusicTab({isPC}) {
  const [selected,setSelected]=useState(null);
  const [trackIdx,setTrackIdx]=useState(0);

  if (selected !== null) {
    const alb=ALBUMS[selected], tr=alb.tracks[trackIdx];
    return (
      <div style={{maxWidth:isPC?560:undefined,margin:isPC?"0 auto":undefined,display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={()=>{setSelected(null);setTrackIdx(0);}} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:ACCENT,fontSize:13,fontFamily:"inherit",padding:0,marginBottom:4}}>← 음반 목록</button>
        <G acc>
          <div style={{textAlign:"center"}}>
            <div style={{width:120,height:120,borderRadius:18,backgroundImage:`url(${alb.cover})`,backgroundColor:alb.color,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",border:"1px solid rgba(184,255,0,0.15)",margin:"0 auto 16px",overflow:"hidden",boxShadow:`0 10px 30px ${alb.color}44`}}/>
            <p style={{fontSize:10,color:ACCENT,fontWeight:700,margin:"0 0 4px",letterSpacing:"0.1em",opacity:0.8}}>{alb.year}</p>
            <p style={{fontSize:17,fontWeight:900,color:white,margin:"0 0 8px",fontFamily:"'Noto Serif KR',serif",lineHeight:1.3,letterSpacing:"-0.3px"}}>{alb.title}</p>
            <p style={{fontSize:12,color:muted,lineHeight:1.7,margin:0,fontStyle:"italic"}}>"{alb.desc}"</p>
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
            <div key={j}>
              <div onClick={()=>setTrackIdx(j)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",cursor:"pointer",background:j===trackIdx?"rgba(184,255,0,0.06)":"transparent",transition:"background 0.15s"}}>
                <span style={{fontSize:10,color:j===trackIdx?ACCENT:muted,width:16,flexShrink:0}}>{t.n}</span>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{margin:"0 0 1px",fontSize:13,fontWeight:j===trackIdx?700:400,color:j===trackIdx?white:soft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</p>
                  {t.mood&&<p style={{margin:0,fontSize:10,color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontStyle:"italic"}}>{t.mood}</p>}
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

  const cols = isPC ? "1fr 1fr 1fr" : "1fr 1fr";
  return (
    <div>
      <div style={{marginBottom:16}}><SecHead title="디스코그래피" sub={`총 ${ALBUMS.length}개 앨범`}/></div>
      <div style={{display:"grid",gridTemplateColumns:cols,gap:isPC?16:12}}>
        {[...ALBUMS].reverse().map((a,i)=>(
          <button key={a.id+"-"+i} onClick={()=>{setSelected(ALBUMS.length-1-i);setTrackIdx(0);}} style={{background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"left",fontFamily:"inherit",width:"100%",minWidth:0}}>
            <div
              style={{width:"100%",aspectRatio:"1/1",borderRadius:isPC?16:14,backgroundImage:`url(${a.cover})`,backgroundColor:a.color,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",border:"1px solid rgba(255,255,255,0.08)",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s ease",overflow:"hidden",position:"relative",boxShadow:`0 10px 35px ${a.color}33`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(184,255,0,0.35)";e.currentTarget.style.transform="translateY(-4px) scale(1.02)";e.currentTarget.style.boxShadow=`0 18px 45px ${a.color}55`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow=`0 10px 35px ${a.color}33`;}}
            />
            <p style={{fontSize:isPC?13:12,fontWeight:700,color:white,margin:"0 0 2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.3}}>{a.title}</p>
            <p style={{fontSize:10,color:muted,margin:0}}>{a.tracks.length}곡</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── 방명록 ──────────────────────────────────────────
function GuestbookTab({isPC}) {
  const [entries, setEntries] = useState(INIT_GB);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [editT, setEditT] = useState(null);
  const [editPw, setEditPw] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [editErr, setEditErr] = useState(false);

  // 이번 세션에서 이미 좋아요 누른 항목 id를 추적
  const likedSet = useRef(new Set());
  const nid = useRef(4);

  const IS = {
    background:"rgba(255,255,255,0.05)",
    border:`1px solid ${gb}`,
    borderRadius:10,
    color:white,
    padding:"10px 13px",
    fontSize:12,
    outline:"none",
    fontFamily:"inherit",
    boxSizing:"border-box",
    transition:"border-color 0.2s"
  };
  const fo = e => e.target.style.borderColor = "rgba(184,255,0,0.35)";
  const bl = e => e.target.style.borderColor = gb;

  const submit = () => {
    if (!name.trim() || !pw.trim() || !msg.trim()) return;
    setEntries(p => [{
      id: nid.current++,
      name: name.trim(),
      pw: pw.trim(),
      msg: msg.trim(),
      time: new Date().toLocaleDateString("ko-KR").replace(/\. /g,".").slice(0,-1),
      likes: 0,
      reply: ""
    }, ...p]);
    setName(""); setPw(""); setMsg("");
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  const like = id => {
    if (likedSet.current.has(id)) return; // 이미 누른 경우 무시
    likedSet.current.add(id);
    setEntries(p => p.map(e => e.id === id ? {...e, likes: e.likes + 1} : e));
  };

  const startEdit = e => {
    setEditT(e.id);
    setEditMsg(e.msg);
    setEditPw("");
    setEditErr(false);
  };

  const subEdit = entry => {
    if (editPw !== entry.pw) { setEditErr(true); return; }
    setEntries(p => p.map(e => e.id === entry.id ? {...e, msg: editMsg} : e));
    setEditT(null); setEditPw(""); setEditMsg(""); setEditErr(false);
  };

  const del = entry => {
    const v = window.prompt("비밀번호를 입력하세요");
    if (v === entry.pw) setEntries(p => p.filter(e => e.id !== entry.id));
  };

  const inner = (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <G acc>
        <p style={{fontSize:13,color:soft,lineHeight:1.85,margin:0}}>
          밤하늘극장을 찾아주셔서 감사해요.<br/>
          이곳에 당신의 감정을 남겨주세요.<br/>
          <span style={{fontSize:11,color:muted}}>닉네임 + 비밀번호로 작성 · 수정 · 삭제 가능합니다.</span>
        </p>
      </G>

      <G>
        <SecHead title="메시지 남기기"/>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <input value={name} onChange={e=>setName(e.target.value)} onFocus={fo} onBlur={bl} placeholder="닉네임" maxLength={12} style={{...IS,width:88}}/>
          <input value={pw} onChange={e=>setPw(e.target.value)} onFocus={fo} onBlur={bl} placeholder="비밀번호" type="password" maxLength={20} style={{...IS,flex:1}}/>
        </div>
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} onFocus={fo} onBlur={bl} placeholder="밤하늘극장에 남기고 싶은 말을 적어주세요" maxLength={150} rows={3} style={{...IS,width:"100%",resize:"none",lineHeight:1.65,marginBottom:8}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:10,color:muted}}>{msg.length}/150</span>
          <button onClick={submit} style={{background:done?"rgba(184,255,0,0.15)":"rgba(255,255,255,0.07)",border:`1px solid ${done?"rgba(184,255,0,0.4)":gb}`,color:done?LIME:soft,borderRadius:10,padding:"8px 20px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.3s"}}>
            {done ? "등록됨" : "남기기"}
          </button>
        </div>
      </G>

      <G pad="0">
        <div style={{padding:"14px 18px 12px"}}><SecHead title={`방명록 — ${entries.length}개`}/></div>
        <Hr/>
        {entries.map((entry, idx) => {
          const alreadyLiked = likedSet.current.has(entry.id);
          return (
            <div key={entry.id}>
              <div style={{padding:"14px 18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{fontSize:13,fontWeight:700,color:ACCENT}}>{entry.name}</span>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <span style={{fontSize:10,color:muted,fontFamily:"monospace"}}>{entry.time}</span>
                    <button onClick={()=>startEdit(entry)} style={{fontSize:10,color:muted,background:"none",border:"none",cursor:"pointer",padding:0}}>수정</button>
                    <button onClick={()=>del(entry)} style={{fontSize:10,color:"rgba(255,80,80,0.5)",background:"none",border:"none",cursor:"pointer",padding:0}}>삭제</button>
                  </div>
                </div>

                {editT === entry.id ? (
                  <div style={{marginBottom:8}}>
                    <textarea value={editMsg} onChange={e=>setEditMsg(e.target.value)} maxLength={150} rows={2} style={{...IS,width:"100%",resize:"none",marginBottom:6}}/>
                    <div style={{display:"flex",gap:6}}>
                      <input value={editPw} onChange={e=>setEditPw(e.target.value)} placeholder="비밀번호 확인" type="password" style={{...IS,flex:1}}/>
                      <button onClick={()=>subEdit(entry)} style={{background:"rgba(255,255,255,0.07)",border:`1px solid ${gb}`,color:soft,borderRadius:9,padding:"8px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>저장</button>
                      <button onClick={()=>setEditT(null)} style={{background:"none",border:`1px solid ${gb}`,color:muted,borderRadius:9,padding:"8px 9px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>취소</button>
                    </div>
                    {editErr && <p style={{fontSize:11,color:"#ff6666",margin:"4px 0 0"}}>비밀번호가 틀렸어요</p>}
                  </div>
                ) : (
                  <p style={{fontSize:13,color:soft,margin:"0 0 10px",lineHeight:1.82}}>{entry.msg}</p>
                )}

                {entry.reply && (
                  <div style={{background:"rgba(91,79,245,0.06)",border:"1px solid rgba(91,79,245,0.18)",borderRadius:10,padding:"10px 13px",marginBottom:10}}>
                    <p style={{fontSize:10,color:ACCENT,fontWeight:700,margin:"0 0 4px",opacity:0.8}}>밤하늘극장</p>
                    <p style={{fontSize:12,color:"rgba(200,230,150,0.72)",margin:0,lineHeight:1.75}}>{entry.reply}</p>
                  </div>
                )}

                <button
                  onClick={() => like(entry.id)}
                  style={{
                    display:"flex",
                    alignItems:"center",
                    gap:5,
                    background: alreadyLiked ? "rgba(220,60,90,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${alreadyLiked ? "rgba(220,60,90,0.32)" : gb}`,
                    borderRadius:20,
                    padding:"4px 13px",
                    cursor: alreadyLiked ? "default" : "pointer",
                    fontSize:12,
                    color: alreadyLiked ? "#ff6688" : muted,
                    fontFamily:"inherit",
                    transition:"all 0.15s"
                  }}
                  onMouseEnter={e => {
                    if (alreadyLiked) return;
                    e.currentTarget.style.background = "rgba(220,60,90,0.1)";
                    e.currentTarget.style.borderColor = "rgba(220,60,90,0.28)";
                  }}
                  onMouseLeave={e => {
                    if (alreadyLiked) return;
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = gb;
                  }}
                >
                  {alreadyLiked ? "♥" : "♡"} {entry.likes}
                </button>
              </div>
              {idx < entries.length - 1 && <Hr/>}
            </div>
          );
        })}
      </G>
    </div>
  );

  return isPC ? <div style={{maxWidth:640,margin:"0 auto"}}>{inner}</div> : inner;
}

// ── APP ─────────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState("홈");
  const [isPC,setIsPC]=useState(window.innerWidth>=768);

  useEffect(()=>{
    const fn=()=>setIsPC(window.innerWidth>=768);
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[]);
useEffect(() => {
  if (document.querySelector('script[src*="chart.umd.js"]')) return;
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
  document.head.appendChild(s);
}, []);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0e0a2e 0%,#120d38 35%,#160f42 65%,#0e0a2e 100%)",color:white,fontFamily:"'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif",position:"relative"}}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        
        @keyframes tw    { from{opacity:.05} to{opacity:.65} }
        @keyframes fl    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes pulse { 0%,100%{opacity:.15} 50%{opacity:1} }
        @keyframes fin   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        body {
          font-family:'Pretendard','Apple SD Gothic Neo','Noto Sans KR',sans-serif;
          text-align:left;
        }
        p, span, div { text-align:inherit; }
        textarea::placeholder,input::placeholder { color:rgba(255,255,255,0.13) }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:rgba(184,255,0,0.16);border-radius:3px }
        strong { font-weight:800 }
      `}</style>
      <Stars/>
      <div style={{position:"relative",zIndex:1,maxWidth:isPC?900:430,margin:"0 auto",display:"flex",flexDirection:"column",minHeight:"100vh"}}>
        <div style={{flex:1,padding:isPC?"20px 24px 90px":"12px 14px 76px",animation:"fin 0.3s ease both"}} key={tab}>
          {tab==="홈"    &&<HomeTab     isPC={isPC}/>}
          {tab==="소개"  &&<AboutTab    isPC={isPC}/>}
          {tab==="음악"  &&<MusicTab    isPC={isPC}/>}
          {tab==="방명록"&&<GuestbookTab isPC={isPC}/>}
        </div>
        <BottomNav tab={tab} setTab={setTab}/>
      </div>
    </div>
  );
}
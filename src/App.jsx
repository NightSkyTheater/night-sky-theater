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
  { id:1,  title:"그대였죠",                       cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966895/%EC%95%A8%EB%B2%94%EC%BB%A4%EB%B2%84_xc7hz4.jpg",    year:"2023", color:"#1a1428", desc:"처음 목소리를 꺼낸 날. 아무도 듣지 않아도 괜찮았던 새벽.", tracks:[{n:1,title:"그대였죠",mood:"그리움이 익숙해진 사람에게"},{n:2,title:"고장난시계",mood:"멈춘 시간 속에서 혼자 걷는 기분"},{n:3,title:"그 계절에",mood:"지나간 계절을 다시 꺼내는 밤"}]},
  { id:2,  title:"자발적으로 표류하는 우주비행사",    cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779967018/%EC%9E%90%EB%B0%9C%EC%A0%81%EC%9C%BC%EB%A1%9C_%ED%91%9C%EB%A5%98%ED%95%98%EB%8A%94_%EC%9A%B0%EC%A3%BC%EB%B9%84%ED%96%89%EC%82%AC_%EC%95%A8%EB%B2%94%EC%BB%A4%EB%B2%84_sdpihs.png",   year:"2025", color:"#0a1a10", desc:"길을 잃은 게 아니라 스스로 떠내려가기로 한 사람의 이야기.", tracks:[{n:1,title:"자발적으로 표류하는 우주비행사",mood:"계획 없이 살아가는 것도 용기"},{n:2,title:"출근하기 싫은데 알람은 또 맞춰놨어",mood:"그래도 살아야 하니까"},{n:3,title:"사막에서 수영하기",mood:"불가능한 걸 계속 시도하는 마음"},{n:4,title:"별자리를 잇다",mood:"점들을 연결하면 별자리가 된다"}]},
  { id:3,  title:"오늘이 가장 어렸던 날이야",        cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966970/3000x3000_q8gi5t.png",    year:"2024", color:"#0d1a2a", desc:"지금 이 순간이 남은 생에서 가장 젊은 날임을 아는 사람의 노래.", tracks:[{n:1,title:"겨울의 대삼각형",mood:"추운 밤 하늘을 올려다본 기억"},{n:2,title:"우리들의 발라드",mood:"같이 울었던 그 사람에게"},{n:3,title:"오늘이 가장 어렸던 날이야",mood:"지금을 살아야 하는 이유"},{n:4,title:"20에 50",mood:"서른을 앞두고 스무 살을 그리워하는"},{n:5,title:"나 지금도 충분히 버티고 있는데",mood:"무너지지 않으려고 애쓰는 모든 밤"},{n:6,title:"조명이 켜지고",mood:"무대 위에 서기 전 혼자인 시간"},{n:7,title:"사탄탱고",mood:"이상하게 중독되는 감정"},{n:8,title:"별이 비처럼 내리던 날",mood:"한 번도 잊지 못할 장면"}]},
  { id:4,  title:"전우치",        cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779967377/%EC%A0%84%EC%9A%B0%EC%B9%98_%EC%95%A8%EB%B2%94%EC%BB%A4%EB%B2%84_ukeahe.jpg",    year:"2024", color:"#0d1a2a", desc:"지금 이 순간이 남은 생에서 가장 젊은 날임을 아는 사람의 노래.", tracks:[{n:1,title:"겨울의 대삼각형",mood:"추운 밤 하늘을 올려다본 기억"},{n:2,title:"우리들의 발라드",mood:"같이 울었던 그 사람에게"},{n:3,title:"오늘이 가장 어렸던 날이야",mood:"지금을 살아야 하는 이유"},{n:4,title:"20에 50",mood:"서른을 앞두고 스무 살을 그리워하는"},{n:5,title:"나 지금도 충분히 버티고 있는데",mood:"무너지지 않으려고 애쓰는 모든 밤"},{n:6,title:"조명이 켜지고",mood:"무대 위에 서기 전 혼자인 시간"},{n:7,title:"사탄탱고",mood:"이상하게 중독되는 감정"},{n:8,title:"별이 비처럼 내리던 날",mood:"한 번도 잊지 못할 장면"}]},
  { id:5,  title:"사랑은 말이야",                  cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966790/%EC%82%AC%EB%9E%91%EC%9D%80%EB%A7%90%EC%9D%B4%EC%95%BC_di0mm2.jpg",      year:"2025", color:"#1a1408", desc:"말로 표현하지 않으면 사랑도 존재하지 않는 것인가.", tracks:[{n:1,title:"사랑은 말이야",mood:"표현해야 비로소 사랑이 된다"},{n:2,title:"F로 살기엔 세상은 너무 차가워",mood:"감정형 인간의 세상 적응기"},{n:3,title:"고백 연습",mood:"말하기 전 수백 번 머릿속으로"}]},
  { id:6,  title:"이 봄은 다른 이름이 될까",        cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966788/%EC%9D%B4-%EB%B4%84%EC%9D%B4-%EB%8B%A4%EB%A5%B8-%EC%9D%B4%EB%A6%84%EC%9D%B4-%EB%90%A0%EA%B9%8C_xbyrlh.jpg",     year:"2025", color:"#1a0d14", desc:"매년 오는 봄이지만 올해의 봄은 다를 것 같다는 예감.", tracks:[{n:1,title:"이 봄은 다른 이름이 될까",mood:"변화를 기다리는 설렘"},{n:2,title:"갑자기 오래된 노래가 떠오른 이유",mood:"어떤 노래는 사람을 데려온다"},{n:3,title:"말하지 않은 것들의 무게",mood:"침묵이 쌓여 무거워진 관계"},{n:4,title:"꿈은 없고요, 돈은 많고 싶네요",mood:"솔직한 어른의 소망"},{n:5,title:"방해 금지 모드",mood:"혼자 있고 싶은 날"}]},
  { id:7,  title:"不完全な踊り (불완전한 춤)",      cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779967108/%EC%95%A8%EB%B2%94%EC%BB%A4%EB%B2%84_vdepkn.png",       year:"2025", color:"#1a1a08", desc:"완벽하지 않아도 계속 춤추는 것.", tracks:[{n:1,title:"不完全な踊り",mood:"완벽하지 않아도 계속"},{n:2,title:"闇が怖い幽霊",mood:"유령도 어둠이 무섭다"},{n:3,title:"星影の叫び",mood:"별빛도 소리를 지른다"}]},
  { id:8,  title:"운명애",                         cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966790/%EC%9A%B4%EB%AA%85%EC%95%A0_gqdkn5.jpg",     year:"2025", color:"#1a0d28", desc:"사랑이 아니라 운명이었다고 믿고 싶은 마음의 기록.", tracks:[{n:1,title:"운명애",mood:"이게 사랑인지 집착인지 모르던 때"},{n:2,title:"운외창천 (雲外蒼天)",mood:"구름 너머 푸른 하늘"},{n:3,title:"테세우스의 배",mood:"변해도 여전히 나인가"},{n:4,title:"사랑엔 자막이 필요해",mood:"말하지 않으면 모르는 것들"},{n:5,title:"지구는 잘 돌아가네, 나 없이도",mood:"이별 후에도 세상은 평범하게"},{n:6,title:"내 소중한 마음은 비밀이야",mood:"표현 못 하고 삼킨 감정들"},{n:7,title:"지금 이 순간",mood:"지나가는 걸 알면서 붙잡고 싶은"}]},
  { id:9,  title:"사막 위의 잠수함",               cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966790/%EC%82%AC%EB%A7%89%EC%9C%84%EC%9E%A0%EC%88%98%ED%95%A8_mkrsr0.jpg",      year:"2025", color:"#081420", desc:"있을 수 없는 곳에 있는 것들의 이야기. 어울리지 않아서 아름다운.", tracks:[{n:1,title:"사막 위의 잠수함",mood:"어울리지 않아서 오히려 눈에 띄는"},{n:2,title:"붐비는 무인도",mood:"사람들 속에서 혼자인 기분"},{n:3,title:"잠수함 일지",mood:"수면 아래에서 기록하는 것들"}]},
  { id:10, title:"나는 오늘 또 어떤 핑계를 대었는가",  cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966789/%ED%95%91%EA%B3%84_wpo1gr.jpg",   year:"2026", color:"#141420", desc:"스스로를 솔직하게 바라보는 일.", tracks:[{n:1,title:"나는 오늘 또 어떤 핑계를 대었는가",mood:"자기 자신을 마주하는 용기"},{n:2,title:"가짜의 삶",mood:"진짜를 잃어버린 날들"},{n:3,title:"인생은 산과 계곡",mood:"오르막과 내리막 사이"},{n:4,title:"핑계의 목록",mood:"내가 나에게 하는 변명들"}]},
  { id:11,  title:"죽어가는 모든 것들을 사랑해야지",   cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966786/%EC%A3%BD%EC%96%B4%EA%B0%80%EB%8A%94_e3imwp.jpg",    year:"2026", color:"#0d1a0d", desc:"사라져가는 것들에게 늦지 않게 사랑을 고백하는 앨범.", tracks:[{n:1,title:"죽어가는 모든 것들을 사랑해야지",mood:"끝나기 전에 사랑하기"},{n:2,title:"꽃이 피든 말든",mood:"결과와 상관없이 피어나는 것들"},{n:3,title:"푸른 하늘 은하수",mood:"아득하고 맑은 것들"},{n:4,title:"마지막 여름",mood:"다시 오지 않을 그 계절"}]},
  { id:12, title:"ただ (그냥)",                    cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966789/%EB%B0%94%EB%9E%8C%EC%9D%B4%EC%A2%8B%EC%95%84%EC%84%9C_g0sya3.jpg",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"ただ (그냥)",mood:"아무 이유 없이 슬픈 날"},{n:2,title:"夜の終わり (밤의 끝)",mood:"밤이 끝나고 아침이 오는 사이"}]},
  { id:13, title:"어느 새벽에 또 울었어",            cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966792/%EC%96%B4%EB%8A%90-%EC%83%88%EB%B2%BD%EC%97%90-%EB%98%90-%EC%9A%B8%EC%97%88%EC%96%B4_xeouv9.png",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"어느 새벽에 또 울었어",mood:"아무 이유 없이 슬픈 날"}]},
  { id:14, title:"엄마가 띄워줬던 나는 점점 가라앉고 있어", cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966787/%EC%97%84%EB%A7%88%EA%B0%80-%EB%9D%84%EC%9B%8C%EC%A4%AC%EB%8D%98-%EB%82%98%EB%8A%94_sqgtao.jpg",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"엄마가 띄워줬던 나는 점점 가라앉고 있어",mood:"가라앉는 마음"}]},
  { id:15, title:"아픈 청춘들아",                   cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966787/%EC%95%84%ED%94%88%EC%B2%AD%EC%B6%98%EB%93%A4%EC%95%BC_dq3gbm.jpg",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"아픈 청춘들아",mood:"청춘의 아픔"}]},
  { id:16, title:"허수아비에게",                   cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966787/%ED%97%88%EC%88%98%EC%95%84%EB%B9%84%EC%97%90%EA%B2%8C_itqady.jpg",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"허수아비에게",mood:"허수아비의 마음"}]},
  { id:17, title:"SKIP",                           cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966789/skip_bfymrk.jpg",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"SKIP",mood:"건너뛰고 싶은 날"}]},
  { id:18, title:"두려운 것 투성이야, 세상은",       cover:"https://res.cloudinary.com/dhc9ufcgr/image/upload/q_auto/f_auto/v1779966789/%EB%91%90%EB%A0%A4%EC%9A%B4-%EA%B2%83-%ED%88%AC%EC%84%B1%EC%9D%B4%EC%95%BC_-%EC%84%B8%EC%83%81%EC%9D%80_myby7o.jpg",       year:"2026", color:"#10101a", desc:"이유 없이. 그냥. 때로는 설명하지 않아도 되는 감정이 있다.", tracks:[{n:1,title:"두려운 것 투성이야, 세상은",mood:"세상이 두려운 날"}]},
];

const ALL_TRACKS = ALBUMS.flatMap(a => a.tracks.map(t => ({...t, album:a.title})));

const CHART = [
  {rank:1, title:"우리들의 발라드",                    trend:null},
  {rank:2, title:"말하지 않은 것들의 무게",             trend:"up"},
  {rank:3, title:"꽃이 피든 말든",                     trend:"new"},
  {rank:4, title:"내 소중한 마음은 비밀이야",           trend:"down"},
  {rank:5, title:"자발적으로 표류하는 우주비행사",      trend:"up"},
  {rank:6, title:"운외창천 (雲外蒼天)",                 trend:null},
  {rank:7, title:"겨울의 대삼각형",                    trend:"down"},
  {rank:8, title:"나는 오늘 또 어떤 핑계를 대었는가",  trend:"new"},
  {rank:9, title:"고백 연습",                          trend:"up"},
  {rank:10,title:"별이 비처럼 내리던 날",               trend:null},
];

const OVERSEAS = [
  {flag:"https://flagcdn.com/us.svg", emoji:"🇺🇸", name:"미국", pct:32},
  {flag:"https://flagcdn.com/jp.svg", emoji:"🇯🇵", name:"일본", pct:18},
  {flag:"https://flagcdn.com/tw.svg", emoji:"🇹🇼", name:"대만", pct:12},
  {flag:"https://flagcdn.com/in.svg", emoji:"🇮🇳", name:"인도", pct:10},
  {flag:"https://flagcdn.com/au.svg", emoji:"🇦🇺", name:"호주", pct:8},
  {flag:"https://flagcdn.com/ca.svg", emoji:"🇨🇦", name:"캐나다", pct:6},
  {flag:"https://flagcdn.com/th.svg", emoji:"🇹🇭", name:"태국", pct:5},
  {flag:null, emoji:"🌍", name:"기타", pct:9},
];

const SUB_DATA = [
  {month:"'24.01", subs:12},
  {month:"'24.04", subs:28},
  {month:"'24.07", subs:55},
  {month:"'24.10", subs:89},
  {month:"'25.01", subs:134},
  {month:"'25.04", subs:178},
  {month:"'25.07", subs:220},
  {month:"'25.10", subs:271},
  {month:"'26.01", subs:318},
  {month:"'26.03", subs:356},
  {month:"'26.05", subs:402},
];

const TIMELINE = [
  {year:"2023",    tag:"데뷔",   tagC:LIME,      desc:"첫 싱글 '그대였죠' 발매. 밤하늘극장의 첫 목소리."},
  {year:"2024.01", tag:"앨범",   tagC:LIME,      desc:"'오늘이 가장 어렸던 날이야' 발매. 유튜브 최초 노출."},
  {year:"2024.11", tag:"성장",   tagC:"#aaaaff", desc:"'우리들의 발라드' 유튜브 조회 12만 돌파."},
  {year:"2025",    tag:"확장",   tagC:"#aaaaff", desc:"연간 7개 앨범 발매. 일본어 앨범으로 해외 유입 시작."},
  {year:"2025.11", tag:"글로벌", tagC:"#aaaaff", desc:"해외 청취율 집계 시작. 8개국 유입 확인."},
  {year:"2026.04", tag:"구독",   tagC:LIME,      desc:"유튜브 구독자 400명 돌파."},
  {year:"2026.05", tag:"발매",   tagC:LIME,      desc:"새 싱글 발매."},
  {year:"2026.06", tag:"예정",   tagC:"#ffcc44", desc:"정규앨범 7곡 발매 예정. 최대 규모 프로젝트."},
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

const G = ({children,acc,pad="16px 18px",style={}}) => (
  <div style={{background:acc?"rgba(184,255,0,0.07)":glass,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:`1px solid ${acc?"rgba(184,255,0,0.2)":gb}`,borderRadius:16,padding:pad,...style}}>
    {children}
  </div>
);

const Hr = ({my=0}) => <div style={{height:1,background:gb,margin:`${my}px 0`}}/>;

const Tag = ({c=LIME,children}) => (
  <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.05em",padding:"2px 8px",borderRadius:20,color:c,background:`${c}18`,border:`1px solid ${c}38`,whiteSpace:"nowrap"}}>{children}</span>
);

const SecHead = ({title,sub}) => (
  <div style={{marginBottom:4}}>
    <p style={{fontSize:17,fontWeight:800,color:white,margin:0,letterSpacing:"-0.3px"}}>{title}</p>
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

// ── 구독자 추이 미니 라인차트 (SVG) ─────────────────
function SubChart() {
  const W = 100, H = 48;
  const maxS = Math.max(...SUB_DATA.map(d=>d.subs));
  const pts = SUB_DATA.map((d,i)=>({
    x: (i/(SUB_DATA.length-1))*W,
    y: H - (d.subs/maxS)*(H-6) - 2,
    ...d
  }));
  const polyline = pts.map(p=>`${p.x},${p.y}`).join(" ");
  const area = `0,${H} ${polyline} ${W},${H}`;
  const last = pts[pts.length-1];

  return (
    <div style={{width:"100%",position:"relative"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:56,overflow:"visible",display:"block"}}>
        <defs>
          <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#subGrad)"/>
        <polyline points={polyline} fill="none" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={last.x} cy={last.y} r="2" fill={ACCENT}/>
        <circle cx={last.x} cy={last.y} r="4" fill="none" stroke={ACCENT} strokeWidth="0.8" strokeOpacity="0.4"/>
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
        {[pts[0], pts[Math.floor(pts.length/2)], pts[pts.length-1]].map((p,i)=>(
          <span key={i} style={{fontSize:9,color:muted,fontFamily:"monospace"}}>{p.month}</span>
        ))}
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
      <p style={{fontSize:10,fontWeight:700,color:LIME,letterSpacing:"0.12em",margin:"0 0 18px",opacity:0.8}}>오늘의 밤하늘극장 추천곡</p>
      {track&&<>
        <p style={{fontSize:22,fontWeight:900,color:white,margin:"0 0 6px",fontFamily:"'Noto Serif KR',serif",lineHeight:1.3,letterSpacing:"-0.3px"}}>{track.title}</p>
        <p style={{fontSize:12,color:muted,margin:"0 0 10px"}}>{track.album}</p>
        {track.mood&&<p style={{fontSize:13,color:`${LIME}88`,margin:0,fontStyle:"italic"}}>"{track.mood}"</p>}
      </>}
    </G>
  );

  const Notice = (
    <G pad="0">
      <div style={{padding:"16px 18px 12px"}}><SecHead title="공지사항"/></div>
      <Hr/>
      {[
        {tag:"발매",   tagC:LIME,      date:"05.28",title:"새 싱글 발매"},
        {tag:"예정",   tagC:"#ffcc44", date:"06.09",title:"정규앨범 7곡 발매"},
        {tag:"라이브", tagC:"#ff88cc", date:"06.15",title:"유튜브 라이브"},
        {tag:"채널",   tagC:"#aaaaff", date:"05.26",title:"구독자 401명 돌파"},
      ].map((n,i,arr)=>(
        <div key={i}>
          <div style={{display:"flex",alignItems:"center",gap:0,padding:"11px 18px"}}>
            <div style={{width:52,flexShrink:0}}><Tag c={n.tagC}>{n.tag}</Tag></div>
            <span style={{width:44,flexShrink:0,fontSize:11,color:"rgba(220,210,255,0.75)",fontWeight:600}}>{n.date}</span>
            <p style={{margin:0,fontSize:13,fontWeight:600,color:white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{n.title}</p>
          </div>
          {i<arr.length-1&&<Hr/>}
        </div>
      ))}
    </G>
  );

  const SubSection = (
    <G>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <SecHead title="구독자 추이" sub="유튜브 채널 · 2024.01 ~"/>
        <div style={{textAlign:"right"}}>
          <p style={{fontSize:22,fontWeight:900,color:ACCENT,margin:0,lineHeight:1}}>402</p>
          <p style={{fontSize:9,color:muted,margin:"3px 0 0"}}>현재 구독자</p>
        </div>
      </div>
      <SubChart/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
        {[
          {label:"이번 달 증가",val:"+46"},
          {label:"전월 대비",val:"+12.9%"},
          {label:"목표",val:"1,000"},
        ].map((s,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <p style={{fontSize:14,fontWeight:800,color:i===0?ACCENT:i===1?"#4f8ef7":soft,margin:0}}>{s.val}</p>
            <p style={{fontSize:9,color:muted,margin:"2px 0 0"}}>{s.label}</p>
          </div>
        ))}
      </div>
    </G>
  );

  const Top10 = (
    <G pad="0">
      <div style={{padding:"16px 18px 12px"}}><SecHead title="밤하늘극장 인기곡 TOP 10" sub="'26년 3월 기준"/></div>
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
            <span style={{fontSize:12,color:muted,width:46,flexShrink:0}}>{o.name}</span>
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
  const Timeline = (
    <G pad="0">
      <div style={{padding:"16px 18px 12px"}}><SecHead title="연혁"/></div>
      <Hr/>
      <div style={{padding:"10px 18px 16px",position:"relative"}}>
        <div style={{position:"absolute",left:30,top:14,bottom:14,width:1,background:`linear-gradient(to bottom,${ACCENT}55,transparent)`}}/>
        {TIMELINE.map((t,i)=>(
          <div key={i} style={{display:"flex",gap:14,marginBottom:i<TIMELINE.length-1?20:0}}>
            <div style={{flexShrink:0,width:26,display:"flex",flexDirection:"column",alignItems:"center",zIndex:1,paddingTop:4}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:t.tag==="예정"?"#f59e0b":ACCENT,border:`2px solid ${t.tag==="예정"?"#f59e0b":ACCENT}`,boxShadow:t.tag==="예정"?`0 0 8px #f59e0b88`:`0 0 6px ${ACCENT}55`}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:ACCENT,fontWeight:700,opacity:0.75}}>{t.year}</span>
                <Tag c={t.tagC}>{t.tag}</Tag>
              </div>
              <p style={{fontSize:12,color:soft,margin:0,lineHeight:1.7}}>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </G>
  );
  if (isPC) {
    return (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>{Hero}{Artists}</div>
        <div>{Timeline}</div>
      </div>
    );
  }
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>{Hero}{Artists}{Timeline}</div>;
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
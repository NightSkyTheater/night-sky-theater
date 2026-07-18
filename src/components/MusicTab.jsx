import React, { useState, useRef } from "react";
import { ACCENT, glass, gb, muted, soft, white } from "../theme";
import { ALBUMS } from "../data";
import { G, Hr } from "./Common";

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

export default function MusicTab() {
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
      <div
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
      <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:60}}>
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
                  <p style={{margin:"0 0 1px",fontSize:13,fontWeight:j===trackIdx?700:400,color:j===trackIdx?white:soft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"}}>{t.title}</p>
                </div>
                {j===trackIdx&&<span style={{fontSize:10,color:ACCENT,flexShrink:0}}>▶</span>}
              </div>
              {j<alb.tracks.length-1&&<Hr/>}
            </div>
          ))}
        </G>
      </div>
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
      height: "84dvh",
      boxSizing: "border-box",
      
      // 핵심: 이 영역 안에서는 브라우저의 기본 스크롤/제스처를 작동시키지 않음
      touchAction: "none" 
    }}
  >
      {/* [수정] 최상단으로 이동한 앨범 타이틀 및 정보 영역 */}
      <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20, minHeight: 70 }}>
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
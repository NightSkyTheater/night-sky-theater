import React, { useState } from "react";
import { ACCENT, glass, gb, muted, soft, white } from "../theme";
import { ALBUMS } from "../data";
import { G, Hr } from "./Common";

function CDDisc({ cover, color, size = 220, spinning = true, glow = false }) {
 return (
  <div
    style={{
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 90,
      boxSizing: "border-box",
    }}
  >
    {/* 상단 타이틀 */}
    <div
      style={{
        textAlign: "center",
        padding: "18px 0 22px",
      }}
    >
      <p
        style={{
          fontSize: 10,
          color: muted,
          letterSpacing: "0.16em",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        DISCOGRAPHY
      </p>
    </div>

    {/* 앨범 2열 그리드 */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "24px 14px",
        padding: "0 4px",
      }}
    >
      {displayAlbums.map((album, i) => (
        <div
          key={`${album.id}-${i}`}
          onClick={() => {
            setIndex(i);
            setTrackIdx(0);
            setSelected(true);
          }}
          style={{
            cursor: "pointer",
            minWidth: 0,
          }}
        >
          {/* 앨범 커버 */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 10,
              overflow: "hidden",
              background: glass,
              border: `1px solid ${gb}`,
              boxShadow: "0 8px 22px rgba(0,0,0,0.28)",
            }}
          >
            <img
              src={album.cover}
              alt={album.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.25s ease",
              }}
            />
          </div>

          {/* 앨범 정보 */}
          <div
            style={{
              padding: "9px 2px 0",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: white,
                margin: "0 0 4px",
                lineHeight: 1.4,

                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {album.title}
            </p>

            <p
              style={{
                fontSize: 9.5,
                color: muted,
                margin: 0,
                fontWeight: 600,
              }}
            >
              {album.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default function MusicTab() {
const displayAlbums = [...ALBUMS].reverse();

const [index, setIndex] = useState(0);
const [selected, setSelected] = useState(false);
const [trackIdx, setTrackIdx] = useState(0);

const alb = displayAlbums[index];


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
      <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:80}}>
        <button onClick={()=>setSelected(false)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:ACCENT,fontSize:13,fontFamily:"inherit",padding:0,marginBottom:4}}>← 목록으로</button>
        <G acc>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{flexShrink:0}}>
              <CDDisc cover={alb.cover} color={alb.color} size={92} spinning glow />
            </div>
            <div style={{flex:1,minWidth:0,textAlign:"left"}}>
              <p style={{fontSize:9,color:ACCENT,fontWeight:700,margin:"0 0 4px",letterSpacing:"0.1em",opacity:0.8}}>{alb.year}</p>
              <p style={{fontSize:16,fontWeight:900,color:white,margin:"0 0 6px",lineHeight:1.3,letterSpacing:"-0.3px"}}>{alb.title}</p>
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
          <p style={{fontSize:20,fontWeight:800,color:white,margin:"0 0 10px", lineHeight:1.35}}>{tr.title}</p>
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
              opacity: 0.4,
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
              opacity: 0.4,
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
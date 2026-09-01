import React, { useRef } from "react";
import { ACCENT, LIME, glass, gb, muted, soft, white } from "../theme";

export function Stars() {
  const s = useRef(Array.from({length:100},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,r:Math.random()*1.4+0.2,o:Math.random()*0.4+0.08,d:Math.random()*5+2}))).current;
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
      {s.map(st=><div key={st.id} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.r*2,height:st.r*2,borderRadius:"50%",background:"#fff",opacity:st.o,animation:`tw ${st.d}s ease-in-out infinite alternate`}}/>)}
    </div>
  );
}

export const G = ({children,acc,pad="20px 18px 16px",style={}}) => (
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

export const Hr = ({my=0}) => <div style={{height:1,background:gb,margin:`${my}px 0`}}/>;

export const Tag = ({c=LIME,children}) => (
  <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.05em",padding:"5px 10px",borderRadius:20,color:c,background:`${c}18`,border:`1px solid ${c}38`,whiteSpace:"nowrap"}}>{children}</span>
);

export const SecHead = ({title,sub}) => (
  <div style={{marginBottom:0}}>
    <p style={{fontSize:17,fontWeight:800,lineHeight:1,color:white,margin:0,letterSpacing:"-0.3px"}}>{title}</p>
    {sub&&<p style={{fontSize:10,color:muted,margin:"3px 0 0"}}>{sub}</p>}
  </div>
);

export function formatCompact(num) {
  if (num === null || num === undefined) return "···";
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(num);
}

export const HomeCard = ({ children, pad = "0" }) => (
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

export const HomeHr = () => <div style={{ height: 1, background: "rgba(184,255,0,0.08)" }} />;

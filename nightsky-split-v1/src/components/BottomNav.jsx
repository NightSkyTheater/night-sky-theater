import React from "react";
import { LIME, ACCENT, muted, MOBILE_SHELL_WIDTH, NAV_ITEMS } from "../theme";

export default function BottomNav({tab,setTab}) {
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

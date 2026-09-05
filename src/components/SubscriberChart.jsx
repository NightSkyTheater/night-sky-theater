import React from "react";
import { ACCENT, FADE, HAIRLINE, MONO, PAPER } from "../theme";

export default function SubscriberChart({ data, width = 520, height = 140 }) {
  const max = Math.max(...data.map((d) => d.subs));
  const min = Math.min(...data.map((d) => d.subs));
  const pad = 8;
  const stepX = (width - pad * 2) / (data.length - 1);
  const scaleY = (v) => height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2);

  const points = data.map((d, i) => [pad + i * stepX, scaleY(d.subs)]);
  const linePath = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1][0]},${height} L${points[0][0]},${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="subsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#subsFill)" stroke="none" />
        <path d={linePath} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 4 : 2.5} fill={i === points.length - 1 ? ACCENT : "rgba(184,255,0,0.4)"} />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        {data.map((d, i) => (
          <span key={i} style={{ fontFamily: MONO, fontSize: 9.5, color: FADE }}>
            {d.month}
          </span>
        ))}
      </div>
    </div>
  );
}

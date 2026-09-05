import React from "react";
import { ACCENT } from "../theme";

export const Eyebrow = ({ children }) => <span className="eyebrow">{children}</span>;

export const SectionTitle = ({ kicker, title, body, action }) => (
  <div className="section-head">
    <div>
      {kicker && <Eyebrow>{kicker}</Eyebrow>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
    {action}
  </div>
);

export const Arrow = () => <span aria-hidden="true">↗</span>;

export function formatCompact(num) {
  if (num === null || num === undefined) return "—";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(num);
}

export const AccentDot = () => <span style={{ color: ACCENT }}>●</span>;

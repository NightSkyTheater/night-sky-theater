import React from "react";
import { House, Disc3, NotebookPen } from "lucide-react";

export const ACCENT = "#B8FF00";
export const LIME   = ACCENT;
export const glass  = "rgba(30,20,60,0.72)";
export const gb     = "rgba(255,255,255,0.13)";
export const muted  = "rgba(220,210,255,0.36)";
export const soft   = "rgba(220,210,255,0.70)";
export const white  = "#F2EEF9";
export const EMOJI_FONT = "'Twemoji Mozilla','Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
export const MOBILE_SHELL_WIDTH = 460;
export const TOP_NAV_HEIGHT = 64;

export const NAV_ITEMS = [
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

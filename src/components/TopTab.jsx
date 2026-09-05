import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../theme";

export default function TopTab({ tab, setTab }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setTab(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`gnb ${scrolled ? "is-scrolled" : ""}`}>
      <div className="gnb-inner">
        <button className="brand" onClick={() => go("home")} aria-label="밤하늘극장 홈">
          <span className="brand-mark"><img src="/favicon.svg" alt="" /></span>
          <span className="brand-copy"><b>NIGHT SKY THEATER</b><small>MUSIC LABEL / CREATIVE STUDIO</small></span>
        </button>

        <nav className="desktop-nav" aria-label="메인 메뉴">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => go(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="menu-toggle" onClick={() => setOpen(v => !v)} aria-label="메뉴 열기">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {NAV_ITEMS.map((item, index) => (
          <button key={item.id} onClick={() => go(item.id)}>
            <span>0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
    </header>
  );
}

import { useState, useEffect } from "react";
import { NAV, PROFILE } from "../data/profile";
import EmailLink from "./EmailLink";
import "./NavBar.css";

export default function NavBar({ active, stuck, progress, onNavigate }) {
  const [open, setOpen] = useState(false);

  /* Close the panel on Escape, or once the viewport is wide enough that the
     inline links are back and the panel would be orphaned open. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 860 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const go = (event, id) => {
    setOpen(false);
    onNavigate(event, id);
  };

  return (
    <nav className={"nav" + (stuck ? " stuck" : "")}>
      {/* Reading progress — scaleX is compositor-only, so this is free to animate. */}
      <div className="nav-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className="wrap">
        <div className="nav-in">
          <a className="brand" href="#top" onClick={(e) => go(e, "top")}>
            {PROFILE.firstName}<i>.</i>
          </a>

          <div className="nav-links">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "on" : ""}
                onClick={(e) => go(e, id)}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="nav-right">
          <EmailLink className="nav-cta">Let&apos;s talk</EmailLink>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="bars" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={"menu-panel" + (open ? " open" : "")}>
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "on" : ""}
              onClick={(e) => go(e, id)}
            >
              {label}
            </a>
          ))}
          <EmailLink className="menu-mail" onClick={() => setOpen(false)}>
  Get in touch
</EmailLink>
        </div>
      </div>
    </nav>
  );
}

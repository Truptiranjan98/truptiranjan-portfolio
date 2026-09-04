import { PROFILE } from "../data/profile";

export default function Footer({ onNavigate }) {
  /* The rule and the padding live on the <footer>; the .wrap is a separate
     inner element. Putting both on one node let the footer's own padding
     shorthand cancel .wrap's gutters, which pulled this text to the edge. */
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>
          {PROFILE.firstName} {PROFILE.lastName} — {PROFILE.location.split(",")[0]}, India
        </span>
        <a href="#top" onClick={(e) => onNavigate(e, "top")}>Back to top</a>
      </div>
    </footer>
  );
}

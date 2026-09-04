import { BOOT_LINES } from "../data/content";
import "./BootCurtain.css";

/**
 * Cold-start overlay. Services "come up" one line at a time, then the shutters
 * split and reveal the hero — the page introduces itself the way the systems
 * behind it do.
 */
export default function BootCurtain({ phase, step, onSkip }) {
  const className = [
    "curtain",
    phase === "lift" && "lift",
    phase === "done" && "lift gone",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div className="shutter top" aria-hidden="true" />
      <div className="shutter bot" aria-hidden="true" />

      {/* The whole log area is a skip target — touch devices have no Esc key. */}
      <div className="boot" aria-hidden="true" onClick={onSkip}>
        <div className="boot-inner">
          {BOOT_LINES.slice(0, step).map(([service, status], i) => (
            <div className="boot-line" key={service} style={{ animationDelay: `${i * 20}ms` }}>
              <span><b>::</b> {service}</span>
              <span className={i === BOOT_LINES.length - 1 ? "ok" : ""}>{status}</span>
            </div>
          ))}
          <div className="boot-bar">
            <span style={{ width: `${(step / BOOT_LINES.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <button type="button" className="boot-skip" onClick={onSkip}>
        Skip intro
      </button>
    </div>
  );
}

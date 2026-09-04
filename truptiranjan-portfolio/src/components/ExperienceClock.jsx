import { useExperienceClock } from "../hooks/useExperienceClock";
import { PROFILE } from "../data/profile";
import "./ExperienceClock.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Experience counted from the first day on the job rather than typed in and
 * left to go stale. Years and months carry the headline; the seconds tail is
 * the part that proves it is live.
 */
export default function ExperienceClock() {
  const { years, months, days, hours, minutes, seconds } =
    useExperienceClock(PROFILE.careerStart);

  return (
    <div className="clock">
      <div className="clock-head">
        <span className="clock-pulse" aria-hidden="true" />
        <span>Experience, counting</span>
      </div>

      <p className="clock-big">
        <span>{years}</span>
        <em>yr{years === 1 ? "" : "s"}</em>
        <span>{months}</span>
        <em>mo{months === 1 ? "" : "s"}</em>
        <span>{days}</span>
        <em>d</em>
      </p>

      {/* aria-live off: a screen reader announcing this every second would be
          unusable. The static headline above already carries the meaning. */}
      <p className="clock-tail" aria-live="off">
        {pad(hours)}<i>:</i>{pad(minutes)}<i>:</i>{pad(seconds)}
        <span className="clock-since">since May 2022</span>
      </p>
    </div>
  );
}

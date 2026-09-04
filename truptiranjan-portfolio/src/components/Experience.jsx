import SectionHead from "./SectionHead";
import { EXPERIENCE } from "../data/content";
import { PROFILE } from "../data/profile";
import "./Experience.css";

export default function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <SectionHead title="Experience" />

        <div className="employer rv">
          <h3>{PROFILE.company}</h3>
          <span>Full-Stack Java Developer · Pune, India · May 2022 — Present</span>
        </div>

        {/* Numbered markers would be wrong here — this is a timeline, so the
            spine and the dates carry the sequence. */}
        <ol className="spine">
          {EXPERIENCE.map((entry) => (
            <li className={"node rv" + (entry.now ? " now" : "")} key={entry.title}>
              <p className="node-when">{entry.when}</p>
              <h4>{entry.title}</h4>
              <ul>
                {entry.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

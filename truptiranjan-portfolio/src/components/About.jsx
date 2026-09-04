import SectionHead from "./SectionHead";
import { PROFILE, LINKS } from "../data/profile";
import "./About.css";

const SNAPSHOT = [
  ["Currently", `Full-Stack Java Developer, ${PROFILE.company}`],
  ["Working on", "JSwitcher — profile and interview services"],
  ["Strongest in", "Spring Boot, Kafka, REST API design"],
  ["Education", PROFILE.education],
  ["Open to", "Backend and full-stack roles"],
];

export default function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap about-grid">
        <div className="rv">
          <SectionHead title="About" />
          <p>
            I write Java for a living and enjoy the part most people skip past — what happens
            when a message fails, when the queue backs up, when a query that was fine at ten
            thousand rows stops being fine at ten million.
          </p>
          <p>
            Most of that came from four years at {PROFILE.company} in Pune, where I moved between
            a bank&apos;s credit card platform, an issue tracker, an admin console and a job
            portal. The banking work was Kafka-heavy: consumers processing high volumes of
            events, replaying failures by offset, and tracing what went wrong through Kibana at
            two in the morning.
          </p>
          <p>
            I&apos;m comfortable on the other side of the stack too. I built roughly 90% of
            NioJobs&apos; first frontend in React, and I run my own{" "}
            <a className="ln" href={LINKS.templeLive} target="_blank" rel="noreferrer">
              Spring Boot + React + MySQL temple management app
            </a>{" "}
            end to end — design, deploy, and every bug in between.
          </p>
        </div>

        <aside className="snapshot rv" style={{ transitionDelay: "120ms" }}>
          <dl>
            {SNAPSHOT.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

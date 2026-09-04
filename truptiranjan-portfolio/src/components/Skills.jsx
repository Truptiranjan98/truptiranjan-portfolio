import SectionHead from "./SectionHead";
import { SKILLS } from "../data/content";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <SectionHead
          title="Skills"
          lede="What I reach for day to day, grouped by where it sits in the stack."
        />
        {SKILLS.map((group, i) => (
          <div
            className="skill-row rv"
            key={group.group}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <h3>{group.group}</h3>
            <div className="chips">
              {group.items.map((item) => (
                <span className="chip" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

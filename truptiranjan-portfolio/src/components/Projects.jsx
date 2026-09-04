import SectionHead from "./SectionHead";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/content";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <SectionHead
          title="Projects"
          lede="Client work is mostly closed-source, so the descriptions carry the detail. The temple platform below is live and mine end to end."
        />

        <FeaturedProject />

        <div className="proj-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={(i % 2) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

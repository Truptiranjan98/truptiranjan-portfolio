import { GithubIcon } from "./Icons";

export default function ProjectCard({ project, delay = 0 }) {
  const { title, org, personal, blurb, tech, repo } = project;

  return (
    <article className="card rv" style={{ transitionDelay: `${delay}ms` }}>
      <p className="card-kind">
        <span className={"dot" + (personal ? " personal" : "")} aria-hidden="true" />
        {org}
      </p>
      <h3>{title}</h3>
      <p className="card-blurb">{blurb}</p>
      <div className="tags">
        {tech.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
      {repo ? (
        <div className="card-links">
          <a href={repo} target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> Source
          </a>
        </div>
      ) : (
        <p className="card-private">Code is private — happy to walk through the design.</p>
      )}
    </article>
  );
}

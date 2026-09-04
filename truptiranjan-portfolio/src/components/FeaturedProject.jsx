import { FEATURED } from "../data/content";
import { GithubIcon, ExternalIcon } from "./Icons";

export default function FeaturedProject() {
  const { title, kind, personal, blurb, tech, live, repo, panel } = FEATURED;

  return (
    <article className="feature rv">
      <div className="feature-body">
        <p className="card-kind">
          <span className={"dot" + (personal ? " personal" : "")} aria-hidden="true" />
          {kind}
        </p>
        <h3>{title}</h3>
        <p className="card-blurb">{blurb}</p>
        <div className="tags">
          {tech.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <div className="card-links">
          <a href={live} target="_blank" rel="noreferrer">
            <ExternalIcon /> Live site
          </a>
          <a href={repo} target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> Source
          </a>
        </div>
      </div>

      <div className="feature-panel">
        <p className="panel-label">{panel.label}</p>
        <p className="panel-lines">
          {panel.lines.map((line) => <span key={line}>{line}</span>)}
        </p>
        <p className="panel-note">{panel.note}</p>
      </div>
    </article>
  );
}

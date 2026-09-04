import { PROFILE, LINKS, MAIL_TO } from "../data/profile";
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ArrowIcon } from "./Icons";
import ExperienceClock from "./ExperienceClock";
import portraitJpg from "../assets/truptiranjan.jpg";
import portraitWebp from "../assets/truptiranjan.webp";
import EmailLink from "./EmailLink";
import "./Hero.css";

export default function Hero({ onNavigate }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy enter">
          <p className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            Open to backend &amp; full-stack roles
          </p>

          <h1>
            <span>{PROFILE.firstName}</span>
            <span>{PROFILE.lastName}</span>
          </h1>

          <p className="hero-role">{PROFILE.role}</p>

          {/* One span per tool rather than a joined string: the separator is a
              ::after on each item, so a wrap can never start a line with "·". */}
          <p className="hero-stack">
            {PROFILE.stackItems.map((item) => <span key={item}>{item}</span>)}
          </p>

          <p className="hero-pitch">{PROFILE.pitch}</p>

          <div className="hero-cta">
            <a
              className="btn btn-primary"
              href="#projects"
              onClick={(e) => onNavigate(e, "projects")}
            >
              View projects <ArrowIcon />
            </a>
            <a className="btn btn-outline" href={LINKS.resumeDownload}>
              <DownloadIcon /> Resume
            </a>
          </div>

          <div className="hero-social">
            <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
           <EmailLink aria-label={`Email ${LINKS.email}`}>
  <MailIcon />
</EmailLink>
          </div>
        </div>

        <div className="hero-portrait enter">
          <div className="portrait-frame">
            <picture>
              <source srcSet={portraitWebp} type="image/webp" />
              <img
                src={portraitJpg}
                width="880"
                height="880"
                /* the hero image is the LCP element — never lazy-load it */
                loading="eager"
                fetchPriority="high"
                decoding="async"
                alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
              />
            </picture>
          </div>
        </div>
      </div>

      <div className="wrap hero-facts enter">
        <ExperienceClock />
        <div className="fact">
          <b>{PROFILE.location.split(",")[0]}</b>
          <span>Maharashtra, India</span>
        </div>
        <div className="fact">
          <b>Banking · SaaS · HR-tech</b>
          <span>Domains shipped in</span>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Truptiranjan Biswal — portfolio                                    */
/*  Single-file React component. Drop into src/App.jsx of a Vite app.  */
/*  Palette: deep aubergine + electric mint. Edit the vars at the top  */
/*  of STYLES to re-theme the whole page.                              */
/* ------------------------------------------------------------------ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

.tb-root {
  --ink:       #2A1B3D;
  --ink-2:     #3F2B57;
  --paper:     #F7F5FA;
  --porcelain: #EBE6F1;
  --mint:      #00C08B;
  --mint-deep: #00795A;
  --gold:      #E8B33C;
  --muted:     #635A72;
  --line:      #DED7E6;

  --ease: cubic-bezier(.2,.7,.3,1);
  --display: 'Bricolage Grotesque', 'Trebuchet MS', sans-serif;
  --body: 'IBM Plex Sans', system-ui, sans-serif;
  --mono: 'IBM Plex Mono', ui-monospace, monospace;

  background: var(--paper);
  color: var(--ink);
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.tb-root *, .tb-root *::before, .tb-root *::after { box-sizing: border-box; }
.tb-root h1, .tb-root h2, .tb-root h3, .tb-root h4 {
  font-family: var(--display);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
}
.tb-root p { margin: 0 0 1em; max-width: 68ch; }
/* :where() keeps this at zero specificity so button colour rules below win */
.tb-root :where(a) { color: inherit; }
.tb-root :focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; border-radius: 2px; }
.curtain :focus-visible, .resume-band :focus-visible, .feat-visual :focus-visible { outline-color: var(--mint); }

.wrap { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 28px; }
.sec { padding: 96px 0; border-top: 1px solid var(--line); }
.sec-head { margin-bottom: 40px; }
.sec-head h2 { font-size: clamp(1.7rem, 3.4vw, 2.6rem); }
.sec-head .lede { color: var(--muted); margin-top: 10px; max-width: 60ch; }
.h-rule { height: 2px; width: 0; background: var(--mint); margin-top: 16px; transition: width 700ms 150ms var(--ease); }
.rv.in .h-rule { width: 68px; }

/* ---------------- scroll reveals ---------------- */
.rv { opacity: 0; transform: translateY(20px); transition: opacity 620ms var(--ease), transform 620ms var(--ease); }
.rv.in { opacity: 1; transform: none; }

/* ---------------- cold-start curtain ---------------- */
.curtain { position: fixed; inset: 0; z-index: 100; }
.curtain.gone { display: none; }
.shutter {
  position: absolute; left: 0; right: 0; height: 50.2%;
  background: var(--ink);
  transition: transform 780ms cubic-bezier(.76,0,.24,1);
}
.shutter.top { top: 0; }
.shutter.bot { bottom: 0; }
.curtain.lift .shutter.top { transform: translateY(-100%); }
.curtain.lift .shutter.bot { transform: translateY(100%); }

.boot { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 28px; transition: opacity 220ms ease; }
.curtain.lift .boot { opacity: 0; }
.boot-inner { width: 100%; max-width: 520px; }
.boot-line {
  font-family: var(--mono); font-size: 13px; color: #B0A6C0;
  display: flex; justify-content: space-between; gap: 16px; padding: 5px 0;
  opacity: 0; transform: translateY(4px);
  animation: bootIn 260ms ease forwards;
}
.boot-line b { color: var(--mint); font-weight: 500; }
.boot-line .ok { color: var(--mint); }
@keyframes bootIn { to { opacity: 1; transform: none; } }
.boot-bar { height: 2px; background: rgba(255,255,255,.14); margin-top: 22px; }
.boot-bar span { display: block; height: 100%; width: 0; background: var(--mint); transition: width 380ms linear; }
.boot-skip {
  position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
  font-family: var(--mono); font-size: 11px; letter-spacing: .06em;
  color: #8579969e; color: #857996; background: none; border: 0; cursor: pointer;
}
.boot-skip:hover { color: var(--mint); }

/* hero entrance, choreographed with the shutter */
.enter > * { opacity: 0; transform: translateY(14px); }
.ready .enter > * { animation: heroIn 620ms var(--ease) forwards; }
.ready .enter > *:nth-child(1) { animation-delay: 60ms; }
.ready .enter > *:nth-child(2) { animation-delay: 150ms; }
.ready .enter > *:nth-child(3) { animation-delay: 230ms; }
.ready .enter > *:nth-child(4) { animation-delay: 310ms; }
.ready .enter > *:nth-child(5) { animation-delay: 380ms; }
@keyframes heroIn { to { opacity: 1; transform: none; } }

.rule { height: 3px; background: var(--mint); width: 0; margin: 26px 0 0; }
.ready .rule { animation: ruleIn 700ms 420ms var(--ease) forwards; }
@keyframes ruleIn { to { width: 132px; } }

/* ---------------- nav ---------------- */
.nav {
  position: sticky; top: 0; z-index: 40;
  background: rgba(247,245,250,.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 260ms ease, box-shadow 260ms ease;
}
.nav.stuck { border-bottom-color: var(--line); box-shadow: 0 6px 22px -18px rgba(42,27,61,.6); }
.nav-in { display: flex; align-items: center; justify-content: space-between; height: 74px; transition: height 260ms var(--ease); }
.nav.stuck .nav-in { height: 58px; }
.brand { font-family: var(--display); font-weight: 800; font-size: 1rem; letter-spacing: -.02em; text-decoration: none; }
.brand i { color: var(--mint); font-style: normal; }
.nav-links { display: flex; gap: 26px; align-items: center; }
.nav-links a { position: relative; text-decoration: none; font-size: .92rem; color: var(--muted); transition: color 200ms ease; }
.nav-links a::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px;
  background: var(--mint); transform: scaleX(0); transform-origin: left;
  transition: transform 300ms var(--ease);
}
.nav-links a:hover { color: var(--ink); }
.nav-links a.on { color: var(--ink); font-weight: 600; }
.nav-links a.on::after { transform: scaleX(1); }
.tb-root .nav-cta {
  text-decoration: none; font-size: .88rem; font-weight: 600;
  background: var(--ink); color: var(--paper); padding: 9px 16px; border-radius: 6px;
  transition: background 200ms ease, transform 200ms var(--ease);
}
.nav-cta:hover { background: var(--ink-2); transform: translateY(-1px); }
.menu-btn { display: none; background: none; border: 1px solid var(--line); border-radius: 6px; padding: 7px 12px; font: inherit; font-size: .85rem; cursor: pointer; }
.menu-panel { display: none; }

/* ---------------- hero ---------------- */
.hero { padding: 104px 0 88px; }
.hero h1 { font-size: clamp(2.9rem, 9.5vw, 6.4rem); letter-spacing: -0.04em; }
.hero h1 span { display: block; }
.hero .role { font-family: var(--display); font-weight: 600; font-size: clamp(1.05rem, 2.4vw, 1.5rem); margin-top: 20px; color: var(--ink-2); }
.hero .pitch { margin-top: 18px; font-size: 1.06rem; color: var(--muted); max-width: 56ch; }
.facts { display: flex; flex-wrap: wrap; gap: 10px 30px; margin-top: 30px; }
.fact { font-size: .9rem; color: var(--muted); }
.fact b { display: block; font-family: var(--display); font-weight: 800; font-size: 1.28rem; color: var(--ink); letter-spacing: -.02em; }
.cta-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 34px; }
.btn {
  display: inline-flex; align-items: center; gap: 9px;
  font: inherit; font-size: .95rem; font-weight: 600;
  padding: 12px 20px; border-radius: 7px; text-decoration: none;
  border: 1px solid var(--ink); cursor: pointer;
  transition: background 180ms ease, color 180ms ease, transform 180ms var(--ease), border-color 180ms ease;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }
.tb-root .btn-solid { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.tb-root .btn-solid:hover { background: var(--ink-2); border-color: var(--ink-2); }
.btn-ghost { background: transparent; color: var(--ink); }
.btn-ghost:hover { background: var(--porcelain); border-color: var(--mint-deep); }
.icons { display: flex; gap: 6px; margin-left: 4px; }
.icons a {
  width: 42px; height: 42px; display: grid; place-items: center;
  border: 1px solid var(--line); border-radius: 7px; color: var(--muted);
  transition: color 180ms ease, border-color 180ms ease, transform 180ms var(--ease);
}
.icons a:hover { color: var(--ink); border-color: var(--mint-deep); transform: translateY(-2px); }

/* ---------------- about ---------------- */
.about-grid { display: grid; grid-template-columns: 1.55fr 1fr; gap: 56px; align-items: start; }
.side-card { background: var(--porcelain); border-radius: 10px; padding: 26px 24px; }
.side-card dl { margin: 0; display: grid; gap: 16px; }
.side-card dt { font-size: .78rem; color: var(--muted); letter-spacing: .02em; }
.side-card dd { margin: 3px 0 0; font-weight: 500; font-size: .97rem; }

/* ---------------- skills ---------------- */
.skill-row { display: grid; grid-template-columns: 210px 1fr; gap: 28px; padding: 22px 0; border-top: 1px solid var(--line); }
.skill-row:first-child { border-top: 0; padding-top: 0; }
.skill-row h3 { font-size: 1.02rem; font-weight: 600; letter-spacing: -.01em; padding-top: 3px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-size: .86rem; border: 1px solid var(--line); background: #fff;
  padding: 5px 12px; border-radius: 999px; color: var(--ink-2);
  transition: border-color 180ms ease, color 180ms ease, transform 180ms var(--ease);
}
.chip:hover { border-color: var(--mint); color: var(--mint-deep); transform: translateY(-2px); }

/* ---------------- projects ---------------- */
.feat {
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 0;
  border: 1px solid var(--line); border-radius: 12px; overflow: hidden; margin-bottom: 28px; background: #fff;
}
.feat-body { padding: 34px; }
.feat h3 { font-size: 1.6rem; margin-bottom: 12px; }
.feat-visual {
  background: var(--ink); color: var(--paper); padding: 34px;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 10px; min-height: 260px;
}
.feat-visual .k { font-family: var(--mono); font-size: 12px; color: #A093B2; }
.feat-visual .v { font-family: var(--display); font-weight: 800; font-size: 2rem; letter-spacing: -.03em; }
.feat-visual .v em { color: var(--mint); font-style: normal; }

.proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.card {
  border: 1px solid var(--line); border-radius: 12px; padding: 26px; background: #fff;
  display: flex; flex-direction: column;
  transition: transform 260ms var(--ease), border-color 260ms ease, box-shadow 260ms ease, opacity 620ms var(--ease);
}
.card:hover { transform: translateY(-4px); border-color: var(--mint); box-shadow: 0 18px 34px -26px rgba(42,27,61,.55); }
.card .kind { font-size: .78rem; color: var(--muted); display: flex; align-items: center; gap: 7px; margin-bottom: 12px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mint); }
.dot.personal { background: var(--gold); }
.card h3 { font-size: 1.18rem; margin-bottom: 9px; }
.card p { font-size: .94rem; color: var(--muted); margin-bottom: 16px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
.tag { font-size: .78rem; background: var(--porcelain); padding: 4px 9px; border-radius: 5px; color: var(--ink-2); }
.card-links { display: flex; gap: 16px; margin-top: 16px; font-size: .88rem; font-weight: 600; }
.card-links a { display: inline-flex; align-items: center; gap: 6px; transition: color 180ms ease; }
.card-links a:hover { color: var(--mint-deep); }
.private { font-size: .84rem; color: var(--muted); margin-top: 16px; }

/* ---------------- experience ---------------- */
.co { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; margin-bottom: 34px; }
.co h3 { font-size: 1.35rem; }
.co .meta { color: var(--muted); font-size: .93rem; }
.spine { position: relative; border-left: 2px solid var(--line); margin-left: 7px; padding-left: 32px; display: grid; gap: 38px; }
.spine::before {
  content: ""; position: absolute; left: -2px; top: 0; width: 2px; height: 0;
  background: var(--mint); transition: height 1500ms 200ms cubic-bezier(.4,0,.2,1);
}
.spine.in::before { height: 100%; }
.node { position: relative; }
.node::before {
  content: ""; position: absolute; left: -40px; top: 7px;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--paper); border: 3px solid var(--line);
  transition: border-color 400ms ease, background 400ms ease, transform 400ms var(--ease);
}
.node.in::before { border-color: var(--mint); }
.node.now::before { border-color: var(--mint); background: var(--mint); transform: scale(1.1); }
.node .when { font-family: var(--mono); font-size: .8rem; color: var(--muted); }
.node h4 { font-size: 1.1rem; margin: 5px 0 10px; }
.node ul { margin: 0; padding-left: 19px; display: grid; gap: 7px; }
.node li { font-size: .94rem; color: var(--muted); max-width: 70ch; }

/* ---------------- resume ---------------- */
.resume-band {
  background: var(--ink); color: var(--paper); border-radius: 14px;
  padding: 46px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center;
}
.resume-band h2 { font-size: 2rem; margin-bottom: 12px; }
.resume-band p { color: #C3B8D2; margin-bottom: 0; }
.resume-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.tb-root .btn-mint { background: var(--mint); border-color: var(--mint); color: #0A2A20; }
.tb-root .btn-mint:hover { background: #16D69E; border-color: #16D69E; }
.tb-root .btn-onink { background: transparent; border-color: #5C4879; color: var(--paper); }
.tb-root .btn-onink:hover { background: #3A2751; border-color: var(--mint); }

/* ---------------- contact ---------------- */
.contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 34px; }
.contact-item {
  display: flex; align-items: center; gap: 14px; text-decoration: none;
  border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; background: #fff;
  transition: border-color 200ms ease, transform 200ms var(--ease);
}
.contact-item:hover { border-color: var(--mint); transform: translateY(-2px); }
.contact-item .ci-ic { color: var(--mint-deep); display: grid; place-items: center; }
.contact-item small { display: block; color: var(--muted); font-size: .8rem; }
.contact-item strong { font-weight: 600; font-size: .97rem; word-break: break-word; }

.foot { border-top: 1px solid var(--line); padding: 30px 0 44px; color: var(--muted); font-size: .88rem; display: flex; flex-wrap: wrap; gap: 10px 24px; justify-content: space-between; }

/* ---------------- responsive ---------------- */
@media (max-width: 860px) {
  .sec { padding: 68px 0; }
  .hero { padding: 72px 0 60px; }
  .about-grid, .feat, .proj-grid, .contact-grid, .resume-band { grid-template-columns: 1fr; }
  .resume-band { padding: 32px; }
  .feat-visual { min-height: 180px; order: -1; }
  .skill-row { grid-template-columns: 1fr; gap: 12px; }
  .nav-links { display: none; }
  .menu-btn { display: block; }
  .menu-panel.open { display: grid; gap: 4px; padding: 10px 0 18px; border-top: 1px solid var(--line); }
  .menu-panel a { text-decoration: none; padding: 10px 2px; color: var(--muted); font-size: .95rem; }
  .spine { padding-left: 24px; }
  .node::before { left: -32px; }
}
@media (max-width: 520px) {
  .wrap { padding: 0 20px; }
  .btn { padding: 11px 16px; font-size: .9rem; }
}

@media (prefers-reduced-motion: reduce) {
  .tb-root *, .tb-root *::before { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .rule { width: 132px; }
  .enter > *, .rv { opacity: 1; transform: none; }
  .spine::before { height: 100%; }
}
`;

/* ------------------------------ data ------------------------------ */

const RESUME_VIEW =
  "https://drive.google.com/file/d/15fiI4k8stXkOuUyZ1cwi3KqIq7kNIpZr/view?usp=sharing";
const RESUME_DOWNLOAD =
  "https://drive.google.com/uc?export=download&id=15fiI4k8stXkOuUyZ1cwi3KqIq7kNIpZr";
const GITHUB = "https://github.com/Truptiranjan98";
const LINKEDIN = "https://www.linkedin.com/in/truptiranjan-biswal";
const EMAIL = "truptiranjanbiswal123@gmail.com";
const PHONE = "+91 93377 97478";

const BOOT_LINES = [
  ["profile-service", "up"],
  ["kafka-listener", "3 partitions assigned"],
  ["api-gateway", "routes mapped"],
  ["postgres pool", "10 connections"],
  ["portfolio", "ready"],
];

const SKILLS = [
  { group: "Backend", items: ["Java 8 / 11 / 17", "Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Hibernate", "Microservices", "REST API design", "Apache Kafka", "Netflix OSS"] },
  { group: "Frontend", items: ["React.js", "Redux", "Angular", "TypeScript", "Material-UI", "HTML5", "CSS3"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Elasticsearch", "Query optimisation", "Indexing"] },
  { group: "Platform & delivery", items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "Argo CD", "AWS (EC2, S3)", "Maven", "Git"] },
  { group: "Quality & tooling", items: ["JUnit", "Mockito", "Postman", "Swagger / OpenAPI", "Kibana", "Jasmine / Karma", "Jira", "Bitbucket"] },
];

const PROJECTS = [
  {
    title: "Credit Card Platform",
    org: "Yes Bank · client work",
    personal: false,
    blurb: "Internet banking platform for self-service credit card journeys. Spring Boot services consume high-volume Kafka events, with offset-based replay so failed messages reprocess instead of dropping transaction data.",
    tech: ["Java", "Spring Boot", "Kafka", "Netflix OSS", "Angular", "Elasticsearch"],
  },
  {
    title: "JSwitcher",
    org: "Canary TechSys · client work",
    personal: false,
    blurb: "Recruitment platform built as microservices — a recruiter/candidate profile service and an interview service handling scheduling, rescheduling and status transitions with notification triggers.",
    tech: ["Spring Boot", "REST APIs", "React.js", "Swagger", "Postman"],
  },
  {
    title: "NioTracker",
    org: "Canary TechSys · client work",
    personal: false,
    blurb: "Issue-tracking system covering the full raise-to-resolve workflow, plus an admin console for assignment and reporting. Server-side pagination and indexing keep listings fast as ticket volume grows.",
    tech: ["Java", "Spring Boot", "MongoDB", "React.js", "Material-UI", "JWT"],
  },
  {
    title: "NioManager",
    org: "Canary TechSys · lead developer",
    personal: false,
    blurb: "Admin platform for organisational data and operational workflows. Designed and shipped 15+ REST APIs with JWT auth and role-based access for administrators and operators.",
    tech: ["Java 8", "Spring Boot", "MongoDB", "React.js", "Material-UI"],
  },
  {
    title: "NioJobs",
    org: "Canary TechSys · client work",
    personal: false,
    blurb: "Job portal covering postings, candidate profiles, resume upload and application tracking. Delivered roughly 90% of the frontend for the first production release.",
    tech: ["React.js", "Material-UI", "Spring Boot", "MongoDB"],
  },
  {
    title: "Nioscaler",
    org: "Canary TechSys · client work",
    personal: false,
    blurb: "Cloud wiki for distributed teams — a Markdown editor with version history, tagging and collaborative authoring, deployed on AWS.",
    tech: ["Java 8", "Spring Boot", "MongoDB", "Oracle", "React.js", "AWS"],
  },
  {
    title: "Insight Listener",
    org: "Internal tool",
    personal: false,
    blurb: "API health monitor that registers internal APIs, surfaces their payloads, and lets engineers invoke an endpoint and read its health without leaving the tool.",
    tech: ["Java", "Spring Boot", "Argo CD", "CI/CD", "Snyk"],
  },
  {
    title: "NeoBank",
    org: "Personal project",
    personal: true,
    blurb: "A microservices banking sandbox built to practise distributed patterns end to end: service discovery, gateway routing, circuit breaking and saga-based distributed transactions.",
    tech: ["Spring Boot", "Eureka", "API Gateway", "Resilience4j"],
    repo: GITHUB,
  },
];

const EXPERIENCE = [
  {
    when: "Aug 2026 — Present",
    title: "JSwitcher — job search & career platform",
    now: true,
    points: [
      "Building across a microservices platform made up of a candidate/recruiter profile service and an interview management service.",
      "Shipped registration, authentication and dashboard flows for both personas, keeping data handling consistent across them.",
      "Designed and consumed the REST contracts between frontend and backend, validating them with Postman and Swagger.",
    ],
  },
  {
    when: "Nov 2025 — Aug 2026",
    title: "Credit Card Platform — Yes Bank",
    points: [
      "Built Spring Boot microservices consuming high-volume messages from a Kafka cluster, with offset-based replay for failed messages.",
      "Worked with the Kafka admin team on topic configuration, partitioning strategy and consumer group setup across QA and production.",
      "Traced production message failures through Kibana and Elasticsearch, cutting turnaround time on live issues.",
    ],
  },
  {
    when: "Apr 2024 — Nov 2025",
    title: "NioTracker / NioTicket — issue tracking",
    points: [
      "Built frontend and backend for the full ticket lifecycle, including the admin console for assignment and status management.",
      "Secured ticket, user and project data with JWT authentication and role-based access control.",
      "Added server-side pagination, filtering and sorting so listing response times held steady as volume grew.",
    ],
  },
  {
    when: "Aug 2023 — Apr 2024",
    title: "NioManager — admin platform",
    points: [
      "Led design, development and testing of 15+ REST APIs integrating data across application modules.",
      "Tuned MongoDB queries and indexes, and refactored inefficient data access paths.",
      "Ran code reviews and published API contracts so frontend and backend could move in parallel.",
    ],
  },
  {
    when: "Nov 2022 — Aug 2023",
    title: "NioJobs — job portal",
    points: [
      "Delivered around 90% of the frontend for the first release, in React.js and Material-UI.",
      "Built job posting management, candidate profiles, resume upload, search and application tracking.",
      "Created employer dashboards showing applicant pipelines and job performance.",
    ],
  },
  {
    when: "May 2022 — Nov 2022",
    title: "Nioscaler — team wiki platform",
    points: [
      "Contributed to a Markdown editor with real-time collaboration and version history.",
      "Shipped features and fixes across Java 8 / Spring Boot / MongoDB and the React.js frontend.",
      "Supported deployment and configuration of components on AWS.",
    ],
  },
];

const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["resume", "Resume"],
  ["contact", "Contact"],
];

/* ------------------------------ icons ------------------------------ */

const Ic = {
  github: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.66c0-1.35-.02-3.09-1.98-3.09-1.98 0-2.28 1.47-2.28 2.99V21h-4V9Z" />
    </svg>
  ),
  mail: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  ),
  phone: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1Z" />
    </svg>
  ),
  ext: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  ),
  down: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 20h16" />
    </svg>
  ),
};

/* ---------------------------- component ---------------------------- */

export default function Portfolio() {
  const [phase, setPhase] = useState("boot"); // boot | lift | done
  const [step, setStep] = useState(0);
  const [active, setActive] = useState("about");
  const [menu, setMenu] = useState(false);
  const [stuck, setStuck] = useState(false);
  const timers = useRef([]);

  const finish = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(BOOT_LINES.length);
    setPhase("lift");
    timers.current.push(setTimeout(() => setPhase("done"), 820));
  };

  /* cold-start sequence */
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setStep(BOOT_LINES.length);
      setPhase("done");
      return;
    }

    BOOT_LINES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 220 + i * 260));
    });
    timers.current.push(setTimeout(() => setPhase("lift"), 220 + BOOT_LINES.length * 260 + 260));
    timers.current.push(setTimeout(() => setPhase("done"), 220 + BOOT_LINES.length * 260 + 1040));

    const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter") finish(); };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* scroll reveals */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".rv, .spine, .node"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* active nav link + sticky nav state */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setStuck(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ready = phase !== "boot";

  return (
    <div className={"tb-root" + (ready ? " ready" : "")}>
      <style>{STYLES}</style>

      {/* cold start */}
      <div
        className={"curtain" + (phase === "lift" ? " lift" : "") + (phase === "done" ? " lift gone" : "")}
      >
        <div className="shutter top" aria-hidden="true" />
        <div className="shutter bot" aria-hidden="true" />
        <div className="boot" aria-hidden="true">
          <div className="boot-inner">
            {BOOT_LINES.slice(0, step).map(([k, v], i) => (
              <div className="boot-line" key={k} style={{ animationDelay: `${i * 20}ms` }}>
                <span><b>::</b> {k}</span>
                <span className={i === BOOT_LINES.length - 1 ? "ok" : ""}>{v}</span>
              </div>
            ))}
            <div className="boot-bar">
              <span style={{ width: `${(step / BOOT_LINES.length) * 100}%` }} />
            </div>
          </div>
        </div>
        <button className="boot-skip" onClick={finish}>skip intro</button>
      </div>

      {/* nav */}
      <nav className={"nav" + (stuck ? " stuck" : "")}>
        <div className="wrap">
          <div className="nav-in">
            <a className="brand" href="#top" onClick={(e) => go(e, "top")}>
              Truptiranjan<i>.</i>
            </a>
            <div className="nav-links">
              {NAV.map(([id, label]) => (
                <a key={id} href={`#${id}`} className={active === id ? "on" : ""} onClick={(e) => go(e, id)}>
                  {label}
                </a>
              ))}
              <a className="nav-cta" href={`mailto:${EMAIL}`}>Get in touch</a>
            </div>
            <button className="menu-btn" onClick={() => setMenu(!menu)} aria-expanded={menu}>
              {menu ? "Close" : "Menu"}
            </button>
          </div>
          <div className={"menu-panel" + (menu ? " open" : "")}>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={(e) => go(e, id)}>{label}</a>
            ))}
            <a href={`mailto:${EMAIL}`}>Get in touch</a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className="wrap hero" id="top">
        <div className="enter">
          <h1><span>Truptiranjan</span><span>Biswal</span></h1>
          <div className="role">Full-stack Java developer — Spring Boot, Kafka, React</div>
          <p className="pitch">
            Four years building backend systems that have to stay up: event-driven services for a
            bank's credit card platform, admin and recruitment products, and the React frontends
            that sit on top of them.
          </p>
          <div className="cta-row">
            <a className="btn btn-solid" href="#projects" onClick={(e) => go(e, "projects")}>View projects</a>
            <a className="btn btn-ghost" href={RESUME_DOWNLOAD}>{Ic.down} Download resume</a>
            <div className="icons">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">{Ic.github}</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Ic.linkedin}</a>
              <a href={`mailto:${EMAIL}`} aria-label="Email">{Ic.mail}</a>
            </div>
          </div>
          <div className="facts">
            <div className="fact"><b>4+ yrs</b>Full-stack Java</div>
            <div className="fact"><b>Pune</b>Maharashtra, India</div>
            <div className="fact"><b>Banking · SaaS · HR-tech</b>Domains shipped in</div>
          </div>
        </div>
        <div className="rule" />
      </header>

      {/* about */}
      <section className="sec" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="rv">
              <div className="sec-head"><h2>About</h2><div className="h-rule" /></div>
              <p>
                I write Java for a living and enjoy the part most people skip past — what happens when
                a message fails, when the queue backs up, when a query that was fine at ten thousand
                rows stops being fine at ten million.
              </p>
              <p>
                Most of that came from four years at Canary TechSys in Pune, where I moved between a
                bank's credit card platform, an issue tracker, an admin console and a job portal. The
                banking work was Kafka-heavy: consumers processing high volumes of events, replaying
                failures by offset, and tracing what went wrong through Kibana at two in the morning.
              </p>
              <p>
                I'm comfortable on the other side of the stack too. I built roughly 90% of NioJobs'
                first frontend in React, and I run my own Spring Boot + React + MySQL temple
                management app end to end — design, deploy, and every bug in between.
              </p>
            </div>
            <aside className="side-card rv" style={{ transitionDelay: "120ms" }}>
              <dl>
                <div><dt>Currently</dt><dd>Full-Stack Java Developer, Canary TechSys</dd></div>
                <div><dt>Working on</dt><dd>JSwitcher — profile and interview services</dd></div>
                <div><dt>Strongest in</dt><dd>Spring Boot, Kafka, REST API design</dd></div>
                <div><dt>Education</dt><dd>B.Tech, Government College of Engineering, Keonjhar</dd></div>
                <div><dt>Open to</dt><dd>Backend and full-stack roles</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* skills */}
      <section className="sec" id="skills">
        <div className="wrap">
          <div className="sec-head rv">
            <h2>Skills</h2>
            <p className="lede">What I reach for day to day, grouped by where it sits in the stack.</p>
            <div className="h-rule" />
          </div>
          {SKILLS.map((s, i) => (
            <div className="skill-row rv" key={s.group} style={{ transitionDelay: `${i * 70}ms` }}>
              <h3>{s.group}</h3>
              <div className="chips">
                {s.items.map((it) => <span className="chip" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* projects */}
      <section className="sec" id="projects">
        <div className="wrap">
          <div className="sec-head rv">
            <h2>Projects</h2>
            <p className="lede">
              Client work is mostly closed-source, so the descriptions carry the detail. The temple
              platform below is live and mine end to end.
            </p>
            <div className="h-rule" />
          </div>

          <article className="feat rv">
            <div className="feat-body">
              <div className="kind" style={{ fontSize: ".78rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                <span className="dot personal" /> Personal project · live
              </div>
              <h3>Radha Krishna Temple Management Platform</h3>
              <p style={{ color: "var(--muted)", fontSize: ".97rem" }}>
                A full-stack app for a working temple: public pages with a photo gallery and Panchang
                calendar, plus an admin dashboard so the founder can update announcements, events and
                gallery images without touching code. JWT auth separates admin from visitor, images
                are validated on upload, and the whole thing runs on Vercel, Render and Aiven MySQL.
              </p>
              <div className="tags">
                {["Java", "Spring Boot", "Spring Security", "JWT", "React.js", "MySQL", "Vercel", "Render"].map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="card-links">
                <a href="https://radhakrishnatempleui.vercel.app/" target="_blank" rel="noreferrer">{Ic.ext} Live site</a>
                <a href={GITHUB} target="_blank" rel="noreferrer">{Ic.github} Source</a>
              </div>
            </div>
            <div className="feat-visual">
              <div className="k">deployed</div>
              <div className="v">React on Vercel<br />Spring Boot on <em>Render</em></div>
              <div className="k">Aiven-managed MySQL · env-based CORS &amp; secrets</div>
            </div>
          </article>

          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <article className="card rv" key={p.title} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
                <div className="kind">
                  <span className={"dot" + (p.personal ? " personal" : "")} /> {p.org}
                </div>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="tags">
                  {p.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                {p.repo ? (
                  <div className="card-links">
                    <a href={p.repo} target="_blank" rel="noreferrer">{Ic.github} Source</a>
                  </div>
                ) : (
                  <div className="private">Code is private — happy to walk through the design.</div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* experience */}
      <section className="sec" id="experience">
        <div className="wrap">
          <div className="sec-head rv"><h2>Experience</h2><div className="h-rule" /></div>
          <div className="co rv">
            <h3>Canary TechSys</h3>
            <span className="meta">Full-Stack Java Developer · Pune, India · May 2022 — Present</span>
          </div>
          <div className="spine">
            {EXPERIENCE.map((e) => (
              <div className={"node rv" + (e.now ? " now" : "")} key={e.title}>
                <div className="when">{e.when}</div>
                <h4>{e.title}</h4>
                <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* resume */}
      <section className="sec" id="resume">
        <div className="wrap">
          <div className="resume-band rv">
            <div>
              <h2>Resume</h2>
              <p>
                Two pages: full technical stack, six project engagements with dates, and the temple
                platform. Open it in Drive or pull down the PDF.
              </p>
            </div>
            <div className="resume-actions">
              <a className="btn btn-mint" href={RESUME_VIEW} target="_blank" rel="noreferrer">{Ic.ext} View resume</a>
              <a className="btn btn-onink" href={RESUME_DOWNLOAD}>{Ic.down} Download PDF</a>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="sec" id="contact">
        <div className="wrap">
          <div className="sec-head rv">
            <h2>Get in touch</h2>
            <p className="lede">Open to backend and full-stack Java roles. Fastest way to reach me is email.</p>
            <div className="h-rule" />
          </div>
          <div className="contact-grid">
            <a className="contact-item rv" href={`mailto:${EMAIL}`}>
              <span className="ci-ic">{Ic.mail}</span>
              <span><small>Email</small><strong>{EMAIL}</strong></span>
            </a>
            <a className="contact-item rv" href={`tel:${PHONE.replace(/\s/g, "")}`} style={{ transitionDelay: "80ms" }}>
              <span className="ci-ic">{Ic.phone}</span>
              <span><small>Phone</small><strong>{PHONE}</strong></span>
            </a>
            <a className="contact-item rv" href={LINKEDIN} target="_blank" rel="noreferrer" style={{ transitionDelay: "160ms" }}>
              <span className="ci-ic">{Ic.linkedin}</span>
              <span><small>LinkedIn</small><strong>truptiranjan-biswal</strong></span>
            </a>
            <a className="contact-item rv" href={GITHUB} target="_blank" rel="noreferrer" style={{ transitionDelay: "240ms" }}>
              <span className="ci-ic">{Ic.github}</span>
              <span><small>GitHub</small><strong>Truptiranjan98</strong></span>
            </a>
          </div>
          <a className="btn btn-solid" href={`mailto:${EMAIL}?subject=Opportunity%20for%20Truptiranjan`}>
            {Ic.mail} Email me
          </a>
        </div>
      </section>

      <footer className="wrap foot">
        <span>Truptiranjan Biswal — Pune, India</span>
        <span>Built with React. Deployed on Vercel.</span>
      </footer>
    </div>
  );
}

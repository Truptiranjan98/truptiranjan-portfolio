import { LINKS } from "./profile";

export const BOOT_LINES = [
  ["profile-service", "up"],
  ["kafka-listener", "3 partitions assigned"],
  ["api-gateway", "routes mapped"],
  ["postgres pool", "10 connections"],
  ["portfolio", "ready"],
];

export const SKILLS = [
  {
    group: "Backend",
    items: [
      "Java 8 / 11 / 17",
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "Microservices",
      "REST API design",
      "Apache Kafka",
      "Netflix OSS",
    ],
  },
  {
    group: "Frontend",
    items: ["React.js", "Redux", "Angular", "TypeScript", "Material-UI", "HTML5", "CSS3"],
  },
  {
    group: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "MongoDB",
      "Elasticsearch",
      "Query optimisation",
      "Indexing",
    ],
  },
  {
    group: "Platform & delivery",
    items: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitLab CI/CD",
      "Argo CD",
      "AWS (EC2, S3)",
      "Maven",
      "Git",
    ],
  },
  {
    group: "Quality & tooling",
    items: [
      "JUnit",
      "Mockito",
      "Postman",
      "Swagger / OpenAPI",
      "Kibana",
      "Jasmine / Karma",
      "Jira",
      "Bitbucket",
    ],
  },
];

export const FEATURED = {
  title: "Radha Krishna Temple Management Platform",
  kind: "Personal project · live",
  personal: true,
  blurb:
    "A full-stack app for a working temple: public pages with a photo gallery and Panchang calendar, plus an admin dashboard so the founder can update announcements, events and gallery images without touching code. JWT auth separates admin from visitor, images are validated on upload, and the whole thing runs on Vercel, Render and Aiven MySQL.",
  tech: [
    "Java",
    "Spring Boot",
    "Spring Security",
    "JWT",
    "React.js",
    "MySQL",
    "Vercel",
    "Render",
  ],
  live: LINKS.templeLive,
  repo: LINKS.github,
  panel: {
    label: "deployed",
    lines: ["React on Vercel", "Spring Boot on Render"],
    note: "Aiven-managed MySQL · env-based CORS & secrets",
  },
};

export const PROJECTS = [
  {
    title: "Credit Card Platform",
    org: "Yes Bank · client work",
    personal: false,
    blurb:
      "Internet banking platform for self-service credit card journeys. Spring Boot services consume high-volume Kafka events, with offset-based replay so failed messages reprocess instead of dropping transaction data.",
    tech: ["Java", "Spring Boot", "Kafka", "Netflix OSS", "Angular", "Elasticsearch"],
  },
  {
    title: "JSwitcher",
    org: "Canary TechSys · client work",
    personal: false,
    blurb:
      "Recruitment platform built as microservices — a recruiter/candidate profile service and an interview service handling scheduling, rescheduling and status transitions with notification triggers.",
    tech: ["Spring Boot", "REST APIs", "React.js", "Swagger", "Postman"],
  },
  {
    title: "NioTracker",
    org: "Canary TechSys · client work",
    personal: false,
    blurb:
      "Issue-tracking system covering the full raise-to-resolve workflow, plus an admin console for assignment and reporting. Server-side pagination and indexing keep listings fast as ticket volume grows.",
    tech: ["Java", "Spring Boot", "MongoDB", "React.js", "Material-UI", "JWT"],
  },
  {
    title: "NioManager",
    org: "Canary TechSys · lead developer",
    personal: false,
    blurb:
      "Admin platform for organisational data and operational workflows. Designed and shipped 15+ REST APIs with JWT auth and role-based access for administrators and operators.",
    tech: ["Java 8", "Spring Boot", "MongoDB", "React.js", "Material-UI"],
  },
  {
    title: "NioJobs",
    org: "Canary TechSys · client work",
    personal: false,
    blurb:
      "Job portal covering postings, candidate profiles, resume upload and application tracking. Delivered roughly 90% of the frontend for the first production release.",
    tech: ["React.js", "Material-UI", "Spring Boot", "MongoDB"],
  },
  {
    title: "Nioscaler",
    org: "Canary TechSys · client work",
    personal: false,
    blurb:
      "Cloud wiki for distributed teams — a Markdown editor with version history, tagging and collaborative authoring, deployed on AWS.",
    tech: ["Java 8", "Spring Boot", "MongoDB", "Oracle", "React.js", "AWS"],
  },
  {
    title: "Insight Listener",
    org: "Internal tool",
    personal: false,
    blurb:
      "API health monitor that registers internal APIs, surfaces their payloads, and lets engineers invoke an endpoint and read its health without leaving the tool.",
    tech: ["Java", "Spring Boot", "Argo CD", "CI/CD", "Snyk"],
  },
  {
    title: "NeoBank",
    org: "Personal project",
    personal: true,
    blurb:
      "A microservices banking sandbox built to practise distributed patterns end to end: service discovery, gateway routing, circuit breaking and saga-based distributed transactions.",
    tech: ["Spring Boot", "Eureka", "API Gateway", "Resilience4j"],
    repo: LINKS.github,
  },
];

export const EXPERIENCE = [
  {
    when: "Aug 2025 — Present",
    title: "JSwitcher — job search & career platform",
    now: true,
    points: [
      "Building across a microservices platform made up of a candidate/recruiter profile service and an interview management service.",
      "Shipped registration, authentication and dashboard flows for both personas, keeping data handling consistent across them.",
      "Designed and consumed the REST contracts between frontend and backend, validating them with Postman and Swagger.",
    ],
  },
  {
    when: "Nov 2024 — Aug 2025",
    title: "Credit Card Platform — Yes Bank",
    points: [
      "Built Spring Boot microservices consuming high-volume messages from a Kafka cluster, with offset-based replay for failed messages.",
      "Worked with the Kafka admin team on topic configuration, partitioning strategy and consumer group setup across QA and production.",
      "Traced production message failures through Kibana and Elasticsearch, cutting turnaround time on live issues.",
    ],
  },
  {
    when: "Apr 2024 — Nov 2024",
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

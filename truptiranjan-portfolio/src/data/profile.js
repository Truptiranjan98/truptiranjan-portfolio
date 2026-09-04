/* Single source of truth for identity + links.
   Change a link here and it updates everywhere on the page. */

const RESUME_ID = "1WeZ-RDidEmtn97tfcnevYFsIcdNBpsyu";

export const PROFILE = {
  firstName: "Truptiranjan",
  lastName: "Biswal",
  role: "Full-stack Java developer",
  stackItems: ["Spring Boot", "Kafka", "React", "AWS"],
  location: "Pune, Maharashtra",
  company: "Canary TechSys",
  education: "B.Tech, Government College of Engineering, Keonjhar",
  /* Career start — the live experience clock counts up from this instant. */
  careerStart: "2022-05-02T09:30:00+05:30",
  pitch:
    "I build backend systems that have to stay up: event-driven services for a bank's credit card platform, admin and recruitment products, and the React frontends that sit on top of them.",
};

export const LINKS = {
  github: "https://github.com/Truptiranjan98",
  linkedin: "https://www.linkedin.com/in/truptiranjan-biswal",
  email: "tr4jobs@gmail.com",
  phone: "+91 93377 97478",
  resumeView: `https://drive.google.com/file/d/${RESUME_ID}/view?usp=sharing`,
  resumeDownload: `https://drive.google.com/uc?export=download&id=${RESUME_ID}`,
  templeLive: "https://radhakrishnatempleui.vercel.app/",
};

/* mailto: opens whatever mail app the visitor actually uses — on a phone that is
   the native client, not a Gmail web login. Subject is prefilled for recruiters. */
const SUBJECT = "Opportunity for Truptiranjan";

/* mailto: opens whatever mail app the visitor actually uses — on a phone that is
   usually the native client. It does nothing when no handler is registered,
   which is why EmailLink falls back to GMAIL_COMPOSE. */
export const MAIL_TO =
  `mailto:${LINKS.email}?subject=${encodeURIComponent(SUBJECT)}`;

/* Gmail web compose — the fallback, and the only option that works inside
   in-app browsers like LinkedIn's. */
export const GMAIL_COMPOSE =
  `https://mail.google.com/mail/?view=cm&fs=1` +
  `&to=${encodeURIComponent(LINKS.email)}` +
  `&su=${encodeURIComponent(SUBJECT)}`;

export const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["resume", "Resume"],
  ["contact", "Contact"],
];

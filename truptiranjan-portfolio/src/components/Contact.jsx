import SectionHead from "./SectionHead";
import { LINKS } from "../data/profile";
import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, ArrowIcon } from "./Icons";
import EmailLink from "./EmailLink";
import "./Contact.css";

const CHANNELS = [
  { label: "Email", value: LINKS.email, Icon: MailIcon, mail: true },
  {
    label: "Phone",
    value: LINKS.phone,
    href: `tel:${LINKS.phone.replace(/\s/g, "")}`,
    Icon: PhoneIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "truptiranjan-biswal",
    href: LINKS.linkedin,
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "Truptiranjan98",
    href: LINKS.github,
    Icon: GithubIcon,
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <SectionHead
          title="Get in touch"
          lede="Open to backend and full-stack Java roles. Fastest way to reach me is email."
        />

        <div className="contact-grid">
          {CHANNELS.map(({ label, value, href, Icon, external, mail }, i) => {
  /* the email card needs the mailto-then-Gmail fallback; the rest are
     ordinary links */
  const Tag = mail ? EmailLink : "a";
  return (
    <Tag
      className="contact-item rv"
      key={label}
      style={{ transitionDelay: `${i * 80}ms` }}
      {...(mail ? {} : { href })}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="contact-ic"><Icon /></span>
      <span className="contact-text">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </Tag>
  );
})}
        </div>

         <EmailLink className="btn btn-primary contact-cta">
  <MailIcon size={17} /> Email me <ArrowIcon />
</EmailLink>
      </div>
    </section>
  );
}

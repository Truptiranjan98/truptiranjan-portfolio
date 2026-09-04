import { MAIL_TO, GMAIL_COMPOSE } from "../data/profile";

/**
 * mailto: is the right link — it opens whatever mail app the visitor uses.
 * But it silently does nothing when no handler is registered (most desktops,
 * and in-app browsers like LinkedIn's). So: fire mailto, then check whether
 * the page still has focus. If a mail app or OS dialog opened, focus moved
 * away and we do nothing. If focus never left, nothing handled it — open
 * Gmail compose instead.
 */
export default function EmailLink({ className, children, onClick, ...rest }) {
  const handleClick = (event) => {
    event.preventDefault();
    onClick?.(event);
    window.location.href = MAIL_TO;

    setTimeout(() => {
      if (document.hasFocus()) {
        window.open(GMAIL_COMPOSE, "_blank", "noopener,noreferrer");
      }
    }, 800);
  };

  return (
    <a className={className} href={MAIL_TO} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
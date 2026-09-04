import { useCallback } from "react";

/**
 * Returns an anchor click handler that scrolls to a section instead of
 * jumping. `onNavigate` lets the caller close the mobile menu on the way.
 */
export function useSmoothScroll(onNavigate) {
  return useCallback(
    (event, id) => {
      event.preventDefault();
      onNavigate?.();
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      /* Keep the URL shareable without letting the browser also jump. */
      if (window.history?.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [onNavigate]
  );
}

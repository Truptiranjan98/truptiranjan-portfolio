import { useEffect } from "react";

/**
 * Adds `.in` to every `.rv` / `.spine` / `.node` once it scrolls into view.
 *
 * Class-based rather than per-component state on purpose: reveals are pure
 * presentation, and routing them through React state would re-render whole
 * sections on scroll for no benefit.
 *
 * `deps` lets the caller re-scan after content mounts.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(".rv, .spine, .node"));
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target); // reveal once, then stop watching
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

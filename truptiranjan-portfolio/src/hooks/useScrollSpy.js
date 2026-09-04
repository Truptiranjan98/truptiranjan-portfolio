import { useState, useEffect } from "react";

/**
 * Tracks which section is in view, whether the nav has left the top of the
 * page, and how far down the document the reader is.
 *
 * Scroll work is throttled to one rAF per frame — a bare scroll listener that
 * writes state can fire dozens of times per frame on a trackpad.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]?.[0] ?? "");
  const [stuck, setStuck] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let frame = 0;
    const measure = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const reach = document.documentElement.scrollHeight - window.innerHeight;
      setStuck(scrolled > 40);
      setProgress(reach > 0 ? Math.min(scrolled / reach, 1) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return { active, stuck, progress };
}

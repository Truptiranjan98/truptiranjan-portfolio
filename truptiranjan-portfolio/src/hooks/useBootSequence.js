import { useState, useEffect, useRef, useCallback } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Drives the cold-start curtain: step reveals the log lines one at a time,
 * phase moves boot -> lift -> done.
 *
 * Anyone who has seen the intro once can kill it with Esc, Enter, a tap, or
 * the skip button — an animation you cannot dismiss is a tax on repeat visits.
 */
export function useBootSequence(lineCount, { stepMs = 260, startMs = 220 } = {}) {
  const [phase, setPhase] = useState("boot"); // boot | lift | done
  const [step, setStep] = useState(0);
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const skip = useCallback(() => {
    clear();
    setStep(lineCount);
    setPhase("lift");
    timers.current.push(setTimeout(() => setPhase("done"), 820));
  }, [lineCount]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(lineCount);
      setPhase("done");
      return;
    }

    for (let i = 0; i < lineCount; i += 1) {
      timers.current.push(setTimeout(() => setStep(i + 1), startMs + i * stepMs));
    }
    const runout = startMs + lineCount * stepMs;
    timers.current.push(setTimeout(() => setPhase("lift"), runout + stepMs));
    timers.current.push(setTimeout(() => setPhase("done"), runout + 1040));

    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clear();
      window.removeEventListener("keydown", onKey);
    };
  }, [lineCount, stepMs, startMs, skip]);

  /* Freeze the page behind the curtain so the reveal always lands on the hero
     rather than wherever a restored scroll position happened to be. */
  useEffect(() => {
    if (phase === "done") return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [phase]);

  return { phase, step, skip, ready: phase !== "boot" };
}

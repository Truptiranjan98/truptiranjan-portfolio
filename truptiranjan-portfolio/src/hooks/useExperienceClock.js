import { useState, useEffect, useRef } from "react";

/**
 * Calendar-accurate difference between two dates.
 * Borrowing is done unit by unit so "1 month" means a real month, not 30 days —
 * a fixed-length approximation drifts by a couple of days per year.
 */
export function elapsedSince(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    // day 0 of the current month === last day of the previous month
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Ticks once a second so the counter stays live.
 *
 * Two deliberate cheats:
 *  - the interval is torn down while the tab is hidden, because a background
 *    tab burning a timer for an invisible number is just battery drain;
 *  - the first value is computed synchronously, so the number never renders
 *    as zeros for a frame before the first tick.
 */
export function useExperienceClock(startISO) {
  const start = useRef(new Date(startISO));
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let id = null;

    const tick = () => setNow(new Date());
    const run = () => {
      if (id !== null) return;
      tick();
      id = setInterval(tick, 1000);
    };
    const stop = () => {
      if (id === null) return;
      clearInterval(id);
      id = null;
    };
    const onVisibility = () =>
      document.visibilityState === "visible" ? run() : stop();

    run();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return elapsedSince(start.current, now);
}

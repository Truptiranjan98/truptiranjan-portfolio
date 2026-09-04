import { useCallback } from "react";

import { NAV } from "../data/profile";
import { BOOT_LINES } from "../data/content";

import { useBootSequence } from "../hooks/useBootSequence";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

import BootCurtain from "./BootCurtain";
import NavBar from "./NavBar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Resume from "./Resume";
import Contact from "./Contact";
import Footer from "./Footer";

import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/footer.css";

/**
 * Composition root. All behaviour lives in hooks and all markup in section
 * components — this file only wires them together.
 */
export default function Portfolio() {
  const { phase, step, skip, ready } = useBootSequence(BOOT_LINES.length);
  const { active, stuck, progress } = useScrollSpy(NAV);
  const onNavigate = useSmoothScroll(useCallback(() => {}, []));

  useScrollReveal();

  return (
    <div className={"tb-root" + (ready ? " ready" : "")}>
      <BootCurtain phase={phase} step={step} onSkip={skip} />

      <NavBar active={active} stuck={stuck} progress={progress} onNavigate={onNavigate} />

      <main>
        <Hero onNavigate={onNavigate} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Resume />
        <Contact />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

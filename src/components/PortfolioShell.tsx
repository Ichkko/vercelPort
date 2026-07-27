"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { About } from "./About";
import { Contact } from "./Contact";
import { CustomCursor } from "./CustomCursor";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Timeline } from "./Timeline";
import { FloatingDotNav } from "./FloatingDotNav";
import { LanguageToggle } from "./LanguageToggle";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { SwayingPlant, FloatingLeaf, GrassBlades } from "./PlantDecorations";
import { Gallery } from "./Gallery";
import { CurrentlyVibing } from "./CurrentlyVibing";
import { AmbientPlayer } from "./AmbientPlayer";

// Personal section: home, about, hobbies/personal
const PERSONAL_SECTIONS = ["personal-home", "personal-about", "personal-gallery", "personal-vibing", "personal-contact"];
// Professional section: skills, projects, experience
const PROFESSIONAL_SECTIONS = ["pro-skills", "pro-projects", "pro-experience"];

const ALL_SECTIONS = [...PERSONAL_SECTIONS, ...PROFESSIONAL_SECTIONS];

type Tab = "personal" | "professional";

export function PortfolioShell() {
  const [active, setActive] = useState(PERSONAL_SECTIONS[0]);
  const [tab, setTab] = useState<Tab>("personal");
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const currentSections =
    tab === "personal"
      ? [
          { id: "personal-home", label: "Home" },
          { id: "personal-about", label: "About" },
          { id: "personal-gallery", label: "Gallery" },
          { id: "personal-vibing", label: "Vibing" },
          { id: "personal-contact", label: "Contact" },
        ]
      : [
          { id: "pro-skills", label: "Skills" },
          { id: "pro-projects", label: "Projects" },
          { id: "pro-experience", label: "Experience" },
        ];

  useEffect(() => {
    const ids = tab === "personal" ? PERSONAL_SECTIONS : PROFESSIONAL_SECTIONS;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tab]);

  // Reset scroll and active when switching tabs
  const handleTabSwitch = (newTab: Tab) => {
    setTab(newTab);
    setActive(newTab === "personal" ? PERSONAL_SECTIONS[0] : PROFESSIONAL_SECTIONS[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <CustomCursor />
      <AmbientPlayer />

      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="dot-grid absolute inset-0 opacity-60 dark:opacity-40" />
        <div
          className="orb-1 absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(8,145,178,0.22) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="orb-2 absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(167,139,250,0.08) 50%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="orb-3 absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] opacity-60" />

        {/* ── Plant corner decorations ── */}
        {/* Bottom-left tall plant */}
        <SwayingPlant
          className="absolute bottom-0 left-0"
          color="rgba(34,197,94,0.28)"
          size={110}
          swayAmount={7}
          duration={4.2}
          delay={0}
        />
        {/* Bottom-right plant (flipped) */}
        <SwayingPlant
          className="absolute bottom-0 right-0"
          color="rgba(34,197,94,0.22)"
          size={90}
          swayAmount={5}
          duration={3.8}
          delay={0.6}
          flip
        />
        {/* Mid-left smaller plant */}
        <SwayingPlant
          className="absolute bottom-[30%] left-0"
          color="rgba(74,222,128,0.18)"
          size={65}
          swayAmount={9}
          duration={3.2}
          delay={1.1}
        />
        {/* Mid-right smaller plant */}
        <SwayingPlant
          className="absolute bottom-[55%] right-0"
          color="rgba(74,222,128,0.15)"
          size={55}
          swayAmount={8}
          duration={4.6}
          delay={0.3}
          flip
        />

        {/* Grass blades bottom */}
        <GrassBlades
          className="absolute bottom-0 left-[10%] w-32 h-16"
          color="rgba(34,197,94,0.3)"
          count={6}
        />
        <GrassBlades
          className="absolute bottom-0 right-[15%] w-24 h-12"
          color="rgba(74,222,128,0.25)"
          count={5}
        />
        <GrassBlades
          className="absolute bottom-0 left-[45%] w-20 h-10"
          color="rgba(34,197,94,0.2)"
          count={4}
        />

        {/* Floating leaf particles */}
        <FloatingLeaf
          className="absolute top-[20%] left-[8%]"
          color="rgba(34,197,94,0.35)"
          size={18}
          delay={0}
        />
        <FloatingLeaf
          className="absolute top-[40%] right-[10%]"
          color="rgba(74,222,128,0.3)"
          size={14}
          delay={1.5}
        />
        <FloatingLeaf
          className="absolute top-[65%] left-[15%]"
          color="rgba(34,197,94,0.25)"
          size={16}
          delay={0.8}
        />
        <FloatingLeaf
          className="absolute top-[75%] right-[20%]"
          color="rgba(134,239,172,0.3)"
          size={12}
          delay={2.2}
        />
        <FloatingLeaf
          className="absolute top-[10%] right-[25%]"
          color="rgba(34,197,94,0.2)"
          size={10}
          delay={3.0}
        />
      </div>

      {/* Floating top-left controls */}
      <div className="fixed left-6 top-6 z-50 flex items-center gap-2">
        <LanguageToggle compact />
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)]/90 px-3 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur-xl transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>

      {/* Floating tab switcher — centered top */}
      <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)]/90 p-1 shadow-lg backdrop-blur-xl">
          <button
            type="button"
            onClick={() => handleTabSwitch("personal")}
            className="relative rounded-full px-5 py-2 text-sm font-semibold transition-colors"
          >
            {tab === "personal" && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[var(--teal)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${
                tab === "personal" ? "text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              Personal
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("professional")}
            className="relative rounded-full px-5 py-2 text-sm font-semibold transition-colors"
          >
            {tab === "professional" && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[var(--teal)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${
                tab === "professional" ? "text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              Professional
            </span>
          </button>
        </div>
      </div>

      {/* Floating dot nav — right side */}
      <FloatingDotNav sections={currentSections} active={active} />

      {/* Main content */}
      <main className="relative z-10 w-full">
        {tab === "personal" ? (
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Personal Home — Hero */}
            <section id="personal-home" className="scroll-mt-0">
              <Hero />
            </section>

            {/* Personal About */}
            <section id="personal-about" className="scroll-mt-8">
              <div className="section-panel px-5 py-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <About />
                </div>
              </div>
            </section>

            {/* Personal Gallery */}
            <section id="personal-gallery" className="scroll-mt-8">
              <div className="section-panel px-5 py-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <Gallery />
                </div>
              </div>
            </section>

            {/* Currently Vibing */}
            <section id="personal-vibing" className="scroll-mt-8">
              <div className="section-panel px-5 py-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <CurrentlyVibing />
                </div>
              </div>
            </section>

            {/* Personal Contact */}
            <section id="personal-contact" className="scroll-mt-8">
              <Contact />
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="professional"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Professional Skills */}
            <section id="pro-skills" className="scroll-mt-0">
              <div className="section-panel px-5 pt-24 pb-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <Skills />
                </div>
              </div>
            </section>

            {/* Professional Projects */}
            <section id="pro-projects" className="scroll-mt-8">
              <div className="section-panel px-5 py-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <Projects />
                </div>
              </div>
            </section>

            {/* Professional Experience / Timeline */}
            <section id="pro-experience" className="scroll-mt-8">
              <div className="section-panel px-5 py-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <Timeline />
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </main>
    </div>
  );
}

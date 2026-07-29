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
import { Gallery } from "./Gallery";
import { CurrentlyVibing } from "./CurrentlyVibing";
import { AmbientPlayer } from "./AmbientPlayer";
import { HandcraftedArt } from "./HandcraftedArt";


// Personal section: home, about, hobbies/personal
const PERSONAL_SECTIONS = ["personal-home", "personal-about", "personal-gallery", "personal-handcraft", "personal-vibing", "personal-contact"];
// Professional section: skills, projects, experience, testimonials
const PROFESSIONAL_SECTIONS = ["pro-skills", "pro-projects", "pro-experience", "pro-testimonials"];

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
          { id: "personal-handcraft", label: "Art" },
          { id: "personal-vibing", label: "Vibing" },
          { id: "personal-contact", label: "Contact" },
        ]
      : [
          { id: "pro-skills", label: "Skills" },
          { id: "pro-projects", label: "Projects" },
          { id: "pro-experience", label: "Experience" },
          { id: "pro-testimonials", label: "Testimonials" },
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
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div
          className="orb-1 absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="orb-2 absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.16) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="orb-3 absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] opacity-60" />
      </div>

      {/* Floating top-left controls */}
      <div className="fixed left-3 top-3 z-50 flex items-center gap-1.5 sm:left-5 sm:top-5">
        <LanguageToggle compact />
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[rgba(168,85,247,0.2)] bg-[rgba(10,10,20,0.85)] text-[var(--muted)] backdrop-blur-xl transition hover:border-[rgba(168,85,247,0.4)] hover:text-[var(--neon)]"
          aria-label="Toggle theme"
        >
          <span className="text-sm">{theme === "dark" ? "☾" : "☀"}</span>
        </button>
      </div>

      {/* Floating tab switcher — centered top */}
      <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2 sm:top-5">
        <div className="flex items-center gap-0.5 rounded-full border border-[rgba(168,85,247,0.15)] bg-[rgba(8,8,16,0.92)] p-1 shadow-lg shadow-purple-900/20 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => handleTabSwitch("personal")}
            className="relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors sm:px-5 sm:py-2 sm:text-[13px]"
          >
            {tab === "personal" && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7]"
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
            className="relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors sm:px-5 sm:py-2 sm:text-[13px]"
          >
            {tab === "professional" && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${
                tab === "professional" ? "text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              Pro
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
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
                <div className="mx-auto max-w-[1040px]">
                  <About />
                </div>
              </div>
            </section>

            {/* Personal Gallery */}
            <section id="personal-gallery" className="scroll-mt-8">
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
                <div className="mx-auto max-w-[1040px]">
                  <Gallery />
                </div>
              </div>
            </section>

            {/* Handcrafted Art */}
            <section id="personal-handcraft" className="scroll-mt-8">
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
                <div className="mx-auto max-w-[1040px]">
                  <HandcraftedArt />
                </div>
              </div>
            </section>

            {/* Currently Vibing */}
            <section id="personal-vibing" className="scroll-mt-8">
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
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
              <div className="section-panel px-4 pt-20 pb-10 sm:px-5 sm:pt-24 sm:pb-12 md:px-10 lg:px-14">
                <div className="mx-auto max-w-[1040px]">
                  <Skills />
                </div>
              </div>
            </section>

            {/* Professional Projects */}
            <section id="pro-projects" className="scroll-mt-8">
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
                <div className="mx-auto max-w-[1040px]">
                  <Projects />
                </div>
              </div>
            </section>

            {/* Professional Experience / Timeline */}
            <section id="pro-experience" className="scroll-mt-8">
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
                <div className="mx-auto max-w-[1040px]">
                  <Timeline />
                </div>
              </div>
            </section>

            {/* Professional Testimonials */}
            <section id="pro-testimonials" className="scroll-mt-8">
              <div className="section-panel px-4 py-10 sm:px-5 md:px-10 lg:px-14 sm:py-12">
                <div className="mx-auto max-w-[1040px]">
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </main>
    </div>
  );
}

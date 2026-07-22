"use client";

import { useEffect, useState } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { MobileHeader } from "./MobileHeader";
import { Projects } from "./Projects";
import { Sidebar } from "./Sidebar";
import { Skills } from "./Skills";
import { Timeline } from "./Timeline";

const SECTION_IDS = ["home", "about", "skills", "projects", "experience", "contact"];

export function PortfolioShell() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(20,184,166,0.16),transparent_26rem),linear-gradient(135deg,#ffffff_0%,#f8fbff_55%,#eef7fb_100%)] dark:bg-[radial-gradient(circle_at_92%_4%,rgba(53,217,200,0.16),transparent_25rem),radial-gradient(circle_at_10%_34%,rgba(25,111,106,0.18),transparent_27rem),linear-gradient(145deg,#071012_0%,#0b1518_54%,#11191d_100%)]"
        aria-hidden
      />
      <MobileHeader active={active} />
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] gap-0 lg:gap-0">
        <Sidebar active={active} />
        <main className="w-full min-w-0 overflow-hidden pb-0 lg:ml-[252px] lg:overflow-visible">
          <Hero />
          <div className="section-panel px-5 py-10 md:px-10 lg:px-14">
            <div className="mx-auto max-w-[1040px] space-y-12">
              <About />
              <Skills />
              <Projects />
              <Timeline />
            </div>
          </div>
          <div className="px-0 lg:px-0">
            <Contact />
          </div>
        </main>
      </div>
    </div>
  );
}

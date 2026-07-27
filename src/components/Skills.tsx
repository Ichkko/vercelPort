"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  Component,
  Database,
  FileCode2,
  GitBranch,
  Hexagon,
  Leaf,
  Container,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { techStack } from "@/data/portfolio";
import { ScaleIn, Stagger, StaggerItem } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { LeafSprout, VineDecoration } from "./PlantDecorations";

const iconMap: Record<string, LucideIcon> = {
  Coffee,
  Leaf,
  Database,
  Hexagon,
  Component,
  FileCode2,
  Wind,
  GitBranch,
  Container,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  Coffee: { bg: "rgba(245,158,11,0.1)", text: "#d97706" },
  Leaf: { bg: "rgba(34,197,94,0.1)", text: "#16a34a" },
  Database: { bg: "rgba(59,130,246,0.1)", text: "#2563eb" },
  Hexagon: { bg: "rgba(8,145,178,0.1)", text: "#0891b2" },
  Component: { bg: "rgba(99,102,241,0.1)", text: "#6366f1" },
  FileCode2: { bg: "rgba(6,182,212,0.1)", text: "#0891b2" },
  Wind: { bg: "rgba(14,165,233,0.1)", text: "#0284c7" },
  GitBranch: { bg: "rgba(239,68,68,0.1)", text: "#dc2626" },
  Container: { bg: "rgba(8,145,178,0.1)", text: "#0369a1" },
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative scroll-mt-8">
      {/* Plant decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <LeafSprout
          className="absolute top-0 right-2 w-12 h-20 opacity-55"
          color="rgba(34,197,94,0.45)"
          delay={0.2}
        />
      </div>

      <ScaleIn>
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
            Tech Stack
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--ink)]">
            {t("skillsTitle")}
          </h2>
          <div className="mt-3 h-[3px] w-10 rounded-full accent-line" />
          <VineDecoration
            className="mt-3 opacity-45"
            color="rgba(34,197,94,0.38)"
            width={120}
          />
        </div>
      </ScaleIn>

      <Stagger className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
        {techStack.map((item) => {
          const Icon = iconMap[item.icon];
          const colors = colorMap[item.icon] ?? { bg: "var(--teal-soft)", text: "var(--teal)" };
          return (
            <StaggerItem key={item.name}>
              <motion.div
                whileHover={{ y: -6, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="skill-card card-soft glow-card flex flex-col items-center justify-center gap-2.5 px-2 py-4"
                style={{ minHeight: "90px" }}
              >
                {Icon && (
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.45 }}
                    className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                    style={{ background: colors.bg }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} style={{ color: colors.text }} />
                  </motion.div>
                )}
                <span className="text-center text-[10px] font-semibold leading-tight text-[var(--ink-soft)]">
                  {item.name}
                </span>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

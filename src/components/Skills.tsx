"use client";

import { useState } from "react";
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
import { techStack, skillCategories } from "@/data/portfolio";
import { ScaleIn, Stagger, StaggerItem } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { LeafSprout, VineDecoration } from "./PlantDecorations";
import { FadeIn } from "./FadeIn";
import type { TranslationKey } from "@/data/i18n";

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

function getProficiencyLabel(level: number, t: (key: TranslationKey) => string): string {
  if (level >= 80) return t("skillLevelAdvanced");
  if (level >= 65) return t("skillLevelIntermediate");
  return t("skillLevelBeginner");
}

export function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayedCategories = activeCategory
    ? skillCategories.filter((c) => c.id === activeCategory)
    : skillCategories;

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

      {/* Category filter tabs */}
      <FadeIn>
        <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: activeCategory === null ? "var(--teal)" : "var(--teal-soft)",
              color: activeCategory === null ? "#fff" : "var(--teal)",
              border: "1.5px solid",
              borderColor: activeCategory === null ? "var(--teal)" : "transparent",
            }}
          >
            All
          </button>
          {skillCategories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive ? cat.color : cat.colorSoft,
                  color: isActive ? "#fff" : cat.color,
                  border: "1.5px solid",
                  borderColor: isActive ? cat.color : "transparent",
                }}
              >
                {Icon && <Icon className="h-3 w-3" strokeWidth={2} />}
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Skill category cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayedCategories.map((cat, catIdx) => {
          const CatIcon = iconMap[cat.icon];
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: catIdx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="card-soft glow-card rounded-[var(--radius-lg)] p-5"
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-[8px]"
                  style={{ background: cat.colorSoft }}
                >
                  {CatIcon && (
                    <CatIcon className="h-4 w-4" strokeWidth={1.8} style={{ color: cat.color }} />
                  )}
                </div>
                <span className="text-sm font-bold text-[var(--ink)]">
                  {t(cat.labelKey)}
                </span>
                <span
                  className="ml-auto font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: cat.colorSoft, color: cat.color }}
                >
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skill rows */}
              <div className="flex flex-col gap-3">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: catIdx * 0.07 + skillIdx * 0.04 }}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--ink-soft)]">
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: cat.colorSoft, color: cat.color }}
                        >
                          {skill.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-[var(--muted)]">
                          {getProficiencyLabel(skill.level, t)}
                        </span>
                        <span
                          className="font-mono text-[10px] font-bold"
                          style={{ color: cat.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div
                      className="h-1.5 w-full rounded-full overflow-hidden"
                      style={{ background: cat.colorSoft }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 0.7,
                          delay: catIdx * 0.07 + skillIdx * 0.06 + 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick icon grid — kept as a compact reference strip */}
      <FadeIn delay={0.3}>
        <div className="mt-6 pt-5 border-t border-[var(--line)]">
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            Quick reference
          </p>
          <Stagger className="flex flex-wrap gap-2">
            {techStack.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <StaggerItem key={item.name}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] card-soft"
                  >
                    {Icon && (
                      <Icon
                        className="h-3.5 w-3.5"
                        strokeWidth={1.8}
                        style={{ color: "var(--teal)" }}
                      />
                    )}
                    <span className="text-[10px] font-semibold text-[var(--ink-soft)]">
                      {item.name}
                    </span>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </FadeIn>
    </section>
  );
}

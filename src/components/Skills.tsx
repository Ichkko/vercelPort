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
import { FadeIn, Stagger, StaggerItem } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

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

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="scroll-mt-8">
      <FadeIn>
        <h2 className="text-xl font-extrabold leading-tight text-[#151b31] dark:text-stone-50">
          {t("skillsTitle")}
        </h2>
        <div className="mt-2 h-0.5 w-8 bg-[var(--teal)]" />
      </FadeIn>

      <Stagger className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
        {techStack.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <StaggerItem key={item.name}>
              <motion.div
                whileHover={{ y: -3 }}
                className="card-soft flex min-h-[86px] flex-col items-center justify-center gap-2.5 px-2 py-3"
              >
                {Icon && (
                  <Icon className="h-6 w-6 text-stone-700 dark:text-stone-200" strokeWidth={1.5} />
                )}
                <span className="text-center text-[11px] font-semibold text-stone-700 dark:text-stone-300">
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

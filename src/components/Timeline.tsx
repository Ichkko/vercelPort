"use client";

import { motion } from "framer-motion";
import { FadeIn, ScaleIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

export function Timeline() {
  const { t } = useLanguage();

  const timeline = [
    {
      year: "2022",
      title: t("year2022Title"),
      items: [t("year2022Item1"), t("year2022Item2"), t("year2022Item3")],
    },
    {
      year: "2023",
      title: t("year2023Title"),
      items: [t("year2023Item1"), t("year2023Item2"), t("year2023Item3")],
    },
    {
      year: "2024",
      title: t("year2024Title"),
      items: [t("year2024Item1"), t("year2024Item2"), t("year2024Item3")],
    },
    {
      year: "2025–Now",
      title: t("year2025Title"),
      items: [t("year2025Item1"), t("year2025Item2"), t("year2025Item3")],
    },
  ];

  return (
    <section id="experience" className="scroll-mt-8">
      <FadeIn>
        <h2 className="text-xl font-extrabold leading-tight text-[#151b31] dark:text-stone-50">
          {t("timelineTitle")}
        </h2>
        <div className="mt-2 h-0.5 w-8 bg-[var(--teal)]" />
      </FadeIn>
      <ScaleIn delay={0.1}>
        <div className="mt-7 overflow-x-auto pb-2">
          <div className="relative min-w-[680px]">
            <div className="absolute left-[8%] right-[8%] top-3 h-px bg-stone-200 dark:bg-[var(--line)]" />
            <div className="absolute left-[8%] right-[8%] top-3 h-px bg-gradient-to-r from-transparent via-[var(--teal)] to-transparent opacity-60" />
            <div className="grid grid-cols-4 gap-4">
              {timeline?.map((item, i) => (
                <motion.div
                  key={item?.year}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pt-8 text-center"
                >
                  <div className="absolute left-1/2 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-[var(--teal)] bg-white shadow-[0_0_0_4px_var(--teal-soft)] dark:bg-[var(--bg-elevated)]" />
                  <p className="text-sm font-bold text-[var(--teal)]">{item?.year}</p>
                  <h3 className="mt-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {item?.title}
                  </h3>
                  <ul className="mt-3 space-y-1 text-xs leading-relaxed text-stone-500 dark:text-[var(--muted)]">
                    {item?.items?.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScaleIn>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { FadeIn, ScaleIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { GrassBlades, LeafSprout } from "./PlantDecorations";
import { useRef } from "react";

export function Timeline() {
  const { t } = useLanguage();
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-60px" });

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
    <section id="experience" className="relative scroll-mt-8">
      {/* Plant decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <GrassBlades
          className="absolute bottom-0 right-[20%] w-24 h-10 opacity-60"
          color="rgba(34,197,94,0.3)"
          count={4}
        />
        <LeafSprout
          className="absolute top-0 left-0 w-10 h-16 opacity-50"
          color="rgba(74,222,128,0.4)"
          delay={0.4}
        />
      </div>
      <FadeIn>
        <h2 className="text-xl font-extrabold leading-tight text-[#151b31] dark:text-stone-50">
          {t("timelineTitle")}
        </h2>
        <div className="mt-2 h-0.5 w-8 bg-[var(--teal)]" />
      </FadeIn>
      <ScaleIn delay={0.1}>
        <div className="mt-7 overflow-x-auto pb-2">
          <div ref={lineRef} className="relative min-w-[680px]">
            {/* Static base line */}
            <div className="absolute left-[8%] right-[8%] top-3 h-px bg-stone-200 dark:bg-[var(--line)]" />
            {/* Animated progress line */}
            <motion.div
              className="absolute left-[8%] top-3 h-px bg-gradient-to-r from-[var(--teal)] via-cyan-400 to-[var(--teal)] opacity-80"
              initial={{ width: 0 }}
              animate={isInView ? { width: "84%" } : { width: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
            <div className="grid grid-cols-4 gap-4">
              {timeline?.map((item, i) => (
                <motion.div
                  key={item?.year}
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.14,
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="relative pt-8 text-center cursor-default"
                >
                  {/* Animated dot */}
                  <motion.div
                    className="absolute left-1/2 top-1.5 -translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.14 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                    }}
                  >
                    <motion.div
                      className="h-3.5 w-3.5 rounded-full border-[3px] border-[var(--teal)] bg-white shadow-[0_0_0_4px_var(--teal-soft)] dark:bg-[var(--bg-elevated)]"
                      animate={{
                        boxShadow: [
                          "0 0 0 4px var(--teal-soft)",
                          "0 0 0 8px rgba(8,145,178,0.15)",
                          "0 0 0 4px var(--teal-soft)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                  </motion.div>
                  <p className="text-sm font-bold text-[var(--teal)]">{item?.year}</p>
                  <h3 className="mt-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {item?.title}
                  </h3>
                  <ul className="mt-3 space-y-1 text-xs leading-relaxed text-stone-500 dark:text-[var(--muted)]">
                    {item?.items?.map((line, li) => (
                      <motion.li
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.14 + li * 0.06 + 0.4, duration: 0.4 }}
                      >
                        {line}
                      </motion.li>
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

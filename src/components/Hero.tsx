"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  const stats = [
    { value: "3+", label: t("statYears") },
    { value: "20+", label: t("statProjects") },
    { value: "100%", label: t("statOwnership") },
  ];

  return (
    <section id="home" className="relative scroll-mt-6 overflow-visible px-5 py-10 md:px-10 md:py-16 lg:px-14 lg:py-15">
      <div className="relative mx-auto grid max-w-[1040px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="relative z-10 space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#edf8fb] px-4 py-2 text-sm font-semibold text-[var(--teal)] shadow-sm dark:border dark:border-[var(--line)] dark:bg-[var(--teal-soft)] dark:text-[var(--teal)] dark:shadow-[0_0_24px_rgba(53,217,200,0.08)]">
              <span aria-hidden>👋</span>
              {t("greeting")}
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.18] text-[#151b31] sm:text-5xl lg:text-[40px] dark:text-stone-50">
              {t("heroTitleBefore")}
              <span className="text-[#14B8A6]">{t("heroTitleAccent")}</span>
              {t("heroTitleAfter")}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-1 max-w-xl text-base leading-8 text-[#4d596f] dark:text-stone-400">
              {t("heroDesc")}
            </p>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#0faaa0] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/25"
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </motion.a>
              <motion.a
                href="/CV.pdf" target="_blank" rel="noopener noreferrer"
                download
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#e6ecf2] bg-white px-6 py-3 text-sm font-bold text-[#263248] shadow-md shadow-slate-200/70 dark:border-[var(--line)] dark:bg-white/[0.055] dark:text-[var(--ink)] dark:shadow-none dark:hover:border-[var(--teal)]/45"
              >
                {t("ctaCv")}
                <Download className="h-4 w-4" strokeWidth={1.5} />
              </motion.a>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <a href="#about" className="inline-flex items-center gap-2 text-xs font-semibold text-[#718096] dark:text-[var(--muted)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/[0.06] dark:shadow-none">
                <ArrowDown className="h-3.5 w-3.5 text-[var(--teal)]" strokeWidth={1.8} />
              </span>
              Scroll Down
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="relative mx-auto w-full max-w-[350px] pb-12">
          <div className="relative overflow-hidden rounded-[12px] shadow-[0_22px_55px_rgba(33,43,74,0.16)]">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={620}
              height={620}
              className="aspect-square w-full object-cover"
              priority
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="absolute bottom-3 left-1/2 z-10 w-[112%] max-w-[500px] -translate-x-1/2 rounded-[12px] border border-white/90 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(19,26,49,0.16)] dark:border-[var(--line)] dark:bg-[var(--bg-elevated)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.36)]"
          >
            <div className="grid grid-cols-3 divide-x divide-stone-100 dark:divide-[var(--line)]">
              {stats.map((stat) => (
                <div key={stat.label} className="px-3">
                  <p className="text-xl font-extrabold text-[#151b31] first:text-[#0f9f95] dark:text-stone-50">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-stone-500 dark:text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

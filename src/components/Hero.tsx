"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Terminal } from "lucide-react";
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
    <section
      id="home"
      className="relative scroll-mt-6 overflow-visible px-5 py-12 md:px-10 md:py-20 lg:px-14 lg:py-24"
    >
      <div className="relative mx-auto grid max-w-[1040px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left content */}
        <div className="relative z-10 space-y-7">
          {/* Badge */}
          <FadeIn>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(8,145,178,0.2)] bg-[rgba(8,145,178,0.06)] px-4 py-2 text-sm font-semibold text-[var(--teal)] backdrop-blur-sm dark:border-[rgba(34,211,238,0.2)] dark:bg-[rgba(34,211,238,0.06)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--teal)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--teal)]" />
              </span>
              <Terminal className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t("greeting")}
            </motion.div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.07}>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[52px]">
              {t("heroTitleBefore")}
              <span className="shimmer-text">{t("heroTitleAccent")}</span>
              {t("heroTitleAfter")}
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.12}>
            <p className="max-w-lg text-[16px] leading-[1.8] text-[var(--muted)]">
              {t("heroDesc")}
            </p>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.16}>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0891b2] via-[#06b6d4] to-[#0891b2] bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-right hover:shadow-cyan-500/40"
                style={{ backgroundSize: "200% auto" }}
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </motion.a>
              <motion.a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-6 py-3.5 text-sm font-bold text-[var(--ink-soft)] shadow-sm transition-all hover:border-[var(--teal)] hover:text-[var(--teal)] dark:bg-white/[0.04] dark:hover:bg-[var(--teal-soft)]"
              >
                {t("ctaCv")}
                <Download className="h-4 w-4" strokeWidth={1.8} />
              </motion.a>
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <FadeIn delay={0.22}>
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--teal)]"
            >
              <span className="scroll-indicator flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] shadow-sm dark:bg-white/[0.04]">
                <ArrowDown className="h-3.5 w-3.5 text-[var(--teal)]" strokeWidth={2} />
              </span>
              Scroll Down
            </a>
          </FadeIn>
        </div>

        {/* Right — image + stats */}
        <FadeIn delay={0.1} className="relative mx-auto w-full max-w-[360px]">
          {/* Decorative ring */}
          <div
            className="absolute -inset-4 rounded-[24px] opacity-30 blur-3xl dark:opacity-50"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(8,145,178,0.4), rgba(124,58,237,0.2) 60%, transparent 80%)",
            }}
            aria-hidden
          />

          {/* Spinning border accent */}
          <div
            className="absolute -inset-[3px] rounded-[22px] opacity-40"
            style={{
              background: "linear-gradient(135deg, rgba(8,145,178,0.6), rgba(124,58,237,0.4), transparent, rgba(8,145,178,0.3))",
            }}
            aria-hidden
          />

          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="relative overflow-hidden rounded-[20px] shadow-[0_24px_64px_rgba(8,145,178,0.2),0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <Image
              src={profile?.avatar}
              alt={profile?.name}
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,145,178,0.12)] via-transparent to-transparent" />
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 left-1/2 z-10 w-[108%] max-w-[420px] -translate-x-1/2 rounded-[14px] border border-[var(--line)] bg-[var(--bg-elevated)]/95 px-5 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:bg-[var(--bg-elevated)]/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <div className="grid grid-cols-3 divide-x divide-[var(--line)]">
              {stats?.map((stat, i) => (
                <motion.div
                  key={stat?.label}
                  className="px-3 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.4 }}
                >
                  <p className="text-xl font-extrabold gradient-text">{stat?.value}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[var(--muted)]">{stat?.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { LeafSprout, VineDecoration, SwayingPlant } from "./PlantDecorations";
import { useState, useEffect } from "react";

const roles = [
  "Full Stack Developer",
  "Spring Boot Engineer",
  "Next.js Developer",
  "Flutter Builder",
];

export function Hero() {
  const { t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

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
      {/* ── Sprouting plants in hero corners ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <LeafSprout
          className="absolute bottom-0 right-4 w-16 h-28 opacity-70"
          color="rgba(34,197,94,0.5)"
          delay={0.8}
        />
        <LeafSprout
          className="absolute bottom-0 left-4 w-12 h-20 opacity-60"
          color="rgba(74,222,128,0.45)"
          delay={1.2}
        />
        <SwayingPlant
          className="absolute -bottom-2 right-[12%] opacity-50"
          color="rgba(34,197,94,0.45)"
          size={70}
          swayAmount={8}
          duration={3.5}
          delay={0.4}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ── Left content ── */}
        <div className="relative z-10 space-y-6">

          {/* Location badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3.5 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm dark:bg-white/[0.04]">
              <MapPin className="h-3 w-3 text-[var(--teal)]" strokeWidth={2} />
              Ulaanbaatar, Mongolia
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
          </FadeIn>

          {/* Name */}
          <FadeIn delay={0.06}>
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
                Hi, I&apos;m
              </p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[54px]">
                Ichko
                <span className="shimmer-text">.</span>
              </h1>
            </div>
          </FadeIn>

          {/* Animated role */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 flex-shrink-0 text-[var(--teal)] opacity-70" strokeWidth={1.8} />
              <span className="font-mono text-base font-semibold text-[var(--ink-soft)] sm:text-lg">
                {displayed}
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--teal)]" />
              </span>
            </div>
          </FadeIn>

          {/* Bio */}
          <FadeIn delay={0.14}>
            <p className="max-w-[480px] text-[15.5px] leading-[1.85] text-[var(--muted)]">
              Junior full-stack developer building{" "}
              <span className="font-semibold text-[var(--ink-soft)]">clean interfaces</span> and{" "}
              <span className="font-semibold text-[var(--ink-soft)]">reliable backends</span>.
              I ship practical products with Spring Boot, Next.js, MySQL, and Flutter — focused on
              code that&apos;s readable, maintainable, and actually useful.
            </p>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.18}>
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0891b2] via-[#06b6d4] to-[#0891b2] bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-right hover:shadow-cyan-500/40"
                style={{ backgroundSize: "200% auto" }}
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
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
          <FadeIn delay={0.24}>
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--teal)]"
            >
              <span className="scroll-indicator flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] shadow-sm dark:bg-white/[0.04]">
                <ArrowDown className="h-3.5 w-3.5 text-[var(--teal)]" strokeWidth={2} />
              </span>
              Scroll to explore
            </a>
          </FadeIn>

          {/* Vine decoration */}
          <FadeIn delay={0.3}>
            <VineDecoration
              className="mt-1 opacity-50"
              color="rgba(34,197,94,0.4)"
              width={160}
            />
          </FadeIn>
        </div>

        {/* ── Right — image + stats ── */}
        <FadeIn delay={0.1} className="relative mx-auto w-full max-w-[360px]">
          {/* Decorative glow */}
          <div
            className="absolute -inset-4 rounded-full opacity-30 blur-3xl dark:opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(8,145,178,0.4), rgba(124,58,237,0.2) 60%, transparent 80%)",
            }}
            aria-hidden
          />

          {/* Spinning border accent */}
          <div
            className="absolute -inset-[3px] rounded-full opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(8,145,178,0.6), rgba(124,58,237,0.4), transparent, rgba(8,145,178,0.3))",
            }}
            aria-hidden
          />

          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="relative overflow-hidden rounded-full shadow-[0_24px_64px_rgba(8,145,178,0.2),0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <Image
              src={profile?.avatar}
              alt="Ichko — Full Stack Developer"
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
              priority
            />
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles, MapPin, User } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { LeafSprout, VineDecoration, SwayingPlant } from "./PlantDecorations";
import { useState, useEffect, useRef } from "react";

const roles = [
  "Full Stack Developer",
  "Spring Boot Engineer",
  "Next.js Developer",

];

export function Hero() {
  const { t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    { value: "4+", label: t("statYears") },
    { value: "6+", label: t("statProjects") },
    { value: "100%", label: t("statOwnership") },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={sectionRef}
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

      <motion.div
        style={{ opacity }}
        className="relative mx-auto grid max-w-[1040px] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
      >
        {/* ── Left content ── */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Location badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3.5 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm dark:bg-white/[0.04]"
            >
              <MapPin className="h-3 w-3 text-[var(--teal)]" strokeWidth={2} />
              Ulaanbaatar, Mongolia
              <motion.span
                className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{
                  boxShadow: [
                    "0 0 4px rgba(52,211,153,0.6)",
                    "0 0 12px rgba(52,211,153,1)",
                    "0 0 4px rgba(52,211,153,0.6)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
              Hi, I&apos;m
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[54px]">
              Ichko
              <span className="shimmer-text">.</span>
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: [0, 15, -10, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-4 w-4 flex-shrink-0 text-[var(--teal)] opacity-70" strokeWidth={1.8} />
              </motion.div>
              <span className="font-mono text-base font-semibold text-[var(--ink-soft)] sm:text-lg">
                {displayed}
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--teal)]" />
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants}>
            <p className="max-w-[480px] text-[15.5px] leading-[1.85] text-[var(--muted)]">
              Junior full-stack developer building{" "}
              <span className="font-semibold text-[var(--ink-soft)]">clean interfaces</span> and{" "}
              <span className="font-semibold text-[var(--ink-soft)]">reliable backends</span>.
              I ship practical products with Spring Boot, Next.js, MySQL, and Flutter — focused on
              code that&apos;s readable, maintainable, and actually useful.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                href="#projects"
                whileHover={{ y: -3, scale: 1.04, boxShadow: "0 12px 32px rgba(8,145,178,0.4)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0891b2] via-[#06b6d4] to-[#0891b2] bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-right hover:shadow-cyan-500/40"
                style={{ backgroundSize: "200% auto" }}
              >
                {t("ctaProjects")}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </motion.span>
              </motion.a>
              <motion.a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-6 py-3.5 text-sm font-bold text-[var(--ink-soft)] shadow-sm transition-all hover:border-[var(--teal)] hover:text-[var(--teal)] dark:bg-white/[0.04] dark:hover:bg-[var(--teal-soft)]"
              >
                {t("ctaCv")}
                <Download className="h-4 w-4" strokeWidth={1.8} />
              </motion.a>
              <motion.div
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[var(--teal)]/30 bg-[var(--teal-soft)] px-6 py-3.5 text-sm font-bold text-[var(--teal)] shadow-sm transition-all hover:border-[var(--teal)]/60 hover:shadow-[0_4px_16px_rgba(8,145,178,0.2)]"
                >
                  About me
                  <User className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemVariants}>
            <motion.a
              href="#about"
              className="inline-flex items-center gap-2.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--teal)]"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="scroll-indicator flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] shadow-sm dark:bg-white/[0.04]"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-3.5 w-3.5 text-[var(--teal)]" strokeWidth={2} />
              </motion.span>
              Scroll to explore
            </motion.a>
          </motion.div>

          {/* Vine decoration */}
          <FadeIn delay={0.3}>
            <VineDecoration
              className="mt-1 opacity-50"
              color="rgba(34,197,94,0.4)"
              width={160}
            />
          </FadeIn>
        </motion.div>

        {/* ── Right — image + stats ── */}
        <motion.div
          style={{ y: imageY }}
          className="relative mx-auto w-full max-w-[360px]"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Decorative glow */}
          <motion.div
            className="absolute -inset-4 rounded-full opacity-30 blur-3xl dark:opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(8,145,178,0.4), rgba(124,58,237,0.2) 60%, transparent 80%)",
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* Spinning border accent */}
          <motion.div
            className="absolute -inset-[3px] rounded-full opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(8,145,178,0.6), rgba(124,58,237,0.4), transparent, rgba(8,145,178,0.3))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />

          <motion.div
            whileHover={{ scale: 1.025 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 left-1/2 z-10 w-[108%] max-w-[420px] -translate-x-1/2 rounded-[14px] border border-[var(--line)] bg-[var(--bg-elevated)]/95 px-5 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:bg-[var(--bg-elevated)]/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <div className="grid grid-cols-3 divide-x divide-[var(--line)]">
              {stats?.map((stat, i) => (
                <motion.div
                  key={stat?.label}
                  className="px-3 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.65 + i * 0.12,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  <p className="text-xl font-extrabold gradient-text">{stat?.value}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[var(--muted)]">{stat?.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

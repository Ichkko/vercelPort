"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles, MapPin, User } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
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
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const marqueeItems = [
    "FULL STACK DEV", "NEXT.JS", "SPRING BOOT", "FLUTTER", "MYSQL", "TYPESCRIPT", "REACT", "JAVA",
    "FULL STACK DEV", "NEXT.JS", "SPRING BOOT", "FLUTTER", "MYSQL", "TYPESCRIPT", "REACT", "JAVA",
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative scroll-mt-6 overflow-hidden min-h-screen flex flex-col"
    >
      {/* ── Cinematic background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Grid lines */}
        <div className="cinematic-grid absolute inset-0 opacity-60" />
        
        {/* Large neon orbs */}
        <div
          className="orb-1 absolute -top-32 -right-32 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="orb-2 absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="orb-3 absolute left-1/3 top-1/2 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* Horizontal accent line */}
        <div className="absolute top-[60%] left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.2), rgba(236,72,153,0.15), transparent)" }} />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative flex-1 mx-auto grid max-w-[1040px] w-full items-center gap-10 px-5 py-16 sm:px-6 md:px-10 md:py-24 lg:px-14 lg:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
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
              whileHover={{ scale: 1.03, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(168,85,247,0.25)] bg-[rgba(168,85,247,0.08)] px-3.5 py-1.5 text-[11px] font-semibold text-[var(--muted)] shadow-sm backdrop-blur-sm"
            >
              <MapPin className="h-3 w-3 text-[var(--teal)]" strokeWidth={2} />
              Ulaanbaatar, Mongolia
              <motion.span
                className="ml-0.5 h-1.5 w-1.5 rounded-full bg-[var(--neon)]"
                animate={{
                  boxShadow: [
                    "0 0 4px rgba(168,85,247,0.6)",
                    "0 0 14px rgba(168,85,247,1)",
                    "0 0 4px rgba(168,85,247,0.6)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Name — large cinematic display */}
          <motion.div variants={itemVariants} className="space-y-0">
            <p className="section-eyebrow mb-2">
              Hi, I&apos;m
            </p>
            <h1 className="text-6xl font-extrabold leading-[0.95] tracking-tighter text-[var(--ink)] sm:text-7xl lg:text-[80px]">
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
                <Sparkles className="h-4 w-4 flex-shrink-0 text-[var(--neon)] opacity-80" strokeWidth={1.8} />
              </motion.div>
              <span className="font-mono text-sm font-semibold text-[var(--ink-soft)] sm:text-[17px]">
                {displayed}
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--neon)]" />
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants}>
            <p className="max-w-[480px] text-[14.5px] leading-[1.9] text-[var(--muted)] sm:text-[15px]">
              Junior full-stack developer building{" "}
              <span className="font-semibold text-[var(--ink-soft)]">clean interfaces</span> and{" "}
              <span className="font-semibold text-[var(--ink-soft)]">reliable backends</span>.
              I ship practical products with Spring Boot, Next.js, MySQL, and Flutter — focused on
              code that&apos;s readable, maintainable, and actually useful.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-3 pt-1 xs:flex-row xs:flex-wrap sm:flex-row sm:flex-wrap">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.03, boxShadow: "0 10px 28px rgba(168,85,247,0.4), 0 0 0 1px rgba(168,85,247,0.3)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#7c3aed] bg-[length:200%_auto] px-7 py-3 text-[13px] font-bold text-white shadow-lg shadow-purple-500/25 transition-all"
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
                whileHover={{ y: -2, scale: 1.03, borderColor: "rgba(168,85,247,0.5)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(168,85,247,0.2)] bg-[rgba(168,85,247,0.06)] px-6 py-3 text-[13px] font-bold text-[var(--ink-soft)] shadow-sm transition-all hover:text-[var(--neon)]"
              >
                {t("ctaCv")}
                <Download className="h-4 w-4" strokeWidth={1.8} />
              </motion.a>
              <motion.div
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Link
                  href="/about"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(236,72,153,0.2)] bg-[rgba(236,72,153,0.06)] px-6 py-3 text-[13px] font-bold text-[var(--neon-pink)] shadow-sm transition-all hover:border-[rgba(236,72,153,0.4)] hover:shadow-[0_4px_16px_rgba(236,72,153,0.2)] sm:w-auto"
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
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--muted)] transition hover:text-[var(--neon)]"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="scroll-indicator flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(168,85,247,0.25)] bg-[rgba(168,85,247,0.06)] shadow-sm"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-3.5 w-3.5 text-[var(--neon)]" strokeWidth={2} />
              </motion.span>
              Scroll to explore
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right — image + stats ── */}
        <motion.div
          style={{ y: imageY }}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-[360px]"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Decorative glow */}
          <motion.div
            className="absolute -inset-4 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.5), rgba(236,72,153,0.25) 60%, transparent 80%)",
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.65, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* Spinning border accent */}
          <motion.div
            className="absolute -inset-[3px] rounded-full opacity-50"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(236,72,153,0.5), transparent, rgba(124,58,237,0.4))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />

          <motion.div
            whileHover={{ scale: 1.025 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative overflow-hidden rounded-full shadow-[0_24px_64px_rgba(124,58,237,0.3),0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <Image
              src={profile?.avatar}
              alt="Ichko — Full Stack Developer"
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(124,58,237,0.15)] via-transparent to-transparent" />
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-4 w-full rounded-[14px] border border-[rgba(168,85,247,0.15)] bg-[rgba(10,10,20,0.9)] px-3 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:absolute sm:-bottom-6 sm:left-1/2 sm:mt-0 sm:w-[108%] sm:max-w-[420px] sm:-translate-x-1/2 sm:px-5 sm:py-4"
          >
            <div className="grid grid-cols-3 divide-x divide-[rgba(168,85,247,0.1)]">
              {stats?.map((stat, i) => (
                <motion.div
                  key={stat?.label}
                  className="px-2 text-center sm:px-3"
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
                  <p className="text-lg font-extrabold gradient-text sm:text-xl">{stat?.value}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-[var(--muted)] sm:text-[11px]">{stat?.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Marquee ticker ── */}
      <FadeIn delay={0.6}>
        <div className="relative w-full overflow-hidden border-t border-b border-[rgba(168,85,247,0.12)] bg-[rgba(168,85,247,0.04)] py-3">
          <div className="marquee-track flex whitespace-nowrap">
            {marqueeItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-4">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-[var(--neon)] opacity-60" />
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

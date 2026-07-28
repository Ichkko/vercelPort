"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Code2,
  GitBranch,
  Rocket,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { projectsMeta, profile } from "@/data/portfolio";
import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

/* ─── Slideshow ─── */
interface SlideshowProps {
  images: string[];
  alt: string;
}

function ProjectSlideshow({ images, alt }: SlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = images.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    next();
  }, [next]);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next, total]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${alt} — ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── All unique tags ─── */
const allTags = Array.from(
  new Set(projectsMeta.flatMap((p) => p.tags))
).sort();

/* ─── Page ─── */
export default function PortfolioPage() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = ["All", ...allTags];

  const filtered =
    activeTag === "All"
      ? projectsMeta
      : projectsMeta.filter((p) => p.tags.includes(activeTag));

  const metrics = [
    { value: "20+", label: t("metricProjects"), Icon: Code2 },
    { value: "500+", label: t("metricCommits"), Icon: GitBranch },
    { value: "3+", label: t("metricYears"), Icon: Rocket },
    { value: "100%", label: t("metricResponsibility"), Icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg-panel)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--teal-soft)] hover:text-[var(--teal)]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.8} />
              GitHub
            </a>
            <LanguageToggle compact />
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☾" : "☀"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14">
        {/* Hero heading */}
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
              Portfolio
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
              {t("projectsTitle")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              {t("projectsDesc")}
            </p>
            <div className="mx-auto mt-5 h-[3px] w-10 rounded-full accent-line" />
          </div>
        </FadeIn>

        {/* Metrics strip */}
        <FadeIn delay={0.05}>
          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="stat-card flex flex-col items-center gap-2 px-4 py-5 text-center"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[var(--teal-soft)]">
                  <m.Icon className="h-4 w-4 text-[var(--teal)]" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold gradient-text">{m.value}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[var(--muted)]">{m.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Tag filter */}
        <FadeIn delay={0.08}>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 shrink-0 text-[var(--muted)]" strokeWidth={1.6} />
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTag === tag
                    ? "bg-[var(--teal)] text-white shadow-sm"
                    : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured project — first in filtered list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length > 0 && (
              <>
                {/* Featured card */}
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="glow-card card-soft group mb-6 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-[52%] shrink-0">
                      <ProjectSlideshow
                        images={filtered[0].images ?? [filtered[0].image]}
                        alt={t(filtered[0].titleKey)}
                      />
                      <span className="absolute left-3 top-3 z-20 rounded-full bg-[var(--teal)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                        Featured
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h2 className="text-xl font-extrabold leading-snug tracking-tight text-[var(--ink)]">
                          {t(filtered[0].titleKey)}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                          {t(filtered[0].descKey)}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {filtered[0].tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center gap-4 border-t border-[var(--line)] pt-4">
                        <a
                          href={filtered[0].liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--teal)] px-4 py-2 text-xs font-bold text-white shadow transition hover:opacity-85"
                        >
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                          {t("liveDemo")}
                        </a>
                        <a
                          href={filtered[0].githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-4 py-2 text-xs font-bold text-[var(--muted)] transition hover:border-[var(--teal)]/50 hover:text-[var(--ink)]"
                        >
                          <Github className="h-3.5 w-3.5" strokeWidth={1.8} />
                          {t("github")}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Rest of filtered projects */}
                {filtered.length > 1 && (
                  <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.slice(1).map((project) => (
                      <StaggerItem key={project.id}>
                        <motion.article
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 320, damping: 24 }}
                          className="glow-card card-soft group flex h-full flex-col overflow-hidden"
                        >
                          <ProjectSlideshow
                            images={project.images ?? [project.image]}
                            alt={t(project.titleKey)}
                          />
                          <div className="flex flex-1 flex-col p-5">
                            <h3 className="text-base font-bold leading-snug tracking-tight text-[var(--ink)]">
                              {t(project.titleKey)}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                              {t(project.descKey)}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => (
                                <span key={tag} className="tag-pill">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="mt-auto flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--teal)] transition hover:opacity-75"
                              >
                                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                                {t("liveDemo")}
                              </a>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]"
                              >
                                <Github className="h-3.5 w-3.5" strokeWidth={1.8} />
                                {t("github")}
                              </a>
                            </div>
                          </div>
                        </motion.article>
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-lg font-semibold text-[var(--muted)]">No projects found for &ldquo;{activeTag}&rdquo;</p>
                <button
                  onClick={() => setActiveTag("All")}
                  className="mt-4 rounded-lg bg-[var(--teal-soft)] px-4 py-2 text-sm font-semibold text-[var(--teal)] transition hover:opacity-80"
                >
                  Show all projects
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <FadeIn delay={0.1}>
          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-8 py-10 text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
              Open to work
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--ink)]">
              {t("contactTitle")}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
              {t("contactDesc")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-2.5 text-sm font-bold text-white shadow transition hover:opacity-85"
              >
                {t("contactCta")}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] px-5 py-2.5 text-sm font-bold text-[var(--muted)] transition hover:border-[var(--teal)]/50 hover:text-[var(--ink)]"
              >
                <Github className="h-4 w-4" strokeWidth={1.8} />
                GitHub
              </a>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}

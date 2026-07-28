"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Code2, ExternalLink, GitBranch, Rocket, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsMeta, profile } from "@/data/portfolio";
import { FadeIn, Stagger, StaggerItem } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { useState, useEffect, useCallback, useRef } from "react";

/* ── Animated Counter Hook ── */
function useAnimatedCounter(target: number, duration: number = 1800, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView || hasStarted) return;
    setHasStarted(true);
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [isInView, hasStarted, target, duration]);

  return { count, ref };
}

/* ── Metric Card ── */
interface MetricCardProps {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  delay?: number;
}

function MetricCard({ value, numericValue, suffix, label, Icon: IconComponent, delay = 0 }: MetricCardProps) {
  const { count, ref } = useAnimatedCounter(numericValue, 1600);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      style={{ transitionDelay: `${delay}s` }}
      className="stat-card relative flex flex-col items-center gap-2 overflow-hidden px-4 py-5 text-center"
    >
      {/* Glow pulse on enter */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.35, 0] } : {}}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
        style={{ boxShadow: "inset 0 0 28px 6px var(--teal)" }}
      />
      <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[var(--teal-soft)]">
        <IconComponent className="h-4 w-4 text-[var(--teal)]" strokeWidth={1.6} />
      </div>
      <div>
        <p className="text-2xl font-extrabold gradient-text tabular-nums">
          {count}{suffix}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-[var(--muted)]">{label}</p>
      </div>
    </motion.div>
  );
}

/* ── Slideshow image component ── */
interface SlideshowProps {
  images: string[];
  alt: string;
  aspectClass?: string;
}

function ProjectSlideshow({ images, alt, aspectClass = "aspect-[16/9]" }: SlideshowProps) {
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

  // Auto-cycle every 3 seconds
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next, total]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className={`relative overflow-hidden ${aspectClass} w-full`}>
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

      {/* Prev / Next arrows — only show if multiple images */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();

  const metrics = [
    { value: "20+", numericValue: 20, suffix: "+", label: t("metricProjects"), Icon: Code2 },
    { value: "500+", numericValue: 500, suffix: "+", label: t("metricCommits"), Icon: GitBranch },
    { value: "3+", numericValue: 3, suffix: "+", label: t("metricYears"), Icon: Rocket },
    { value: "100%", numericValue: 100, suffix: "%", label: t("metricResponsibility"), Icon: ShieldCheck },
  ];

  const featured = projectsMeta?.[0];
  const rest = projectsMeta?.slice(1);

  return (
    <section id="projects" className="scroll-mt-8">
      <FadeIn>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
              Portfolio
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--ink)]">
              {t("projectsTitle")}
            </h2>
            <div className="mt-3 h-[3px] w-10 rounded-full accent-line" />
          </div>
          <motion.a
            href={profile?.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)] transition hover:opacity-80"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"/></svg>
            {t("viewAll")}
          </motion.a>
        </div>
      </FadeIn>

      {/* Featured project — full-width card */}
      {featured && (
        <FadeIn delay={0.05}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="glow-card card-soft group mb-6 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Slideshow */}
              <div className="relative md:w-[52%] shrink-0">
                <ProjectSlideshow
                  images={featured.images ?? [featured.image]}
                  alt={t(featured.titleKey)}
                  aspectClass="aspect-[16/9]"
                />
                {/* Featured badge */}
                <span className="absolute left-3 top-3 z-20 rounded-full bg-[var(--teal)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-extrabold leading-snug tracking-tight text-[var(--ink)]">
                    {t(featured?.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {t(featured?.descKey)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {featured?.tags?.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4 border-t border-[var(--line)] pt-4">
                  <a
                    href={featured?.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--teal)] px-4 py-2 text-xs font-bold text-white shadow transition hover:opacity-85"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    {t("liveDemo")}
                  </a>
                  <a
                    href={featured?.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-4 py-2 text-xs font-bold text-[var(--muted)] transition hover:border-[var(--teal)]/50 hover:text-[var(--ink)]"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"/></svg>
                    {t("github")}
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </FadeIn>
      )}

      {/* Remaining projects grid */}
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest?.map((project) => (
          <StaggerItem key={project?.id}>
            <motion.article
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="glow-card card-soft group flex h-full flex-col overflow-hidden"
            >
              {/* Slideshow */}
              <ProjectSlideshow
                images={project.images ?? [project.image]}
                alt={t(project.titleKey)}
                aspectClass="aspect-[16/9]"
              />

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold leading-snug tracking-tight text-[var(--ink)]">
                  {t(project?.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {t(project?.descKey)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project?.tags?.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
                  <a
                    href={project?.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--teal)] transition hover:opacity-75"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    {t("liveDemo")}
                  </a>
                  <a
                    href={project?.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"/></svg>
                    {t("github")}
                  </a>
                </div>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Metrics */}
      <FadeIn delay={0.1}>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics?.map((metric, index) => (
            <MetricCard
              key={metric?.label}
              value={metric?.value}
              numericValue={metric?.numericValue}
              suffix={metric?.suffix}
              label={metric?.label}
              Icon={metric?.Icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

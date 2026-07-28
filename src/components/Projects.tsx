"use client";

import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, GitBranch, Rocket, ShieldCheck, Code2 } from "lucide-react";
import { projectsMeta, profile } from "@/data/portfolio";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { type TranslationKey } from "@/data/i18n";
import { useState, useRef, useCallback, useEffect } from "react";

/* ── Magnetic zoom image on hover ── */
interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

function ZoomImage({ src, alt, className = "", sizes }: ZoomImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const transformX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 30 });
  const transformY = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), { stiffness: 200, damping: 30 });
  const scale = useSpring(hovered ? 1.12 : 1, { stiffness: 260, damping: 28 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseX.set(0.5); mouseY.set(0.5); }}
      data-cursor-image
    >
      <motion.div
        className="relative h-full w-full"
        style={{ scale, x: transformX, y: transformY }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        />
      </motion.div>
    </div>
  );
}

/* ── Slideshow with zoom ── */
interface SlideshowProps {
  images: string[];
  alt: string;
  aspectClass?: string;
}

function ProjectSlideshow({ images, alt, aspectClass = "aspect-[16/9]" }: SlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = images.length;

  const next = useCallback(() => { setDirection(1); setCurrent((c) => (c + 1) % total); }, [total]);
  const prev = useCallback((e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setDirection(-1); setCurrent((c) => (c - 1 + total) % total); }, [total]);
  const handleNext = useCallback((e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); next(); }, [next]);

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
    <div className={`relative ${aspectClass} w-full overflow-hidden`} data-cursor-image>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <ZoomImage src={images[current]} alt={`${alt} — ${current + 1}`} className="absolute inset-0 h-full w-full" />
        </motion.div>
      </AnimatePresence>

      {total > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white backdrop-blur-sm transition hover:bg-black/60" aria-label="Previous">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={handleNext} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white backdrop-blur-sm transition hover:bg-black/60" aria-label="Next">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Fold Card — unfolds open on hover like a physical card ── */
interface FoldCardProps {
  project: typeof projectsMeta[number];
  idx: number;
  t: (key: TranslationKey) => string;
}

function FoldCard({ project, idx, t }: FoldCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] cursor-pointer"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? "open" : "closed"}
      initial="closed"
      variants={{
        closed: {
          rotateX: 8,
          scaleX: 0.94,
          y: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        },
        open: {
          rotateX: 0,
          scaleX: 1,
          y: -6,
          boxShadow: "0 28px 56px rgba(0,0,0,0.18)",
        },
      }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      {/* Issue number watermark */}
      <span className="pointer-events-none absolute right-3 top-2 z-10 font-mono text-[48px] font-black leading-none text-[var(--ink)] opacity-[0.05] select-none">
        {String(idx + 2).padStart(2, "0")}
      </span>

      {/* ── Top fold — image section that peels back ── */}
      <motion.div
        className="relative origin-top overflow-hidden"
        animate={hovered ? "open" : "closed"}
        variants={{
          closed: {
            height: "80px",
            rotateX: -18,
          },
          open: {
            height: "180px",
            rotateX: 0,
          },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
      >
        {/* Fold crease line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 h-[2px]"
          animate={hovered ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.15) 80%, transparent)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        />
        {/* Fold shadow overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={hovered ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div className="relative h-full w-full" data-cursor-image>
          <Image
            src={(project.images ?? [project.image])[0]}
            alt={t(project.titleKey)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </motion.div>

      {/* ── Bottom fold — content section that unfolds down ── */}
      <motion.div
        className="flex flex-1 flex-col origin-top overflow-hidden"
        animate={hovered ? "open" : "closed"}
        variants={{
          closed: {
            height: "72px",
            rotateX: 12,
            opacity: 0.7,
          },
          open: {
            height: "auto",
            rotateX: 0,
            opacity: 1,
          },
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.04 }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-1 flex-col p-5">
          {/* Category */}
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-4 bg-[var(--teal)] opacity-60" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">
              {project?.tags?.[0] ?? "Project"}
            </span>
          </div>

          <h3 className="text-base font-extrabold leading-snug tracking-tight text-[var(--ink)]">
            {t(project?.titleKey)}
          </h3>

          {/* Description — only visible when unfolded */}
          <motion.div
            animate={hovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, delay: hovered ? 0.1 : 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
              {t(project?.descKey)}
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project?.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="border border-[var(--line)] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4"
            animate={hovered ? { opacity: 1, marginTop: "auto" } : { opacity: 0.5, marginTop: "8px" }}
            transition={{ duration: 0.2 }}
          >
            <a href={project?.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--teal)] transition hover:opacity-70">
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              {t("liveDemo")}
            </a>
            <a href={project?.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"/></svg>
              {t("github")}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const { t } = useLanguage();

  const metrics = [
    { value: "6+", label: t("metricProjects"), Icon: Code2 },
    { value: "500+", label: t("metricCommits"), Icon: GitBranch },
    { value: "4+", label: t("metricYears"), Icon: Rocket },
    { value: "100%", label: t("metricResponsibility"), Icon: ShieldCheck },
  ];

  const featured = projectsMeta?.[0];
  const rest = projectsMeta?.slice(1);

  return (
    <section id="projects" className="scroll-mt-8">

      {/* ── Magazine masthead ── */}
      <FadeIn>
        <div className="mb-10 border-b border-[var(--line)] pb-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--teal)] opacity-70">Vol. I</span>
                <span className="h-px w-8 bg-[var(--teal)] opacity-40" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)] opacity-60">Portfolio</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] leading-none sm:text-5xl">
                {t("projectsTitle")}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)] max-w-sm">
                {"Selected works & case studies"}
              </p>
            </div>
            <motion.a
              href={profile?.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--teal)] transition hover:opacity-70"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"/></svg>
              {t("viewAll")}
            </motion.a>
          </div>
        </div>
      </FadeIn>

      {/* ── Featured — editorial spread ── */}
      {featured && (
        <FadeIn delay={0.05}>
          <motion.article
            className="group relative mb-12 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)]"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {/* Issue number watermark */}
            <span className="pointer-events-none absolute right-4 top-4 z-10 font-mono text-[80px] font-black leading-none text-[var(--ink)] opacity-[0.04] select-none">01</span>

            <div className="flex flex-col lg:flex-row">
              {/* Image — takes 55% width on desktop */}
              <div className="relative lg:w-[55%] shrink-0">
                <ProjectSlideshow
                  images={featured.images ?? [featured.image]}
                  alt={t(featured.titleKey)}
                  aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full"
                />
                {/* Featured ribbon */}
                <div className="absolute left-0 top-6 z-20">
                  <div className="bg-[var(--teal)] px-4 py-1.5 pr-6 shadow-lg" style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}>
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white">Featured</span>
                  </div>
                </div>
              </div>

              {/* Content — editorial typography */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  {/* Category line */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-px w-6 bg-[var(--teal)]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">
                      {featured?.tags?.[0] ?? "Project"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
                    {t(featured?.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {t(featured?.descKey)}
                  </p>

                  {/* Tags as editorial pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured?.tags?.map((tag) => (
                      <span key={tag} className="rounded-none border border-[var(--line)] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-4 border-t border-[var(--line)] pt-6">
                  <a href={featured?.liveUrl} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-2 bg-[var(--ink)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[var(--bg)] transition hover:bg-[var(--teal)]">
                    <ExternalLink className="h-3.5 w-3.5 transition group-hover/btn:rotate-12" strokeWidth={2} />
                    {t("liveDemo")}
                  </a>
                  <a href={featured?.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--line)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition hover:border-[var(--teal)]/50 hover:text-[var(--ink)]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"/></svg>
                    {t("github")}
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </FadeIn>
      )}

      {/* ── Rest — folding card grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest?.map((project, idx) => (
          <FadeIn key={project?.id} delay={idx * 0.06}>
            <FoldCard project={project} idx={idx} t={t} />
          </FadeIn>
        ))}
      </div>

      {/* ── Metrics — editorial strip ── */}
      <FadeIn delay={0.1}>
        <div className="mt-12 grid grid-cols-2 gap-px border border-[var(--line)] sm:grid-cols-4">
          {metrics?.map((metric) => (
            <motion.div
              key={metric?.label}
              whileHover={{ backgroundColor: "var(--teal-soft)" }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2 bg-[var(--bg-elevated)] px-4 py-6 text-center transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--teal-soft)]">
                <metric.Icon className="h-4 w-4 text-[var(--teal)]" strokeWidth={1.6} />
              </div>
              <p className="text-2xl font-black tracking-tight text-[var(--ink)]">{metric?.value}</p>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">{metric?.label}</p>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

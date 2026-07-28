"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface ArtPiece {
  id: number;
  src: string;
  alt: string;
  titleEn: string;
  titleMn: string;
  mediumEn: string;
  mediumMn: string;
  span?: "wide" | "tall" | "normal";
}

const artworks: ArtPiece[] = [
  { id: 1, src: "/assets/images/2c14c3a6-98ee-4bc1-87ec-15df1a338ebe-1785254739320.jpg", alt: "Handmade clay sculpture artwork by Ichko", titleEn: "Clay Sculpture", titleMn: "Шавар баримал", mediumEn: "Clay · Handmade", mediumMn: "Шавар · Гараар", span: "wide" },
  { id: 2, src: "/assets/images/4b268892-82e4-43ea-91c6-5162d9c65e95-1785254751921.jpg", alt: "Handcrafted fabric art piece by Ichko", titleEn: "Fabric Art", titleMn: "Даавуун урлал", mediumEn: "Fabric · Textile", mediumMn: "Даавуу · Нэхмэл", span: "tall" },
  { id: 3, src: "/assets/images/ae8e4a74-9975-4ea3-be2c-67f1ef341d62-1785254772484.jpg", alt: "Handmade painting artwork by Ichko", titleEn: "Painting", titleMn: "Зураг", mediumEn: "Acrylic · Canvas", mediumMn: "Акрил · Даавуу", span: "normal" },
  { id: 4, src: "/assets/images/72b335ee-74e2-4a02-abd4-cd089cbb258c-1785254782913.jpg", alt: "Handcrafted decorative art by Ichko", titleEn: "Decorative Craft", titleMn: "Чимэглэлийн урлал", mediumEn: "Mixed Media", mediumMn: "Холимог материал", span: "normal" },
  { id: 5, src: "/assets/images/87a7c6db-e01c-4527-b974-cb911864f7aa-1785254797293.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "Handmade Creation", titleMn: "Гараар хийсэн бүтээл", mediumEn: "Handcrafted", mediumMn: "Гар урлал", span: "wide" },
];

/* ── Magnetic zoom art card ── */
interface ArtCardProps {
  piece: ArtPiece;
  lang: string;
  onClick: () => void;
  className?: string;
  index: number;
}

function ArtCard({ piece, lang, onClick, className = "", index }: ArtCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const imgX = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 160, damping: 26 });
  const imgY = useSpring(useTransform(mouseY, [0, 1], [-12, 12]), { stiffness: 160, damping: 26 });
  const imgScale = useSpring(hovered ? 1.14 : 1, { stiffness: 220, damping: 24 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseX.set(0.5); mouseY.set(0.5); }}
      onClick={onClick}
      data-cursor-image
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={piece.src}
          alt={piece.alt}
          className="h-full w-full object-cover"
          style={{ scale: imgScale, x: imgX, y: imgY }}
          loading="lazy"
        />
      </div>

      {/* Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
        initial={{ opacity: 0.25 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Issue number watermark */}
      <span className="pointer-events-none absolute right-2 top-1 font-mono text-[40px] font-black leading-none text-white opacity-[0.06] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Bottom info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ y: 14, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-px w-4 bg-[var(--teal)]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">
            {lang === "mn" ? piece.mediumMn : piece.mediumEn}
          </span>
        </div>
        <p className="text-sm font-bold text-white leading-snug">
          {lang === "mn" ? piece.titleMn : piece.titleEn}
        </p>
      </motion.div>

      {/* Expand icon */}
      <motion.div
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.7 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function HandcraftedArt() {
  const { lang } = useLanguage();
  const [lightbox, setLightbox] = useState<ArtPiece | null>(null);

  return (
    <section className="w-full">
      {/* ── Magazine header ── */}
      <div className="mb-10 border-b border-[var(--line)] pb-6">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--teal)] opacity-70">
            {lang === "mn" ? "Гар урлал" : "Handcrafted Art"}
          </span>
          <span className="h-px w-8 bg-[var(--teal)] opacity-40" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)] opacity-60">
            {lang === "mn" ? "Бүтээлүүд" : "Works"}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl"
        >
          {lang === "mn" ? "Миний гараар хийсэн бүтээлүүд" : "Things I Made With My Hands"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 max-w-xl text-sm text-[var(--muted)]"
        >
          {lang === "mn" ? "Шавар баримал, зураг, даавуун урлал — кодоос гадна бүтээх дуртай зүйлс минь." : "Clay sculptures, paintings, fabric art — creative work I make outside of code."}
        </motion.p>
      </div>

      {/* ── Asymmetric bento grid ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" style={{ gridAutoRows: "200px" }}>
        {/* Item 1 — wide (col-span-2) */}
        <ArtCard
          piece={artworks[0]}
          lang={lang}
          onClick={() => setLightbox(artworks[0])}
          className="col-span-2 sm:col-span-2"
          index={0}
        />

        {/* Item 2 — tall (row-span-2) */}
        <ArtCard
          piece={artworks[1]}
          lang={lang}
          onClick={() => setLightbox(artworks[1])}
          className="col-span-2 sm:col-span-2 sm:row-span-2"
          index={1}
        />

        {/* Items 3 & 4 — normal */}
        <ArtCard
          piece={artworks[2]}
          lang={lang}
          onClick={() => setLightbox(artworks[2])}
          className="col-span-1 sm:col-span-1"
          index={2}
        />
        <ArtCard
          piece={artworks[3]}
          lang={lang}
          onClick={() => setLightbox(artworks[3])}
          className="col-span-1 sm:col-span-1"
          index={3}
        />

        {/* Item 5 — full width */}
        <ArtCard
          piece={artworks[4]}
          lang={lang}
          onClick={() => setLightbox(artworks[4])}
          className="col-span-2 sm:col-span-4"
          index={4}
        />
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/92 p-4 backdrop-blur-lg"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, filter: "blur(16px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.82, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.src} alt={lightbox.alt} className="max-h-[88vh] max-w-[92vw] object-contain" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-5 pt-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.38 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-px w-4 bg-[var(--teal)]" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">
                    {lang === "mn" ? lightbox.mediumMn : lightbox.mediumEn}
                  </span>
                </div>
                <p className="text-base font-bold text-white">{lang === "mn" ? lightbox.titleMn : lightbox.titleEn}</p>
              </motion.div>
              <motion.button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
                aria-label="Close"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

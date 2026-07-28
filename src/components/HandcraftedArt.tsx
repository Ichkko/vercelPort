"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  {
    id: 1,
    src: "/assets/images/2c14c3a6-98ee-4bc1-87ec-15df1a338ebe-1785254739320.jpg",
    alt: "Handmade clay sculpture artwork by Ichko",
    titleEn: "Clay Sculpture",
    titleMn: "Шавар баримал",
    mediumEn: "Clay · Handmade",
    mediumMn: "Шавар · Гараар",
    span: "wide",
  },
  {
    id: 2,
    src: "/assets/images/4b268892-82e4-43ea-91c6-5162d9c65e95-1785254751921.jpg",
    alt: "Handcrafted fabric art piece by Ichko",
    titleEn: "Fabric Art",
    titleMn: "Даавуун урлал",
    mediumEn: "Fabric · Textile",
    mediumMn: "Даавуу · Нэхмэл",
    span: "tall",
  },
  {
    id: 3,
    src: "/assets/images/ae8e4a74-9975-4ea3-be2c-67f1ef341d62-1785254772484.jpg",
    alt: "Handmade painting artwork by Ichko",
    titleEn: "Painting",
    titleMn: "Зураг",
    mediumEn: "Acrylic · Canvas",
    mediumMn: "Акрил · Даавуу",
    span: "normal",
  },
  {
    id: 4,
    src: "/assets/images/72b335ee-74e2-4a02-abd4-cd089cbb258c-1785254782913.jpg",
    alt: "Handcrafted decorative art by Ichko",
    titleEn: "Decorative Craft",
    titleMn: "Чимэглэлийн урлал",
    mediumEn: "Mixed Media",
    mediumMn: "Холимог материал",
    span: "normal",
  },
  {
    id: 5,
    src: "/assets/images/87a7c6db-e01c-4527-b974-cb911864f7aa-1785254797293.jpg",
    alt: "Personal handmade artwork by Ichko",
    titleEn: "Handmade Creation",
    titleMn: "Гараар хийсэн бүтээл",
    mediumEn: "Handcrafted",
    mediumMn: "Гар урлал",
    span: "wide",
  },
];

export function HandcraftedArt() {
  const { lang } = useLanguage();
  const [lightbox, setLightbox] = useState<ArtPiece | null>(null);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-10">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--teal)]"
        >
          {lang === "mn" ? "Гар урлал" : "Handcrafted Art"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-2xl font-bold text-[var(--ink)] md:text-3xl"
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
          {lang === "mn" ?"Шавар баримал, зураг, даавуун урлал — кодоос гадна бүтээх дуртай зүйлс минь." :"Clay sculptures, paintings, fabric art — creative work I make outside of code."}
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 grid-rows-[auto] gap-3 sm:grid-cols-4 sm:gap-4">
        {/* Row 1: wide card (col-span-2) + tall card (row-span-2) */}
        {/* Item 1 — wide */}
        <ArtCard
          piece={artworks[0]}
          lang={lang}
          onClick={() => setLightbox(artworks[0])}
          className="col-span-2 sm:col-span-2"
          aspectClass="aspect-[16/9]"
          index={0}
        />

        {/* Item 2 — tall (spans 2 rows on sm+) */}
        <ArtCard
          piece={artworks[1]}
          lang={lang}
          onClick={() => setLightbox(artworks[1])}
          className="col-span-2 sm:col-span-2 sm:row-span-2"
          aspectClass="aspect-square sm:aspect-auto sm:h-full"
          index={1}
          tall
        />

        {/* Row 2 under wide: two normal cards */}
        <ArtCard
          piece={artworks[2]}
          lang={lang}
          onClick={() => setLightbox(artworks[2])}
          className="col-span-1 sm:col-span-1"
          aspectClass="aspect-square"
          index={2}
        />
        <ArtCard
          piece={artworks[3]}
          lang={lang}
          onClick={() => setLightbox(artworks[3])}
          className="col-span-1 sm:col-span-1"
          aspectClass="aspect-square"
          index={3}
        />

        {/* Row 3: full-width wide card */}
        <ArtCard
          piece={artworks[4]}
          lang={lang}
          onClick={() => setLightbox(artworks[4])}
          className="col-span-2 sm:col-span-4"
          aspectClass="aspect-[21/7]"
          index={4}
        />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
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
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[88vh] max-w-[92vw] object-contain"
              />
              {/* Bottom info bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-5 pt-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.38 }}
              >
                <p className="text-base font-bold text-white">
                  {lang === "mn" ? lightbox.titleMn : lightbox.titleEn}
                </p>
                <p className="mt-0.5 text-xs text-white/60">
                  {lang === "mn" ? lightbox.mediumMn : lightbox.mediumEn}
                </p>
              </motion.div>
              {/* Close */}
              <motion.button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
                aria-label="Close"
                whileHover={{ scale: 1.12, backgroundColor: "rgba(0,0,0,0.85)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Art Card ── */
interface ArtCardProps {
  piece: ArtPiece;
  lang: string;
  onClick: () => void;
  className?: string;
  aspectClass?: string;
  index: number;
  tall?: boolean;
}

function ArtCard({ piece, lang, onClick, className = "", aspectClass = "aspect-square", index, tall }: ArtCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      whileHover={{ scale: 1.02, zIndex: 20 }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] ${className} ${tall ? "min-h-[280px]" : ""}`}
      data-cursor-hover
    >
      <div className={`relative w-full ${tall ? "h-full min-h-[280px]" : aspectClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={piece.src}
          alt={piece.alt}
          className={`${tall ? "absolute inset-0 h-full w-full" : "h-full w-full"} object-cover transition-transform duration-700 group-hover:scale-108`}
          style={{ transform: "scale(1)" }}
          loading="lazy"
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.28 }}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.28, delay: 0.05 }}
          >
            <p className="text-sm font-bold text-white drop-shadow">
              {lang === "mn" ? piece.titleMn : piece.titleEn}
            </p>
            <p className="mt-0.5 text-[11px] text-white/70">
              {lang === "mn" ? piece.mediumMn : piece.mediumEn}
            </p>
          </motion.div>
        </motion.div>

        {/* Always-visible subtle badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
            {lang === "mn" ? piece.mediumMn : piece.mediumEn}
          </span>
        </div>

        {/* Zoom icon */}
        <motion.div
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

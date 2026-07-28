"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "drawing" | "craft" | "photo";
  labelEn: string;
  labelMn: string;
  span?: "wide" | "tall" | "normal";
}

const galleryItems: GalleryItem[] = [
  { id: 1, src: "/assets/images/b6bffd14-e8d3-48a2-8f7a-19700eb0152c-1785172311996.jpg", alt: "Portrait photo of Ichko", category: "photo", labelEn: "Portrait", labelMn: "Хөрөг", span: "tall" },
  { id: 2, src: "/assets/images/c0ac7376-d408-4ad6-bbb6-3a601a9b6e76-1785171429507.jpg", alt: "Personal photo of Ichko outdoors", category: "photo", labelEn: "Outdoors", labelMn: "Гадаа", span: "normal" },
  { id: 3, src: "/pro.jpg", alt: "Professional photo of Ichko", category: "photo", labelEn: "Professional", labelMn: "Мэргэжлийн", span: "normal" },
  { id: 4, src: "/assets/images/03b1f65f-a430-4d79-a3bd-d4cc83297d7e-1785171826292.jpg", alt: "Artwork or creative work by Ichko", category: "drawing", labelEn: "Artwork", labelMn: "Бүтээл", span: "wide" },
  { id: 5, src: "/assets/images/411397da-05c0-491e-b154-d17e0c0dbc23-1785171330984.jpg", alt: "Hero illustration of Ichko", category: "drawing", labelEn: "Illustration", labelMn: "Зураг", span: "normal" },
  { id: 6, src: "/assets/images/ichkkkko-1785171948972.jpg", alt: "Creative photo of Ichko in nature", category: "photo", labelEn: "Nature", labelMn: "Байгаль", span: "normal" },
];

const CATEGORY_LABELS = {
  all: { en: "All", mn: "Бүгд" },
  drawing: { en: "Drawings", mn: "Зурагнууд" },
  craft: { en: "Crafts", mn: "Гар урлал" },
  photo: { en: "Photos", mn: "Зурагнууд" },
};

type Category = "all" | "drawing" | "craft" | "photo";

/* ── Magnetic zoom card ── */
function MagneticCard({ item, lang, onClick, index }: { item: GalleryItem; lang: string; onClick: () => void; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const imgScale = useSpring(hovered ? 1.15 : 1, { stiffness: 240, damping: 26 });

  const isTall = item.span === "tall";
  const isWide = item.span === "wide";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] ${isTall ? "row-span-2" : ""} ${isWide ? "col-span-2" : ""}`}
      style={{ aspectRatio: isTall ? undefined : isWide ? "2/1" : "1/1", minHeight: isTall ? "360px" : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      data-cursor-image
    >
      {/* Image with zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover"
          style={{ scale: imgScale }}
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        initial={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Issue number watermark */}
      <span className="pointer-events-none absolute right-2 top-1 font-mono text-[40px] font-black leading-none text-white opacity-[0.06] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Bottom label */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ y: 12, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="h-px w-4 bg-[var(--teal)]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">
            {item.category === "drawing" ? (lang === "mn" ? "Зураг" : "Drawing") : item.category === "craft" ? (lang === "mn" ? "Гар урлал" : "Craft") : (lang === "mn" ? "Гэрэл зураг" : "Photo")}
          </span>
        </div>
        <p className="text-sm font-bold text-white">
          {lang === "mn" ? item.labelMn : item.labelEn}
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

export function Gallery() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="w-full">
      {/* ── Magazine header ── */}
      <div className="mb-8 border-b border-[var(--line)] pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--teal)] opacity-70">Gallery</span>
          <span className="h-px w-8 bg-[var(--teal)] opacity-40" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)] opacity-60">
            {lang === "mn" ? "Бүтээлүүд" : "Works"}
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
          {lang === "mn" ? "Миний бүтээлүүд" : "My Creative Works"}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {lang === "mn" ? "Зураг, гар урлал, гэрэл зургийн цуглуулга" : "A collection of drawings, handmade crafts, and photography"}
        </p>
      </div>

      {/* ── Filter tabs — editorial style ── */}
      <div className="mb-6 flex flex-wrap gap-0 border-b border-[var(--line)]">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
              activeCategory === cat ? "text-[var(--teal)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {CATEGORY_LABELS[cat][lang === "mn" ? "mn" : "en"]}
            {activeCategory === cat && (
              <motion.span layoutId="gallery-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--teal)]" />
            )}
          </button>
        ))}
      </div>

      {/* ── Asymmetric bento grid ── */}
      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <MagneticCard
              key={item.id}
              item={item}
              lang={lang}
              onClick={() => setLightbox(item)}
              index={idx}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, filter: "blur(16px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.src} alt={lightbox.alt} className="max-h-[88vh] max-w-[92vw] object-contain" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-px w-4 bg-[var(--teal)]" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--teal)]">
                    {lightbox.category}
                  </span>
                </div>
                <p className="text-base font-bold text-white">{lang === "mn" ? lightbox.labelMn : lightbox.labelEn}</p>
              </motion.div>
              <motion.button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
                aria-label="Close"
                whileHover={{ scale: 1.1 }}
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

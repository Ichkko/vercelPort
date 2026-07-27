"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "drawing" | "craft" | "photo";
  labelEn: string;
  labelMn: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/assets/images/b6bffd14-e8d3-48a2-8f7a-19700eb0152c-1785172311996.jpg",
    alt: "Portrait photo of Ichko",
    category: "photo",
    labelEn: "Portrait",
    labelMn: "Хөрөг",
  },
  {
    id: 2,
    src: "/assets/images/c0ac7376-d408-4ad6-bbb6-3a601a9b6e76-1785171429507.jpg",
    alt: "Personal photo of Ichko outdoors",
    category: "photo",
    labelEn: "Outdoors",
    labelMn: "Гадаа",
  },
  {
    id: 3,
    src: "/pro.jpg",
    alt: "Professional photo of Ichko",
    category: "photo",
    labelEn: "Professional",
    labelMn: "Мэргэжлийн",
  },
  {
    id: 4,
    src: "/assets/images/03b1f65f-a430-4d79-a3bd-d4cc83297d7e-1785171826292.jpg",
    alt: "Artwork or creative work by Ichko",
    category: "drawing",
    labelEn: "Artwork",
    labelMn: "Бүтээл",
  },
  {
    id: 5,
    src: "/assets/images/411397da-05c0-491e-b154-d17e0c0dbc23-1785171330984.jpg",
    alt: "Hero illustration of Ichko",
    category: "drawing",
    labelEn: "Illustration",
    labelMn: "Зураг",
  },
  {
    id: 6,
    src: "/assets/images/ichkkkko-1785171948972.jpg",
    alt: "Creative photo of Ichko in nature",
    category: "photo",
    labelEn: "Nature",
    labelMn: "Байгаль",
  },
];

const CATEGORY_LABELS = {
  all: { en: "All", mn: "Бүгд" },
  drawing: { en: "Drawings", mn: "Зурагнууд" },
  craft: { en: "Crafts", mn: "Гар урлал" },
  photo: { en: "Photos", mn: "Зурагнууд" },
};

type Category = "all" | "drawing" | "craft" | "photo";

export function Gallery() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--teal)]">
          {lang === "mn" ? "Галерей" : "Gallery"}
        </p>
        <h2 className="text-2xl font-bold text-[var(--ink)] md:text-3xl">
          {lang === "mn" ? "Миний бүтээлүүд" : "My Creative Works"}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {lang === "mn" ?"Зураг, гар урлал, гэрэл зургийн цуглуулга" :"A collection of drawings, handmade crafts, and photography"}
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "border-[var(--teal)] bg-[var(--teal)] text-white"
                : "border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--muted)] hover:border-[var(--teal)]/50 hover:text-[var(--ink)]"
            }`}
          >
            {CATEGORY_LABELS[cat][lang === "mn" ? "mn" : "en"]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)]"
              style={{ aspectRatio: "1 / 1" }}
              onClick={() => setLightbox(item)}
              data-cursor-hover
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-3">
                  <span className="rounded-full bg-[var(--teal)]/90 px-2.5 py-1 text-[10px] font-semibold text-white">
                    {item.category === "drawing"
                      ? lang === "mn" ? "Зураг" : "Drawing"
                      : item.category === "craft"
                      ? lang === "mn" ? "Гар урлал" : "Craft"
                      : lang === "mn" ? "Гэрэл зураг" : "Photo"}
                  </span>
                </div>
              </div>

              {/* Zoom icon */}
              <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
              {/* Close button */}
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                aria-label="Close"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-semibold text-white">
                  {lang === "mn" ? lightbox.labelMn : lightbox.labelEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

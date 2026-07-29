"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
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
}

const artworks: ArtPiece[] = [
  { id: 1, src: "/assets/images/zurag8.jpg", alt: "Handmade clay sculpture artwork by Ichko", titleEn: "I drew it many years ago.", titleMn: "Зурдаг байсымаа", mediumEn: "Painting", mediumMn: "Зурсан зураг" },
  { id: 2, src: "/assets/images/4b268892-82e4-43ea-91c6-5162d9c65e95-1785254751921.jpg", alt: "Handcrafted fabric art piece by Ichko", titleEn: "Mongolian woman", titleMn: "Монгол эмэгтэй", mediumEn: "Acrylic · Canvas", mediumMn: "Акрил" },
  { id: 3, src: "/assets/images/zu1.jpg", alt: "Handmade painting artwork by Ichko", titleEn: "Painting", titleMn: "Хөөрхөн ёстойй хөөрхөн", mediumEn: "Clay art", mediumMn: "Шавар урлал" },
  { id: 4, src: "/assets/images/z6.jpg", alt: "Handcrafted decorative art by Ichko", titleEn: "A star that radiates happiness", titleMn: "Аз жаргал цацруулдаг од", mediumEn: "Clay art", mediumMn: "Шавар урлал" },
  { id: 5, src: "/assets/images/87a7c6db-e01c-4527-b974-cb911864f7aa-1785254797293.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "Little mushroom", titleMn: "Бяцхан мөөг", mediumEn: "Clay art", mediumMn: "Шавар урлал" },
  { id: 6, src: "/assets/images/z1.jpg", alt: "Handmade painting artwork by Ichko", titleEn: "Starfish", titleMn: "Далайн од", mediumEn: "Mixed Media", mediumMn: "Холимог материал" },
  { id: 7, src: "/assets/images/z2.jpg", alt: "Handcrafted decorative art by Ichko", titleEn: "The first cake ever madet", titleMn: "Хамгийн анхны хийсэн торт", mediumEn: "Dessert", mediumMn: "Амттан" },
  { id: 8, src: "/assets/images/zurag10.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "I drew it many years ago.", titleMn: "Олоон жилийн өмнө зурж билээ", mediumEn: "Painting", mediumMn: "Зурсан зураг" },
  { id: 9, src: "/assets/images/2c14c3a6-98ee-4bc1-87ec-15df1a338ebe-1785254739320.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "When there was a lot", titleMn: "Олуулаа байхдаа", mediumEn: "Clay art", mediumMn: "Шавар урлал" },
  { id: 10, src: "/assets/images/ae8e4a74-9975-4ea3-be2c-67f1ef341d62-1785254772484.jpg", alt: "Handmade painting artwork by Ichko", titleEn: "First time experiment, of course it's cute", titleMn: "Анх удаагийн туршилт мэдээж хөөрхөн", mediumEn: "Fabric paint & Sewing", mediumMn: "Даавууны зураг & оёдол" },
  { id: 11, src: "/assets/images/zurag7.jpg", alt: "Handcrafted decorative art by Ichko", titleEn: "I drew it many years ago.", titleMn: "Бүр царайлаг болгочихсон байгаа биз хх", mediumEn: "Painting", mediumMn: "Зурсан зураг" },
  { id: 12, src: "/assets/images/zurag6.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "crown made of seashells", titleMn: "Хясаагаар хийсэн титэм", mediumEn: "Handcrafted", mediumMn: "Гар урлал" },
  { id: 13, src: "/assets/images/zurag9.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "I drew it many years ago.", titleMn: "Бас л олон жилийн өмнө аруун жилдээ зурж байсан", mediumEn: "Painting", mediumMn: "Зурсан зураг" },
   { id: 14, src: "/assets/images/zurag11.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "My first self-sewn creation", titleMn: "Миний анхны өөрөө оёсон бүтээл", mediumEn: "Sewing", mediumMn: "Оёдол" },
  { id: 15, src: "/assets/images/z3.jpg", alt: "Personal handmade artwork by Ichko", titleEn: "Christmas dessert", titleMn: "Баярын ширээний амттан", mediumEn: "Dessert", mediumMn: "Амттан" },
  
];

function getCardStyle(offset: number) {
  const absOffset = Math.abs(offset);

  if (offset === 0) {
    return {
      zIndex: 10,
      x: "0%",
      scale: 1,
      rotateY: 0,
      opacity: 1,
      filter: "blur(0px)",
      brightness: 1,
    };
  }

  const sign = offset > 0 ? 1 : -1;

  if (absOffset === 1) {
    return {
      zIndex: 7,
      x: `${sign * 58}%`,
      scale: 0.78,
      rotateY: sign * -18,
      opacity: 0.85,
      filter: "blur(1.5px)",
      brightness: 0.7,
    };
  }

  if (absOffset === 2) {
    return {
      zIndex: 4,
      x: `${sign * 95}%`,
      scale: 0.58,
      rotateY: sign * -28,
      opacity: 0.55,
      filter: "blur(4px)",
      brightness: 0.45,
    };
  }

  return {
    zIndex: 1,
    x: `${sign * 120}%`,
    scale: 0.42,
    rotateY: sign * -35,
    opacity: 0,
    filter: "blur(8px)",
    brightness: 0.3,
  };
}

export function HandcraftedArt() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(2);
  const [lightbox, setLightbox] = useState<ArtPiece | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Mouse-move carousel rotation
  const mouseDeltaRef = useRef(0);
  const lastMouseXRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(artworks.length - 1, index)));
  }, []);

  const prev = useCallback(() => goTo(activeIndexRef.current - 1), [goTo]);
  const next = useCallback(() => goTo(activeIndexRef.current + 1), [goTo]);

  // Mouse move handler on the carousel stage
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (lastMouseXRef.current === null) {
      lastMouseXRef.current = e.clientX;
      return;
    }
    const delta = e.clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.clientX;
    mouseDeltaRef.current += delta;

    const threshold = 80;
    if (mouseDeltaRef.current > threshold) {
      mouseDeltaRef.current = 0;
      goTo(activeIndexRef.current - 1);
    } else if (mouseDeltaRef.current < -threshold) {
      mouseDeltaRef.current = 0;
      goTo(activeIndexRef.current + 1);
    }
  }, [goTo]);

  const handleMouseLeaveStage = useCallback(() => {
    lastMouseXRef.current = null;
    mouseDeltaRef.current = 0;
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section className="w-full">
      {/* Header */}
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
          {lang === "mn" ?"Шавар баримал, зураг, даавуун урлал — кодоос гадна бүтээх дуртай зүйлс минь." :"Clay sculptures, paintings, fabric art — creative work I make outside of code."}
        </motion.p>
      </div>

      {/* 3D Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        {/* Carousel stage */}
        <div
          className="relative mx-auto select-none"
          style={{ height: "420px", perspective: "1200px", perspectiveOrigin: "50% 50%" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeaveStage}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {artworks.map((piece, i) => {
            const offset = i - activeIndex;
            const style = getCardStyle(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={piece.id}
                className="absolute top-0 left-1/2 cursor-pointer"
                style={{
                  width: "260px",
                  height: "380px",
                  marginLeft: "-130px",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  rotateY: style.rotateY,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: `blur(${style.filter.replace("blur(", "").replace(")", "")}) brightness(${style.brightness})`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 30,
                  mass: 0.8,
                }}
                onClick={() => {
                  if (isCenter) {
                    setLightbox(piece);
                  } else {
                    goTo(i);
                  }
                }}
                whileHover={isCenter ? { scale: 1.03 } : {}}
              >
                {/* Card */}
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: isCenter
                      ? "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)"
                      : "0 10px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Image */}
                  <img
                    src={piece.src}
                    alt={piece.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Index watermark */}
                  <span className="pointer-events-none absolute right-3 top-2 font-mono text-[48px] font-black leading-none text-white opacity-[0.07] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Bottom info — only on center */}
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-5"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                        <p className="mt-1.5 text-[10px] text-white/50 font-mono">
                          {lang === "mn" ? "Дарж томруулах" : "Click to expand"}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand icon on center */}
                  {isCenter && (
                    <motion.div
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            type="button"
            onClick={prev}
            disabled={activeIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {artworks.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className="rounded-full bg-[var(--teal)]"
                animate={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  opacity: i === activeIndex ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={next}
            disabled={activeIndex === artworks.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Lightbox */}
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

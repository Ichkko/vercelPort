"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface Song {
  title: string;
  artist: string;
  album: string;
  emoji: string;
  color: string;
  accent: string;
}

interface Artist {
  name: string;
  genre: string;
  emoji: string;
  color: string;
}

const SONGS: Song[] = [
  {
    title: "Magnetic",
    artist: "ILLIT",
    album: "Super Real Me",
    emoji: "🎵",
    color: "rgba(236,72,153,0.12)",
    accent: "#ec4899",
  },
  {
    title: "Supernova",
    artist: "aespa",
    album: "Armageddon",
    emoji: "✨",
    color: "rgba(139,92,246,0.12)",
    accent: "#8b5cf6",
  },
  {
    title: "Slow Dancing",
    artist: "V",
    album: "Layover",
    emoji: "🌙",
    color: "rgba(8,145,178,0.12)",
    accent: "#0891b2",
  },
  {
    title: "Cheri",
    artist: "Zior Park",
    album: "SOLO",
    emoji: "🌿",
    color: "rgba(34,197,94,0.12)",
    accent: "#22c55e",
  },
  {
    title: "Hype Boy",
    artist: "NewJeans",
    album: "NewJeans",
    emoji: "💙",
    color: "rgba(59,130,246,0.12)",
    accent: "#3b82f6",
  },
  {
    title: "Spicy",
    artist: "aespa",
    album: "MY WORLD",
    emoji: "🔥",
    color: "rgba(249,115,22,0.12)",
    accent: "#f97316",
  },
];

const ARTISTS: Artist[] = [
  { name: "aespa", genre: "K-pop", emoji: "🤖", color: "rgba(139,92,246,0.15)" },
  { name: "NewJeans", genre: "K-pop / R&B", emoji: "🐰", color: "rgba(59,130,246,0.15)" },
  { name: "V (BTS)", genre: "K-pop / Soul", emoji: "🎸", color: "rgba(8,145,178,0.15)" },
  { name: "Zior Park", genre: "Indie / Alt", emoji: "🌿", color: "rgba(34,197,94,0.15)" },
  { name: "ILLIT", genre: "K-pop", emoji: "🌸", color: "rgba(236,72,153,0.15)" },
  { name: "Laufey", genre: "Jazz / Indie", emoji: "🎹", color: "rgba(251,191,36,0.15)" },
];

// Animated vinyl disc
function VinylDisc({ accent }: { accent: string }) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-10 h-10 rounded-full"
      style={{ background: `conic-gradient(#1a1a2e 0deg, #16213e 60deg, #0f3460 120deg, #1a1a2e 180deg, #16213e 240deg, #0f3460 300deg, #1a1a2e 360deg)` }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      {/* Center hole */}
      <div
        className="absolute inset-0 m-auto w-3 h-3 rounded-full"
        style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
      />
      {/* Groove rings */}
      <div className="absolute inset-1 rounded-full border border-white/5" />
      <div className="absolute inset-2 rounded-full border border-white/5" />
    </motion.div>
  );
}

// Sound wave bars
function SoundWave({ accent }: { accent: string }) {
  const bars = [0.4, 0.9, 0.6, 1, 0.7, 0.5, 0.8];
  return (
    <div className="flex items-end gap-[2px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: accent, height: `${h * 20}px` }}
          animate={{ scaleY: [1, 0.3, 1, 0.6, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function CurrentlyVibing() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEn = true; // always show bilingual labels

  return (
    <div ref={ref} className="w-full">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            borderColor: "var(--teal-soft)",
            color: "var(--teal)",
            background: "var(--teal-soft)",
          }}
        >
          🎧 Currently Vibing
        </span>
        <h2
          className="mt-3 text-2xl font-bold md:text-3xl"
          style={{ color: "var(--ink)" }}
        >
          On Repeat
          <span style={{ color: "var(--teal)" }}> ♪</span>
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Songs & artists I can&apos;t stop listening to lately
        </p>
      </motion.div>

      {/* Songs bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {SONGS.map((song, i) => (
          <motion.div
            key={song.title}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.45,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border p-4 cursor-default"
            style={{
              background: `${song.color}`,
              borderColor: "var(--line)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Glow on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at 30% 50%, ${song.accent}22 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex items-center gap-3">
              <VinylDisc accent={song.accent} />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--ink)" }}
                >
                  {song.emoji} {song.title}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                  {song.artist} · {song.album}
                </p>
              </div>
              <SoundWave accent={song.accent} />
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
              style={{ background: song.accent }}
            />
          </motion.div>
        ))}
      </div>

      {/* Artists section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-5"
      >
        <h3 className="text-base font-semibold" style={{ color: "var(--ink)" }}>
          Favorite Artists
          <span className="ml-2 text-xs font-normal" style={{ color: "var(--muted)" }}>
            — Дуртай дуучид
          </span>
        </h3>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {ARTISTS.map((artist, i) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.45 + i * 0.06,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="group flex items-center gap-2 rounded-full border px-4 py-2 cursor-default"
            style={{
              background: artist.color,
              borderColor: "var(--line)",
            }}
          >
            <span className="text-base">{artist.emoji}</span>
            <div>
              <p className="text-xs font-semibold leading-tight" style={{ color: "var(--ink)" }}>
                {artist.name}
              </p>
              <p className="text-[10px] leading-tight" style={{ color: "var(--muted)" }}>
                {artist.genre}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

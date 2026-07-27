"use client";

import Image from "next/image";
import { profile } from "@/data/portfolio";
import { SlideIn, ScaleIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";
import { motion } from "framer-motion";
import { MapPin, Mail, GraduationCap, Globe, User, Music, Film, Palette, Scissors, Camera, Heart } from "lucide-react";
import { VineDecoration } from "./PlantDecorations";

export function About() {
  const { t } = useLanguage();

  const info = [
    { label: t("infoName"), value: profile?.name, icon: User },
    { label: t("infoLocation"), value: t("locationValue"), icon: MapPin },
    { label: t("infoEmail"), value: profile?.email, icon: Mail },
    { label: t("infoEducation"), value: t("educationValue"), icon: GraduationCap },
    { label: t("infoLanguages"), value: t("languagesValue"), icon: Globe },
  ];

  const hobbies = [
    {
      icon: Palette,
      titleKey: "hobbyArtTitle",
      descKey: "hobbyArtDesc",
      color: "from-rose-400/20 to-pink-400/10",
      iconColor: "text-rose-400",
      iconBg: "bg-rose-400/10",
    },
    {
      icon: Scissors,
      titleKey: "hobbyCraftTitle",
      descKey: "hobbyCraftDesc",
      color: "from-amber-400/20 to-orange-400/10",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-400/10",
    },
    {
      icon: Music,
      titleKey: "hobbyMusicTitle",
      descKey: "hobbyMusicDesc",
      color: "from-violet-400/20 to-purple-400/10",
      iconColor: "text-violet-400",
      iconBg: "bg-violet-400/10",
    },
    {
      icon: Film,
      titleKey: "hobbyMovieTitle",
      descKey: "hobbyMovieDesc",
      color: "from-cyan-400/20 to-teal-400/10",
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-400/10",
    },
    {
      icon: Camera,
      titleKey: "hobbyPhotoTitle",
      descKey: "hobbyPhotoDesc",
      color: "from-emerald-400/20 to-green-400/10",
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
    },
    {
      icon: Heart,
      titleKey: "hobbyOtherTitle",
      descKey: "hobbyOtherDesc",
      color: "from-sky-400/20 to-blue-400/10",
      iconColor: "text-sky-400",
      iconBg: "bg-sky-400/10",
    },
  ] as const;

  return (
    <section id="about" className="relative scroll-mt-8 space-y-14">
      {/* ── Top: Profile image + info card ── */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        {/* Left — profile image + bio */}
        <SlideIn direction="left" className="space-y-6">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
              {t("aboutEyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-[var(--ink)]">
              {t("aboutTitle")}
            </h2>
            <div className="mt-3 h-[3px] w-10 rounded-full accent-line" />
            <VineDecoration
              className="mt-3 opacity-50"
              color="rgba(34,197,94,0.4)"
              width={140}
            />
          </div>

          {/* Profile image */}
          <ScaleIn delay={0.08}>
            <div className="relative mx-auto w-fit -mt-4">
              {/* Glow ring */}
              <div
                className="absolute -inset-3 rounded-[20px] opacity-40 blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(8,145,178,0.5), rgba(124,58,237,0.3) 60%, transparent 80%)" }}
                aria-hidden
              />
              <div
                className="absolute -inset-[2px] rounded-[18px] opacity-50"
                style={{ background: "linear-gradient(135deg, rgba(8,145,178,0.7), rgba(124,58,237,0.4), transparent)" }}
                aria-hidden
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative overflow-hidden rounded-[16px] shadow-[0_16px_48px_rgba(8,145,178,0.2)]"
              >
                <Image
                  src="/assets/images/b6bffd14-e8d3-48a2-8f7a-19700eb0152c-1785172311996.jpg"
                  alt="Гомбосүрэн Ичинхорлоо — хувийн зураг"
                  width={480}
                  height={320}
                  className="w-[380px] sm:w-[450px] object-cover"
                  style={{ aspectRatio: "3/2" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,145,178,0.15)] via-transparent to-transparent" />
              </motion.div>
            </div>
          </ScaleIn>

          <div className="space-y-4 text-[15px] leading-[1.85] text-[var(--muted)]">
            <p>{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
          </div>
        </SlideIn>

        {/* Right — info card */}
        <SlideIn direction="right" delay={0.1}>
          <div className="card-soft overflow-hidden">
            <div className="border-b border-[var(--line)] px-6 py-4">
              <p className="text-sm font-semibold text-[var(--ink)]">Profile</p>
            </div>
            <ul className="divide-y divide-[var(--line)]">
              {info?.map((row, i) => {
                const Icon = row?.icon;
                return (
                  <motion.li
                    key={row?.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 px-6 py-4 transition hover:bg-[var(--teal-soft)]/40"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--teal-soft)]">
                      <Icon className="h-4 w-4 text-[var(--teal)]" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">{row?.label}</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-[var(--ink)]">{row?.value}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Decorative code block */}
          <ScaleIn delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-5 rounded-[12px] border border-[var(--line)] bg-[var(--bg-elevated)] p-4 font-mono text-xs dark:bg-[rgba(13,21,32,0.8)]"
            >
              <div className="mb-2 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <p className="text-[var(--muted)]">
                <span className="text-[var(--accent)]">const</span>{" "}
                <span className="text-[var(--teal)]">ichko</span>{" "}
                <span className="text-[var(--muted)]">= {"{"}</span>
              </p>
              <p className="pl-4 text-[var(--muted)]">
                <span className="text-[var(--ink-soft)]">art</span>:{" "}
                <span className="text-amber-500 dark:text-amber-400">&quot;🎨 drawing & crafts&quot;</span>,
              </p>
              <p className="pl-4 text-[var(--muted)]">
                <span className="text-[var(--ink-soft)]">music</span>:{" "}
                <span className="text-amber-500 dark:text-amber-400">&quot;🎵 indie & k-pop&quot;</span>,
              </p>
              <p className="pl-4 text-[var(--muted)]">
                <span className="text-[var(--ink-soft)]">movies</span>:{" "}
                <span className="text-amber-500 dark:text-amber-400">&quot;🎬 thriller & anime&quot;</span>,
              </p>
              <p className="pl-4 text-[var(--muted)]">
                <span className="text-[var(--ink-soft)]">available</span>:{" "}
                <span className="text-green-500 dark:text-green-400">true</span>
              </p>
              <p className="text-[var(--muted)]">{"}"}</p>
            </motion.div>
          </ScaleIn>
        </SlideIn>
      </div>

      {/* ── Hobbies & Interests ── */}
      <SlideIn direction="left" delay={0.05}>
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
            {t("hobbiesEyebrow")}
          </span>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[var(--ink)]">
            {t("hobbiesTitle")}
          </h3>
          <div className="mt-3 h-[3px] w-10 rounded-full accent-line" />
        </div>
      </SlideIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby, i) => {
          const Icon = hobby.icon;
          return (
            <motion.div
              key={hobby.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative overflow-hidden rounded-[16px] border border-[var(--line)] bg-gradient-to-br ${hobby.color} p-5 backdrop-blur-sm transition-shadow hover:shadow-lg dark:border-white/[0.06]`}
            >
              <div className="flex items-start gap-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${hobby.iconBg}`}>
                  <Icon className={`h-5 w-5 ${hobby.iconColor}`} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">{t(hobby.titleKey)}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{t(hobby.descKey)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Favorite music & movies tags ── */}
      <ScaleIn delay={0.1}>
        <div className="rounded-[16px] border border-[var(--line)] bg-[var(--bg-elevated)] p-6 dark:bg-[rgba(13,21,32,0.6)]">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Music */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Music className="h-4 w-4 text-violet-400" strokeWidth={1.8} />
                <p className="text-sm font-semibold text-[var(--ink)]">{t("favMusicLabel")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["BTS", "IU", "Lauv", "Hozier", "NewJeans", "Billie Eilish", "Imagine Dragons"].map((artist) => (
                  <span
                    key={artist}
                    className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-500 dark:text-violet-300"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            </div>
            {/* Movies */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Film className="h-4 w-4 text-cyan-400" strokeWidth={1.8} />
                <p className="text-sm font-semibold text-[var(--ink)]">{t("favMovieLabel")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Your Name", "Parasite", "Interstellar", "Attack on Titan", "Spirited Away", "Inception"].map((movie) => (
                  <span
                    key={movie}
                    className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-500 dark:text-cyan-300"
                  >
                    {movie}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScaleIn>
    </section>
  );
}

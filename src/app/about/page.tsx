"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, GraduationCap, Heart, Sparkles, Code2, BookOpen, Star, Lightbulb, Users, Zap, Target } from "lucide-react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { SwayingPlant, FloatingLeaf, GrassBlades } from "@/components/PlantDecorations";
import { CustomCursor } from "@/components/CustomCursor";

function AboutPageContent() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLanguage();

  const careerMilestones = [
    {
      year: "2022",
      icon: BookOpen,
      title: "The Beginning",
      titleMn: "Эхлэл",
      desc: "Started my software engineering journey at NUM. Fell in love with problem-solving through code — HTML, CSS, and JavaScript were my first languages.",
      descMn: "МУИС-д програм хангамжийн инженерчлэлийн аялалаа эхлүүлсэн. HTML, CSS, JavaScript-ийг анхны хэл болгон сурч, кодоор асуудал шийдэхэд дурлав.",
      color: "from-amber-400/20 to-orange-400/10",
      dot: "bg-amber-400",
      border: "border-amber-400/30",
    },
    {
      year: "2023",
      icon: Code2,
      title: "Backend Roots",
      titleMn: "Backend суурь",
      desc: "Dived deep into Java and Spring Boot. Built my first REST APIs, learned MySQL database design, and discovered how the server side of the web actually works.",
      descMn: "Java болон Spring Boot-д гүнзгий орсон. Анхны REST API-уудаа бүтээж, MySQL өгөгдлийн сангийн загварчлалыг сурч, серверийн тал хэрхэн ажилладгийг ойлгосон.",
      color: "from-teal-400/20 to-cyan-400/10",
      dot: "bg-[var(--teal)]",
      border: "border-[var(--teal)]/30",
    },
    {
      year: "2024",
      icon: Sparkles,
      title: "Full Stack Leap",
      titleMn: "Full Stack үсрэлт",
      desc: "Expanded into Next.js, React, and Tailwind CSS. Shipped real products — a QR-based POS system and a hotel booking platform — from design to deployment.",
      descMn: "Next.js, React, Tailwind CSS-д тэлсэн. QR-д суурилсан POS систем болон зочид буудлын захиалгын платформыг дизайнаас деплой хүртэл бүтээсэн.",
      color: "from-violet-400/20 to-purple-400/10",
      dot: "bg-violet-400",
      border: "border-violet-400/30",
    },
    {
      year: "2025",
      icon: Zap,
      title: "Polishing & Growing",
      titleMn: "Боловсруулалт & Өсөлт",
      desc: "Exploring Flutter for mobile, refining UX craft, and building production-ready portfolios. Currently open to internships and junior roles where I can keep growing.",
      descMn: "Flutter mobile-д судалгаа хийж, UX чадварыг нарийлуулж, production-ready портфолиуд бүтээж байна. Одоо дадлага болон junior ажлын байрт нээлттэй.",
      color: "from-rose-400/20 to-pink-400/10",
      dot: "bg-rose-400",
      border: "border-rose-400/30",
    },
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Ownership",
      titleMn: "Хариуцлага",
      desc: "I take full responsibility for what I build — from the first commit to the final deploy. If it ships under my name, it works.",
      descMn: "Бүтээсэн зүйлдээ эхний commit-ээс эцсийн deploy хүртэл бүрэн хариуцлага хүлээдэг. Миний нэрээр гарсан бол ажилладаг.",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      icon: Lightbulb,
      title: "Curiosity",
      titleMn: "Сониуч зан",
      desc: "I'm always asking 'why does this work?' and 'how can it be better?' Curiosity is what turns a task into a craft.",
      descMn: "'Яагаад ажилладаг вэ?\' \'Хэрхэн сайжруулах вэ?\' гэж байнга асуудаг. Сониуч зан нь ажлыг урлаг болгодог.",
      color: "text-[var(--teal)]",
      bg: "bg-[var(--teal)]/10",
    },
    {
      icon: Users,
      title: "Empathy",
      titleMn: "Хүмүүнлэг байдал",
      desc: "Good software is built for people. I think about the end user in every decision — not just what works, but what feels right.",
      descMn: "Сайн програм хүмүүст зориулагдсан байдаг. Зөвхөн ажилладаг зүйл биш, зөв мэдрэгддэг зүйлийг бүтээхийг зорьдог.",
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      icon: Star,
      title: "Craft",
      titleMn: "Урлаг",
      desc: "Details matter. Clean code, thoughtful UI, and smooth interactions aren't extras — they're the standard I hold myself to.",
      descMn: "Нарийн ширийн зүйлс чухал. Цэвэр код, бодолтой UI, зөөлөн харилцан үйлчлэл нь нэмэлт биш — миний стандарт.",
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
  ];

  const isMn = lang === "mn";

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <CustomCursor />
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="dot-grid absolute inset-0 opacity-60 dark:opacity-40" />
        <div
          className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(8,145,178,0.22) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(167,139,250,0.08) 50%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <SwayingPlant className="absolute bottom-0 left-0" color="rgba(34,197,94,0.28)" size={110} swayAmount={7} duration={4.2} delay={0} />
        <SwayingPlant className="absolute bottom-0 right-0" color="rgba(34,197,94,0.22)" size={90} swayAmount={5} duration={3.8} delay={0.6} flip />
        <GrassBlades className="absolute bottom-0 left-[10%] w-32 h-16" color="rgba(34,197,94,0.3)" count={6} />
        <GrassBlades className="absolute bottom-0 right-[15%] w-24 h-12" color="rgba(74,222,128,0.25)" count={5} />
        <FloatingLeaf className="absolute top-[20%] left-[8%]" color="rgba(34,197,94,0.35)" size={18} delay={0} />
        <FloatingLeaf className="absolute top-[40%] right-[10%]" color="rgba(74,222,128,0.3)" size={14} delay={1.5} />
        <FloatingLeaf className="absolute top-[65%] left-[15%]" color="rgba(34,197,94,0.25)" size={16} delay={0.8} />
      </div>
      {/* Top controls */}
      <div className="fixed left-6 top-6 z-50 flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)]/90 px-3 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur-xl transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {isMn ? "Буцах" : "Back"}
        </Link>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "mn" : "en")}
          className="rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)]/90 px-3 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur-xl transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
        >
          {lang === "en" ? "MN" : "EN"}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)]/90 px-3 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur-xl transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>
      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-[860px] px-5 pb-24 pt-28 md:px-10">

        {/* ── Hero intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
            {isMn ? "Миний тухай" : "About me"}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-5xl">
            {isMn ? "Кодоос цааш" : "Beyond the code"}
          </h1>
          <div className="mt-3 h-[3px] w-12 rounded-full" style={{ background: "var(--teal)" }} />

          <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto sm:mx-0"
            >
              <div
                className="absolute -inset-3 rounded-[20px] opacity-40 blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(8,145,178,0.5), rgba(124,58,237,0.3) 60%, transparent 80%)" }}
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[16px] shadow-[0_16px_48px_rgba(8,145,178,0.2)]">
                <Image
                  src="/assets/images/ichkkkko-1785171948972.jpg"
                  alt="Гомбосүрэн Ичинхорлоо — хувийн зураг"
                  width={220}
                  height={280}
                  className="w-[200px] object-cover sm:w-[220px]"
                  style={{ aspectRatio: "4/5" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,145,178,0.15)] via-transparent to-transparent" />
              </div>
              {/* Location badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--bg-elevated)]/95 px-3 py-1.5 text-[11px] font-semibold text-[var(--muted)] shadow-sm backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-[var(--teal)]" strokeWidth={2} />
                {isMn ? "Улаанбаатар, Монгол" : "Ulaanbaatar, Mongolia"}
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 text-[15px] leading-[1.9] text-[var(--muted)]"
            >
              {isMn ? (
                <>
                  <p>
                    Намайг <span className="font-semibold text-[var(--ink)]">Гомбосүрэн Ичинхорлоо</span> гэдэг — Монгол улсын Улаанбаатар хотод амьдардаг програм хангамжийн инженерчлэлийн оюутан. Хүмүүс ашиглахад хялбар, харахад гоё, найдвартай ажилладаг зүйлс бүтээхийг зорьдог.
                  </p>
                  <p>
                    Програмчлалд дурлах нь санамсаргүй биш байсан — асуудлыг задлан шинжлэх, шийдлийг кодоор илэрхийлэх нь надад байгалийн мэт санагдсан. Тэр мэдрэмж одоо ч хэвээр байна.
                  </p>
                  <p>
                    Ажлаасаа гадна зураг зурах, гар урлал хийх, хөгжим сонсох, аялах дуртай. Эдгээр нь зөвхөн хобби биш — бүтээлч сэтгэлгээг хурцалдаг зүйлс.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I'm <span className="font-semibold text-[var(--ink)]">Gombosuren Ichinhorloo</span> — a software engineering student from Ulaanbaatar, Mongolia. I build things that are easy to use, pleasant to look at, and reliable to run.
                  </p>
                  <p>
                    Falling in love with programming wasn't accidental — breaking down problems and expressing solutions through code felt natural from the start. That feeling hasn't changed.
                  </p>
                  <p>
                    Outside of work, I draw, make crafts, listen to music, and explore new places. These aren't just hobbies — they sharpen the creative thinking I bring to every project.
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Education ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="mb-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
              {isMn ? "Боловсрол" : "Education"}
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[var(--ink)]">
              {isMn ? "Академик суурь" : "Academic foundation"}
            </h2>
            <div className="mt-2 h-[3px] w-8 rounded-full" style={{ background: "var(--teal)" }} />
          </div>

          <div className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg-elevated)] dark:bg-[rgba(13,21,32,0.7)]">
            <div className="flex items-start gap-5 p-6 sm:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--teal-soft)]">
                <GraduationCap className="h-6 w-6 text-[var(--teal)]" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-extrabold text-[var(--ink)]">
                      {isMn ? "Програм хангамжийн инженерчлэл" : "Software Engineering"}
                    </p>
                    <p className="mt-0.5 font-semibold text-[var(--teal)]">
                      {isMn ? "Монгол Улсын Их Сургууль (МУИС)" : "National University of Mongolia (NUM)"}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--teal)]/30 bg-[var(--teal-soft)] px-3 py-1 font-mono text-xs font-semibold text-[var(--teal)]">
                    2022 – {isMn ? "Одоо" : "Present"}
                  </span>
                </div>
                <p className="mt-4 text-[14px] leading-[1.85] text-[var(--muted)]">
                  {isMn
                    ? "Алгоритм, өгөгдлийн бүтэц, объект хандалтат програмчлал, мэдээллийн сангийн дизайн, програм хангамжийн архитектурын суурь мэдлэгийг эзэмшиж байна. Онолын мэдлэгийг практик төслүүдэд хэрэглэхийг чухалчилдаг." :"Studying algorithms, data structures, object-oriented programming, database design, and software architecture fundamentals. I focus on applying theoretical knowledge to practical, real-world projects."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Java", "OOP", "Algorithms", "MySQL", "Software Design"]?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Career Journey ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
              {isMn ? "Замнал" : "Journey"}
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[var(--ink)]">
              {isMn ? "Хэрхэн энд хүрсэн бэ" : "How I got here"}
            </h2>
            <div className="mt-2 h-[3px] w-8 rounded-full" style={{ background: "var(--teal)" }} />
          </motion.div>

          <div className="space-y-4">
            {careerMilestones?.map((milestone, i) => {
              const Icon = milestone?.icon;
              return (
                <motion.div
                  key={milestone?.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                  className={`relative overflow-hidden rounded-[16px] border ${milestone?.border} bg-gradient-to-br ${milestone?.color} p-5 backdrop-blur-sm transition-shadow hover:shadow-md dark:border-white/[0.06]`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/30 dark:bg-white/[0.07]">
                        <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.8} />
                      </div>
                      <span className={`h-2 w-2 rounded-full ${milestone?.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="font-mono text-xs font-bold text-[var(--teal)]">{milestone?.year}</span>
                        <p className="font-bold text-[var(--ink)]">
                          {isMn ? milestone?.titleMn : milestone?.title}
                        </p>
                      </div>
                      <p className="text-[13px] leading-[1.8] text-[var(--muted)]">
                        {isMn ? milestone?.descMn : milestone?.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Core Values ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
              {isMn ? "Үнэт зүйлс" : "Values"}
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[var(--ink)]">
              {isMn ? "Юунд итгэдэг вэ" : "What I believe in"}
            </h2>
            <div className="mt-2 h-[3px] w-8 rounded-full" style={{ background: "var(--teal)" }} />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {coreValues?.map((value, i) => {
              const Icon = value?.icon;
              return (
                <motion.div
                  key={value?.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="rounded-[16px] border border-[var(--line)] bg-[var(--bg-elevated)] p-5 transition-shadow hover:shadow-md dark:bg-[rgba(13,21,32,0.6)] dark:border-white/[0.06]"
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${value?.bg}`}>
                      <Icon className={`h-5 w-5 ${value?.color}`} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-bold text-[var(--ink)]">
                        {isMn ? value?.titleMn : value?.title}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-[1.8] text-[var(--muted)]">
                        {isMn ? value?.descMn : value?.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] border border-[var(--teal)]/20 bg-gradient-to-br from-[var(--teal-soft)] to-violet-400/10 p-8 text-center"
        >
          <Heart className="mx-auto mb-3 h-7 w-7 text-rose-400" strokeWidth={1.8} />
          <h3 className="text-xl font-extrabold text-[var(--ink)]">
            {isMn ? "Хамтран ажиллах уу?" : "Want to work together?"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            {isMn
              ? "Дадлага, junior ажлын байр, freelance web ажилд нээлттэй. Холбоо бариарай." :"Open to internships, junior roles, and freelance web work. I'd love to hear from you."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#personal-contact"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--teal)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(8,145,178,0.35)] transition hover:opacity-90 hover:shadow-[0_6px_28px_rgba(8,145,178,0.45)]"
            >
              {isMn ? "Холбогдох" : "Get in touch"}
            </Link>
            <a
              href="/CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--teal)]/40 hover:text-[var(--teal)]"
            >
              {isMn ? "CV татах" : "Download CV"}
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AboutPageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

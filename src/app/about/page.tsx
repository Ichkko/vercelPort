"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Heart,
  Briefcase,
  Award,
  Languages,
  Trophy,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { SwayingPlant, FloatingLeaf, GrassBlades } from "@/components/PlantDecorations";
import { CustomCursor } from "@/components/CustomCursor";
import { profile } from "@/data/portfolio";

const skills = [
  "HTML/CSS",
  "Java",
  "JavaScript",
  "TypeScript",
  "Spring Boot / JPA",
  "REST API",
  "MySQL",
  "PostgreSQL",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Flutter",
  "Astro",
  "GitHub",
  "Canva",
  "PowerPoint / Word",
];

function AboutPageContent() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const isMn = lang === "mn";

  const jobs = [
    {
      role: isMn ? "Үйлдвэрлэлийн дадлага" : "Software intern",
      company: isMn ? "Гэрэлт Ай Ти ХХК" : "Gerelt IT LLC",
      period: "2025.06 – 2025.08",
      place: isMn ? "Ховд аймаг, Монгол" : "Khovd, Mongolia",
      points: isMn
        ? [
            "West.mn сургалтын платформын вебсайтыг боловсруулсан.",
            "Сургалтын төвийн хичээлүүдийг цахим орчинд нэгтгэж, бүртгүүлэх, мэдээлэл авах, сургалтад оролцох боломжийг бүрдүүлсэн.",
          ]
        : [
            "Built the West.mn training-platform website.",
            "Brought the center’s courses online so people could register, get information, and take part in training.",
          ],
    },
    {
      role: isMn ? "Худалдааны зөвлөх" : "Sales consultant",
      company: "Dariim beauty",
      period: "2024.06 – 2024.08",
      place: isMn ? "Ховд аймаг" : "Khovd, Mongolia",
      points: isMn
        ? [
            "Үйлчлүүлэгчдэд гоо сайхны бүтээгдэхүүний талаар зөвлөгөө өгч, хэрэгцээнд нь тохирсон бараа санал болгон борлуулалт хийсэн.",
            "Барааны өрөлт, бүрэн бүтэн байдал, үлдэгдлийг хянаж, найрсаг үйлчилгээгээр борлуулалтын зорилтыг биелүүлсэн.",
          ]
        : [
            "Advised customers on beauty products and recommended items that matched their needs.",
            "Handled merchandising, stock integrity, and inventory while meeting sales targets with friendly service.",
          ],
    },
  ];

  const awards = [
    {
      title: isMn ? "Full Stack Hackathon-2026 · Тэргүүн байр" : "Full Stack Hackathon 2026 · 1st place",
      org: isMn
        ? "МУИС-ийн ББС · West IT Student's Club"
        : "NUM Western Regional School · West IT Student's Club",
    },
    {
      title: isMn ? "Дартс · Тэргүүн байр" : "Darts · 1st place",
      org: isMn
        ? "Математик, компьютерын ухааны тэнхим"
        : "Department of Mathematics and Computer Science",
    },
  ];

  const certificates = [
    {
      title: isMn ? "Солонгос хэл — Sejong Course 2A" : "Korean — Sejong Course 2A",
      org: isMn
        ? "Сэжон Хаан Институт, Улаанбаатар 2"
        : "King Sejong Institute Ulaanbaatar 2",
      period: "2024.02.19 – 2024.03.30",
    },
    {
      title: isMn ? "Солонгос хэл — Анхан шат (1-р түвшин)" : "Korean Language Level 1",
      org: isMn
        ? "Чаншин Их Сургуулийн Солонгос хэлний боловсролын төв"
        : "Changshin University Korean Language Education Center",
      period: "2022.11.21 – 2023.01.11",
    },
  ];

  const languages = [
    { name: isMn ? "Монгол" : "Mongolian", level: isMn ? "Эх хэл" : "Native" },
    { name: isMn ? "Солонгос" : "Korean", level: isMn ? "Дунд" : "Intermediate" },
    { name: isMn ? "Англи" : "English", level: isMn ? "Суурь" : "Basic" },
  ];

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <CustomCursor />
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

      <div className="fixed left-3 top-3 z-50 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2 md:left-6 md:top-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)]/90 px-3 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur-xl transition hover:border-[var(--teal)]/40 hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("back")}
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

      <main className="relative z-10 mx-auto max-w-[860px] px-4 pb-20 pt-24 sm:px-5 md:px-10 md:pb-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-eyebrow">
            {isMn ? "Миний тухай" : "About me"}
          </span>
          <h1 className="section-title mt-3 text-[var(--ink)] md:text-5xl">
            {isMn ? "Программ хангамжийн төгсөгч" : "Software graduate"}
          </h1>
          <div className="mt-3 h-[3px] w-12 rounded-full" style={{ background: "var(--teal)" }} />

          <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
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
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--bg-elevated)]/95 px-3 py-1.5 text-[11px] font-semibold text-[var(--muted)] shadow-sm backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-[var(--teal)]" strokeWidth={2} />
                {isMn ? "Улаанбаатар, Монгол" : "Ulaanbaatar, Mongolia"}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 body-copy"
            >
              {isMn ? (
                <>
                  <p>
                    Намайг <span className="font-semibold text-[var(--ink)]">Гомбосүрэн Ичинхорлоо</span> гэдэг. Ресторан, зочид буудал, сургалт, оюутны дотуур байрны удирдлагын систем зэрэг бодит хэрэглээтэй төслүүд дээр ажилласан программ хангамжийн төгсөгч.
                  </p>
                  <p>
                    React/Next.js frontend болон Spring Boot API дээр ажиллаж, цэвэр UI, role-based урсгал, database design, засварлахад ойлгомжтой кодонд анхаардаг.
                  </p>
                  <p>
                    Junior full-stack хөгжүүлэгчээр бодит бүтээгдэхүүний багт орж хувь нэмэр оруулахад бэлэн байна.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I’m <span className="font-semibold text-[var(--ink)]">Gombosuren Ichinhorloo</span> — a Software Engineering graduate with hands-on experience building restaurant, hotel, education, and dormitory management systems.
                  </p>
                  <p>
                    I work across React/Next.js frontends and Spring Boot APIs, with attention to clean UI, role-based flows, database design, and maintainable implementation.
                  </p>
                  <p>
                    I’m ready to contribute as a junior full-stack developer on a real product team.
                  </p>
                </>
              )}
              <p className="text-sm text-[var(--muted)]">
                {profile.email} · {profile.phone}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="mb-6">
            <span className="section-eyebrow">{isMn ? "Боловсрол" : "Education"}</span>
            <h2 className="section-title mt-2 text-[var(--ink)] md:text-2xl">
              {isMn ? "Бакалавр" : "Bachelor’s degree"}
            </h2>
            <div className="mt-2 h-[3px] w-8 rounded-full" style={{ background: "var(--teal)" }} />
          </div>

          <div className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg-elevated)] dark:bg-[rgba(13,21,32,0.7)]">
            <div className="flex items-start gap-4 p-4 sm:gap-5 sm:p-6 md:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--teal-soft)]">
                <GraduationCap className="h-6 w-6 text-[var(--teal)]" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-extrabold text-[var(--ink)]">
                      {isMn ? "Программ хангамж" : "Software Engineering"}
                    </p>
                    <p className="mt-0.5 font-semibold text-[var(--teal)]">
                      {isMn
                        ? "Монгол Улсын Их Сургуулийн Баруун Бүсийн Сургууль"
                        : "National University of Mongolia — Western Regional School"}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--teal)]/30 bg-[var(--teal-soft)] px-3 py-1 font-mono text-xs font-semibold text-[var(--teal)]">
                    2022.09 – 2026.06
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="section-eyebrow">{isMn ? "Ажлын туршлага" : "Experience"}</span>
            <h2 className="section-title mt-2 text-[var(--ink)] md:text-2xl">
              {isMn ? "Дадлага ба ажил" : "Internship and work"}
            </h2>
            <div className="mt-2 h-[3px] w-8 rounded-full" style={{ background: "var(--teal)" }} />
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-[16px] border border-[var(--line)] bg-[var(--bg-elevated)] p-5 dark:border-white/[0.06] dark:bg-[rgba(13,21,32,0.6)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--teal-soft)]">
                    <Briefcase className="h-5 w-5 text-[var(--teal)]" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold text-[var(--ink)]">{job.role}</p>
                      <span className="font-mono text-xs font-semibold text-[var(--teal)]">{job.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--teal)]">{job.company}</p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">{job.place}</p>
                    <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.8] text-[var(--muted)]">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="mb-5">
              <span className="section-eyebrow">{isMn ? "Шагнал" : "Awards"}</span>
              <h2 className="section-title mt-2 text-[var(--ink)] md:text-2xl">
                {isMn ? "Тэргүүн байр" : "First place"}
              </h2>
            </div>
            <div className="space-y-3">
              {awards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-[var(--line)] bg-[var(--bg-elevated)] p-4 dark:border-white/[0.06]"
                >
                  <Trophy className="mb-2 h-4 w-4 text-amber-400" strokeWidth={1.8} />
                  <p className="text-sm font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{item.org}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5">
              <span className="section-eyebrow">{isMn ? "Гэрчилгээ" : "Certificates"}</span>
              <h2 className="section-title mt-2 text-[var(--ink)] md:text-2xl">
                {isMn ? "Солонгос хэл" : "Korean language"}
              </h2>
            </div>
            <div className="space-y-3">
              {certificates.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-[var(--line)] bg-[var(--bg-elevated)] p-4 dark:border-white/[0.06]"
                >
                  <Award className="mb-2 h-4 w-4 text-[var(--teal)]" strokeWidth={1.8} />
                  <p className="text-sm font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{item.org}</p>
                  <p className="mt-1 font-mono text-[11px] text-[var(--teal)]">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-6">
            <span className="section-eyebrow">{isMn ? "Хэл" : "Languages"}</span>
            <h2 className="section-title mt-2 text-[var(--ink)] md:text-2xl">
              {isMn ? "Ярьдаг хэлнүүд" : "What I speak"}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {languages.map((item) => (
              <div
                key={item.name}
                className="rounded-[14px] border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-4 dark:border-white/[0.06]"
              >
                <Languages className="mb-2 h-4 w-4 text-[var(--teal)]" strokeWidth={1.8} />
                <p className="font-bold text-[var(--ink)]">{item.name}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{item.level}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-6">
            <span className="section-eyebrow">{isMn ? "Ур чадвар" : "Skills"}</span>
            <h2 className="section-title mt-2 text-[var(--ink)] md:text-2xl">
              {isMn ? "CV дээрх технологи" : "From the resume"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[12px] font-semibold text-[var(--muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] border border-[var(--teal)]/20 bg-gradient-to-br from-[var(--teal-soft)] to-violet-400/10 p-8 text-center"
        >
          <Heart className="mx-auto mb-3 h-7 w-7 text-rose-400" strokeWidth={1.8} />
          <h3 className="text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
            {isMn ? "Хамтран ажиллах уу?" : "Want to work together?"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            {isMn
              ? "Junior full-stack хөгжүүлэгч, дадлага, бүтээгдэхүүнд төвлөрсөн багийн боломжуудад нээлттэй."
              : "Open to junior full-stack developer roles, internships, and product-focused teams."}
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
  return <AboutPageContent />;
}

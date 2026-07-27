"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Б. Мөнхбаяр",
    role: "Senior Backend Engineer",
    company: "Монгол Банк",
    quote:
      "Ichko is one of the most self-driven juniors I've worked with. She picked up Spring Boot and JPA faster than most, and her code is clean, readable, and well-structured from day one.",
    avatar: "МБ",
    accent: "#0891b2",
  },
  {
    name: "Д. Энхтуяа",
    role: "Frontend Lead",
    company: "Freelance Studio",
    quote:
      "Working with Ichko on the FoodMenu POS was a pleasure. She owned the Next.js frontend end-to-end — from WebSocket integration to the cashier UI — and delivered on time without hand-holding.",
    avatar: "ДЭ",
    accent: "#7c3aed",
  },
  {
    name: "Т. Батзориг",
    role: "Project Manager",
    company: "NUM Capstone",
    quote:
      "Ichko consistently went beyond the brief. She not only built the hotel booking system but also documented the API, set up Docker, and mentored two teammates on REST design.",
    avatar: "ТБ",
    accent: "#d97706",
  },
  {
    name: "О. Солонго",
    role: "UI/UX Designer",
    company: "Collaborative Project",
    quote:
      "She has a rare combination of design sensitivity and engineering precision. Every pixel was intentional, and she pushed back constructively when a design choice would hurt performance.",
    avatar: "ОС",
    accent: "#059669",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section>
      {/* Header */}
      <div className="mb-10">
        <span
          className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(8,145,178,0.12)",
            color: "var(--teal)",
            border: "1px solid rgba(8,145,178,0.2)",
          }}
        >
          {t("testimonialsEyebrow" as never) || "Testimonials"}
        </span>
        <h2
          className="text-2xl font-bold md:text-3xl"
          style={{ color: "var(--ink)", fontFamily: "var(--font-display, inherit)" }}
        >
          {t("testimonialsTitle" as never) || "What colleagues say"}
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {t("testimonialsDesc" as never) ||
            "Feedback from teammates, leads, and collaborators I've shipped real products with."}
        </p>
      </div>

      {/* Bento grid — asymmetric layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Card 0 — spans 2 cols on lg */}
        <motion.div
          variants={cardVariants}
          className="group relative overflow-hidden rounded-2xl p-6 lg:col-span-2"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--line)",
          }}
        >
          <QuoteIcon color={testimonials[0].accent} />
          <p
            className="relative z-10 mt-4 text-base leading-relaxed"
            style={{ color: "var(--ink)" }}
          >
            &ldquo;{testimonials[0].quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar initials={testimonials[0].avatar} accent={testimonials[0].accent} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {testimonials[0].name}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {testimonials[0].role} · {testimonials[0].company}
              </p>
            </div>
          </div>
          {/* Subtle accent glow */}
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${testimonials[0].accent}22 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />
        </motion.div>

        {/* Card 1 */}
        <motion.div
          variants={cardVariants}
          className="group relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--line)",
          }}
        >
          <QuoteIcon color={testimonials[1].accent} />
          <p
            className="relative z-10 mt-4 text-sm leading-relaxed"
            style={{ color: "var(--ink)" }}
          >
            &ldquo;{testimonials[1].quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar initials={testimonials[1].avatar} accent={testimonials[1].accent} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {testimonials[1].name}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {testimonials[1].role} · {testimonials[1].company}
              </p>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${testimonials[1].accent}22 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={cardVariants}
          className="group relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--line)",
          }}
        >
          <QuoteIcon color={testimonials[2].accent} />
          <p
            className="relative z-10 mt-4 text-sm leading-relaxed"
            style={{ color: "var(--ink)" }}
          >
            &ldquo;{testimonials[2].quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar initials={testimonials[2].avatar} accent={testimonials[2].accent} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {testimonials[2].name}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {testimonials[2].role} · {testimonials[2].company}
              </p>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${testimonials[2].accent}22 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />
        </motion.div>

        {/* Card 3 — spans 2 cols on lg */}
        <motion.div
          variants={cardVariants}
          className="group relative overflow-hidden rounded-2xl p-6 lg:col-span-2"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--line)",
          }}
        >
          <QuoteIcon color={testimonials[3].accent} />
          <p
            className="relative z-10 mt-4 text-base leading-relaxed"
            style={{ color: "var(--ink)" }}
          >
            &ldquo;{testimonials[3].quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar initials={testimonials[3].avatar} accent={testimonials[3].accent} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {testimonials[3].name}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {testimonials[3].role} · {testimonials[3].company}
              </p>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${testimonials[3].accent}22 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 22V13.2C0 9.73333 0.933333 6.86667 2.8 4.6C4.66667 2.33333 7.26667 0.8 10.6 0L12 3.2C9.86667 3.86667 8.2 4.93333 7 6.4C5.8 7.86667 5.2 9.46667 5.2 11.2H10.4V22H0ZM17.6 22V13.2C17.6 9.73333 18.5333 6.86667 20.4 4.6C22.2667 2.33333 24.8667 0.8 28.2 0L29.6 3.2C27.4667 3.86667 25.8 4.93333 24.6 6.4C23.4 7.86667 22.8 9.46667 22.8 11.2H28V22H17.6Z"
        fill={color}
        fillOpacity="0.35"
      />
    </svg>
  );
}

function Avatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: accent }}
    >
      {initials}
    </div>
  );
}

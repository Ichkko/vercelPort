"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Terminal, Send, CheckCircle, AlertCircle } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SlideIn, ScaleIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

export function Contact() {
  const { t } = useLanguage();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const links = [
    { label: "Email", value: profile?.email, href: `mailto:${profile?.email}`, Icon: Mail },
    { label: "GitHub", value: "github.com/Ichkko", href: profile?.github, Icon: Terminal },
    { label: "Instagram", value: "@iichh.kuu__", href: profile?.instagram, Icon: Camera },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error || "Failed to send. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-8 lg:ml-[0px]">
      <div className="relative overflow-hidden px-5 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-14"
        style={{ background: "linear-gradient(160deg, #0f1e35 0%, #0a1628 50%, #071020 100%)" }}
      >
        {/* Subtle background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-20 right-0 h-[350px] w-[350px] rounded-full opacity-[0.08] blur-3xl" style={{ background: "radial-gradient(circle, #0284c7, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full opacity-[0.06] blur-3xl" style={{ background: "radial-gradient(circle, #6d28d9, transparent 70%)" }} />
          <div className="dot-grid absolute inset-0 opacity-[0.15]" />
        </div>

        <div className="relative mx-auto grid max-w-[1040px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">

          {/* Left — Contact Form */}
          <SlideIn direction="left">
            <div className="mb-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--teal)]">
                Get in touch
              </p>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-[36px]">
                {t("contactTitle")}
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/50">
                {t("contactDesc")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-[12px] border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-[13px] text-white placeholder-white/25 outline-none transition focus:border-[var(--teal)]/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-[var(--teal)]/30"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-[12px] border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-[13px] text-white placeholder-white/25 outline-none transition focus:border-[var(--teal)]/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-[var(--teal)]/30"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project or just say hi..."
                  className="w-full resize-none rounded-[12px] border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-[13px] text-white placeholder-white/25 outline-none transition focus:border-[var(--teal)]/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-[var(--teal)]/30"
                />
              </div>

              {/* Feedback messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-[12px] border border-teal-500/30 bg-teal-500/10 px-4 py-3 text-[13px] text-teal-300"
                >
                  <CheckCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-[12px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {errorMsg}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-7 py-3 text-[13px] font-bold text-white shadow-lg shadow-teal-500/25 transition disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" strokeWidth={1.5} />
                    {t("contactCta")}
                  </>
                )}
              </motion.button>
            </form>
          </SlideIn>

          {/* Right — Contact links */}
          <ScaleIn delay={0.15}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              Or reach me directly
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {links?.map((item, i) => (
                <motion.a
                  key={item?.label}
                  href={item?.href}
                  target={item?.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-[8px] px-4 py-2.5 transition hover:bg-white/[0.055] hover:text-teal-200"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
                    <item.Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-white/50 dark:text-[var(--muted)]">{item?.label}</p>
                    <p className="truncate font-medium text-white">{item?.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}

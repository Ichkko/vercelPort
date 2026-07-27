"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, Mail, Terminal } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SlideIn, ScaleIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

export function Contact() {
  const { t } = useLanguage();

  const links = [
    { label: "Email", value: profile?.email, href: `mailto:${profile?.email}`, Icon: Mail },
    { label: "GitHub", value: "github.com/Ichkko", href: profile?.github, Icon: Terminal },
    { label: "Instagram", value: "@iichh.kuu__", href: profile?.instagram, Icon: Camera },
  ];

  return (
    <section id="contact" className="scroll-mt-8 lg:ml-[0px]">
      <div className="relative overflow-hidden bg-[#1b2540] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14 dark:bg-[#071012] dark:shadow-[inset_0_1px_0_rgba(214,245,237,0.08)]">
        <div className="relative mx-auto grid max-w-[1040px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Left — slides in from left */}
          <SlideIn direction="left">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-4xl">
              {t("contactTitle")}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-400 dark:text-[var(--muted)]">
              {t("contactDesc")}
            </p>
            <motion.a
              href={`mailto:${profile?.email}`}
              whileHover={{ y: -2 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--teal)] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/25"
            >
              {t("contactCta")}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </motion.a>
          </SlideIn>

          {/* Right — scales in */}
          <ScaleIn delay={0.15}>
            <div className="space-y-3 text-sm">
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
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
                    <item.Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs text-stone-400 dark:text-[var(--muted)]">{item?.label}</p>
                    <p className="font-medium text-white">{item?.value}</p>
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

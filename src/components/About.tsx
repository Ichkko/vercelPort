"use client";

import { profile } from "@/data/portfolio";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageProvider";

export function About() {
  const { t } = useLanguage();

  const info = [
    { label: t("infoName"), value: profile.name },
    { label: t("infoLocation"), value: t("locationValue") },
    { label: t("infoEmail"), value: profile.email },
    { label: t("infoEducation"), value: t("educationValue") },
    { label: t("infoLanguages"), value: t("languagesValue") },
  ];

  return (
    <section id="about" className="scroll-mt-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <FadeIn className="space-y-5">
          <div>
            <p className="text-xs font-bold text-[var(--teal)]">{t("aboutEyebrow")}</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#151b31] dark:text-stone-50">
              {t("aboutTitle")}
            </h2>
            <div className="mt-3 h-0.5 w-8 bg-[var(--teal)]" />
          </div>
          <div className="space-y-4 text-[15px] leading-7 text-[#4d596f] dark:text-stone-400">
            <p>{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="card-soft p-6 sm:p-7">
            <ul className="space-y-5">
              {info.map((row) => (
                <li
                  key={row.label}
                  className="grid gap-2 sm:grid-cols-[120px_1fr]"
                >
                  <span className="text-sm font-semibold text-[var(--ink-soft)]">{row.label}:</span>
                  <span className="text-sm text-[#4d596f] dark:text-stone-100">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "./LanguageProvider";
import type { Lang } from "@/data/i18n";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  const btn = (code: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`rounded-full font-semibold transition ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      } ${
        lang === code
          ? "bg-[var(--teal)] text-white shadow-sm shadow-[var(--glow)]"
          : "text-[var(--muted)] hover:bg-white/45 hover:text-[var(--ink)] dark:hover:bg-white/[0.055]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`inline-flex rounded-full border border-[var(--line)] bg-black/[0.02] p-0.5 dark:bg-white/[0.03] ${
        compact ? "" : "w-full justify-center"
      }`}
      role="group"
      aria-label="Language"
    >
      {btn("mn", "MN")}
      {btn("en", "EN")}
    </div>
  );
}

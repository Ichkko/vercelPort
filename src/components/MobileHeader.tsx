"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navKeys } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { useLanguage } from "./LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";
import { useTheme } from "./ThemeProvider";

export function MobileHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <header className="glass sticky top-0 z-40 flex items-center justify-between rounded-none border-x-0 border-t-0 px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <Image
            src="/icho.jpg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover shadow-md"
          />
          <div>
            <p className="text-sm font-bold">{profile.name}</p>
            <p className="text-[11px] text-[var(--muted)]">{t("role")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle compact />
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-[var(--line)] bg-white/45 p-2 text-[var(--muted)] transition hover:text-[var(--ink)] dark:bg-white/[0.045]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-[var(--line)] bg-white/45 p-2 transition hover:text-[var(--teal)] dark:bg-white/[0.045]"
            aria-label="Menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass fixed inset-x-3 top-[68px] z-40 rounded-[20px] p-3 lg:hidden"
          >
            {navKeys.map((link) => {
              const id = link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    active === id
                      ? "bg-[var(--teal)] text-white"
                      : "text-[var(--muted)] hover:bg-black/[0.03] hover:text-[var(--ink)] dark:hover:bg-white/[0.055]"
                  }`}
                >
                  {t(link.key)}
                </a>
              );
            })}
            {/* Portfolio page link */}
            <Link
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] hover:bg-black/[0.03] hover:text-[var(--ink)] dark:hover:bg-white/[0.055]"
            >
              Portfolio
              <span className="rounded-full bg-[var(--teal)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                New
              </span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

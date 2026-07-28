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
import { FolderKanban, Moon, Sun, X, Menu } from "lucide-react";

export function MobileHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg-panel)] px-4 py-3 backdrop-blur-2xl lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Image
              src="/icho.jpg"
              alt="Ichko profile photo"
              width={38}
              height={38}
              className="h-[38px] w-[38px] rounded-full object-cover ring-2 ring-[var(--teal)]/20"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-panel)] bg-emerald-400" />
          </div>
          <div>
            <p className="text-[13px] font-bold leading-tight text-[var(--ink)]">{profile.name}</p>
            <p className="text-[10px] font-mono text-[var(--teal)]">{t("role")}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageToggle compact />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--muted)] transition hover:text-[var(--ink)] dark:bg-white/[0.04]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="h-3.5 w-3.5" strokeWidth={1.8} /> : <Sun className="h-3.5 w-3.5" strokeWidth={1.8} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--muted)] transition hover:text-[var(--teal)] dark:bg-white/[0.04]"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" strokeWidth={2} /> : <Menu className="h-4 w-4" strokeWidth={2} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-3 top-[62px] z-40 overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--bg-panel)] p-2 shadow-xl backdrop-blur-2xl lg:hidden dark:bg-[rgba(5,10,18,0.95)]"
          >
            {navKeys.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center rounded-[10px] px-4 py-2.5 text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[var(--teal)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--teal-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {t(link.key)}
                </a>
              );
            })}
            <Link
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-[10px] px-4 py-2.5 text-[13px] font-medium text-[var(--muted)] transition-all hover:bg-[var(--teal-soft)] hover:text-[var(--ink)]"
            >
              <span className="flex items-center gap-2">
                <FolderKanban className="h-3.5 w-3.5" strokeWidth={1.8} />
                Portfolio
              </span>
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Briefcase,
  Camera,
  Code2,
  FileText,
  FolderKanban,
  Home,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";
import { navKeys } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { useLanguage } from "./LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";
import { useTheme } from "./ThemeProvider";

const icons: Record<string, LucideIcon> = {
  Home,
  About: User,
  Skills: Code2,
  Projects: FolderKanban,
  Experience: Briefcase,
  Contact: Mail,
};

export function Sidebar({ active }: { active: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden w-[290px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--bg-panel)] px-7 py-10 backdrop-blur-2xl lg:flex dark:bg-[rgba(6,11,16,0.88)]"
      style={{ boxShadow: "1px 0 0 var(--line), 8px 0 40px rgba(8,145,178,0.04)" }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div
            className="absolute -inset-1 rounded-full opacity-50 blur-md"
            style={{ background: "linear-gradient(135deg, rgba(8,145,178,0.5), rgba(124,58,237,0.3))" }}
            aria-hidden
          />
          <Image
            src='/assets/images/model-1785171098212.png'
            alt={profile.name}
            width={88}
            height={88}
            className="relative h-22 w-22 rounded-full object-cover ring-2 ring-[var(--teal)]/30"
            priority
          />
        </div>
        <h2 className="mt-3 text-lg font-extrabold tracking-tight text-[var(--ink)]">
          {profile.name}
        </h2>
        <p className="mt-1 font-mono text-xs font-medium text-[var(--teal)]">{t("role")}</p>
      </div>

      <nav className="mt-6 flex-1">
        <ul className="space-y-1">
          {navKeys.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            const Icon = icons[link.icon];
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "text-[var(--teal)]"
                      : "text-[var(--muted)] hover:bg-[var(--teal-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-[10px] bg-[var(--teal-soft)]"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(8,145,178,0.15)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    {Icon && <Icon className="h-4 w-4" strokeWidth={1.6} />}
                    {t(link.key)}
                  </span>
                  {isActive && (
                    <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-4 border-t border-[var(--line)] pt-5">
        <div className="flex items-center justify-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-[8px] p-2 text-[var(--muted)] transition hover:bg-[var(--teal-soft)] hover:text-[var(--teal)]"
            aria-label="GitHub"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z" />
            </svg>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-[8px] p-2 text-[var(--muted)] transition hover:bg-[var(--teal-soft)] hover:text-[var(--teal)]"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="rounded-[8px] p-2 text-[var(--muted)] transition hover:bg-[var(--teal-soft)] hover:text-[var(--teal)]"
            aria-label="Instagram"
          >
            <Camera className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href="/CV.pdf"
            download
            className="rounded-[8px] p-2 text-[var(--muted)] transition hover:bg-[var(--teal-soft)] hover:text-[var(--teal)]"
            aria-label="CV"
          >
            <FileText className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <LanguageToggle />

        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-[10px] border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2.5 text-xs font-semibold transition hover:border-[var(--teal)]/30 dark:bg-white/[0.03]"
          aria-label="Toggle theme"
        >
          <span className="text-[var(--muted)]">
            {theme === "dark" ? t("themeDark") : t("themeLight")}
          </span>
          <span className="relative h-5 w-10 rounded-full bg-[var(--teal-soft)] p-0.5">
            <motion.span
              className="block h-4 w-4 rounded-full bg-[var(--teal)] shadow-sm"
              animate={{ x: theme === "dark" ? 18 : 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            />
          </span>
        </button>
      </div>
    </aside>
  );
}

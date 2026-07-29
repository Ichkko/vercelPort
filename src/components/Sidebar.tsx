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
import Link from "next/link";
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
      className="fixed inset-y-0 left-0 z-30 hidden w-[272px] shrink-0 flex-col border-r border-[rgba(168,85,247,0.1)] bg-[rgba(6,6,14,0.96)] px-6 py-8 backdrop-blur-2xl lg:flex"
      style={{ boxShadow: "1px 0 0 rgba(168,85,247,0.08), 6px 0 40px rgba(0,0,0,0.6)" }}
    >
      {/* ── Profile ── */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-1">
          <div
            className="absolute -inset-[3px] rounded-full opacity-70 blur-lg"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(236,72,153,0.4))" }}
            aria-hidden
          />
          <div
            className="absolute -inset-[1.5px] rounded-full"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(236,72,153,0.35))", opacity: 0.7 }}
            aria-hidden
          />
          <Image
            src='/assets/images/c0ac7376-d408-4ad6-bbb6-3a601a9b6e76-1785171429507.jpg'
            alt={profile.name}
            width={80}
            height={80}
            className="relative h-20 w-20 rounded-full object-cover"
            priority
          />
          {/* Online dot */}
          <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[rgba(6,6,14,0.96)] bg-[var(--neon)]" style={{ boxShadow: "0 0 8px rgba(168,85,247,0.8)" }} />
        </div>
        <h2 className="mt-3 text-[15px] font-bold tracking-tight text-[var(--ink)]">
          {profile.name}
        </h2>
        <p className="mt-0.5 font-mono text-[11px] font-medium text-[var(--neon)] opacity-90">{t("role")}</p>
        
        {/* Status badge */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[rgba(168,85,247,0.2)] bg-[rgba(168,85,247,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[var(--neon)]">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[var(--neon)]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Available for work
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="mt-7 flex-1">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] opacity-60">
          Navigation
        </p>
        <ul className="space-y-0.5">
          {navKeys.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            const Icon = icons[link.icon];
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[var(--neon)]"
                      : "text-[var(--muted)] hover:bg-[rgba(168,85,247,0.08)] hover:text-[var(--ink-soft)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-[10px] bg-[rgba(168,85,247,0.1)]"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.15)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    {Icon && (
                      <span className={`flex h-7 w-7 items-center justify-center rounded-[7px] transition-colors ${isActive ? "bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "bg-[rgba(120,120,200,0.08)] text-[var(--muted)]"}`}>
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                    )}
                    {t(link.key)}
                  </span>
                  {isActive && (
                    <motion.span
                      className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-[var(--neon)]"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </a>
              </li>
            );
          })}
          {/* Portfolio page link */}
          <li>
            <Link
              href="/portfolio"
              className="relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-[var(--muted)] transition-all duration-200 hover:bg-[rgba(168,85,247,0.08)] hover:text-[var(--ink-soft)]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[rgba(120,120,200,0.08)] text-[var(--muted)]">
                  <FolderKanban className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
                Portfolio
              </span>
              <span className="ml-auto rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                New
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className="mt-auto space-y-3 border-t border-[rgba(168,85,247,0.1)] pt-5">
        {/* Social links */}
        <div className="flex items-center justify-center gap-1">
          {[
            { href: profile.github, icon: (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z" />
              </svg>
            ), label: "GitHub" },
            { href: `mailto:${profile.email}`, icon: <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />, label: "Email" },
            { href: profile.instagram, icon: <Camera className="h-3.5 w-3.5" strokeWidth={1.6} />, label: "Instagram" },
            { href: "/CV.pdf", icon: <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />, label: "CV", download: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label !== "Email" && item.label !== "CV" ? "_blank" : undefined}
              rel={item.label !== "Email" && item.label !== "CV" ? "noreferrer" : undefined}
              download={item.label === "CV" ? true : undefined}
              className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--muted)] transition-all hover:bg-[rgba(168,85,247,0.1)] hover:text-[var(--neon)]"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>

        <LanguageToggle />

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-[10px] border border-[rgba(168,85,247,0.12)] bg-[rgba(168,85,247,0.05)] px-3 py-2.5 text-[12px] font-semibold transition-all hover:border-[rgba(168,85,247,0.25)]"
          aria-label="Toggle theme"
        >
          <span className="flex items-center gap-2 text-[var(--muted)]">
            <span>{theme === "dark" ? "🌙" : "☀️"}</span>
            {theme === "dark" ? t("themeDark") : t("themeLight")}
          </span>
          <span className="relative h-5 w-9 rounded-full bg-[rgba(168,85,247,0.15)] p-0.5">
            <motion.span
              className="block h-4 w-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] shadow-sm"
              animate={{ x: theme === "dark" ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            />
          </span>
        </button>
      </div>
    </aside>
  );
}

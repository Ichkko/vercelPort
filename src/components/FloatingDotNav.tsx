"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DotNavProps {
  sections: { id: string; label: string }[];
  active: string;
}

export function FloatingDotNav({ sections, active }: DotNavProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav
      className="fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center gap-3"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        const isHovered = hoveredId === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.92 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mr-3 whitespace-nowrap rounded-[8px] border border-[var(--line)] bg-[var(--bg-elevated)]/95 px-3 py-1.5 text-xs font-semibold text-[var(--ink)] shadow-lg backdrop-blur-xl"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <a
              href={`#${section.id}`}
              aria-label={section.label}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              {/* Active ring */}
              {isActive && (
                <motion.span
                  layoutId="dot-ring"
                  className="absolute inset-0 rounded-full border border-[var(--teal)]/50"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <motion.span
                animate={{
                  scale: isActive ? 1.25 : isHovered ? 1.1 : 1,
                  backgroundColor: isActive
                    ? "var(--teal)"
                    : isHovered
                    ? "rgba(8,145,178,0.5)"
                    : "rgba(8,145,178,0.25)",
                }}
                transition={{ duration: 0.2 }}
                className="block h-2.5 w-2.5 rounded-full"
              />
            </a>
          </div>
        );
      })}
    </nav>
  );
}

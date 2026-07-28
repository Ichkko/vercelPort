"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionVariants: Record<Direction, { x?: number; y?: number; filter?: string }> = {
  up:    { y: 40, filter: "blur(4px)" },
  down:  { y: -40, filter: "blur(4px)" },
  left:  { x: -48, filter: "blur(4px)" },
  right: { x: 48, filter: "blur(4px)" },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial = { opacity: 0, ...directionVariants[direction] };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
        filter: { duration: 0.5, delay },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  className,
  delay = 0,
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right";
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial = {
    opacity: 0,
    x: direction === "left" ? -60 : 60,
    filter: "blur(6px)",
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay,
        filter: { duration: 0.55, delay },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay,
        filter: { duration: 0.5, delay },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.09,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── NEW: Reveal with clip-path wipe ── */
export function RevealWipe({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const clipMap: Record<string, { hidden: string; visible: string }> = {
    up:    { hidden: "inset(100% 0% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
    down:  { hidden: "inset(0% 0% 100% 0%)", visible: "inset(0% 0% 0% 0%)" },
    left:  { hidden: "inset(0% 100% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
    right: { hidden: "inset(0% 0% 0% 100%)", visible: "inset(0% 0% 0% 0%)" },
  };

  return (
    <motion.div
      className={className}
      initial={{ clipPath: clipMap[direction].hidden, opacity: 0 }}
      whileInView={{ clipPath: clipMap[direction].visible, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── NEW: Float animation for decorative elements ── */
export function FloatIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── NEW: Stagger with spring physics ── */
export const springStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const springItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

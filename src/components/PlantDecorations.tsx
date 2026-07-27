"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Grow on scroll ─── */
export function GrowOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformOrigin: "bottom center" }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Leaf sprout on scroll ─── */
export function LeafSprout({
  className = "",
  delay = 0,
  color = "rgba(34,197,94,0.55)",
}: {
  className?: string;
  delay?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: "bottom center" }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Stem */}
        <motion.path
          d="M30 115 Q28 80 30 50 Q32 30 30 10"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.0, delay: delay + 0.1, ease: "easeOut" }}
        />
        {/* Left leaf */}
        <motion.path
          d="M30 65 Q10 55 8 35 Q20 38 30 65Z"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.8 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "30px 65px" }}
        />
        {/* Right leaf */}
        <motion.path
          d="M30 45 Q50 35 52 15 Q40 18 30 45Z"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.8 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "30px 45px" }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── Swaying tall plant (corner decoration) ─── */
export function SwayingPlant({
  className = "",
  color = "rgba(34,197,94,0.4)",
  size = 120,
  swayAmount = 6,
  duration = 4,
  delay = 0,
  flip = false,
}: {
  className?: string;
  color?: string;
  size?: number;
  swayAmount?: number;
  duration?: number;
  delay?: number;
  flip?: boolean;
}) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size * 1.8,
        transformOrigin: "bottom center",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      animate={{
        rotate: [0, swayAmount, -swayAmount * 0.6, swayAmount * 0.4, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }}
    >
      <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main stem */}
        <path d="M40 155 Q38 120 40 90 Q42 60 40 20" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Leaf 1 - left low */}
        <path d="M40 120 Q15 105 10 80 Q25 85 40 120Z" fill={color} opacity="0.9" />
        {/* Leaf 2 - right mid */}
        <path d="M40 95 Q65 78 68 52 Q53 58 40 95Z" fill={color} opacity="0.85" />
        {/* Leaf 3 - left high */}
        <path d="M40 70 Q18 55 14 30 Q30 36 40 70Z" fill={color} opacity="0.8" />
        {/* Leaf 4 - right top */}
        <path d="M40 45 Q60 30 62 8 Q48 14 40 45Z" fill={color} opacity="0.75" />
        {/* Small tip leaf */}
        <path d="M40 20 Q50 10 48 0 Q38 6 40 20Z" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

/* ─── Swaying grass blades ─── */
export function GrassBlades({
  className = "",
  color = "rgba(34,197,94,0.35)",
  count = 5,
}: {
  className?: string;
  color?: string;
  count?: number;
}) {
  const blades = Array.from({ length: count }, (_, i) => ({
    x: 10 + i * (80 / count),
    height: 30 + Math.sin(i * 1.7) * 15,
    duration: 2.5 + i * 0.4,
    delay: i * 0.2,
    amount: 8 + i * 2,
  }));

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {blades.map((b, i) => (
          <motion.path
            key={i}
            d={`M${b.x} 58 Q${b.x - 4} ${58 - b.height * 0.5} ${b.x + 2} ${58 - b.height}`}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            style={{ transformOrigin: `${b.x}px 58px` }}
            animate={{
              rotate: [0, b.amount, -b.amount * 0.5, b.amount * 0.3, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Floating leaf particle ─── */
export function FloatingLeaf({
  className = "",
  color = "rgba(34,197,94,0.4)",
  size = 20,
  delay = 0,
}: {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -18, 0],
        rotate: [0, 15, -10, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M12 22 Q2 12 4 4 Q12 2 20 8 Q22 16 12 22Z" fill={color} />
        <path d="M12 22 Q12 12 12 4" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ─── Vine / trailing plant ─── */
export function VineDecoration({
  className = "",
  color = "rgba(34,197,94,0.3)",
  width = 200,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px 0px" });

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none select-none ${className}`}
      style={{ width, height: 60 }}
    >
      <svg viewBox={`0 0 ${width} 60`} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          d={`M0 30 Q${width * 0.15} 10 ${width * 0.3} 30 Q${width * 0.45} 50 ${width * 0.6} 30 Q${width * 0.75} 10 ${width} 30`}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Small leaves along vine */}
        {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
          <motion.ellipse
            key={i}
            cx={width * pos}
            cy={i % 2 === 0 ? 18 : 42}
            rx={8}
            ry={5}
            fill={color}
            transform={`rotate(${i % 2 === 0 ? -30 : 30} ${width * pos} ${i % 2 === 0 ? 18 : 42})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.85 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${width * pos}px ${i % 2 === 0 ? 18 : 42}px` }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

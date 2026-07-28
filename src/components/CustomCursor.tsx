"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import React from "react";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  type: number;
  opacity: number;
}

const LEAF_SVGS: Array<(color: string) => React.ReactElement> = [
  (color: string) => (
    <svg viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22C10 22 2 16 2 9C2 5 5.5 2 10 2C14.5 2 18 5 18 9C18 16 10 22 10 22Z" fill={color} opacity="0.85" />
      <path d="M10 22L10 6" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ),
  (color: string) => (
    <svg viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 20C9 20 1 13 3 7C5 2 9 1 9 1C9 1 13 2 15 7C17 13 9 20 9 20Z" fill={color} opacity="0.8" />
    </svg>
  ),
  (color: string) => (
    <svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16C8 16 1 11 2 6C3 2 8 1 8 1C8 1 13 2 14 6C15 11 8 16 8 16Z" fill={color} opacity="0.9" />
      <path d="M8 16L8 5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  ),
];

const COLORS = [
  "rgba(34,197,94,0.75)",
  "rgba(74,222,128,0.7)",
  "rgba(134,239,172,0.65)",
  "rgba(16,185,129,0.7)",
  "rgba(167,243,208,0.6)",
  "rgba(248,187,208,0.7)",
  "rgba(253,224,71,0.6)",
];

let particleId = 0;

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);
  const clickingRef = useRef(false);
  const imageHoverRef = useRef(false);
  const [state, setState] = useState({ visible: false, hovering: false, clicking: false, imageHover: false });
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const spawnParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 120) return;
    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 18) return;

    lastSpawnRef.current = now;
    lastPosRef.current = { x, y };

    const particle: TrailParticle = {
      id: particleId++,
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.4,
      type: Math.floor(Math.random() * 3),
      opacity: 1,
    };

    setTrail((prev) => [...prev.slice(-8), particle]);
    setTimeout(() => {
      setTrail((prev) => prev.filter((p) => p.id !== particle.id));
    }, 600);
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      spawnParticle(mouseX, mouseY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setState((s) => ({ ...s, visible: true }));
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      setState((s) => ({ ...s, visible: false }));
    };

    const onEnter = () => {
      visibleRef.current = true;
      setState((s) => ({ ...s, visible: true }));
    };

    const onDown = () => {
      clickingRef.current = true;
      setState((s) => ({ ...s, clicking: true }));
    };

    const onUp = () => {
      clickingRef.current = false;
      setState((s) => ({ ...s, clicking: false }));
    };

    const animate = () => {
      const ease = 0.1;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(animId);
    };
  }, [spawnParticle]);

  const { visible, clicking } = state;

  return (
    <>
      {/* Trail particles */}
      <div className="pointer-events-none fixed inset-0 z-[9997] hidden md:block" aria-hidden>
        {trail.map((p) => {
          const color = COLORS[(p.id + p.type) % COLORS.length];
          const size = 8 + p.scale * 8;
          const LeafSvg = LEAF_SVGS[p.type];
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: p.x,
                top: p.y,
                width: size,
                height: size,
                transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
                animation: `leafTrailFade 0.6s ease-out forwards`,
                opacity: 0.55,
              }}
            >
              {LeafSvg(color)}
            </div>
          );
        })}
      </div>

      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: clicking ? "5px" : "9px",
          height: clicking ? "5px" : "9px",
          borderRadius: "50%",
          background: "var(--teal)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s, width 0.15s cubic-bezier(0.22,1,0.36,1), height 0.15s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          boxShadow: "0 0 12px var(--glow), 0 0 24px var(--glow)",
        }}
      />

      {/* Ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{
          width: clicking ? "26px" : "38px",
          height: clicking ? "26px" : "38px",
          borderRadius: "50%",
          border: "1.5px solid rgba(15,159,149,0.45)",
          background: "transparent",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s, width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      />
    </>
  );
}

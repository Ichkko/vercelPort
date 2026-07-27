"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);
  const clickingRef = useRef(false);
  const [state, setState] = useState({ visible: false, hovering: false, clicking: false });

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

      const target = e.target as HTMLElement;
      const isHover =
        !!target.closest("a") ||
        !!target.closest("button") ||
        !!target.closest("[data-cursor-hover]");

      if (!visibleRef.current || hoveringRef.current !== isHover) {
        visibleRef.current = true;
        hoveringRef.current = isHover;
        setState((s) => ({ ...s, visible: true, hovering: isHover }));
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
  }, []); // empty deps — no re-registration

  const { visible, hovering, clicking } = state;

  return (
    <>
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
          width: hovering ? "56px" : clicking ? "26px" : "38px",
          height: hovering ? "56px" : clicking ? "26px" : "38px",
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "var(--teal)" : "rgba(15,159,149,0.45)"}`,
          background: hovering ? "rgba(15,159,149,0.07)" : "transparent",
          opacity: visible ? 1 : 0,
          transition:
            "opacity 0.25s, width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, background 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}

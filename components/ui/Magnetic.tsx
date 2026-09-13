"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the element chases the cursor (0–1). */
  strength?: number;
};

/**
 * Magnetic — a wrapper that pulls its child toward the cursor while hovered
 * and springs it back on leave. Applied to CTAs so buttons feel tactile, not
 * static. Skipped under prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    gsap.to(el, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </div>
  );
}
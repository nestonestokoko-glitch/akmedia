"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/cn";

type TiltCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onMouseMove" | "onMouseLeave" | "className"> & {
  className?: string;
  /** Max tilt in degrees each direction. */
  max?: number;
  /** Hover scale. */
  scale?: number;
  /** Show the moving radial glare. */
  glare?: boolean;
};

/**
 * TiltCard — 3D perspective tilt that follows the cursor, with a moving
 * radial glare. transformPerspective keeps the bevel believable without
 * needing a perspective parent. Fully skips under prefers-reduced-motion.
 *
 * This is the hover personality for every card on the site — creator cards,
 * principle strips stay flat (they're rows, not cards) but anything that
 * reads as a card gets this treatment sparingly.
 */
export default function TiltCard({
  children,
  className,
  max = 7,
  scale = 1.015,
  glare = true,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    gsap.to(el, {
      rotateY: (px - 0.5) * 2 * max,
      rotateX: (0.5 - py) * 2 * max,
      scale,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
    });

    if (glareRef.current) {
      gsap.set(glareRef.current, {
        opacity: 1,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.14), transparent 55%)`,
      });
    }
  }

  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transformPerspective: 900,
      duration: 0.7,
      ease: "power3.out",
    });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.5 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("relative will-change-transform [transform-style:preserve-3d]", className)}
      {...rest}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
        />
      )}
    </div>
  );
}
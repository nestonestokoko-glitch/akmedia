"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";

export type GsapVariant = "rise" | "scale" | "blur";

const FROM: Record<GsapVariant, gsap.TweenVars> = {
  rise: { autoAlpha: 0, y: 40 },
  scale: { autoAlpha: 0, scale: 0.94 },
  blur: { autoAlpha: 0, y: 24, filter: "blur(10px)" },
};

const TO: Record<GsapVariant, gsap.TweenVars> = {
  rise: { autoAlpha: 1, y: 0 },
  scale: { autoAlpha: 1, scale: 1 },
  blur: { autoAlpha: 1, y: 0, filter: "blur(0px)" },
};

type GsapRevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Which entrance choreography to use. Default `rise`. */
  variant?: GsapVariant;
  /** Override the vertical offset (rise/blur). */
  y?: number;
  /** Override the horizontal offset (default 0). */
  x?: number;
  delay?: number;
  duration?: number;
  /** When set, animates `[data-gsap-item]` descendants with this gap. */
  stagger?: number;
  threshold?: number;
  id?: string;
};

/**
 * GsapReveal — the one scroll-entrance primitive for the whole site.
 *
 * Content is VISIBLE in the DOM by default (SSR / no-JS / reduced-motion all
 * render readable text). When JS runs, the element's "hidden" state only
 * lives inside gsap.set, exactly like SplitText, so nothing can ever strand
 * invisible. A single IntersectionObserver plays the entrance once and then
 * disconnects. `stagger` fans out `[data-gsap-item]` children (cards, rows).
 *
 * `gsap.context() + ctx.revert()` keeps StrictMode's double-mount clean.
 */
export default function GsapReveal({
  as: Tag = "div",
  className,
  children,
  variant = "rise",
  y,
  x,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  threshold = 0.18,
  id,
}: GsapRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = el.querySelectorAll<HTMLElement>("[data-gsap-item]");
    const targets = stagger && items.length ? items : el;

    const from = { ...FROM[variant] };
    if (typeof y === "number") from.y = y;
    if (typeof x === "number") from.x = x;

    let played = false;
    const ctx = gsap.context(() => {
      gsap.set(targets, from);

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || played) return;
          played = true;
          gsap.to(targets, {
            ...TO[variant],
            duration,
            delay,
            ease: "expo.out",
            ...(stagger && items.length ? { stagger } : {}),
          });
          io.disconnect();
        },
        { threshold, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    }, el);

    return () => ctx.revert();
  }, [variant, y, x, delay, duration, stagger, threshold]);

  return (
    <Tag ref={ref as never} id={id} className={className}>
      {children}
    </Tag>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/cn";

type SplitTextProps = {
  /** Full heading text (one string — words are split automatically). */
  text: string;
  /** Word(s) that should render in the serif-italic Primary Blue accent. */
  accent?: string | string[];
  className?: string;
  /** Element to render. Defaults to h2 so pages keep one h1. */
  as?: "h1" | "h2" | "h3";
  startDelay?: number;
  wordGap?: number;
  /** Extra spacing between words, in em. Defaults to 0.28 across all headings. */
  wordSpacing?: number;
};

const strip = (s: string) => s.replace(/[.,;:!?'"—]/g, "").toLowerCase();

/**
 * GSAP split-text reveal for every heading, mirroring the reference hero's
 * `animation="large-heading"` treatment.
 *
 * The text is split into word spans (`gsap_split_word1 … gsap_split_wordN`),
 * each clipped inside an overflow-hidden wrapper. A single GSAP `fromTo`
 * tween staggers each word up `yPercent:112 → 0` when the heading scrolls
 * into view.
 *
 * Safety rails:
 *  · Words are VISIBLE in the DOM by default — the hidden state only lives
 *    inside the tween's `from`, so SSR / no-JS / reduced-motion all render
 *    readable text.
 *  · `gsap.context()` + `ctx.revert()` — the official React pattern — so
 *    StrictMode's double-mount can never strand words at yPercent:112.
 *  · Column words get a real space text node between them (inline-block
 *    spans collapse otherwise).
 *  · Screen readers get a clean `aria-label`; word spans are aria-hidden.
 */
export default function SplitText({
  text,
  accent,
  className,
  as: Tag = "h2",
  startDelay = 0.15,
  wordGap = 0.05,
  wordSpacing = 0.28,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-gsap-word]");
    if (!words.length) return;

    // Paused until the heading scrolls into view; plays once then disconnects.
    let started = false;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.out", duration: 0.85 },
        delay: startDelay,
      });
      // Atomic hide + reveal via fromTo: never leaves words stranded hidden.
      tl.fromTo(
        words,
        { yPercent: 112 },
        { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: wordGap }
      );

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started) {
            started = true;
            tl.play();
            io.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(el);
    }, el);

    return () => ctx.revert();
  }, [startDelay, wordGap]);

  const accentWords = accent
    ? (Array.isArray(accent) ? accent : [accent])
        .flatMap((a) => a.split(" "))
        .map(strip)
    : [];

  const words = text.split(" ").map((word, i) => ({
    key: i,
    word,
    isAccent: accentWords.includes(strip(word)),
  }));

  return (
    <Tag
      ref={ref as never}
      {...({ animation: "large-heading" } as Record<string, string>)}
      aria-label={text}
      className={cn(className)}
    >
      {words.map((w) => (
        <span
          key={w.key}
          aria-hidden
          style={
            wordSpacing && w.key < words.length - 1
              ? { marginRight: `${wordSpacing}em` }
              : undefined
          }
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <span
            data-gsap-word
            className={cn(
              "gsap_split_word",
              `gsap_split_word${w.key + 1}`,
              "inline-block will-change-transform",
              w.isAccent && "type-accent text-blue"
            )}
          >
            {w.word}
          </span>
          {w.key < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
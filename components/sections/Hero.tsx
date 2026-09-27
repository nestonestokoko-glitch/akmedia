"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "@/components/ui/SplitText";
import SlideButton from "@/components/ui/SlideButton";
import Magnetic from "@/components/ui/Magnetic";
import { brandMarks } from "@/lib/data";

/**
 * Hero — "The Editor's Desk" (centered).
 * Centered editorial composition: the headline rises word-by-word in
 * place (GSAP split-text), then a GSAP entrance timeline steers the deck,
 * the dual CTAs (magnetic) and the live ledger in on one sequence. The
 * decorative glow orbs drift slowly in the background (decorative).
 * Real numerals only — never fabricated content.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        q("[data-hero='kicker']"),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          q("[data-hero='sub']"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.85
        )
        .fromTo(
          q("[data-hero='cta'] > *"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          1.0
        )
        .fromTo(
          q("[data-hero='credits']"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          1.2
        );

      // Ambient drift — the luminous glow orbs breathe dynamically behind the composition
      gsap.to(q("[data-hero='glow']"), {
        y: -32,
        x: 22,
        scale: 1.1,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(q("[data-hero='glow2']"), {
        y: 28,
        x: -20,
        scale: 1.08,
        duration: 8.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(q("[data-hero='glow3']"), {
        y: -24,
        x: -26,
        scale: 1.09,
        duration: 9.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, []);



  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex w-full min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* 10000% Richer Luminous Aurora Gradient Backdrop */}
      {/* Base radial gradient wash across top hemisphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_125%_95%_at_50%_-15%,rgba(82,169,229,0.52)_0%,rgba(124,191,239,0.36)_28%,rgba(102,129,86,0.32)_52%,rgba(0,0,0,0.98)_85%)]"
      />

      {/* Primary Luminous Center Spotlight (Deep Blue-Bright Aura) */}
      <div
        data-hero="glow"
        aria-hidden
        className="pointer-events-none absolute -top-36 left-1/2 h-[760px] w-[1120px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-bright/65 via-blue/50 to-transparent blur-[120px]"
      />

      {/* Vibrant Mint Aurora Wing (Right Side) */}
      <div
        data-hero="glow2"
        aria-hidden
        className="pointer-events-none absolute top-8 -right-36 h-[680px] w-[820px] rounded-full bg-gradient-to-bl from-mint-bright/60 via-mint/45 to-transparent blur-[130px]"
      />

      {/* Radiant Electric Blue Wing (Left Side) */}
      <div
        data-hero="glow3"
        aria-hidden
        className="pointer-events-none absolute top-16 -left-40 h-[640px] w-[780px] rounded-full bg-gradient-to-tr from-blue/60 via-blue-bright/45 to-transparent blur-[130px]"
      />

      {/* Central Core Light Radiance (Directly behind main headline) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 left-1/2 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-bright/45 via-mint-bright/40 to-blue/45 blur-[85px]"
      />

      {/* High-Contrast Illuminated Grid Lines */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-75 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_25%,black_45%,transparent_85%)]"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative w-full">
        <div className="container-px mx-auto max-w-[1400px] py-20 sm:py-28 lg:py-32">
          {/* ----------------------- Centered editorial lead ----------------------- */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* LIVE kicker */}
            <p
              data-hero="kicker"
              className="mb-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-mist"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-blue" />
              </span>
              Live — publishing trust worth following
            </p>

            {/* Split-text headline — words rise one by one, in place */}
            <SplitText
              as="h1"
              text="Where Creators Grow Fast & Brands Scale Smart"
              accent="Fast & Brands Scale Smart"
              wordSpacing={0.28}
              className="mx-auto max-w-[22ch] text-balance text-center text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white"
            />

            {/* Sub-deck */}
            <p
              data-hero="sub"
              className="mt-7 max-w-[46ch] text-balance text-base leading-relaxed text-mist sm:text-lg"
            >
              AK Media connects ambitious brands with verified creators —
              strategy, content, delivery and reporting, end to end. Not a
              template campaign, a publisher's promise.
            </p>

            {/* Dual-layer sliding CTAs — magnetic pull */}
            <div data-hero="cta" className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.3}>
                <SlideButton href="#contact" size="lg">
                  Start a Campaign
                  <span
                    aria-hidden
                    className="ml-2.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </SlideButton>
              </Magnetic>
              <Magnetic strength={0.3}>
                <SlideButton href="#creators" variant="mint" size="lg">
                  Join the Network
                </SlideButton>
              </Magnetic>
            </div>

            {/* Editorial brand credits */}
            <p
              data-hero="credits"
              className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-dust"
            >
              <span className="mr-1 text-white/50">Brands on the record:</span>
              {brandMarks.map((mark, i) => (
                <span key={mark} className="flex items-center gap-5">
                  <span className={i === brandMarks.length - 1 ? "text-white/70" : undefined}>
                    {mark}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
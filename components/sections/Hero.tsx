"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "@/components/ui/SplitText";
import SlideButton from "@/components/ui/SlideButton";
import Magnetic from "@/components/ui/Magnetic";
import Counter from "@/components/ui/Counter";
import { brandMarks, campaigns, stats } from "@/lib/data";

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
          q("[data-hero='ledger']"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          1.15
        )
        .fromTo(
          q("[data-hero='row']"),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 },
          "-=0.35"
        )
        .fromTo(
          q("[data-hero='credits']"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          1.3
        );

      // Ambient drift — the glow orbs breathe slowly behind the composition
      gsap.to(q("[data-hero='glow']"), {
        y: -26,
        x: 16,
        scale: 1.06,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(q("[data-hero='glow2']"), {
        y: 20,
        x: -12,
        scale: 1.04,
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const tickerRows = [
    { value: stats[0].value, suffix: stats[0].suffix, label: "Creators in the network" },
    { value: stats[1].value, suffix: stats[1].suffix, label: "Brands paid for reach" },
    { value: stats[2].value, suffix: stats[2].suffix, label: "Campaigns delivered" },
    {
      value: parseInt(campaigns[0].result, 10),
      suffix: "%",
      label: "Engagement lift · Filmora",
      accent: true,
    },
  ];

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex w-full min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* Backdrop: grid + glow + grain */}
      <div
        aria-hidden
        className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black_35%,transparent_75%)]"
      />
      <div
        data-hero="glow"
        aria-hidden
        className="absolute -top-40 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-blue/15 blur-[140px]"
      />
      <div
        data-hero="glow2"
        aria-hidden
        className="absolute -bottom-48 -right-40 h-[460px] w-[560px] rounded-full bg-mint/10 blur-[150px]"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

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

            {/* Live data strip — real figures, horizontal ledger */}
            <div
              data-hero="ledger"
              className="mt-16 w-full border-t border-line-2 pt-8"
            >
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-dust">
                The ledger — live
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-line-2">
                {tickerRows.map((row) => (
                  <li
                    key={row.label}
                    data-hero="row"
                    className="flex flex-col items-center gap-2 px-2 text-center sm:px-5"
                  >
                    <span
                      className={
                        row.accent
                          ? "num-lock text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-none tracking-[-0.04em] text-blue-bright"
                          : "num-lock text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-none tracking-[-0.04em] text-white"
                      }
                    >
                      <Counter value={row.value} suffix={row.suffix} />
                    </span>
                    <span className="max-w-[16ch] text-xs leading-snug text-mist">
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-center justify-center gap-2.5 text-xs text-mint-bright">
                <span aria-hidden className="size-1.5 rounded-full bg-mint" />
                Every creator verified before a campaign ships.
              </p>
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
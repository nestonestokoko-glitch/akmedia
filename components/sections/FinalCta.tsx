"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SlideButton from "@/components/ui/SlideButton";
import SplitText from "@/components/ui/SplitText";
import Magnetic from "@/components/ui/Magnetic";

/**
 * FinalCta — "Editorial Call to Action".
 * The closing black moment: an oversized split-text headline over a
 * centered radial blue glow and faint grain, with a thin blue progress
 * hairline at the very edge. No card, no border — just type and light.
 * The hairline draws itself in, the glow breathes, and the sub + CTAs
 * (magnetic) rise behind the headline's own split-word entrance.
 */
export default function FinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {}, el);
    let played = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;

        ctx.add(() => {
          const q = gsap.utils.selector(el);

          // Thin blue hairline draws itself across the top edge.
          gsap.fromTo(
            q("[data-cta='hairline']"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.4, ease: "expo.out", transformOrigin: "0 50%" }
          );

          // The radial glows breathe slowly behind the type (decorative).
          gsap.to(q("[data-cta='glow1']"), {
            scale: 1.08,
            opacity: 0.85,
            duration: 6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
          gsap.to(q("[data-cta='glow2']"), {
            scale: 1.15,
            opacity: 0.7,
            duration: 8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });

          // Sub + CTA row rise behind the headline's split-word entrance.
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .fromTo(
              q("[data-cta='sub']"),
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.7 },
              0.4
            )
            .fromTo(
              q("[data-cta='actions'] > *"),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
              0.55
            );
        });

        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      {/* Thin blue progress hairline at the very edge */}
      <span
        data-cta="hairline"
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-blue/60"
      />

      {/* Centered radial blue glow + grain */}
      <div
        data-cta="glow1"
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/10 blur-[140px] sm:size-[820px]"
      />
      <div
        data-cta="glow2"
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/15 blur-[100px]"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="container-px relative mx-auto max-w-[1400px] text-center">
        <SplitText
          as="h2"
          text="Influence that actually moves people."
          accent="actually moves people"
          className="mx-auto max-w-[18ch] text-balance text-[clamp(2.5rem,7.5vw,5.5rem)] font-medium leading-[1.03] tracking-[-0.04em] text-white"
        />
        <p
          data-cta="sub"
          className="mx-auto mt-7 max-w-[44ch] text-balance text-base leading-relaxed text-mist sm:text-lg"
        >
          Join the network of brands and creators achieving real results.
        </p>
        <div data-cta="actions" className="mt-10 flex flex-wrap justify-center gap-4">
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
            <SlideButton href="#contact" variant="mint" size="lg">
              Join the Creator Network
            </SlideButton>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
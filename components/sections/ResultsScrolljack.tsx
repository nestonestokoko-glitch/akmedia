"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/cn";
import { campaigns } from "@/lib/data";

/**
 * ResultsScrolljack — the campaign result panels, pinned and slid sideways by
 * vertical scroll. Lives inside the creator section so "the creators behind
 * the results" lead straight into the results themselves.
 *
 * Vertical scroll drives horizontal movement: a tall h-[220vh] scrub room with
 * a sticky h-[100svh] viewport, the track translating by the measured overflow
 * (two w-screen panels → one viewport of travel). A hairline tracks progress.
 *
 * `prefers-reduced-motion` renders the panels as a plain vertical stack — no
 * pinning, no sliding (WCAG 2.3.3).
 */
export default function ResultsScrolljack() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Measure how far the track overflows the viewport so the rail can rest
  // flush at the end (two w-screen panels → exactly one viewport of travel).
  const [dx, setDx] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const overflow = el.scrollWidth - window.innerWidth;
      setDx(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Note: MotionValue<number> is invariant vs the style union; widen at the type
  // level only — the runtime value stays a MotionValue, so the rail still animates.
  const x = useTransform(scrollYProgress, [0, 1], [0, -dx]) as MotionValue<string | number>;

  // Reduced motion: honest vertical stack, no pinning or sliding.
  if (reduce) {
    return (
      <div className="flex flex-col">
        {campaigns.map((campaign, i) => (
          <Lockup key={campaign.id} campaign={campaign} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div ref={pinRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden bg-ink-2">
        {/* Horizontal track — 2 × 100vw panels */}
        <div
          ref={trackRef}
          // framer-motion's transform MotionValue types are invariant; the
          // runtime value is still a MotionValue, so the rail binds + animates
          // normally. Cast contained to this one style bag.
          style={{ x } as never}
          className="flex h-full w-max will-change-transform"
        >
          {campaigns.map((campaign, i) => (
            <div
              key={campaign.id}
              className="relative flex h-full w-screen shrink-0 items-center border-l border-line-2/60 first:border-l-0"
            >
              <Lockup campaign={campaign} index={i} />
            </div>
          ))}
        </div>

        {/* Progress hairline + hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex items-center justify-between gap-4">
          <span className="container-px text-[11px] font-medium uppercase tracking-[0.22em] text-dust">
            Scroll to explore →
          </span>
          <div className="container-px flex items-center gap-3">
            <span className="num-lock hidden text-[11px] uppercase tracking-[0.22em] text-dust sm:inline">
              Cinematic / results
            </span>
            <motion.span
              style={{ scaleX: scrollYProgress }}
              aria-hidden
              className="block h-px w-28 origin-right bg-blue-bright"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Lockup({
  campaign,
  index,
}: {
  campaign: (typeof campaigns)[number];
  index: number;
}) {
  const elRef = useRef<HTMLElement>(null);

  // Each panel is its own show: when it slides into the viewport, the lockup
  // composes itself — wash settles, headline rises, and the result numeral
  // (the hero) lands last with a settle, then breathes slowly (editorial life).
  // Fires once per panel, skipped under prefers-reduced-motion.
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {}, el);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        ctx.add(() => {
          const q = gsap.utils.selector(el);
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .fromTo(
              q("[data-lockup='wash']"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 1.1 }
            )
            .fromTo(
              q("[data-lockup='case']"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.7 },
              0.15
            )
            .fromTo(
              q("[data-lockup='meta']"),
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              0.25
            )
            .fromTo(
              q("[data-lockup='headline']"),
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, duration: 0.75 },
              0.35
            )
            .fromTo(
              q("[data-lockup='actions'] > *"),
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 },
              0.45
            )
            .fromTo(
              q("[data-lockup='numeral']"),
              { autoAlpha: 0, y: 52, scale: 0.98 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out" },
              0.55
            )
            .fromTo(
              q("[data-lockup='resulttext']"),
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              0.7
            );

          // The numeral keeps breathing slowly after it has landed.
          gsap.to(q("[data-lockup='numeral']"), {
            y: -10,
            duration: 3.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 2.2,
          });
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <article ref={elRef} className="relative h-full min-h-[70vh] w-full overflow-hidden">
      {/* Unique gradient wash + visible grid */}
      <div
        data-lockup="wash"
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", campaign.gradient)}
      />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-20" />

      {/* Edge hairlines */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-blue/50" />
      <span aria-hidden className="absolute bottom-8 left-0 h-px w-24 bg-mint/50" />

      {/* Editorial index label */}
      <span
        data-lockup="case"
        className="num-lock absolute left-4 top-6 text-xs font-medium tracking-[0.24em] text-dust sm:left-8 sm:top-8"
      >
        CASE {String(index + 1).padStart(2, "0")} / {String(campaigns.length).padStart(2, "0")}
      </span>

      <div className="container-px relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Type lockup */}
          <div className="max-w-2xl">
            <div
              data-lockup="meta"
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-dust"
            >
              <span className="text-white">{campaign.brand}</span>
              <span aria-hidden>×</span>
              <span>{campaign.creator}</span>
            </div>

            <h3
              data-lockup="headline"
              className="mt-6 text-balance text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white"
            >
              {campaign.headline}
            </h3>

            <div data-lockup="actions" className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-mint/50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-mint-bright">
                {campaign.type}
              </span>
              <a
                href="#contact"
                className="group/link inline-flex items-center gap-2.5 text-sm font-medium text-white underline-offset-4 hover:text-blue-bright hover:underline"
                aria-label={`Read the ${campaign.brand} case study — start your own campaign`}
              >
                Read case study
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Result numeral — the hero of the slide */}
          <div className="relative grid justify-items-start gap-0 lg:justify-items-end">
            <p
              data-lockup="numeral"
              className="num-lock select-none text-[clamp(4rem,14vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.05em] text-blue-bright"
              aria-label={`${campaign.result} — ${campaign.resultLabel}`}
            >
              {campaign.result}
            </p>
            <div
              data-lockup="resulttext"
              className="mt-5 border-t border-blue/40 pt-4"
            >
              <p className="max-w-[24ch] text-sm leading-relaxed text-mist">
                {campaign.resultLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
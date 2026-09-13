"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";
import { brandProcess, creatorProcess } from "@/lib/data";
import { cn } from "@/lib/cn";

const tracks = [
  {
    kicker: "For Brands",
    color: "blue",
    node: "border-blue/60 text-blue",
    line: "bg-blue/30",
    steps: brandProcess,
  },
  {
    kicker: "For Creators",
    color: "mint",
    node: "border-mint/60 text-mint",
    line: "bg-mint/30",
    steps: creatorProcess,
  },
] as const;

/**
 * Process — "Two Track Lines".
 * A centered editorial header opens two color-coded vertical timelines
 * (blue = brand journey, mint = creator journey) joined on desktop by a
 * single shared horizontal axis hairline that draws itself in. Each track
 * enters from its own side (GSAP), its step rows cascading one by one.
 */
export default function Process() {
  const axisRef = useRef<HTMLSpanElement>(null);

  // The shared axis hairline draws itself left→right as the section rises.
  useEffect(() => {
    const el = axisRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        gsap.fromTo(
          el,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "expo.out", transformOrigin: "0 50%" }
        );
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="relative overflow-hidden py-section">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Centered editorial header (a deliberate asymmetry vs the rest of the page) */}
        <GsapReveal y={20} threshold={0.2}>
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
              How it works
            </p>
            <SplitText
              as="h2"
              text="A clear path, start to finish."
              className="mx-auto max-w-[18ch] text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
            />
          </div>
        </GsapReveal>

        {/* The shared axis line (desktop only) */}
        <div className="relative mt-20 lg:mt-24">
          <span
            ref={axisRef}
            aria-hidden
            className="absolute left-[7%] right-[7%] top-0 hidden h-px bg-line-2 lg:block"
          />

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            {tracks.map((track, t) => (
              <GsapReveal
                key={track.kicker}
                as="div"
                y={0}
                x={t === 0 ? -48 : 48}
                duration={0.9}
                threshold={0.15}
              >
                {/* Track head on the axis line */}
                <div data-gsap-item className="mb-10 flex items-center gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      "size-4 shrink-0 rounded-full border-2 bg-ink",
                      track.node
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm font-semibold uppercase tracking-[0.24em]",
                      track.color === "blue" ? "text-blue" : "text-mint"
                    )}
                  >
                    {track.kicker}
                  </p>
                </div>

                <ol className="space-y-0">
                  {track.steps.map((step, i) => (
                    <li
                      key={step.n}
                      data-gsap-item
                      className="relative flex gap-5 pb-8 pl-8 last:pb-0"
                    >
                      {/* Vertical connector + node */}
                      <span className="absolute left-0 top-0 flex h-full flex-col items-center">
                        <span
                          aria-hidden
                          className={cn(
                            "size-3 shrink-0 rounded-full border-2 bg-ink",
                            track.node
                          )}
                        />
                        {i < track.steps.length - 1 && (
                          <span
                            aria-hidden
                            className={cn("mt-1 w-px flex-1", track.line)}
                          />
                        )}
                      </span>

                      <span className="pt-1.5">
                        <span
                          className={cn(
                            "num-lock block text-[11px] font-medium uppercase tracking-[0.22em]",
                            track.color === "blue" ? "text-blue" : "text-mint"
                          )}
                        >
                          Step {step.n}
                        </span>
                        <span className="mt-1.5 block text-base font-medium tracking-tight text-white">
                          {step.label}
                        </span>
                        <span className="mt-1 block max-w-[38ch] text-sm leading-relaxed text-mist">
                          {step.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </GsapReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
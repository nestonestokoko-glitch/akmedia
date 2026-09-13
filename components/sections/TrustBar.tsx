"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { brandMarks, stats } from "@/lib/data";
import Counter from "@/components/ui/Counter";
import GsapReveal from "@/components/ui/GsapReveal";

/**
 * Trust — Large-Numeral Fact Row.
 * A full-bleed editorial strip of real figures typeset as display shapes,
 * separated by vertical hairlines. The brand marquee and label rise in,
 * the fact cells stagger up, and the blue top hairline draws itself from
 * the left when the row enters view. No cards, no shadows — data is the
 * storytelling (see skill.md §14). On mobile the figures collapse into a
 * 2×2 grid so all four numerals stay visible without sideways scrolling.
 */
export default function TrustBar() {
  const loop = [...brandMarks, ...brandMarks];
  const hairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hairRef.current;
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
          { scaleX: 1, duration: 1.2, ease: "expo.out", transformOrigin: "0 50%" }
        );
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ---------- Brand credits (dark marquee) ---------- */}
      <section className="border-t border-line-2/60 bg-ink py-10 sm:py-12">
        <div className="container-px mx-auto max-w-[1400px]">
          <GsapReveal y={20}>
            <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-dust">
              Brands on the record
            </p>

            <div
              className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
              aria-label="Brand partners: Hostinger, Filmora, Manomay, XECH, Brand"
            >
              <div className="marquee-track flex w-max items-center gap-14 pr-14">
                {loop.map((mark, i) => (
                  <span
                    key={`${mark}-${i}`}
                    className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white/80"
                    aria-hidden={i >= brandMarks.length}
                  >
                    {mark}
                  </span>
                ))}
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* ---------- Large-Numeral Fact Row (full bleed) ---------- */}
      <section className="relative border-t border-line-2/60 bg-black py-16 sm:py-20">
        <div
          ref={hairRef}
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-blue/60"
        />
        <div className="container-px mx-auto max-w-[1400px]">
          {/* Label row */}
          <GsapReveal y={16}>
            <div className="mb-10 flex items-center justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-mint">
                The verdict so far
              </p>
              <p className="hidden text-[11px] uppercase tracking-[0.24em] text-dust sm:block">
                Published figures · updated live
              </p>
            </div>
          </GsapReveal>

          {/* Fact grid: 2×2 on mobile (all four large numerals visible at once),
              full 4-up editorial strip with hairlines from sm up. */}
          <GsapReveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-line-2">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-gsap-item
                  className="relative flex flex-col gap-2 px-2 first:pl-0 sm:px-8 sm:first:pl-6 sm:last:pr-0"
                >
                  <span className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-blue" />
                    <span className="num-lock text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.045em] text-white">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </span>
                  <span className="ml-4 max-w-[20ch] text-sm leading-snug text-mist">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </GsapReveal>
        </div>
      </section>
    </>
  );
}
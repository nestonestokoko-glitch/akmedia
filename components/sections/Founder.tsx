"use client";

import { founder } from "@/lib/data";
import GsapReveal from "@/components/ui/GsapReveal";

const stats = [
  { value: founder.years, label: founder.yearsLabel },
  { value: founder.followers, label: founder.followersLabel },
  { value: founder.creators, label: founder.creatorsLabel },
  { value: founder.brands, label: founder.brandsLabel },
];

/**
 * Founder Story — "Editorial Portrait + Quote".
 * One large serif-italic blockquote as the section's image, flanked by a
 * decorative quote glyph; beneath it the founder signature line. On the
 * right, a 2×2 credential grid with a mint framing frame (color + word,
 * not color alone) whose cells cascade in. A giant "AK" watermark sits
 * behind the composition.
 */
export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden border-t border-line-2/70 bg-ink-2/40 py-section"
    >
      {/* Ambient glow + oversized brand watermark */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue/5 blur-[120px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 right-0 select-none font-serif text-[clamp(10rem,26vw,22rem)] italic leading-none text-white/[0.03]"
      >
        AK
      </span>

      <div className="container-px relative mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Quote */}
          <GsapReveal y={28} threshold={0.15}>
            <div className="lg:sticky lg:top-28">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                Built by a creator
              </p>
              <div className="relative">
                {/* Decorative quote glyph */}
                <span
                  aria-hidden
                  className="absolute -left-2 -top-10 font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-blue/40"
                >
                  “
                </span>
                <blockquote className="type-accent relative text-balance text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.15] tracking-[-0.02em] text-white">
                  {founder.quote}
                </blockquote>
              </div>
              <p className="mt-9 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm uppercase tracking-[0.2em] text-mist">
                {founder.name}
                <span aria-hidden className="h-px w-10 bg-mint/60" />
                <span className="font-medium tracking-[0.16em] text-mint">
                  Founder &amp; Creator
                </span>
              </p>
            </div>
          </GsapReveal>

          {/* Credentials — 2×2 grid, mint top frame */}
          <GsapReveal y={24} stagger={0.08} threshold={0.15} delay={0.1}>
            <div className="rounded-2xl border border-line-2 bg-ink">
              <span data-gsap-item aria-hidden className="block h-[3px] w-full rounded-t-2xl bg-mint/70" />
              <div className="grid grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    data-gsap-item
                    className="border-line-2 p-6 [&:nth-child(n+3)]:border-t [&:nth-child(2n)]:border-l sm:p-8"
                  >
                    <p className="num-lock text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em] text-white">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm leading-snug text-mist">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-right text-[11px] uppercase tracking-[0.2em] text-dust">
              On the record
            </p>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
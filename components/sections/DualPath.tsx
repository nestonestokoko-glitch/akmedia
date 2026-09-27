"use client";

import { cn } from "@/lib/cn";
import SplitText from "@/components/ui/SplitText";
import SlideButton from "@/components/ui/SlideButton";
import Magnetic from "@/components/ui/Magnetic";
import GsapReveal from "@/components/ui/GsapReveal";

/**
 * DualPath — The Split-Screen Job Board.
 * Aligned inside the screen within the max-w-[1400px] container.
 * Equal-height dual cards:
 * - Left: Brands (Blue accent, ink-2 card)
 * - Right: Creators (Mint accent, ink-2 card)
 */
const paths = [
  {
    id: "brands",
    kicker: "For Brands",
    title: "Reach that converts.",
    body: "Find the right creators, build the right campaign, measure what matters. No guesswork, no fluff — reach that converts.",
    points: [
      "Curated, verified creator discovery",
      "Strategy-built campaign design",
      "Real-time tracking & transparent reporting",
    ],
    cta: "Start a Campaign",
    href: "#contact",
    proof: "100+ brand campaigns scaled",
    // Blue — action / trust / measurable results
    tag: "text-blue",
    tagBg: "bg-blue/10 border-blue/30 text-blue-bright",
    edge: "from-blue via-blue-bright to-transparent",
    hoverBorder: "hover:border-blue/40",
    pointNum: "text-blue",
    ctaVariant: "primary",
  },
  {
    id: "creators",
    kicker: "For Creators",
    title: "Growth you can feel.",
    body: "Get matched with brands that fit your audience, create content you're proud of, and get paid reliably — every single time.",
    points: [
      "Brands matched to your niche",
      "Fair, guaranteed compensation",
      "Dedicated manager & support",
    ],
    cta: "Join the Creator Network",
    href: "#contact",
    proof: "2000+ creators in the network",
    // Mint — creator-focused moments
    tag: "text-mint",
    tagBg: "bg-mint/10 border-mint/30 text-mint-bright",
    edge: "from-mint via-mint-bright to-transparent",
    hoverBorder: "hover:border-mint/40",
    pointNum: "text-mint",
    ctaVariant: "mint",
  },
] as const;

export default function DualPath() {
  return (
    <section className="relative overflow-hidden bg-ink py-section border-t border-line-2/60">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-blue/5 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-mint/5 blur-[140px]"
      />

      {/* Main Container — Everything stays cleanly aligned inside screen */}
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Section header */}
        <GsapReveal y={20} threshold={0.15}>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-dust">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Two Distinct Paths
              </p>
              <SplitText
                as="h2"
                text="One platform. Two ways to grow."
                accent="grow"
                className="max-w-[22ch] text-balance text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
              />
            </div>
            <p className="max-w-[34ch] text-sm leading-relaxed text-mist sm:text-base">
              Whether you're building a brand or building a career, the same engine works for you.
            </p>
          </div>
        </GsapReveal>

        {/* Dual Cards Grid — Centered on mobile and contained inside screen */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 items-stretch justify-items-center lg:justify-items-stretch">
          {paths.map((path, i) => (
            <GsapReveal
              key={path.id}
              id={path.id}
              as="div"
              y={28}
              duration={0.8}
              delay={i * 0.12}
              threshold={0.15}
              className="h-full w-full max-w-[540px] lg:max-w-none mx-auto"
            >
              <div
                className={cn(
                  "group relative flex h-full min-h-[440px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-line-2 bg-ink-2/70 p-7 sm:rounded-3xl sm:p-10 lg:p-12 transition-all duration-500 hover:shadow-2xl",
                  path.hoverBorder
                )}
              >
                {/* Top hairline accent bar */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r",
                    path.edge
                  )}
                />

                {/* Subtle ambient hover sheen */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100",
                    i === 0 ? "bg-blue/20" : "bg-mint/20"
                  )}
                />

                {/* Card Top: Kicker, Title, Description, Checklist */}
                <div className="relative z-10">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
                      path.tagBg
                    )}
                  >
                    {path.kicker}
                  </span>

                  <h3 className="mt-5 text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                    {path.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-mist/90 sm:text-base">
                    {path.body}
                  </p>

                  <ol className="mt-8 space-y-3.5">
                    {path.points.map((point, j) => (
                      <li
                        key={point}
                        className="flex items-center gap-3.5 border-b border-line-2/40 pb-3 text-sm text-white/90 sm:text-[15px]"
                      >
                        <span
                          className={cn(
                            "num-lock flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line-2/80 bg-ink text-xs font-semibold",
                            path.pointNum
                          )}
                        >
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Card Bottom: CTA & Proof */}
                <div className="relative z-10 mt-10 border-t border-line-2/50 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Magnetic strength={0.25}>
                      <SlideButton
                        href={path.href}
                        variant={path.ctaVariant}
                        size="lg"
                      >
                        {path.cta}
                        <span
                          aria-hidden
                          className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </SlideButton>
                    </Magnetic>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dust">
                      {path.proof}
                    </p>
                  </div>
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
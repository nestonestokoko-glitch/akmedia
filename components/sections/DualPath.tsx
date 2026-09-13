"use client";

import { cn } from "@/lib/cn";
import SplitText from "@/components/ui/SplitText";
import SlideButton from "@/components/ui/SlideButton";
import Magnetic from "@/components/ui/Magnetic";
import GsapReveal from "@/components/ui/GsapReveal";

/**
 * DualPath — the Split-Screen Job Board.
 * One ecosystem split into two equal, full-height experiences:
 * Brands (blue, ink-2) on the left, Creators (mint, ink-3) on the right.
 * The halves slide in from their own sides as you scroll, meeting across a
 * single center hairline — the tension strip both sides reach over on hover.
 * Mobile stacks them, brands first.
 */
const paths = [
  {
    id: "brands",
    kicker: "For Brands",
    title: "Reach that converts.",
    body: "Find the right creators, build the right campaign, measure what matters. No guesswork, no fluff — reach that converts.",
    points: ["Curated, verified creator discovery", "Strategy-built campaign design", "Real-time tracking & transparent reporting"],
    cta: "Start a Campaign",
    href: "#contact",
    proof: "100+ brand campaigns scaled",
    // Blue — action / trust / measurable results
    tag: "text-blue",
    edge: "bg-blue",
    pointNum: "text-blue",
    ctaVariant: "primary",
  },
  {
    id: "creators",
    kicker: "For Creators",
    title: "Growth you can feel.",
    body: "Get matched with brands that fit your audience, create content you're proud of, and get paid reliably — every single time.",
    points: ["Brands matched to your niche", "Fair, guaranteed compensation", "Dedicated manager & support"],
    cta: "Join the Creator Network",
    href: "#contact",
    proof: "2000+ creators in the network",
    // Mint — creator-focused moments
    tag: "text-mint",
    edge: "bg-mint",
    pointNum: "text-mint",
    ctaVariant: "mint",
  },
] as const;

export default function DualPath() {
  return (
    <section className="relative bg-ink">
      {/* Section header */}
      <div className="container-px mx-auto max-w-[1400px] pt-16 sm:pt-20 lg:pt-24">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <SplitText
            as="h2"
            text="One platform. Two ways to grow."
            accent="grow"
            className="max-w-[22ch] text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-white"
          />
          <p className="hidden max-w-[30ch] text-sm leading-relaxed text-mist sm:block">
            Whether you're building a brand or building a career, the same engine works for you.
          </p>
        </div>
      </div>

      {/* Split screen */}
      <div>
        <div className="grid lg:grid-cols-2">
          {paths.map((path, i) => (
            <GsapReveal
              key={path.id}
              id={path.id}
              as="div"
              y={0}
              x={i === 0 ? -56 : 56}
              duration={1}
              threshold={0.12}
              className={cn(
                "group relative flex min-h-[420px] flex-col justify-between overflow-hidden px-6 py-12 sm:min-h-[480px] sm:px-10 sm:py-14 lg:min-h-[80vh]",
                i === 0 ? "bg-ink-2 lg:border-r lg:border-line-2" : "bg-ink-3"
              )}
            >
              {/* Edge accent stripe */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 h-[3px] w-full transition-colors duration-500",
                  i === 0 ? "bg-blue" : "bg-mint"
                )}
              />

              {/* Hover sheen reaching across the divide */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 size-[420px] rounded-full opacity-0 blur-[110px] transition-opacity duration-700 group-hover:opacity-100",
                  i === 0 ? "-right-40 bg-blue/20" : "-left-40 bg-mint/20"
                )}
              />

              <div className="relative">
                <p className={cn("text-xs font-semibold uppercase tracking-[0.24em]", path.tag)}>
                  {path.kicker}
                </p>
                <h3 className="mt-5 max-w-[18ch] text-balance text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.06] tracking-[-0.035em] text-white">
                  {path.title}
                </h3>
                <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-mist sm:text-base">
                  {path.body}
                </p>

                <ol className="mt-8 max-w-[44ch] space-y-3.5">
                  {path.points.map((point, j) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-4 border-b border-line-2/50 pb-3.5 text-sm text-white/85"
                    >
                      <span className={cn("num-lock text-xs font-medium", path.pointNum)}>
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative mt-10">
                <Magnetic strength={0.3}>
                  <SlideButton href={path.href} variant={path.ctaVariant} size="lg">
                    {path.cta}
                    <span
                      aria-hidden
                      className="ml-2.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </SlideButton>
                </Magnetic>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-dust">
                  {path.proof}
                </p>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
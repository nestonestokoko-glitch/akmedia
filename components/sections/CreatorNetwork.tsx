"use client";

import { creators, campaigns } from "@/lib/data";
import { useApi, api } from "@/lib/api/client";
import { cn } from "@/lib/cn";
import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";
import TiltCard from "@/components/ui/TiltCard";
import ResultsScrolljack from "@/components/sections/ResultsScrolljack";

/**
 * The Creator Board — a side-scrolling editorial rail of verified creators.
 *
 * Data pipeline (brief #22/#24): the board is seeded with the published
 * roster — the same real objects `/api/creators` serves — so first paint
 * (and no-JS) always shows real content. The typed API client then
 * refreshes the roster live and drives the error banner + retry. Never
 * invented content.
 *
 * No portrait assets exist, so identity is a real-initials monogram tile
 * with palette-derived gradients; metrics are the real published numbers.
 */

// Real categories only (from the roster) — signals diversity without inventing niches.
const categoryMarquee = ["Tech Creator", "Lifestyle", "Tech & Gaming", "Tech Reviews"];

export default function CreatorNetwork() {
  const { status, data, retry } = useApi(() => api.creators(), []);
  // Always render a real board: published roster seeds it, the API refreshes it.
  const roster = data && data.length ? data : creators;

  return (
    <section
      id="creators"
      // overflow-clip (not hidden): clips the marquee but does NOT become a
      // scroll container, so the results scroll-jack inside can still stick.
      className="relative overflow-clip bg-ink-2 py-section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">
          <SplitText
            as="h2"
            text="The creators behind the results."
            accent="results"
            className="max-w-[18ch] text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
          />
          <p className="hidden max-w-[32ch] text-sm leading-relaxed text-mist sm:block">
            A curated board of verified creators, matched to brands that fit their audience —
            a living network, not a static gallery.
          </p>
        </div>

        {/* Error fallback banner (graceful, brief #24) */}
        {status === "error" && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-mint/30 bg-mint/5 px-4 py-3">
            <p className="text-sm text-mint-bright">
              Live roster is unreachable right now — showing the published network.
            </p>
            <button
              type="button"
              onClick={retry}
              className="text-sm font-medium text-white underline-offset-4 hover:text-mint hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main rail — cards rise in with a stagger, then tilt on hover */}
        <GsapReveal stagger={0.08} y={32} threshold={0.08}>
          <div className="no-scrollbar -mx-1 snap-x overflow-x-auto pb-4 pl-1">
            <div className="flex w-max gap-5">
              {roster.map((creator) => (
                <TiltCard
                  key={creator.id}
                  data-gsap-item
                  className="min-w-[320px] snap-start rounded-2xl sm:min-w-[360px]"
                >
                  <article className="group flex h-full flex-col border border-line-2 bg-ink p-6 transition-colors duration-300 hover:border-blue/50">
                    {/* Identity row */}
                    <div className="flex items-center gap-4">
                      <div className="relative flex size-16 shrink-0 items-end justify-center overflow-hidden rounded-xl pb-1 transition-transform duration-500 group-hover:scale-105">
                        <div
                          aria-hidden
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br to-transparent",
                            creator.hue
                          )}
                        />
                        <span
                          aria-hidden
                          className="relative font-serif text-2xl italic leading-none text-white"
                        >
                          {creator.initials}
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-medium tracking-tight text-white">
                          {creator.name}
                        </h3>
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-mint">
                          {creator.category}
                        </p>
                      </div>
                    </div>

                    {/* Spec-sheet metrics */}
                    <dl className="mt-6 space-y-2.5 border-t border-line-2 pt-5">
                      {creator.metrics.map((m, j) => (
                        <div
                          key={m.label}
                          className="flex items-baseline justify-between border-b border-line-2/40 pb-2"
                        >
                          <dt className="text-xs uppercase tracking-[0.14em] text-dust">
                            {m.label}
                          </dt>
                          <dd
                            className={cn(
                              "num-lock text-sm font-semibold",
                              j === 0 ? "text-blue-bright" : "text-white"
                            )}
                          >
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                </TiltCard>
              ))}
            </div>
          </div>
        </GsapReveal>
        <p className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-dust lg:text-left">
          Drag or scroll →
        </p>
      </div>

      {/* Category marquee — real niches only */}
      <GsapReveal y={24} threshold={0.1}>
        <div
          className="relative mt-14 border-y border-line-2/60 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          aria-label="Creator categories"
        >
        <div className="marquee-track flex w-max items-center gap-8 pr-8">
          {[...categoryMarquee, ...categoryMarquee, ...categoryMarquee].map((cat, i) => (
            <span
              key={`${cat}-${i}`}
              className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.3em] text-dust"
              aria-hidden={i >= categoryMarquee.length}
            >
              {cat}
              <span aria-hidden className="size-1 rounded-full bg-blue/60" />
            </span>
          ))}
        </div>
        </div>
      </GsapReveal>

      {/* Results — the numbers this board produces, scroll-jacked sideways */}
      <div id="work" className="mt-20 border-t border-line-2/60">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-4 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
              Selected results
            </p>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-dust">
              {campaigns.length} campaigns · keep scrolling →
            </span>
          </div>
        </div>
        <ResultsScrolljack />
      </div>
    </section>
  );
}
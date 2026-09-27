"use client";

import { creators } from "@/lib/data";
import { useApi, api } from "@/lib/api/client";
import { cn } from "@/lib/cn";
import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";
import TiltCard from "@/components/ui/TiltCard";

import Button from "@/components/ui/Button";

/**
 * The Creator Board — a side-scrolling editorial rail of verified creators.
 * Follows skill.md:
 * - Color architecture: ink-2 background, mint accents for creator moments, blue-bright for metrics.
 * - Typography: Inter + Instrument Serif display accent via SplitText.
 * - Dedicated 4:3 magazine photo frames with fallback monogram placeholders.
 */

// Real categories only (from the roster) — signals diversity without inventing niches.
const categoryMarquee = ["AI + Tech", "Tech Creator", "E-Com", "Knowledge Creator", "YouTube Growth", "Lifestyle"];

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
      <div className="container-px mx-auto w-full max-w-[1400px]">
        {/* Section Header: Editorial & Aligned with skill.md */}
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <p className="mb-4 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-mint-bright before:h-px before:w-4 before:bg-mint/60 after:h-px after:w-4 after:bg-mint/60">
            Real Creators · Real Results
          </p>
          <SplitText
            as="h2"
            text="Join 500+ verified creators earning consistently."
            accent="earning"
            className="max-w-[22ch] text-balance text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
          />
          <p className="mt-4 max-w-[50ch] text-sm leading-relaxed text-mist">
            Structured brand collaborations designed for premium creator growth — a living network, not a static gallery.
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

        {/* Main rail — cards rise in with a stagger, centered on mobile */}
        <GsapReveal stagger={0.08} y={32} threshold={0.08}>
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-5">
              {roster.map((creator) => (
                <TiltCard
                  key={creator.id}
                  data-gsap-item
                  className="w-[84vw] max-w-[340px] snap-center rounded-2xl sm:w-auto sm:min-w-[320px] lg:min-w-[360px]"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-2 bg-ink transition-all duration-300 hover:border-blue/50 hover:shadow-2xl">
                    {/* Dedicated Creator Photo Frame — Clearly Visible & Tall */}
                    <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden bg-ink">
                      {creator.image ? (
                        <img
                          src={creator.image}
                          alt={creator.name}
                          loading="eager"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : null}

                      {/* Photo Placeholder / Fallback Container when image not present */}
                      {!creator.image && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <div
                            aria-hidden
                            className={cn(
                              "absolute inset-0 bg-gradient-to-br opacity-40",
                              creator.hue
                            )}
                          />
                          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md">
                            <span className="font-serif text-3xl italic text-white">
                              {creator.initials}
                            </span>
                          </div>
                          <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-dashed border-mint/40 bg-black/50 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-mint-bright uppercase">
                            <svg className="size-3.5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Add Photo
                          </span>
                        </div>
                      )}

                      {/* Subtle Bottom Vignette only at bottom edge for text transition */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink via-ink/30 to-transparent"
                      />

                      {/* Top Badges: Category Pill & YouTube Badge */}
                      <div className="absolute inset-x-3.5 top-3.5 z-10 flex items-center justify-between">
                        <span className="rounded-full border border-mint/40 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mint-bright backdrop-blur-md shadow-sm">
                          {creator.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-medium text-dust backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                          <svg className="size-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Metrics */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="truncate text-lg font-semibold tracking-tight text-white">
                        {creator.name}
                      </h3>

                      {/* Spec-sheet metrics */}
                      <dl className="mt-4 space-y-2 border-t border-line-2 pt-4">
                        {creator.metrics.map((m, j) => (
                          <div
                            key={m.label}
                            className="flex items-baseline justify-between border-b border-line-2/40 pb-1.5"
                          >
                            <dt className="text-[11px] uppercase tracking-[0.14em] text-dust">
                              {m.label}
                            </dt>
                            <dd
                              className={cn(
                                "num-lock text-sm font-semibold",
                                j === 0 ? "text-mint-bright" : j === 1 ? "text-blue-bright" : "text-white"
                              )}
                            >
                              {m.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </article>
                </TiltCard>
              ))}
            </div>
          </div>
        </GsapReveal>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-dust">
            Drag or scroll →
          </p>
          <Button href="#contact" variant="mint" size="lg" className="mt-2">
            Join the Creator Network
            <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Button>
        </div>
      </div>

      {/* Category marquee — real niches only */}
      <GsapReveal y={24} threshold={0.1}>
        <div
          className="relative mt-14 overflow-hidden border-y border-line-2/60 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
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
              <span aria-hidden className="size-1 rounded-full bg-mint/60" />
            </span>
          ))}
        </div>
        </div>
      </GsapReveal>
    </section>
  );
}
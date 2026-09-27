"use client";

import Image from "next/image";
import { founder } from "@/lib/data";
import GsapReveal from "@/components/ui/GsapReveal";

/**
 * Founder Section — "Real Details Imported from akmediaindia.com"
 * 
 * Features:
 * 1. High-resolution portrait photograph of Krishna Chandrawanshi (/images/founder.jpg).
 * 2. Aliases rail: Active Krishna · Techy Krishna · Founder & YouTube Creator.
 * 3. Verified credibility narrative with 6+ years experience, 300K+ followers, six-figure earnings,
 *    and real brand partner links (Hostinger, Filmora, Doola, Superprofile).
 * 4. 5-stat metric matrix (6+ Years Experience, 300K+ Followers, 2000+ Creators Helped,
 *    100+ Brands Worked, 1000+ Success Stories).
 * 5. Founder's personal quote and signature.
 */
export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden border-t border-line-2/70 bg-ink-2/30 py-section"
    >
      {/* Ambient background glow & oversized brand watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-mint/5 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-blue/5 blur-[130px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-14 right-4 select-none font-serif text-[clamp(9rem,24vw,20rem)] italic leading-none text-white/[0.02]"
      >
        AK
      </span>

      <div className="container-px relative mx-auto max-w-[1360px]">
        {/* Section kicker */}
        <GsapReveal y={20} threshold={0.15}>
          <div className="mb-8 flex items-center justify-center lg:justify-start gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-mint-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              Meet Our Founder
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-line-2 hidden sm:block" />
          </div>
        </GsapReveal>

        {/* 2-Column Editorial Grid: Portrait on Left, Real Story & Metrics on Right */}
        <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-16 xl:grid-cols-[440px_1fr] items-start">
          {/* Left Column: Portrait Photograph */}
          <GsapReveal y={32} threshold={0.15}>
            <div className="relative mx-auto w-full max-w-[440px] lg:sticky lg:top-28">
              {/* Outer decorative framing */}
              <div className="group relative overflow-hidden rounded-2xl border border-line-2 bg-ink shadow-2xl transition-all duration-500 hover:border-mint/40">
                {/* Mint top hairline accent */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 z-20 h-[3px] w-full bg-gradient-to-r from-mint via-mint-bright to-transparent"
                />

                {/* Portrait Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-2">
                  <Image
                    src={founder.image || "/images/founder.jpg"}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle vignette & bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/70 p-3.5 backdrop-blur-md">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mint">
                      Verified Identity
                    </p>
                    <p className="font-serif text-base font-medium tracking-tight text-white">
                      {founder.name}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-mint-bright">
                    <svg
                      className="h-3 w-3 text-mint"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Founder
                  </span>
                </div>
              </div>

              {/* Founder Quote Card beneath photo */}
              <div className="mt-5 rounded-xl border border-line-2/80 bg-ink-2/50 p-5">
                <span className="font-serif text-3xl leading-none text-mint/40">“</span>
                <p className="mt-1 text-sm italic leading-relaxed text-mist">
                  {founder.quote}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-line-2/50 pt-3">
                  <span className="text-[11px] uppercase tracking-wider text-dust">
                    Personal Commitment
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {founder.name}
                  </span>
                </div>
              </div>
            </div>
          </GsapReveal>

          {/* Right Column: Real Story, Aliases, Brand Partners, and Metrics */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start w-full">
            <GsapReveal y={24} threshold={0.15}>
              <div className="w-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                  {founder.role}
                </p>
                <h2 className="mt-2 text-[clamp(2.3rem,4.2vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                  {founder.firstName}{" "}
                  <span className="font-serif italic font-normal text-mint-bright">
                    {founder.lastName}
                  </span>
                </h2>

                {/* Aliases Rail: Active Krishna · Techy Krishna · Founder & YouTube Creator */}
                <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {founder.aka.map((alias, i) => (
                    <span
                      key={alias}
                      className="inline-flex items-center gap-2 rounded-lg border border-line-2 bg-ink px-3 py-1.5 text-xs font-medium text-mist"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      {alias}
                      {i < founder.aka.length - 1 && (
                        <span className="text-dust/40">/</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Full Verified Narrative from akmediaindia.com */}
                <div className="mt-7 space-y-4 text-base leading-relaxed text-mist/90 md:text-lg">
                  <p>
                    <span className="font-semibold text-white">{founder.name}</span>, widely recognized as{" "}
                    <strong className="font-semibold text-mint-bright">Active Krishna</strong> and{" "}
                    <strong className="font-semibold text-mint-bright">Techy Krishna</strong>, is a prominent YouTuber, digital educator, and the founder of{" "}
                    <span className="text-white font-medium">AK Media India</span>.
                  </p>
                  <p className="text-sm leading-relaxed text-mist md:text-base">
                    With over <strong className="text-white font-semibold">6+ years of hands-on experience</strong> and a community of{" "}
                    <strong className="text-white font-semibold">300K+ followers</strong>, he is a six-figure digital entrepreneur who has orchestrated successful marketing campaigns with{" "}
                    <strong className="text-white font-semibold">2,000+ creators</strong> and{" "}
                    <strong className="text-white font-semibold">100+ fast-growing brands</strong>, helping over{" "}
                    <strong className="text-mint-bright font-semibold">1,000+ people</strong> achieve sustainable online earning and career independence.
                  </p>
                </div>

                {/* Real Brand Partners verified on the live site */}
                <div className="mt-6 rounded-xl border border-line-2 bg-ink/70 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dust">
                    Direct Brand Collaborations
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center lg:justify-start gap-2.5">
                    {founder.brandPartners.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-1.5 rounded-md border border-line-2 bg-ink-2/80 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-mint/50 hover:bg-mint/10 hover:text-mint-bright"
                      >
                        <span>{brand.name}</span>
                        <svg
                          className="h-3 w-3 text-dust transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </GsapReveal>

            {/* 5-Credential Metric Grid — Exact figures from akmediaindia.com */}
            <GsapReveal y={28} stagger={0.07} threshold={0.15} delay={0.15}>
              <div className="mt-8 rounded-2xl border border-line-2 bg-ink shadow-lg w-full">
                <span
                  data-gsap-item
                  aria-hidden
                  className="block h-[3px] w-full rounded-t-2xl bg-gradient-to-r from-mint via-blue to-mint"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y divide-line-2 sm:divide-y-0 sm:divide-x divide-line-2">
                  {founder.stats.map((stat) => (
                    <div
                      key={stat.label}
                      data-gsap-item
                      className="p-5 text-center transition-colors hover:bg-white/[0.02] last:col-span-2 sm:last:col-span-1"
                    >
                      <p className="num-lock text-2xl font-bold tracking-tight text-white md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-[11px] font-medium leading-snug uppercase tracking-wider text-mist">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.2em] text-dust">
                <span>Verified Track Record</span>
                <span>AK Media India</span>
              </div>
            </GsapReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
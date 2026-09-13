"use client";

import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Testimonials — "Endnote Quotes".
 * Two full-width editorial quote blocks stacked on hairlines, not a
 * carousel: every voice visible at once, readable in any order. Each block
 * carries a type tag pill — "Brand" (blue outline) or "Creator" (mint
 * outline) — so the role is stated in words as well as color (WCAG: color
 * is never the only semantic indicator). The quotes cascade in with a GSAP
 * stagger as the section enters.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink py-section">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
              What they say
            </p>
            <SplitText
              as="h2"
              text="Words from both sides of the table."
              accent="both sides"
              className="max-w-[20ch] text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
            />
          </div>
          <GsapReveal y={16} threshold={0.2}>
            <p className="hidden max-w-[28ch] text-sm leading-relaxed text-mist sm:block">
              Brand partners and creators, on the record about working with AK Media.
            </p>
          </GsapReveal>
        </div>

        <GsapReveal as="div" y={26} stagger={0.12} threshold={0.05} className="border-t border-line-2">
          {testimonials.map((t) => (
            <figure
              key={t.person + t.type}
              data-gsap-item
              className="grid gap-6 border-b border-line-2 py-10 sm:py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12"
            >
              <blockquote className="relative max-w-[60ch] text-balance text-[clamp(1.4rem,2.8vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white">
                <span
                  aria-hidden
                  className="absolute -left-6 -top-6 select-none font-serif text-3xl text-blue/50"
                >
                  “
                </span>
                {t.quote}
              </blockquote>

              <figcaption className="lg:justify-self-end">
                <span className="inline-flex items-center gap-3">
                  {/* Type tag — word + color, not color alone */}
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
                      t.type === "Brand"
                        ? "border-blue/60 text-blue-bright"
                        : "border-mint/60 text-mint-bright"
                    )}
                  >
                    {t.type}
                  </span>
                  <span className="h-px w-8 bg-line-2" aria-hidden />
                </span>
                <span className="mt-4 block text-sm font-medium text-white">
                  {t.person}
                </span>
                <span className="block text-sm text-dust">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </GsapReveal>
      </div>
    </section>
  );
}
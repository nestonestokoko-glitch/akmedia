"use client";

import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";
import { whyPoints } from "@/lib/data";

/**
 * Why AK Media — "Editorial Principle Strips".
 * Full-width rows separated by hairlines, not cards: number in blue
 * (01–04), title, and body on an invisible 90px / 1fr / 1.5fr grid.
 * On hover the row lifts to a blue wash and a trailing arrow slides in.
 * The rows rise in with a GSAP stagger as the section enters.
 */
export default function WhySection() {
  return (
    <section id="why" className="border-t border-line-2/70 bg-ink-2/40 py-section">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">
          <SplitText
            as="h2"
            text="Why brands & creators choose AK Media."
            accent="AK Media"
            className="max-w-[20ch] text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
          />
          <GsapReveal y={16} threshold={0.2}>
            <p className="hidden max-w-[30ch] text-sm leading-relaxed text-mist sm:block">
              Four commitments behind every campaign — for both sides of the table.
            </p>
          </GsapReveal>
        </div>

        <GsapReveal
          as="div"
          y={26}
          stagger={0.07}
          threshold={0.05}
          className="border-t border-line-2"
        >
          {whyPoints.map((point) => (
            <div
              key={point.n}
              data-gsap-item
              className="group relative grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-3 border-b border-line-2 py-7 pr-4 transition-colors duration-300 hover:bg-blue/[0.04] sm:items-start sm:grid-cols-[90px_1fr_1.5fr] sm:gap-8 sm:gap-y-0 sm:py-9 sm:pr-12"
            >
              {/* Number as editorial figure — sits inline with the title on mobile */}
              <span className="num-lock text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-none tracking-[-0.03em] text-blue">
                {point.n}
              </span>

              <h3 className="text-[clamp(1.35rem,2.6vw,2rem)] font-medium tracking-[-0.02em] text-white">
                {point.title}
              </h3>

              <p className="col-span-2 max-w-[46ch] text-sm leading-relaxed text-mist sm:col-span-1 sm:text-[15px]">
                {point.body}
              </p>

              {/* Slide-in arrow (decorative — rows are not destinations) */}
              <span
                aria-hidden
                className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-3 text-lg text-blue opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
              >
                →
              </span>
            </div>
          ))}
        </GsapReveal>
      </div>
    </section>
  );
}
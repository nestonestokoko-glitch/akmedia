"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { brandMarks } from "@/lib/data";

/**
 * Footer — "Editorial Colophon".
 * Closing black band, oversized wordmark line, and three editorial link
 * columns with large type. Every href is a real section target — no
 * placeholder links, no invented destinations (skill.md §24). When the
 * footer enters the viewport the colophon composes itself: the top
 * hairline draws, the wordmark and descriptor rise, the link columns and
 * bottom bar cascade in behind.
 */
const columns = [
  {
    heading: "For Brands",
    accent: "text-blue",
    links: [
      { label: "Start a Campaign", href: "#contact" },
      { label: "Our Work", href: "#work" },
      { label: "The Network", href: "#creators" },
      { label: "Why AK Media", href: "#why" },
    ],
  },
  {
    heading: "For Creators",
    accent: "text-mint",
    links: [
      { label: "Join the Network", href: "#contact" },
      { label: "The Board", href: "#creators" },
      { label: "Brands We Work With", href: "#brands" },
      { label: "How You Get Paid", href: "#process" },
    ],
  },
  {
    heading: "Company",
    accent: "text-dust",
    links: [
      { label: "The Founder", href: "#founder" },
      { label: "Process", href: "#process" },
      { label: "What They Say", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
] as const;

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {}, el);
    let played = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;

        ctx.add(() => {
          const q = gsap.utils.selector(el);

          // Colophon entrance — one deliberate cascade, top to bottom.
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .fromTo(
              q("[data-footer='hairline']"),
              { scaleX: 0 },
              { scaleX: 1, duration: 1.3, ease: "expo.out", transformOrigin: "0 50%" }
            )
            .fromTo(
              q("[data-footer='wordmark']"),
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, duration: 0.8 },
              0.2
            )
            .fromTo(
              q("[data-footer='desc']"),
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              0.35
            )
            .fromTo(
              q("[data-footer='brands']"),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              0.5
            )
            .fromTo(
              q("[data-footer='nav']"),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 },
              0.55
            )
            .fromTo(
              q("[data-footer='bar']"),
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              0.8
            );
        });

        io.disconnect();
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={rootRef} className="relative border-t border-line-2/70 bg-black">
      {/* Colophon hairline — draws itself in when the footer enters view */}
      <span
        data-footer="hairline"
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-blue/40"
      />
      <div className="container-px mx-auto max-w-[1400px] pb-10 pt-16 sm:pt-24">
        {/* Oversized wordmark line */}
        <a
          data-footer="wordmark"
          href="#top"
          className="group inline-flex items-baseline gap-3"
          aria-label="AK Media India — back to top"
        >
          <span className="text-[clamp(2rem,6vw,4rem)] font-semibold leading-none tracking-[0.08em] text-white">
            AK
          </span>
          <span className="font-serif text-[clamp(2rem,6vw,4rem)] italic leading-none tracking-normal text-blue transition-colors group-hover:text-blue-soft">
            Media
          </span>
          <span className="text-[clamp(1.1rem,3vw,1.75rem)] font-semibold uppercase leading-none tracking-[0.28em] text-mist">
            India
          </span>
        </a>
        <p
          data-footer="desc"
          className="mt-6 max-w-md text-sm leading-relaxed text-mist"
        >
          Connecting brands with authentic creators who drive real growth
          through purposeful partnerships.
        </p>

        {/* Link columns — oversized editorial links */}
        <div className="mt-14 grid gap-x-10 gap-y-12 border-t border-line-2/60 pt-12 md:grid-cols-2 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand marks strip */}
          <div data-footer="brands">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-dust">
              Brands on the record
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
              {brandMarks.map((mark) => (
                <li
                  key={mark}
                  className="text-sm font-semibold uppercase tracking-[0.26em] text-white/40 transition-colors hover:text-white/80"
                >
                  {mark}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.heading} data-footer="nav" aria-label={col.heading}>
                <h3
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${col.accent}`}
                >
                  {col.heading}
                </h3>
                <ul className="mt-5 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[clamp(1.15rem,2.2vw,1.6rem)] font-medium leading-snug tracking-[-0.015em] text-white/85 transition-colors hover:text-blue-bright"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact + bottom bar */}
        <div
          data-footer="bar"
          className="mt-14 flex flex-col gap-6 border-t border-line-2/60 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-dust">
            © {new Date().getFullYear()} AK Media India. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="mailto:api@akmediaindia.com"
              className="text-sm text-mist transition-colors hover:text-blue"
            >
              api@akmediaindia.com
            </a>
            <a href="#top" className="text-xs uppercase tracking-[0.18em] text-dust transition-colors hover:text-white">
              Back to top ↑
            </a>
            <span className="inline-flex items-center rounded-full border border-mint/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">
              Made in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
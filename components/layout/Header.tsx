"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import Magnetic from "@/components/ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

/** Role-based editorial menu paths (one ecosystem, two experiences). */
const brandPaths = [
  { label: "Start a Campaign", href: "#contact", note: "Book a strategy session" },
  { label: "Our Work", href: "#work", note: "Campaign results" },
  { label: "The Network", href: "#creators", note: "Verified creators" },
  { label: "Why AK Media", href: "#why", note: "What makes us different" },
  { label: "Process", href: "#process", note: "How a campaign runs" },
];

const creatorPaths = [
  { label: "Join the Network", href: "#contact", note: "Apply in 2 minutes" },
  { label: "The Board", href: "#creators", note: "Creators already here" },
  { label: "How You Get Paid", href: "#process", note: "Apply → verified → paid" },
  { label: "Brands We Work With", href: "#brands", note: "Your future campaigns" },
  { label: "The Founder", href: "#founder", note: "Who built this" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc closes the menu; focus returns to the trigger
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Floating routemaster pill */}
      <div className="container-px mx-auto pt-3 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-[960px] items-center justify-between gap-3 rounded-full border py-2 pl-5 pr-2 transition-all duration-500",
            "border-line-2 bg-ink/70 backdrop-blur-xl",
            scrolled && "border-line-2 bg-ink/85 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.8)]"
          )}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-baseline gap-1.5 text-sm font-semibold tracking-[0.28em] text-white"
            aria-label="AK Media India — home"
          >
            AK
            <span className="font-serif italic tracking-normal text-blue transition-colors group-hover:text-blue-soft">
              Media
            </span>
            <span className="hidden tracking-[0.28em] sm:inline">India</span>
          </a>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden min-h-10 items-center rounded-full bg-blue px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-soft hover:shadow-[0_8px_28px_-8px_var(--color-blue-glow)] active:scale-[0.98] sm:inline-flex"
            >
              Start a Campaign
            </a>

            {/* "All Paths" trigger — opens the editorial menu on every breakpoint */}
            <Magnetic strength={0.3}>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="all-paths-menu"
              aria-label={open ? "Close all paths" : "Open all paths"}
              className="flex min-h-10 items-center gap-2 rounded-full border border-line-2 px-4 text-sm font-medium text-white transition-colors hover:border-blue/60"
            >
              <span aria-hidden className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full border border-current" />
                <span className="h-1.5 w-1.5 rounded-full border border-current" />
                <span className="h-1.5 w-1.5 rounded-full border border-current" />
              </span>
              <span className="hidden sm:inline">All Paths</span>
              <span className="sm:hidden">Paths</span>
            </button>
          </Magnetic>
          </div>
        </div>
      </div>

      {/* Full-screen oversized editorial menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="all-paths-menu"
            role="dialog"
            aria-modal="true"
            aria-label="All paths — brands and creators"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-2xl"
          >
            <div className="container-px mx-auto flex min-h-full w-full max-w-[1400px] flex-col py-16 sm:py-24">
              {/* my-auto centers the group when it fits and anchors it to the top
                  when the menu overflows a short viewport — so the top links
                  never become unreachable (justify-center would clip them). */}
              <div className="my-auto flex w-full flex-col">
              {/* Menu header */}
              <div className="mb-10 flex items-baseline justify-between border-b border-line-2 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-dust">
                  AK Media India — Routes
                </p>
                <Magnetic strength={0.4}>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="min-h-11 min-w-11 rounded-full border border-line-2 text-lg text-white transition-colors hover:border-blue/60 hover:text-blue"
                  >
                    ✕
                  </button>
                </Magnetic>
              </div>

              {/* Two role columns */}
              <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
                {/* For Brands */}
                <nav aria-label="For brands" className="group/brands">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                    For Brands
                  </p>
                  <ul className="space-y-1">
                    {brandPaths.map((path, i) => (
                      <motion.li
                        key={path.href + path.label}
                        initial={reduce ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.5, ease }}
                        className="flex items-baseline gap-4"
                      >
                        <span className="num-lock hidden w-6 shrink-0 text-sm text-dust/60 sm:inline">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={path.href}
                          onClick={() => setOpen(false)}
                          className="flex flex-1 items-baseline justify-between gap-4 border-b border-line-2/50 py-3 text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] text-white transition-all duration-300 hover:text-blue"
                        >
                          <span>{path.label}</span>
                          <span className="hidden text-xs font-normal uppercase tracking-[0.18em] text-dust sm:inline">
                            {path.note}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* For Creators */}
                <nav aria-label="For creators" className="group/creators">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-mint">
                    For Creators
                  </p>
                  <ul className="space-y-1">
                    {creatorPaths.map((path, i) => (
                      <motion.li
                        key={path.href + path.label}
                        initial={reduce ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * i, duration: 0.5, ease }}
                        className="flex items-baseline gap-4"
                      >
                        <span className="num-lock hidden w-6 shrink-0 text-sm text-dust/60 sm:inline">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={path.href}
                          onClick={() => setOpen(false)}
                          className="flex flex-1 items-baseline justify-between gap-4 border-b border-line-2/50 py-3 text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] text-white transition-all duration-300 hover:text-mint"
                        >
                          <span>{path.label}</span>
                          <span className="hidden text-xs font-normal uppercase tracking-[0.18em] text-dust sm:inline">
                            {path.note}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Menu footer */}
              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line-2/60 pt-6 text-sm text-dust">
                <p>Two paths. One ecosystem.</p>
                <a
                  href="mailto:api@akmediaindia.com"
                  className="transition-colors hover:text-blue"
                >
                  api@akmediaindia.com
                </a>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
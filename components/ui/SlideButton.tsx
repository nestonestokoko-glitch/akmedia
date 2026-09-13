import { cn } from "@/lib/cn";

type SlideButtonProps = {
  href: string;
  variant?: "primary" | "mint" | "outline";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

/**
 * Dual-layer sliding-text button (.is-one / .is-two in the reference).
 * On hover the resting label slides up while an exact duplicate slides
 * in from below — pure CSS, no JS needed.
 */
export default function SlideButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
}: SlideButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full font-medium tracking-tight",
        "focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3 active:scale-[0.98]",
        size === "lg" ? "min-h-12 px-7 text-sm sm:text-base" : "min-h-11 px-6 text-sm",
        variant === "primary" &&
          "bg-blue text-white hover:bg-blue-soft hover:shadow-[0_8px_32px_-8px_var(--color-blue-glow)]",
        variant === "mint" &&
          "border border-mint/70 text-white hover:border-mint hover:bg-mint/10",
        variant === "outline" &&
          "border border-line-2 text-white hover:border-blue/60",
        className
      )}
    >
      <span className="relative block overflow-hidden py-1">
        {/* Layer 1 — resting label */}
        <span className="block whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[105%]">
          {children}
        </span>
        {/* Layer 2 — duplicate sliding in from below */}
        <span
          aria-hidden
          className="absolute inset-0 flex translate-y-[105%] items-center justify-center whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </a>
  );
}
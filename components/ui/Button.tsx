import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  variant?: "primary" | "outline" | "mint" | "ghost";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * Anchor-styled CTA following the AK Media color system.
 * primary  = Primary Blue bg, white text (most important action)
 * mint     = Muted Green — creator / secondary action
 * outline  = hairline neutral border
 * ghost    = quiet text link
 * All states are designed for 44px minimum touch targets.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-all duration-300 ease-out",
        "focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3",
        size === "md" ? "min-h-11 px-6 text-sm" : "min-h-12 px-7 text-sm sm:text-base",
        variant === "primary" &&
          "bg-blue text-white hover:bg-blue-soft hover:shadow-[0_8px_32px_-8px_var(--color-blue-glow)] active:scale-[0.98]",
        variant === "mint" &&
          "border border-mint/70 text-bone hover:border-mint hover:bg-mint/10 hover:text-mint active:scale-[0.98]",
        variant === "outline" &&
          "border border-line-2 text-bone hover:border-blue/60 hover:text-blue active:scale-[0.98]",
        variant === "ghost" &&
          "px-2 text-bone/80 hover:text-blue",
        className
      )}
    >
      {children}
    </a>
  );
}
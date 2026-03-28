import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "./cn";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref
) {
  const base =
    "focus-ring inline-flex items-center justify-center font-medium transition-all duration-200 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes: Record<string, string> = {
    sm: "rounded-lg px-4 py-2 text-sm",
    md: "rounded-lg px-6 py-3 text-sm",
    lg: "rounded-lg px-8 py-4 text-base",
  };

  const styles: Record<string, string> = {
    primary:
      "bg-ink text-white hover:bg-ink/90 active:scale-[0.98]",
    secondary:
      "bg-white text-ink border border-warm-border hover:border-ink/30 hover:text-ink active:bg-surface",
    ghost:
      "bg-transparent text-ink-light hover:text-ink active:bg-surface",
  };

  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], styles[variant], className)}
      {...props}
    />
  );
});

type LinkBtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function LinkButton({ className, variant = "primary", size = "md", ...props }: LinkBtnProps) {
  const base =
    "focus-ring inline-flex items-center justify-center font-medium transition-all duration-200";

  const sizes: Record<string, string> = {
    sm: "rounded-lg px-4 py-2 text-sm",
    md: "rounded-lg px-6 py-3 text-sm",
    lg: "rounded-lg px-8 py-4 text-base",
  };

  const styles: Record<string, string> = {
    primary:
      "bg-ink text-white hover:bg-ink/90 active:scale-[0.98]",
    secondary:
      "bg-white text-ink border border-warm-border hover:border-ink/30 hover:text-ink active:bg-surface",
    ghost:
      "bg-transparent text-ink-light hover:text-ink active:bg-surface",
  };

  return <a className={cn(base, sizes[size], styles[variant], className)} {...props} />;
}

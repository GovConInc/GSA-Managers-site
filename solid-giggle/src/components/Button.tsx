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
    "focus-ring inline-flex items-center justify-center font-semibold transition-all duration-200 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";
  
  const sizes: Record<string, string> = {
    sm: "rounded-lg px-3 py-1.5 text-xs",
    md: "rounded-xl px-5 py-2.5 text-sm",
    lg: "rounded-xl px-6 py-3 text-base",
  };

  const styles: Record<string, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground border-2 border-border hover:border-primary hover:text-primary active:bg-accent",
    ghost:
      "bg-transparent text-foreground hover:bg-accent active:bg-accent/80",
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
    "focus-ring inline-flex items-center justify-center font-semibold transition-all duration-200";
  
  const sizes: Record<string, string> = {
    sm: "rounded-lg px-3 py-1.5 text-xs",
    md: "rounded-xl px-5 py-2.5 text-sm",
    lg: "rounded-xl px-6 py-3 text-base",
  };

  const styles: Record<string, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground border-2 border-border hover:border-primary hover:text-primary active:bg-accent",
    ghost:
      "bg-transparent text-foreground hover:bg-accent active:bg-accent/80",
  };
  
  return <a className={cn(base, sizes[size], styles[variant], className)} {...props} />;
}

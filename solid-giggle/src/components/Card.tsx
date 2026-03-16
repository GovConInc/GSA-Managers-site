import type { ReactNode } from "react";
import { cn } from "./cn";

export default function Card({
  children,
  className,
  hover = true,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
}) {
  const variants: Record<string, string> = {
    default: "border border-border bg-card shadow-soft",
    elevated: "bg-card shadow-xl shadow-shadow",
    outlined: "border-2 border-border bg-card",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        hover && "hover:scale-[1.02] hover:shadow-lg hover:border-primary",
        className
      )}
    >
      {children}
    </div>
  );
}
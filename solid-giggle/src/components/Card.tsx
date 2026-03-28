import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "./cn";

export default function Card({
  children,
  className,
  hover = false,
  variant = "default",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
} & Omit<HTMLAttributes<HTMLDivElement>, "className">) {
  const variants: Record<string, string> = {
    default: "border border-warm-border bg-white",
    elevated: "bg-white shadow-card",
    outlined: "border border-warm-border bg-transparent",
  };

  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-card hover:-translate-y-0.5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

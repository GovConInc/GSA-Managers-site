import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "./cn";

export default function Card({
  children,
  className,
  hover = true,
  variant = "default",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
} & Omit<HTMLAttributes<HTMLDivElement>, "className">) {
  const variants: Record<string, string> = {
    default: "border border-slate-100 bg-white shadow-soft",
    elevated: "bg-white shadow-lg",
    outlined: "border border-slate-200 bg-white",
  };

  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-glow hover:border-brand-blue/20",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

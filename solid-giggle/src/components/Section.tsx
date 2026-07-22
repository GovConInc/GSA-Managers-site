import type { ReactNode } from "react";
import { cn } from "./cn";

export default function Section({
  title,
  kicker,
  children,
  id,
  actions,
  className,
  center = false,
  dark = false,
}: {
  title?: string;
  kicker?: string;
  id?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-20", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {title && (
        <div className={cn(
          center ? "flex flex-col gap-2 items-center text-center" : "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        )}>
          <div>
            {kicker && (
              <p className={cn("text-sm font-medium uppercase tracking-widest", dark ? "text-cta" : "text-cta")}>
                {kicker}
              </p>
            )}
            <h2 className={cn("mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl", dark ? "text-white" : "text-ink")}>
              {title}
            </h2>
          </div>
          {actions && <div className={cn("mt-4 sm:mt-0", center && "mt-4")}>{actions}</div>}
        </div>
        )}
        <div className={cn("mt-10", !title && "mt-0")}>{children}</div>
      </div>
    </section>
  );
}

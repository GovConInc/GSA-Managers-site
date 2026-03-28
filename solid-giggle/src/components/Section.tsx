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
}: {
  title: string;
  kicker?: string;
  id?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-20", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className={cn(
          center ? "flex flex-col gap-2 items-center text-center" : "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        )}>
          <div>
            {kicker && (
              <p className="text-sm font-medium uppercase tracking-widest text-cta">
                {kicker}
              </p>
            )}
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-ink">
              {title}
            </h2>
          </div>
          {actions && <div className={cn("mt-4 sm:mt-0", center && "mt-4")}>{actions}</div>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

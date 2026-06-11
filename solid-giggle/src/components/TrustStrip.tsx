import { CheckCircle2 } from "lucide-react";
import { TRUST_POINTS } from "../lib/constants";
import { cn } from "./cn";

/** Risk-reversal strip — appears directly under primary CTA pairs. */
export default function TrustStrip({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2",
        className
      )}
    >
      {TRUST_POINTS.map((point) => (
        <span
          key={point}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            dark ? "text-white/70" : "text-ink-light"
          )}
        >
          <CheckCircle2 size={15} className="text-cta shrink-0" />
          {point}
        </span>
      ))}
    </div>
  );
}

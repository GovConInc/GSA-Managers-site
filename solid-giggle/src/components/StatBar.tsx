import { motion } from "framer-motion";
import { SIGNATURE_STATS } from "../lib/constants";
import { cn } from "./cn";

/**
 * Signature stat bar — the same 4 numbers, hammered on every page.
 * Renders above heroes ("numbers persuade before the pitch starts").
 */
export default function StatBar({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4",
        className
      )}
    >
      {SIGNATURE_STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <div
            className={cn(
              "font-display text-2xl sm:text-3xl font-bold",
              dark ? "text-white" : "text-ink"
            )}
          >
            {stat.value}
          </div>
          <div
            className={cn(
              "mt-1 text-xs sm:text-sm font-medium",
              dark ? "text-white/60" : "text-ink-light"
            )}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

export interface Faq {
  q: string;
  a: string;
}

/**
 * FAQ accordion with FAQPage structured data baked in —
 * doubles as final objection cleanup and SEO surface.
 */
export default function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {withSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            })}
          </script>
        </Helmet>
      )}

      {faqs.map((faq, idx) => (
        <button
          key={idx}
          onClick={() => setActive(active === idx ? null : idx)}
          className={cn(
            "w-full text-left rounded-2xl border p-6 lg:p-7 transition-all duration-300",
            active === idx
              ? "border-brand bg-white shadow-md"
              : "border-warm-border bg-white hover:border-brand/30 hover:shadow-soft"
          )}
        >
          <div className="flex items-center justify-between gap-6">
            <h4
              className={cn(
                "font-display text-lg font-bold transition-colors",
                active === idx ? "text-brand" : "text-ink"
              )}
            >
              {faq.q}
            </h4>
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                active === idx ? "bg-brand/10 text-brand" : "bg-surface text-ink-muted"
              )}
            >
              <ChevronDown
                size={18}
                className={cn("transition-transform duration-300", active === idx && "rotate-180")}
              />
            </div>
          </div>
          <AnimatePresence>
            {active === idx && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-ink-light leading-relaxed overflow-hidden"
              >
                {faq.a}
              </motion.p>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}

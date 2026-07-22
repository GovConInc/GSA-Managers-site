import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap, BookOpen } from "lucide-react";
import { LinkButton } from "./Button";
import { TIER1_OFFERS, TIER2_OFFERS, type Offer } from "../lib/offers";
import { cn } from "./cn";

function OfferCard({ offer, featured, idx }: { offer: Offer; featured?: boolean; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.08, duration: 0.5 }}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        featured ? "border-cta ring-1 ring-cta shadow-elevated" : "border-warm-border"
      )}
    >
      {offer.badge && (
        <span
          className={cn(
            "absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md",
            featured ? "bg-cta" : "bg-brand"
          )}
        >
          <Zap size={12} />
          {offer.badge}
        </span>
      )}

      <h3 className="font-display text-xl font-bold text-ink leading-snug">{offer.name}</h3>
      <p className="mt-2 text-sm font-semibold text-brand">{offer.hook}</p>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-ink">{offer.displayPrice}</span>
        {offer.priceNote && (
          <span className="text-sm font-medium text-ink-muted">{offer.priceNote}</span>
        )}
      </div>
      {offer.monthlyOption && (
        <p className="mt-1 text-sm font-semibold text-cta">{offer.monthlyOption}</p>
      )}

      <p className="mt-5 text-sm text-ink-light leading-relaxed">{offer.description}</p>

      <div className="mt-6 space-y-2.5 pt-6 border-t border-warm-border/60 mb-8">
        {offer.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-sm font-medium text-ink-light">
            <CheckCircle2 size={16} className="text-cta shrink-0 mt-0.5" />
            {f}
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-3">
        <LinkButton
          href={offer.orderHref}
          size="lg"
          className={cn(
            "w-full shadow-md hover:shadow-lg transition-shadow",
            !featured && "bg-brand hover:bg-brand-dark"
          )}
        >
          Buy Now — {offer.displayPrice}
          <ArrowRight size={16} className="ml-2" />
        </LinkButton>
        <Link
          to={offer.learnHref}
          className="flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-light hover:text-brand transition-colors"
        >
          <BookOpen size={14} />
          Learn more about this service
        </Link>
      </div>
    </motion.div>
  );
}

/**
 * Transparent tiered pricing — Tier 1 immediate-action offers up top,
 * Tier 2 retainers side-by-side beneath, with the $1,999 modification
 * deliberately anchoring the $4,500 annual plan.
 */
export default function PricingTiers({ showHeaders = true }: { showHeaders?: boolean }) {
  return (
    <div className="space-y-16">
      {/* Tier 1 — quick checkout */}
      <div>
        {showHeaders && (
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-2">
              Fix It Now — A-La-Carte
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Urgent problems, flat-fee answers. Checkout in minutes.
            </h3>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl">
          {TIER1_OFFERS.map((offer, idx) => (
            <OfferCard key={offer.id} offer={offer} idx={idx} />
          ))}
        </div>
      </div>

      {/* Tier 2 — retainers */}
      <div>
        {showHeaders && (
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-2">
              Management Programs
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Why pay $1,999 for one mod when $4,500 covers a full year?
            </h3>
            <p className="mt-3 text-ink-light max-w-2xl">
              One standalone modification costs $1,999. For $2,501 more, Complete Management
              covers <em>every</em> modification for 12 months — plus all backend services, eBuy support, guaranteed 14-day
              submissions, and a dedicated PM. That&apos;s the math.
            </p>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl">
          {TIER2_OFFERS.map((offer, idx) => (
            <OfferCard key={offer.id} offer={offer} featured={offer.id === "complete-management"} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

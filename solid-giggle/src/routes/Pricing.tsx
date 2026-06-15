import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, BadgeCheck } from "lucide-react";
import { LinkButton } from "../components/Button";
import PricingTiers from "../components/PricingTiers";
import TrustStrip from "../components/TrustStrip";
import FaqList from "../components/FaqList";
import { ServiceFinalCta } from "../components/ServiceBlocks";
import { TIER3_OFFERS } from "../lib/offers";
import { BRAND } from "../lib/constants";

const consultantWhen = [
  "Your schedule generates (or should generate) real revenue and downtime costs you money",
  "Mods, reporting, and FCP work keep slipping behind actual client work",
  "You've had a modification rejected or a compliance scare",
  "Nobody on staff owns the GSA relationship end-to-end",
  "You'd rather pay a flat fee than burn hundreds of staff hours",
];

const diyWhen = [
  "Your schedule is brand new and your catalog is tiny",
  "You have a trained admin with genuine spare capacity",
  "You expect zero modifications this year",
  "You're comfortable tracking GSA deadline changes yourself",
];

const faqs = [
  {
    q: "Are these prices really flat — no hourly billing?",
    a: "Yes. Every price on this page is a flat fee. The only variable is the GSA Schedule Submission service, which starts at $4,995 and can increase for unusually complex offers (many SINs, large catalogs) — and we tell you the exact number before you pay anything.",
  },
  {
    q: "What do other GSA consultants charge?",
    a: "Industry pricing for full-service submissions runs roughly $3,500–$25,000, and ongoing management retainers are frequently quoted only after a sales call. We publish our pricing because we think you should be able to do the math before you talk to anyone.",
  },
  {
    q: "Can I pay monthly instead of up front?",
    a: "Yes — Core Maintenance is $250/month and Complete Management is $375/month. No long-term lock-in; the flat annual totals simply save you the equivalent of paying as you go.",
  },
  {
    q: "What if I need something that isn't listed?",
    a: "Book a free strategy call. Multi-schedule portfolios, novations, rescue engagements after a cancellation notice — we handle them all, and we'll quote a flat fee up front.",
  },
  {
    q: "When do you start after I purchase?",
    a: "Kickoff is within one business day of checkout, for every service. Modifications are submitted within 14 days; MAS submissions within 45 days. Those guarantees are part of the engagement.",
  },
];

export default function Pricing() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Services Pricing — Flat Fees, Published | {BRAND.name}</title>
        <meta
          name="description"
          content="Transparent GSA consulting prices: FCP transition & compliance audit $499, standalone major modification $2,999, 6-month maintenance $1,499, 12-month complete management $4,500. Flat fees, no lock-in."
        />
        <meta
          name="keywords"
          content="GSA consultant pricing, GSA contract management cost, GSA modification cost, FCP migration price, GSA schedule services pricing"
        />
        <link rel="canonical" href={`${BRAND.url}/pricing`} />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              Flat rates. Published.
              <span className="block mt-2 text-cta">Order online right now.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              Most GSA consultants hide pricing behind a sales call.
              Below is everything we charge — flat fees, guaranteed timelines, two-click checkout.
            </p>
            <TrustStrip className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* ── Tiered pricing ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <PricingTiers />

          {/* Tier 3 — acquisition & activation */}
          <div className="mt-16">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-2">
                New to GSA
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Need a schedule or just got one?
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl">
              {TIER3_OFFERS.map((offer, idx) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="flex flex-col rounded-2xl border border-warm-border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                >
                  <h3 className="font-display text-xl font-bold text-ink leading-snug">{offer.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-brand">{offer.hook}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-ink">{offer.displayPrice}</span>
                    {offer.priceNote && (
                      <span className="text-sm font-medium text-ink-muted">{offer.priceNote}</span>
                    )}
                  </div>
                  <p className="mt-5 text-sm text-ink-light leading-relaxed">{offer.description}</p>
                  <div className="mt-6 space-y-2.5 pt-6 border-t border-warm-border/60 mb-8">
                    {offer.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm font-medium text-ink-light">
                        <BadgeCheck size={16} className="text-cta shrink-0 mt-0.5" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <LinkButton
                      href={offer.orderHref}
                      size="lg"
                      className="w-full bg-brand hover:bg-brand-dark shadow-md hover:shadow-lg transition-shadow"
                    >
                      Get Started — {offer.displayPrice}
                      <ArrowRight size={16} className="ml-2" />
                    </LinkButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Honesty section: consultant vs DIY ── */}
      <section className="bg-surface py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Honest Assessment</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Do you actually need us?
            </h2>
            <p className="mt-5 text-ink-light text-lg">
              Sometimes handling GSA in-house is the right call. Here's how to tell.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-cta ring-1 ring-cta bg-white p-8 shadow-elevated">
              <h3 className="font-display text-lg font-bold text-ink mb-6">
                ✅ Hire a consultant when…
              </h3>
              <div className="space-y-4">
                {consultantWhen.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-medium text-ink-light">
                    <CheckCircle2 size={16} className="text-cta shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-warm-border bg-white p-8">
              <h3 className="font-display text-lg font-bold text-ink mb-6">
                ❌ DIY makes sense when…
              </h3>
              <div className="space-y-4">
                {diyWhen.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-ink-light">
                    <XCircle size={16} className="text-ink-muted shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink-muted leading-relaxed border-t border-warm-border pt-5">
                If that describes you, handle it internally. Use our{" "}
                <a href="/intelligence" className="font-semibold text-brand hover:underline">
                  Intelligence Hub
                </a>{" "}
                for guidance, and reach out when the workload outgrows internal capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Pricing Questions</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <ServiceFinalCta
        title="Ready to order? Checkout takes two minutes."
        body="Kickoff happens within one business day. Every timeline above is guaranteed in writing."
        primaryLabel="Go to Secure Checkout"
        primaryHref="/order"
      />
    </div>
  );
}

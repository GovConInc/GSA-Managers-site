import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  EyeOff,
  ShieldOff,
  Clock,
  Search,
  UploadCloud,
  BadgeCheck,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { ServiceHero, BuyCard, ServiceFinalCta, ServiceSchema } from "../../components/ServiceBlocks";
import FaqList from "../../components/FaqList";
import LeadMagnet from "../../components/LeadMagnet";
import { LinkButton } from "../../components/Button";
import { BRAND } from "../../lib/constants";
import { SERVICE_DICTIONARY } from "../../lib/offers";

const risks = [
  {
    icon: EyeOff,
    title: "Invisible on GSA Advantage",
    desc: "An unmigrated catalog means agencies can't find — or buy — your products. You're on schedule in name only.",
  },
  {
    icon: ShieldOff,
    title: "Suspension exposure",
    desc: "Non-compliant catalogs invite CO scrutiny, cancellation clauses, and the one word no contract holder wants: suspension.",
  },
  {
    icon: Clock,
    title: "A deadline that isn't moving",
    desc: "SIP is retired. The FAS Catalog Platform is mandatory. Every week of delay compounds the cleanup — and the risk.",
  },
];

const process = [
  {
    icon: Search,
    step: "Step 1",
    title: "Compliance Audit",
    desc: SERVICE_DICTIONARY["Compliance Review"],
  },
  {
    icon: UploadCloud,
    step: "Step 2",
    title: "Full FCP Migration",
    desc: SERVICE_DICTIONARY["FCP Transition"],
  },
  {
    icon: BadgeCheck,
    step: "Step 3",
    title: "Verification & Handoff",
    desc: "We verify every line item is live and compliant on GSA Advantage, then hand you a clean, documented catalog your team can actually maintain.",
  },
];

const faqs = [
  {
    q: "What is the FAS Catalog Platform (FCP) transition?",
    a: "GSA retired the legacy SIP system and now requires all Schedule holders to manage their catalogs on the FAS Catalog Platform. The migration is mandatory — and until your baseline is live on FCP, your products can be invisible to buyers on GSA Advantage.",
  },
  {
    q: "What does the $499 package include?",
    a: "Two things: your complete FCP catalog migration executed start to finish, and a full compliance audit of your GSA Schedule. Because we take on this complex heavy lifting, your team bypasses the administrative bottleneck entirely — and you eliminate the risk of suspension.",
  },
  {
    q: "How long does an FCP migration take?",
    a: "We begin within one business day of checkout and complete most migrations well inside GSA's mandated windows. Complex catalogs with thousands of line items take longer — we'll give you an exact timeline at kickoff.",
  },
  {
    q: "What does a GSA Schedule compliance audit cover?",
    a: "Catalog accuracy, pricing consistency, TAA compliance, SIN mapping, mass mod status, SAM registration health, and reporting posture. You get a documented assessment of exactly where your schedule stands and what we fixed.",
  },
  {
    q: "I was just awarded my schedule. Is this for me?",
    a: "Yes — new awardees must complete an FCP catalog baseline upload within GSA's 30-day window. Our New Vendor Special ($1,450) bundles the baseline upload with 1-on-1 platform training and 90 days of complimentary contract management.",
  },
  {
    q: "What happens after the migration?",
    a: "Your catalog needs ongoing maintenance — pricing updates, corrections, new items. Most clients roll into Core Maintenance ($1,499 / 6 months) so the catalog never drifts out of compliance again.",
  },
];

export default function FcpTransition() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>FAS Catalog Platform Migration Service — $499 Flat Fee | {BRAND.name}</title>
        <meta
          name="description"
          content="FAS Catalog Platform (FCP) migration service plus a complete GSA Schedule compliance audit — $499 flat fee. We execute the mandatory transition, eliminate suspension risk, and get your catalog selling on GSA Advantage."
        />
        <meta
          name="keywords"
          content="FAS Catalog Platform migration service, FCP transition, GSA schedule compliance audit, FCP catalog baseline, SIP to FCP migration"
        />
        <link rel="canonical" href={`${BRAND.url}/fcp-transition-service`} />
      </Helmet>
      <ServiceSchema
        name="FAS Catalog Platform Migration & GSA Compliance Audit"
        description="Complete FCP transition execution plus a full GSA Schedule compliance audit for a $499 flat fee."
        price="499"
        url="/fcp-transition-service"
      />

      <ServiceHero
        eyebrow="FCP Transition & Compliance Assurance"
        title="Your FAS Catalog Platform migration."
        accent="Done for you. $499 flat."
        lede="We execute your mandatory FCP transition and audit your GSA Schedule to guarantee 100% compliance. Because we take on this immediate, complex heavy lifting, your team bypasses the administrative bottleneck and eliminates the risk of suspension."
        primaryLabel="Fix It Now — $499"
        primaryHref="/order?service=fcp-transition"
      />

      {/* ── Urgency band ── */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-8 flex items-center justify-center gap-3 relative z-10 text-center">
          <AlertTriangle size={18} className="text-white shrink-0" />
          <p className="text-sm md:text-base text-white/90">
            <strong className="text-white">SIP is retired. FCP is mandatory.</strong> An unmigrated
            catalog can't be bought on GSA Advantage.
          </p>
        </div>
      </div>

      {/* ── What's at stake + buy card ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">What's at Stake</p>
                <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight mb-12">
                  This isn't an upgrade. It's survival.
                </h2>

                <div className="space-y-6">
                  {risks.map((risk, idx) => (
                    <motion.div
                      key={risk.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: idx * 0.07, duration: 0.45 }}
                      className="flex gap-5 rounded-2xl border border-warm-border bg-white p-7 hover:shadow-elevated transition-shadow duration-300"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                        <risk.icon size={22} className="text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-ink mb-2">{risk.title}</h3>
                        <p className="text-ink-light leading-relaxed">{risk.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Process */}
                <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3 mt-16">
                  How We Fix It
                </p>
                <h2 className="font-display text-3xl font-bold text-ink tracking-tight mb-10">
                  Audit. Migrate. Verify. Done.
                </h2>
                <div className="space-y-6">
                  {process.map((p, idx) => (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: idx * 0.07, duration: 0.45 }}
                      className="flex gap-5 rounded-2xl border border-warm-border bg-white p-7 hover:shadow-elevated hover:border-cta/30 transition-all duration-300"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cta/10 border border-cta/15">
                        <p.icon size={22} className="text-cta" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-brand">{p.step}</span>
                        <h3 className="font-display text-lg font-bold text-ink mb-2 mt-1">{p.title}</h3>
                        <p className="text-ink-light leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <BuyCard
                name="FCP Transition & Compliance Assurance"
                price="$499"
                priceNote="flat fee"
                features={[
                  "Complete FCP catalog migration",
                  "Full GSA Schedule compliance audit",
                  "Suspension-risk elimination",
                  "Kickoff within 1 business day",
                  "Catalog verified live on GSA Advantage",
                ]}
                orderHref="/order?service=fcp-transition"
                ctaLabel="Buy Now — $499"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── New vendor cross-sell ── */}
      <section className="bg-surface py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-warm-border bg-white p-10 md:p-14 shadow-elevated relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-cta" />
            <div className="grid gap-10 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket size={18} className="text-cta" />
                  <span className="text-xs font-bold uppercase tracking-widest text-cta">Just Awarded?</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
                  The New Vendor Special: baseline upload + training + 90 days of management.
                </h2>
                <p className="mt-4 text-ink-light leading-relaxed">
                  New awardees have 30 days to get their FCP catalog baseline live. We handle the
                  upload, train your team 1-on-1 on every GSA platform, and manage your contract
                  for 90 days — so your first federal sale comes faster.
                </p>
              </div>
              <div className="text-center lg:text-right">
                <p className="font-display text-4xl font-bold text-ink">$1,450</p>
                <p className="text-sm text-ink-muted mb-5">flat fee</p>
                <LinkButton href="/order?service=new-vendor" size="lg" className="w-full lg:w-auto shadow-md">
                  Get the Special
                  <ArrowRight size={16} className="ml-2" />
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              FCP &amp; Compliance Questions
            </h2>
          </div>
          <FaqList faqs={faqs} />
          <p className="mt-10 text-center text-ink-light">
            Want the full picture first?{" "}
            <Link
              to="/intelligence/fas-catalog-platform-transition-guide"
              className="font-semibold text-brand hover:underline"
            >
              Read: The 2026 Guide to the FCP Transition →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Lead magnet ── */}
      <section className="bg-surface py-20 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <LeadMagnet />
        </div>
      </section>

      <ServiceFinalCta
        title="Secure your schedule before the deadline does it for you."
        body="$499 flat. Kickoff within one business day. That means your schedule is instantly modernized, secured, and ready to sell."
        primaryLabel="Start My FCP Transition — $499"
        primaryHref="/order?service=fcp-transition"
      />
    </div>
  );
}

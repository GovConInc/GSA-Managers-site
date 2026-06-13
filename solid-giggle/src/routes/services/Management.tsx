import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Wrench,
  GraduationCap,
  ClipboardList,
  Timer,
  BarChart3,
  FileText,
  Presentation,
  ShieldCheck,
} from "lucide-react";
import { ServiceHero, ServiceFinalCta, ServiceSchema } from "../../components/ServiceBlocks";
import PricingTiers from "../../components/PricingTiers";
import FaqList from "../../components/FaqList";
import LeadMagnet from "../../components/LeadMagnet";
import { BRAND } from "../../lib/constants";
import { SERVICE_DICTIONARY } from "../../lib/offers";

/* Everything in the retainers, described with the master copy dictionary. */
const included = [
  { icon: Wrench, title: "Major Modifications", copy: SERVICE_DICTIONARY["Major Modifications"] },
  { icon: ClipboardList, title: "Minor Modifications", copy: SERVICE_DICTIONARY["Minor Modifications"] },
  { icon: BarChart3, title: "Sales Assessment", copy: SERVICE_DICTIONARY["Sales Assessment"] },
  { icon: Presentation, title: "Sales Training", copy: SERVICE_DICTIONARY["Sales Training"] },
  { icon: GraduationCap, title: "Admin Training", copy: SERVICE_DICTIONARY["Admin Training"] },
  { icon: Timer, title: "14-Day Guarantee", copy: SERVICE_DICTIONARY["14-Day Guarantee"] },
];

/* Engagement timeline — mirrors our delivery phases. */
const phases = [
  {
    label: "Months 1–3",
    title: "Initiation & Foundation",
    items: [
      "Engagement kickoff & Authorized Negotiator setup",
      "Contract health audit & document review",
      "Catalog baseline review & alignment",
      "First modification submitted",
    ],
  },
  {
    label: "Months 4–6",
    title: "Active Modifications",
    items: [
      "Modification submissions & milestone tracking",
      "Advisory calls & strategic planning",
      "eBuy & Advantage engagement",
      "Catalog updates & compliance monitoring",
    ],
  },
  {
    label: "Months 7–9",
    title: "Optimization & Training",
    items: [
      "Training sessions & team onboarding",
      "Mid-engagement review & ISS reporting",
      "Catalog refresh & optimization",
      "Compliance review & GSA audit preparation",
    ],
  },
  {
    label: "Months 10–12",
    title: "Review & Renewal",
    items: [
      "Annual review & contract health assessment",
      "Option year & renewal planning",
      "Year-end ISS reporting",
      "Contract continuation roadmap",
    ],
  },
];

const comparison = {
  inHouse: [
    "10+ staff hours every month on portal work",
    "Mods drafted by someone doing it once a year",
    "Compliance deadlines tracked in someone's inbox",
    "Rejections mean weeks of lost revenue",
    "Knowledge walks out the door with staff turnover",
  ],
  outsourced: [
    "Your involvement: approving our work",
    "Mods drafted by a team that does this daily",
    "Every deadline tracked, every report filed",
    "14-day submission guarantee, 98% approval",
    "$4,500 flat for an entire year — no surprises",
  ],
};

const faqs = [
  {
    q: "What's the difference between Core Maintenance and Complete Management?",
    a: "Core Maintenance ($1,499 / 6 months) covers all minor modifications plus 3 sales assessments and 3 training sessions — the essential back office. Complete Management ($4,500 / 12 months) covers everything: all major AND minor modifications, the 14-day submission guarantee, 6 sales and admin training sessions, and a dedicated project manager.",
  },
  {
    q: "Why is annual management cheaper than buying modifications one at a time?",
    a: "A single standalone major modification is $2,999. Complete Management is $4,500 for twelve months of unlimited major and minor mods. If you expect even two modifications this year, the annual plan already pays for itself — everything else it includes is effectively free.",
  },
  {
    q: "Can I pay monthly?",
    a: "Yes. Core Maintenance is available at $250/month and Complete Management at $375/month. No long-term lock-in.",
  },
  {
    q: "How do you handle IFF sales reporting?",
    a: "We calculate and file your monthly or quarterly 72A IFF sales reports, maintain transaction records, and resolve discrepancies before they become compliance issues. Reporting is included in both retainer plans.",
  },
  {
    q: "What happens if GSA issues a mass modification?",
    a: "We review, process, and accept mass mods on your behalf as part of both plans — before the deadline, every time. Missed mass mods are one of the most common causes of schedule cancellation.",
  },
  {
    q: "Do you take over communication with my Contracting Officer?",
    a: "Yes. Under Complete Management we handle CO communications end-to-end, from clarification requests to option-year negotiations, with your approval at every decision point.",
  },
];

export default function Management() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>Outsource GSA Catalog Maintenance & Contract Management | {BRAND.name}</title>
        <meta
          name="description"
          content="Outsource GSA catalog maintenance and contract management. All modifications, IFF reporting, FCP updates, and compliance handled — $1,499 for 6 months or $4,500 for a full year. 14-day submission guarantee."
        />
        <meta
          name="keywords"
          content="outsource GSA catalog maintenance, GSA contract management, GSA schedule management, GSA back office, GSA maintenance service"
        />
        <link rel="canonical" href={`${BRAND.url}/gsa-contract-management`} />
      </Helmet>
      <ServiceSchema
        name="GSA Contract Management & Catalog Maintenance"
        description="Full-service GSA Schedule management retainers covering all modifications, IFF reporting, FCP catalog maintenance, compliance, and training."
        price="4500"
        url="/gsa-contract-management"
      />

      <ServiceHero
        eyebrow="GSA Contract Management — Core Retainers"
        title="Outsource your GSA catalog maintenance."
        accent="Reclaim your team."
        lede="We take over your entire GSA back office — every modification, sales report, catalog update, and compliance deadline. Because we secure your foundation, you stop losing ground and actively capture market share."
        primaryLabel="See Plans — From $250/mo"
        primaryHref="#plans"
      />

      {/* ── The math: why this is a no-brainer ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-ink p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Do the Math</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  One modification: $2,999. A full year of <em>every</em> modification — plus
                  training and a dedicated PM: $4,500.
                </h2>
                <p className="mt-5 text-white/70 leading-relaxed max-w-2xl">
                  That&apos;s the entire pitch. If your schedule needs even two changes this year,
                  Complete Management already costs less than buying mods a la carte — and it
                  removes every other GSA task from your plate at the same time.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-7 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">Complete Management</p>
                <p className="font-display text-5xl font-bold text-white mt-2">$4,500</p>
                <p className="text-sm text-white/60 mt-1">12 months, total — or $375/mo</p>
                <p className="mt-4 text-sm font-semibold text-cta">Unlimited mods · 14-day guarantee</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="bg-surface py-24 lg:py-28 scroll-mt-20" id="plans">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <PricingTiers />
        </div>
      </section>

      {/* ── What's included — dictionary copy ── */}
      <section className="bg-white py-24 lg:py-28 relative scroll-mt-20" id="training">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              Inside the Retainers
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Modifications, training, and a guarantee with teeth.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {included.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 hover:shadow-elevated hover:border-cta/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/10 border border-cta/15 mb-5">
                  <item.icon size={22} className="text-cta" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In-house vs outsourced ── */}
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
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">The Honest Comparison</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              In-house vs. outsourced — side by side.
            </h2>
            <p className="mt-5 text-ink-light text-lg">
              If your team genuinely has spare capacity, keep it in-house. Most don&apos;t.{" "}
              <Link to="/intelligence/in-house-vs-outsourced-gsa-management" className="font-semibold text-brand hover:underline">
                Read the full cost breakdown →
              </Link>
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-warm-border bg-white p-8">
              <h3 className="font-display text-lg font-bold text-ink mb-6 flex items-center gap-2">
                <XCircle size={20} className="text-red-400" />
                Keeping it in-house
              </h3>
              <div className="space-y-4">
                {comparison.inHouse.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-ink-light">
                    <XCircle size={16} className="text-red-300 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-cta ring-1 ring-cta bg-white p-8 shadow-elevated">
              <h3 className="font-display text-lg font-bold text-ink mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-cta" />
                Handing it to us
              </h3>
              <div className="space-y-4">
                {comparison.outsourced.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-medium text-ink-light">
                    <CheckCircle2 size={16} className="text-cta shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12-month engagement timeline ── */}
      <section className="bg-white py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Your First Year</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              What 12 months of Complete Management looks like.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, idx) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-7 hover:shadow-elevated transition-shadow duration-300"
              >
                <span className="inline-block rounded-full bg-brand/5 border border-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand mb-4">
                  {phase.label}
                </span>
                <h3 className="font-display text-lg font-bold text-ink mb-4">{phase.title}</h3>
                <div className="space-y-2.5">
                  {phase.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-ink-light">
                      <FileText size={14} className="text-cta shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              GSA Management Questions
            </h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* ── Lead magnet ── */}
      <section className="bg-white py-20 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <LeadMagnet />
        </div>
      </section>

      <ServiceFinalCta
        title="Ready to never think about your GSA back office again?"
        body="Pick a retainer and we start within one business day. Because we eliminate your red tape, your team focuses 100% on driving revenue."
        primaryLabel="Start Complete Management — $4,500"
        primaryHref="/order?service=complete-management"
      />
    </div>
  );
}

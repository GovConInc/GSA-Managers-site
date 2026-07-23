import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  BadgeCheck,
  Zap,
  DollarSign,
  Target,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { ServiceHero, BuyCard, ServiceFinalCta, ServiceSchema } from "../../components/ServiceBlocks";
import FaqList from "../../components/FaqList";
import { BRAND } from "../../lib/constants";
import { cn } from "../../components/cn";

/* ── 45-day submission timeline ── */
interface GanttPhase {
  label: string;
  start: number;
  duration: number;
  color: string;
  details: string[];
}

const ganttPhases: GanttPhase[] = [
  { label: "Kickoff & Strategy", start: 0, duration: 3, color: "bg-brand", details: ["Business capabilities review", "Target SIN identification", "Communication cadence setup", "Milestone expectations"] },
  { label: "Document Collection", start: 3, duration: 9, color: "bg-brand-light", details: ["Federal tax returns (2yr min)", "Financial statements", "Past performance narratives", "Commercial price lists"] },
  { label: "eOffer Preparation", start: 12, duration: 7, color: "bg-sky-600", details: ["SAM.gov verification", "FAS ID creation", "SIN justification", "Portal data entry"] },
  { label: "Holy Trinity Review", start: 19, duration: 3, color: "bg-amber-600", details: ["Admin completeness check", "Technical validation", "Pricing verification", "Cross-volume consistency"] },
  { label: "Price & Tech Deep Dive", start: 22, duration: 7, color: "bg-brand", details: ["CSP analysis", "Price escalation", "Labor category descriptions", "Technical narrative refinement"] },
  { label: "Final Polish", start: 29, duration: 7, color: "bg-brand-light", details: ["Document formatting", "Signature verification", "Attachment checklist", "Quality audit"] },
  { label: "GSA Submission", start: 36, duration: 9, color: "bg-emerald-600", details: ["eOffer package upload", "Confirmation receipt", "CO assignment notification", "Clarification prep"] },
];

function GanttChart() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const unitCount = 45;
  const markers = [0, 9, 18, 27, 36, 45];

  return (
    <div className="mt-10 rounded-xl border border-warm-border bg-white p-6 lg:p-8">
      <h4 className="text-xs font-medium uppercase tracking-widest text-ink-muted mb-6">
        45-Day Submission Timeline
      </h4>

      <div className="relative h-4 mb-2">
        {markers.map((m) => (
          <span
            key={m}
            className="absolute text-[11px] text-ink-muted font-medium"
            style={{ left: `${(m / unitCount) * 100}%` }}
          >
            <span className="relative -translate-x-1/2">{m === 0 ? "Start" : `Day ${m}`}</span>
          </span>
        ))}
      </div>

      <div className="space-y-2.5 mt-4">
        {ganttPhases.map((phase, idx) => {
          const leftPct = (phase.start / unitCount) * 100;
          const widthPct = (phase.duration / unitCount) * 100;
          const isHovered = hoveredPhase === idx;

          return (
            <div key={idx}>
              <div
                className="relative h-10 cursor-pointer"
                onMouseEnter={() => setHoveredPhase(idx)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <div className="absolute inset-0 rounded-lg bg-surface border border-warm-border/50" />
                <motion.div
                  className={cn(
                    "absolute top-0 h-full rounded-lg flex items-center px-3 transition-shadow duration-200",
                    phase.color,
                    isHovered ? "shadow-elevated ring-2 ring-white" : ""
                  )}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.45 }}
                >
                  <span className="text-xs font-medium text-white truncate">{phase.label}</span>
                </motion.div>
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 py-3 px-3">
                      {phase.details.map((d) => (
                        <div key={d} className="flex items-center gap-2 text-sm text-ink-light">
                          <CheckCircle size={13} className="text-brand shrink-0" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Why get on Schedule ── */
const gsaBenefits = [
  { title: "Pre-Vetted Credibility", desc: "Agencies trust GSA contractors — you've passed rigorous government scrutiny.", icon: BadgeCheck, stat: "80%", statLabel: "of agencies prefer GSA" },
  { title: "Streamlined Procurement", desc: "Agencies buy from you in days, not months — no lengthy competitive bidding.", icon: Zap, stat: "90%", statLabel: "faster procurement" },
  { title: "Massive Buying Pool", desc: "Access $50B+ in annual federal spending through GSA vehicles.", icon: DollarSign, stat: "$50B+", statLabel: "annual spend" },
  { title: "Reduced Competition", desc: "Compete against thousands instead of hundreds of thousands.", icon: Target, stat: "10X", statLabel: "less competition" },
  { title: "20-Year Contract", desc: "5-year base + three 5-year options = stable, long-term revenue.", icon: Calendar, stat: "20yr", statLabel: "contract term" },
  { title: "24/7 Visibility", desc: "Listed on GSA Advantage — the government's online marketplace.", icon: TrendingUp, stat: "24/7", statLabel: "always visible" },
];

const faqs = [
  { q: "How long does it take to get on the GSA Schedule?", a: "With our accelerated process, most clients receive their GSA Schedule within 4–6 months. The industry average is 12+ months. We achieve this through our 'Holy Trinity' review — Admin, Technical, and Pricing volumes — that anticipates Contracting Officer concerns before submission." },
  { q: "What are the minimum qualifications?", a: "You need 2 years of corporate experience, relevant past performance (typically 3–5 projects), and financial viability demonstrated through tax returns and financial statements. Specific requirements vary by SIN category — we assess your eligibility before any payment for the full submission service." },
  { q: "How much of my time does the application take?", a: "A few hours, total. We handle the document preparation, pricing narratives, and the entire eOffer portal build. Your team supplies source documents and approvals — we do the rest." },
  { q: "What's your 45-day guarantee?", a: "We guarantee your complete MAS offer is submitted to GSA within 45 days of kickoff. Most submissions go in within 30 days, following the timeline published on this page." },
  { q: "What happens after the award?", a: "Your catalog must go live on the FAS Catalog Platform within 30 days. Our Catalog Upload & Training ($599) covers the baseline upload, 1-on-1 platform training, and a full compliance audit — so the award actually turns into revenue." },
  { q: "GSA Schedule vs. subcontracting — which is right for me?", a: "Subcontracting gets you revenue share on someone else's contract; a Schedule makes you the prime. If you have two years of past performance and want direct federal relationships, the Schedule wins long-term. If you're earlier than that, subcontract now and build toward a submission." },
];

export default function Submission() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Schedule Submission Service — 45-Day Guarantee | {BRAND.name}</title>
        <meta
          name="description"
          content="Full-service GSA Schedule (MAS) submission with a 45-day submission guarantee and 98% approval rate. We prepare every document, pricing narrative, and portal requirement — awarded in 4–6 months."
        />
        <meta
          name="keywords"
          content="GSA Schedule submission, GSA MAS application help, get on GSA Schedule, GSA Schedule consultants, GSA proposal preparation"
        />
        <link rel="canonical" href={`${BRAND.url}/gsa-schedule-submission`} />
      </Helmet>
      <ServiceSchema
        name="GSA Schedule Submission Service"
        description="Full-service GSA MAS submission — eligibility review, document preparation, eOffer portal management, and a 45-day submission guarantee."
        price="4995"
        url="/gsa-schedule-submission"
      />

      <ServiceHero
        eyebrow="GSA Schedule Submission — Full Service"
        title="Get on the GSA Schedule in 4–6 months."
        accent="You give us a few hours. We do the rest."
        lede="We prepare and submit your complete GSA MAS offer — every document, pricing narrative, and portal requirement — with a 45-day submission guarantee. Because we anticipate Contracting Officer concerns before you submit, 98% of our clients are approved."
        primaryLabel="Start My Submission — $4,995"
        primaryHref="/order?service=gsa-submission"
      />

      {/* ── Timeline + buy card ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
                  The Intimidating Process, Shrunk
                </p>
                <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight mb-6">
                  Thirty days from kickoff to submission.
                </h2>
                <p className="text-ink-light text-lg leading-relaxed max-w-2xl mb-4">
                  The MAS application is a gauntlet: financial documentation, past performance
                  narratives, Commercial Sales Practice analysis, pricing methodology, and a
                  portal that punishes inconsistency. Our &quot;Holy Trinity&quot; review —
                  Admin, Technical, and Pricing — catches what Contracting Officers will flag,
                  before they see it.
                </p>
                <p className="text-ink-light text-lg leading-relaxed max-w-2xl">
                  Hover any phase to see exactly what happens inside it.
                </p>

                <GanttChart />
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <BuyCard
                name="GSA Schedule Submission"
                price="$4,995"
                priceNote="starting at"
                features={[
                  "Eligibility review & SIN selection",
                  "Complete document preparation",
                  "eOffer portal build & management",
                  "Holy Trinity quality review",
                  "45-day submission guarantee",
                  "98% approval rate",
                ]}
                orderHref="/order?service=gsa-submission"
                ctaLabel="Get Started — $4,995"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why GSA ── */}
      <section className="py-24 lg:py-28 bg-surface relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Why It's Worth It</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl leading-tight">
              What a GSA Schedule unlocks.
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gsaBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl border border-warm-border bg-white p-8 hover:shadow-elevated hover:border-brand/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-warm-border shadow-sm group-hover:bg-brand group-hover:border-brand transition-colors">
                      <b.icon size={22} className="text-ink group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-right">
                      <span className="font-display text-3xl font-bold text-brand">{b.stat}</span>
                      <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mt-0.5">{b.statLabel}</p>
                    </div>
                  </div>
                  <h4 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-brand transition-colors">{b.title}</h4>
                  <p className="text-ink-light leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Submission Questions
            </h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <ServiceFinalCta
        title="The federal market is buying. Get in the room."
        body="A few hours of your time, a 45-day submission guarantee, and a 98% approval rate. The hardest part of getting on Schedule is deciding to start."
        primaryLabel="Start My Submission — $4,995"
        primaryHref="/order?service=gsa-submission"
      />
    </div>
  );
}

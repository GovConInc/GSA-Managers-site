import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  FileText,
  Shield,
  Zap,
  Calendar,
  TrendingUp,
  ChevronDown,
  Award,
  Target,
  DollarSign,
  BadgeCheck,
  Rocket,
} from "lucide-react";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { cn } from "../../components/cn";

// ─── TYPES ───
type ServiceId = "submission" | "management" | "new-vendor" | "fcp";

interface GanttPhase {
  label: string;
  start: number;
  duration: number;
  color: string;
  details: string[];
}

interface ServiceData {
  id: ServiceId;
  icon: typeof Award;
  title: string;
  tagline: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  ganttLabel: string;
  ganttUnit: string;
  ganttTotal: number;
  ganttPhases: GanttPhase[];
  cta: string;
  ctaHref: string;
}

// ─── SERVICE DATA ───
const allServices: ServiceData[] = [
  {
    id: "submission",
    icon: Award,
    title: "GSA MAS Submission",
    tagline: "Full-service. 45-day guarantee.",
    price: "$4,995",
    priceNote: "Starting at · One-time",
    description:
      "We prepare and submit your complete GSA Multiple Award Schedule offer in 30 days or less. Our accelerated process is built on the \"Holy Trinity\" review — Admin, Technical, and Pricing volumes — that anticipates Contracting Officer concerns before you submit. 98% of our clients receive their award within 4–6 months.",
    features: [
      "Eligibility review & SIN selection",
      "Complete document preparation",
      "eOffer portal build & management",
      "Holy Trinity review (Admin, Technical, Pricing)",
      "Commercial Sales Practice analysis",
      "Price escalation methodology",
      "Pre-submission quality audit",
      "45-day submission guarantee",
    ],
    ganttLabel: "30-Day Submission Timeline",
    ganttUnit: "Day",
    ganttTotal: 30,
    ganttPhases: [
      { label: "Kickoff & Strategy", start: 0, duration: 2, color: "bg-brand", details: ["Business capabilities review", "Target SIN identification", "Communication cadence setup", "Milestone expectations"] },
      { label: "Document Collection", start: 2, duration: 6, color: "bg-brand-light", details: ["Federal tax returns (2yr min)", "Financial statements", "Past performance narratives", "Commercial price lists"] },
      { label: "eOffer Preparation", start: 8, duration: 5, color: "bg-sky-600", details: ["SAM.gov verification", "FAS ID creation", "SIN justification", "Portal data entry"] },
      { label: "Holy Trinity Review", start: 13, duration: 2, color: "bg-amber-600", details: ["Admin completeness check", "Technical validation", "Pricing verification", "Cross-volume consistency"] },
      { label: "Price & Tech Deep Dive", start: 15, duration: 5, color: "bg-brand", details: ["CSP analysis", "Price escalation", "Labor category descriptions", "Technical narrative refinement"] },
      { label: "Final Polish", start: 20, duration: 5, color: "bg-brand-light", details: ["Document formatting", "Signature verification", "Attachment checklist", "Quality audit"] },
      { label: "GSA Submission", start: 25, duration: 5, color: "bg-emerald-600", details: ["eOffer package upload", "Confirmation receipt", "CO assignment notification", "Clarification prep"] },
    ],
    cta: "Get Started",
    ctaHref: "/order",
  },
  {
    id: "management",
    icon: Shield,
    title: "Annual Contract Management",
    tagline: "Hands-off compliance. Cancel anytime.",
    price: "$4,995",
    priceNote: "Starting at · Per year",
    description:
      "Maintaining a GSA Schedule takes 10+ hours a month. We handle every modification, quarterly report, and compliance requirement so you never risk penalties, missed option renewals, or contract cancellation. One dedicated account manager. Full coverage. No lock-in.",
    features: [
      "Quarterly IFF reporting & sales data",
      "FCP catalog maintenance & updates",
      "Contract modifications (admin & technical)",
      "Compliance monitoring & audit prep",
      "Option year renewal management",
      "CO communication handling",
      "SAM + Advantage + eBuy management",
      "Dedicated account manager",
    ],
    ganttLabel: "Annual Management Cycle",
    ganttUnit: "Month",
    ganttTotal: 12,
    ganttPhases: [
      { label: "Baseline Audit & Setup", start: 0, duration: 1, color: "bg-brand", details: ["Contract health assessment", "Catalog review", "Compliance gap analysis", "Account setup"] },
      { label: "Q1 Sales Report & IFF", start: 0, duration: 3, color: "bg-sky-600", details: ["Calculate 0.75% IFF", "Submit quarterly report", "Transaction record maintenance", "Discrepancy resolution"] },
      { label: "Catalog Management", start: 1, duration: 11, color: "bg-amber-600", details: ["Product/service updates", "Pricing modifications", "New SIN additions", "Refresh submissions"] },
      { label: "Q2 Sales Report & IFF", start: 3, duration: 3, color: "bg-sky-600", details: ["Calculate 0.75% IFF", "Submit quarterly report", "Mid-year reconciliation", "Discrepancy resolution"] },
      { label: "Modifications & Compliance", start: 2, duration: 8, color: "bg-brand-light", details: ["Address/POC updates", "Scope expansions", "TDR monitoring", "Price reduction compliance"] },
      { label: "Q3 Sales Report & IFF", start: 6, duration: 3, color: "bg-sky-600", details: ["Calculate 0.75% IFF", "Submit quarterly report", "Year-to-date analysis", "Discrepancy resolution"] },
      { label: "Q4 Report & Option Review", start: 9, duration: 3, color: "bg-emerald-600", details: ["Final quarterly report", "Annual reconciliation", "Option year assessment", "Renewal preparation"] },
    ],
    cta: "Start Management",
    ctaHref: "/order",
  },
  {
    id: "new-vendor",
    icon: Rocket,
    title: "New Vendor Special",
    tagline: "The fast-start package.",
    price: "$1,450",
    priceNote: "One-time · Includes 90-day management",
    description:
      "Just got your GSA Schedule? This package gets you from award to operational in weeks, not months. We handle your FCP Catalog Baseline upload, walk you through every GSA website and process 1-on-1, and provide 90 days of complimentary contract management so nothing falls through the cracks.",
    features: [
      "Full FCP Catalog Baseline upload",
      "1-on-1 training: GSA Advantage",
      "1-on-1 training: eBuy & FCP platforms",
      "Sales reporting walkthrough",
      "Compliance requirements overview",
      "Process & procedure documentation",
      "90-day contract management included",
      "Dedicated onboarding specialist",
    ],
    ganttLabel: "120-Day Onboarding Timeline",
    ganttUnit: "Week",
    ganttTotal: 16,
    ganttPhases: [
      { label: "FCP Catalog Upload", start: 0, duration: 4, color: "bg-amber-600", details: ["Catalog data gathering", "Product listing QA", "Pricing review", "FCP upload & validation"] },
      { label: "Platform Training", start: 2, duration: 4, color: "bg-brand", details: ["GSA Advantage walkthrough", "eBuy training", "FCP navigation", "Account configuration"] },
      { label: "Process Onboarding", start: 4, duration: 3, color: "bg-brand-light", details: ["Sales reporting training", "Compliance overview", "Modification process", "Documentation handoff"] },
      { label: "90-Day Management", start: 4, duration: 12, color: "bg-emerald-600", details: ["Ongoing compliance monitoring", "First quarterly report prep", "Catalog maintenance", "Issue resolution support"] },
    ],
    cta: "Get Started",
    ctaHref: "/order",
  },
  {
    id: "fcp",
    icon: FileText,
    title: "FCP Catalog Baseline",
    tagline: "Meet the 30-day mandate.",
    price: "$500",
    priceNote: "Flat fee · Delivered within 30 days",
    description:
      "GSA retired SIP and transitioned to the Federal Catalog Platform (FCP). Without an FCP Baseline Upload, your products are invisible on GSA Advantage — meaning agencies can't find or buy from you. We upload your catalog within the GSA-mandated 30-day window and ensure every line item is compliant.",
    features: [
      "Full FCP Baseline catalog upload",
      "Product listing & offer pricing QA",
      "SIN & product issue resolution",
      "Roadmap & technical consultations",
      "Compliance review before submission",
      "30-day delivery guarantee",
    ],
    ganttLabel: "30-Day FCP Upload Timeline",
    ganttUnit: "Day",
    ganttTotal: 30,
    ganttPhases: [
      { label: "Catalog Audit", start: 0, duration: 5, color: "bg-brand", details: ["Existing catalog review", "Data format assessment", "Gap identification", "Upload plan creation"] },
      { label: "Data Prep & Pricing QA", start: 5, duration: 8, color: "bg-sky-600", details: ["Product listing cleanup", "Pricing validation", "SIN mapping verification", "Offer structure review"] },
      { label: "FCP Upload & Validation", start: 13, duration: 10, color: "bg-amber-600", details: ["Baseline upload to FCP", "System validation checks", "Error resolution", "Listing confirmation"] },
      { label: "Compliance & Go-Live", start: 23, duration: 7, color: "bg-emerald-600", details: ["Final compliance check", "GSA Advantage visibility", "Roadmap consultation", "Handoff documentation"] },
    ],
    cta: "Order FCP Upload",
    ctaHref: "/order",
  },
];

// ─── WHY GSA DATA ───
const gsaBenefits = [
  { title: "Pre-Vetted Credibility", desc: "Agencies trust GSA contractors — you've passed rigorous government scrutiny.", icon: BadgeCheck, stat: "80%", statLabel: "of agencies prefer GSA" },
  { title: "Streamlined Procurement", desc: "Agencies buy from you in days, not months — no lengthy competitive bidding.", icon: Zap, stat: "90%", statLabel: "faster procurement" },
  { title: "Massive Buying Pool", desc: "Access $50B+ in annual federal spending through GSA vehicles.", icon: DollarSign, stat: "$50B+", statLabel: "annual spend" },
  { title: "Reduced Competition", desc: "Compete against thousands instead of hundreds of thousands.", icon: Target, stat: "10X", statLabel: "less competition" },
  { title: "20-Year Contract", desc: "5-year base + three 5-year options = stable, long-term revenue.", icon: Calendar, stat: "20yr", statLabel: "contract term" },
  { title: "24/7 Visibility", desc: "Listed on GSA Advantage — the government's online marketplace.", icon: TrendingUp, stat: "24/7", statLabel: "always visible" },
];

// ─── FAQ DATA ───
const faqs = [
  { q: "How long does it take to get on the GSA Schedule?", a: "With our accelerated process, most clients receive their GSA Schedule within 4–6 months. The industry average is 12+ months. We achieve this through our 'Holy Trinity' review that anticipates CO concerns before submission." },
  { q: "What are the minimum qualifications?", a: "You need 2 years of corporate experience, relevant past performance (typically 3–5 projects), and financial viability demonstrated through tax returns and financial statements. Specific requirements vary by SIN category." },
  { q: "What's the difference between MAS and OASIS+?", a: "MAS (Multiple Award Schedule) is GSA's primary vehicle for commercial products and services. OASIS+ is a specialized IDIQ for professional services requiring complex statements of work. We can help determine which is right for you." },
  { q: "What are the ongoing requirements after award?", a: "Quarterly sales reports, 0.75% Industrial Funding Fee, catalog pricing maintenance, mass modification responses, and continued compliance. Our Contract Management service handles all of this." },
  { q: "Can you help if I already have a GSA Schedule?", a: "Absolutely. We provide ongoing Contract Management for existing holders — modifications, sales reporting, catalog updates, and compliance support." },
];

// ─── GANTT CHART ───
function GanttChart({ service }: { service: ServiceData }) {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const unitCount = service.ganttTotal;
  const markers: number[] = [];
  const step = unitCount <= 12 ? 1 : unitCount <= 16 ? 2 : 5;
  for (let i = 0; i <= unitCount; i += step) markers.push(i);
  if (markers[markers.length - 1] !== unitCount) markers.push(unitCount);

  return (
    <div className="mt-10 rounded-xl border border-warm-border bg-white p-6 lg:p-8">
      <h4 className="text-xs font-medium uppercase tracking-widest text-ink-muted mb-6">
        {service.ganttLabel}
      </h4>

      {/* Timeline ruler */}
      <div className="relative h-4 mb-2">
        {markers.map((m) => (
          <span
            key={m}
            className="absolute text-[11px] text-ink-muted font-medium"
            style={{ left: `${(m / unitCount) * 100}%`, transform: "translateX(-50%)" }}
          >
            {m === 0 ? "Start" : `${service.ganttUnit} ${m}`}
          </span>
        ))}
      </div>

      {/* Bars */}
      <div className="space-y-2.5 mt-4">
        {service.ganttPhases.map((phase, idx) => {
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
                {/* Track */}
                <div className="absolute inset-0 rounded-lg bg-surface border border-warm-border/50" />

                {/* Bar */}
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
                  <span className="text-xs font-medium text-white truncate">
                    {phase.label}
                  </span>
                </motion.div>
              </div>

              {/* Hover details */}
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

      {/* Bottom ticks */}
      <div className="relative h-3 mt-3">
        {markers.map((m) => (
          <div
            key={m}
            className="absolute w-px h-2 bg-warm-border"
            style={{ left: `${(m / unitCount) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export default function ServicesGSA() {
  const location = useLocation();
  const [activeService, setActiveService] = useState<ServiceId>("submission");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const sectionRefs = useRef<Record<ServiceId, HTMLElement | null>>({
    submission: null,
    management: null,
    "new-vendor": null,
    fcp: null,
  });

  useEffect(() => {
    const hash = location.hash.replace("#", "") as ServiceId;
    if (hash && allServices.some((s) => s.id === hash)) {
      setActiveService(hash);
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>GSA Schedule Services — Submissions, Management & FCP | GSA Managers</title>
        <meta name="description" content="Get on the GSA Schedule in 4–6 months. Full-service submissions starting at $4,995, annual management, FCP uploads, and new vendor onboarding." />
      </Helmet>

      {/* ──────── HERO ──────── */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-12 lg:px-8 lg:pt-28 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-cta mb-5">
              GSA Schedule Services
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Every stage of your GSA journey. Covered.
            </h1>
            <p className="mt-6 text-lg text-ink-light leading-relaxed max-w-2xl">
              From first submission to ongoing compliance — pick the service that fits, and we'll handle the rest. Transparent pricing. No lock-in.
            </p>
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {allServices.map((svc) => {
              const isActive = activeService === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => {
                    setActiveService(svc.id);
                    sectionRefs.current[svc.id]?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-ink text-white"
                      : "bg-white text-ink-light border border-warm-border hover:border-ink/20 hover:text-ink"
                  )}
                >
                  <svc.icon size={15} />
                  {svc.title}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ──────── FCP ALERT ──────── */}
      <div className="bg-red-600">
        <div className="mx-auto w-full max-w-7xl px-6 py-3 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle size={16} className="shrink-0" />
            <p className="text-sm">
              <strong>SIP is retired. FCP is mandatory.</strong>{" "}
              Without an FCP Baseline Upload, your catalog is invisible on GSA Advantage.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveService("fcp");
              sectionRefs.current.fcp?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="shrink-0 rounded-lg bg-white px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Fix it for $500 &rarr;
          </button>
        </div>
      </div>

      {/* ──────── SERVICE SECTIONS ──────── */}
      {allServices.map((svc, svcIdx) => (
        <section
          key={svc.id}
          id={svc.id}
          ref={(el) => { sectionRefs.current[svc.id] = el; }}
          className={cn(
            "py-24 lg:py-32 scroll-mt-16",
            svcIdx % 2 === 0 ? "bg-white" : "bg-surface"
          )}
        >
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Content — 2 cols */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface border border-warm-border shrink-0">
                      <svc.icon size={20} className="text-ink-light" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl leading-tight">
                        {svc.title}
                      </h2>
                      <p className="text-sm text-ink-muted mt-1">{svc.tagline}</p>
                    </div>
                  </div>

                  <p className="text-ink-light text-lg leading-relaxed max-w-2xl">
                    {svc.description}
                  </p>

                  {/* Features */}
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-ink-light">
                        <CheckCircle size={16} className="text-brand mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Gantt Chart */}
                  <GanttChart service={svc} />
                </motion.div>
              </div>

              {/* Pricing card — 1 col */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="sticky top-24"
                >
                  <div className="rounded-xl border border-warm-border bg-white p-8">
                    <p className="text-xs font-medium uppercase tracking-widest text-ink-muted mb-3">
                      {svc.priceNote}
                    </p>
                    <div className="font-display text-4xl font-semibold text-ink mb-8">
                      {svc.price}
                    </div>
                    <LinkButton href={svc.ctaHref} size="lg" className="w-full mb-3">
                      {svc.cta}
                      <ArrowRight size={15} className="ml-2" />
                    </LinkButton>
                    <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="md" className="w-full">
                      Talk to a Specialist
                    </LinkButton>

                    <div className="mt-8 pt-6 border-t border-warm-border space-y-3">
                      {svc.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm text-ink-light">
                          <CheckCircle size={14} className="text-brand shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ──────── WHY GSA ──────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-cta mb-3">Why It Matters</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl leading-tight">
              Why get on the GSA Schedule?
            </h2>
            <p className="mt-4 text-ink-light text-lg leading-relaxed">
              The Multiple Award Schedule is the government's preferred procurement vehicle. Here's what it unlocks.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gsaBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="rounded-xl border border-warm-border bg-white p-6 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                    <b.icon size={20} className="text-ink-light" />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-semibold text-brand">{b.stat}</span>
                    <p className="text-[10px] uppercase tracking-widest text-ink-muted font-medium">{b.statLabel}</p>
                  </div>
                </div>
                <h4 className="font-display text-lg font-semibold text-ink mb-2">{b.title}</h4>
                <p className="text-ink-light leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FAQ ──────── */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-sm font-medium uppercase tracking-widest text-cta mb-3">Common Questions</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl leading-tight">FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className={cn(
                  "w-full text-left rounded-xl border p-6 transition-all duration-200",
                  activeFaq === idx
                    ? "border-brand/20 bg-white shadow-soft"
                    : "border-warm-border bg-white hover:border-ink/10"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-medium text-ink">{faq.q}</h4>
                  <ChevronDown size={16} className={cn(
                    "text-ink-muted transition-transform shrink-0",
                    activeFaq === idx && "rotate-180 text-brand"
                  )} />
                </div>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 text-ink-light leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA ──────── */}
      <section className="py-24 lg:py-32 bg-ink">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl leading-tight">
              Ready to get on the GSA Schedule?
            </h2>
            <p className="mt-4 text-white/50 text-lg leading-relaxed">
              Whether you need a $500 FCP upload or full-service submission and management — we've got you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton
                href="/order"
                size="lg"
                className="bg-white text-ink hover:bg-white/90"
              >
                Place Your Order
                <ArrowRight size={16} className="ml-2" />
              </LinkButton>
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="ghost"
                className="text-white/70 border border-white/20 hover:text-white hover:bg-white/10"
              >
                Schedule a Free Call
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

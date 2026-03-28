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
  Users,
  TrendingUp,
  ChevronDown,
  Upload,
  Award,
  Target,
  DollarSign,
  BadgeCheck,
  Layers,
  RefreshCw,
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
      "We prepare and submit your complete GSA Multiple Award Schedule offer in 30 days or less. Our accelerated process is built on the \"Holy Trinity\" review — Admin, Technical, and Pricing volumes — that anticipates Contracting Officer concerns before you submit. 98% of our clients receive their award within 4-6 months.",
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
      {
        label: "Kickoff & Strategy",
        start: 0,
        duration: 2,
        color: "bg-indigo-500",
        details: ["Business capabilities review", "Target SIN identification", "Communication cadence setup", "Milestone expectations"],
      },
      {
        label: "Document Collection",
        start: 2,
        duration: 6,
        color: "bg-blue-500",
        details: ["Federal tax returns (2yr min)", "Financial statements", "Past performance narratives", "Commercial price lists"],
      },
      {
        label: "eOffer Preparation",
        start: 8,
        duration: 5,
        color: "bg-sky-500",
        details: ["SAM.gov verification", "FAS ID creation", "SIN justification", "Portal data entry"],
      },
      {
        label: "Holy Trinity Review",
        start: 13,
        duration: 2,
        color: "bg-violet-500",
        details: ["Admin completeness check", "Technical validation", "Pricing verification", "Cross-volume consistency"],
      },
      {
        label: "Price & Tech Deep Dive",
        start: 15,
        duration: 5,
        color: "bg-purple-500",
        details: ["CSP analysis", "Price escalation", "Labor category descriptions", "Technical narrative refinement"],
      },
      {
        label: "Final Polish",
        start: 20,
        duration: 5,
        color: "bg-fuchsia-500",
        details: ["Document formatting", "Signature verification", "Attachment checklist", "Quality audit"],
      },
      {
        label: "GSA Submission",
        start: 25,
        duration: 5,
        color: "bg-emerald-500",
        details: ["eOffer package upload", "Confirmation receipt", "CO assignment notification", "Clarification prep"],
      },
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
      {
        label: "Baseline Audit & Setup",
        start: 0,
        duration: 1,
        color: "bg-emerald-500",
        details: ["Contract health assessment", "Catalog review", "Compliance gap analysis", "Account setup"],
      },
      {
        label: "Q1 Sales Report & IFF",
        start: 0,
        duration: 3,
        color: "bg-blue-500",
        details: ["Calculate 0.75% IFF", "Submit quarterly report", "Transaction record maintenance", "Discrepancy resolution"],
      },
      {
        label: "Catalog Management",
        start: 1,
        duration: 11,
        color: "bg-sky-400",
        details: ["Product/service updates", "Pricing modifications", "New SIN additions", "Refresh submissions"],
      },
      {
        label: "Q2 Sales Report & IFF",
        start: 3,
        duration: 3,
        color: "bg-blue-500",
        details: ["Calculate 0.75% IFF", "Submit quarterly report", "Mid-year reconciliation", "Discrepancy resolution"],
      },
      {
        label: "Modifications & Compliance",
        start: 2,
        duration: 8,
        color: "bg-violet-500",
        details: ["Address/POC updates", "Scope expansions", "TDR monitoring", "Price reduction compliance"],
      },
      {
        label: "Q3 Sales Report & IFF",
        start: 6,
        duration: 3,
        color: "bg-blue-500",
        details: ["Calculate 0.75% IFF", "Submit quarterly report", "Year-to-date analysis", "Discrepancy resolution"],
      },
      {
        label: "Q4 Report & Option Review",
        start: 9,
        duration: 3,
        color: "bg-indigo-500",
        details: ["Final quarterly report", "Annual reconciliation", "Option year assessment", "Renewal preparation"],
      },
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
      {
        label: "FCP Catalog Upload",
        start: 0,
        duration: 4,
        color: "bg-amber-500",
        details: ["Catalog data gathering", "Product listing QA", "Pricing review", "FCP upload & validation"],
      },
      {
        label: "Platform Training",
        start: 2,
        duration: 4,
        color: "bg-violet-500",
        details: ["GSA Advantage walkthrough", "eBuy training", "FCP navigation", "Account configuration"],
      },
      {
        label: "Process Onboarding",
        start: 4,
        duration: 3,
        color: "bg-blue-500",
        details: ["Sales reporting training", "Compliance overview", "Modification process", "Documentation handoff"],
      },
      {
        label: "90-Day Management",
        start: 4,
        duration: 12,
        color: "bg-emerald-500",
        details: ["Ongoing compliance monitoring", "First quarterly report prep", "Catalog maintenance", "Issue resolution support"],
      },
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
      {
        label: "Catalog Audit",
        start: 0,
        duration: 5,
        color: "bg-amber-500",
        details: ["Existing catalog review", "Data format assessment", "Gap identification", "Upload plan creation"],
      },
      {
        label: "Data Prep & Pricing QA",
        start: 5,
        duration: 8,
        color: "bg-blue-500",
        details: ["Product listing cleanup", "Pricing validation", "SIN mapping verification", "Offer structure review"],
      },
      {
        label: "FCP Upload & Validation",
        start: 13,
        duration: 10,
        color: "bg-violet-500",
        details: ["Baseline upload to FCP", "System validation checks", "Error resolution", "Listing confirmation"],
      },
      {
        label: "Compliance Review & Go-Live",
        start: 23,
        duration: 7,
        color: "bg-emerald-500",
        details: ["Final compliance check", "GSA Advantage visibility", "Roadmap consultation", "Handoff documentation"],
      },
    ],
    cta: "Order FCP Upload",
    ctaHref: "/order",
  },
];

// ─── GSA BENEFITS DATA ───
const gsaBenefits = [
  { title: "Pre-Vetted Credibility", desc: "Agencies trust GSA contractors — you've passed rigorous government scrutiny.", icon: BadgeCheck, stat: "80%", statLabel: "of agencies prefer GSA" },
  { title: "Streamlined Procurement", desc: "Agencies buy from you in days, not months — no lengthy competitive bidding.", icon: Zap, stat: "90%", statLabel: "faster procurement" },
  { title: "Massive Buying Pool", desc: "Access $50B+ in annual federal spending through GSA vehicles.", icon: DollarSign, stat: "$50B+", statLabel: "annual spend" },
  { title: "Reduced Competition", desc: "Compete against thousands instead of hundreds of thousands.", icon: Target, stat: "10X", statLabel: "less competition" },
  { title: "20-Year Contract", desc: "5-year base + three 5-year options = stable, long-term revenue.", icon: Calendar, stat: "20yr", statLabel: "contract term" },
  { title: "24/7 Visibility", desc: "Listed on GSA Advantage — the government's marketplace.", icon: TrendingUp, stat: "24/7", statLabel: "always visible" },
];

// ─── FAQ DATA ───
const faqs = [
  { q: "How long does it take to get on the GSA Schedule?", a: "With our accelerated process, most clients receive their GSA Schedule within 4-6 months. The industry average is 12+ months. We achieve this through our 'Holy Trinity' review that anticipates CO concerns before submission." },
  { q: "What are the minimum qualifications?", a: "You need 2 years of corporate experience, relevant past performance (typically 3-5 projects), and financial viability demonstrated through tax returns and financial statements. Specific requirements vary by SIN category." },
  { q: "What's the difference between MAS and OASIS+?", a: "MAS (Multiple Award Schedule) is GSA's primary vehicle for commercial products and services. OASIS+ is a specialized IDIQ for professional services requiring complex statements of work. We can help determine which is right for you." },
  { q: "What are the ongoing requirements after award?", a: "Quarterly sales reports, 0.75% Industrial Funding Fee, catalog pricing maintenance, mass modification responses, and continued compliance. Our Contract Management service handles all of this." },
  { q: "Can you help if I already have a GSA Schedule?", a: "Absolutely. We provide ongoing Contract Management for existing holders — modifications, sales reporting, catalog updates, and compliance support." },
];

// ─── GANTT CHART COMPONENT ───
function GanttChart({ service }: { service: ServiceData }) {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const unitCount = service.ganttTotal;
  const markers: number[] = [];
  const step = unitCount <= 12 ? 1 : unitCount <= 16 ? 2 : 5;
  for (let i = 0; i <= unitCount; i += step) markers.push(i);
  if (markers[markers.length - 1] !== unitCount) markers.push(unitCount);

  return (
    <div className="mt-8">
      <h4 className="text-sm font-bold text-navy mb-4 uppercase tracking-wider">
        {service.ganttLabel}
      </h4>

      {/* Timeline header */}
      <div className="relative mb-1">
        <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
          {markers.map((m) => (
            <span key={m} style={{ position: "absolute", left: `${(m / unitCount) * 100}%`, transform: "translateX(-50%)" }}>
              {m === 0 ? "Start" : `${service.ganttUnit} ${m}`}
            </span>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div className="mt-6 space-y-2">
        {service.ganttPhases.map((phase, idx) => {
          const leftPct = (phase.start / unitCount) * 100;
          const widthPct = (phase.duration / unitCount) * 100;
          const isHovered = hoveredPhase === idx;

          return (
            <div key={idx}>
              <div
                className="relative h-9 group cursor-pointer"
                onMouseEnter={() => setHoveredPhase(idx)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                {/* Background track */}
                <div className="absolute inset-0 rounded-lg bg-slate-50 border border-slate-100" />

                {/* Bar */}
                <motion.div
                  className={cn(
                    "absolute top-0 h-full rounded-lg flex items-center px-3 transition-all duration-200",
                    phase.color,
                    isHovered ? "shadow-md ring-2 ring-white" : ""
                  )}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                >
                  <span className="text-xs font-semibold text-white truncate">
                    {phase.label}
                  </span>
                </motion.div>
              </div>

              {/* Detail dropdown */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 py-2.5 px-3">
                      {phase.details.map((d) => (
                        <div key={d} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle size={12} className="text-brand-blue shrink-0" />
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

      {/* Gridlines overlay label */}
      <div className="flex justify-between mt-3 text-[10px] text-slate-300 font-medium relative">
        {markers.map((m) => (
          <div key={m} className="absolute bottom-0" style={{ left: `${(m / unitCount) * 100}%`, transform: "translateX(-50%)" }}>
            <div className="w-px h-2 bg-slate-200 mx-auto" />
          </div>
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

  // Handle hash navigation from homepage
  useEffect(() => {
    const hash = location.hash.replace("#", "") as ServiceId;
    if (hash && allServices.some((s) => s.id === hash)) {
      setActiveService(hash);
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);

  const currentService = allServices.find((s) => s.id === activeService)!;

  return (
    <>
      <Helmet>
        <title>GSA Schedule Services — Submissions, Management & FCP | GSA Managers</title>
        <meta name="description" content="Get on the GSA Schedule in 4-6 months. Full-service submissions starting at $4,995, annual management, FCP uploads, and new vendor onboarding." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-4">
              GSA Schedule Services
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Every stage of your GSA journey.{" "}
              <span className="text-brand-blue">Covered.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              From first submission to ongoing compliance — pick the service that fits, and we'll handle the rest. Transparent pricing. No lock-in. Real results.
            </p>
          </motion.div>

          {/* Service quick-nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
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
                    "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-navy text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-navy"
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

      {/* ===== FCP ALERT BANNER ===== */}
      <div className="bg-red-600">
        <div className="mx-auto w-full max-w-7xl px-5 py-3 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle size={18} className="shrink-0" />
            <p className="text-sm font-medium">
              <strong>SIP is retired. FCP is mandatory.</strong> Without an FCP Baseline Upload, your catalog is invisible on GSA Advantage.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveService("fcp");
              sectionRefs.current.fcp?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="shrink-0 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            Fix it for $500 &rarr;
          </button>
        </div>
      </div>

      {/* ===== SERVICE SECTIONS ===== */}
      {allServices.map((svc, svcIdx) => (
        <section
          key={svc.id}
          id={svc.id}
          ref={(el) => { sectionRefs.current[svc.id] = el; }}
          className={cn("py-20 lg:py-28 scroll-mt-20", svcIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50")}
        >
          <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Left: Content (2 cols) */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Service header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                      <svc.icon size={20} className="text-brand-blue" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                        {svc.title}
                      </h2>
                      <p className="text-sm text-slate-500">{svc.tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed mt-4 max-w-2xl">
                    {svc.description}
                  </p>

                  {/* Features grid */}
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle size={16} className="text-brand-blue mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Gantt Chart */}
                  <GanttChart service={svc} />
                </motion.div>
              </div>

              {/* Right: Pricing card (1 col) */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="sticky top-24"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3">
                      {svc.priceNote}
                    </p>
                    <div className="font-display text-4xl font-bold text-navy mb-6">
                      {svc.price}
                    </div>
                    <LinkButton href={svc.ctaHref} size="lg" className="w-full mb-3">
                      {svc.cta}
                      <ArrowRight size={16} className="ml-2" />
                    </LinkButton>
                    <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="md" className="w-full">
                      Talk to a Specialist
                    </LinkButton>

                    <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                      {svc.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle size={13} className="text-brand-blue shrink-0" />
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

      {/* ===== WHY GSA ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Why It Matters</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              Why get on the GSA Schedule?
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-500">
              The Multiple Award Schedule is the government's preferred procurement vehicle. Here's what it unlocks.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gsaBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                    <b.icon size={20} className="text-brand-blue" />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-bold text-brand-blue">{b.stat}</span>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{b.statLabel}</p>
                  </div>
                </div>
                <h4 className="font-display text-lg font-bold text-navy mb-2">{b.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto w-full max-w-3xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Common Questions</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className={cn(
                  "w-full text-left rounded-2xl border p-5 transition-all duration-200",
                  activeFaq === idx
                    ? "border-brand-blue/30 bg-white shadow-card"
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-navy text-sm">{faq.q}</h4>
                  <ChevronDown size={16} className={cn(
                    "text-slate-400 transition-transform shrink-0",
                    activeFaq === idx && "rotate-180 text-brand-blue"
                  )} />
                </div>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 text-sm text-slate-600 leading-relaxed"
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

      {/* ===== CTA ===== */}
      <section className="py-24 gradient-mesh-dark">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to get on the GSA Schedule?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-white/50 text-lg">
              Whether you need a $500 FCP upload or full-service submission and management — we've got you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
              <LinkButton href="/order" size="lg">
                Place Your Order
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="ghost"
                className="text-white border border-white/20 hover:bg-white/10"
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

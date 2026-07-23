import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
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
    tagline: "Submission-ready in 45 days. 98% approval rate.",
    description:
      "We build and submit your complete GSA MAS offer — Admin, Technical, and Pricing volumes — in 45 days or less. Every package goes through our three-volume review that catches the issues Contracting Officers flag. 98% of our clients receive their award within 4–6 months, vs. the 12+ month industry average.",
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
    ganttLabel: "45-Day Submission Timeline",
    ganttUnit: "Day",
    ganttTotal: 45,
    ganttPhases: [
      { label: "Kickoff & Strategy", start: 0, duration: 3, color: "bg-brand", details: ["Business capabilities review", "Target SIN identification", "Communication cadence setup", "Milestone expectations"] },
      { label: "Document Collection", start: 3, duration: 9, color: "bg-brand-light", details: ["Federal tax returns (2yr min)", "Financial statements", "Past performance narratives", "Commercial price lists"] },
      { label: "eOffer Preparation", start: 12, duration: 7, color: "bg-sky-600", details: ["SAM.gov verification", "FAS ID creation", "SIN justification", "Portal data entry"] },
      { label: "Holy Trinity Review", start: 19, duration: 3, color: "bg-amber-600", details: ["Admin completeness check", "Technical validation", "Pricing verification", "Cross-volume consistency"] },
      { label: "Price & Tech Deep Dive", start: 22, duration: 7, color: "bg-brand", details: ["CSP analysis", "Price escalation", "Labor category descriptions", "Technical narrative refinement"] },
      { label: "Final Polish", start: 29, duration: 7, color: "bg-brand-light", details: ["Document formatting", "Signature verification", "Attachment checklist", "Quality audit"] },
      { label: "GSA Submission", start: 36, duration: 9, color: "bg-emerald-600", details: ["eOffer package upload", "Confirmation receipt", "CO assignment notification", "Clarification prep"] },
    ],
    cta: "Get Started",
    ctaHref: "/order",
  },
  {
    id: "management",
    icon: Shield,
    title: "Annual Contract Management",
    tagline: "Every compliance task, every mod — handled. Cancel anytime.",
    description:
      "GSA Schedule maintenance burns 10+ hours a month internally — IFF reporting, catalog updates, mods, option renewals. We take over all of it. One dedicated account manager runs your contract so nothing lapses, nothing gets rejected, and you never touch GSA paperwork again. No lock-in. Pay monthly or annually.",
    features: [
      "Monthly or Quarterly IFF Sales Reporting",
      "SAM & DSBS Compliance",
      "Contract Modifications (Admin & Technical)",
      "Major Modifications (New SIN, Product/Labor Addition, Etc.)",
      "Mass Modification Processing",
      "FCP Catalog Maintenance & Updates",
      "Compliance Monitoring & Audit Prep",
      "Option Year Renewal Management",
      "CO Communication Handling",
      "Dedicated Account Manager",
    ],
    ganttLabel: "Annual Management Cycle",
    ganttUnit: "Month",
    ganttTotal: 12,
    ganttPhases: [
      { label: "Baseline Audit & Setup", start: 0, duration: 1, color: "bg-brand", details: ["Contract health assessment", "SAM & DSBS registration review", "Compliance gap analysis", "Account setup & onboarding"] },
      { label: "Q1 IFF Sales Report", start: 0, duration: 3, color: "bg-sky-600", details: ["Monthly or quarterly IFF calculation", "Submit 72A sales report", "Transaction record maintenance", "Discrepancy resolution"] },
      { label: "Admin & Technical Mods", start: 1, duration: 5, color: "bg-brand-light", details: ["Address & POC updates", "Name changes & novations", "Technical scope revisions", "TDR compliance monitoring"] },
      { label: "Q2 IFF Sales Report", start: 3, duration: 3, color: "bg-sky-600", details: ["Monthly or quarterly IFF calculation", "Submit 72A sales report", "Mid-year reconciliation", "Discrepancy resolution"] },
      { label: "Major Mods & SIN Adds", start: 3, duration: 6, color: "bg-amber-600", details: ["New SIN additions", "Product & labor category additions", "Pricing adjustments & CSP updates", "Mass modification acceptance"] },
      { label: "Q3 IFF Sales Report", start: 6, duration: 3, color: "bg-sky-600", details: ["Monthly or quarterly IFF calculation", "Submit 72A sales report", "Year-to-date analysis", "Discrepancy resolution"] },
      { label: "Q4 Report & Option Review", start: 9, duration: 3, color: "bg-emerald-600", details: ["Final IFF sales report", "Annual reconciliation", "Option year assessment", "Renewal preparation"] },
    ],
    cta: "Start Annual Support",
    ctaHref: "/order",
  },
  {
    id: "new-vendor",
    icon: Rocket,
    title: "New Vendor Special",
    tagline: "Award in hand. Now make it operational.",
    description:
      "You just received your GSA Schedule — now what? We upload your FCP catalog, train your team on GSA Advantage, eBuy, and sales reporting, and manage your contract for the first 90 days so nothing slips while you're learning the ropes.",
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
    ganttLabel: "16-Week Onboarding Timeline",
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
    tagline: "SIP is gone. FCP is mandatory. We handle the switch.",
    description:
      "GSA retired SIP and moved to the FAS Catalog Platform. If you haven't uploaded your FCP Baseline, your products don't show up on GSA Advantage — agencies literally cannot find you. We migrate your catalog, validate every line item, and get you compliant within 7 days.",
    features: [
      "Full FCP Baseline catalog upload",
      "Product listing & offer pricing QA",
      "SIN & product issue resolution",
      "Roadmap & technical consultations",
      "Compliance review before submission",
      "7-day delivery guarantee",
    ],
    ganttLabel: "7-Day FCP Upload Timeline",
    ganttUnit: "Day",
    ganttTotal: 7,
    ganttPhases: [
      { label: "Audit & Data Prep", start: 0, duration: 2, color: "bg-brand", details: ["Existing catalog review", "Data format assessment", "Product listing cleanup", "Pricing validation"] },
      { label: "FCP Upload & Validation", start: 2, duration: 3, color: "bg-amber-600", details: ["Baseline upload to FCP", "System validation checks", "Error resolution", "SIN mapping verification"] },
      { label: "Compliance & Go-Live", start: 5, duration: 2, color: "bg-emerald-600", details: ["Final compliance check", "GSA Advantage visibility", "Roadmap consultation", "Handoff documentation"] },
    ],
    cta: "Get Started",
    ctaHref: "/order",
  },
];

// ─── WHY GSA DATA ───
const gsaBenefits = [
  { title: "Pre-Vetted Status", desc: "Contracting officers see your GSA contract number and skip the risk assessment. You've already been vetted.", icon: BadgeCheck, stat: "80%", statLabel: "of agencies prefer GSA" },
  { title: "Faster Purchasing", desc: "Agencies can order directly from your schedule without running a full competitive solicitation.", icon: Zap, stat: "90%", statLabel: "faster procurement" },
  { title: "$50B+ in Annual Spend", desc: "That's how much flows through GSA vehicles every year. Without a schedule, you're locked out of it.", icon: DollarSign, stat: "$50B+", statLabel: "annual spend" },
  { title: "Smaller Competitive Field", desc: "Only ~4% of small businesses hold a GSA Schedule. On the open market, you compete against everyone.", icon: Target, stat: "10X", statLabel: "less competition" },
  { title: "20-Year Contract Term", desc: "5-year base plus three 5-year options. One award, two decades of federal selling.", icon: Calendar, stat: "20yr", statLabel: "contract term" },
  { title: "GSA Advantage Listing", desc: "Your catalog is live on the government's online marketplace. Every federal buyer can search and purchase.", icon: TrendingUp, stat: "24/7", statLabel: "always visible" },
];

// ─── FAQ DATA ───
const faqs = [
  { q: "How long does it take to get on the GSA Schedule?", a: "With our accelerated process, most clients receive their GSA Schedule within 4–6 months. The industry average is 12+ months. We achieve this through our 'Holy Trinity' review that anticipates CO concerns before submission." },
  { q: "What are the minimum qualifications?", a: "You need 2 years of corporate experience, relevant past performance (typically 3–5 projects), and financial viability demonstrated through tax returns and financial statements. Specific requirements vary by SIN category." },
  { q: "What's the difference between MAS and OASIS+?", a: "MAS (Multiple Award Schedule) is GSA's primary vehicle for commercial products and services. OASIS+ is a specialized IDIQ for professional services requiring complex statements of work. We can help determine which is right for you." },
  { q: "What are the ongoing requirements after award?", a: "Monthly or quarterly IFF sales reporting via 72A, 0.75% Industrial Funding Fee remittance, SAM & DSBS registration maintenance, FCP catalog pricing updates, contract modifications (admin, technical, and major), mass modification responses, and continued compliance monitoring. Our Contract Management service handles all of this." },
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
          // eslint-disable-next-line react/style-prop-object
          <span
            key={m}
            className="absolute text-[11px] text-ink-muted font-medium"
            style={{ left: `${(m / unitCount) * 100}%` }}
          >
            <span className="relative -translate-x-1/2">
              {m === 0 ? "Start" : `${service.ganttUnit} ${m}`}
            </span>
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
                  /* eslint-disable-next-line react/style-prop-object */
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
          // eslint-disable-next-line react/style-prop-object
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
  const [activeService, setActiveService] = useState<ServiceId>("management");
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
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Schedule Services — Annual Support & Modification Services | GSA Managers</title>
        <meta name="description" content="Expert GSA contract management and modification support. Annual compliance, IFF reporting, catalog maintenance, pricing mods, SIN additions, and more." />
      </Helmet>

      {/* ──────── HERO ──────── */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-warm-100 via-surface to-surface -z-10" />
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none -z-10">
          <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-border"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-warm-border shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cta"></span>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-light">
                GSA Schedule Services
              </span>
            </div>
            
            <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
              GSA services. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cta">Pick what you need.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl">
              New submission, annual management, standalone modification, or FCP migration — flat fees, no lock-in, guaranteed timelines.
            </p>
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 flex flex-wrap gap-3"
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
                    "flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-sm",
                    isActive
                      ? "bg-ink text-white shadow-md ring-2 ring-ink/20 ring-offset-2 ring-offset-surface"
                      : "bg-white text-ink-light border border-warm-border hover:border-ink/30 hover:text-ink hover:shadow-md"
                  )}
                >
                  <svc.icon size={16} className={isActive ? "text-brand-light" : "text-ink-muted"} />
                  {svc.title}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ──────── SERVICE SECTIONS ──────── */}
      {allServices.map((svc, svcIdx) => (
        <section
          key={svc.id}
          id={svc.id}
          ref={(el) => { sectionRefs.current[svc.id] = el; }}
          className={cn(
            "py-24 lg:py-32 scroll-mt-20 border-b border-warm-border last:border-b-0 relative",
            svcIdx % 2 === 0 ? "bg-white" : "bg-surface"
          )}
        >
          {svcIdx % 2 !== 0 && (
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
          )}
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Content — 2 cols */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border border-warm-border shadow-sm shrink-0">
                      <svc.icon size={26} className="text-ink" />
                    </div>
                    <div>
                      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">
                        {svc.title}
                      </h2>
                      <p className="text-brand font-semibold mt-1.5 text-lg">{svc.tagline}</p>
                    </div>
                  </div>

                  <p className="text-ink-light text-lg leading-relaxed max-w-2xl mb-10">
                    {svc.description}
                  </p>

                  {/* Features */}
                  <div className="grid gap-4 sm:grid-cols-2 mb-10">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-start gap-3 text-ink-light font-medium bg-warm-100/50 p-3 rounded-lg border border-warm-border/50">
                        <CheckCircle size={18} className="text-cta mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Gantt Chart */}
                  <GanttChart service={svc} />
                </motion.div>
              </div>

              {/* CTA card — 1 col */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-28"
                >
                  <div className="rounded-2xl border border-warm-border bg-white p-8 shadow-elevated relative overflow-hidden">
                    {/* Top gradient highlight */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-cta" />
                    
                    <h3 className="font-display text-xl font-bold text-ink mb-4 mt-2">
                      {svc.title}
                    </h3>
                    <LinkButton href={svc.ctaHref} size="lg" className="w-full mb-4 shadow-md hover:shadow-lg transition-shadow">
                      {svc.cta}
                      <ArrowRight size={18} className="ml-2" />
                    </LinkButton>
                    <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="md" className="w-full bg-surface">
                      Talk to a Specialist
                    </LinkButton>

                    <div className="mt-8 pt-6 border-t border-warm-border space-y-3">
                      {svc.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-3 text-sm text-ink-light font-medium">
                          <CheckCircle size={16} className="text-cta shrink-0" />
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
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warm-100 border border-warm-border mb-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">Why It Matters</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl leading-tight">
                Why get on the GSA Schedule?
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed">
                The MAS is the government's primary purchasing vehicle. Here's what holding one gives your business.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gsaBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
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

      {/* ──────── FAQ ──────── */}
      <section className="py-24 lg:py-32 bg-surface relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-warm-100/50 via-surface to-surface -z-10" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className={cn(
                  "w-full text-left rounded-2xl border p-6 lg:p-8 transition-all duration-300",
                  activeFaq === idx
                    ? "border-brand bg-white shadow-md"
                    : "border-warm-border bg-white hover:border-brand/30 hover:shadow-soft"
                )}
              >
                <div className="flex items-center justify-between gap-6">
                  <h4 className={cn(
                    "font-display text-lg font-bold transition-colors",
                    activeFaq === idx ? "text-brand" : "text-ink"
                  )}>
                    {faq.q}
                  </h4>
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                    activeFaq === idx ? "bg-brand/10 text-brand" : "bg-surface text-ink-muted"
                  )}>
                    <ChevronDown size={18} className={cn(
                      "transition-transform duration-300",
                      activeFaq === idx && "rotate-180"
                    )} />
                  </div>
                </div>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-ink-light text-lg leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      {/* ──────── CTA ──────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-surface border border-warm-border p-10 md:p-16 text-center shadow-elevated relative overflow-hidden mt-24"
      >
        <div className="absolute top-0 left-0 p-8 opacity-5 pointer-events-none">
          <Shield size={160} />
        </div>
        <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none translate-y-1/4 translate-x-1/4">
          <FileText size={160} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">
            Pick a service. <br className="hidden sm:block"/> We'll take it from here.
          </h2>
          <p className="mt-6 text-ink-light text-lg leading-relaxed mb-10">
            FCP migration, new submission, standalone mod, or full management — order online or talk to us first.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <LinkButton
              href="/order"
              size="lg"
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Place Your Order
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
            <LinkButton
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              size="lg"
              variant="secondary"
              className="bg-white"
            >
              Schedule a Free Call
            </LinkButton>
          </div>
        </div>
      </motion.div>
    </section>
  </div>
  );
}

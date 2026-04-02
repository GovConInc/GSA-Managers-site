import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
  ChevronRight,
  Upload,
  Award,
  Target,
  DollarSign,
  Star,
  BadgeCheck,
  Layers,
  RefreshCw,
} from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { cn } from "../../components/cn";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   SUBMISSION TIMELINE — visual stepper
   ───────────────────────────────────────────── */

const timeline = [
  {
    phase: "Week 1",
    task: "Kickoff & Document Gathering",
    desc: "We review your business, pick the right SINs, and tell you exactly which documents we need.",
    details: [
      "Review your capabilities and target categories",
      "Identify every required document up front",
      "Set a communication schedule",
      "Create a milestone tracker",
    ],
    color: "bg-brand-blue",
  },
  {
    phase: "Week 2",
    task: "Document Prep",
    desc: "We compile your tax returns, financials, and past performance into a clean package.",
    details: [
      "Federal tax returns (2 years minimum)",
      "Financial statements and balance sheet",
      "Past performance write-ups (3-5 projects)",
      "Commercial price lists or invoices",
    ],
    color: "bg-brand-sky",
  },
  {
    phase: "Week 3",
    task: "Build Your Offer",
    desc: "We set up your eOffer profile, select SINs, and enter all required data in the GSA portal.",
    details: [
      "Verify SAM.gov registration",
      "Create FAS ID and profile",
      "Select and justify SIN categories",
      "Enter all data into eOffer",
    ],
    color: "bg-navy-light",
  },
  {
    phase: "Week 4",
    task: "Quality Review",
    desc: "Our team reviews every section — admin, technical, and pricing — to catch problems before GSA does.",
    details: [
      "Administrative completeness check",
      "Technical capability review",
      "Pricing structure verification",
      "Cross-check all volumes for consistency",
    ],
    color: "bg-brand-blue",
  },
  {
    phase: "Week 5",
    task: "Final Polish",
    desc: "Formatting, signatures, and a final audit. We make sure nothing is missing.",
    details: [
      "Document formatting cleanup",
      "Signature and certification check",
      "Attachment checklist validation",
      "Pre-submission quality audit",
    ],
    color: "bg-brand-sky",
  },
  {
    phase: "Week 6",
    task: "Submission",
    desc: "We submit your completed offer to GSA and prepare you for any follow-up questions.",
    details: [
      "Upload final package to eOffer",
      "Confirm receipt from GSA",
      "Prepare for CO clarification questions",
      "Track status through award",
    ],
    color: "bg-navy",
  },
];

/* ─────────────────────────────────────────────
   WHY GSA — benefit cards
   ───────────────────────────────────────────── */

const gsaBenefits = [
  {
    title: "Trusted by Agencies",
    desc: "GSA contractors are pre-vetted. Agencies trust you because you already passed the hard part.",
    icon: BadgeCheck,
    stat: "80%",
    statLabel: "of agencies prefer GSA",
  },
  {
    title: "Faster Purchasing",
    desc: "Agencies can buy from you in days instead of months. No lengthy bidding process needed.",
    icon: Zap,
    stat: "90%",
    statLabel: "faster than open market",
  },
  {
    title: "Huge Market",
    desc: "Over $50 billion in federal spending flows through GSA vehicles every year.",
    icon: DollarSign,
    stat: "$50B+",
    statLabel: "annual spend",
  },
  {
    title: "Less Competition",
    desc: "Only GSA contractors can bid on GSA orders. That means a much smaller pool of competitors.",
    icon: Target,
    stat: "10x",
    statLabel: "less competition",
  },
  {
    title: "20-Year Contract",
    desc: "A 5-year base plus three 5-year options gives you a long runway to build federal revenue.",
    icon: Calendar,
    stat: "20yr",
    statLabel: "max contract term",
  },
  {
    title: "Built-In Visibility",
    desc: "Your products and services are listed on GSA Advantage — the government's online marketplace.",
    icon: TrendingUp,
    stat: "24/7",
    statLabel: "online visibility",
  },
];

/* ─────────────────────────────────────────────
   CONTRACT MANAGEMENT — accordion items
   ───────────────────────────────────────────── */

const managementServices = [
  {
    title: "Sales Reporting",
    icon: TrendingUp,
    description: "We file your quarterly sales reports and calculate your Industrial Funding Fee so you don't have to.",
    tasks: [
      "Calculate the 0.75% IFF each quarter",
      "Submit reports on time, every time",
      "Keep clean transaction records",
      "Fix any discrepancy notices",
    ],
    benefit: "Avoid $10K+ penalties for late or wrong reports",
  },
  {
    title: "Catalog Updates",
    icon: Layers,
    description: "We keep your FCP catalog current so agencies can actually find and buy from you.",
    tasks: [
      "Add or remove products and services",
      "Update pricing as needed",
      "Add new SIN categories",
      "Submit catalog refreshes to GSA",
    ],
    benefit: "Stay visible to buying agencies around the clock",
  },
  {
    title: "Contract Changes",
    icon: RefreshCw,
    description: "Address changes, new points of contact, scope updates, option renewals — we handle all of it.",
    tasks: [
      "Administrative modifications",
      "Point-of-contact updates",
      "Scope expansions",
      "Option year renewals",
    ],
    benefit: "Never miss an option renewal deadline",
  },
  {
    title: "Compliance Monitoring",
    icon: Shield,
    description: "We watch for issues before they become problems. If an audit comes, you're ready.",
    tasks: [
      "Trade Agreements Act monitoring",
      "Price reduction compliance",
      "Audit preparation support",
      "Corrective action plans",
    ],
    benefit: "Prevent contract cancellation and fines",
  },
];

const managementBenefits = [
  "Save 10+ hours per month on admin work",
  "Zero compliance violations on managed contracts",
  "All communications with GSA handled for you",
  "Problems caught before audits find them",
  "Option renewals never missed",
  "A dedicated manager who knows your contract",
];

/* ─────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────── */

const faqs = [
  {
    q: "How long does it take to get a GSA Schedule?",
    a: "Most of our clients are awarded within 4 to 6 months. The industry average is over 12 months. We move faster because our review process catches issues before GSA sees them.",
  },
  {
    q: "What do I need to qualify?",
    a: "You generally need 2 years of business experience, 3 to 5 relevant past projects, and financial documents like tax returns and a balance sheet. Requirements vary by category — we'll tell you exactly what you need on a free call.",
  },
  {
    q: "What's the difference between MAS and OASIS+?",
    a: "MAS (Multiple Award Schedule) covers commercial products and services. OASIS+ is for complex professional services. Most companies start with MAS. We can help you figure out which is right for you.",
  },
  {
    q: "What are the ongoing requirements after I'm awarded?",
    a: "You have to submit quarterly sales reports, pay a small fee (0.75% of sales), keep your catalog updated, and respond to contract modifications. Our management service handles all of this for you.",
  },
  {
    q: "Can you help if I already have a GSA Schedule?",
    a: "Yes. Many of our clients come to us after struggling to maintain their schedule on their own. We handle modifications, reporting, catalog updates, and compliance.",
  },
];

/* ─────────────────────────────────────────────
   HERO STATS
   ───────────────────────────────────────────── */

const heroStats = [
  { value: "98%", label: "Approval Rate" },
  { value: "4-6 mo", label: "Avg. Time to Award" },
  { value: "80+", label: "Active Clients" },
  { value: "$500", label: "FCP Flat Fee" },
];

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

export default function ServicesGSA() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeManagement, setActiveManagement] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"fcp" | "submission" | "management" | "benefits">("fcp");

  return (
    <>
      <Helmet>
        <title>GSA Schedule Services — GSA Managers</title>
        <meta
          name="description"
          content="Get on the GSA Schedule in 4-6 months. FCP catalog uploads, full-service submissions, and ongoing contract management."
        />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,95,175,0.04),transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-semibold text-brand-blue mb-6">
                <Award size={16} />
                GSA Schedule Services
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
                Get on the GSA Schedule.
                <br />
                <span className="text-brand-blue">The Right Way.</span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                We help qualified companies get on the GSA Schedule in 4 to 6 months, then manage every
                requirement so you can focus on winning work — not paperwork.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                  Book a Free Call
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href="#services" variant="secondary" size="lg">
                  See Our Services
                </LinkButton>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* FCP Alert Card */}
              <Card className="relative p-6 bg-red-600 text-white border-red-700 mb-4 ring-4 ring-red-600/20" hover={false}>
                <div className="absolute -top-3 right-4">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-red-600 shadow-md">
                    ACTION REQUIRED
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-white">SIP Is Gone. FCP Is Required.</h3>
                    <p className="mt-2 text-white/90 text-sm leading-relaxed">
                      Without an FCP Catalog Upload, agencies can't find you on GSA Advantage. We can fix it in days.
                    </p>
                    <div className="mt-4">
                      <LinkButton
                        href="/order"
                        className="bg-white text-red-600 hover:bg-slate-100 font-bold inline-flex w-full sm:w-auto"
                      >
                        Fix My Catalog
                        <ArrowRight size={16} className="ml-1.5" />
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {heroStats.map((stat) => (
                  <Card key={stat.label} className="p-4" hover={false}>
                    <div className="font-display text-3xl font-bold text-brand-blue">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE TABS ===== */}
      <section id="services" className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Our GSA Services</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl text-navy">
              A Service for Every Stage
            </h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 my-10">
            {([
              { id: "fcp" as const, label: "FCP Upload", icon: Upload, urgent: true },
              { id: "submission" as const, label: "Get on Schedule", icon: FileText },
              { id: "management" as const, label: "Manage & Grow", icon: Shield },
              { id: "benefits" as const, label: "Why GSA?", icon: Star },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold transition-all w-full sm:w-auto text-sm",
                  activeTab === tab.id
                    ? tab.urgent
                      ? "bg-red-600 text-white shadow-lg ring-2 ring-red-600/20"
                      : "bg-brand-blue text-white shadow-lg ring-2 ring-brand-blue/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {tab.urgent && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* ═══ FCP TAB ═══ */}
            {activeTab === "fcp" && (
              <div className="space-y-6">
                <Card className="p-8 border-red-200 bg-red-50/30" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy">
                      FCP Catalog Upload
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    GSA replaced SIP with the <strong>Federal Catalog Platform (FCP)</strong>.
                    If you haven't uploaded your catalog to FCP, your products are <strong>invisible</strong> on
                    GSA Advantage — agencies literally can't find you. We handle the entire upload within 30 days.
                  </p>
                </Card>

                <h4 className="font-display text-lg font-bold text-navy">What's Included</h4>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: "Full Catalog Upload", desc: "Uploaded within the 30-day GSA deadline" },
                    { title: "Pricing Review", desc: "Every line item checked for accuracy" },
                    { title: "Strategy Session", desc: "Roadmap for your catalog going forward" },
                    { title: "Technical Support", desc: "SIN and product issue resolution" },
                  ].map((item) => (
                    <Card key={item.title} className="p-5 flex items-start gap-3" hover>
                      <CheckCircle size={18} className="text-brand-blue mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-navy text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-4">
                  <LinkButton href="/order" size="lg">
                    Get Started
                    <ArrowRight size={16} className="ml-2" />
                  </LinkButton>
                  <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                    Talk to a Specialist
                  </LinkButton>
                </div>
              </div>
            )}

            {/* ═══ SUBMISSION TAB ═══ */}
            {activeTab === "submission" && (
              <div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
                  Our 6-week process gets your GSA application ready and submitted. We review every section —
                  admin, technical, and pricing — so problems get caught before GSA sees them.
                  Click any step below to see the details.
                </p>

                {/* Visual Timeline */}
                <div className="space-y-0">
                  {timeline.map((step, idx) => {
                    const isActive = activeTimeline === idx;
                    const isComplete = idx < activeTimeline;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTimeline(idx)}
                        className="w-full text-left group"
                      >
                        <div className="flex gap-4">
                          {/* Vertical line + dot */}
                          <div className="flex flex-col items-center">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shrink-0 transition-all border-2",
                                isActive
                                  ? "bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20"
                                  : isComplete
                                  ? "bg-brand-blue/10 text-brand-blue border-brand-blue/30"
                                  : "bg-white text-slate-400 border-slate-200 group-hover:border-brand-blue/40"
                              )}
                            >
                              {isComplete ? <CheckCircle size={18} /> : idx + 1}
                            </div>
                            {idx < timeline.length - 1 && (
                              <div
                                className={cn(
                                  "w-0.5 flex-1 min-h-[24px] transition-colors",
                                  idx < activeTimeline ? "bg-brand-blue/30" : "bg-slate-200"
                                )}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div
                            className={cn(
                              "flex-1 pb-6 rounded-xl transition-all -mt-1 p-4",
                              isActive ? "bg-white shadow-md border border-brand-blue/10" : "group-hover:bg-white/50"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <h4 className={cn("font-display font-bold", isActive ? "text-navy" : "text-slate-700")}>
                                {step.task}
                              </h4>
                              <span className={cn(
                                "text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
                                isActive ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400"
                              )}>
                                {step.phase}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{step.desc}</p>

                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 grid gap-2 sm:grid-cols-2"
                              >
                                {step.details.map((d) => (
                                  <div key={d} className="flex items-start gap-2 text-sm text-slate-600">
                                    <CheckCircle size={14} className="text-brand-blue mt-0.5 shrink-0" />
                                    {d}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-8">
                  <LinkButton href="/order" size="lg">
                    Get Started
                    <ArrowRight size={16} className="ml-2" />
                  </LinkButton>
                  <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                    Book a Free Call
                  </LinkButton>
                </div>
              </div>
            )}

            {/* ═══ MANAGEMENT TAB ═══ */}
            {activeTab === "management" && (
              <div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Keeping a GSA Schedule in good standing takes real time — reports, modifications, catalog updates, compliance checks.
                  We handle all of it so you never risk penalties or missed deadlines.
                </p>

                <div className="space-y-3">
                  {managementServices.map((svc, idx) => {
                    const isActive = activeManagement === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveManagement(idx)}
                        className={cn(
                          "w-full text-left rounded-xl border-2 p-5 transition-all",
                          isActive
                            ? "border-brand-blue bg-white shadow-md"
                            : "border-slate-100 bg-white hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg shrink-0 transition-colors",
                              isActive ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-400"
                            )}
                          >
                            <svc.icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-bold text-navy">{svc.title}</h4>
                            <p className="text-sm text-slate-500 mt-0.5">{svc.description}</p>
                          </div>
                          <ChevronRight
                            size={16}
                            className={cn(
                              "text-slate-300 transition-transform shrink-0",
                              isActive && "rotate-90 text-brand-blue"
                            )}
                          />
                        </div>

                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.25 }}
                            className="mt-4 ml-14"
                          >
                            <div className="grid gap-2 sm:grid-cols-2 mb-3">
                              {svc.tasks.map((t) => (
                                <div key={t} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle size={14} className="text-brand-blue mt-0.5 shrink-0" />
                                  {t}
                                </div>
                              ))}
                            </div>
                            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-800">
                              <strong>Result:</strong> {svc.benefit}
                            </div>
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Benefits */}
                <div className="mt-8 rounded-xl bg-white border border-slate-200 p-6">
                  <h4 className="font-display font-bold text-navy mb-4">What You Get</h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {managementBenefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle size={14} className="text-brand-blue shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-8">
                  <LinkButton href="/order" size="lg">
                    Get Started
                    <ArrowRight size={16} className="ml-2" />
                  </LinkButton>
                  <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                    Learn More on a Call
                  </LinkButton>
                </div>
              </div>
            )}

            {/* ═══ WHY GSA TAB ═══ */}
            {activeTab === "benefits" && (
              <div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl">
                  The GSA Schedule is how the government prefers to buy. Here's why it matters for your business.
                </p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {gsaBenefits.map((b, idx) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.4 }}
                    >
                      <Card className="p-6 h-full flex flex-col" hover>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                            <b.icon size={20} className="text-brand-blue" />
                          </div>
                          <div>
                            <span className="font-display text-2xl font-bold text-brand-blue">{b.stat}</span>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                              {b.statLabel}
                            </p>
                          </div>
                        </div>
                        <h4 className="font-display text-lg font-bold text-navy mb-2">{b.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <LinkButton href="/order" size="lg">
                    Start Your GSA Journey
                    <ArrowRight size={18} className="ml-2" />
                  </LinkButton>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-3xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Common Questions
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">FAQ</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className={cn(
                  "w-full text-left rounded-xl border-2 p-5 transition-all",
                  activeFaq === idx
                    ? "border-brand-blue bg-brand-blue/[0.02]"
                    : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-navy text-sm">{faq.q}</h4>
                  <ChevronRight
                    size={16}
                    className={cn(
                      "text-slate-300 transition-transform shrink-0",
                      activeFaq === idx && "rotate-90 text-brand-blue"
                    )}
                  />
                </div>
                {activeFaq === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 text-sm text-slate-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-navy py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Get on the GSA Schedule?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60 text-lg">
            Whether you need a catalog upload or a full-service submission, we make it simple.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
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
              className="text-white border-2 border-white/20 hover:bg-white/10"
            >
              Schedule a Free Call
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

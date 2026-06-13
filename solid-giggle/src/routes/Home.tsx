import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  Rocket,
  Phone,
  TrendingUp,
  Globe,
  Clock,
  DollarSign,
  Users,
  XCircle,
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { LinkButton } from "../components/Button";
import GsaNewsFeed from "../components/GsaNewsFeed";
import { BRAND, LINKS, HERO_STATS, TRUST_POINTS } from "../lib/constants";

/* ── Objection cards — written in the customer's voice, then answered ── */
const objections = [
  {
    objection: '"We don\'t have the bandwidth for this."',
    answer: "We handle everything.",
    detail:
      "Your team spends zero hours on GSA paperwork. We execute every modification, upload, and compliance task. You review and approve — that's it.",
    icon: Clock,
  },
  {
    objection: '"What if my mod gets rejected?"',
    answer: "98% approval rate.",
    detail:
      "Our pre-submission QA process catches the errors that cause rejections. Every file is audited against current GSA requirements before it's submitted.",
    icon: ShieldCheck,
  },
  {
    objection: '"Is it worth the investment?"',
    answer: "$50B+ in annual federal buying power.",
    detail:
      "A single federal contract can return 10-50x the cost of management. Our clients access a market most competitors never reach.",
    icon: DollarSign,
  },
  {
    objection: '"How do I know you\'re the right team?"',
    answer: "500+ schedules. 15+ years.",
    detail:
      "We've managed GSA Schedules across IT, professional services, manufacturing, and more. Every engagement gets a dedicated project manager.",
    icon: BadgeCheck,
  },
];

/* ── "What You Gain" — outcomes, not features ── */
const outcomes = [
  {
    icon: Globe,
    stat: "$50B+",
    title: "Access the Federal Marketplace",
    desc: "Your GSA Schedule puts you in front of every federal agency buying your category — $50B+ in annual procurement, available to you.",
  },
  {
    icon: Users,
    stat: "96%",
    title: "Less Competition Than Open Market",
    desc: "Only ~4% of small businesses hold a GSA Schedule. You compete against a fraction of the vendors bidding on open-market contracts.",
  },
  {
    icon: ShieldCheck,
    stat: "Instant",
    title: "Pre-Vetted Credibility",
    desc: "A GSA Schedule tells agencies you've already been vetted. Procurement officers trust Schedule holders — it shortens your sales cycle dramatically.",
  },
  {
    icon: TrendingUp,
    stat: "20-Year",
    title: "Recurring Revenue Vehicle",
    desc: "GSA Schedules last up to 20 years with 5-year option periods. One award creates a decades-long revenue stream from the federal government.",
  },
  {
    icon: BarChart3,
    stat: "Faster",
    title: "Shorter Sales Cycles",
    desc: "Agencies can buy from your GSA Schedule without a full competitive bid process. That means faster purchase orders and quicker revenue.",
  },
  {
    icon: Shield,
    stat: "24/7",
    title: "Visibility on GSA Advantage",
    desc: "Your products and services are listed on GSA Advantage — the federal government's online shopping platform, visible to every buyer.",
  },
];

/* ── Buyer segmentation — "Which describes you?" ── */
const buyerTypes = [
  {
    title: "I Already Have a GSA Schedule",
    subtitle: "Keep it compliant. Maximize revenue.",
    desc: "You need ongoing contract management, modifications, FCP compliance, and a team that handles the back office so you can focus on winning work.",
    cta: "Explore Management Plans",
    href: "/pricing",
    icon: Shield,
    color: "brand",
  },
  {
    title: "I Need a GSA Modification",
    subtitle: "Add SINs, update pricing, expand your catalog.",
    desc: "Whether it's a major mod to add new services or a minor catalog update, we execute your modification and guarantee submission within 14 days.",
    cta: "Get Your Mod Done",
    href: "/order?service=standalone-mod",
    icon: FileText,
    color: "cta",
  },
  {
    title: "I'm New to GSA",
    subtitle: "Get on the Schedule. We handle the heavy lifting.",
    desc: "From eligibility assessment to proposal writing to portal submission — we build and submit your GSA MAS application with a 45-day submission guarantee.",
    cta: "Start Your Application",
    href: "/order?service=gsa-submission",
    icon: Rocket,
    color: "brand",
  },
];

/* ── Pricing preview — anchoring ── */
const pricingPreview = [
  {
    name: "FCP Transition & Compliance",
    price: "$499",
    period: "flat fee",
    hook: "Most Urgent",
    desc: "We execute your mandatory FAS Catalog Platform transition and audit your GSA Schedule to guarantee 100% compliance.",
    href: "/order?service=fcp-transition",
  },
  {
    name: "Standalone GSA Modification",
    price: "$2,999",
    period: "flat fee",
    hook: "One-Time Fix",
    desc: "We flawlessly execute your single major GSA modification from start to finish — new products and services live on your schedule faster.",
    href: "/order?service=standalone-mod",
  },
  {
    name: "GSA Complete Management",
    price: "$4,500",
    period: "/ year",
    hook: "Best Value",
    desc: "Your dedicated, end-to-end GSA management team for a full year. All modifications, 14-day submission guarantee, and comprehensive training.",
    href: "/order?service=complete-management",
    featured: true,
  },
];

/* ── FAQ — buyer-focused, doubles as SEO ── */
const homeFaqs = [
  {
    q: "What is a GSA Schedule and why do I need one?",
    a: "A GSA Schedule (also called a GSA MAS Contract) is a long-term government contract that lets federal agencies purchase your products and services at pre-negotiated prices. It's the primary gateway to $50B+ in annual federal procurement — and it gives you pre-vetted credibility that shortens sales cycles.",
  },
  {
    q: "How long does it take to get a GSA Schedule?",
    a: "With our team handling the process, we guarantee your submission package is ready within 45 days. After submission, GSA typically takes 90-120 days for review and award. Your total time commitment is minimal — we handle the document prep, pricing narratives, and portal management.",
  },
  {
    q: "How much of my time does this actually require?",
    a: "Very little. For ongoing management, your team reviews and approves — that's it. For new submissions, we need your input on pricing and past performance, but we write every document and manage the entire portal process. Most clients spend less than 3-5 hours total on our managed engagements.",
  },
  {
    q: "What if my GSA modification gets rejected?",
    a: "Our 98% approval rate exists because we pre-audit every submission against current GSA requirements before it goes in. If a modification is rejected, we diagnose the issue and resubmit at no additional cost. Our 14-day submission guarantee means your mods move fast.",
  },
  {
    q: "Do I need past federal experience to get a GSA Schedule?",
    a: "No. You need demonstrated commercial past performance, financial stability, and TAA-compliant products/services — but you don't need prior government contracts. We assess your eligibility and close any gaps before submission.",
  },
  {
    q: "Why pay for management when I could handle it in-house?",
    a: "Most businesses underestimate the true cost of in-house GSA management: 200-500 hours of staff time annually on compliance, IFF reporting, catalog updates, and modifications. At $4,500/year, our management plan costs less than a single week of a mid-level employee's salary — and we guarantee 14-day mod submissions.",
  },
];

/* ── "How It Works" steps ── */
const steps = [
  {
    step: "01",
    title: "Free Strategy Call",
    time: "~30 min",
    desc: "We assess your situation, identify the right path, and give you a clear recommendation — whether that's management, a modification, or a new submission.",
  },
  {
    step: "02",
    title: "We Handle the Heavy Lifting",
    time: "You review & approve",
    desc: "Our team executes every document, modification, and compliance task. You get weekly updates and a dedicated project manager. Your only job is to approve.",
  },
  {
    step: "03",
    title: "Your Schedule Works for You",
    time: "Ongoing",
    desc: "Your GSA Schedule stays compliant, your catalog stays current, and you focus 100% on winning federal contracts and growing revenue.",
  },
];

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BRAND.name,
    description:
      "GSA Schedule management, modifications, FCP transition, and compliance services. 500+ schedules managed, 98% approval rate, 14-day mod submission guarantee.",
    url: BRAND.url,
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "GSA Schedule Management",
      "GSA Contract Modifications",
      "FAS Catalog Platform Migration",
      "GSA MAS Submission",
      "GSA Compliance Audit",
      "GSA Schedule Consulting",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: BRAND.url,
    description:
      "GSA Schedule management, modifications, compliance, and consulting. Transparent pricing, 14-day submission guarantee.",
  },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const fadeInView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>
          GSA Schedule Management, Modifications & Compliance | {BRAND.name}
        </title>
        <meta
          name="description"
          content="Outsource your GSA catalog maintenance, modifications, and compliance. 500+ schedules managed, 98% approval rate, 14-day mod submission guarantee. Flat-fee pricing, no lock-in."
        />
        <meta
          name="keywords"
          content="GSA Schedule management, outsource GSA catalog maintenance, GSA major modification consultant, FAS Catalog Platform migration service, GSA schedule compliance audit, GSA MAS Contract, federal contracting services"
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
        <meta
          property="og:title"
          content={`GSA Schedule Management, Modifications & Compliance | ${BRAND.name}`}
        />
        <meta
          property="og:description"
          content="Outsource your GSA catalog maintenance, modifications, and compliance. 500+ schedules managed. Flat-fee pricing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BRAND.url} />
        <meta property="og:image" content={`${BRAND.url}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`GSA Schedule Management & Modifications | ${BRAND.name}`}
        />
        <meta
          name="twitter:description"
          content="Outsource your GSA catalog maintenance, modifications, and compliance. 500+ schedules managed. Flat-fee pricing."
        />
        <meta name="twitter:image" content={`${BRAND.url}/logo.png`} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
      </Helmet>

      {/* ══════════════════════════════════════════════════════════════
          1. STAT BAR — hard numbers before anything else
         ══════════════════════════════════════════════════════════════ */}
      <div className="bg-ink text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="py-3.5 text-center">
                <span className="font-display text-lg font-bold text-cta sm:text-xl">
                  {stat.value}
                </span>
                <span className="ml-2 text-xs text-white/60 uppercase tracking-wide hidden sm:inline">
                  {stat.label}
                </span>
                <div className="text-[10px] text-white/50 uppercase tracking-wide mt-0.5 sm:hidden">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. HERO — promise headline, not a description of the company
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fade}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Stop Losing Revenue to
              <span className="block mt-2 text-cta">
                GSA Red Tape.
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              We manage your entire GSA Schedule — modifications, compliance, FCP
              transitions, and catalog maintenance — so your team focuses 100% on
              winning contracts.{" "}
              <strong className="text-ink">
                Flat fees. 14-day guarantee. Cancel anytime.
              </strong>
            </p>

            {/* Two CTAs — high intent + low commitment */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <LinkButton
                href="/order"
                size="lg"
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                See Plans & Pricing
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="lg"
                className="bg-white"
              >
                <Phone size={18} className="mr-2 text-ink-light" />
                Free Strategy Call
              </LinkButton>
            </div>

            {/* Trust strip — risk reversal */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm text-ink-light"
                >
                  <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. OBJECTION-HANDLING GRID — strongest conversion section
             Each card: objection in customer's voice → answer
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              We've Heard It All
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Your concerns. Answered.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {objections.map((obj, idx) => (
              <motion.div
                key={obj.objection}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 lg:p-10 hover:shadow-elevated hover:border-cta/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                    <XCircle size={22} className="text-red-400" />
                  </div>
                  <p className="font-display text-lg font-bold text-ink italic leading-snug pt-2">
                    {obj.objection}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 border border-green-100">
                    <obj.icon size={22} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-cta mb-1">
                      {obj.answer}
                    </p>
                    <p className="text-ink-light text-sm leading-relaxed">
                      {obj.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. "WHAT YOU GAIN" — benefits framed as outcomes
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-surface py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              Why a GSA Schedule
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              What your business gains with a managed GSA Schedule.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              A GSA Schedule isn't just a contract — it's a revenue engine. Here's
              what changes when you have one, and when we manage it.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 hover:shadow-elevated hover:border-cta/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cta/10 border border-cta/15">
                    <item.icon size={20} className="text-cta" />
                  </div>
                  <span className="font-display text-2xl font-bold text-brand">
                    {item.stat}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. BUYER SEGMENTATION — "Which describes you?"
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-ink py-20 lg:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_90%,rgba(216,137,58,0.15),transparent)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              Where Are You Starting?
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight text-white">
              Which describes your situation?
            </h2>
            <p className="mt-5 text-white/60 text-lg">
              Pick your path. Each leads to the right next step.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {buyerTypes.map((buyer, idx) => (
              <motion.div
                key={buyer.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link
                  to={buyer.href}
                  className="group block h-full rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm p-8 hover:bg-white/[0.1] hover:border-cta/40 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/20 mb-5">
                    <buyer.icon className="text-cta" size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {buyer.title}
                  </h3>
                  <p className="text-cta font-semibold text-sm mb-3">
                    {buyer.subtitle}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {buyer.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-cta group-hover:gap-3 transition-all">
                    {buyer.cta}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. "HOW IT WORKS" — 3 steps, effort minimized
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              How It Works
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Three steps. We do the rest.
            </h2>
            <p className="mt-6 text-ink-light text-lg">
              The federal procurement process is complex. Your experience with us
              isn't.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-cta/20 via-cta/40 to-cta/20" />

            {steps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cta text-white shadow-lg shadow-cta/25 mb-6 font-display text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-1">
                  {item.title}
                </h3>
                <p className="text-cta font-semibold text-sm mb-3">
                  {item.time}
                </p>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeInView}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center font-display text-xl font-bold text-ink"
          >
            That's it. You focus on winning work.{" "}
            <span className="text-cta">We handle the GSA.</span>
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. PRICING PREVIEW — anchoring the value
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-surface py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              Transparent Pricing
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Every price. Published. No sales call required.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              Why pay $2,999 for a single modification when $4,500 gets you a
              full year of management — including{" "}
              <em>unlimited</em> modifications?
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPreview.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Link
                  to={tier.href}
                  className={`group block h-full rounded-2xl border p-8 lg:p-10 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
                    tier.featured
                      ? "border-cta bg-white ring-2 ring-cta/20 shadow-card"
                      : "border-warm-border bg-white hover:border-cta/30"
                  }`}
                >
                  {tier.featured && (
                    <div className="inline-block px-3 py-1 rounded-full bg-cta text-white text-xs font-bold uppercase tracking-wide mb-4">
                      {tier.hook}
                    </div>
                  )}
                  {!tier.featured && (
                    <div className="inline-block px-3 py-1 rounded-full bg-ink/5 text-ink-light text-xs font-bold uppercase tracking-wide mb-4">
                      {tier.hook}
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="font-display text-4xl font-bold text-ink">
                      {tier.price}
                    </span>
                    <span className="text-ink-light text-sm ml-1">
                      {tier.period}
                    </span>
                  </div>
                  <p className="text-ink-light text-sm leading-relaxed mb-6">
                    {tier.desc}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3 ${
                      tier.featured ? "text-cta" : "text-ink group-hover:text-cta"
                    }`}
                  >
                    Get Started
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <LinkButton href="/pricing" variant="secondary" size="lg" className="bg-white">
              See All Plans & Full Pricing Details
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. INTELLIGENCE HUB — SEO pillar articles
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              GSA Intelligence Hub
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Deep-dive guides for GSA Schedule holders.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              Real answers to the questions you're googling right now — written by
              the team that manages 500+ schedules.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title:
                  "The 2026 Guide to the FAS Catalog Platform (FCP) Transition",
                desc: "Why the SIP-to-FCP shift matters, what breaks during migration, and how to keep your catalog visible on GSA Advantage.",
                href: "/intelligence/fas-catalog-platform-transition-guide",
              },
              {
                title: "Why Your GSA Modifications Keep Getting Rejected",
                desc: "The submission mistakes that trigger rejections and the pre-flight checks that keep your mod moving.",
                href: "/intelligence/gsa-modification-rejected",
              },
              {
                title:
                  "In-House GSA Management vs. Outsourcing: The True Cost",
                desc: "A practical cost comparison that shows when a retainer is cheaper than burning internal hours.",
                href: "/intelligence/in-house-vs-outsourced-gsa-management",
              },
            ].map((article, idx) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Link
                  to={article.href}
                  className="group block h-full rounded-2xl border border-warm-border bg-white p-8 hover:shadow-elevated hover:border-cta/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-brand mb-4">
                    Pillar Article
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink mb-4 group-hover:text-cta transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-ink-light text-sm leading-relaxed mb-6">
                    {article.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cta">
                    Read the guide
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <LinkButton href="/intelligence" size="lg">
              Visit the Intelligence Hub
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
            <LinkButton
              href="/resources/fcp-compliance-checklist"
              variant="secondary"
              size="lg"
              className="bg-white"
            >
              Download the FCP Checklist
            </LinkButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. GSA NEWS FEED
         ══════════════════════════════════════════════════════════════ */}
      <GsaNewsFeed />

      {/* ══════════════════════════════════════════════════════════════
          10. FAQ — buyer-focused, doubles as SEO
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-surface py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              Frequently Asked Questions
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Answers to the questions you're asking right now.
            </h2>
          </motion.div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 rounded-xl border border-warm-border bg-white px-6 py-5 text-left hover:border-cta/30 transition-colors"
                >
                  <span className="font-display text-base font-bold text-ink pr-4">
                    {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp size={20} className="text-cta shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-ink-muted shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 text-ink-light text-sm leading-relaxed border-x border-b border-warm-border rounded-b-xl bg-white -mt-1">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          11. FINAL CTA — repeats risk reversal & two-path buttons
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-ink p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(216,137,58,0.12),transparent)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">
                Your GSA Schedule should be generating revenue —
                <span className="text-cta"> not draining your team.</span>
              </h2>
              <p className="mt-6 text-white/60 text-lg leading-relaxed mb-10">
                500+ schedules managed. 98% approval rate. 14-day mod
                submission guarantee. Flat-fee pricing with no lock-in.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton
                  href="/order"
                  size="lg"
                  className="shadow-md hover:shadow-lg"
                >
                  See Plans & Pricing
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  <Phone size={18} className="mr-2" />
                  Free Strategy Call
                </LinkButton>
              </div>

              {/* Trust strip repeat */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {TRUST_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-green-400 shrink-0"
                    />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

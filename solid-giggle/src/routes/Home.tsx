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

/* ── Objection cards ── */
const objections = [
  {
    objection: '"We don\'t have the bandwidth."',
    answer: "We do all the work.",
    detail:
      "Your team doesn't touch GSA paperwork. We run every mod, upload, and compliance task. You sign off when we're done.",
    icon: Clock,
  },
  {
    objection: '"What if the mod gets rejected?"',
    answer: "98% approval rate.",
    detail:
      "We audit every file against current GSA requirements before submission. Rejections happen when people skip steps. We don't skip steps.",
    icon: ShieldCheck,
  },
  {
    objection: '"Is it worth the cost?"',
    answer: "One federal contract pays for years of management.",
    detail:
      "The federal government spends $50B+ through GSA annually. At $375/month, our management fee is a rounding error on your first task order.",
    icon: DollarSign,
  },
  {
    objection: '"How do I know you can deliver?"',
    answer: "500+ schedules managed. Look at the track record.",
    detail:
      "We've done this across IT, professional services, manufacturing, and construction. Every client gets a dedicated PM who knows their contract.",
    icon: BadgeCheck,
  },
];

/* ── What a GSA Schedule actually does for you ── */
const outcomes = [
  {
    icon: Globe,
    stat: "$50B+",
    title: "Direct Access to Federal Buyers",
    desc: "GSA Schedules connect you to every federal agency purchasing in your category. That's $50B+ in annual spend you're currently locked out of.",
  },
  {
    icon: Users,
    stat: "~4%",
    title: "A Fraction of the Competition",
    desc: "Only about 4% of small businesses hold a GSA Schedule. On the open market, you compete against everyone. On Schedule, the field is thin.",
  },
  {
    icon: ShieldCheck,
    stat: "Instant",
    title: "You're Already Vetted",
    desc: "Procurement officers see your GSA contract number and skip the risk assessment. You've already passed. That alone shortens deal cycles by weeks.",
  },
  {
    icon: TrendingUp,
    stat: "20-Year",
    title: "One Award, Decades of Revenue",
    desc: "A GSA Schedule runs for 20 years (5-year base + three options). You apply once. You sell for two decades.",
  },
  {
    icon: BarChart3,
    stat: "Faster",
    title: "Agencies Buy Without Full Bids",
    desc: "Agencies can order off your schedule without running a competitive solicitation. Faster POs, faster revenue, less back-and-forth.",
  },
  {
    icon: Shield,
    stat: "24/7",
    title: "Listed on GSA Advantage",
    desc: "Your catalog lives on the government's online marketplace. Every contracting officer in every agency can search and buy from you.",
  },
];

/* ── Buyer segmentation ── */
const buyerTypes = [
  {
    title: "I Have a GSA Schedule",
    subtitle: "Keep it compliant. Stop burning internal hours.",
    desc: "Mods, IFF reporting, catalog updates, FCP compliance — we take over the back office. You keep your team on revenue-generating work.",
    cta: "See Management Plans",
    href: "/pricing",
    icon: Shield,
    color: "brand",
  },
  {
    title: "I Need a Modification",
    subtitle: "New SINs, pricing changes, catalog expansion.",
    desc: "We prepare and submit your modification — major or minor — within 14 days. One flat fee, no hourly billing, no surprises.",
    cta: "Order a Modification",
    href: "/order?service=standalone-mod",
    icon: FileText,
    color: "cta",
  },
  {
    title: "I Need a GSA Schedule",
    subtitle: "First-time applicant. We run the process.",
    desc: "We write the proposal, build the pricing, manage the portal, and submit within 45 days. 98% of our clients get approved.",
    cta: "Start the Process",
    href: "/order?service=gsa-submission",
    icon: Rocket,
    color: "brand",
  },
];

/* ── Pricing preview ── */
const pricingPreview = [
  {
    name: "FCP Transition & Compliance",
    price: "$499",
    period: "flat fee",
    hook: "Most Urgent",
    desc: "Your mandatory FAS Catalog Platform migration, executed and audited for compliance. Done this week.",
    href: "/order?service=fcp-transition",
  },
  {
    name: "Standalone GSA Modification",
    price: "$2,999",
    period: "flat fee",
    hook: "One-Time Fix",
    desc: "One major modification — new SINs, products, or pricing — prepared, submitted, and tracked to completion.",
    href: "/order?service=standalone-mod",
  },
  {
    name: "GSA Complete Management",
    price: "$4,500",
    period: "/ year",
    hook: "Best Value",
    desc: "Every modification, every compliance task, every report — handled for 12 months. Dedicated PM. 14-day submission guarantee.",
    href: "/order?service=complete-management",
    featured: true,
  },
];

/* ── FAQ ── */
const homeFaqs = [
  {
    q: "What is a GSA Schedule?",
    a: "A GSA Schedule (also called a MAS Contract) is a long-term contract with the federal government. It lets agencies buy your products and services at pre-negotiated prices without running a full competitive bid. It's the main way businesses sell to the government.",
  },
  {
    q: "How long does it take to get one?",
    a: "We guarantee your submission package is ready within 45 days. GSA typically takes 90-120 days after that for review and award. Total timeline: about 4-6 months. We handle the documents, the pricing narrative, and the portal — you provide business info and approve.",
  },
  {
    q: "How much of my time does this take?",
    a: "For management clients: almost none. You review what we prepare and sign off. For new submissions: we need your input on pricing and past performance, but we write everything. Most clients spend 3-5 hours total across the entire engagement.",
  },
  {
    q: "What if my modification gets rejected?",
    a: "We audit every submission against current GSA requirements before filing. That's why our approval rate is 98%. If a mod is rejected, we fix it and resubmit at no extra cost.",
  },
  {
    q: "Do I need federal experience to qualify?",
    a: "No. You need commercial past performance, financial stability, and TAA-compliant products or services. Prior government contracts are not required. We assess eligibility before you pay anything.",
  },
  {
    q: "Why not just handle GSA in-house?",
    a: "You can. But most companies burn 200-500 staff hours per year on IFF reporting, catalog updates, mods, and compliance. At $4,500/year, our management plan costs less than a week of one employee's time — and we guarantee 14-day mod submissions.",
  },
];

/* ── How it works ── */
const steps = [
  {
    step: "01",
    title: "Tell Us What You Need",
    time: "~30 min call or just order online",
    desc: "We figure out where you are — new applicant, existing holder, or somewhere in between — and recommend the right service. No pressure, no pitch deck.",
  },
  {
    step: "02",
    title: "We Execute",
    time: "You approve, we do the rest",
    desc: "Our team handles the documents, the portal, the mods, the compliance — all of it. You get weekly status updates and a dedicated PM. Your job is to say 'approved.'",
  },
  {
    step: "03",
    title: "You Stay Compliant and Sell",
    time: "Ongoing",
    desc: "Your catalog is current. Your reports are filed. Your mods are submitted. You focus on winning task orders and closing federal deals.",
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
              Your GSA Schedule.
              <span className="block mt-2 text-cta">
                Managed. Compliant. Done.
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              Modifications, compliance, FCP transitions, catalog updates — we
              run your GSA back office so you don't have to.{" "}
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
              Common Questions
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              You asked. Here's the straight answer.
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
              Why It Matters
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              What a GSA Schedule actually gets you.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              A GSA contract opens doors that don't exist on the commercial side.
              Here's what changes when you hold one — and keep it current.
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
              Start Here
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight text-white">
              Tell us where you are. We'll handle the rest.
            </h2>
            <p className="mt-5 text-white/60 text-lg">
              Three starting points. Same result: your GSA is handled.
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
              The Process
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Three steps. Zero guesswork.
            </h2>
            <p className="mt-6 text-ink-light text-lg">
              Federal procurement is complicated. Working with us isn't.
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
            You sell. We manage the contract behind it.{" "}
            <span className="text-cta">That's the deal.</span>
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
              Pricing
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Published rates. No call needed.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              A single modification costs $2,999. Full-year management —
              including <em>unlimited</em> mods — is $4,500. Do the math.
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
              View All Plans & Pricing
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
              Intelligence Hub
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Guides written by the team behind 500+ schedules.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              Practical breakdowns of the issues GSA holders actually deal with —
              FCP migration, mod rejections, cost of in-house management.
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
              FAQ
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Straight answers to common questions.
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
                Stop managing your GSA Schedule.
                <span className="text-cta"> Start using it.</span>
              </h2>
              <p className="mt-6 text-white/60 text-lg leading-relaxed mb-10">
                500+ schedules managed. 98% approval rate. 14-day mod
                submission guarantee. Flat fees, no lock-in.
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

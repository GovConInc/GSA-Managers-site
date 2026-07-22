import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  Rocket,
  TrendingUp,
  Globe,
  Clock,
  DollarSign,
  Users,
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { LinkButton } from "../components/Button";
import GsaNewsFeed from "../components/GsaNewsFeed";
import { BRAND, LINKS, TRUST_POINTS } from "../lib/constants";

/* ── Why contractors choose us ── */
const differentiators = [
  {
    title: "We do the work — not you",
    detail:
      "Your team doesn't touch GSA paperwork. We handle every modification, catalog upload, and compliance filing. You review, approve, and move on.",
    icon: Clock,
  },
  {
    title: "98% modification approval rate",
    detail:
      "We audit every submission against current GSA requirements before filing. Rejections come from missed steps — we don't miss steps.",
    icon: ShieldCheck,
  },
  {
    title: "Flat fees, published pricing",
    detail:
      "No hourly billing, no retainer surprises. Every service has a fixed price and a guaranteed delivery timeline, listed on our website.",
    icon: DollarSign,
  },
  {
    title: "Dedicated project manager",
    detail:
      "Every client is assigned a PM who knows their contract, their SINs, and their compliance calendar. One point of contact, start to finish.",
    icon: BadgeCheck,
  },
];

/* ── What a GSA Schedule does ── */
const outcomes = [
  {
    icon: Globe,
    title: "Access to federal agency buyers",
    desc: "A GSA Schedule connects you to every federal agency purchasing in your category — over $50 billion in annual spend.",
  },
  {
    icon: Users,
    title: "Less competition",
    desc: "Only about 4% of small businesses hold a GSA Schedule. On Schedule, you compete against a fraction of the open market.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-vetted status",
    desc: "Contracting officers see your GSA contract number and skip the risk assessment. You're already approved to sell.",
  },
  {
    icon: TrendingUp,
    title: "20-year contract term",
    desc: "A GSA Schedule runs for 20 years (5-year base plus three option periods). Apply once, sell for decades.",
  },
  {
    icon: BarChart3,
    title: "Simplified procurement",
    desc: "Agencies can order directly from your schedule without a full competitive solicitation. Faster purchase orders, faster revenue.",
  },
  {
    icon: Shield,
    title: "GSA Advantage listing",
    desc: "Your products and services are listed on the federal government's online marketplace, searchable by every contracting officer.",
  },
];

/* ── Buyer segmentation — two audiences ── */
const buyerTypes = [
  {
    title: "Getting Started with GSA",
    subtitle: "New MAS contract application",
    desc: "We prepare your complete offer package, build your pricing narrative, and manage the submission through award — so you enter the federal marketplace with confidence.",
    cta: "Start Your GSA Application",
    href: "/order?service=gsa-submission",
    icon: Rocket,
    color: "brand",
  },
  {
    title: "Modify Your Existing Contract",
    subtitle: "Add SINs, update pricing, expand your catalog",
    desc: "Already hold a GSA Schedule? We prepare and submit your modification within 14 days — pricing updates, SIN additions, scope changes, and admin mods. Flat fee, no hourly billing.",
    cta: "Request a Modification",
    href: "/order?service=standalone-mod",
    icon: FileText,
    color: "cta",
  },
  {
    title: "Ongoing Contract Management",
    subtitle: "Keep your schedule compliant year-round",
    desc: "We handle modifications, IFF reporting, catalog updates, FCP compliance, and option renewals — so your team stays focused on winning work, not paperwork.",
    cta: "Explore Management Services",
    href: "/pricing",
    icon: Shield,
    color: "brand",
  },
];

/* ── Pricing preview ── */
const pricingPreview = [
  {
    name: "Catalog Upload & Training",
    price: "$999",
    period: "one-time",
    hook: "New Contractors",
    desc: "Complete FCP catalog migration, compliance audit, and 1-on-1 training on all GSA platforms. 7-day delivery.",
    href: "/order?service=fcp-transition",
  },
  {
    name: "GSA Modification",
    price: "$1,999",
    period: "one-time",
    hook: "Any Modification",
    desc: "Any modification — new SINs, pricing updates, or catalog changes — submitted within 14 days. Flat fee.",
    href: "/order?service=standalone-mod",
  },
  {
    name: "Complete GSA Management",
    price: "$4,500",
    period: "/ year",
    hook: "Most Popular",
    desc: "12 months of complete GSA management: all backend services, all modifications, eBuy support, compliance, and reporting. Dedicated PM included.",
    href: "/order?service=complete-management",
    featured: true,
  },
];

/* ── FAQ ── */
const homeFaqs = [
  {
    q: "What is a GSA Schedule?",
    a: "A GSA Schedule (also called a MAS contract) is a long-term government-wide contract that lets federal agencies purchase your products or services at pre-negotiated prices. It is the primary vehicle for selling to the federal government.",
  },
  {
    q: "How long does the application process take?",
    a: "We prepare your complete submission package within 45 days. GSA typically takes 90-120 days for review and award after submission. Total timeline is approximately 4-6 months from start to contract award.",
  },
  {
    q: "How much of my time is required?",
    a: "For management clients, very little — you review and approve what we prepare. For new applications, we need your input on pricing and past performance, but we draft all documents. Most clients spend 3-5 hours total.",
  },
  {
    q: "What happens if a modification is rejected?",
    a: "We review every submission against current GSA requirements before filing, which is why our approval rate is 98%. If a modification is returned, we correct and resubmit at no additional cost.",
  },
  {
    q: "Do I need prior government contract experience?",
    a: "No. You need commercial past performance, financial stability, and TAA-compliant products or services. We assess eligibility before you commit to anything.",
  },
  {
    q: "Why outsource GSA management instead of handling it in-house?",
    a: "Most companies spend 200-500 staff hours per year on IFF reporting, catalog updates, modifications, and compliance. At $4,500 per year, our management service costs less than a week of a single employee's time.",
  },
];

/* ── How it works ── */
const steps = [
  {
    step: "01",
    title: "Schedule a consultation",
    time: "15-30 minutes",
    desc: "We review your current GSA contract status, identify what you need, and recommend the right service. No obligation.",
  },
  {
    step: "02",
    title: "We handle the execution",
    time: "You approve, we deliver",
    desc: "Our team prepares all documentation, manages submissions, and coordinates with GSA on your behalf. You receive weekly status updates.",
  },
  {
    step: "03",
    title: "Stay compliant, keep selling",
    time: "Ongoing support available",
    desc: "Your catalog stays current, reports are filed on time, and modifications are submitted as needed. You focus on winning contracts.",
  },
];

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BRAND.name,
    description:
      "GSA Schedule consulting services including contract management, modifications, FAS Catalog Platform transitions, and new MAS applications for federal contractors.",
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
      "GSA Schedule management, modifications, and compliance consulting for federal contractors. Fixed-fee services with guaranteed timelines.",
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
        <title>GSA Schedule Management, Modifications & New Applications | {BRAND.name}</title>
        <meta
          name="description"
          content="GSA Schedule consulting for federal contractors — whether you're getting started with a new MAS application or modifying an existing contract. Management, modifications, FCP transitions, and compliance. Fixed fees, guaranteed timelines."
        />
        <meta
          name="keywords"
          content="GSA Schedule management, GSA Schedule consulting, GSA contract modification, FAS Catalog Platform migration, GSA compliance audit, GSA MAS application, federal contracting services"
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
        <meta
          property="og:title"
          content={`GSA Schedule Consulting — Management, Modifications & Compliance | ${BRAND.name}`}
        />
        <meta
          property="og:description"
          content="GSA Schedule consulting for federal contractors. Contract management, modifications, and compliance services with fixed fees."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BRAND.url} />
        <meta property="og:image" content={`${BRAND.url}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`GSA Schedule Consulting | ${BRAND.name}`}
        />
        <meta
          name="twitter:description"
          content="GSA Schedule consulting for federal contractors. Contract management, modifications, and compliance services."
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
          HERO
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#E8ECF2,transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#DCE3EE,transparent_60%)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fade}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              GSA Schedule Experts for New Applicants
              <span className="block mt-2 text-cta">
                &amp; Experienced Contractors Alike
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              Whether you're getting started with your first GSA Schedule or modifying an
              existing contract, we handle the paperwork, compliance, and submissions —
              so you stay focused on winning federal revenue. Fixed fees, guaranteed timelines.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                Schedule a Free Consultation
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton
                href="/pricing"
                variant="secondary"
                size="lg"
                className="bg-white"
              >
                View Services & Pricing
              </LinkButton>
            </div>

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
          WHY CHOOSE US
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
              Why Contractors Choose Us
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              What sets our approach apart
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {differentiators.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 lg:p-10 hover:shadow-elevated hover:border-cta/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cta/10 border border-cta/20">
                    <item.icon size={22} className="text-cta" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-ink mb-2">
                      {item.title}
                    </p>
                    <p className="text-ink-light text-sm leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BENEFITS OF A GSA SCHEDULE
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
              Benefits
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              What a GSA Schedule does for your business
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              A GSA contract gives you a direct channel to federal buyers that
              doesn't exist on the commercial side.
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cta/10 border border-cta/15 mb-4">
                  <item.icon size={20} className="text-cta" />
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
          OUR SERVICES
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-ink py-20 lg:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_90%,rgba(182,45,62,0.15),transparent)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E88B98] mb-3">
              Our Services
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight text-white">
              How can we help?
            </h2>
            <p className="mt-5 text-white/70 text-lg">
              Whether you're new to the GSA or an experienced contractor, select the service that matches where you are.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/15 mb-5">
                    <buyer.icon className="text-[#E88B98]" size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {buyer.title}
                  </h3>
                  <p className="text-[#E88B98] font-semibold text-sm mb-3">
                    {buyer.subtitle}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {buyer.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#E88B98] group-hover:gap-3 transition-all">
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
          HOW IT WORKS
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
              Getting started is simple
            </h2>
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

          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <LinkButton
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              size="lg"
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Schedule a Free Consultation
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRICING
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
              Fixed fees for every service
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              No hourly rates, no hidden costs. Every service is priced upfront
              with a guaranteed delivery timeline.
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
          RESOURCES
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
              Resources
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              GSA guides and compliance resources
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              In-depth coverage of the topics that matter most to GSA Schedule
              holders — FCP migration, modification best practices, and
              compliance planning.
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
                    Guide
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink mb-4 group-hover:text-cta transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-ink-light text-sm leading-relaxed mb-6">
                    {article.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cta">
                    Read more
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
              View All Resources
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
            <LinkButton
              href="/resources/fcp-compliance-checklist"
              variant="secondary"
              size="lg"
              className="bg-white"
            >
              FCP Compliance Checklist
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
              Common questions about GSA Schedules
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
          FINAL CTA
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-ink p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(182,45,62,0.12),transparent)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">
                Ready to get started?
              </h2>
              <p className="mt-6 text-white/70 text-lg leading-relaxed mb-10">
                Whether you're applying for your first GSA Schedule or modifying an existing contract,
                schedule a free consultation to discuss your needs — or view our services and pricing to get started today.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="shadow-md hover:shadow-lg"
                >
                  Schedule a Consultation
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton
                  href="/pricing"
                  variant="secondary"
                  size="lg"
                >
                  View Services & Pricing
                </LinkButton>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {TRUST_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 text-sm text-white/75"
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

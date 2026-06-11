import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  X,
  Shield,
  FileWarning,
  Award,
  Phone,
  Building2,
  Target,
  TrendingUp,
  Briefcase,
  Wrench,
  Cpu,
  HardHat,
  Stethoscope,
  Lock,
  DollarSign,
  Clock,
  BadgeCheck,
  Rocket,
} from "lucide-react";
import { LinkButton } from "../components/Button";
import GsaNewsFeed from "../components/GsaNewsFeed";
import StatBar from "../components/StatBar";
import TrustStrip from "../components/TrustStrip";
import FaqList from "../components/FaqList";
import LeadMagnet from "../components/LeadMagnet";
import PricingTiers from "../components/PricingTiers";
import { BRAND, LINKS } from "../lib/constants";
import { SERVICE_DICTIONARY } from "../lib/offers";

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

/* ── Objections answered in the customer's voice ── */
const objections = [
  {
    objection: "“I don't have the bandwidth to manage this.”",
    answer:
      "You don't need any. We take over the entire GSA back office — mods, reporting, catalog, compliance. Your involvement shrinks to approving our work.",
    proof: "Your time: ~1 hour at kickoff",
  },
  {
    objection: "“What if a modification gets rejected?”",
    answer:
      "We anticipate Contracting Officer concerns before anything is submitted — and we guarantee your mods are in within 14 days. That's why 98% of our submissions are approved.",
    proof: "98% approval · 14-day guarantee",
  },
  {
    objection: "“Is it really worth the price?”",
    answer:
      "Managing a Schedule in-house burns 10+ staff hours a month — hundreds of hours a year. Complete Management is $4,500 flat for 12 months. The math isn't close.",
    proof: "$4,500/yr vs. hundreds of internal hours",
  },
  {
    objection: "“Which consultant can I actually trust?”",
    answer:
      "One with 15+ years in federal contracting, 500+ schedules managed, and every price published right on this site. No discovery-call ambush. No hidden fees.",
    proof: "500+ schedules · transparent flat fees",
  },
];

/* ── Industry reassurance — removes "this isn't for my business" doubt ── */
const industries = [
  { icon: Cpu, label: "IT & Software" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: HardHat, label: "Manufacturing & Industrial" },
  { icon: Stethoscope, label: "Medical & Laboratory" },
  { icon: Wrench, label: "Facilities & Maintenance" },
  { icon: Lock, label: "Security & Defense" },
];

/* ── Core service silo — descriptions from the master copy dictionary ── */
const services = [
  {
    icon: Shield,
    title: "GSA Contract Management",
    description: SERVICE_DICTIONARY["Minor Modifications"],
    features: ["All mods handled for you", "Sales & admin training included", "Dedicated project manager"],
    to: "/gsa-contract-management",
    price: "From $1,499",
  },
  {
    icon: Wrench,
    title: "GSA Modifications",
    description: SERVICE_DICTIONARY["Major Modifications"],
    features: ["Major & minor modifications", "14-day submission guarantee", "Flat-fee pricing"],
    to: "/gsa-modification-consultant",
    price: "From $2,999",
  },
  {
    icon: FileWarning,
    title: "FCP Transition & Compliance",
    description: SERVICE_DICTIONARY["FCP Transition"],
    features: ["Complete FCP migration", "Full compliance audit", "Suspension risk eliminated"],
    to: "/fcp-transition-service",
    price: "$499 flat",
  },
  {
    icon: Award,
    title: "GSA Schedule Submission",
    description:
      "We prepare and submit your complete GSA MAS offer — every document, pricing narrative, and portal requirement. Because we anticipate CO concerns before you submit, you get awarded faster.",
    features: ["45-day submission guarantee", "98% approval rate", "eOffer portal managed for you"],
    to: "/gsa-schedule-submission",
    price: "From $4,995",
  },
];

/* ── What a managed Schedule gains you — outcomes, not features ── */
const gains = [
  {
    icon: DollarSign,
    title: "A $600B+ buyer on retainer",
    desc: "The federal government is the world's largest customer — and the GSA Schedule is its preferred way to buy. A healthy schedule keeps you in that flow of money.",
  },
  {
    icon: Target,
    title: "A fraction of the competition",
    desc: "Only a small share of businesses ever get — and keep — a GSA Schedule. Every compliant quarter you hold one is a quarter most of your competitors can't touch.",
  },
  {
    icon: BadgeCheck,
    title: "Instant institutional trust",
    desc: "Agencies buy from vetted GSA contractors without lengthy open-market competition. Your schedule is a credibility badge that shortens every sales cycle.",
  },
  {
    icon: TrendingUp,
    title: "Revenue that survives recessions",
    desc: "Federal procurement doesn't pause when the economy does. A managed, compliant schedule is the most stable revenue channel a small business can own.",
  },
  {
    icon: Clock,
    title: "Your team's hours back",
    desc: "Every hour your people spend wrestling eOffer, FCP, and sales reports is an hour not spent winning bids. We give those hours back — all of them.",
  },
  {
    icon: Shield,
    title: "Zero suspension risk",
    desc: "Missed mass mods, stale catalogs, and late reports get schedules suspended. Our compliance-first process means that risk simply disappears.",
  },
];

/* ── Buyer-type segmentation — one page, three readers ── */
const segments = [
  {
    icon: Shield,
    label: "Active MAS Holder",
    headline: "Your schedule is live — but it's eating your team alive.",
    body: "Mods pile up, the FCP deadline looms, and reporting never ends. Hand us the back office and get your bandwidth back.",
    cta: "See Management Plans",
    to: "/gsa-contract-management",
  },
  {
    icon: Rocket,
    label: "Recently Awarded",
    headline: "Congrats on the award. Now make it sellable.",
    body: "Until your FCP catalog baseline is live, agencies can't find or buy from you. We get you operational in weeks, not months.",
    cta: "Activate My Schedule",
    to: "/fcp-transition-service",
  },
  {
    icon: Award,
    label: "Not on Schedule Yet",
    headline: "Want in? We'll carry you through the door.",
    body: "The MAS application is a 90+ day gauntlet of documents and pricing narratives. We run the whole thing — you give us a few hours, total.",
    cta: "Start My Submission",
    to: "/gsa-schedule-submission",
  },
];

/* ── FAQ — plain-language objection cleanup + SEO ── */
const faqs = [
  {
    q: "What does GSA Schedule contract management include?",
    a: "Everything your schedule needs to stay compliant and sellable: all major and minor modifications, FCP catalog maintenance, IFF sales reporting, mass mod processing, SAM registration upkeep, option-year renewals, and CO communications. Our Complete Management plan also includes 6 sales and admin training sessions and a dedicated project manager — $4,500 flat for 12 months.",
  },
  {
    q: "How fast can you complete my FCP transition?",
    a: "Most FCP transitions and compliance audits are completed well within GSA's mandated windows — we start within one business day of checkout. The FCP Transition & Compliance Assurance package is a $499 flat fee, and it eliminates your suspension risk entirely.",
  },
  {
    q: "What's the difference between a major and a minor modification?",
    a: "Minor mods cover administrative updates — pricing changes, POC updates, catalog corrections. Major mods change the scope of your contract: adding new SINs, products, services, or labor categories. A standalone major mod with us is $2,999 flat; our 12-month Complete Management plan includes unlimited major and minor mods for $4,500.",
  },
  {
    q: "Do I really need help maintaining my GSA Schedule?",
    a: "If your team comfortably absorbs 10+ hours a month of portal work, reporting deadlines, and mod paperwork — no. But most contract holders lose revenue to delayed mods and risk suspension from missed compliance requirements. If your schedule is an afterthought internally, outsourcing it is mathematically cheaper than the staff time it consumes.",
  },
  {
    q: "How much does GSA contract management cost?",
    a: "Our pricing is published: $499 for the FCP Transition & Compliance package, $2,999 for a standalone major modification, $1,499 total for 6 months of Core Maintenance (or $250/month), and $4,500 total for 12 months of Complete Management (or $375/month). Flat fees. No surprises, no long-term lock-in.",
  },
  {
    q: "Can you help if I'm not on the GSA Schedule yet?",
    a: "Yes. Our GSA Schedule Submission service prepares and submits your complete MAS offer with a 45-day submission guarantee, and 98% of our clients are approved. Once you're awarded, the New Vendor Special gets your catalog live and your team trained.",
  },
];

export default function Home() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Schedule Management & Modification Consultants | {BRAND.name}</title>
        <meta
          name="description"
          content="We run your GSA Schedule — modifications, FCP transition, compliance, and catalog management — with flat-fee pricing published up front. 98% approval rate, 14-day mod submission guarantee, 500+ schedules managed."
        />
        <meta
          name="keywords"
          content="GSA contract management, outsource GSA catalog maintenance, GSA modification consultant, FAS Catalog Platform migration service, GSA schedule compliance audit, GSA Schedule, GSA MAS Contract"
        />
        <link rel="canonical" href={`${BRAND.url}/`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: BRAND.name,
            description:
              "GSA Schedule contract management, modifications, FCP transition, compliance audits, and MAS submissions with transparent flat-fee pricing.",
            url: `${BRAND.url}/`,
            telephone: BRAND.phone,
            email: BRAND.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tampa",
              addressRegion: "FL",
              addressCountry: "US",
            },
            areaServed: "US",
            serviceType: [
              "GSA Contract Management",
              "GSA Modifications",
              "FAS Catalog Platform Migration",
              "GSA Schedule Compliance Audit",
              "GSA MAS Submission",
            ],
          })}
        </script>
      </Helmet>

      {/* ══ HERO — numbers persuade before the pitch starts ══ */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Stat bar ABOVE the headline */}
          <StatBar className="max-w-3xl mx-auto mb-14" />

          <motion.div {...fade} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Your GSA Schedule, fully managed.
              <span className="block mt-2 text-cta">Your team, back to winning bids.</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              The government buys billions through the GSA Schedule every week. We handle the
              modifications, FCP catalog work, and compliance that keep you in that flow —
              you approve our work, we do everything else.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <LinkButton href="/pricing" size="lg" className="shadow-soft hover:shadow-md transition-shadow">
                See Plans &amp; Pricing
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="bg-white">
                <Phone size={18} className="mr-2 text-ink-light" />
                Book a Free Strategy Call
              </LinkButton>
            </div>

            <TrustStrip className="mt-8" />
          </motion.div>
        </div>
      </section>

      {/* ══ FCP URGENCY BAR — the $499 tripwire ══ */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-sm md:text-base text-white/90">
            <strong className="text-white">The FCP transition is mandatory.</strong>{" "}
            An unmigrated catalog is invisible on GSA Advantage — and a suspension risk. We fix it for{" "}
            <strong className="text-white">$499 flat</strong>.
          </p>
          <Link
            to="/fcp-transition-service"
            className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-bold text-red-600 hover:bg-red-50 hover:shadow-md transition-all active:scale-95"
          >
            Secure my schedule &rarr;
          </Link>
        </div>
      </div>

      {/* ══ INDUSTRY REASSURANCE ══ */}
      <section className="bg-white py-14 border-b border-warm-border/60">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-ink-muted mb-8">
            Built for GSA contractors in every industry
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {industries.map((ind) => (
              <div key={ind.label} className="flex items-center gap-2.5 text-ink-light">
                <ind.icon size={18} className="text-brand" />
                <span className="text-sm font-semibold">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OBJECTION-HANDLING GRID — the four thoughts that kill the sale ══ */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
              We Know What You're Thinking
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Every reason not to act — answered.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {objections.map((obj, idx) => (
              <motion.div
                key={obj.objection}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 hover:shadow-elevated hover:border-cta/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 border border-red-100">
                    <X size={16} className="text-red-500" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink leading-snug">{obj.objection}</h3>
                </div>
                <p className="text-ink-light leading-relaxed mb-5">{obj.answer}</p>
                <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 border border-cta/20 px-3.5 py-1.5 text-xs font-bold text-cta uppercase tracking-wide">
                  {obj.proof}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES — the silo, with dictionary copy ══ */}
      <section className="bg-white py-24 lg:py-32 relative">
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
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">What We Take Off Your Plate</p>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
                Every GSA headache has a flat-fee fix.
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed">
                Management-first. Whether you hold a schedule or want one, there&apos;s a clear,
                priced path — no discovery call required.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LinkButton href="/pricing" variant="secondary" className="bg-surface">
                View All Pricing
              </LinkButton>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {services.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Link to={svc.to} className="group block h-full">
                  <div className="h-full rounded-2xl border border-warm-border bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-elevated hover:border-cta/40 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cta/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-7">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cta/10 border border-cta/20 group-hover:bg-cta group-hover:border-cta transition-all duration-300">
                          <svc.icon size={26} className="text-cta group-hover:text-white transition-colors" />
                        </div>
                        <span className="rounded-full bg-warm-100 border border-warm-border px-3.5 py-1.5 text-sm font-bold text-ink">
                          {svc.price}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-cta transition-colors">
                        {svc.title}
                      </h3>

                      <p className="text-ink-light text-base leading-relaxed mb-8">{svc.description}</p>

                      <div className="space-y-3 mb-8 pt-6 border-t border-warm-border/60">
                        {svc.features.map((f) => (
                          <div key={f} className="flex items-start gap-3 text-sm text-ink-light font-medium">
                            <BadgeCheck size={18} className="text-cta shrink-0 mt-0.5" />
                            {f}
                          </div>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-ink group-hover:text-cta transition-colors mt-auto">
                        Learn more
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT YOU GAIN — outcomes, not features ══ */}
      <section className="bg-surface py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">What You Gain</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              A managed schedule isn't a compliance checkbox. It's a revenue engine.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gains.map((g, idx) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 hover:shadow-elevated hover:border-cta/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/10 border border-cta/15 mb-5">
                  <g.icon size={22} className="text-cta" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-3">{g.title}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRANSPARENT PRICING — our edge: no hidden quotes ══ */}
      <section className="bg-white py-24 lg:py-32 relative" id="pricing">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Transparent Pricing</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Every price, published. Buy in two clicks.
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              Other consultants hide pricing behind a sales call. We don&apos;t. Pick your fix,
              check out securely, and we start within one business day.
            </p>
          </motion.div>

          <PricingTiers />

          <div className="mt-12 text-center">
            <LinkButton href="/pricing" variant="secondary" size="lg" className="bg-surface">
              Compare All Plans &amp; Services
              <ArrowRight size={16} className="ml-2" />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* ══ SEGMENTATION — "Which are you?" ══ */}
      <section className="bg-surface py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Which Are You?</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Three starting points. Three clear next steps.
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {segments.map((seg, idx) => (
              <motion.div
                key={seg.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col rounded-2xl border border-warm-border bg-white p-8 lg:p-10 hover:shadow-elevated hover:border-cta/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/5 border border-brand/10">
                    <seg.icon size={20} className="text-brand" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand">{seg.label}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-4 leading-snug">{seg.headline}</h3>
                <p className="text-ink-light leading-relaxed mb-8">{seg.body}</p>
                <LinkButton href={seg.to} className="mt-auto w-full bg-brand hover:bg-brand-dark">
                  {seg.cta}
                  <ArrowRight size={16} className="ml-2" />
                </LinkButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS — the next step is tiny ══ */}
      <section className="bg-white py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">How It Works</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Hand it off in three small steps.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-cta/20 via-cta/40 to-cta/20" />

            {[
              {
                step: "01",
                time: "~2 minutes",
                title: "Pick your plan",
                desc: "Choose a flat-fee service and check out securely online — or book a free strategy call if you'd rather talk it through first.",
              },
              {
                step: "02",
                time: "~1 hour of your time",
                title: "We take over",
                desc: "Kickoff within one business day. We audit your contract, map the work, and absorb your entire GSA back office. That hour is roughly all we need from you.",
              },
              {
                step: "03",
                time: "14 days or less",
                title: "You approve, we submit",
                desc: "Every mod and update is prepared, quality-checked, and submitted within 14 days — guaranteed. You watch revenue, not portals.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cta text-white shadow-lg shadow-cta/25 mb-6 font-display text-xl font-bold">
                  {item.step}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand mb-2">{item.time}</span>
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 text-center font-display text-lg font-bold text-ink">
            That&apos;s it. We do the rest — all year.
          </p>
        </div>
      </section>

      {/* ══ PROOF BLOCK — dark, numbers repeated ══ */}
      <section className="bg-ink py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_90%,rgba(216,137,58,0.15),transparent)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">The Numbers</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight text-white">
              Proof beats promises.
            </h2>
          </motion.div>

          <StatBar dark className="max-w-4xl mx-auto mb-16" />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Building2,
                label: "Federal-Only Focus",
                detail:
                  "We only do GSA Schedules. That singular focus means we know the portals, the Contracting Officers, and the compliance tripwires better than generalist consultancies.",
              },
              {
                icon: Shield,
                label: "Compliance-First Process",
                detail:
                  "Every workflow is built backwards from GSA's requirements — which is how we keep a 98% approval rate and our clients' schedules off the suspension list.",
              },
              {
                icon: Clock,
                label: "Speed You Can Hold Us To",
                detail:
                  "14-day mod submissions, 45-day MAS submissions, kickoff within one business day. Our guarantees are written into your engagement — not implied.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/20 mb-5">
                  <item.icon className="text-cta" size={22} />
                </div>
                <h4 className="font-display text-xl font-semibold text-white mb-3">{item.label}</h4>
                <p className="text-white/60 leading-relaxed text-sm">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEAD MAGNET — capture the not-ready-yet visitor ══ */}
      <section className="bg-surface py-24 lg:py-28">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <LeadMagnet />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-white py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Straight Answers</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Common Questions</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* ══ GSA NEWS FEED — institutional authority ══ */}
      <GsaNewsFeed />

      {/* ══ FINAL CTA — repeat the offer, the risk reversal, the two paths ══ */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-warm-border p-10 md:p-16 text-center shadow-elevated relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cta/[0.03] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">
                Stop managing your schedule. Start selling on it.
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed mb-10">
                Flat fees, published prices, guaranteed timelines. Pick a plan and we start
                tomorrow — or talk to a specialist first. Either way, the red tape stops being
                your problem.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton href="/order" size="lg" className="shadow-md hover:shadow-lg">
                  Get Started Online
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
                  <Phone size={18} className="mr-2 text-ink-light" />
                  Book a Free Strategy Call
                </LinkButton>
              </div>
              <TrustStrip className="mt-8" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

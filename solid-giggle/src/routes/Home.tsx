import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  Rocket,
  Award,
  Phone,
  Clock,
  BadgeCheck,
  TrendingUp,
  Users,
  Zap,
  Star,
  MessageSquare,
} from "lucide-react";
import { LinkButton } from "../components/Button";
import GsaNewsFeed from "../components/GsaNewsFeed";
import { LINKS } from "../lib/constants";
import SEO, { localBusinessSchema, faqPageSchema, breadcrumbSchema } from "../components/SEO";

const services = [
  {
    icon: Award,
    title: "GSA Schedule Submission",
    tagline: "45-day guarantee. 98% approval rate.",
    description:
      "We prepare and submit your complete GSA MAS offer in 30 days or less. Our \"Holy Trinity\" review — Admin, Technical, and Pricing — catches every issue before the Contracting Officer sees it. Most clients receive their award in 4–6 months.",
    features: ["Eligibility review & SIN selection", "Complete document preparation & eOffer build", "Holy Trinity quality audit", "45-day submission guarantee"],
    hash: "#submission",
  },
  {
    icon: Shield,
    title: "Annual Contract Management",
    tagline: "Hands-off compliance. Cancel anytime.",
    description:
      "Maintaining a GSA Schedule takes 10+ hours a month. We handle every modification, sales report, and compliance deadline so you never risk penalties or contract cancellation. One dedicated account manager. No lock-in.",
    features: ["Monthly/quarterly IFF sales reporting", "All contract modifications (admin, technical, major)", "FCP catalog maintenance & mass mods", "Option year renewal management"],
    hash: "#management",
  },
  {
    icon: Rocket,
    title: "New Vendor Onboarding",
    tagline: "From award to operational in weeks.",
    description:
      "Just got your GSA Schedule? We handle your FCP Catalog Baseline upload, walk you through every GSA platform 1-on-1, and include 90 days of complimentary contract management so nothing falls through the cracks.",
    features: ["Full FCP Catalog Baseline upload", "1-on-1 GSA Advantage, eBuy & FCP training", "Sales reporting walkthrough", "90-day contract management included"],
    hash: "#new-vendor",
  },
  {
    icon: FileText,
    title: "FCP Catalog Baseline",
    tagline: "Meet the 30-day GSA mandate.",
    description:
      "SIP is retired. Without an FCP Baseline Upload, your products are invisible on GSA Advantage — agencies can't find or buy from you. We upload your catalog within the mandated 30-day window and ensure every line item is compliant.",
    features: ["Full FCP Baseline catalog upload", "Product listing & pricing QA", "SIN & product issue resolution", "30-day delivery guarantee"],
    hash: "#fcp",
  },
];

const differentiators = [
  {
    icon: BadgeCheck,
    stat: "98%",
    label: "Approval Rate",
    detail: "Nearly every client we submit gets awarded. Our Holy Trinity review catches CO concerns before submission — that's the difference.",
  },
  {
    icon: Clock,
    stat: "4–6 mo",
    label: "Average Award Time",
    detail: "The industry average is 12+ months. We cut that in half with an accelerated process built on 15+ years of GSA experience.",
  },
  {
    icon: Star,
    stat: "45-Day",
    label: "Submission Guarantee",
    detail: "We commit to preparing your complete GSA MAS offer in 30 days or less, or we work for free until it's done. No other consultant offers this.",
  },
  {
    icon: Users,
    stat: "80+",
    label: "Active Clients",
    detail: "From first-time vendors to established contractors with $50M+ in federal revenue — we manage GSA Schedules across every SIN category.",
  },
];

const homeFaqs = [
  { question: "How long does it take to get a GSA Schedule?", answer: "With our accelerated process, most clients receive their GSA Schedule within 4–6 months. The industry average is 12+ months. We achieve this through our 'Holy Trinity' review that anticipates CO concerns before submission." },
  { question: "What are the minimum qualifications for a GSA MAS Contract?", answer: "You need 2 years of corporate experience, relevant past performance (typically 3–5 projects), and financial viability demonstrated through tax returns and financial statements. Specific requirements vary by SIN category." },
  { question: "What's the difference between MAS and OASIS+?", answer: "MAS (Multiple Award Schedule) is GSA's primary vehicle for commercial products and services. OASIS+ is a specialized IDIQ for professional services requiring complex statements of work. We can help determine which is right for you." },
  { question: "What are the ongoing requirements after GSA award?", answer: "Monthly or quarterly IFF sales reporting via 72A, 0.75% Industrial Funding Fee remittance, SAM & DSBS registration maintenance, FCP catalog pricing updates, contract modifications (admin, technical, and major), mass modification responses, and continued compliance monitoring. Our Contract Management service handles all of this." },
  { question: "Can you help if I already have a GSA Schedule?", answer: "Absolutely. We provide ongoing Contract Management for existing holders — modifications, sales reporting, catalog updates, and compliance support." },
];

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Home() {
  const schema = [
    localBusinessSchema(),
    faqPageSchema(homeFaqs),
    breadcrumbSchema([
      { name: "Home", url: "https://gsamanagers.com/" },
    ]),
  ];

  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <SEO
        title="GSA Schedule Consultants | GSA MAS Contract Assistance | GSA Managers"
        description="Expert GSA Schedule consulting and GSA MAS Contract assistance. We help businesses obtain, manage, and grow their GSA Schedule with 98% approval rate. Submission support, contract management, and compliance services."
        canonical="/"
        keywords={[
          "GSA Schedule",
          "GSA MAS Contract",
          "GSA Schedule consultants",
          "GSA Multiple Award Schedule",
          "GSA contract management",
          "federal contracting",
          "GSA Advantage",
          "GSA submission help",
          "GSA Schedule application",
          "federal contracting help",
          "government contract consultants",
          "SAM.gov registration help",
          "SBA certification help",
          "GSA proposal writing",
          "GSA compliance services",
          "GSA catalog management",
          "GSA FCP upload",
          "GSA modification help",
          "GSA sales reporting",
          "GSA IFF reporting",
          "GSA contract renewal",
          "GSA option year",
          "GSA small business",
          "GSA set-aside",
          "GSA 8(a)",
          "GSA WOSB",
          "GSA SDVOSB",
          "GSA HUBZone",
        ]}
        schema={schema}
        city="Tampa"
        state="Florida"
        geoRegion="US-FL"
        geoPlacename="Tampa, Florida, United States"
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div {...fade} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 border border-cta/20 mb-8">
              <Zap size={14} className="text-cta" />
              <span className="text-xs font-semibold uppercase tracking-wide text-cta">
                98% Approval Rate — 45-Day Submission Guarantee
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Your GSA Schedule —
              <span className="block mt-2 text-cta">
                submitted in 30 days, awarded in months.
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              The industry average is 12+ months. We prepare and submit your complete GSA MAS offer
              in 30 days or less, with a 98% approval rate. After award, we handle compliance so
              your team can focus on selling.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-soft hover:shadow-md transition-shadow">
                See How We Do It
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="bg-white">
                <Phone size={18} className="mr-2 text-ink-light" />
                Free Strategy Call
              </LinkButton>
            </div>
          </motion.div>

          {/* ── HERO TRUST STRIP ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {differentiators.map((item) => (
              <div key={item.label} className="text-center group cursor-default">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <item.icon size={16} className="text-cta" />
                  <div className="font-display text-2xl font-bold text-ink">{item.stat}</div>
                </div>
                <div className="text-sm text-ink-light mt-1">{item.label}</div>
                <div className="text-xs text-ink-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-[180px] mx-auto leading-snug hidden md:block">
                  {item.detail}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">What We Do</p>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
                Four services. One GSA Schedule.
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed">
                Whether you need to get on the Schedule, stay compliant, onboard your team, or fix your catalog —
                pick the service that fits.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LinkButton href="/services/gsa-contractors" variant="secondary" className="bg-surface">
                Full Service Details & Gantt Charts
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
                <Link to={`/services/gsa-contractors${svc.hash}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-warm-border bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-elevated hover:border-cta/40 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cta/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cta/10 border border-cta/20 group-hover:bg-cta group-hover:border-cta transition-all duration-300 mb-7">
                        <svc.icon size={26} className="text-cta group-hover:text-white transition-colors" />
                      </div>

                      <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-cta">{svc.tagline}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-cta transition-colors">
                        {svc.title}
                      </h3>

                      <p className="text-ink-light text-base leading-relaxed mb-8 min-h-[4rem]">{svc.description}</p>

                      <div className="space-y-3 mb-8 pt-6 border-t border-warm-border/60">
                        {svc.features.map((f) => (
                          <div key={f} className="flex items-start gap-3 text-sm text-ink-light font-medium">
                            <CheckCircle2 size={18} className="text-cta shrink-0 mt-0.5" />
                            {f}
                          </div>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-ink group-hover:text-cta transition-colors mt-auto">
                        See timeline & details
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

      {/* ── HOW WE'RE DIFFERENT ── */}
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
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Why We Win</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              What sets our process apart.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "The Holy Trinity Review",
                desc: "Before we submit, your offer goes through three independent reviews — Admin, Technical, and Pricing. Each reviewer looks for what a Contracting Officer would flag. This is why our approval rate is 98%, not 60%.",
              },
              {
                icon: Clock,
                title: "45-Day Submission Guarantee",
                desc: "We commit to preparing your complete GSA MAS offer in 30 days or less. If we miss the deadline, we work for free until it's done. No other GSA consultant offers this.",
              },
              {
                icon: MessageSquare,
                title: "No Black Box Process",
                desc: "Weekly updates, a shared project tracker, and a direct line to your specialist. You always know exactly where your submission stands and what's happening next.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cta/10 border border-cta/15 mb-6">
                  <item.icon size={26} className="text-cta" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GSA NEWS FEED ── */}
      <GsaNewsFeed />

      {/* ── PROCESS ── */}
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
              From zero to GSA Schedule in three phases.
            </h2>
            <p className="mt-6 text-ink-light text-lg">
              A structured, transparent process. No black box. You'll know where you stand every week.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-cta/20 via-cta/40 to-cta/20" />

            {[
              {
                step: "01",
                title: "Readiness & Strategy",
                desc: "We assess your eligibility, identify the right SINs, and build a roadmap tailored to your business. No paperwork starts until we know you'll qualify.",
              },
              {
                step: "02",
                title: "MAS Proposal Execution",
                desc: "Our team writes, assembles, and submits your complete GSA offer — handling every document, pricing narrative, and portal requirement. 30 days, guaranteed.",
              },
              {
                step: "03",
                title: "Award & Compliance",
                desc: "After award, we keep your Schedule healthy — IFF reporting, catalog updates, mods, and option year renewals. You focus on selling; we handle the rest.",
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
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="bg-ink py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_90%,rgba(216,137,58,0.15),transparent)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">By the Numbers</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight text-white">
              15+ years. 80+ clients. One focus.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "80+",
                label: "Active GSA Schedules Managed",
                detail: "From first-time vendors to contractors with $50M+ in federal revenue — across every SIN category.",
              },
              {
                stat: "98%",
                label: "Submission Approval Rate",
                detail: "The industry hovers around 60%. Our Holy Trinity review catches what others miss — that's the 38% difference.",
              },
              {
                stat: "15+",
                label: "Years of GSA Experience",
                detail: "We've been through every GSA policy change, platform migration, and compliance shift. There's no scenario we haven't handled.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm p-8 text-center"
              >
                <div className="font-display text-5xl font-bold text-cta mb-3">{item.stat}</div>
                <h4 className="font-display text-lg font-semibold text-white mb-3">{item.label}</h4>
                <p className="text-white/60 leading-relaxed text-sm">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
                Ready to get on the GSA Schedule?
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed mb-10">
                Let's discuss whether a GSA MAS Contract fits your business. No pitch. No obligation.
                Just a straight assessment from a team that's done this 80+ times.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-md hover:shadow-lg">
                  See the Full Process
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
                  Book a Free Call
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
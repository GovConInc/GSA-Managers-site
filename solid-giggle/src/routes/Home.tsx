import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  Rocket,
  Award,
  Users,
  DollarSign,
} from "lucide-react";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const coreServices = [
  {
    icon: Award,
    title: "GSA Schedule Submissions",
    subtitle: "Starting at $4,500",
    description:
      "Professional GSA MAS Submissions with a guarantee of submission within 45 days. Speak to our specialists to see if you qualify.",
    guarantee: "45-Day Submission Guarantee",
    link: "/enroll",
    cta: "Get Started",
  },
  {
    icon: Shield,
    title: "GSA Contract Management",
    subtitle: "$6,500 / Year",
    description:
      "Annual support including FCP catalog revisions, Major/Minor mods, Mass Mods, eBuy & Advantage! management, recurring expert guidance, and SAM Registration.",
    guarantee: "Full Compliance, Zero Stress",
    link: "/enroll",
    cta: "Learn More",
  },
  {
    icon: Rocket,
    title: "New Vendor Special",
    subtitle: "$1,450 Package",
    description:
      "FCP Catalog Baseline upload within 30 days, specialized 1-on-1 training for all GSA websites and processes, plus complimentary 90-day GSA Contract Management.",
    guarantee: "Comprehensive Onboarding",
    link: "/enroll",
    cta: "Get Started",
  },
  {
    icon: FileText,
    title: "FCP Catalog Baseline",
    subtitle: "Flat $500",
    description:
      "Catalog Baseline upload within the GSA requirement of 30 days. Includes Product Listing & Offer Pricing QA, plus roadmap and technical consultations.",
    guarantee: "Fast, Compliant Upload",
    link: "/enroll",
    cta: "Upload Catalog",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Free Strategy Call",
    description:
      "A no-pressure consultation to map your business to the right GSA path. Honest advice, clear action plan — no sales pitch.",
    icon: Users,
  },
  {
    number: "02",
    title: "Choose Your Service",
    description:
      "Pick the level of support you need — from the $500 FCP Baseline to full-service GSA submission and ongoing management.",
    icon: DollarSign,
  },
  {
    number: "03",
    title: "Get Results",
    description:
      "We do the work, keep you informed, and deliver on our promises. You get a compliant, revenue-ready GSA contract — fast.",
    icon: CheckCircle2,
  },
];

const trustMetrics = [
  {
    stat: "$500",
    label: "FCP Catalog Baseline",
    detail: "The most affordable way to meet the 30-day GSA FCP requirement.",
  },
  {
    stat: "100%",
    label: "Award or No Fee",
    detail: "If we can't get you awarded, you don't pay for full-service submissions.",
  },
  {
    stat: "Zero",
    label: "Long-Term Contracts",
    detail: "No lock-in. Get the help you need, when you need it.",
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          {BRAND.name} — GSA Schedule Experts: Submissions, Management & FCP Uploads
        </title>
        <meta
          name="description"
          content="GSA Schedule submissions, contract management, and FCP Baseline Uploads. Expert help, transparent pricing, and real results."
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl text-navy">
              GSA's don't manage themselves.
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-500 leading-relaxed">
              The websites are frustrating, the processes for simple changes are not as they appear, and ensuring your catalog is properly maintained is critical to your success as a GSA Contractor. We take care of that for you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
              <LinkButton href="/enroll" size="lg">
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                Book a Free Call
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-500">
              Clear options. No hidden fees. No long-term contracts. Just results.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {coreServices.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Card className="p-8 h-full flex flex-col justify-between" hover>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                        <svc.icon size={20} className="text-brand-blue" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                        {svc.subtitle}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <LinkButton href={svc.link} size="sm">
                      {svc.cta}
                      <ArrowRight size={14} className="ml-1.5" />
                    </LinkButton>
                    <span className="text-xs text-slate-400">{svc.guarantee}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Simple & Transparent</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 mb-5">
                  <step.icon size={24} className="text-brand-blue" />
                </div>
                <h4 className="font-display text-lg font-bold text-navy mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST METRICS ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Why GSA Managers?
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-500">
              Transparency, results, and your business first.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {trustMetrics.map((tm, idx) => (
              <motion.div
                key={tm.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 mb-5">
                  <span className="text-xl font-bold text-brand-blue">{tm.stat}</span>
                </div>
                <h4 className="font-display text-lg font-bold text-navy mb-2">
                  {tm.label}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tm.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-navy py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60 text-lg">
            Stop guessing and start winning. Straightforward advice and proven results.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
            <LinkButton href="/enroll" size="lg">
              View Plans & Enroll
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

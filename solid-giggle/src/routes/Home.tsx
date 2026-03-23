import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
import Section from "../components/Section";
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
    link: "/services/gsa",
    cta: "See Submission Service",
  },
  {
    icon: Shield,
    title: "GSA Contract Management",
    subtitle: "$6,500 / Annual Support",
    description:
      "Annual support including FCP catalog revisions, Major/Minor mods, Mass Mods, eBuy & Advantage! management, recurring expert guidance, and SAM Registration.",
    guarantee: "Full Compliance, Zero Stress",
    link: "/services/gsa",
    cta: "Learn About Management",
  },
  {
    icon: Rocket,
    title: "New Vendor Special",
    subtitle: "$1,450 Package",
    description:
      "Includes FCP Catalog Baseline upload within 30 days, specialized 1-1 training for all GSA websites/processes, and complimentary 90-day GSA Contract Management initiation.",
    guarantee: "Comprehensive Onboarding",
    link: "/enroll",
    cta: "Get Started Today",
  },
  {
    icon: FileText,
    title: "FCP Catalog Baseline Only",
    subtitle: "Flat $500",
    description:
      "Catalog Baseline upload within the GSA requirement of 30 days. Includes Product Listing & Offer Pricing QA, plus roadmap and technical consultations throughout.",
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
      "We start with a no-pressure consultation to map your business to the right GSA path. You'll get honest advice and a clear action plan—no sales pitch.",
    icon: Users,
  },
  {
    number: "02",
    title: "Choose Your Service",
    description:
      "Pick the level of support you need: whether it's the $500 FCP Baseline, the New Vendor Special, full-service GSA submission, or ongoing contract management.",
    icon: DollarSign,
  },
  {
    number: "03",
    title: "Get Results, Not Excuses",
    description:
      "We do the work, keep you informed, and deliver on our promises. You get a compliant, revenue-ready GSA contract—fast.",
    icon: CheckCircle2,
  },
];

const trustMetrics = [
  {
    stat: "$500",
    label: "FCP Catalog Baseline",
    detail: "The most affordable, risk-free way to meet the 30-day GSA FCP requirement.",
  },
  {
    stat: "100%",
    label: "Award or No Fee",
    detail: "If we can't get you awarded, you don't pay for full-service submissions.",
  },
  {
    stat: "Zero",
    label: "Long-Term Contracts Required",
    detail: "No lock-in. Get the help you need, when you need it.",
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          {BRAND.name} — GSA Schedule Experts: Submissions, Management, and FCP Baseline Uploads
        </title>
        <meta
          name="description"
          content="GSA Schedule submissions, contract management, and FCP Baseline Uploads. Get expert help, transparent pricing, and real results."
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
      </Helmet>

              {/* ===== HERO ===== */}
              <section className="relative overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute inset-0 bg-grid opacity-20" />

                <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                      GSA's don't manage themselves.
                    </h1>
                    <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
                      The websites are frustrating, the processes for simple changes are not as they appear, and ensuring your catalog is properly maintained is critical to your success as a GSA Contractor. We take care of that for you.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
                      <LinkButton href="/enroll" size="lg">
                        Get Started
                        <ArrowRight size={18} className="ml-2" />
                      </LinkButton>
                      <LinkButton href="/services/gsa" variant="secondary" size="lg">
                        See Full-Service Submission
                      </LinkButton>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* ===== CORE SERVICES ===== */}
              <Section className="bg-blue-50">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-slate-900">
                        Our Core Services
                    </h2>
                    <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                        Three clear options. No hidden fees. No long-term contracts. Just results.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {coreServices.map((svc, idx) => (
                    <motion.div
                      key={svc.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      className="relative"
                    >
                      <Card className="p-8 h-full flex flex-col items-start justify-between" hover>
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <svc.icon size={28} className="text-brand-blue" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                              {svc.subtitle}
                            </span>
                          </div>
                          <h3 className="font-bold text-2xl text-slate-900 mb-2">
                            {svc.title}
                          </h3>
                          <p className="text-slate-600 mb-4">
                            {svc.description}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 w-full">
                          <LinkButton href={svc.link} size="md" className="w-full">
                            {svc.cta}
                          </LinkButton>
                          <span className="text-xs text-slate-400 mt-1">{svc.guarantee}</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Section>

              {/* ===== HOW IT WORKS ===== */}
              <Section
                id="how-it-works"
                title="How It Works"
                kicker="Simple, Transparent, Effective"
                center
              >
                <p className="text-center text-slate-600 max-w-3xl mx-auto mb-16">
                  We make the GSA process easy. No jargon, no runaround—just a clear path to results.
                </p>
                <div className="relative">
                  <div className="grid gap-8 md:grid-cols-3">
                    {howItWorks.map((step, idx) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className="relative"
                      >
                        <Card className="p-8 h-full flex flex-col items-center justify-between text-center" hover>
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                            <step.icon size={32} className="text-blue-600" />
                          </div>
                          <h4 className="font-bold text-lg text-slate-900 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-slate-600 mb-4">
                            {step.description}
                          </p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Section>

              {/* ===== TRUST METRICS ===== */}
              <Section className="bg-white">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-slate-900">
                        Why Choose GSA Managers?
                    </h2>
                    <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                        We believe in transparency, results, and putting your business first. Here’s what sets us apart.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {trustMetrics.map((tm, idx) => (
                    <motion.div
                      key={tm.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      className="relative"
                    >
                      <Card className="p-8 h-full flex flex-col items-center justify-between text-center" hover={false}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                          <span className="text-2xl font-bold text-blue-600">{tm.stat}</span>
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 mb-2">
                          {tm.label}
                        </h4>
                        <p className="text-slate-600 mb-4">
                          {tm.detail}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Section>
            </>
          );
        }

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
    icon: Rocket,
    title: "New Contractor Special",
    subtitle: "$999 FCP Baseline Upload & Training",
    description:
      "Get your GSA Schedule journey started for just $999. We upload your catalog to the FAS Catalog Platform (FCP) and provide live training so you can manage your contract with confidence. Perfect for new contractors who want a simple, affordable entry point.",
    guarantee: "Flat $999, No Surprises",
    link: "/enroll",
    cta: "Get Started for $999",
  },
  {
    icon: Award,
    title: "GSA Schedule Submissions",
    subtitle: "Full-Service Application & Award",
    description:
      "We handle your entire GSA MAS application from start to finish: eligibility, document prep, eOffer, negotiations, and award. No guesswork, no wasted time—just a proven path to getting on schedule.",
    guarantee: "Award or No Fee",
    link: "/services/gsa",
    cta: "See Submission Service",
  },
  {
    icon: Shield,
    title: "GSA MAS Contract Management",
    subtitle: "Ongoing Compliance & Support",
    description:
      "Stay compliant and maximize your contract value. We manage modifications, quarterly sales reporting, mass mods, and keep your catalog up to date so you never risk suspension.",
    guarantee: "Full Compliance, Zero Stress",
    link: "/services/gsa",
    cta: "Learn About Management",
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
      "Pick the level of support you need: the $999 FCP Baseline Upload, full-service GSA submission, or ongoing contract management. We make it easy to get exactly what you need, nothing you don't.",
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
    stat: "$999",
    label: "New Contractor Special",
    detail: "The most affordable, risk-free way to get started on the GSA Schedule.",
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
          {BRAND.name} — Unlock Federal Sales with the FCP Baseline Package
        </title>
        <meta
          name="description"
          content="The FCP Baseline Package is the fastest way to get on the GSA Schedule. We offer guaranteed GSA applications, FCP catalog management, and ongoing compliance."
        />
        export default function Home() {
          return (
            <>
              <Helmet>
                <title>
                  {BRAND.name} — GSA Schedule Experts: Submissions, Management, and $999 New Contractor Special
                </title>
                <meta
                  name="description"
                  content="GSA Schedule submissions, contract management, and the $999 FCP Baseline Upload & Training. Get expert help, transparent pricing, and real results."
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
                      GSA Schedules. No Confusion. No Overpriced Fees.
                    </h1>
                    <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
                      Get on the GSA Schedule, stay compliant, and grow your federal business. Choose the service you need—no upsells, no pressure, just honest expert help.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
                      <LinkButton href="/enroll" size="lg">
                        Get Started for $999
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
              <Section className="bg-slate-50">
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
                            <svc.icon size={28} className="text-blue-600" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
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
          Whether you're aiming for your first federal contract or are an established GSA holder needing expert support, we have a service designed for your specific needs.
        </p>

        <div className="grid gap-8 lg:grid-cols-3 mx-auto max-w-6xl">
          {coreServices.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 h-full border-2 mx-auto max-w-md flex flex-col" hover>
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-14 w-14 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                      <program.icon size={28} />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        {program.guarantee}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {program.title}
                  </h3>
                  <div className="text-sm font-semibold text-blue-600 mb-3">
                    {program.subtitle}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="mt-6">
                    <LinkButton
                        href={program.link}
                        variant={idx === 0 ? 'primary' : 'secondary'}
                        className="w-full"
                    >
                        {program.cta}
                        <ArrowRight size={16} className="ml-2"/>
                    </LinkButton>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* ===== FINAL CTA ===== */}
      <Section title="Ready to Win Government Contracts?" kicker="Take the Next Step">
        <Card
          className="p-8 lg:p-12 bg-white/10 border-white/20"
          hover={false}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                Book Your Free GSA Strategy Call
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                In a free, 15-minute call, we'll assess your company's GSA eligibility and show you exactly how the FCP Baseline Package can unlock your path to the federal marketplace.
              </p>
              <ul className="space-y-3">
                {(
                  [
                    "Confirm your GSA eligibility",
                    "Get a personalized FCP roadmap",
                    "Receive a clear, flat-rate quote",
                    "No obligation, no pressure",
                  ]
                ).map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white"
                  >
                    <CheckCircle2
                      className="text-amber-400 shrink-0"
                      size={20}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-8">
              <Card className="p-8 bg-white text-center">
                <div className="text-4xl mb-2">📞</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  Schedule Your Call
                </h4>
                <p className="text-slate-600 mb-6">
                  Secure your spot now. Find out if the GSA Schedule is right for you.
                </p>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="w-full"
                >
                  Find a Time
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <p className="mt-4 text-xs text-slate-500">
                  {BRAND.name} — a DBA of {BRAND.founder}
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  Rocket,
  TrendingUp,
  Database,
  Zap,
  Award,
  Users,
  BarChart3,
} from "lucide-react";
import Section from "../components/Section";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const coreServices = [
  {
    icon: Rocket,
    title: "FCP Baseline Package",
    subtitle: "For New Contractors",
    description:
      "Our all-in-one package to get you on the GSA Schedule. We handle the entire application, FCP catalog setup, and negotiations until you are awarded.",
    guarantee: "Guaranteed Award or Full Refund",
    link: "/services/gsa",
    cta: "Start Your Application",
  },
  {
    icon: Database,
    title: "FCP Catalog Management",
    subtitle: "For Existing Contractors",
    description:
      "Full management of your catalog on the FAS Catalog Platform (FCP). We handle migrations, updates, and modifications to ensure you stay compliant and visible.",
    guarantee: "Guaranteed Compliance",
    link: "/services/gsa",
    cta: "Manage My Catalog",
  },
  {
    icon: Shield,
    title: "Ongoing Compliance",
    subtitle: "Retained Monthly Support",
    description:
      "Comprehensive support to manage your GSA contract, including sales reporting, modifications, and proactive compliance monitoring.",
    guarantee: "Full Compliance Coverage",
    link: "/services/gsa",
    cta: "Learn About Management",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Strategy Call & Document Review",
    description:
      "We start with a free consultation to assess your eligibility and create a customized roadmap. Then, we guide you through gathering all necessary documents.",
    icon: Users,
  },
  {
    number: "02",
    title: "Application & FCP Catalog Build",
    description:
      "Our team prepares and perfects your GSA application and builds your product/service catalog on the new FCP, ensuring 100% compliance before submission.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Negotiation & GSA Award",
    description:
      "We handle all communications and negotiations with your GSA Contracting Officer. We don't stop until you receive your official GSA Schedule award.",
    icon: Award,
  },
];

const trustMetrics = [
  {
    stat: "99%",
    label: "GSA Approval Rate",
    detail: "Our meticulous process ensures your application is right the first time.",
  },
  {
    stat: "15+",
    label: "Years of GSA Experience",
    detail: "We've successfully navigated every change in GSA policy.",
  },
  {
    stat: "$640M",
    label: "Largest Contract Win",
    detail: "We have experience supporting high-value, complex federal proposals.",
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
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-700 border border-slate-200">
              <Zap size={14} className="text-amber-500" />
              The New Standard for GSA Schedule Awards
            </div>

            <h1 className="mt-6 font-display text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-tight">
              Unlock Federal Sales with the FCP Baseline Package
            </h1>

            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Stop guessing. Our guaranteed, all-in-one package handles your entire GSA application and the new FCP catalog setup. Get awarded faster and start selling to the world's largest customer.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
              >
                Book Your Free Strategy Call
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton href="#how-it-works" variant="secondary" size="lg">
                See How It Works
              </LinkButton>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-x-8 gap-y-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500"/>
                    Guaranteed GSA Award
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500"/>
                    FCP Catalog Included
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500"/>
                    Expert-Led Process
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <Section
        id="how-it-works"
        title="Your 3-Step Path to a GSA Schedule Award"
        kicker="How It Works"
        center
      >
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-16">
          The FCP Baseline Package simplifies the complex GSA application process into a clear, managed timeline. We do the heavy lifting so you can focus on your business.
        </p>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-3">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative z-10 text-center"
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center ring-8 ring-slate-50 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs">
                      STEP {idx + 1}
                    </div>
                    <step.icon size={32} className="text-blue-600" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* ===== TRUST & SOCIAL PROOF ===== */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-amber-400">
                        A Partner You Can Trust
                    </p>
                    <h2 className="mt-4 font-display text-4xl font-bold text-white">
                        We Don't Just Submit Applications. We Secure Awards.
                    </h2>
                    <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                        Getting a GSA Schedule is a strategic investment. Our expertise de-risks the entire process, saving you time and positioning you for long-term federal success. We've been the trusted partner for hundreds of businesses, from small startups to large enterprises.
                    </p>
                     <div className="mt-8">
                        <LinkButton
                            href="/about"
                            variant="secondary"
                        >
                            More About Our Experience
                        </LinkButton>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {trustMetrics.slice(0, 2).map((metric) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <Card className="p-6 bg-white/10 border-white/20 h-full">
                                <div className="text-amber-400 font-display text-6xl font-bold">{metric.stat}</div>
                                <h3 className="mt-2 text-xl font-bold text-white">{metric.label}</h3>
                                <p className="mt-2 text-slate-300">{metric.detail}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <Section
        title="Solutions for Every Stage of Your GSA Journey"
        kicker="Our Services"
        center
      >
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">
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

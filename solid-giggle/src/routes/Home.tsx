import { Helmet } from "react-helmet-async";
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
} from "lucide-react";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const services = [
  {
    icon: Award,
    title: "GSA MAS Submission",
    price: "Starting at $4,995",
    description:
      "Full-service GSA Schedule submission with a 45-day submission guarantee. From document prep to eOffer portal — we handle everything.",
    features: ["45-day submission guarantee", "98% approval rate", "Complete document prep", "eOffer portal management"],
    hash: "#submission",
    accent: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Annual Contract Management",
    price: "Starting at $4,995 / yr",
    description:
      "Hands-off compliance. We handle sales reporting, catalog management, modifications, and audits — so you never risk penalties.",
    features: ["Full compliance coverage", "Dedicated account manager", "Quarterly reporting", "Modification handling"],
    hash: "#management",
    accent: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Rocket,
    title: "New Vendor Special",
    price: "$1,450",
    description:
      "The fast-start package: FCP upload, 1-on-1 GSA training, and 90 days of complimentary contract management to get you running.",
    features: ["FCP Catalog upload", "1-on-1 GSA training", "Process onboarding", "90-day management included"],
    hash: "#new-vendor",
    accent: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-violet-50 text-violet-600",
  },
  {
    icon: FileText,
    title: "FCP Catalog Baseline",
    price: "$500",
    description:
      "Catalog upload within the GSA-mandated 30-day window. Product listing QA, pricing review, and roadmap consultations included.",
    features: ["30-day delivery", "Product listing QA", "Pricing review", "Roadmap consultation"],
    hash: "#fcp",
    accent: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-50 text-amber-600",
  },
];

const stats = [
  { value: "98%", label: "Approval Rate" },
  { value: "4-6mo", label: "Avg. Time to Award" },
  { value: "80+", label: "Active Clients" },
  { value: "Zero", label: "Long-Term Contracts" },
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
      <section className="relative overflow-hidden gradient-mesh">
        <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-4">
                GSA Schedule Consulting
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-navy">
                Your GSA contract,{" "}
                <span className="text-brand-blue">handled.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                The websites are frustrating. The processes are opaque. Keeping your catalog compliant is critical. We take care of all of it — so you can focus on winning contracts.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/services/gsa-contractors" size="lg">
                  Explore Services
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                  <Phone size={16} className="mr-2" />
                  Book a Free Call
                </LinkButton>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-sm p-6 text-center shadow-card"
                >
                  <div className="font-display text-3xl font-bold text-navy">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-500 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              What We Do
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              Four services. Zero guesswork.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-500">
              Each links to a detailed breakdown with timelines, deliverables, and pricing.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
              >
                <Link
                  to={`/services/gsa-contractors${svc.hash}`}
                  className="group block h-full"
                >
                  <div className={`relative h-full rounded-2xl border border-slate-100 bg-gradient-to-br ${svc.accent} p-8 transition-all duration-300 hover:shadow-elevated hover:border-slate-200`}>
                    {/* Icon + Price */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${svc.iconBg}`}>
                        <svc.icon size={20} />
                      </div>
                      <span className="text-sm font-bold text-navy/70">{svc.price}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-navy mb-2 group-hover:text-brand-blue transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {svc.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={14} className="text-brand-blue shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:gap-3 transition-all">
                      View details
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Simple Process
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              Three steps to results
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Free Strategy Call",
                desc: "A no-pressure consultation to map your business to the right GSA path. Honest advice — no sales pitch.",
              },
              {
                step: "02",
                title: "Choose Your Service",
                desc: "Pick the level of support you need — from the $500 FCP Baseline to full-service submission and management.",
              },
              {
                step: "03",
                title: "We Deliver",
                desc: "We do the work, keep you informed, and deliver on our promises. You get a compliant, revenue-ready GSA contract.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className="relative"
              >
                <div className="text-[4.5rem] font-display font-bold text-slate-100 leading-none select-none">
                  {item.step}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {[
              { stat: "$500", label: "FCP Catalog Baseline", detail: "The most affordable way to meet the 30-day FCP requirement." },
              { stat: "100%", label: "Award or No Fee", detail: "If we can't get you awarded, you don't pay for full-service submissions." },
              { stat: "Zero", label: "Long-Term Contracts", detail: "No lock-in. Cancel anytime. Just results." },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
              >
                <div className="font-display text-3xl font-bold text-brand-blue">{item.stat}</div>
                <h4 className="mt-2 font-display text-lg font-bold text-navy">{item.label}</h4>
                <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 gradient-mesh-dark">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-white/50 text-lg">
              Stop guessing and start winning. Straightforward advice, proven results.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
              <LinkButton href="/services/gsa-contractors" size="lg">
                View Services
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="ghost"
                className="text-white border border-white/20 hover:bg-white/10"
              >
                Schedule a Free Call
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

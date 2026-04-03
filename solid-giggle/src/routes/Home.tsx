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
  BarChart3,
  Clock,
  Users
} from "lucide-react";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

/* ─── SERVICE DATA ─── */
const services = [
  {
    icon: Award,
    title: "GSA MAS Submission",
    price: "Starting at $4,995",
    description:
      "Full-service GSA Schedule submission — document prep, eOffer portal, Holy Trinity review — with a 45-day submission guarantee.",
    features: ["45-day submission guarantee", "98% approval rate", "Complete document prep"],
    hash: "#submission",
  },
  {
    icon: Shield,
    title: "Annual Contract Management",
    price: "Starting at $4,995 / yr",
    description:
      "Sales reporting, catalog management, modifications, and compliance monitoring. One dedicated account manager. Cancel anytime.",
    features: ["Full compliance coverage", "Dedicated account manager", "No lock-in"],
    hash: "#management",
  },
  {
    icon: Rocket,
    title: "New Vendor Special",
    price: "$1,450",
    description:
      "FCP upload, 1-on-1 platform training, and 90 days of complimentary contract management to get you operational fast.",
    features: ["FCP upload included", "1-on-1 training", "90-day management"],
    hash: "#new-vendor",
  },
  {
    icon: FileText,
    title: "FCP Catalog Baseline",
    price: "$499",
    description:
      "Catalog upload within the GSA-mandated 30-day window. Product listing QA, pricing review, and compliance check included.",
    features: ["30-day delivery", "Pricing QA", "Compliance review"],
    hash: "#fcp",
  },
];

const metrics = [
  { icon: CheckCircle2, value: "98%", label: "Approval Rate" },
  { icon: Clock, value: "4–6 mo", label: "Avg. Award Time" },
  { icon: Users, value: "80+", label: "Active Clients" },
];

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>{BRAND.name} — GSA Schedule Submissions, Management & FCP Uploads</title>
        <meta
          name="description"
          content="GSA Schedule submissions starting at $4,995. Contract management, FCP Baseline uploads, and new vendor onboarding. Transparent pricing, real results."
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
      </Helmet>

      {/* ──────── HERO ──────── */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-warm-100 via-surface to-surface -z-10" />
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none -z-10">
          <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-border"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-warm-border shadow-sm mb-8">
                <span className="flex h-2 w-2 rounded-full bg-cta"></span>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-light">
                  Expert GSA Consulting
                </span>
              </div>
              
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
                Navigate federal procurement <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cta">with confidence.</span>
              </h1>
              
              <p className="mt-6 text-lg sm:text-xl text-ink-light leading-relaxed max-w-xl">
                The websites are frustrating. The processes are opaque. Keeping your catalog compliant is critical.
                We handle the red tape so you can focus on winning contracts.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-soft hover:shadow-md transition-shadow">
                  Explore Our Services
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="bg-white">
                  <Phone size={18} className="mr-2 text-ink-light" />
                  Book a Free Strategy Call
                </LinkButton>
              </div>
            </motion.div>

            {/* Metrics feature box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-warm-border/50 to-transparent rounded-3xl -m-4 -z-10" />
              <div className="bg-white rounded-2xl border border-warm-border shadow-elevated overflow-hidden">
                <div className="bg-ink px-8 py-5 flex items-center justify-between">
                  <h3 className="text-white font-medium">Proven Results</h3>
                  <BarChart3 className="text-brand-light" size={20} />
                </div>
                <div className="p-8">
                  <div className="space-y-8">
                    {metrics.map((m, idx) => (
                      <div key={m.label} className="flex items-center gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warm-100">
                          <m.icon size={24} className="text-brand" />
                        </div>
                        <div>
                          <div className="font-display text-3xl font-bold text-ink">{m.value}</div>
                          <div className="text-sm font-medium text-ink-light mt-0.5">{m.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile metrics */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-warm-border pt-10"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl font-bold text-ink">{m.value}</div>
                <div className="mt-1 text-sm font-medium text-ink-light">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────── SERVICES ──────── */}
      <section className="bg-white py-24 lg:py-32 border-t border-warm-border">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
                Four core services.<br className="hidden sm:block"/> Zero guesswork.
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed">
                Clear deliverables, transparent pricing, and expert guidance at every step of your GSA journey.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
               <LinkButton href="/services/gsa-contractors" variant="secondary" className="bg-surface">
                Compare All Services
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
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/services/gsa-contractors${svc.hash}`}
                  className="group block h-full"
                >
                  <div className="h-full rounded-2xl border border-warm-border bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-elevated hover:border-brand/30 hover:-translate-y-1 relative overflow-hidden">
                    {/* Hover gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface border border-warm-border shadow-sm group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors">
                          <svc.icon size={26} className="text-ink group-hover:text-white transition-colors" />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-warm-100 text-sm font-semibold text-ink-light border border-warm-border">
                          {svc.price}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-brand transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-ink-light text-base leading-relaxed mb-8 min-h-[4rem]">
                        {svc.description}
                      </p>

                      <div className="space-y-3 mb-8 pt-6 border-t border-warm-border">
                        {svc.features.map((f) => (
                          <div key={f} className="flex items-start gap-3 text-sm text-ink-light font-medium">
                            <CheckCircle2 size={18} className="text-cta shrink-0 mt-0.5" />
                            {f}
                          </div>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-ink group-hover:text-brand transition-colors mt-auto">
                        View details
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

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="bg-surface py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Three steps to guaranteed results.
            </h2>
            <p className="mt-4 text-ink-light text-lg">
              We've refined our process to be as efficient and transparent as possible.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-warm-border border-dashed border-t-2" />
            
            {[
              {
                step: "01",
                title: "Strategy Session",
                desc: "A no-pressure consultation to map your business to the right GSA path. Honest advice, clear action plan.",
              },
              {
                step: "02",
                title: "Select Service",
                desc: "Pick the level of support you need — from our $500 FCP Baseline up to full-service submission and management.",
              },
              {
                step: "03",
                title: "Execution",
                desc: "We do the heavy lifting, keep you informed, and deliver on our promises. Compliant, revenue-ready, and fast.",
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border-2 border-warm-border shadow-sm mb-6 font-display text-xl font-bold text-brand">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">
                  {item.title}
                </h3>
                <p className="text-ink-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── TRUST STRIP ──────── */}
      <section className="bg-ink py-20 text-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { stat: "$500", label: "FCP Catalog Baseline", detail: "The most affordable way to meet the 30-day requirement." },
              { stat: "100%", label: "Award or No Fee", detail: "If we can't get you awarded, you don't pay for submissions." },
              { stat: "Zero", label: "Long-Term Lock-in", detail: "No restrictive contracts. Cancel anytime. Just results." },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="pt-8 md:pt-0 md:px-8 first:pt-0 first:md:pl-0 last:md:pr-0 text-center md:text-left"
              >
                <div className="font-display text-4xl font-bold text-brand-light mb-2">{item.stat}</div>
                <h4 className="font-display text-xl font-semibold text-white mb-2">{item.label}</h4>
                <p className="text-white/60 leading-relaxed text-sm">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA ──────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-surface border border-warm-border p-10 md:p-16 text-center shadow-elevated relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <Shield size={160} />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">
                Ready to optimize your <br className="hidden sm:block"/> GSA Schedule?
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed mb-10">
                Stop guessing and start winning. Get straightforward advice and proven results from experienced GSA consultants.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton
                  href="/services/gsa-contractors"
                  size="lg"
                  className="shadow-md hover:shadow-lg transition-shadow"
                >
                  View Our Services
                </LinkButton>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  variant="secondary"
                  className="bg-white"
                >
                  Schedule a Free Call
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


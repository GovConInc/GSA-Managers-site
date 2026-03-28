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
    price: "$500",
    description:
      "Catalog upload within the GSA-mandated 30-day window. Product listing QA, pricing review, and compliance check included.",
    features: ["30-day delivery", "Pricing QA", "Compliance review"],
    hash: "#fcp",
  },
];

const metrics = [
  { value: "98%", label: "Approval Rate" },
  { value: "4–6 mo", label: "Avg. Award Time" },
  { value: "80+", label: "Active Clients" },
];

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{BRAND.name} — GSA Schedule Submissions, Management & FCP Uploads</title>
        <meta
          name="description"
          content="GSA Schedule submissions starting at $4,995. Contract management, FCP Baseline uploads, and new vendor onboarding. Transparent pricing, real results."
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
      </Helmet>

      {/* ──────── HERO ──────── */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-24 lg:px-8 lg:pt-32 lg:pb-36">
          <motion.div {...fade} transition={{ duration: 0.5 }} className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-cta mb-5">
              GSA Schedule Consulting
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.1] text-ink">
              Navigate federal procurement with confidence.
            </h1>
            <p className="mt-6 text-lg text-ink-light leading-relaxed max-w-2xl">
              The websites are frustrating. The processes are opaque. Keeping your catalog compliant is critical.
              We take care of all of it — so you can focus on winning contracts.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton href="/services/gsa-contractors" size="lg">
                Explore Services
                <ArrowRight size={16} className="ml-2" />
              </LinkButton>
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                <Phone size={15} className="mr-2" />
                Book a Free Call
              </LinkButton>
            </div>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-16 flex flex-wrap gap-12 border-t border-warm-border pt-10"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl font-semibold text-ink">{m.value}</div>
                <div className="mt-1 text-sm text-ink-muted">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────── SERVICES ──────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fade}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-cta mb-3">
              What We Do
            </p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl leading-tight">
              Four services. Zero guesswork.
            </h2>
            <p className="mt-4 text-ink-light text-lg leading-relaxed">
              Each links to a detailed breakdown with timelines, deliverables, and pricing.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
              >
                <Link
                  to={`/services/gsa-contractors${svc.hash}`}
                  className="group block h-full"
                >
                  <div className="h-full rounded-xl border border-warm-border bg-white p-8 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                        <svc.icon size={20} className="text-ink-light" />
                      </div>
                      <span className="text-sm font-medium text-ink-muted">{svc.price}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-ink mb-2 group-hover:text-navy transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-ink-light leading-relaxed mb-6">
                      {svc.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm text-ink-light">
                          <CheckCircle2 size={15} className="text-navy shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-navy group-hover:gap-3 transition-all">
                      View details
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-cta mb-3">
              Simple Process
            </p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl leading-tight">
              Three steps to results.
            </h2>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Free Strategy Call",
                desc: "A no-pressure consultation to map your business to the right GSA path. Honest advice, clear action plan.",
              },
              {
                step: "02",
                title: "Choose Your Service",
                desc: "Pick the level of support you need — from the $500 FCP Baseline to full-service submission and management.",
              },
              {
                step: "03",
                title: "We Deliver",
                desc: "We do the work, keep you informed, and deliver on our promises. Compliant, revenue-ready, fast.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
              >
                <div className="font-display text-5xl font-semibold text-warm-border leading-none select-none mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-3">
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
      <section className="bg-white py-20 border-y border-warm-border">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { stat: "$500", label: "FCP Catalog Baseline", detail: "The most affordable way to meet the 30-day FCP requirement." },
              { stat: "100%", label: "Award or No Fee", detail: "If we can't get you awarded, you don't pay for full-service submissions." },
              { stat: "Zero", label: "Long-Term Contracts", detail: "No lock-in. Cancel anytime. Just results." },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
              >
                <div className="font-display text-3xl font-semibold text-navy">{item.stat}</div>
                <h4 className="mt-2 font-display text-lg font-semibold text-ink">{item.label}</h4>
                <p className="mt-2 text-ink-light leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA ──────── */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl leading-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-white/50 text-lg leading-relaxed">
              Stop guessing and start winning. Straightforward advice, proven results.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton
                href="/services/gsa-contractors"
                size="lg"
                className="bg-white text-ink hover:bg-white/90"
              >
                View Services
                <ArrowRight size={16} className="ml-2" />
              </LinkButton>
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="ghost"
                className="text-white/70 border border-white/20 hover:text-white hover:bg-white/10"
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

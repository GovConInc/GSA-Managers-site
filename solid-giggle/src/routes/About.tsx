import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Target, Users, Award, Zap } from "lucide-react";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const values = [
  {
    icon: Target,
    title: "GSA Focused",
    description: "We only do GSA Schedules. No IT consulting, no staffing, no other contracts — just the MAS program.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "You work directly with a dedicated account manager — not a call center, not a junior associate rotating off your account.",
  },
  {
    icon: Award,
    title: "Transparent Pricing",
    description: "Every price is published on our site. Flat fees, no hourly billing, no lock-in. You know the cost before you talk to anyone.",
  },
  {
    icon: Zap,
    title: "Fast Results",
    description: "14-day mod submissions, 45-day schedule submissions, weekly status updates. Guaranteed timelines, not estimates.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About {BRAND.name} — GSA Schedule Experts</title>
        <meta name="description" content="Learn about GSA Managers Inc., our story, our values, and the expert team dedicated to helping you succeed with GSA contracts." />
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-4">About Us</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            We manage GSA Schedules. That's all we do.
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg text-ink-light leading-relaxed">
            500+ schedules managed across IT, professional services, manufacturing, and construction. 98% approval rate. 15+ years doing nothing but GSA.
          </p>
        </div>
      </section>

      {/* Story + Stats */}
      <section className="bg-surface py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Our Story</p>
              <h2 className="font-display text-3xl font-bold text-ink mb-6">
                How we got here
              </h2>
              <div className="space-y-4 text-ink-light leading-relaxed">
                <p>
                  {BRAND.name} started in {BRAND.location} because the same problem kept showing up: companies win a GSA Schedule, then have no one to maintain it. Mods pile up. IFF reports get missed. Catalogs go stale on GSA Advantage. Eventually, the contract is at risk.
                </p>
                <p>
                  We built a practice around fixing that. We know the GSA portals, the Contracting Officer expectations, and the compliance deadlines — because that's all we work on. When GSA shifts the rules (FCP migration, mass mods, new reporting cycles), we've already adjusted.
                </p>
                <p>
                  Our founder, {BRAND.founder}, has managed GSA contracts across IT, professional services, manufacturing, and construction. That cross-industry experience is why our process works regardless of your SIN category.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {([
                { value: "15+", label: "Years in Federal Contracting" },
                { value: "98%", label: "Approval Rate" },
                { value: "$640M", label: "Largest Win Supported" },
                { value: "500+", label: "Schedules Managed" },
              ]).map((stat) => (
                <Card key={stat.label} className="p-6 text-center" hover>
                  <div className="font-display text-3xl font-bold text-cta">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-ink-light">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">How We Operate</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">What you can expect</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full text-center" hover>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cta/10">
                    <value.icon size={22} className="text-cta" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm text-ink-light">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_90%,rgba(216,137,58,0.12),transparent)]" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Have questions? Let's talk.
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            15-minute call. We'll tell you exactly what your schedule needs and what it costs. No obligation.
          </p>
          <div className="mt-10">
            <LinkButton href={LINKS.booking} size="lg" target="_blank" rel="noreferrer">
              Schedule a Free Consultation
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

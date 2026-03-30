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
    description: "We only do GSA Schedules. No distractions, no generic consulting — just deep expertise in what matters to you.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "You work directly with an expert, not a call center or junior staff. Every client gets white-glove support.",
  },
  {
    icon: Award,
    title: "Transparent Pricing",
    description: "No hidden fees, no long-term contracts. You always know exactly what you're getting and what it costs.",
  },
  {
    icon: Zap,
    title: "Fast Results",
    description: "We move quickly, communicate clearly, and deliver on our promises. Your time is valuable — we respect it.",
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
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">About Us</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">
            Federal Strategists, Not Just Consultants.
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-500 leading-relaxed">
            The GSA Schedule is a powerful tool, but it's worthless if left to gather dust. We transform your schedule from a compliance checkbox into your most powerful federal revenue engine.
          </p>
        </div>
      </section>

      {/* Story + Stats */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Our Story</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand">
                Founded on a Singular Focus
              </h2>
              <div className="mt-6 space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Based in {BRAND.location}, {BRAND.name} was built to solve one problem: too many companies struggle to manage their GSA Schedule effectively. This singular focus means we know the GSA portal, the contracting officers, and the compliance pitfalls better than anyone.
                </p>
                <p>
                  The federal landscape is always shifting — FCP transitions, Mass Mods, new reporting requirements. We handle this complexity, keeping your schedule clean, your catalog current, and your contract ready for opportunities.
                </p>
                <p>
                  Our founder, {BRAND.founder}, has guided companies across dozens of industries through the entire GSA lifecycle. That hands-on experience is the foundation of our process and the core of our guaranteed results.
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
                { value: "15+", label: "Years Experience" },
                { value: "99%", label: "Approval Rate" },
                { value: "$640M", label: "Largest Win Supported" },
                { value: "500+", label: "Schedules Managed" },
              ]).map((stat) => (
                <Card key={stat.label} className="p-6 text-center" hover>
                  <div className="font-display text-3xl font-bold text-brand-blue">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">What We Believe</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand sm:text-4xl">Our Core Values</h2>
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
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
                    <value.icon size={22} className="text-brand-blue" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Let's Talk About Your GSA Strategy
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Stop guessing and start winning. We offer straightforward advice and proven results.
          </p>
          <div className="mt-8">
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

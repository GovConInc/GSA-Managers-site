import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Target, Users, Award, Zap } from "lucide-react";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const values = [
  {
    icon: Target,
    title: "GSA Only",
    description: "We don't dabble in everything. GSA Schedules are all we do, which means we know the system inside and out.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description: "You work with a real expert, not a call center. Every client gets hands-on, personalized support.",
  },
  {
    icon: Award,
    title: "No Surprises",
    description: "Clear pricing, no hidden fees, no long-term contracts. You know exactly what you're getting.",
  },
  {
    icon: Zap,
    title: "We Move Fast",
    description: "We communicate clearly, deliver on time, and don't waste your time. Simple as that.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — {BRAND.name}</title>
        <meta name="description" content="Learn about GSA Managers Inc. and the team dedicated to helping you succeed with GSA contracts." />
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">About Us</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            We Know GSA. That's All We Do.
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-500 leading-relaxed">
            A GSA Schedule is only valuable if someone is actively managing it. We turn your schedule from a
            dusty checkbox into your biggest source of federal revenue.
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
              <h2 className="mt-3 font-display text-3xl font-bold text-navy">
                Built on One Idea
              </h2>
              <div className="mt-6 space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Based in {BRAND.location}, {BRAND.name} was started because too many companies were struggling
                  with their GSA Schedules. The portals are confusing, the rules keep changing, and most
                  consultants try to do too much instead of doing one thing well.
                </p>
                <p>
                  We decided to focus on GSA and nothing else. That means we know the portals, we know the
                  contracting officers, and we know exactly what trips people up — from FCP transitions to Mass
                  Mods to quarterly reporting.
                </p>
                <p>
                  Our founder, {BRAND.founder}, has helped companies across dozens of industries through every
                  stage of the GSA lifecycle. That hands-on experience is the backbone of everything we do.
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
                { value: "98%", label: "Approval Rate" },
                { value: "500+", label: "Schedules Managed" },
                { value: "80+", label: "Active Clients" },
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
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">How We Work</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">What We Stand For</h2>
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
                  <h3 className="mt-4 text-lg font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Let's Talk About Your GSA Goals
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Honest advice, clear next steps, zero pressure.
          </p>
          <div className="mt-8">
            <LinkButton href={LINKS.booking} size="lg" target="_blank" rel="noreferrer">
              Book a Free Call
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

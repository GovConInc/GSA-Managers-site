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
  Users,
  Heart,
  Sparkles,
} from "lucide-react";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const services = [
  {
    icon: Award,
    title: "GSA MAS Submission",
    description:
      "End-to-end support for your schedule submission including strategy, documents, and portal delivery with a clear timeline.",
    features: ["Document prep and review", "Submission guidance", "Clear weekly progress updates"],
    hash: "#submission",
  },
  {
    icon: Shield,
    title: "Annual Contract Management",
    description:
      "Ongoing support to keep your contract healthy, compliant, and positioned for growth year-round.",
    features: ["Compliance monitoring", "Catalog updates", "Dedicated account support"],
    hash: "#management",
  },
  {
    icon: Rocket,
    title: "New Vendor Support",
    description:
      "Structured onboarding for first-time vendors so your team can get operational with confidence.",
    features: ["Platform training", "Launch roadmap", "Hands-on onboarding"],
    hash: "#new-vendor",
  },
  {
    icon: FileText,
    title: "FCP Catalog Setup",
    description:
      "Accurate catalog setup and validation to help you meet requirements and avoid preventable delays.",
    features: ["Catalog formatting", "Pricing QA", "Compliance-focused checks"],
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
        <title>{BRAND.name} — GSA Schedule Guidance & Contract Support</title>
        <meta
          name="description"
          content="Warm, expert guidance for GSA Schedule submissions, contract management, and catalog support. Practical help from a trusted team."
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
      </Helmet>

      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#FFE8CC] via-surface to-[#F7F0E8]" />
        <div className="absolute inset-y-0 right-0 w-1/2 -z-10 bg-[radial-gradient(circle_at_center,_rgba(16,58,122,0.12),transparent_70%)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-warm-border shadow-sm mb-8">
                <Heart size={14} className="text-cta" />
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-light">
                  A friendly partner for federal growth
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.7rem] lg:leading-[1.05]">
                Welcome to a calmer way to manage your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand to-cta">
                  GSA journey.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-ink-light leading-relaxed max-w-xl">
                You should feel confident about every step of the process. We combine practical federal expertise
                with a people-first approach so your team feels supported from kickoff to ongoing compliance.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-soft hover:shadow-md transition-shadow">
                  Explore Services
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="bg-white/90">
                  <Phone size={18} className="mr-2 text-ink-light" />
                  Book a Free Strategy Call
                </LinkButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-transparent to-cta/10 rounded-3xl -m-4 -z-10" />
              <div className="bg-white/95 rounded-3xl border border-warm-border shadow-elevated overflow-hidden">
                <div className="bg-gradient-to-r from-brand to-brand-dark px-8 py-5 flex items-center justify-between">
                  <h3 className="text-white font-semibold">Why teams choose GSA Managers</h3>
                  <BarChart3 className="text-[#8CC7FF]" size={20} />
                </div>
                <div className="p-8">
                  <div className="space-y-8">
                    {metrics.map((m) => (
                      <div key={m.label} className="flex items-center gap-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warm-100 border border-warm-border">
                          <m.icon size={23} className="text-brand" />
                        </div>
                        <div>
                          <div className="font-display text-3xl font-bold text-ink">{m.value}</div>
                          <div className="text-sm font-medium text-ink-light mt-0.5">{m.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-2xl border border-warm-border bg-surface p-4 text-sm text-ink-light leading-relaxed">
                    <span className="font-semibold text-ink">Built for clarity:</span> clear milestones, weekly communication,
                    and collaborative execution.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32 border-y border-warm-border">
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
                Services designed for confidence.
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed">
                Every engagement is centered on trustworthy guidance, practical execution, and long-term success.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LinkButton href="/services/gsa-contractors" variant="secondary" className="bg-surface">
                View Full Service Details
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
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Link to={`/services/gsa-contractors${svc.hash}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-warm-border bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-elevated hover:border-brand/30 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-cta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface border border-warm-border shadow-sm group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors mb-7">
                        <svc.icon size={26} className="text-ink group-hover:text-white transition-colors" />
                      </div>

                      <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-brand transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-ink-light text-base leading-relaxed mb-8 min-h-[4rem]">{svc.description}</p>

                      <div className="space-y-3 mb-8 pt-6 border-t border-warm-border">
                        {svc.features.map((f) => (
                          <div key={f} className="flex items-start gap-3 text-sm text-ink-light font-medium">
                            <CheckCircle2 size={18} className="text-cta shrink-0 mt-0.5" />
                            {f}
                          </div>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-ink group-hover:text-brand transition-colors mt-auto">
                        Learn more
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
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">A warm, reliable process in three steps.</h2>
            <p className="mt-4 text-ink-light text-lg">Simple, collaborative, and built to remove stress from federal contracting.</p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-warm-border border-dashed border-t-2" />

            {[
              {
                step: "01",
                title: "Discovery & Roadmap",
                desc: "We listen first, map your goals, and outline the right path before any heavy lifting starts.",
              },
              {
                step: "02",
                title: "Hands-On Execution",
                desc: "Our team prepares, reviews, and manages the technical details while keeping you informed.",
              },
              {
                step: "03",
                title: "Support & Momentum",
                desc: "After launch, we help you stay compliant and build steady momentum for long-term growth.",
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
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-dark via-brand to-brand-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid gap-10 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {[
              {
                icon: Sparkles,
                label: "Clear Communication",
                detail: "Weekly updates and transparent next steps so your team always knows where things stand.",
              },
              {
                icon: Shield,
                label: "Compliance Mindset",
                detail: "Processes built around federal requirements to reduce risk and avoid avoidable setbacks.",
              },
              {
                icon: Users,
                label: "People-First Support",
                detail: "A responsive partner that treats your business goals like shared goals.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="pt-8 md:pt-0 md:px-8 first:pt-0 first:md:pl-0 last:md:pr-0 text-center md:text-left"
              >
                <item.icon className="mx-auto md:mx-0 text-[#8CC7FF] mb-4" size={24} />
                <h4 className="font-display text-2xl font-semibold text-white mb-2">{item.label}</h4>
                <p className="text-white/80 leading-relaxed text-sm">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-surface border border-warm-border p-10 md:p-16 text-center shadow-elevated relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 p-8 opacity-10 pointer-events-none">
              <Shield size={180} />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">
                Ready for support that feels expert and human?
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed mb-10">
                Let&apos;s map a practical path for your GSA goals and make the process feel clear from day one.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  View Services
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

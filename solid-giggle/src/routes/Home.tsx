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
  Sparkles,
  Building2,
  Target,
  TrendingUp,
  Globe,
  Briefcase,
  Scale,
  BadgeCheck,
} from "lucide-react";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const services = [
  {
    icon: Award,
    title: "GSA MAS Contract Submission",
    description:
      "End-to-end GSA Schedule submission support — from solicitation analysis and proposal writing to portal delivery with a clear, milestone-driven timeline.",
    features: ["Solicitation analysis & strategy", "Proposal writing & document prep", "Weekly progress updates & portal delivery"],
    hash: "#submission",
  },
  {
    icon: Shield,
    title: "GSA Schedule Contract Management",
    description:
      "Ongoing GSA MAS contract compliance and management support to keep your schedule healthy, compliant, and positioned for revenue growth year-round.",
    features: ["Compliance monitoring & reporting", "Catalog & pricing updates", "Dedicated account management"],
    hash: "#management",
  },
  {
    icon: Rocket,
    title: "New GSA Vendor Support",
    description:
      "Structured onboarding for first-time GSA Schedule holders — get your team operational on GSA Advantage, eBuy, and FCP with confidence.",
    features: ["GSA platform training", "Launch roadmap & milestones", "Hands-on onboarding support"],
    hash: "#new-vendor",
  },
  {
    icon: FileText,
    title: "FCP Catalog Baseline Setup",
    description:
      "Accurate FCP catalog setup and validation to meet GSA requirements, avoid mod rejections, and prevent costly delays.",
    features: ["Catalog formatting & structure", "Pricing QA & compliance checks", "GSA requirement validation"],
    hash: "#fcp",
  },
];

const metrics = [
  { icon: CheckCircle2, value: "98%", label: "GSA Schedule Approval Rate" },
  { icon: Clock, value: "4–6 mo", label: "Average MAS Award Time" },
  { icon: Users, value: "80+", label: "Active GSA Clients" },
];

const seoTopics = [
  {
    icon: Building2,
    title: "What Is a GSA Schedule?",
    description:
      "A GSA Schedule (also called a GSA MAS Contract) is a long-term governmentwide contract that lets federal agencies purchase your products and services at pre-negotiated prices. It's the most common way businesses enter the federal marketplace.",
    link: "/information/vehicles",
  },
  {
    icon: Target,
    title: "GSA MAS Contract Eligibility",
    description:
      "To qualify for a GSA MAS Contract, your business must demonstrate past performance, financial stability, and compliance with the Trade Agreements Act. We help you assess readiness and close any gaps before you submit.",
    link: "/services/gsa-contractors#submission",
  },
  {
    icon: TrendingUp,
    title: "GSA Schedule vs. Other Vehicles",
    description:
      "GSA Schedules offer streamlined ordering for agencies, lower competition barriers, and recurring revenue. Compared to open-market bids, a GSA MAS Contract positions you for faster, more predictable federal sales.",
    link: "/information/vehicles",
  },
  {
    icon: Globe,
    title: "Selling to the Federal Government",
    description:
      "The federal government spends over $600B annually on contracts. A GSA Schedule gives your business direct access to this market — but the application process is complex. We simplify every step.",
    link: "/services/gsa-contractors",
  },
  {
    icon: Briefcase,
    title: "GSA Contract Compliance Requirements",
    description:
      "Maintaining a GSA MAS Contract requires ongoing compliance — from IFF payments and sales reporting to catalog accuracy and TAA adherence. Our management service keeps you covered year-round.",
    link: "/services/gsa-contractors#management",
  },
  {
    icon: Scale,
    title: "GSA Schedule for Small Businesses",
    description:
      "Small businesses can leverage set-aside opportunities and the MAS pathway to win federal contracts without competing against large primes. We help you position your business for maximum advantage.",
    link: "/services/gsa-contractors#new-vendor",
  },
];

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Schedule Consultants | GSA MAS Contract Assistance | {BRAND.name}</title>
        <meta
          name="description"
          content="Expert GSA Schedule consulting and GSA MAS Contract assistance. We help businesses obtain, manage, and grow their GSA Schedule with 98% approval rate. Submission support, contract management, and compliance services."
        />
        <meta
          name="keywords"
          content="GSA Schedule, GSA MAS Contract, GSA Schedule consultants, GSA Schedule assistance, GSA Multiple Award Schedule, GSA contract management, federal contracting, GSA Advantage, GSA submission help, GSA Schedule application"
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: BRAND.name,
            description: "Expert GSA Schedule consulting and GSA MAS Contract assistance for businesses seeking federal contracts.",
            url: "https://gsamanagers.com/",
            telephone: BRAND.phone,
            email: BRAND.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tampa",
              addressRegion: "FL",
              addressCountry: "US",
            },
            areaServed: "US",
            serviceType: ["GSA Schedule Consulting", "GSA MAS Contract Assistance", "Federal Contract Management"],
          })}
        </script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-24 lg:pt-40 lg:pb-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,58,122,0.12),transparent)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(216,137,58,0.06),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-white/60 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/10 mb-8">
                <BadgeCheck size={14} className="text-brand" />
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                  GSA Schedule & MAS Contract Experts
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.7rem] lg:leading-[1.05]">
                Get Your GSA Schedule.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">
                  Keep It Compliant. Grow Federal Revenue.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-ink-light leading-relaxed max-w-xl">
                We help businesses obtain, manage, and maximize their GSA MAS Contract — from first-time
                GSA Schedule submissions to ongoing compliance and catalog management. 98% approval rate.
                80+ active clients.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-soft hover:shadow-md transition-shadow">
                  Explore GSA Services
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="bg-white/90">
                  <Phone size={18} className="mr-2 text-ink-light" />
                  Free GSA Strategy Call
                </LinkButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="bg-white rounded-3xl border border-warm-border shadow-elevated overflow-hidden">
                <div className="bg-gradient-to-r from-brand to-brand-dark px-8 py-5 flex items-center justify-between">
                  <h3 className="text-white font-semibold">Why businesses choose GSA Managers</h3>
                  <BarChart3 className="text-[#8CC7FF]" size={20} />
                </div>
                <div className="p-8">
                  <div className="space-y-8">
                    {metrics.map((m) => (
                      <div key={m.label} className="flex items-center gap-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/5 border border-brand/10">
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
                    <span className="font-semibold text-ink">Built for results:</span> milestone-driven execution,
                    weekly communication, and a 98% GSA Schedule approval rate.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-warm-border py-6">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-medium text-ink-light">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand" /> GSA MAS Contract Specialists</span>
            <span className="flex items-center gap-2"><Shield size={16} className="text-brand" /> Compliance-First Approach</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-brand" /> 4–6 Month Average Award</span>
            <span className="flex items-center gap-2"><Users size={16} className="text-brand" /> 80+ Active GSA Clients</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">GSA Schedule Services</p>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
                Full-spectrum GSA MAS Contract support.
              </h2>
              <p className="mt-6 text-ink-light text-lg leading-relaxed">
                From obtaining your first GSA Schedule to managing ongoing compliance, every service is designed
                to help you win and grow federal revenue.
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
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-cta/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/5 border border-brand/10 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-300 mb-7">
                        <svc.icon size={26} className="text-brand group-hover:text-white transition-colors" />
                      </div>

                      <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-brand transition-colors">
                        {svc.title}
                      </h3>

                      <p className="text-ink-light text-base leading-relaxed mb-8 min-h-[4rem]">{svc.description}</p>

                      <div className="space-y-3 mb-8 pt-6 border-t border-warm-border/60">
                        {svc.features.map((f) => (
                          <div key={f} className="flex items-start gap-3 text-sm text-ink-light font-medium">
                            <CheckCircle2 size={18} className="text-brand/60 shrink-0 mt-0.5" />
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

      {/* ── SEO CONTENT: GSA SCHEDULE KNOWLEDGE ── */}
      <section className="bg-surface py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">GSA Schedule Resources</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Understanding GSA Schedules & MAS Contracts
            </h2>
            <p className="mt-6 text-ink-light text-lg leading-relaxed">
              The GSA Multiple Award Schedule (MAS) is the most widely used contract vehicle for selling to the
              federal government. Here's what you need to know.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seoTopics.map((topic, idx) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
              >
                <Link to={topic.link} className="group block h-full">
                  <div className="h-full rounded-2xl border border-warm-border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:border-brand/20 hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/5 border border-brand/10 mb-5">
                      <topic.icon size={22} className="text-brand" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink mb-3 group-hover:text-brand transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed mb-5">{topic.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Read more
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-white py-24 lg:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Our Process</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
              Your GSA Schedule in three phases.
            </h2>
            <p className="mt-6 text-ink-light text-lg">
              A structured, transparent process designed to get your GSA MAS Contract awarded — and keep it compliant long-term.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-brand/20 via-brand/40 to-brand/20" />

            {[
              {
                step: "01",
                title: "GSA Readiness & Strategy",
                desc: "We assess your eligibility, analyze the right GSA Schedule SINs, and build a roadmap tailored to your business before any paperwork begins.",
              },
              {
                step: "02",
                title: "MAS Proposal Execution",
                desc: "Our team writes, assembles, and submits your GSA Schedule proposal — handling every document, pricing narrative, and portal requirement.",
              },
              {
                step: "03",
                title: "Award & Ongoing Compliance",
                desc: "After your GSA MAS Contract is awarded, we keep you compliant with reporting, catalog updates, and growth strategy support.",
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/20 mb-6 font-display text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ── */}
      <section className="bg-gradient-to-br from-brand-dark via-brand to-brand-dark py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(216,137,58,0.15),transparent)]" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8CC7FF] mb-3">Why GSA Managers</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight">
              GSA Schedule expertise that delivers results.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                label: "Transparent Communication",
                detail: "Weekly updates, clear milestones, and a dedicated point of contact so your team always knows where your GSA Schedule stands.",
              },
              {
                icon: Shield,
                label: "Compliance-First Process",
                detail: "Every step is built around GSA requirements — reducing risk, avoiding mod rejections, and keeping your MAS Contract healthy.",
              },
              {
                icon: Users,
                label: "Dedicated GSA Support",
                detail: "A responsive team that treats your federal revenue goals as their own. 80+ active clients trust us with their GSA Schedules.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 text-center md:text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-5 mx-auto md:mx-0">
                  <item.icon className="text-[#8CC7FF]" size={22} />
                </div>
                <h4 className="font-display text-xl font-semibold text-white mb-3">{item.label}</h4>
                <p className="text-white/70 leading-relaxed text-sm">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-brand-dark to-brand p-10 md:p-16 text-center shadow-elevated relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(216,137,58,0.2),transparent)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">
                Ready to get your GSA Schedule or MAS Contract?
              </h2>
              <p className="mt-6 text-white/80 text-lg leading-relaxed mb-10">
                Let&apos;s map a practical path for your GSA goals — from first submission to long-term contract
                compliance and federal revenue growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="bg-white text-brand hover:bg-white/90 shadow-md hover:shadow-lg transition-shadow">
                  Explore GSA Services
                </LinkButton>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                >
                  <Phone size={18} className="mr-2" />
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
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  Rocket,
  Award,
  Users,
  Phone,
} from "lucide-react";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const coreServices = [
  {
    icon: FileText,
    title: "FCP Catalog Upload",
    description:
      "Your catalog uploaded to the new Federal Catalog Platform within 30 days. Includes full quality review and technical support.",
    link: "/order",
    cta: "Order Now",
  },
  {
    icon: Rocket,
    title: "New Vendor Package",
    description:
      "Everything a new GSA contractor needs: catalog upload, one-on-one training on every GSA website, and 90 days of contract support.",
    link: "/order",
    cta: "Get Started",
  },
  {
    icon: Award,
    title: "GSA Schedule Submission",
    description:
      "We prepare and submit your complete GSA application. You get a dedicated specialist and a 45-day submission guarantee.",
    link: "/order",
    cta: "Learn More",
  },
  {
    icon: Shield,
    title: "Contract Management",
    description:
      "Annual support that covers modifications, sales reporting, catalog updates, SAM registration, and everything in between.",
    link: "/order",
    cta: "Learn More",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Free Strategy Call",
    description:
      "We talk through your goals, review your eligibility, and give you an honest recommendation. No pressure, no sales pitch.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Pick Your Service",
    description:
      "Choose the level of help you need. Every option has a clear scope and a fixed price so there are no surprises.",
    icon: Users,
  },
  {
    number: "03",
    title: "We Do the Work",
    description:
      "Our team handles the details, keeps you updated, and delivers results. You stay focused on running your business.",
    icon: CheckCircle2,
  },
];

const trustPoints = [
  {
    stat: "45 Days",
    label: "Submission Guarantee",
    detail: "Your GSA application submitted within 45 days or we make it right.",
  },
  {
    stat: "100%",
    label: "No Award, No Fee",
    detail: "If your full-service submission doesn't get awarded, you don't pay.",
  },
  {
    stat: "No",
    label: "Long-Term Contracts",
    detail: "Month-to-month support. Stay because it works, not because you're locked in.",
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          {BRAND.name} — GSA Schedule Experts
        </title>
        <meta
          name="description"
          content="GSA Schedule submissions, contract management, and FCP catalog uploads. Clear pricing, real results, no long-term contracts."
        />
        <link rel="canonical" href="https://gsamanagers.com/" />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl text-navy">
              Your GSA Schedule, Handled.
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-500 leading-relaxed">
              The portals are confusing, the processes are slow, and one mistake can cost you your contract.
              We take care of it so you can focus on your business.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
              <LinkButton href="/order" size="lg">
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                Book a Free Call
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">What We Do</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              Simple Services, Clear Results
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-500">
              Every service has a fixed scope and a clear price. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {coreServices.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Card className="p-8 h-full flex flex-col justify-between" hover>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                        <svc.icon size={20} className="text-brand-blue" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-navy">
                        {svc.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <LinkButton href={svc.link} size="sm">
                      {svc.cta}
                      <ArrowRight size={14} className="ml-1.5" />
                    </LinkButton>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">How It Works</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              Three Steps. That's It.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white font-bold text-lg mb-5">
                  {step.number}
                </div>
                <h4 className="font-display text-lg font-bold text-navy mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST / WHY US ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Why Us</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              Built on Trust, Not Contracts
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {trustPoints.map((tp, idx) => (
              <motion.div
                key={tp.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="p-8 h-full text-center" hover>
                  <div className="font-display text-3xl font-bold text-brand-blue mb-2">{tp.stat}</div>
                  <h4 className="font-display text-lg font-bold text-navy mb-2">
                    {tp.label}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {tp.detail}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-navy py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60 text-lg">
            Pick a service, place your order, and let us handle the rest.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
            <LinkButton href="/order" size="lg">
              Place Your Order
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
            <LinkButton
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              size="lg"
              variant="ghost"
              className="text-white border-2 border-white/20 hover:bg-white/10"
            >
              Schedule a Free Call
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

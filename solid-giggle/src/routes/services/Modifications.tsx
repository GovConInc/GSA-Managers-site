import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wrench,
  ClipboardList,
  PackagePlus,
  Tags,
  Users,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { ServiceHero, BuyCard, ServiceFinalCta, ServiceSchema } from "../../components/ServiceBlocks";
import FaqList from "../../components/FaqList";
import { LinkButton } from "../../components/Button";
import { BRAND } from "../../lib/constants";
import { SERVICE_DICTIONARY } from "../../lib/offers";

const modTypes = [
  { icon: PackagePlus, title: "Add Products & Services", desc: "Get new offerings live on your schedule and visible on GSA Advantage — before your competitors react." },
  { icon: Tags, title: "Add New SINs", desc: "Expand into new Special Item Numbers to bid on opportunities your current scope can't touch." },
  { icon: Users, title: "Add Labor Categories", desc: "New roles, new rates, new revenue — added with pricing narratives COs accept the first time." },
  { icon: RefreshCw, title: "Pricing Modifications", desc: "Economic price adjustments and escalations that keep your margins healthy without triggering scrutiny." },
  { icon: ClipboardList, title: "Administrative Mods", desc: "Address changes, POC updates, novations — the paperwork that can't be allowed to lapse." },
  { icon: Wrench, title: "Technical Mods", desc: "Scope revisions and terms updates, drafted to match exactly what your Contracting Officer expects." },
];

const steps = [
  { n: "01", title: "Assessment", dur: "3–5 days", desc: "We review your contract, your goal, and the fastest compliant path to get the change approved." },
  { n: "02", title: "Documentation", dur: "5–10 days", desc: "We prepare every document, pricing support file, and narrative — built to anticipate CO questions." },
  { n: "03", title: "Internal Review", dur: "2–3 days", desc: "A second senior reviewer pressure-tests the package against current GSA requirements." },
  { n: "04", title: "Submission", dur: "1–2 days", desc: "Filed in eMod within our 14-day guarantee window from kickoff." },
  { n: "05", title: "Review Period", dur: "Varies by CO", desc: "We field every clarification request so the review never stalls on your side." },
  { n: "06", title: "Approval & Verification", dur: "1–3 days", desc: "We verify the change is live everywhere it should be — eLibrary, Advantage, your catalog." },
];

const faqs = [
  {
    q: "How much does a GSA modification consultant cost?",
    a: "Our standalone major modification is a flat $2,999 — documentation, submission, CO communications, and verification included. If you expect more than one modification this year, our 12-month Complete Management plan covers unlimited major and minor mods for $4,500 total.",
  },
  {
    q: "What counts as a major modification?",
    a: "Anything that changes the scope of your contract: adding SINs, products, services, or labor categories, and significant pricing restructures. Minor mods are administrative — POC changes, address updates, small catalog corrections.",
  },
  {
    q: "How fast will my modification be submitted?",
    a: "Within 14 days of kickoff — guaranteed. Speed wins deals: every week your new products aren't on schedule is a week of federal revenue you can't capture.",
  },
  {
    q: "Why do GSA modifications get rejected?",
    a: "The usual culprits: pricing support that doesn't match the CSP, missing TAA documentation, narratives that don't address the solicitation's evaluation criteria, and stale catalog data. We've seen every rejection pattern — and we draft to pre-empt them. Read our full breakdown in the Intelligence Hub.",
  },
  {
    q: "Can you fix a modification that was already rejected?",
    a: "Yes. Rejected-mod rescues are one of our most common engagements. We diagnose the rejection, rebuild the package, and resubmit — typically inside the same 14-day window.",
  },
  {
    q: "Do you handle mass modifications too?",
    a: "Yes — mass mod review and acceptance is included in both of our management retainers, and we can process one standalone if you're up against a deadline.",
  },
];

export default function Modifications() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Major Modification Consultant — Submitted in 14 Days | {BRAND.name}</title>
        <meta
          name="description"
          content="GSA major modification consultant. We execute your modification start to finish — new SINs, products, labor categories — for $2,999 flat, submitted within 14 days. 98% approval rate."
        />
        <meta
          name="keywords"
          content="GSA major modification consultant, GSA modification service, GSA mod help, add SIN GSA schedule, GSA eMod consultant"
        />
        <link rel="canonical" href={`${BRAND.url}/gsa-modification-consultant`} />
      </Helmet>
      <ServiceSchema
        name="GSA Major Modification Consulting"
        description="Standalone GSA modification service — major and minor mods executed start to finish with a 14-day submission guarantee."
        price="2999"
        url="/gsa-modification-consultant"
      />

      <ServiceHero
        eyebrow="GSA Modifications — Major & Minor"
        title="Your GSA modification consultant."
        accent="Submitted in 14 days. Flat fee."
        lede={SERVICE_DICTIONARY["Major Modifications"]}
        primaryLabel="Buy a Standalone Mod — $2,999"
        primaryHref="/order?service=standalone-mod"
      />

      {/* ── Main content + sticky buy card ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
                  Every Modification Type
                </p>
                <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight mb-6">
                  If it changes your contract, we execute it.
                </h2>
                <p className="text-ink-light text-lg leading-relaxed mb-12 max-w-2xl">
                  A stalled modification isn&apos;t paperwork — it&apos;s revenue sitting in a
                  queue. Every week your new products, SINs, or labor categories aren&apos;t live
                  is a week agencies literally cannot buy them.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  {modTypes.map((mod, idx) => (
                    <motion.div
                      key={mod.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: idx * 0.05, duration: 0.45 }}
                      className="rounded-2xl border border-warm-border bg-white p-6 hover:shadow-elevated hover:border-cta/30 transition-all duration-300"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cta/10 border border-cta/15 mb-4">
                        <mod.icon size={20} className="text-cta" />
                      </div>
                      <h3 className="font-display text-base font-bold text-ink mb-2">{mod.title}</h3>
                      <p className="text-ink-light text-sm leading-relaxed">{mod.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <BuyCard
                name="Standalone GSA Modification"
                price="$2,999"
                priceNote="flat fee"
                features={[
                  "One major modification, end-to-end",
                  "All documentation prepared for you",
                  "Submitted within 14 days — guaranteed",
                  "CO communications handled",
                  "Approval verified on every GSA platform",
                ]}
                orderHref="/order?service=standalone-mod"
                ctaLabel="Buy Now — $2,999"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── The anchor: one mod vs a year of mods ── */}
      <section className="bg-surface py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-ink p-10 md:p-14 relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">Before You Buy One Mod</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                $2,999 buys one modification.
                <span className="block mt-1 text-cta">$4,500 buys all of them — for a year.</span>
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                If this is your only change for the year, the standalone mod is the right buy. If
                there&apos;s any chance you&apos;ll need a second — Complete Management includes
                unlimited major and minor mods, 6 training sessions, and a dedicated PM.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton href="/order?service=complete-management" size="lg" className="shadow-md">
                  Get Complete Management — $4,500
                  <ArrowRight size={16} className="ml-2" />
                </LinkButton>
                <LinkButton
                  href="/gsa-contract-management"
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 border-white/20 text-white hover:text-white hover:border-white/40"
                >
                  Compare the Plans
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-white py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">The Process</p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight">
              Six steps. Fourteen days to submission.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="rounded-2xl border border-warm-border bg-white p-7 hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl font-bold text-brand/15">{step.n}</span>
                  <span className="rounded-full bg-brand/5 border border-brand/10 px-3 py-1 text-xs font-bold text-brand">
                    {step.dur}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-center text-ink-light">
            Mods keep getting bounced back?{" "}
            <Link
              to="/intelligence/gsa-modification-rejected"
              className="font-semibold text-brand hover:underline"
            >
              Read: Why Your GSA Modifications Keep Getting Rejected →
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface py-24 lg:py-28 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Modification Questions
            </h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <ServiceFinalCta
        title="Get your modification moving today."
        body="Because we handle the bureaucratic heavy lifting, your new products and services go live faster — meaning you start capturing that revenue immediately."
        primaryLabel="Buy a Standalone Mod — $2,999"
        primaryHref="/order?service=standalone-mod"
      />
    </div>
  );
}

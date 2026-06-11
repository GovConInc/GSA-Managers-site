import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, FileWarning, Wrench, Scale } from "lucide-react";
import GsaNewsFeed from "../../components/GsaNewsFeed";
import LeadMagnet from "../../components/LeadMagnet";
import { BRAND } from "../../lib/constants";

export const ARTICLES = [
  {
    slug: "fas-catalog-platform-transition-guide",
    icon: FileWarning,
    category: "FCP & Compliance",
    title: "The 2026 Guide to the FAS Catalog Platform (FCP) Transition",
    description:
      "SIP is gone, FCP is mandatory, and an unmigrated catalog is invisible to federal buyers. What the transition actually requires, the tripwires that get schedules suspended, and how to get it done this month.",
    readTime: "9 min read",
    datePublished: "2026-01-15",
  },
  {
    slug: "gsa-modification-rejected",
    icon: Wrench,
    category: "Modifications",
    title: "Why Your GSA Modifications Keep Getting Rejected (And How to Fix It)",
    description:
      "Every rejected mod is weeks of lost revenue. The six rejection patterns Contracting Officers flag most, why they happen, and the pre-submission checklist that gets mods approved the first time.",
    readTime: "8 min read",
    datePublished: "2026-02-10",
  },
  {
    slug: "in-house-vs-outsourced-gsa-management",
    icon: Scale,
    category: "Strategy & ROI",
    title: "In-House GSA Management vs. Outsourcing: The True Cost",
    description:
      "A line-by-line cost breakdown of managing a GSA Schedule internally — hours, salary math, rejection risk, and opportunity cost — against a flat-fee retainer. The numbers aren't close.",
    readTime: "7 min read",
    datePublished: "2026-03-05",
  },
];

export default function IntelligenceIndex() {
  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Intelligence Hub — Guides for Schedule Holders | {BRAND.name}</title>
        <meta
          name="description"
          content="Long-form, practitioner-grade guides on GSA Schedule management: the FCP transition, modification rejections, compliance, and the true cost of in-house management."
        />
        <link rel="canonical" href={`${BRAND.url}/intelligence`} />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-14 lg:pt-28 lg:pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">GSA Intelligence Hub</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl leading-[1.1]">
              The answers GSA contract holders are googling at 11pm.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl">
              No top-of-funnel fluff. These are practitioner-grade breakdowns of the problems that
              actually cost schedule holders revenue — written by the team that fixes them daily.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {ARTICLES.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Link to={`/intelligence/${article.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col rounded-2xl border border-warm-border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:border-cta/40 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/10 border border-cta/15">
                        <article.icon size={22} className="text-cta" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wide text-brand">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-ink leading-snug mb-4 group-hover:text-cta transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-ink-light text-sm leading-relaxed mb-6">{article.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-warm-border/60">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                        <Clock size={13} />
                        {article.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink group-hover:text-cta transition-colors">
                        Read
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead magnet ── */}
      <section className="bg-surface py-20 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <LeadMagnet />
        </div>
      </section>

      {/* ── Live GSA news ── */}
      <GsaNewsFeed />
    </div>
  );
}

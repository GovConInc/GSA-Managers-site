import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Printer, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button, LinkButton } from "../../components/Button";
import { ServiceFinalCta } from "../../components/ServiceBlocks";
import { BRAND } from "../../lib/constants";
import { cn } from "../../components/cn";

const sections = [
  {
    title: "1. Registration & Contract Record Health",
    items: [
      "SAM.gov registration is active and renews more than 60 days from now",
      "DSBS profile is current and matches your SAM record",
      "All outstanding GSA mass modifications have been reviewed and accepted",
      "Authorized Negotiators list is current (departed employees removed)",
      "Digital certificates / login access for eOffer & eMod are valid and tested",
    ],
  },
  {
    title: "2. FCP Transition Readiness",
    items: [
      "You know your FCP status: not started / baseline in progress / baseline verified",
      "A named owner is responsible for the FCP migration with a deadline",
      "Your awarded pricelist, current catalog file, and last accepted mod have been reconciled",
      "Discontinued items are flagged for removal before migration — not after",
      "Every product has complete country-of-origin data on file",
    ],
  },
  {
    title: "3. Catalog & Pricing Accuracy",
    items: [
      "Catalog prices match your awarded/modified contract pricing exactly",
      "GSA Advantage listings display correctly (search for your own products like a buyer)",
      "Product descriptions, part numbers, and units of issue are consistent across systems",
      "Commercial pricelist changes since award have been captured in modifications",
      "Your CSP disclosures still reflect your actual commercial discounting practices",
    ],
  },
  {
    title: "4. TAA & Compliance Documentation",
    items: [
      "TAA country-of-origin certifications are on file from your supply chain — in writing",
      "Non-compliant items have been identified and removed (or substitution plans exist)",
      "Supply chain changes since award have been re-verified for TAA compliance",
      "Subcontractor / supplier letters of supply are current where required",
    ],
  },
  {
    title: "5. Reporting & Financial Obligations",
    items: [
      "All 72A / FAS sales reports filed on time for the last 4 quarters",
      "IFF (0.75%) remitted accurately for every reporting period",
      "GSA sales are tracked separately in your accounting system",
      "Sales reporting method (TDR vs. CSP-based) is documented and consistently applied",
    ],
  },
  {
    title: "6. Audit-Readiness",
    items: [
      "A complete contract file exists: award, all mods, pricelists, correspondence",
      "You could produce GSA sales records for any quarter within 48 hours",
      "Someone reviews GSA rule changes (FCP updates, refreshes, mass mods) monthly",
      "Option year / renewal dates are calendared with 6-month lead time",
      "A contingency owner exists if your primary GSA person leaves tomorrow",
    ],
  },
];

const total = sections.reduce((sum, s) => sum + s.items.length, 0);

export default function FcpChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedCount = Object.values(checked).filter(Boolean).length;

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>2026 GSA Compliance & FCP Readiness Checklist | {BRAND.name}</title>
        <meta
          name="description"
          content="The exact 28-point checklist we use to audit GSA Schedules: FCP transition readiness, catalog accuracy, TAA documentation, sales reporting, and audit-readiness. Free, printable."
        />
        <link rel="canonical" href={`${BRAND.url}/resources/fcp-compliance-checklist`} />
      </Helmet>

      {/* ── Header ── */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-16 print:pt-6 print:pb-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#E8ECF2,transparent_60%)]" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cta/10 border border-cta/20 mb-5 print:hidden">
              <ShieldCheck size={14} className="text-cta" />
              <span className="text-xs font-bold uppercase tracking-wide text-cta">Free Resource</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-[1.15]">
              2026 GSA Compliance &amp; FCP Readiness Checklist
            </h1>
            <p className="mt-5 text-lg text-ink-light leading-relaxed">
              The {total}-point assessment we run on every schedule we manage. Every unchecked
              box is a compliance gap a Contracting Officer can flag.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 print:hidden">
              <Button variant="secondary" onClick={() => window.print()} className="bg-white">
                <Printer size={16} className="mr-2" />
                Print / Save as PDF
              </Button>
              <span className="text-sm font-semibold text-ink-light">
                {checkedCount}/{total} complete
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Checklist ── */}
      <section className="bg-white py-14 lg:py-16 relative print:py-4">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl font-bold text-ink mb-5">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const key = `${section.title}::${item}`;
                  const isChecked = !!checked[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggle(key)}
                      className={cn(
                        "flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-200",
                        isChecked
                          ? "border-cta/40 bg-cta/[0.05]"
                          : "border-warm-border bg-white hover:border-cta/30"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                          isChecked ? "border-cta bg-cta" : "border-warm-border bg-white"
                        )}
                      >
                        {isChecked && <CheckCircle2 size={13} className="text-white" />}
                      </span>
                      <span
                        className={cn(
                          "text-sm leading-relaxed font-medium",
                          isChecked ? "text-ink-muted line-through decoration-cta/40" : "text-ink-light"
                        )}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Inline relief valve */}
          <div className="rounded-2xl bg-ink p-8 relative overflow-hidden print:hidden">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10">
              <h3 className="font-display text-xl font-bold text-white">
                Too many gaps to fix internally?
              </h3>
              <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xl">
                We handle the full FCP migration and resolve every compliance issue on this list.
                $499 flat fee, 7-day delivery guarantee.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <LinkButton href="/order?service=fcp-transition" className="shadow-md">
                  Fix Everything — $499
                  <ArrowRight size={15} className="ml-2" />
                </LinkButton>
                <LinkButton
                  href="/fcp-transition-service"
                  variant="secondary"
                  className="bg-white/10 border-white/20 text-white hover:text-white hover:border-white/40"
                >
                  Learn What's Included
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <ServiceFinalCta
          title="Found issues? We fix them."
          body="FCP migration and full compliance resolution. $499 flat, 7-day delivery guarantee."
          primaryLabel="Order FCP Transition — $499"
          primaryHref="/order?service=fcp-transition"
        />
      </div>
    </div>
  );
}

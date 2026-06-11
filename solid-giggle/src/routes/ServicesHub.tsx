import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  Wrench,
  FileWarning,
  Award,
  Rocket,
  ArrowRight,
  KeyRound,
  HeartPulse,
} from "lucide-react";
import StatBar from "../components/StatBar";
import TrustStrip from "../components/TrustStrip";
import { ServiceFinalCta } from "../components/ServiceBlocks";
import { BRAND } from "../lib/constants";

/** Legacy hash anchors from the old single-page services route → new silo pages. */
const LEGACY_HASH_MAP: Record<string, string> = {
  "#submission": "/gsa-schedule-submission",
  "#management": "/gsa-contract-management",
  "#new-vendor": "/fcp-transition-service",
  "#fcp": "/fcp-transition-service",
};

const getOnBucket = [
  {
    icon: Award,
    title: "GSA Schedule Submission",
    desc: "Full-service MAS offer preparation with a 45-day submission guarantee and 98% approval rate. Awarded in 4–6 months.",
    price: "From $4,995",
    to: "/gsa-schedule-submission",
  },
  {
    icon: Rocket,
    title: "New Vendor Special",
    desc: "Just awarded? FCP baseline upload, 1-on-1 platform training, and 90 days of complimentary management — operational in weeks.",
    price: "$1,450 flat",
    to: "/fcp-transition-service",
  },
];

const keepHealthyBucket = [
  {
    icon: Shield,
    title: "GSA Contract Management",
    desc: "6 and 12-month retainers covering every modification, report, and compliance deadline — plus training and a dedicated PM.",
    price: "From $1,499",
    to: "/gsa-contract-management",
  },
  {
    icon: Wrench,
    title: "GSA Modifications",
    desc: "Standalone major modifications executed end-to-end and submitted within 14 days, guaranteed.",
    price: "$2,999 flat",
    to: "/gsa-modification-consultant",
  },
  {
    icon: FileWarning,
    title: "FCP Transition & Compliance",
    desc: "The mandatory FAS Catalog Platform migration plus a full compliance audit. Suspension risk, eliminated.",
    price: "$499 flat",
    to: "/fcp-transition-service",
  },
];

function BucketGrid({ items }: { items: typeof getOnBucket }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((svc, idx) => (
        <motion.div
          key={svc.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: idx * 0.08, duration: 0.5 }}
        >
          <Link to={svc.to} className="group block h-full">
            <div className="h-full rounded-2xl border border-warm-border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:border-cta/40 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta/10 border border-cta/20 group-hover:bg-cta transition-all duration-300">
                  <svc.icon size={24} className="text-cta group-hover:text-white transition-colors" />
                </div>
                <span className="rounded-full bg-warm-100 border border-warm-border px-3 py-1.5 text-sm font-bold text-ink">
                  {svc.price}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-cta transition-colors">
                {svc.title}
              </h3>
              <p className="text-ink-light text-sm leading-relaxed mb-6">{svc.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-ink group-hover:text-cta transition-colors">
                Learn more
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function ServicesHub() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect legacy /services/gsa-contractors#anchor links into the silo.
  useEffect(() => {
    const target = LEGACY_HASH_MAP[location.hash];
    if (target) navigate(target, { replace: true });
  }, [location.hash, navigate]);

  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>GSA Schedule Services — Management, Mods, FCP & Submissions | {BRAND.name}</title>
        <meta
          name="description"
          content="GSA services for every stage: contract management retainers, standalone modifications, FCP transition & compliance audits, and full MAS submissions. Flat fees, published pricing."
        />
        <link rel="canonical" href={`${BRAND.url}/services`} />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              GSA services mean two things.
              <span className="block mt-2 text-cta">We do both.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
              Getting <em>on</em> the Schedule — and keeping it healthy, compliant, and selling
              after the award. Most firms lead with the first and bury the second. Management is
              our first-class offer.
            </p>
            <TrustStrip className="mt-8" />
          </motion.div>
          <StatBar className="max-w-3xl mx-auto mt-14" />
        </div>
      </section>

      {/* ── Bucket 2 first: keep it healthy (our lead offer) ── */}
      <section className="bg-white py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta/10 border border-cta/20">
              <HeartPulse size={20} className="text-cta" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cta">
              Keep It Healthy — For Schedule Holders
            </p>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight mb-12 max-w-2xl">
            Your award was the beginning. The work is keeping it compliant and selling.
          </h2>
          <BucketGrid items={keepHealthyBucket} />
        </div>
      </section>

      {/* ── Bucket 1: get on the Schedule ── */}
      <section className="bg-surface py-20 lg:py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/5 border border-brand/10">
              <KeyRound size={20} className="text-brand" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Get On — For Future Contract Holders
            </p>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl tracking-tight mb-12 max-w-2xl">
            From eligibility to award to your first catalog upload.
          </h2>
          <BucketGrid items={getOnBucket} />
        </div>
      </section>

      <ServiceFinalCta
        title="Know what you need? Prices are published."
        body="Every service above has a flat fee and a guaranteed timeline. Compare them side-by-side, or go straight to checkout."
        primaryLabel="See All Pricing"
        primaryHref="/pricing"
      />
    </div>
  );
}

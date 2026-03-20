import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  AlertTriangle,
  Clock,
  FileText,
  Zap,
  Users,
  TrendingUp,
  RefreshCw,
  BookOpen,
  Settings,
} from "lucide-react";
import Card from "../components/Card";
import { cn } from "../components/cn";
import { BRAND } from "../lib/constants";

// ENROLL PAGE DATA — $999 SPECIAL, SUBMISSION, MANAGEMENT
const PLANS = {
  fcp: {
    label: "New Contractor Special",
    name: "$999 FCP Baseline Upload + Training",
    price: 999,
    note: "billed once",
    cadence: "One-time — $999",
    stripe_mode: "payment" as const,
  },
  submission: {
    label: "Full-Service Submission",
    name: "GSA Schedule Submission",
    price: 0,
    note: "Custom quote",
    cadence: "Award or No Fee",
    stripe_mode: "contact" as const,
  },
  management: {
    label: "Contract Management",
    name: "GSA MAS Management",
    price: 0,
    note: "Custom quote",
    cadence: "No long-term contract",
    stripe_mode: "contact" as const,
  },
} as const;

type PlanKey = keyof typeof PLANS;

const CALENDLY_URL = "https://calendar.app.google/EA6JzEhbNTH6AM6S8";

/* ─── SECTION DATA ─── */
const deliverables = [
  {
    title: "$999 FCP Baseline Upload & Training",
    desc: "We upload your catalog to the FAS Catalog Platform (FCP) and provide live, 1-on-1 training so you can manage your contract with confidence. No hidden fees, no upsells—just a simple, affordable start.",
    items: [
      "Full FCP Catalog Upload",
      "GSA Advantage! Setup",
      "1-on-1 FCP Platform Training",
      "eBuy Portal Walkthrough"
    ]
  },
  {
    title: "GSA Schedule Submission (Award or No Fee)",
    desc: "We handle your entire GSA MAS application from start to finish: eligibility, document prep, eOffer, negotiations, and award. If you don't get awarded, you don't pay.",
    items: [
      "Eligibility review & roadmap",
      "Document preparation",
      "eOffer portal management",
      "Negotiation & award support"
    ]
  },
  {
    title: "GSA MAS Contract Management",
    desc: "Ongoing compliance, modifications, quarterly sales reporting, and catalog updates. No long-term contracts—get help when you need it.",
    items: [
      "Quarterly sales reporting",
      "Mass mod acceptance",
      "Catalog updates",
      "CO communications & compliance"
    ]
  }
];
    title: "GSA Terminology & Processes",
    desc: "We demystify SINs, mods, refreshes, mass mods, IFF, C&P reporting — everything you need to understand.",
  },
  export default function Enroll() {
    return (
      <>
        <Helmet>
          <title>Get Started — $999 FCP Baseline Upload & Training | GSA Managers Inc.</title>
          <meta name="description" content="The most affordable way to get on the GSA Schedule. $999 FCP Baseline Upload & Training, plus full-service submission and contract management options." />
        </Helmet>

        {/* HERO */}
        <section className="bg-gov-navy px-5 py-16 text-center lg:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
              <Zap size={12} />
              $999 New Contractor Special
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The Easiest Way to Get on the GSA Schedule
            </h1>
            <p className="mt-6 text-lg text-blue-100 leading-relaxed">
              Start with the $999 FCP Baseline Upload & Training, or request full-service submission or ongoing management. No long-term contracts, no hidden fees—just honest, expert help.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Button href="#plans" size="lg" className="bg-white text-gov-navy hover:bg-blue-100">
                Get Started for $999
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Request Full-Service Help
              </Button>
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section id="plans" className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
              Choose Your GSA Path
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(PLANS).map(([key, plan]) => (
                <Card key={key} className="p-8 flex flex-col items-start justify-between" hover>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle size={24} className="text-blue-600" />
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                        {plan.label}
                      </span>
                    </div>
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {plan.cadence}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 w-full">
                    {plan.stripe_mode === "payment" ? (
                      <Button size="md" className="w-full bg-gov-navy text-white hover:bg-blue-900">
                        Get Started for ${plan.price}
                      </Button>
                    ) : (
                      <Button size="md" className="w-full bg-blue-100 text-gov-navy hover:bg-blue-200">
                        Request Info
                      </Button>
                    )}
                    <span className="text-xs text-slate-400 mt-1">{plan.note}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
              What You Get
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((item, idx) => (
                <Card key={item.title} className="p-8 flex flex-col items-start justify-between" hover>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {item.desc}
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm mt-2">
                      {item.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
  {
    q: "Can we upgrade to annual management after the catalog upload?",
    a: "Yes — and many clients do. After the catalog is live and you've gone through the training, you'll have a clear picture of what ongoing management involves. Upgrading is straightforward.",
  },
];

/* ─── MAIN COMPONENT ─── */
export default function Enroll() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PlanKey>("fcp");
  const [annualPlan, setAnnualPlan] = useState<"annual" | "monthly">("annual");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contract, setContract] = useState("");
  const [errors, setErrors] = useState({ company: false, name: false, email: false, phone: false });

  // Success state from URL params
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") {
      const co = params.get("company") || "Your company";
      const svc = params.get("svc") === "fcp" ? "Catalog Upload + Training" : "Annual GSA Management";
      setSuccessMsg(`${co} is enrolled in ${svc}. Book your intro meeting and we'll get started.`);
      setSuccess(true);
    }
  }, []);

  function openModal(svc: "fcp" | "mgmt") {
    let key: PlanKey = svc;
    if (svc === "mgmt" && annualPlan === "monthly") key = "monthly";
    setCurrentPlan(key);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "";
  }

  function validate() {
    const e = {
      company: !company.trim(),
      name: !name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phone: phone.trim().length < 7,
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }

  async function checkout() {
    if (!validate()) return;
    setSubmitting(true);

    const plan = PLANS[currentPlan];
    try {
      const res = await fetch(CHECKOUT_WORKER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: currentPlan,
          label: plan.name,
          price: plan.price,
          mode: plan.stripe_mode,
          companyName: company.trim(),
          contactName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          gsaContract: contract.trim(),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch {
      setSubmitting(false);
      alert("Something went wrong. Please try again or call us at " + BRAND.phone);
    }
  }

  const plan = PLANS[currentPlan];

  /* ─── SUCCESS VIEW ─── */
  if (success) {
    return (
      <>
        <Helmet>
          <title>Enrolled — GSA Managers Inc.</title>
        </Helmet>
        <div className="mx-auto max-w-xl px-5 py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-200">
            <CheckCircle className="text-emerald-600" size={32} />
          </div>
          <h2 className="font-display text-3xl font-bold text-gov-navy">You're in. Let's go.</h2>
          <p className="mt-4 text-slate-600">{successMsg || "Payment confirmed. Book your intro meeting below and we'll get to work immediately."}</p>

          <button
            onClick={() => window.open(CALENDLY_URL, "_blank")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gov-navy px-8 py-4 text-base font-bold text-white transition hover:bg-slate-800"
          >
            Book Your Intro Meeting <ArrowRight size={18} />
          </button>
          <p className="mt-3 text-xs text-slate-400">Welcome packet sent automatically once you book.</p>

          <Card className="mt-8 overflow-hidden text-left" hover={false}>
            <div className="bg-gov-navy px-5 py-3 text-xs font-bold uppercase tracking-widest text-white">
              What Happens Next
            </div>
            {[
              { num: "✓", style: "bg-emerald-600 text-white", title: "Payment received", desc: "Check your inbox for the Stripe receipt." },
              { num: "2", style: "bg-gov-crimson text-white", title: "Book your meeting above", desc: "Google Meet — pick any open slot." },
              { num: "3", style: "bg-slate-100 text-gov-navy", title: "Onboarding & intake", desc: "We send a short intake form. Work starts within 24 hours." },
            ].map((s) => (
              <div key={s.title} className="flex gap-3 border-b border-slate-100 px-5 py-3 last:border-b-0">
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold", s.style)}>
                  {s.num}
                </div>
                <div>
                  <div className="text-sm font-bold text-gov-navy">{s.title}</div>
                  <div className="text-xs text-slate-500">{s.desc}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </>
    );
  }

  /* ─── PAGE VIEW ─── */
  return (
    <>
      <Helmet>
        <title>Get Your GSA Schedule Running — GSA Managers Inc.</title>
        <meta name="description" content="GSA catalog upload, FCP training, and annual schedule management. Get your GSA contract operational with expert support." />
      </Helmet>

      {/* ═══ HERO ═══ */}
      <section className="bg-gov-navy px-5 py-16 text-center lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
            <Zap size={12} />
            GSA Schedule Specialists
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Already Have a GSA Schedule<br />
            But Don't Know <span className="text-amber-400">How to Run It?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-slate-400 leading-relaxed sm:text-lg">
            We help GSA contractors upload their catalog correctly, understand the system, and manage their Schedule — without dealing with every portal, modification, and compliance requirement themselves.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openModal("fcp")}
              className="inline-flex items-center gap-2 rounded-xl bg-gov-crimson px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-red-700 active:scale-[.98]"
            >
              Upload My Catalog & Get Training
            </button>
            <a
              href="#annual-offer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/50"
            >
              See Annual Management ↓
            </a>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">The Reality</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy sm:text-3xl">
            Winning a GSA Schedule Is Only the Beginning
          </h2>
          <p className="mt-3 text-slate-500">
            Most companies spend months getting awarded — then realize they have no idea how to actually operate the contract. Here's what they run into:
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {problems.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <X size={10} className="text-gov-crimson" />
                </div>
                <p className="text-sm font-medium text-slate-700 leading-snug">{p}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 border-l-[3px] border-gov-crimson pl-4 text-base font-bold text-gov-navy leading-relaxed">
            Most companies win a Schedule and then have no idea how to actually operate it. That's exactly what we fix.
          </p>
        </div>
      </section>

      {/* ═══ RISK ═══ */}
      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-crimson">What Happens When a GSA Contract Is Mismanaged</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy">The Cost of Doing Nothing</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {risks.map((r) => (
              <div key={r.title} className="rounded-xl border border-slate-200 border-t-[3px] border-t-gov-crimson bg-white p-5">
                <h4 className="text-sm font-bold text-gov-navy">{r.title}</h4>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTRY OFFER — CATALOG UPLOAD ═══ */}
      <section id="entry-offer" className="scroll-mt-16 bg-white py-16">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">Start Here</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy sm:text-3xl">
            Catalog Upload + 1-on-1 GSA Training
          </h2>
          <p className="mt-3 mb-8 text-slate-500">
            Get your catalog live and understand exactly how your contract works — from someone who does this every day.
          </p>

          <div className="overflow-hidden rounded-2xl border-2 border-gov-navy shadow-lg shadow-gov-navy/10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gov-navy px-7 py-6">
              <div>
                <h3 className="text-lg font-black text-white sm:text-xl">New Contractor Catalog Upload + Training</h3>
                <p className="mt-1 text-sm text-blue-300">Everything you need to go from awarded to operational.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white">$1,200</div>
                <div className="text-xs text-blue-300">one-time investment</div>
              </div>
            </div>

            {/* Body */}
            <div className="p-7">
              <div className="mb-6 rounded-xl border-l-[3px] border-gov-navy bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
                This isn't just a catalog upload. By the time we're done,{" "}
                <strong className="text-gov-navy">you understand your contract</strong> — what every portal does, what every term means, what you need to do and when.
              </div>

              <div className="mb-7 grid gap-2.5 sm:grid-cols-2">
                {fcpDeliverables.map((d) => (
                  <div key={d.title} className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle size={10} className="text-emerald-600" />
                    </div>
                    <div className="text-sm">
                      <strong className="block text-gov-navy">{d.title}</strong>
                      <span className="text-xs text-slate-500 leading-snug">{d.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={() => openModal("fcp")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gov-crimson px-6 py-4 text-base font-extrabold text-white transition hover:bg-red-700 active:scale-[.98]"
                >
                  Start Catalog Upload — $1,200 <ArrowRight size={18} />
                </button>
                <p className="mt-3 text-center text-xs text-slate-400">
                  Secured by Stripe · No hidden fees · Intro meeting included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROOF ═══ */}
      <section className="bg-slate-900 py-14">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Trusted by GSA Contractors</p>
          <h2 className="mt-3 font-display text-2xl font-black text-white">We've Done This Hundreds of Times</h2>
          <p className="mt-3 text-sm text-slate-500">
            Every engagement is hands-on. Your dedicated manager knows the portals, knows the CO process, and keeps your contract clean.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-5">
            {[
              { num: "50+", label: "GSA Contractors Supported" },
              { num: "100+", label: "Catalogs Uploaded" },
              { num: "200+", label: "Modifications Submitted" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-black text-white sm:text-4xl">{s.num}</div>
                <div className="mt-1 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT HAPPENS AFTER ═══ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">No Guesswork</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy">What Happens After You Enroll</h2>
          <p className="mt-3 text-slate-500">This is what the process looks like from the moment you pay.</p>

          <div className="relative mt-8">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-200" />
            <div className="space-y-7">
              {steps.map((s, idx) => (
                <div key={s.title} className="relative flex gap-5">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gov-navy text-sm font-extrabold text-white">
                    {idx + 1}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-gov-navy">{s.title}</h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ UPSELL TRANSITION ═══ */}
      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">What Comes Next</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy">
            Most Contractors Continue With Ongoing Management
          </h2>
          <p className="mt-3 text-slate-500">
            After the catalog is live and you understand the system, the contract still needs continuous attention:
          </p>
          <div className="mt-5 space-y-2">
            {transitionItems.map((t) => (
              <div key={t} className="flex items-center gap-2.5 text-sm text-slate-600">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gov-navy" />
                {t}
              </div>
            ))}
          </div>
          <p className="mt-6 border-l-[3px] border-gov-navy pl-4 text-base font-bold text-gov-navy leading-relaxed">
            That's why many clients move directly into Annual GSA Management after the initial upload.
          </p>
        </div>
      </section>

      {/* ═══ ANNUAL OFFER ═══ */}
      <section id="annual-offer" className="scroll-mt-16 bg-white py-16">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">Full-Service Option</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy sm:text-3xl">
            Annual GSA Schedule Management
          </h2>
          <p className="mt-3 mb-8 text-slate-500">
            Instead of managing every portal and compliance task yourself, you get a dedicated expert handling your contract throughout the year.
          </p>

          <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 px-7 py-6">
              <div>
                <h3 className="text-lg font-black text-white sm:text-xl">Annual GSA Management</h3>
                <p className="mt-1 text-sm text-slate-500">Everything. All year. One flat rate.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white">
                  {annualPlan === "annual" ? "$5,200" : "$495/mo"}
                </div>
                <div className="text-xs text-slate-500">
                  {annualPlan === "annual" ? "per year" : "per month"}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-7">
              <div className="mb-6 rounded-xl border-l-[3px] border-slate-400 bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
                You get a dedicated GSA Manager who handles your contract the way an in-house expert would — without the overhead of a full-time hire. Modifications, reporting, catalog, compliance. All covered.
              </div>

              <div className="mb-7 grid gap-2.5 sm:grid-cols-2">
                {annualDeliverables.map((d) => (
                  <div key={d.title} className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle size={10} className="text-emerald-600" />
                    </div>
                    <div className="text-sm">
                      <strong className="block text-gov-navy">{d.title}</strong>
                      <span className="text-xs text-slate-500 leading-snug">{d.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <p className="mb-3 text-sm font-bold text-gov-navy">Choose your billing preference:</p>

                {/* Plan Toggle */}
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAnnualPlan("annual")}
                    className={cn(
                      "rounded-xl border-2 p-4 text-left transition",
                      annualPlan === "annual"
                        ? "border-gov-navy shadow-sm shadow-gov-navy/10"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest", annualPlan === "annual" ? "text-gov-navy" : "text-slate-400")}>
                      Pay annually
                    </div>
                    <div className="mt-1 text-xl font-black text-gov-navy">$5,200</div>
                    <div className="mt-0.5 text-xs text-slate-500">Best value — save $740/yr</div>
                  </button>
                  <button
                    onClick={() => setAnnualPlan("monthly")}
                    className={cn(
                      "rounded-xl border-2 p-4 text-left transition",
                      annualPlan === "monthly"
                        ? "border-gov-navy shadow-sm shadow-gov-navy/10"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest", annualPlan === "monthly" ? "text-gov-navy" : "text-slate-400")}>
                      Pay monthly
                    </div>
                    <div className="mt-1 text-xl font-black text-gov-navy">
                      $495<span className="text-sm font-semibold">/mo</span>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">$5,940/yr — flexible commitment</div>
                  </button>
                </div>

                <button
                  onClick={() => openModal("mgmt")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gov-navy px-6 py-4 text-base font-extrabold text-white transition hover:bg-slate-800 active:scale-[.98]"
                >
                  Start Annual Management <ArrowRight size={18} />
                </button>
                <p className="mt-3 text-center text-xs text-slate-400">
                  Secured by Stripe · Dedicated manager assigned · Intro meeting within 2–3 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHO THIS IS FOR ═══ */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">Is This Right for You?</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy">Who This Is For</h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Card className="p-6" hover={false}>
              <h4 className="mb-4 text-sm font-extrabold text-gov-navy">This is a fit if you are…</h4>
              <ul className="space-y-2">
                {fitYes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle size={8} className="text-emerald-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6" hover={false}>
              <h4 className="mb-4 text-sm font-extrabold text-gov-navy">This is not a fit if you…</h4>
              <ul className="space-y-2">
                {fitNo.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-gov-crimson">
                      ✕
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gov-blue">Common Questions</p>
          <h2 className="mt-3 font-display text-2xl font-black text-gov-navy">Before You Enroll</h2>

          <div className="mt-8 space-y-1">
            {faqs.map((f, idx) => {
              const open = expandedFaq === idx;
              return (
                <div key={idx} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <button
                    onClick={() => setExpandedFaq(open ? null : idx)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-gov-navy transition hover:bg-slate-50"
                  >
                    {f.q}
                    <span className={cn("text-lg text-slate-400 transition-transform", open && "rotate-45")}>+</span>
                  </button>
                  {open && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm text-slate-600 leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-gov-navy px-5 py-16 text-center">
        <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
          Get Your GSA Contract Running Correctly
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          Start with the catalog upload and training, or jump straight into full annual management. Either way, you're covered.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => openModal("fcp")}
            className="rounded-xl bg-gov-crimson px-8 py-4 text-sm font-extrabold text-white transition hover:bg-red-700"
          >
            Start Catalog Upload — $1,200
          </button>
          <button
            onClick={() => openModal("mgmt")}
            className="rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Start Annual Management — $5,200
          </button>
        </div>
      </section>

      {/* ═══ CHECKOUT MODAL ═══ */}
      {modalOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-5"
          onClick={(e) => e.target === overlayRef.current && closeModal()}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-gov-navy px-6 py-5">
              <div>
                <h3 className="text-base font-extrabold text-white">{plan.name}</h3>
                <p className="mt-0.5 text-xs text-blue-300">{plan.cadence}</p>
              </div>
              <button onClick={closeModal} className="text-xl text-white/50 transition hover:text-white">
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-3 grid grid-cols-2 gap-2.5">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Federal LLC"
                    className={cn(
                      "w-full rounded-lg border-[1.5px] px-3 py-2.5 text-sm outline-none transition focus:border-gov-navy",
                      errors.company ? "border-gov-crimson" : "border-slate-200"
                    )}
                  />
                  {errors.company && <p className="mt-0.5 text-[11px] text-gov-crimson">Required</p>}
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className={cn(
                      "w-full rounded-lg border-[1.5px] px-3 py-2.5 text-sm outline-none transition focus:border-gov-navy",
                      errors.name ? "border-gov-crimson" : "border-slate-200"
                    )}
                  />
                  {errors.name && <p className="mt-0.5 text-[11px] text-gov-crimson">Required</p>}
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@acmefederal.com"
                  className={cn(
                    "w-full rounded-lg border-[1.5px] px-3 py-2.5 text-sm outline-none transition focus:border-gov-navy",
                    errors.email ? "border-gov-crimson" : "border-slate-200"
                  )}
                />
                {errors.email && <p className="mt-0.5 text-[11px] text-gov-crimson">Valid email required</p>}
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2.5">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className={cn(
                      "w-full rounded-lg border-[1.5px] px-3 py-2.5 text-sm outline-none transition focus:border-gov-navy",
                      errors.phone ? "border-gov-crimson" : "border-slate-200"
                    )}
                  />
                  {errors.phone && <p className="mt-0.5 text-[11px] text-gov-crimson">Required</p>}
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Contract # <span className="text-[10px] font-normal normal-case text-slate-400">(if existing)</span>
                  </label>
                  <input
                    type="text"
                    value={contract}
                    onChange={(e) => setContract(e.target.value)}
                    placeholder="GS-00F-XXXXX"
                    className="w-full rounded-lg border-[1.5px] border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-gov-navy"
                  />
                </div>
              </div>

              <div className="my-4 h-px bg-slate-100" />

              {/* Plan Summary */}
              <div className="mb-4 flex items-center justify-between rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <div className="text-xs text-slate-500">{plan.label}</div>
                  <div className="text-sm font-bold text-gov-navy">{plan.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-gov-navy">
                    ${plan.price.toLocaleString()}
                    {currentPlan === "monthly" && <span className="text-sm font-semibold">/mo</span>}
                  </div>
                  <div className="text-[11px] text-slate-400">{plan.note}</div>
                </div>
              </div>

              <button
                onClick={checkout}
                disabled={submitting}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold text-white transition active:scale-[.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400",
                  currentPlan === "fcp"
                    ? "bg-gov-crimson hover:bg-red-700"
                    : "bg-gov-navy hover:bg-slate-800"
                )}
              >
                {submitting ? "Redirecting to checkout…" : "Pay & Get Started →"}
              </button>

              <div className="mt-2.5 flex flex-wrap justify-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Secured by Stripe
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No hidden fees
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

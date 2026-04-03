import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  Shield,
  FileText,
  Rocket,
  Award,
  Loader2,
} from "lucide-react";
import Card from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../components/cn";
import { BRAND } from "../lib/constants";

/* ─── SQUARE CONFIG ─── */
// Set VITE_SQUARE_APP_ID and VITE_SQUARE_LOCATION_ID as Cloudflare Pages env vars
const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID ?? "";
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID ?? "";
const SQUARE_ENV = import.meta.env.VITE_SQUARE_ENV === "production" ? "production" : "sandbox";

/* ─── SERVICES / PRODUCTS ─── */
const services = [
  {
    id: "test-payment",
    icon: ShoppingCart,
    name: "Test Connection",
    price: 100, // $1.00 (Square minimum is generally $1.00 for live transactions, though sandbox allows anything)
    displayPrice: "$1.00",
    description: "Use this to test the checkout flow, Square API, and Resend email delivery.",
    features: ["Verifies Square Token", "Verifies Backend", "Sends Test Emails"],
    type: "one-time" as const,
  },
  {
    id: "fcp-baseline",
    icon: FileText,
    name: "FCP Catalog Baseline",
    price: 500_00, // cents
    displayPrice: "$500",
    description:
      "Catalog Baseline upload within the GSA 30-day requirement. Includes Product Listing & Offer Pricing QA, roadmap and technical consultations.",
    features: [
      "FCP Catalog Baseline Upload (30 Days)",
      "Product Listing & Offer Pricing QA",
      "Roadmap Consultations",
      "Technical Consultations",
    ],
    type: "one-time" as const,
  },
  {
    id: "new-vendor",
    icon: Rocket,
    name: "New Vendor Special",
    price: 1450_00,
    displayPrice: "$1,450",
    description:
      "FCP Catalog Baseline upload, specialized 1-on-1 training for all GSA websites and processes, plus complimentary 90-day GSA Contract Management.",
    features: [
      "Full FCP Catalog Upload",
      "Specialized 1-on-1 Training (All GSA Sites)",
      "Process & Understanding Guide",
      "90-Day Contract Management (Initiation)",
    ],
    type: "one-time" as const,
  },
  {
    id: "gsa-submission",
    icon: Award,
    name: "GSA Schedule Submission",
    price: 4995_00,
    displayPrice: "Starting at $4,995",
    description:
      "Professional GSA MAS Submissions with a guarantee of submission within 45 days. Speak to our specialists to see if you qualify.",
    features: [
      "Eligibility Review & Qualification",
      "Complete Document Preparation",
      "eOffer Portal Management",
      "Guaranteed Submission (45 Days)",
    ],
    type: "one-time" as const,
  },
  {
    id: "contract-management",
    icon: Shield,
    name: "GSA Contract Management",
    price: 4995_00,
    displayPrice: "Starting at $4,995 / year",
    description:
      "Annual support including FCP catalog revisions, modifications, eBuy & Advantage! management, recurring expert guidance, and SAM Registration.",
    features: [
      "FCP Baseline Upload & Revisions",
      "Major/Minor Modifications",
      "Mass Mod Processing",
      "eBuy & GSA Advantage! Management",
      "SAM Registration & Maintenance",
      "Expert Guidance & Support",
    ],
    type: "annual" as const,
  },
];

type ServiceId = (typeof services)[number]["id"];

interface OrderForm {
  selectedServices: ServiceId[];
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  dunsUei: string;
  existingGsa: "yes" | "no" | "";
  gsaContractNumber: string;
  notes: string;
}

const initialForm: OrderForm = {
  selectedServices: [],
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  dunsUei: "",
  existingGsa: "",
  gsaContractNumber: "",
  notes: "",
};

/* ─── SQUARE WEB PAYMENTS SDK LOADER ─── */
function loadSquareSdk(): Promise<typeof window.Square> {
  return new Promise((resolve, reject) => {
    if (window.Square) {
      resolve(window.Square);
      return;
    }
    const url =
      SQUARE_ENV === "production"
        ? "https://web.squarecdn.com/v1/square.js"
        : "https://sandbox.web.squarecdn.com/v1/square.js";
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      if (window.Square) resolve(window.Square);
      else reject(new Error("Square SDK failed to initialize"));
    };
    script.onerror = () => reject(new Error("Failed to load Square SDK"));
    document.head.appendChild(script);
  });
}

export default function Order() {
  const [form, setForm] = useState<OrderForm>(initialForm);
  const [step, setStep] = useState<"select" | "details" | "payment" | "success">("select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardReady, setCardReady] = useState(false);
  const [cardInstance, setCardInstance] = useState<any>(null);
  const [paymentsInstance, setPaymentsInstance] = useState<any>(null);

  const selectedItems = services.filter((s) => form.selectedServices.includes(s.id));
  const total = selectedItems.reduce((sum, s) => sum + s.price, 0);
  const totalDisplay = `$${(total / 100).toLocaleString()}`;

  function toggleService(id: ServiceId) {
    setForm((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(id)
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id],
    }));
  }

  function updateField(field: keyof OrderForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function canProceedToDetails() {
    return form.selectedServices.length > 0;
  }

  function canProceedToPayment() {
    return (
      form.companyName.trim() !== "" &&
      form.contactName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.existingGsa !== ""
    );
  }

  /* Initialize Square Card when entering payment step */
  useEffect(() => {
    if (step !== "payment" || !SQUARE_APP_ID || !SQUARE_LOCATION_ID) return;

    let cancelled = false;

    async function initSquare() {
      try {
        const Square = await loadSquareSdk();
        if (cancelled) return;

        const payments = Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
        const card = await payments.card();
        if (cancelled) return;

        await card.attach("#square-card-container");
        setPaymentsInstance(payments);
        setCardInstance(card);
        setCardReady(true);
      } catch (err: any) {
        if (!cancelled) {
          setError("Failed to load payment form. Please refresh and try again.");
          console.error("Square init error:", err);
        }
      }
    }

    initSquare();
    return () => {
      cancelled = true;
    };
  }, [step]);

  async function handlePayment() {
    if (!cardInstance) return;
    setLoading(true);
    setError("");

    try {
      const result = await cardInstance.tokenize();
      if (result.status !== "OK") {
        setError("Payment failed. Please check your card details and try again.");
        setLoading(false);
        return;
      }

      // Send token + order details to your backend/Cloudflare Worker
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: result.token,
          amountCents: total,
          currency: "USD",
          order: {
            services: form.selectedServices,
            companyName: form.companyName,
            contactName: form.contactName,
            email: form.email,
            phone: form.phone,
            dunsUei: form.dunsUei,
            existingGsa: form.existingGsa,
            gsaContractNumber: form.gsaContractNumber,
            notes: form.notes,
          },
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Payment processing failed");
      }

      setStep("success");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink min-h-screen">
      <Helmet>
        <title>Order — {BRAND.name}</title>
        <meta
          name="description"
          content="Order GSA services from GSA Managers Inc. Secure checkout powered by Square."
        />
      </Helmet>

      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-warm-100 via-surface to-surface -z-10" />
        <div className="mx-auto w-full max-w-4xl px-5 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-warm-border shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cta"></span>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-light">
                Secure Checkout
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-5xl lg:text-6xl tracking-tight">
              Place Your Order
            </h1>
            <p className="mt-4 text-lg text-ink-light max-w-2xl mx-auto">
              Select your services, enter your details, and check out securely.
            </p>
          </motion.div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-12">
            {(["select", "details", "payment"] as const).map((s, idx) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                    step === s || (["select", "details", "payment"].indexOf(step) > idx)
                      ? "bg-brand text-white shadow-md ring-2 ring-brand/20 ring-offset-2 ring-offset-surface"
                      : "bg-white text-ink-muted border border-warm-border"
                  )}
                >
                  {idx + 1}
                </div>
                <span
                  className={cn(
                    "text-sm font-bold hidden sm:inline uppercase tracking-wider transition-colors",
                    step === s ? "text-brand" : "text-ink-muted"
                  )}
                >
                  {s === "select" ? "Services" : s === "details" ? "Details" : "Payment"}
                </span>
                {idx < 2 && (
                  <div className="w-8 sm:w-16 h-px bg-warm-border mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* ═══ STEP 1: SELECT SERVICES ═══ */}
          {step === "select" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-5">
                {services.map((svc) => {
                  const selected = form.selectedServices.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      className={cn(
                        "p-6 sm:p-8 cursor-pointer rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                        selected
                          ? "border-brand bg-white shadow-elevated ring-1 ring-brand"
                          : "border-warm-border bg-white hover:border-brand/30 hover:shadow-soft"
                      )}
                      onClick={() => toggleService(svc.id)}
                    >
                      {selected && (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
                      )}
                      <div className="flex items-start gap-5 relative z-10">
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors shadow-sm",
                            selected ? "bg-brand text-white" : "bg-surface text-ink-muted border border-warm-border group-hover:bg-brand/5 group-hover:text-brand"
                          )}
                        >
                          <svc.icon size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className={cn(
                              "font-display text-xl font-bold transition-colors",
                              selected ? "text-brand" : "text-ink group-hover:text-brand"
                            )}>
                              {svc.name}
                            </h3>
                            <span className="text-sm font-bold text-ink bg-warm-100 px-3 py-1 rounded-full border border-warm-border whitespace-nowrap">
                              {svc.displayPrice}
                            </span>
                          </div>
                          <p className="text-ink-light leading-relaxed mb-4">{svc.description}</p>
                          <div className="grid gap-2 sm:grid-cols-2 pt-4 border-t border-warm-border/50">
                            {svc.features.map((f) => (
                              <div key={f} className="flex items-start gap-2.5 text-sm font-medium text-ink-light">
                                <CheckCircle2
                                  size={16}
                                  className={selected ? "text-cta shrink-0 mt-0.5" : "text-ink-muted shrink-0 mt-0.5"}
                                />
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors mt-1 shadow-sm",
                            selected
                              ? "border-brand bg-brand"
                              : "border-warm-border bg-white"
                          )}
                        >
                          {selected && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary Bar */}
              {form.selectedServices.length > 0 && (
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-white p-6 sm:p-8 border border-warm-border shadow-elevated gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-sm font-bold uppercase tracking-widest text-ink-muted mb-1">
                      {form.selectedServices.length} service{form.selectedServices.length > 1 ? "s" : ""} selected
                    </p>
                    <p className="text-3xl font-display font-bold text-ink">{totalDisplay}</p>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => setStep("details")}
                    disabled={!canProceedToDetails()}
                    className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow"
                  >
                    Continue to Details
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* ═══ STEP 2: DETAILS ═══ */}
          {step === "details" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-3xl border border-warm-border bg-white p-8 sm:p-10 shadow-elevated relative overflow-hidden">
                {/* Top gradient highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-cta" />
                
                <h2 className="font-display text-2xl font-bold text-ink mb-8">
                  Your Information
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-ink mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={(e) => updateField("contactName", e.target.value)}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="john@acmecorp.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      UEI / DUNS Number
                    </label>
                    <input
                      type="text"
                      value={form.dunsUei}
                      onChange={(e) => updateField("dunsUei", e.target.value)}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Existing GSA Contract? *
                    </label>
                    <select
                      aria-label="Existing GSA Contract?"
                      value={form.existingGsa}
                      onChange={(e) => updateField("existingGsa", e.target.value)}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {form.existingGsa === "yes" && (
                    <div>
                      <label className="block text-sm font-bold text-ink mb-2">
                        GSA Contract Number
                      </label>
                      <input
                        type="text"
                        value={form.gsaContractNumber}
                        onChange={(e) => updateField("gsaContractNumber", e.target.value)}
                        className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                        placeholder="GS-XXF-XXXXX"
                      />
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-ink mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-warm-border bg-surface px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none transition-colors"
                      placeholder="Anything else we should know..."
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-10 rounded-2xl bg-warm-100/50 p-6 sm:p-8 border border-warm-border">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-ink-muted mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {selectedItems.map((svc) => (
                      <div key={svc.id} className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-ink">{svc.name}</span>
                        <span className="font-bold text-brand">{svc.displayPrice}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-warm-border mt-4 pt-4 flex justify-between items-center">
                    <span className="font-bold text-ink">Total Due Today</span>
                    <span className="font-display font-bold text-ink text-2xl">{totalDisplay}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col-reverse sm:flex-row gap-4 justify-between">
                  <Button variant="secondary" onClick={() => setStep("select")} className="w-full sm:w-auto bg-surface">
                    Back to Services
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setStep("payment")}
                    disabled={!canProceedToPayment()}
                    className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow"
                  >
                    Proceed to Payment
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 3: PAYMENT ═══ */}
          {step === "payment" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-3xl border border-warm-border bg-white p-8 sm:p-10 shadow-elevated relative overflow-hidden">
                {/* Top gradient highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-cta" />
                
                <h2 className="font-display text-2xl font-bold text-ink mb-2">
                  Secure Payment
                </h2>
                <p className="text-ink-light mb-8 flex items-center gap-2">
                  <Shield size={16} className="text-cta" />
                  Powered by Square. Your card information is encrypted and never stored on our servers.
                </p>

                {/* Order Summary */}
                <div className="rounded-2xl bg-warm-100/50 p-6 sm:p-8 border border-warm-border mb-8">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p className="font-semibold text-ink mb-1">
                        {selectedItems.map((s) => s.name).join(" + ")}
                      </p>
                      <p className="text-sm text-ink-light">Billed to: <span className="font-medium text-ink">{form.companyName}</span></p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-1">Total Due</p>
                      <p className="font-display font-bold text-ink text-3xl">{totalDisplay}</p>
                    </div>
                  </div>
                </div>

                {/* Square Card Element */}
                {!SQUARE_APP_ID || !SQUARE_LOCATION_ID ? (
                  <div className="rounded-2xl border-2 border-dashed border-warm-border p-10 text-center bg-surface">
                    <ShoppingCart size={40} className="mx-auto text-ink-muted mb-4" />
                    <p className="font-bold text-ink mb-2">
                      Payment processing is being configured.
                    </p>
                    <p className="text-sm text-ink-light">
                      Square credentials will be set via Cloudflare environment variables.
                    </p>
                  </div>
                ) : (
                  <div className="mb-8">
                    <div
                      id="square-card-container"
                      className="min-h-[60px] rounded-xl border border-warm-border p-2 bg-surface shadow-inner"
                    />
                    {!cardReady && (
                      <div className="flex items-center justify-center gap-2 py-6 text-sm font-medium text-ink-light bg-white rounded-lg border border-warm-border/50">
                        <Loader2 size={16} className="animate-spin text-brand" />
                        Loading secure payment form...
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-6 flex items-start gap-3">
                    <Shield size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                )}

                <div className="mt-8 flex flex-col-reverse sm:flex-row gap-4 justify-between">
                  <Button variant="secondary" onClick={() => setStep("details")} className="w-full sm:w-auto bg-surface">
                    Back to Details
                  </Button>
                  <Button
                    size="lg"
                    onClick={handlePayment}
                    disabled={loading || (!cardReady && !!SQUARE_APP_ID)}
                    className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow bg-cta hover:bg-cta-hover text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay {totalDisplay} Securely
                        <Shield size={16} className="ml-2 opacity-80" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="mt-6 text-center text-xs font-medium text-ink-muted">
                  By completing this purchase you agree to {BRAND.name}'s terms of service.
                </p>
              </div>
            </motion.div>
          )}

          {/* ═══ SUCCESS ═══ */}
          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12 px-6"
            >
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-50 mb-8 ring-8 ring-green-50/50">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h2 className="font-display text-4xl font-bold text-ink mb-4">
                Payment Successful!
              </h2>
              <p className="text-lg text-ink-light max-w-md mx-auto mb-3">
                Thank you, <span className="font-bold text-ink">{form.contactName}</span>. We've received your order and will be in touch within 1 business day to kick things off.
              </p>
              <p className="text-sm font-medium text-ink-muted">
                A confirmation receipt has been sent to {form.email}.
              </p>
              
              <div className="mt-12 p-6 rounded-2xl bg-surface border border-warm-border max-w-sm mx-auto">
                <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Next Steps</p>
                <p className="text-sm text-ink-light">Look out for an email from our onboarding team to schedule your kickoff call.</p>
              </div>

              <div className="mt-10">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-brand transition-colors"
                >
                  Return to Homepage
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

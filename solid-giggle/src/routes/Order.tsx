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
    price: 4500_00,
    displayPrice: "Starting at $4,500",
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
    price: 6500_00,
    displayPrice: "$6,500 / year",
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
    <>
      <Helmet>
        <title>Order — {BRAND.name}</title>
        <meta
          name="description"
          content="Order GSA services from GSA Managers Inc. Secure checkout powered by Square."
        />
      </Helmet>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-4xl px-5 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Place Your Order
            </h1>
            <p className="mt-3 text-slate-500">
              Select your services, enter your details, and check out securely.
            </p>
          </motion.div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {(["select", "details", "payment"] as const).map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    step === s || (["select", "details", "payment"].indexOf(step) > idx)
                      ? "bg-brand-blue text-white"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  {idx + 1}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:inline",
                    step === s ? "text-navy" : "text-slate-400"
                  )}
                >
                  {s === "select" ? "Services" : s === "details" ? "Details" : "Payment"}
                </span>
                {idx < 2 && (
                  <div className="w-8 sm:w-16 h-px bg-slate-200 mx-1" />
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
              <div className="grid gap-4">
                {services.map((svc) => {
                  const selected = form.selectedServices.includes(svc.id);
                  return (
                    <Card
                      key={svc.id}
                      className={cn(
                        "p-6 cursor-pointer border-2 transition-all",
                        selected
                          ? "border-brand-blue bg-brand-blue/[0.02]"
                          : "border-transparent hover:border-slate-200"
                      )}
                      onClick={() => toggleService(svc.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                            selected ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-400"
                          )}
                        >
                          <svc.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-display text-lg font-bold text-navy">
                              {svc.name}
                            </h3>
                            <span className="text-sm font-bold text-brand-blue whitespace-nowrap">
                              {svc.displayPrice}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{svc.description}</p>
                          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                            {svc.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                                <CheckCircle2
                                  size={14}
                                  className={selected ? "text-brand-blue" : "text-slate-300"}
                                />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors mt-1",
                            selected
                              ? "border-brand-blue bg-brand-blue"
                              : "border-slate-300 bg-white"
                          )}
                        >
                          {selected && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Order Summary Bar */}
              {form.selectedServices.length > 0 && (
                <div className="mt-8 flex items-center justify-between rounded-lg bg-slate-50 p-5 border border-slate-200">
                  <div>
                    <p className="text-sm text-slate-500">
                      {form.selectedServices.length} service{form.selectedServices.length > 1 ? "s" : ""} selected
                    </p>
                    <p className="text-2xl font-bold text-navy">{totalDisplay}</p>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => setStep("details")}
                    disabled={!canProceedToDetails()}
                  >
                    Continue
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
              <Card className="p-8">
                <h2 className="font-display text-xl font-bold text-navy mb-6">
                  Your Information
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={(e) => updateField("contactName", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      placeholder="john@acmecorp.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      UEI / DUNS Number
                    </label>
                    <input
                      type="text"
                      value={form.dunsUei}
                      onChange={(e) => updateField("dunsUei", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Existing GSA Contract? *
                    </label>
                    <select
                      value={form.existingGsa}
                      onChange={(e) => updateField("existingGsa", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {form.existingGsa === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        GSA Contract Number
                      </label>
                      <input
                        type="text"
                        value={form.gsaContractNumber}
                        onChange={(e) => updateField("gsaContractNumber", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                        placeholder="GS-XXF-XXXXX"
                      />
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue resize-none"
                      placeholder="Anything else we should know..."
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-8 rounded-lg bg-slate-50 p-5 border border-slate-200">
                  <h3 className="text-sm font-bold text-navy mb-3">Order Summary</h3>
                  {selectedItems.map((svc) => (
                    <div key={svc.id} className="flex justify-between text-sm py-1.5">
                      <span className="text-slate-600">{svc.name}</span>
                      <span className="font-medium text-navy">{svc.displayPrice}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between">
                    <span className="font-bold text-navy">Total</span>
                    <span className="font-bold text-navy text-lg">{totalDisplay}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-between">
                  <Button variant="secondary" onClick={() => setStep("select")}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setStep("payment")}
                    disabled={!canProceedToPayment()}
                  >
                    Proceed to Payment
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ═══ STEP 3: PAYMENT ═══ */}
          {step === "payment" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <h2 className="font-display text-xl font-bold text-navy mb-2">
                  Secure Payment
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Powered by Square. Your card information is encrypted and never stored on our servers.
                </p>

                {/* Order Summary */}
                <div className="rounded-lg bg-slate-50 p-5 border border-slate-200 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">
                        {selectedItems.map((s) => s.name).join(" + ")}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">{form.companyName}</p>
                    </div>
                    <p className="text-2xl font-bold text-navy">{totalDisplay}</p>
                  </div>
                </div>

                {/* Square Card Element */}
                {!SQUARE_APP_ID || !SQUARE_LOCATION_ID ? (
                  <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center">
                    <ShoppingCart size={32} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500 mb-1">
                      Payment processing is being configured.
                    </p>
                    <p className="text-xs text-slate-400">
                      Square credentials will be set via Cloudflare environment variables.
                    </p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div
                      id="square-card-container"
                      className="min-h-[60px] rounded-lg border border-slate-200 p-1"
                    />
                    {!cardReady && (
                      <div className="flex items-center justify-center gap-2 py-4 text-sm text-slate-400">
                        <Loader2 size={16} className="animate-spin" />
                        Loading payment form...
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="mt-6 flex gap-3 justify-between">
                  <Button variant="secondary" onClick={() => setStep("details")}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={handlePayment}
                    disabled={loading || (!cardReady && !!SQUARE_APP_ID)}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay {totalDisplay}
                        <Shield size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                  By completing this purchase you agree to {BRAND.name}'s terms of service.
                </p>
              </Card>
            </motion.div>
          )}

          {/* ═══ SUCCESS ═══ */}
          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-50 mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Order Confirmed!
              </h2>
              <p className="text-slate-500 max-w-md mx-auto mb-2">
                Thank you, {form.contactName}. We've received your order and will be in touch
                within 1 business day to get started.
              </p>
              <p className="text-sm text-slate-400">
                A confirmation email has been sent to {form.email}.
              </p>
              <div className="mt-8">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                >
                  Return to Home
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

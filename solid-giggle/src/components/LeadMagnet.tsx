import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileCheck2, Loader2, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "./Button";
import { submitContact } from "../lib/api";

/**
 * The on-site conversion trap: "2026 GSA Compliance & FCP Survival Checklist"
 * email opt-in. Captures the visitor who isn't ready to buy today.
 */
export default function LeadMagnet({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await submitContact({
        name: name.trim() || "Checklist Download",
        email: email.trim(),
        interest: "2026 GSA Compliance & FCP Survival Checklist",
      });
    } catch {
      // Capture failures shouldn't block the visitor from the checklist.
    } finally {
      setLoading(false);
      navigate("/resources/fcp-compliance-checklist");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-ink p-8 md:p-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cta/15 rounded-full blur-3xl" />

      <div className={`relative z-10 ${compact ? "" : "grid gap-10 lg:grid-cols-2 lg:items-center"}`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cta/15 border border-cta/25 mb-5">
            <ShieldAlert size={14} className="text-cta" />
            <span className="text-xs font-bold uppercase tracking-wide text-cta">Free Download</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
            2026 GSA Compliance &amp; FCP Readiness Checklist
          </h3>
          <p className="mt-4 text-white/70 leading-relaxed">
            The same 28-point assessment we run on every schedule we manage. Work through it
            before a Contracting Officer does.
          </p>
        </div>

        <form onSubmit={onSubmit} className={compact ? "mt-6" : ""}>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              aria-label="First name"
              className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              aria-label="Work email"
              className="flex-[1.4] rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-colors"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="mt-4 w-full shadow-md hover:shadow-lg transition-shadow"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <FileCheck2 size={18} className="mr-2" />
                Get the Checklist
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
          <p className="mt-3 text-xs text-white/40 text-center">
            Instant access. No spam — just the checklist and occasional GSA compliance alerts.
          </p>
        </form>
      </div>
    </motion.div>
  );
}

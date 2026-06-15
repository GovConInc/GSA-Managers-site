import { Link } from "react-router-dom";
import { BRAND, LINKS, TRUST_POINTS } from "../lib/constants";
import { Phone, Mail, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* ── Main footer content ── */}
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.svg"
                alt={BRAND.name}
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="font-display text-lg font-bold text-white">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-sm">
              We manage your entire GSA Schedule — modifications, compliance,
              FCP transitions, and catalog maintenance — so your team focuses
              100% on winning contracts.
            </p>

            {/* Trust points */}
            <div className="mt-6 space-y-2">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm text-white/40"
                >
                  <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">
              Services
            </p>
            <div className="space-y-3 text-sm">
              <Link
                to="/services/gsa-contractors#management"
                className="block text-white/60 hover:text-white transition-colors"
              >
                GSA Contract Management
              </Link>
              <Link
                to="/services/gsa-contractors#submission"
                className="block text-white/60 hover:text-white transition-colors"
              >
                GSA Schedule Submission
              </Link>
              <Link
                to="/services/gsa-contractors#fcp"
                className="block text-white/60 hover:text-white transition-colors"
              >
                FCP Transition & Compliance
              </Link>
              <Link
                to="/services/gsa-contractors#new-vendor"
                className="block text-white/60 hover:text-white transition-colors"
              >
                New Vendor Support
              </Link>
              <Link
                to="/pricing"
                className="block text-white/60 hover:text-white transition-colors"
              >
                All Plans & Pricing
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">
              Resources
            </p>
            <div className="space-y-3 text-sm">
              <Link
                to="/intelligence"
                className="block text-white/60 hover:text-white transition-colors"
              >
                Intelligence Hub
              </Link>
              <Link
                to="/intelligence/fas-catalog-platform-transition-guide"
                className="block text-white/60 hover:text-white transition-colors"
              >
                FCP Transition Guide
              </Link>
              <Link
                to="/resources/fcp-compliance-checklist"
                className="block text-white/60 hover:text-white transition-colors"
              >
                FCP Compliance Checklist
              </Link>
              <Link
                to="/about"
                className="block text-white/60 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-white/60 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">
              Contact
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors"
              >
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors"
              >
                <Mail size={14} />
                {BRAND.email}
              </a>
              <div className="flex items-center gap-2.5 text-white/60">
                <MapPin size={14} />
                {BRAND.location}
              </div>
            </div>

            <a
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta text-white px-4 py-2.5 text-sm font-medium transition hover:bg-cta-hover"
            >
              Book a Free Strategy Call
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div className="text-xs text-white/40 font-medium">
            Powered by GSA Support Center LLC
          </div>
        </div>
      </div>
    </footer>
  );
}

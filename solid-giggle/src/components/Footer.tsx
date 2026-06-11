import { Link } from "react-router-dom";
import { BRAND, LINKS, SIGNATURE_STATS } from "../lib/constants";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Signature stats — repeated one last time before the close */}
      <div className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {SIGNATURE_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.svg"
                alt={BRAND.name}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xs">
              We run your GSA Schedule — modifications, compliance, and catalog management — so
              your team focuses 100% on driving revenue.
            </p>
            <a
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cta-hover"
            >
              Book a Free Strategy Call
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">Services</p>
            <div className="space-y-3 text-sm">
              <Link to="/gsa-contract-management" className="block text-white/60 hover:text-white transition-colors">GSA Contract Management</Link>
              <Link to="/gsa-modification-consultant" className="block text-white/60 hover:text-white transition-colors">GSA Modifications</Link>
              <Link to="/fcp-transition-service" className="block text-white/60 hover:text-white transition-colors">FCP Transition &amp; Compliance</Link>
              <Link to="/gsa-schedule-submission" className="block text-white/60 hover:text-white transition-colors">GSA Schedule Submission</Link>
              <Link to="/gsa-contract-management#training" className="block text-white/60 hover:text-white transition-colors">Sales &amp; Admin Training</Link>
              <Link to="/pricing" className="block text-white/60 hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">Intelligence Hub</p>
            <div className="space-y-3 text-sm">
              <Link to="/intelligence/fas-catalog-platform-transition-guide" className="block text-white/60 hover:text-white transition-colors">The 2026 FCP Transition Guide</Link>
              <Link to="/intelligence/gsa-modification-rejected" className="block text-white/60 hover:text-white transition-colors">Why GSA Mods Get Rejected</Link>
              <Link to="/intelligence/in-house-vs-outsourced-gsa-management" className="block text-white/60 hover:text-white transition-colors">In-House vs. Outsourced: True Cost</Link>
              <Link to="/resources/fcp-compliance-checklist" className="block text-white/60 hover:text-white transition-colors">FCP Survival Checklist</Link>
              <Link to="/intelligence" className="block text-white/60 hover:text-white transition-colors">All Articles</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">Company</p>
            <div className="space-y-3 text-sm">
              <Link to="/about" className="block text-white/60 hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" className="block text-white/60 hover:text-white transition-colors">Contact</Link>
              <Link to="/order" className="block text-white/60 hover:text-white transition-colors">Get Started</Link>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4 mt-8">Official GSA Resources</p>
            <div className="space-y-3 text-sm">
              <a href={LINKS.gsaAdvantage} target="_blank" rel="noreferrer" className="block text-white/60 hover:text-white transition-colors">GSA Advantage!</a>
              <a href={LINKS.gsaeBuy} target="_blank" rel="noreferrer" className="block text-white/60 hover:text-white transition-colors">GSA eBuy</a>
              <a href={LINKS.fcpPlatform} target="_blank" rel="noreferrer" className="block text-white/60 hover:text-white transition-colors">FAS Catalog Platform</a>
              <a href={LINKS.gsaELibrary} target="_blank" rel="noreferrer" className="block text-white/60 hover:text-white transition-colors">GSA eLibrary</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">Contact</p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors">
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors">
                <Mail size={14} />
                {BRAND.email}
              </a>
              <div className="flex items-center gap-2.5 text-white/60">
                <MapPin size={14} />
                {BRAND.location}
              </div>
            </div>
          </div>
        </div>
      </div>

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

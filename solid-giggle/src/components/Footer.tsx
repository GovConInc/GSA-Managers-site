import { Link } from "react-router-dom";
import { BRAND, LINKS } from "../lib/constants";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/logo.png"
              alt={BRAND.name}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Expert GSA Schedule consulting — from submission and award to catalog management and ongoing compliance.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Services</p>
            <div className="mt-4 space-y-2.5 text-sm">
              <Link to="/services/gsa-contractors" className="block text-white/70 hover:text-white transition-colors">GSA Schedule Services</Link>
              <Link to="/services/programs" className="block text-white/70 hover:text-white transition-colors">Federal Programs</Link>
              <Link to="/services/compliance-capture" className="block text-white/70 hover:text-white transition-colors">Compliance & Capture</Link>
              <Link to="/services/proposal-writing" className="block text-white/70 hover:text-white transition-colors">Proposal Writing</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Company</p>
            <div className="mt-4 space-y-2.5 text-sm">
              <Link to="/about" className="block text-white/70 hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" className="block text-white/70 hover:text-white transition-colors">Contact</Link>
              <Link to="/enroll" className="block text-white/70 hover:text-white transition-colors">Get Started</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Contact</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                <Mail size={14} />
                {BRAND.email}
              </a>
              <div className="flex items-center gap-2.5 text-white/70">
                <MapPin size={14} />
                {BRAND.location}
              </div>
            </div>

            <a
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue/90"
            >
              Book a Call
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-5 py-5 lg:px-8">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

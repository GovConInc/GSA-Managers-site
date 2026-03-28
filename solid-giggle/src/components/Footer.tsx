import { Link } from "react-router-dom";
import { BRAND, LINKS } from "../lib/constants";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img
              src="/logo.png"
              alt={BRAND.name}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xs">
              Expert GSA Schedule consulting — from submission to ongoing compliance and contract management.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">Services</p>
            <div className="space-y-3 text-sm">
              <Link to="/services/gsa-contractors#submission" className="block text-white/60 hover:text-white transition-colors">GSA MAS Submission</Link>
              <Link to="/services/gsa-contractors#management" className="block text-white/60 hover:text-white transition-colors">Contract Management</Link>
              <Link to="/services/gsa-contractors#new-vendor" className="block text-white/60 hover:text-white transition-colors">New Vendor Special</Link>
              <Link to="/services/gsa-contractors#fcp" className="block text-white/60 hover:text-white transition-colors">FCP Catalog Baseline</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4">Company</p>
            <div className="space-y-3 text-sm">
              <Link to="/about" className="block text-white/60 hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" className="block text-white/60 hover:text-white transition-colors">Contact</Link>
              <Link to="/order" className="block text-white/60 hover:text-white transition-colors">Get Started</Link>
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

            <a
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Book a Call
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-5 lg:px-8">
          <div className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

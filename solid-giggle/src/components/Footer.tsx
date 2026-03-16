import { Link } from "react-router-dom";
import { BRAND, LINKS } from "../lib/constants";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div>
              <img
                src="/logo.png"
                alt="GSA Managers Inc."
                className="h-8 w-auto"
              />
              <div className="mt-2 text-xs text-muted-foreground">{BRAND.tagline}</div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Expert GSA Schedule consulting — from application and award to FCP catalog
              migration, modifications, and ongoing contract management.
            </p>
          </div>

          {/* Information */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Information</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link to="/information/sam-dsbs-fema" className="text-foreground hover:text-primary transition">SAM / DSBS / FEMA</Link>
              <Link to="/information/certification-data" className="text-foreground hover:text-primary transition">Certification Data</Link>
              <Link to="/information/finding-bids" className="text-foreground hover:text-primary transition">Finding Government Bids</Link>
              <Link to="/information/writing-proposals" className="text-foreground hover:text-primary transition">Writing Proposals 101</Link>
              <Link to="/information/contract-vehicles" className="text-foreground hover:text-primary transition">Contract Vehicles 101</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Services</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link to="/services/gsa-contractors" className="text-foreground hover:text-primary transition">GSA Contractors</Link>
              <Link to="/services/programs" className="text-foreground hover:text-primary transition">Programs</Link>
              <Link to="/services/compliance-capture" className="text-foreground hover:text-primary transition">Compliance & Capture</Link>
              <Link to="/services/proposal-writing" className="text-foreground hover:text-primary transition">Proposal Writing</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-foreground hover:text-primary transition">
                <Phone size={16} className="text-muted-foreground" />
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-foreground hover:text-primary transition">
                <Mail size={16} className="text-muted-foreground" />
                {BRAND.email}
              </a>
              <div className="flex items-center gap-3 text-foreground">
                <MapPin size={16} className="text-muted-foreground" />
                {BRAND.location}
              </div>
            </div>

            <a 
              href={LINKS.booking} 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Book a Call
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
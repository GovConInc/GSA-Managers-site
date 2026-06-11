import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { LinkButton } from "./Button";
import { BRAND } from "../lib/constants";
import { cn } from "./cn";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  Shield,
  Wrench,
  FileWarning,
  Award,
} from "lucide-react";

const serviceLinks = [
  {
    label: "GSA Contract Management",
    desc: "6 & 12-month retainers — your GSA back office, handled",
    to: "/gsa-contract-management",
    icon: Shield,
  },
  {
    label: "GSA Modifications",
    desc: "Major & minor mods, submitted in 14 days",
    to: "/gsa-modification-consultant",
    icon: Wrench,
  },
  {
    label: "FCP Transition & Compliance",
    desc: "$499 flat-fee migration + compliance audit",
    to: "/fcp-transition-service",
    icon: FileWarning,
  },
  {
    label: "GSA Schedule Submission",
    desc: "Get on the Schedule — 45-day submission guarantee",
    to: "/gsa-schedule-submission",
    icon: Award,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }
  function scheduleCloseServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }

  const isServiceActive = serviceLinks.some((s) => location.pathname.startsWith(s.to));

  const links = [
    { label: "Pricing", to: "/pricing" },
    { label: "Intelligence Hub", to: "/intelligence" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-warm-border/60 bg-surface/98 shadow-[0_8px_24px_-12px_rgba(23,52,96,0.12)] backdrop-blur-lg"
          : "bg-surface/90 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 lg:px-8 lg:py-4">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.svg"
            alt={BRAND.name}
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] lg:h-11"
          />
        </NavLink>

        <nav className="hidden items-center gap-1 rounded-full border border-warm-border/70 bg-surface/80 p-1.5 shadow-soft backdrop-blur-sm lg:flex">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((s) => !s)}
              aria-expanded={servicesOpen}
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isServiceActive || servicesOpen
                  ? "bg-cta text-white shadow-soft"
                  : "text-ink-light hover:bg-warm-100 hover:text-ink"
              )}
            >
              Services
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-200", servicesOpen && "rotate-180")}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-[420px] -translate-x-1/2 rounded-2xl border border-warm-border bg-white p-3 shadow-elevated">
                {serviceLinks.map((svc) => (
                  <Link
                    key={svc.to}
                    to={svc.to}
                    className="flex items-start gap-3.5 rounded-xl px-4 py-3.5 hover:bg-warm-100/70 transition-colors group/item"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/5 border border-brand/10 group-hover/item:bg-brand group-hover/item:border-brand transition-colors">
                      <svc.icon
                        size={18}
                        className="text-brand group-hover/item:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink group-hover/item:text-brand transition-colors">
                        {svc.label}
                      </p>
                      <p className="text-xs text-ink-light mt-0.5">{svc.desc}</p>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 border-t border-warm-border pt-2">
                  <Link
                    to="/pricing"
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-brand hover:bg-brand/5 transition-colors"
                  >
                    See all services &amp; transparent pricing
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {links.map((x) => (
            <NavLink
              key={x.to}
              to={x.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-cta text-white shadow-soft"
                    : "text-ink-light hover:bg-warm-100 hover:text-ink"
                )
              }
            >
              {x.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${BRAND.phone}`}
            className="flex items-center gap-2 text-sm text-ink-light hover:text-ink transition-colors"
          >
            <Phone size={14} />
            {BRAND.phone}
          </a>
          <LinkButton href="/order" size="sm">
            Get Started
            <ArrowRight size={14} className="ml-1.5" />
          </LinkButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-border bg-surface text-ink shadow-soft lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-warm-border bg-surface lg:hidden">
          <div className="mx-auto w-full max-w-7xl px-6 py-4 space-y-1">
            {/* Mobile services accordion */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((s) => !s)}
              className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-ink hover:bg-warm-100 transition-colors"
            >
              Services
              <ChevronDown
                size={16}
                className={cn("transition-transform duration-200", mobileServicesOpen && "rotate-180")}
              />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-warm-border pl-3">
                {serviceLinks.map((svc) => (
                  <NavLink
                    key={svc.to}
                    to={svc.to}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive ? "text-cta bg-cta/5" : "text-ink-light hover:bg-warm-100"
                      )
                    }
                  >
                    {svc.label}
                  </NavLink>
                ))}
              </div>
            )}

            {links.map((x) => (
              <NavLink
                key={x.to}
                to={x.to}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive ? "text-cta bg-cta/5" : "text-ink hover:bg-warm-100"
                  )
                }
              >
                {x.label}
              </NavLink>
            ))}
            <div className="pt-3 space-y-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 px-4 text-sm text-ink-light"
              >
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <LinkButton href="/order" className="w-full">
                Get Started <ArrowRight size={14} className="ml-1.5" />
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

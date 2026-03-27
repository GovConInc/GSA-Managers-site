import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LinkButton } from "./Button";
import { BRAND, LINKS } from "../lib/constants";
import { cn } from "./cn";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services/gsa-contractors" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt={BRAND.name}
            className="h-10 w-auto"
          />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((x) => (
            <NavLink
              key={x.to}
              to={x.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  isActive
                    ? "text-brand-blue"
                    : "text-navy hover:text-brand-blue"
                )
              }
              end={x.to === "/"}
            >
              {x.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Phone */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={`tel:${BRAND.phone}`}
            className="flex items-center gap-2 text-sm text-navy/70 hover:text-brand-blue transition-colors"
          >
            <Phone size={14} />
            {BRAND.phone}
          </a>
          <LinkButton href="/order" size="md">
            Order Now
          </LinkButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto w-full max-w-7xl px-5 py-4 space-y-1">
            {links.map((x) => (
              <NavLink
                key={x.to}
                to={x.to}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-brand-blue bg-blue-50"
                      : "text-navy hover:bg-slate-50"
                  )
                }
                end={x.to === "/"}
              >
                {x.label}
              </NavLink>
            ))}
            <div className="pt-3 space-y-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 px-4 text-sm text-navy/70"
              >
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <LinkButton href="/order" className="w-full">
                Order Now
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

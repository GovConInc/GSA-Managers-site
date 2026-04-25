import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LinkButton } from "./Button";
import { BRAND } from "../lib/constants";
import { cn } from "./cn";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services/gsa-contractors" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-brand/10 bg-white/96 shadow-[0_10px_30px_-24px_rgba(9,31,102,0.7)] backdrop-blur-md"
          : "bg-white/88 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 lg:px-8 lg:py-4">
        <NavLink to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt={BRAND.name}
            className="h-14 w-auto drop-shadow-[0_8px_12px_rgba(18,107,214,0.18)] transition-transform duration-300 lg:h-16"
          />
        </NavLink>

        <nav className="hidden items-center gap-2 rounded-full border border-brand/10 bg-white/90 p-1.5 shadow-[0_8px_24px_-20px_rgba(9,31,102,0.8)] lg:flex">
          {links.map((x) => (
            <NavLink
              key={x.to}
              to={x.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand text-white shadow-soft"
                    : "text-ink-light hover:bg-surface hover:text-ink"
                )
              }
              end={x.to === "/"}
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
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/15 bg-white text-ink shadow-soft lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-warm-border bg-white lg:hidden">
          <div className="mx-auto w-full max-w-7xl px-6 py-4 space-y-1">
            {links.map((x) => (
              <NavLink
                key={x.to}
                to={x.to}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive ? "text-brand bg-brand/5" : "text-ink hover:bg-surface"
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

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { LinkButton } from "./Button";
import TrustStrip from "./TrustStrip";
import { BRAND, LINKS } from "../lib/constants";

/** Standard service-page hero: promise headline, lede, dual-intent CTAs, trust strip. */
export function ServiceHero({
  eyebrow,
  title,
  accent,
  lede,
  primaryLabel,
  primaryHref,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede: string;
  primaryLabel: string;
  primaryHref: string;
}) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-warm-border shadow-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cta" />
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-light">{eyebrow}</span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {title}
            {accent && <span className="block mt-2 text-cta">{accent}</span>}
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl">{lede}</p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <LinkButton href={primaryHref} size="lg" className="shadow-soft hover:shadow-md transition-shadow">
              {primaryLabel}
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
            <LinkButton
              href={LINKS.booking}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="lg"
              className="bg-white"
            >
              <Phone size={18} className="mr-2 text-ink-light" />
              Talk to a Specialist First
            </LinkButton>
          </div>

          <TrustStrip className="mt-8 justify-start" />
        </motion.div>
      </div>
    </section>
  );
}

/** Sticky buy card for the right rail of service pages. */
export function BuyCard({
  name,
  price,
  priceNote,
  monthlyOption,
  features,
  orderHref,
  ctaLabel = "Buy Now",
}: {
  name: string;
  price: string;
  priceNote?: string;
  monthlyOption?: string;
  features: string[];
  orderHref: string;
  ctaLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="sticky top-28"
    >
      <div className="rounded-2xl border border-warm-border bg-white p-8 shadow-elevated relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-cta" />

        <h3 className="font-display text-lg font-bold text-ink mt-2">{name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold text-ink">{price}</span>
          {priceNote && <span className="text-sm font-medium text-ink-muted">{priceNote}</span>}
        </div>
        {monthlyOption && <p className="mt-1 text-sm font-semibold text-cta">{monthlyOption}</p>}

        <LinkButton href={orderHref} size="lg" className="w-full mt-6 mb-3 shadow-md hover:shadow-lg transition-shadow">
          {ctaLabel}
          <ArrowRight size={18} className="ml-2" />
        </LinkButton>
        <LinkButton
          href={LINKS.booking}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
          size="md"
          className="w-full bg-surface"
        >
          Book a Free Strategy Call
        </LinkButton>

        <div className="mt-7 pt-6 border-t border-warm-border space-y-3">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3 text-sm text-ink-light font-medium">
              <CheckCircle2 size={16} className="text-cta shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** Closing band: stat bar + two-path CTA + risk reversal, used on every service page. */
export function ServiceFinalCta({
  title,
  body,
  primaryLabel,
  primaryHref,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
}) {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white border border-warm-border p-10 md:p-14 text-center shadow-elevated relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">{title}</h2>
            <p className="mt-5 text-ink-light text-lg leading-relaxed mb-9">{body}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <LinkButton href={primaryHref} size="lg" className="shadow-md hover:shadow-lg">
                {primaryLabel}
                <ArrowRight size={18} className="ml-2" />
              </LinkButton>
              <LinkButton
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="secondary"
                className="bg-white"
              >
                <Phone size={18} className="mr-2 text-ink-light" />
                Book a Free Strategy Call
              </LinkButton>
            </div>
            <TrustStrip className="mt-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Service structured data. */
export function ServiceSchema({
  name,
  description,
  price,
  url,
}: {
  name: string;
  description: string;
  price?: string;
  url: string;
}) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name,
          description,
          url: `${BRAND.url}${url}`,
          provider: {
            "@type": "ProfessionalService",
            name: BRAND.name,
            telephone: BRAND.phone,
            email: BRAND.email,
            url: BRAND.url,
          },
          areaServed: "US",
          ...(price
            ? {
                offers: {
                  "@type": "Offer",
                  price,
                  priceCurrency: "USD",
                },
              }
            : {}),
        })}
      </script>
    </Helmet>
  );
}

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import { LinkButton } from "../../components/Button";
import { BRAND, LINKS } from "../../lib/constants";
import SEO, { localBusinessSchema, breadcrumbSchema } from "../../components/SEO";

interface StatePageProps {
  state: string;
  stateAbbr: string;
  cities: string[];
  federalAgencies?: string[];
  customDescription?: string;
}

export default function StatePage({
  state,
  stateAbbr,
  cities,
  federalAgencies = [],
  customDescription,
}: StatePageProps) {
  const title = `GSA Schedule Consulting in ${state} | GSA MAS Contract Help`;
  const description =
    customDescription ??
    `Expert GSA Schedule consulting and GSA MAS Contract assistance throughout ${state}. We help businesses in ${cities.slice(0, 5).join(", ")}, and across the state obtain, manage, and grow federal contracts. 98% approval rate. Call ${BRAND.phone}.`;

  const canonical = `/locations/${stateAbbr.toLowerCase()}`;

  const schema = [
    localBusinessSchema(
      BRAND.name,
      description,
      `https://gsamanagers.com${canonical}`,
      BRAND.phone,
      BRAND.email,
      cities[0],
      stateAbbr
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://gsamanagers.com/" },
      { name: `GSA Schedule Consulting in ${state}`, url: `https://gsamanagers.com${canonical}` },
    ]),
  ];

  const geoKeywords = [
    `GSA Schedule ${state}`,
    `GSA MAS Contract ${state}`,
    `GSA consultants ${state}`,
    `federal contracting ${state}`,
    `government contracts ${state}`,
    `GSA Schedule application ${state}`,
    `GSA contract management ${state}`,
    `SAM.gov registration ${state}`,
    `SBA certification ${state}`,
    `proposal writing ${state}`,
    `federal contractor ${state}`,
    `GSA Advantage ${state}`,
    `GSA eBuy ${state}`,
    `GSA FCP ${state}`,
    `GSA catalog upload ${state}`,
    `GSA modification ${state}`,
    `GSA compliance ${state}`,
    `GSA sales reporting ${state}`,
    `GSA contract renewal ${state}`,
    ...cities.map((c) => `GSA Schedule ${c}`),
    ...cities.map((c) => `GSA consultants ${c}`),
    ...cities.map((c) => `federal contracting ${c}`),
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={geoKeywords}
        schema={schema}
        state={state}
        geoRegion={`US-${stateAbbr}`}
        geoPlacename={`${state}, United States`}
      />

      <div className="bg-surface selection:bg-brand/20 selection:text-ink">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#FEF3E2,transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F0FE,transparent_60%)]" />

          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 border border-cta/20 mb-8">
                <MapPin size={14} className="text-cta" />
                <span className="text-xs font-semibold uppercase tracking-wide text-cta">
                  Serving All of {state}
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                GSA Schedule Consulting
                <span className="block mt-2 text-cta">
                  Across {state}
                </span>
              </h1>

              <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
                Expert GSA MAS Contract assistance for businesses throughout {state}.
                From submission to ongoing compliance — we help you win federal contracts statewide.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <LinkButton href="/services/gsa-contractors" size="lg" className="shadow-soft hover:shadow-md transition-shadow">
                  Explore GSA Services
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="bg-white">
                  <Phone size={18} className="mr-2 text-ink-light" />
                  Free Strategy Call
                </LinkButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CITIES ── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
                Cities We Serve in {state}
              </p>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
                GSA Schedule Help Near You
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cities.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-3 p-4 rounded-xl border border-warm-border bg-white hover:border-cta/40 hover:shadow-soft transition-all"
                >
                  <MapPin size={16} className="text-cta shrink-0" />
                  <span className="font-medium text-ink">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEDERAL AGENCIES ── */}
        {federalAgencies.length > 0 && (
          <section className="bg-surface py-24 lg:py-32">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="grid gap-14 lg:grid-cols-2">
                <div>
                  <h2 className="font-display text-3xl font-bold text-ink mb-6">
                    Federal Agencies in {state}
                  </h2>
                  <p className="text-ink-light leading-relaxed mb-6">
                    {state} is home to numerous federal installations, military bases, and agency offices.
                    A GSA Schedule puts your business on the approved vendor list that these agencies use for procurement.
                    We help {state} contractors position themselves to win work from these and other federal buyers.
                  </p>
                  <ul className="space-y-3">
                    {federalAgencies.map((agency) => (
                      <li key={agency} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-cta shrink-0 mt-0.5" />
                        <span className="text-ink-light">{agency}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-warm-border bg-white p-8 lg:p-10">
                  <h3 className="font-display text-xl font-bold text-ink mb-4">
                    Why {state} Contractors Need a GSA Schedule
                  </h3>
                  <div className="space-y-4 text-ink-light leading-relaxed">
                    <p>
                      The federal government spends over $600 billion annually on contracts, and a significant portion flows through
                      GSA Schedules. For {state} businesses, this represents a massive opportunity — but the application process is complex
                      and the compliance requirements are strict.
                    </p>
                    <p>
                      Our team handles every aspect of your GSA Schedule, from initial submission through ongoing management.
                      We work with contractors across {state} to ensure their schedules remain compliant, competitive, and profitable.
                    </p>
                    <p>
                      Whether you're in {cities[0]}, {cities[1]}, or anywhere else in {state}, we provide the same expert-level
                      service that has earned us a 98% approval rate and 4–6 month average award time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl mb-6">
                Ready to Win Federal Contracts in {state}?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-ink-light leading-relaxed mb-10">
                Book a free strategy call and learn how we can help your {state} business succeed
                with the GSA Multiple Award Schedule.
              </p>
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                <Phone size={18} className="mr-2" />
                Book Your Free Call
              </LinkButton>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

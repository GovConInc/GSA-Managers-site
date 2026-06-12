import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail, CheckCircle2, Award, Shield, Rocket, FileText } from "lucide-react";
import { LinkButton } from "../../components/Button";
import { BRAND, LINKS } from "../../lib/constants";
import SEO, { localBusinessSchema, serviceSchema, breadcrumbSchema } from "../../components/SEO";

interface LocationPageProps {
  city: string;
  state: string;
  stateAbbr: string;
  population?: string;
  nearbyCities?: string[];
  federalAgencies?: string[];
  latitude: string;
  longitude: string;
  geoRegion: string;
  geoPlacename: string;
  customDescription?: string;
}

export default function LocationPage({
  city,
  state,
  stateAbbr,
  population,
  nearbyCities = [],
  federalAgencies = [],
  latitude,
  longitude,
  geoRegion,
  geoPlacename,
  customDescription,
}: LocationPageProps) {
  const title = `GSA Schedule Consulting in ${city}, ${state} | GSA MAS Contract Help`;
  const description =
    customDescription ??
    `Expert GSA Schedule consulting and GSA MAS Contract assistance in ${city}, ${state}. We help local businesses obtain, manage, and grow their federal contracts. 98% approval rate. Call ${BRAND.phone}.`;

  const canonical = `/locations/${city.toLowerCase().replace(/\s+/g, "-")}-${stateAbbr.toLowerCase()}`;

  const schema = [
    localBusinessSchema(BRAND.name, description, `https://gsamanagers.com${canonical}`, BRAND.phone, BRAND.email, city, stateAbbr, latitude, longitude),
    serviceSchema(
      `GSA Schedule Consulting in ${city}, ${state}`,
      `Professional GSA Schedule submission, management, and compliance services for businesses in ${city} and surrounding areas.`,
      `https://gsamanagers.com${canonical}`
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://gsamanagers.com/" },
      { name: `GSA Schedule Consulting in ${city}, ${state}`, url: `https://gsamanagers.com${canonical}` },
    ]),
  ];

  const geoKeywords = [
    `GSA Schedule ${city}`,
    `GSA Schedule ${state}`,
    `GSA MAS Contract ${city}`,
    `GSA consultants ${city}`,
    `federal contracting ${city}`,
    `government contracts ${city}`,
    `GSA Schedule application ${city}`,
    `GSA contract management ${city}`,
    `SAM.gov registration ${city}`,
    `SBA certification ${city}`,
    `proposal writing ${city}`,
    `federal contractor ${city}`,
    `GSA Advantage ${city}`,
    `GSA eBuy ${city}`,
    `GSA FCP ${city}`,
    `GSA catalog upload ${city}`,
    `GSA modification ${city}`,
    `GSA compliance ${city}`,
    `GSA sales reporting ${city}`,
    `GSA contract renewal ${city}`,
    `GSA Schedule ${city} ${state}`,
    `GSA MAS ${city} ${state}`,
    `federal contracting ${city} ${state}`,
    `government contracting ${city} ${state}`,
    `GSA Schedule consultants near me`,
    `GSA Schedule help near me`,
    `GSA contract experts near me`,
    ...nearbyCities.map((c) => `GSA Schedule ${c}`),
    ...nearbyCities.map((c) => `GSA consultants ${c}`),
  ];

  const services = [
    {
      icon: Award,
      title: "GSA MAS Contract Submission",
      desc: `Complete GSA Schedule submission support for ${city} businesses. 45-day guarantee. 98% approval rate.`,
    },
    {
      icon: Shield,
      title: "Annual Contract Management",
      desc: `Ongoing GSA compliance, modifications, and reporting for ${city} contractors. Cancel anytime.`,
    },
    {
      icon: Rocket,
      title: "New Vendor Special",
      desc: `Fast-start package for first-time GSA Schedule holders in ${city}. FCP upload + 90-day management included.`,
    },
    {
      icon: FileText,
      title: "FCP Catalog Baseline",
      desc: `Federal Catalog Platform upload within 30 days. Keep your ${city} business visible on GSA Advantage.`,
    },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={geoKeywords}
        schema={schema}
        city={city}
        state={state}
        geoRegion={geoRegion}
        geoPlacename={geoPlacename}
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
                  Serving {city}, {state}
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                GSA Schedule Consulting
                <span className="block mt-2 text-cta">
                  in {city}, {state}
                </span>
              </h1>

              <p className="mt-8 text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl mx-auto">
                Expert GSA MAS Contract assistance for businesses in {city} and surrounding areas.
                From submission to ongoing compliance — we help you win federal contracts.
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

        {/* ── SERVICES ── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-3">
                Services in {city}
              </p>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
                Full-spectrum GSA support for {city} businesses.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {services.map((svc, idx) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-warm-border bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-elevated hover:border-cta/40 hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cta/10 border border-cta/20 mb-7">
                    <svc.icon size={26} className="text-cta" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-3">{svc.title}</h3>
                  <p className="text-ink-light leading-relaxed">{svc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCAL SIGNALS ── */}
        <section className="bg-surface py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold text-ink mb-6">
                  Why {city} Businesses Choose GSA Managers
                </h2>
                <div className="space-y-4 text-ink-light leading-relaxed">
                  <p>
                    {city} is home to a growing community of federal contractors and businesses looking to enter the government marketplace.
                    Whether you're a small business seeking your first GSA Schedule or an established contractor needing compliance support,
                    our team provides the expertise you need — without the overhead of a full-time government contracts department.
                  </p>
                  <p>
                    We understand the unique challenges facing {city} businesses: navigating SAM.gov registration, selecting the right SINs,
                    preparing compliant proposals, and maintaining ongoing GSA requirements. Our 98% approval rate and 4–6 month average
                    award time speak for themselves.
                  </p>
                  {population && (
                    <p>
                      With a metro population of {population}, {city} represents a significant hub for federal contracting activity
                      in {state}. Our local expertise combined with nationwide GSA knowledge gives you the best of both worlds.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                {nearbyCities.length > 0 && (
                  <div className="rounded-2xl border border-warm-border bg-white p-8">
                    <h3 className="font-display text-lg font-bold text-ink mb-4">
                      Also Serving Nearby Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {nearbyCities.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface border border-warm-border text-sm text-ink-light"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {federalAgencies.length > 0 && (
                  <div className="rounded-2xl border border-warm-border bg-white p-8">
                    <h3 className="font-display text-lg font-bold text-ink mb-4">
                      Federal Agencies Near {city}
                    </h3>
                    <ul className="space-y-2">
                      {federalAgencies.map((agency) => (
                        <li key={agency} className="flex items-center gap-2 text-sm text-ink-light">
                          <CheckCircle2 size={14} className="text-cta shrink-0" />
                          {agency}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl border border-warm-border bg-white p-8">
                  <h3 className="font-display text-lg font-bold text-ink mb-4">Contact {BRAND.name}</h3>
                  <div className="space-y-3 text-sm">
                    <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2.5 text-ink-light hover:text-cta transition-colors">
                      <Phone size={14} />
                      {BRAND.phone}
                    </a>
                    <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-ink-light hover:text-cta transition-colors">
                      <Mail size={14} />
                      {BRAND.email}
                    </a>
                    <div className="flex items-center gap-2.5 text-ink-light">
                      <MapPin size={14} />
                      {BRAND.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                Ready to Get on the GSA Schedule in {city}?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-ink-light leading-relaxed mb-10">
                Book a free strategy call and learn how we can help your {city} business win federal contracts
                through the GSA Multiple Award Schedule.
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

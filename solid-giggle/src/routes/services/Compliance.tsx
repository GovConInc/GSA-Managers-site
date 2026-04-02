import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  AlertTriangle,
  Users,
  Building2,
} from "lucide-react";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const services = [
  {
    name: "SAM.gov Registration",
    icon: Building2,
    description: "The required first step for any federal contractor. We handle your full SAM.gov registration or renewal, including UEI, CAGE code, and all certifications.",
    timeline: "5-7 Business Days",
    critical: true,
  },
  {
    name: "DSBS Profile Setup",
    icon: Users,
    description: "Your Dynamic Small Business Search profile is how contracting officers find you for small business set-asides. We make sure it's complete and visible.",
    timeline: "Ongoing",
    critical: true,
  },
  {
    name: "SBA Certifications",
    icon: Award,
    description: "We prepare and submit your application for 8(a), WOSB, SDVOSB, and HUBZone certifications to open the door to set-aside contracts.",
    timeline: "14-Day Submission",
    critical: true,
  },
  {
    name: "Ongoing Compliance",
    icon: Shield,
    description: "We monitor your registrations and certifications year-round so you never accidentally fall out of compliance.",
    timeline: "Annual",
    critical: false,
  },
];

export default function ServicesCertifications() {
  return (
    <>
      <Helmet>
        <title>Certifications & Compliance — GSA Managers</title>
        <meta name="description" content="SAM.gov registration, DSBS profile setup, and SBA certification services. Stay compliant and unlock set-aside contracts." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-blue">Compliance & Certifications</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                Get Registered. Get Certified. Stay Compliant.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                You can't win federal contracts if you're not registered. You can't access set-aside markets without certifications. We handle the paperwork so you can focus on growing your business.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                  Get a Free Assessment
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
              </div>
            </div>
            <div className="lg:pl-8">
              <Card className="p-8" hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600 shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-lg">Don't Let Compliance Slip</h3>
                    <p className="text-slate-600 mt-2">
                      An expired SAM registration or a missing certification can make you ineligible for an entire year. One mistake can cost you millions in lost opportunities.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy">Our Compliance Services</h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              We get you registered, certified, and keep everything current.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full flex flex-col" hover>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                        <service.icon size={28} />
                      </div>
                      {service.critical && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">Required</span>
                      )}
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-navy">{service.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500 font-semibold">Timeline</div>
                    <div className="font-bold text-brand-blue">{service.timeline}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CERTIFY ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Why It Matters</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
              Certifications Open Doors
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-slate-600 leading-relaxed">
                The federal government is required to award 23% of all contracts to small businesses.
                There are specific targets for WOSB (5%), SDVOSB (5%), and HUBZone (3%).
                That's a multi-billion dollar market where large companies can't compete.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <strong>Smaller Competitive Pool:</strong> Instead of thousands of bidders, you compete against a focused group of certified businesses.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <strong>Direct Awards:</strong> Agencies can award contracts directly to 8(a), SDVOSB, and WOSB firms below certain dollar thresholds — no competition needed.
                  </p>
                </div>
              </div>
            </div>
            <Card className="p-6" hover={false}>
              <h3 className="font-semibold text-slate-800 mb-3">Federal Small Business Goals</h3>
              <div className="space-y-3">
                {[
                  { title: "Small Disadvantaged Business / 8(a)", goal: "13%" },
                  { title: "Women-Owned Small Business", goal: "5%" },
                  { title: "Service-Disabled Veteran-Owned", goal: "5%" },
                  { title: "HUBZone", goal: "3%" },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-700">{item.title}</span>
                      <span className="text-sm font-semibold text-brand-blue">{item.goal}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-brand-blue h-2.5 rounded-full transition-all"
                        style={{ width: `${parseFloat(item.goal) * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-navy py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Compliant?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60 text-lg">
            Schedule a free assessment and we'll tell you exactly which registrations and certifications you need.
          </p>
          <div className="mt-8">
            <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
              Book My Free Assessment
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Award,
  AlertTriangle,
  Users,
  Building2,
  Sparkles
} from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const services = [
  {
    name: "SAM.gov Registration",
    icon: Building2,
    description: "The mandatory first step. We handle your complete SAM.gov registration or renewal, including UEI, CAGE code, and Representations & Certifications.",
    timeline: "5-7 Business Days",
    critical: true
  },
  {
    name: "SBA DSBS Profile Optimization",
    icon: Users,
    description: "We optimize your Dynamic Small Business Search profile, the primary tool contracting officers use to find small businesses for set-asides.",
    timeline: "Ongoing",
    critical: true
  },
  {
    name: "SBA Certification Applications",
    icon: Award,
    description: "We manage the entire application process for 8(a), WOSB, SDVOSB, and HUBZone certifications to unlock set-aside contracts.",
    timeline: "14-Day Submission",
    critical: true
  },
  {
    name: "Managed Compliance",
    icon: Shield,
    description: "We monitor and maintain all your registrations and certifications year-round, so you never risk falling out of compliance.",
    timeline: "Annual Subscription",
    critical: false
  }
];

export default function ServicesCertifications() {
  return (
    <>
      <Helmet>
        <title>Certifications & Compliance Services — {LINKS.name}</title>
        <meta name="description" content="Unlock federal set-aside contracts with our expert SAM.gov registration, DSBS profile optimization, and SBA certification services. Stay compliant and win more." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-blue">Compliance & Certification Services</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">
                The Foundation of Federal Contracting.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Before you can win, you must be compliant. Before you can dominate, you must be certified. We handle the complex paperwork of federal registrations and SBA certifications, transforming compliance from a burden into a competitive advantage.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                  Get My Free Assessment
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href="/information/certification-data" variant="secondary" size="lg">
                  View Certification Data
                </LinkButton>
              </div>
            </div>
            <div className="lg:pl-8">
                <Card className="p-8" hover>
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600 shrink-0">
                            <AlertTriangle size={24}/>
                        </div>
                        <div>
                            <h3 className="font-bold text-brand text-lg">The Compliance Trap</h3>
                            <p className="text-slate-600 mt-2">
                                An expired SAM registration or a missing certification can cost you millions. A single mistake can make you ineligible for an entire year. Don't leave it to chance.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </Section>
      
      {/* ===== SERVICES GRID ===== */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-brand">
                Our Core Compliance Services
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                We offer turnkey solutions to get you registered, certified, and keep you compliant.
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
                            {service.critical && <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">Critical</span>}
                        </div>
                        <h3 className="mt-4 font-bold text-lg text-brand">{service.name}</h3>
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
      </Section>

      {/* ===== WHY CERTIFY ===== */}
      <Section title="Why Certifications Are a Competitive Weapon" kicker="The Set-Aside Advantage">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
                <p className="text-slate-600 leading-relaxed">
                   The federal government is legally mandated to award 23% of all prime contracts to small businesses. Specific goals exist for categories like WOSB (5%), SDVOSB (5%), and HUBZone (3%). This creates a multi-billion dollar protected market where large corporations cannot compete.
                </p>
                <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-500/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700"><strong>Less Competition:</strong> Instead of competing against thousands of companies, you compete against a much smaller pool of certified businesses.</p>
                    </div>
                     <div className="flex items-start gap-3 p-4 bg-green-500/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700"><strong>Sole-Source Awards:</strong> Agencies can award contracts directly to 8(a), SDVOSB, and WOSB firms below certain thresholds—no competition required.</p>
                    </div>
                </div>
            </div>
             <Card className="p-6" hover={false}>
                <h3 className="font-semibold text-slate-800 mb-3">2024 Federal Set-Aside Goals</h3>
                <div className="space-y-3">
                    {[{title: "Small Disadvantaged Business (SDB) / 8(a)", goal: "13%"}, {title: "Women-Owned Small Business (WOSB)", goal: "5%"}, {title: "Service-Disabled Veteran-Owned (SDVOSB)", goal: "5%"}, {title: "HUBZone", goal: "3%"}].map(item => (
                        <div key={item.title}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-slate-700">{item.title}</span>
                                <span className="text-sm font-semibold text-brand-blue">{item.goal}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-brand-blue h-2.5 rounded-full" style={{width: `${parseFloat(item.goal) * 5}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <Section title="Ready to Get Compliant and Certified?" kicker="Take Action">
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Unlock Your Federal Advantage Today.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                Our 14-day fast-track certification service and managed compliance programs are the fastest way to position your company for federal success. Schedule a free assessment to identify your eligibility and build a roadmap.
              </p>
            </div>
            <LinkButton 
              href={LINKS.booking} 
              target="_blank" 
              rel="noreferrer" 
              size="lg"
              className="shrink-0"
            >
              Book My Free Assessment
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}
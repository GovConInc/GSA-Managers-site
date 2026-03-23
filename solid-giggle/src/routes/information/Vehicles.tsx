import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, ExternalLink, Shield } from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const vehicles = [
  {
    name: "GSA MAS",
    fullName: "Multiple Award Schedule",
    desc: "The government's premier commercial marketplace. Getting a GSA Schedule allows agencies to buy from you directly with streamlined procurement.",
    benefits: ["Access to all federal agencies", "20-year contract period", "Exclusive access to GSA eBuy RFQs"],
    link: "https://www.gsa.gov/mas",
    agency: "GSA",
  },
  {
    name: "OASIS+",
    fullName: "One Acquisition Solution for Integrated Services",
    desc: "A best-in-class, multi-agency contract for complex professional services, including technical, management, and advisory services.",
    benefits: ["No ceiling on task orders", "Flexible contract types (CPFF, FFP, T&M)", "Multiple service domains"],
    link: "https://www.gsa.gov/oasis-plus",
    agency: "GSA",
  },
  {
    name: "SEWP VI",
    fullName: "Solutions for Enterprise-Wide Procurement",
    desc: "A major Government-Wide Acquisition Contract (GWAC) for IT products and services, managed by NASA.",
    benefits: ["Over $20B in annual sales", "Fast procurement timeline", "High demand from all agencies"],
    link: "https://www.sewp.nasa.gov/",
    agency: "NASA",
  },
  {
    name: "CIO-SP4",
    fullName: "Chief Information Officer-Solutions and Partners 4",
    desc: "A 10-year, $50B IDIQ for IT solutions and services, managed by NIH, focusing on health and biomedical-related IT.",
    benefits: ["Focus on health IT & research", "Strong small business utilization", "Large-scale task order competitions"],
    link: "https://nitaac.nih.gov/services/cio-sp4",
    agency: "NIH",
  },
];

export default function InformationVehicles() {
  return (
    <>
      <Helmet>
        <title>Contract Vehicles 101 — {LINKS.name}</title>
        <meta name="description" content="Learn about major federal contract vehicles like GSA MAS, OASIS+, SEWP, and CIO-SP4. Understand how getting on the right vehicle can unlock government sales." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Information Hub</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Contract Vehicles 101
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Contract vehicles are the highways of federal procurement. They are pre-competed contracts that allow agencies to buy goods and services much faster. Getting on the right vehicle is often a prerequisite to winning significant work.
            </p>
        </div>
      </Section>
      
      {/* ===== WHAT IS A VEHICLE ===== */}
      <Section className="bg-blue-50">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Why Do Vehicles Matter?
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Instead of running a full and open competition for every purchase, which can take months, agencies can simply issue a "task order" to pre-approved vendors on a contract vehicle. This saves them time and money, making you a more attractive partner.
              </p>
              
              <div className="mt-6 space-y-3">
                {(
                  [
                    "Faster Procurement Cycle for Agencies",
                    "Reduced Competition (Only Vehicle Holders Can Bid)",
                    "Establishes Long-Term Agency Relationships",
                    "Pre-Negotiated Pricing and Terms",
                  ]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-6" hover={false}>
              <h3 className="font-semibold text-slate-800 mb-4">Common Vehicle Types</h3>
              <div className="space-y-4">
                {(
                  [
                    { type: "GWAC", desc: "Government-Wide Acquisition Contract (e.g., SEWP, Alliant)" },
                    { type: "IDIQ", desc: "Indefinite Delivery/Indefinite Quantity (e.g., OASIS+)" },
                    { type: "MAS", desc: "Multiple Award Schedule (The GSA Schedule)" },
                    { type: "BPA", desc: "Blanket Purchase Agreement (For recurring needs)" },
                  ]
                ).map((v) => (
                  <div key={v.type} className="border-l-4 border-blue-500 pl-4 py-1">
                    <div className="font-semibold text-slate-900">{v.type}</div>
                    <div className="text-sm text-slate-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
        </div>
      </Section>

      {/* ===== MAJOR VEHICLES ===== */}
      <Section title="Major Federal Contract Vehicles" kicker="Best-in-Class">
        <div className="grid gap-6 lg:grid-cols-2">
          {vehicles.map((vehicle, idx) => (
            <motion.div
                key={vehicle.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
                <Card className="p-6 h-full flex flex-col" hover>
                    <div className="flex-grow">
                        <div className="flex items-start justify-between">
                            <div>
                            <h3 className="font-bold text-xl text-slate-900">{vehicle.name}</h3>
                            <p className="text-sm text-slate-500 font-medium">{vehicle.fullName}</p>
                            </div>
                            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">
                                {vehicle.agency}
                            </span>
                        </div>
                        <p className="mt-4 text-slate-600">{vehicle.desc}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Key Benefits</div>
                        <ul className="space-y-1.5">
                        {vehicle.benefits.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle size={14} className="text-green-500 shrink-0" />
                            {b}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <a href={vehicle.link} target="_blank" rel="noreferrer noopener" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                        Official Site <ExternalLink size={14} />
                    </a>
                </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* ===== CTA ===== */}
      <Section title="Need Help Getting on the Right Vehicles?" kicker="Vehicle Application Support" dark>
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                We Manage the Entire Application Process.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                Getting on a major contract vehicle is a complex, resource-intensive process. Our team manages the entire lifecycle, from developing your offer package and negotiating with contracting officers to securing the final award.
              </p>
            </div>
            <LinkButton 
              href="/services/gsa"
              size="lg"
              className="shrink-0"
            >
              View Our GSA Services
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}

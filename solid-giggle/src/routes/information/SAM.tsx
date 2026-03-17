import { Helmet } from "react-helmet-async";
import { ExternalLink, CheckCircle, AlertCircle, ArrowRight, Award, Landmark, Bell } from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const registrationSteps = [
    { title: "SAM.gov", description: "The mandatory starting point. This is your primary registration to do business with the federal government.", icon: Award },
    { title: "DSBS", description: "The Dynamic Small Business Search profile. This is how contracting officers find you for set-aside opportunities.", icon: Landmark },
    { title: "FEMA", description: "A supplemental registration required for disaster response contracts. Must be completed before a disaster strikes.", icon: Bell }
];

export default function InformationSAM() {
  return (
    <>
      <Helmet>
        <title>SAM, DSBS & FEMA Registration Guide — {LINKS.name}</title>
        <meta name="description" content="A complete guide to federal contractor registration. Learn how to register on SAM.gov, optimize your DSBS profile, and prepare for FEMA disaster contracts." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Information Hub</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              SAM, DSBS & FEMA Guide
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Federal registration is more than just a checkbox—it's the foundation of your government contracting strategy. This guide breaks down the three key registrations every contractor needs to master.
            </p>
        </div>
      </Section>

      {/* ===== REGISTRATION OVERVIEW ===== */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">
                The Three Pillars of Registration
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                Each system serves a distinct purpose. A complete and optimized profile in all three is essential for maximizing your visibility and eligibility.
            </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {registrationSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full text-center" hover>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
                        <step.icon size={32} />
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 flex-grow">{step.description}</p>
                </Card>
              </motion.div>
            ))}
        </div>
      </Section>
      
      {/* ===== SAM DEEP DIVE ===== */}
      <Section title="SAM.gov: The Official Front Door" kicker="System for Award Management">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
                <p className="text-slate-600 leading-relaxed">
                    The System for Award Management (SAM.gov) is the single government-wide portal for federal contract management. Registration is mandatory and free. This is where you get your Unique Entity ID (UEI), manage your representations and certifications, and become visible to all federal agencies.
                </p>
                <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-green-500/5 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700"><strong>Do:</strong> Renew your registration annually, keep your NAICS codes updated, and ensure your POC is current.</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700"><strong>Don't:</strong> Pay any third-party service to register you. SAM.gov registration is always free.</p>
                    </div>
                </div>
            </div>
            <Card className="p-6" hover={false}>
                <h3 className="font-semibold text-slate-800 mb-3">Key Checklist</h3>
                <ul className="space-y-2">
                    {["Obtain Unique Entity ID (UEI)", "Complete Core Data section", "Fill out Assertions (NAICS codes)", "Complete Reps & Certs", "Designate POCs"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                            <CheckCircle size={16} className="text-blue-600"/>
                            {item}
                        </li>
                    ))}
                </ul>
                <LinkButton href="https://sam.gov" target="_blank" rel="noreferrer" className="mt-6 w-full">
                    Go to SAM.gov <ExternalLink size={16} className="ml-2"/>
                </LinkButton>
            </Card>
        </div>
      </Section>

      {/* ===== DSBS DEEP DIVE ===== */}
      <Section title="DSBS: Your Small Business Marketing Tool" kicker="Dynamic Small Business Search" className="bg-slate-50">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Card className="p-6 order-2 lg:order-1" hover={false}>
                <h3 className="font-semibold text-slate-800 mb-3">Profile Optimization Checklist</h3>
                <ul className="space-y-2">
                    {["Write a keyword-rich Capability Narrative", "List at least 3 relevant Past Performance examples", "Ensure all SBA certifications are displayed", "Include geographic service areas", "Link to your company website"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                            <CheckCircle size={16} className="text-blue-600"/>
                            {item}
                        </li>
                    ))}
                </ul>
                <LinkButton href="https://dsbs.sba.gov" target="_blank" rel="noreferrer" className="mt-6 w-full">
                    Go to DSBS <ExternalLink size={16} className="ml-2"/>
                </LinkButton>
            </Card>
            <div className="order-1 lg:order-2">
                <p className="text-slate-600 leading-relaxed">
                    While SAM.gov is for registration, the SBA's Dynamic Small Business Search (DSBS) is for market research. Contracting officers use this database to find qualified small businesses for set-aside opportunities. A sparse profile is a missed opportunity. Your DSBS profile should function as a detailed digital capability statement.
                </p>
                <div className="mt-6">
                    <Card className="p-6 border-blue-200 bg-white" hover>
                        <h4 className="font-bold text-slate-900">The CO's Perspective</h4>
                        <p className="text-sm text-slate-600 mt-2">
                            "When I have a requirement for a small business, my first stop is DSBS. I search by NAICS code and capability keywords. If a company's profile is empty or doesn't clearly state what they do, I move on to the next one in seconds."
                        </p>
                    </Card>
                </div>
            </div>
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <Section title="Is Your Registration Holding You Back?" kicker="Get Compliant" dark>
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                We Handle the Entire Registration and Optimization Process.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                One mistake in your registration can cost you a multi-million dollar contract. Our team ensures your SAM, DSBS, and FEMA registrations are perfectly compliant and fully optimized to attract contracting officers.
              </p>
            </div>
            <LinkButton 
              href={LINKS.booking} 
              target="_blank" 
              rel="noreferrer" 
              size="lg"
              className="shrink-0"
            >
              Get a Free Registration Review
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}

import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, CheckCircle, FileText, Users, Award, 
  Target, Lightbulb, Eye, Sparkles
} from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const services = [
  {
    id: "full",
    name: "Full Proposal Development",
    icon: FileText,
    price: "$5,000+",
    timeline: "2-4 Weeks",
    description: "Our flagship service. We manage the entire proposal process from RFP decomposition to submission, creating a compliant, compelling, and winning proposal.",
    idealFor: "Complex RFPs, first-time bidders, or teams with limited bandwidth."
  },
  {
    id: "red-team",
    name: "Red Team Review",
    icon: Users,
    price: "$1,500+",
    timeline: "3-5 Days",
    description: "An independent, objective review of your near-final proposal. We score it like a government evaluator to find weaknesses before you submit.",
    idealFor: "Teams who write their own proposals but need an expert quality check."
  },
  {
    id: "past-performance",
    name: "Past Performance Volume",
    icon: Award,
    price: "$1,000+",
    timeline: "1-2 Weeks",
    description: "We help you select, document, and write your past performance narratives to maximize your experience scores.",
    idealFor: "Companies with strong experience that struggles to articulate it effectively."
  },
];

const shipleyPrinciples = [
  {
    principle: "Customer-Focused",
    desc: "Every proposal is written from the evaluator's perspective, not yours. We address their problems, their needs, their hot buttons.",
    icon: Target
  },
  {
    principle: "Compliant & Responsive",
    desc: "We build a compliance matrix for every RFP to ensure every 'shall' statement is addressed. No exceptions.",
    icon: CheckCircle
  },
  {
    principle: "Compelling & Easy to Score",
    desc: "We use win themes, graphics, and clear sectioning to make your proposal easy for evaluators to read, understand, and score highly.",
    icon: Lightbulb
  },
  {
    principle: "Independent Reviews",
    desc: "You can't effectively proofread your own work. Our color team reviews provide the critical independent feedback needed to catch errors.",
    icon: Eye
  }
];

export default function ServicesProposalWriting() {
  return (
    <>
      <Helmet>
        <title>Proposal Writing Services — {LINKS.name}</title>
        <meta name="description" content="Win more government contracts with our professional proposal writing and red team review services. We use the proven Shipley method to create compliant and compelling proposals." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-blue">Proposal Writing Services</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                We Write Proposals That Win.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A winning proposal is more than just good writing—it's a strategic, compliant, and persuasive document engineered to score the most points. We combine our Shipley-certified process with deep federal evaluation experience to create proposals that stand out and win contracts.
              </p>
              <div className="mt-8">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                  Get a Proposal Quote
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
              </div>
            </div>
            <div className="lg:pl-8">
                <Card className="p-8" hover>
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue shrink-0">
                            <Sparkles size={24}/>
                        </div>
                        <div>
                            <h3 className="font-bold text-navy text-lg">The GSA Managers Difference</h3>
                            <p className="text-slate-600 mt-2">
                                Our writers have sat on evaluation panels. We know how proposals are scored and what evaluators look for. We build that insider knowledge into every proposal we touch.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </Section>
      
      {/* ===== OUR APPROACH ===== */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy">
                Our Winning Approach
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                We build every proposal on four key principles derived from the industry-standard Shipley methodology.
            </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shipleyPrinciples.map((item, idx) => (
              <motion.div
                key={item.principle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full text-center" hover>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                        <item.icon size={32} />
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-navy">{item.principle}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* ===== SERVICES ===== */}
      <Section title="Our Proposal Services" kicker="Choose Your Support Level">
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
                <Card className="p-8 h-full flex flex-col" hover>
                    <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue shrink-0">
                                <service.icon size={24} />
                            </div>
                            <h3 className="font-bold text-navy text-lg">{service.name}</h3>
                        </div>
                        <p className="text-slate-600">{service.description}</p>
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="text-xs font-semibold text-slate-500">Ideal For:</div>
                            <div className="text-sm text-slate-800 font-medium">{service.idealFor}</div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="flex justify-between items-baseline">
                            <div>
                                <div className="text-sm text-slate-500">Starting at</div>
                                <div className="font-display text-3xl font-bold text-navy">{service.price}</div>
                            </div>
                            <div>
                                <div className="text-sm text-slate-500">Timeline</div>
                                <div className="font-bold text-brand-blue">{service.timeline}</div>
                            </div>
                        </div>
                         <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" className="w-full mt-4" variant={service.id === 'full' ? 'primary' : 'secondary'}>
                            Get a Quote
                        </LinkButton>
                    </div>
                </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* ===== CTA ===== */}
      <Section title="Have an RFP on Your Desk?" kicker="Let's Win It Together">
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Get a Free, No-Obligation Quote Today.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                Send us your RFP, and we'll provide a detailed scope of work, a fixed-price quote, and a clear timeline within 24 hours. Let our expertise become your competitive advantage.
              </p>
            </div>
            <LinkButton 
              href={LINKS.booking} 
              target="_blank" 
              rel="noreferrer" 
              size="lg"
              className="shrink-0"
            >
              Request My Quote
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}
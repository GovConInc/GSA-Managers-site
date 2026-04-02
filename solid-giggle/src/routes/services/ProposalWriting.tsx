import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Users,
  Award,
  Target,
  Lightbulb,
  Eye,
  Sparkles,
} from "lucide-react";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const services = [
  {
    id: "full",
    name: "Full Proposal Writing",
    icon: FileText,
    timeline: "2-4 Weeks",
    description:
      "We manage the entire proposal from start to finish — breaking down the RFP, writing every section, and submitting a compliant, ready-to-win document.",
    idealFor: "Complex RFPs, first-time bidders, or teams that need extra hands.",
  },
  {
    id: "red-team",
    name: "Red Team Review",
    icon: Users,
    timeline: "3-5 Days",
    description:
      "We review your near-final proposal the way a government evaluator would — scoring it, finding gaps, and telling you exactly what to fix before you submit.",
    idealFor: "Teams that write their own proposals but want an expert second opinion.",
  },
  {
    id: "past-performance",
    name: "Past Performance Volume",
    icon: Award,
    timeline: "1-2 Weeks",
    description:
      "We help you pick the right projects and write them up in a way that maximizes your evaluation score.",
    idealFor: "Companies with strong experience that need help putting it on paper.",
  },
];

const approach = [
  {
    title: "Written for the Evaluator",
    desc: "We write from the reader's perspective. Every sentence addresses what they care about, not what you want to say.",
    icon: Target,
  },
  {
    title: "100% Compliant",
    desc: "We build a compliance checklist for every RFP and make sure every requirement is answered. No gaps, no guessing.",
    icon: CheckCircle,
  },
  {
    title: "Easy to Score",
    desc: "Clear headings, strong themes, and simple language make it easy for evaluators to find what they need and give you high marks.",
    icon: Lightbulb,
  },
  {
    title: "Independent Review",
    desc: "You can't proofread your own work. Our review process catches errors and weak spots before they cost you points.",
    icon: Eye,
  },
];

export default function ServicesProposalWriting() {
  return (
    <>
      <Helmet>
        <title>Proposal Writing — GSA Managers</title>
        <meta name="description" content="Professional government proposal writing and red team reviews. We write compliant, competitive proposals that win contracts." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-blue">Proposal Writing</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                Proposals That Actually Win.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A winning proposal isn't just well-written — it's structured to score high, built to be compliant, and designed to stand out. We combine deep evaluation experience with clear, persuasive writing.
              </p>
              <div className="mt-8">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                  Get a Quote
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
              </div>
            </div>
            <div className="lg:pl-8">
              <Card className="p-8" hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-lg">Why We're Different</h3>
                    <p className="text-slate-600 mt-2">
                      Our writers have sat on evaluation panels. We know how proposals are scored and what makes evaluators say yes. That knowledge goes into every proposal we touch.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR APPROACH ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy">How We Write Winning Proposals</h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              Four principles guide everything we write.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full text-center" hover>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <item.icon size={28} />
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Pick Your Level</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">Our Services</h2>
          </div>

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
                    <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500">Best For</div>
                      <div className="text-sm text-slate-800 font-medium">{service.idealFor}</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Timeline</div>
                      <div className="font-bold text-brand-blue">{service.timeline}</div>
                    </div>
                    <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant={service.id === "full" ? "primary" : "secondary"} size="sm">
                      Get a Quote
                    </LinkButton>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-navy py-20">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Have an RFP? Let's Win It.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60 text-lg">
            Send us your RFP and we'll give you a fixed-price quote and a clear timeline within 24 hours.
          </p>
          <div className="mt-8">
            <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
              Request a Quote
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

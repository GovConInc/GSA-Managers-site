import { Helmet } from "react-helmet-async";
import { ArrowRight, FileText, CheckCircle, AlertTriangle, Users, Award } from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const colorTeams = [
  { name: "Blue Team", phase: "Strategy & Outline Review", color: "bg-blue-600", desc: "Reviews the proposal outline, win themes, and overall solution strategy before significant writing begins." },
  { name: "Pink Team", phase: "Mid-Development Review", color: "bg-pink-500", desc: "Occurs at ~60% draft. Validates that writers are on the right track and the proposal's story is coherent and compelling." },
  { name: "Red Team", phase: "Pre-Submission Evaluation", color: "bg-red-600", desc: "The final dress rehearsal. A team of independent reviewers scores the 90-95% complete proposal exactly as the government evaluator would." },
  { name: "Gold Team", phase: "Final Polish & Pricing", color: "bg-yellow-500", desc: "Reviews the 100% complete proposal, focusing on pricing, final edits, and ensuring all volumes are consistent before submission." },
];

const proposalVolumes = [
    {
      title: "Volume I: Technical Approach",
      icon: FileText,
      items: ["Solution Details", "Management Plan", "Staffing & Key Personnel", "Quality Control Plan", "Past Performance Narratives"],
    },
    {
      title: "Volume II: Pricing",
      icon: FileText,
      items: ["Price Schedule / Cost Buildup", "Labor Category Rates", "Rate Justifications", "Basis of Estimate (BOE)"],
    },
    {
      title: "Volume III: Administrative",
      icon: FileText,
      items: ["SF-33/1449 Forms", "Representations & Certifications", "Subcontracting Plan", "Insurance Certificates"],
    },
];

export default function InformationProposals() {
  return (
    <>
      <Helmet>
        <title>Proposal Writing 101 — {LINKS.name}</title>
        <meta name="description" content="Learn the fundamentals of writing winning government proposals, including the Shipley color team review process and standard proposal structure." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Information Hub</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Proposal Writing 101
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Winning proposals are not just well-written—they are compliant, responsive, and strategically structured. Learn the professional frameworks, like the Shipley color team reviews, that turn good bids into contract awards.
            </p>
        </div>
      </Section>

      {/* ===== COLOR TEAMS ===== */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">
                The Shipley Color Team Review Process
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                The Shipley method is the industry standard for developing complex proposals. It uses a series of "Color Team" reviews at key milestones to identify and fix issues early, dramatically increasing your probability of winning.
            </p>
        </div>
          
        <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-slate-200"></div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {colorTeams.map((team, idx) => (
                <motion.div
                    key={team.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="relative"
                >
                    <div className="flex items-center mb-4">
                        <div className={`w-16 h-16 rounded-full ${team.color} border-8 border-slate-50 flex items-center justify-center`}>
                            <span className="text-white font-bold">{idx + 1}</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="font-bold text-lg text-slate-900">{team.name}</h3>
                            <p className="text-sm font-semibold text-slate-500">{team.phase}</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600">{team.desc}</p>
                </motion.div>
                ))}
            </div>
        </div>
      </Section>

      {/* ===== PROPOSAL STRUCTURE ===== */}
      <Section title="Standard Proposal Structure" kicker="The Three Volumes">
        <div className="grid gap-6 lg:grid-cols-3">
          {proposalVolumes.map((vol, idx) => (
            <motion.div
                key={vol.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
                <Card className="p-6 h-full" hover>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                            <vol.icon size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">{vol.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2">
                        {vol.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                        ))}
                    </ul>
                </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== COMMON MISTAKES ===== */}
      <Section title="Avoid These Common Mistakes" kicker="Critical Errors" className="bg-red-500/5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { mistake: "Non-Compliance", desc: "Ignoring formatting rules, missing required sections, or exceeding page limits. This is the #1 reason for instant disqualification." },
              { mistake: "Generic 'Boilerplate' Content", desc: "Using recycled content that doesn't directly address the customer's specific problems and evaluation criteria." },
              { mistake: "Weak or Irrelevant Past Performance", desc: "Submitting past projects that don't align with the scope of work, proving you can't do the job." },
              { mistake: "Pricing Errors", desc: "Simple math errors, failing to follow pricing templates, or submitting unrealistic numbers that show a lack of understanding." },
              { mistake: "Late Submission", desc: "Missing the deadline by one second is the same as not submitting at all. There are no extensions." },
              { mistake: "No Independent Review", desc: "Failing to have a fresh set of eyes (like a Red Team) review the proposal for errors and clarity before submission." },
            ]).map((item, idx) => (
              <motion.div
                key={item.mistake}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-5 border-red-200 bg-white h-full" hover>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
                            <AlertTriangle size={16}/>
                        </div>
                        <h3 className="font-semibold text-red-800">{item.mistake}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <Section title="Need Professional Proposal Support?" kicker="Our Services" dark>
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                We Write Proposals That Win.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                Our team provides end-to-end proposal management, from creating compliant outlines and writing technical volumes to conducting Red Team reviews and ensuring a perfect, on-time submission.
              </p>
            </div>
            <LinkButton 
              href="/services/proposal-writing"
              size="lg"
              className="shrink-0"
            >
              View Proposal Services
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}

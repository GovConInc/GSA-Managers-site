import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, Award, Building2, Users, Star, TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const certifications = [
  {
    name: "8(a) Business Development",
    icon: Star,
    desc: "A premier SBA program for small disadvantaged businesses, offering sole-source contracts and set-aside competitions.",
    eligibility: "51% owned by socially/economically disadvantaged individuals.",
    marketSize: "$78.3B",
  },
  {
    name: "HUBZone",
    icon: Building2,
    desc: "For businesses in Historically Underutilized Business Zones, offering a 10% price preference.",
    eligibility: "Principal office in a HUBZone, 35% of employees reside in a HUBZone.",
    marketSize: "$17.6B",
  },
  {
    name: "SDVOSB",
    icon: Award,
    desc: "For Service-Disabled Veteran-Owned Small Businesses, with strong preference in VA contracts.",
    eligibility: "51% owned and controlled by one or more service-disabled veterans.",
    marketSize: "$32.8B",
  },
  {
    name: "WOSB / EDWOSB",
    icon: Users,
    desc: "For Women-Owned (and Economically Disadvantaged Women-Owned) Small Businesses.",
    eligibility: "51% owned and controlled by women who are U.S. citizens.",
    marketSize: "$31.7B",
  },
];

const achievementData = [
  { category: "SDB", goal: 13.0, achievement: 12.27, dollars: 78.3 },
  { category: "WOSB", goal: 5.0, achievement: 4.97, dollars: 31.7 },
  { category: "SDVOSB", goal: 5.0, achievement: 5.14, dollars: 32.8 },
  { category: "HUBZone", goal: 3.0, achievement: 2.75, dollars: 17.6 },
];

export default function InformationCertification() {
  return (
    <>
      <Helmet>
        <title>SBA Certification Data — {LINKS.name}</title>
        <meta name="description" content="Explore data on SBA certifications like 8(a), HUBZone, SDVOSB, and WOSB. Learn how set-asides can unlock billions in federal contracts." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Information Hub</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              SBA Certification Data
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              SBA certifications are your key to unlocking billions in set-aside government contracts. By eliminating competition from large businesses, the right certification can dramatically accelerate your federal sales growth.
            </p>
        </div>
      </Section>

      {/* ===== MARKET OPPORTUNITY ===== */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              The Power of Set-Asides: A $160B+ Market
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              Federal agencies are mandated to award a percentage of all contract dollars to small businesses in specific categories. This creates a predictable, protected market for certified companies.
            </p>
        </div>

        <Card className="p-6" hover={false}>
            <h3 className="font-bold text-lg text-slate-900 mb-4">2024 Federal Achievement vs. Goals (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={achievementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="goal" fill="#a1a1aa" name="SBA Goal" />
                <Bar dataKey="achievement" fill="#2563eb" name="Achieved" />
            </BarChart>
            </ResponsiveContainer>
        </Card>
      </Section>

      {/* ===== CERTIFICATIONS OVERVIEW ===== */}
      <Section title="Which Certification Is Right for You?" kicker="SBA Programs">
        <div className="grid gap-6 lg:grid-cols-2">
          {certifications.map((cert, idx) => (
            <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
                <Card className="p-6 h-full flex flex-col" hover>
                    <div className="flex items-start gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 shrink-0">
                        <cert.icon size={28} />
                        </div>
                        <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900">{cert.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{cert.desc}</p>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="text-xs font-semibold text-slate-500">Basic Eligibility</div>
                            <div className="text-sm text-slate-800 font-medium">{cert.eligibility}</div>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="text-sm text-slate-500">2024 Market Size</div>
                        <div className="font-display text-3xl font-bold text-blue-600">{cert.marketSize}</div>
                    </div>
                </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== PROCESS ===== */}
      <Section title="Our 14-Day Fast-Track Certification" kicker="Accelerated Process" className="bg-slate-50">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {([
              { title: "Eligibility Review", desc: "We confirm you qualify and identify the highest-impact certifications for your business.", timeline: "Days 1-2" },
              { title: "Document Collection", desc: "We provide a precise checklist and guide you through gathering all necessary corporate, financial, and personal documents.", timeline: "Days 3-6" },
              { title: "Application Preparation", desc: "Our team completes every form and narrative, ensuring 100% accuracy and compliance with SBA requirements.", timeline: "Days 7-12" },
              { title: "Submission & Follow-Up", desc: "We submit the complete package on your behalf and manage all follow-up communications with the SBA.", timeline: "Days 13-14" },
            ]).map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full" hover>
                    <div className="text-sm font-bold text-blue-600">{item.timeline}</div>
                    <h3 className="font-semibold text-slate-900 mt-1">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
      </Section>
      
      {/* ===== CTA ===== */}
      <Section title="Unlock Your Set-Aside Advantage" kicker="Get Certified" dark>
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Stop Competing. Start Winning.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                The federal government is the largest buyer in the world, and they are mandated to award contracts to businesses like yours. Our 14-day fast-track program is the quickest way to get your seat at the table.
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

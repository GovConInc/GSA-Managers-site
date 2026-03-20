import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Target, TrendingUp, CheckCircle, Zap } from "lucide-react";
import Section from "../components/Section";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

const values = [
  {
    icon: Target,
    title: "GSA Focused",
    description: "We only do GSA Schedules. No distractions, no generic consulting—just deep expertise in what matters to you.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "You work directly with an expert, not a call center or junior staff. Every client gets white-glove support.",
  },
  {
    icon: Award,
    title: "Transparent Pricing",
    description: "No hidden fees, no long-term contracts. You always know exactly what you’re getting and what it costs.",
  },
  {
    icon: Zap,
    title: "Fast, Reliable Results",
    description: "We move quickly, communicate clearly, and deliver on our promises. Your time is valuable—we respect it.",
  },
];



export default function About() {
  return (
    <>
      <Helmet>
        <title>About {BRAND.name} — GSA Schedule & Federal Capture Experts</title>
        <meta name="description" content="Learn about GSA Managers Inc., our story, our values, and the expert team dedicated to helping you succeed in the federal marketplace." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section dark>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-400">About Us</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              We're a Team of Federal Strategists, Not Just Consultants.
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-300 leading-relaxed">
              The GSA Schedule is a powerful tool, but it's worthless if left to gather dust. We exist to transform your schedule from a simple compliance checkbox into your most powerful federal revenue engine.
            </p>
        </div>
      </Section>

      {/* ===== STORY ===== */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Our Story</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">
                Founded on a Singular Focus
              </h2>
              <div className="mt-6 space-y-4 text-slate-600">
                <p>
                  Based in {BRAND.location}, {BRAND.name} was built to solve one problem: too many companies struggle to manage their GSA Schedule effectively. This singular focus means we know the GSA portal, the contracting officers, and the compliance pitfalls better than anyone.
                </p>
                <p>
                  The federal landscape is always shifting—FCP transitions, Mass Mods, new reporting requirements. We handle this complexity, keeping your schedule clean, your catalog current, and your contract ready for opportunities.
                </p>
                <p>
                  Our founder, {BRAND.founder}, has guided companies across dozens of industries through the entire GSA lifecycle. That hands-on experience is the foundation of our process and the core of our guaranteed results.
                </p>
              </div>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
            >
              {([
                { value: "15+", label: "Years Experience" },
                { value: "99%", label: "Approval Rate" },
                { value: "$640M", label: "Largest Win Supported" },
                { value: "500+", label: "Schedules Managed" },
              ]).map((stat) => (
                  <Card key={stat.label} className="p-6 text-center" hover>
                    <div className="font-display text-4xl font-bold text-blue-600">{stat.value}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-700">{stat.label}</div>
                  </Card>
              ))}
            </motion.div>
          </div>
      </Section>

      {/* ===== OUR VALUES ===== */}
      <Section title="Our Core Values" kicker="What We Believe" dark>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="p-6 h-full bg-white/5 border border-white/10 text-center" hover>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
                  <value.icon size={28} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* ===== TEAM ===== */}
      <Section title="Meet Our Leadership" kicker="Expert Team">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, idx) => (
                  <motion.div
                    <Section>
                      <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">About GSA Managers Inc.</p>
                        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">
                          GSA Schedules. No Confusion. No Overpriced Fees.
                        </h2>
                        <div className="mt-6 space-y-4 text-slate-600">
                          <p>
                            We exist for one reason: to make GSA Schedules simple, affordable, and effective for small businesses. No generic consulting, no bait-and-switch—just real expertise and honest support.
                          </p>
                          <p>
                            Our three core services are:
                          </p>
                          <ul className="list-disc list-inside text-left mx-auto max-w-xl">
                            <li><b>GSA Schedule Submissions:</b> Full-service application, eOffer, and award. Award or no fee.</li>
                            <li><b>GSA MAS Contract Management:</b> Ongoing compliance, modifications, and reporting. No long-term contracts.</li>
                            <li><b>New Contractor Special ($999):</b> FCP Baseline Upload & Training. The most affordable way to get started.</li>
                          </ul>
                          <p>
                            You work directly with an expert. We move fast, communicate clearly, and deliver on our promises—every time.
                          </p>
                        </div>
                      </div>
                      <div className="max-w-2xl mx-auto mt-12">
                        <Card className="p-8" hover>
                          <h3 className="font-bold text-slate-900 text-lg mb-2">Why GSA Managers?</h3>
                          <ul className="space-y-3 text-slate-600">
                            {values.map((v) => (
                              <li key={v.title} className="flex items-start gap-3">
                                <v.icon size={20} className="mt-1 text-blue-600" />
                                <div>
                                  <span className="font-semibold text-slate-900">{v.title}:</span> {v.description}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </Section>
                >
                  Book Now
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
              </Card>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}

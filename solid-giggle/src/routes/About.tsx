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
    title: "Results-Driven",
    description: "Our success is measured by your contract wins, not by the hours we bill.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We operate as an integrated part of your team, not just as an external vendor.",
  },
  {
    icon: Award,
    title: "Uncompromising Excellence",
    description: "Every document and submission we produce reflects our deep commitment to quality.",
  },
  {
    icon: Zap,
    title: "Proactive Speed",
    description: "We anticipate changes and move quickly to keep you ahead of the curve.",
  },
];

const team = [
    {
        name: "John Doe",
        title: "Founder & Lead Strategist",
        avatar: "/avatars/team-1.jpg",
        bio: "With over 15 years in federal procurement, John has guided hundreds of companies to their first multi-million dollar contracts and specializes in high-stakes GSA Schedule negotiations."
    },
    {
        name: "Jane Smith",
        title: "Director of Compliance",
        avatar: "/avatars/team-2.jpg",
        bio: "Jane is a certified compliance expert who ensures every application and catalog is flawless. She manages our FCP migration team and maintains a 99% approval rate."
    },
    {
        name: "Alex Johnson",
        title: "Senior Proposal Manager",
        avatar: "/avatars/team-3.jpg",
        bio: "Alex has managed over 200 proposal submissions, from small business set-asides to multi-billion dollar IDIQs. His strategic writing has secured over $640M in contract wins."
    }
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
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Card className="p-6 text-center h-full" hover>
                        <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-slate-100"/>
                        <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                        <p className="text-sm font-semibold text-blue-600">{member.title}</p>
                        <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
                    </Card>
                  </motion.div>
              ))}
          </div>
      </Section>

      {/* ===== CTA ===== */}
      <Section dark>
        <Card
          className="p-8 lg:p-12 bg-white/10 border-white/20"
          hover={false}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                Ready to Work With an Expert Team?
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Let's discuss your GSA goals. Schedule a free, no-obligation strategy call to see how our expertise can translate into your federal success.
              </p>
            </div>
            <div className="lg:pl-8">
              <Card className="p-8 bg-white text-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  Schedule Your Free Strategy Call
                </h4>
                <p className="text-slate-600 mb-6">
                  Get a clear action plan from a team that knows how to win.
                </p>
                <LinkButton
                  href={LINKS.booking}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="w-full"
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

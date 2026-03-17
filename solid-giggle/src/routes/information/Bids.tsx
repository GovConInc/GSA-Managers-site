import { Helmet } from "react-helmet-async";
import { ArrowRight, Search, Globe, Bell, CheckCircle, ExternalLink, AlertCircle, Package, Clock, Target } from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { motion } from "framer-motion";

const searchSources = [
  {
    name: "SAM.gov",
    url: "https://sam.gov",
    desc: "The official source for all federal opportunities over $25,000.",
    icon: Search,
  },
  {
    name: "GSA eBuy",
    url: "https://www.ebuy.gsa.gov",
    desc: "An exclusive portal for GSA Schedule holders to find RFQs.",
    icon: Globe,
  },
  {
    name: "State & Local Portals",
    url: "#state-portals",
    desc: "Each state has its own procurement system for local contracts.",
    icon: Bell,
  },
];

const samNotificationTypes = [
  {
    type: "Sources Sought",
    icon: Search,
    description: "Market research to see who is capable. A major opportunity to influence the final RFP.",
    timeline: "10-20 days to respond",
    winRate: "N/A - Informational",
  },
  {
    type: "Request for Proposal (RFP)",
    icon: Package,
    description: "The formal, competitive solicitation. This is the main event for most large contracts.",
    timeline: "15-30 days to respond",
    winRate: "8-15% win rate",
  },
  {
    type: "Request for Quotation (RFQ)",
    icon: Clock,
    description: "A simplified request, usually for smaller purchases or from GSA eBuy.",
    timeline: "3-5 days to respond",
    winRate: "20-25% win rate",
  },
  {
    type: "Sole Source (J&A)",
    icon: Target,
    description: "The agency justifies awarding to one company without competition. Relationship-driven.",
    timeline: "20-30 days to award",
    winRate: "80-95% win rate",
  },
];

export default function InformationBids() {
  return (
    <>
      <Helmet>
        <title>Finding Government Bids — {LINKS.name}</title>
        <meta name="description" content="Learn how to find government bids on SAM.gov, GSA eBuy, and state portals. Understand RFPs, RFQs, and Sources Sought notices to build a winning pipeline." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Information Hub</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Finding Government Bids
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              Winning starts with finding the right opportunities. Learn where to look, what the different notice types mean, and how to build a pipeline that sets you up for success.
            </p>
        </div>
      </Section>
      
      {/* ===== SEARCH SOURCES ===== */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">
                Where to Find Bids
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
                These are the essential platforms for finding federal, state, and local government contract opportunities.
            </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchSources.map((source, idx) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full" hover>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <source.icon size={28} />
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-slate-900">{source.name}</h3>
                    <p className="mt-2 text-sm text-slate-600 flex-grow">{source.desc}</p>
                    {source.url.startsWith("http") && (
                    <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                        Visit Site <ExternalLink size={14} />
                    </a>
                    )}
                </Card>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* ===== NOTIFICATION TYPES ===== */}
      <Section title="Understanding Notification Types" kicker="Know What You're Bidding On">
        <p className="max-w-3xl text-slate-600 mb-12 text-center mx-auto">
          Every SAM.gov listing represents a different stage of the procurement process. Responding to a "Sources Sought" notice is very different from bidding on an "RFP". Understanding these types is key to an effective capture strategy.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {samNotificationTypes.map((notif, idx) => (
              <motion.div
                key={notif.type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card 
                    key={notif.type} 
                    className="p-6 h-full"
                    hover
                >
                    <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 shrink-0">
                        <notif.icon size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900">{notif.type}</h3>
                        <p className="text-sm text-slate-500">{notif.description}</p>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                            <div className="text-xs text-slate-500 font-semibold">Response Time</div>
                            <div className="text-md font-bold text-slate-800">{notif.timeline}</div>
                        </div>
                        <div className="border-l border-slate-200 h-8"></div>
                        <div>
                            <div className="text-xs text-slate-500 font-semibold">Typical Win Rate</div>
                            <div className="text-md font-bold text-blue-600">{notif.winRate}</div>
                        </div>
                    </div>
                </Card>
              </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== BID/NO-BID ===== */}
      <Section title="The Bid / No-Bid Decision" kicker="Strategy is Everything" className="bg-slate-50">
        <Card className="p-8" hover={false}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Don't Bid on Everything.</h3>
              <p className="mt-4 text-slate-600">
                The biggest mistake new contractors make is the "shotgun approach"—bidding on everything that moves. This drains resources and leads to burnout. A disciplined "Bid / No-Bid" process is critical.
              </p>
              <p className="mt-4 text-slate-600">
                If you haven't influenced the requirements or spoken to the customer before the RFP is released, your probability of winning is statistically less than 10%.
              </p>
            </div>
            
            <div className="bg-slate-100 rounded-xl p-6">
              <h4 className="font-semibold text-slate-800">Key Questions to Ask:</h4>
              <ul className="mt-4 space-y-2">
                {(
                  [
                    "Do we know the customer and their hot buttons?",
                    "Did we help shape the requirements in the 'Sources Sought' phase?",
                    "Do we have directly relevant past performance?",
                    "Is the incumbent contractor vulnerable or entrenched?",
                    "Is the timeline realistic for a quality submission?",
                  ]
                ).map((q, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>
      
      {/* ===== CTA ===== */}
      <Section title="Build a Winning Pipeline" kicker="Capture Management" dark>
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Stop Chasing. Start Winning.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                Our Capture Management service helps you find opportunities early, influence requirements, and build relationships with agencies—long before an RFP is ever released. We deliver a targeted pipeline of winnable bids, not just a list of keyword matches.
              </p>
            </div>
            <LinkButton 
              href={LINKS.booking} 
              target="_blank" 
              rel="noreferrer" 
              size="lg"
              className="shrink-0"
            >
              Build My Pipeline
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}

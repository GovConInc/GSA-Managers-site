import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Shield,
  Zap,
  Calendar,
  Users,
  TrendingUp,
  ChevronRight,
  Upload,
  Award,
  Target,
  DollarSign,
  Star,
  BadgeCheck,
  Layers,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";
import { cn } from "../../components/cn";
import { motion } from "framer-motion";

// ============================================
// GSA MAS SUBMISSION DATA
// ============================================

const timeline = [
  { 
    phase: "Days 1-2", 
    task: "Kickoff Consultation", 
    desc: "Strategy alignment & document gathering roadmap",
    details: [
      "Review your business capabilities and target SINs",
      "Identify required vs optional documents",
      "Establish communication cadence",
      "Set milestone expectations"
    ],
    status: "kickoff"
  },
  { 
    phase: "Days 3-8", 
    task: "Document Collection", 
    desc: "Tax docs, financials, project history compilation",
    details: [
      "Federal tax returns (2 years minimum)",
      "Financial statements & balance sheet",
      "Past performance narratives (3-5 projects)",
      "Commercial price lists or invoices"
    ],
    status: "prep"
  },
  { 
    phase: "Days 9-13", 
    task: "eOffer Preparation", 
    desc: "Building the complete digital offer package",
    details: [
      "SAM.gov registration verification",
      "FAS ID creation and profile setup",
      "SIN selection and justification",
      "eOffer portal navigation and data entry"
    ],
    status: "prep"
  },
  { 
    phase: "Days 14-15", 
    task: "Holy Trinity Review", 
    desc: "Admin, Technical, and Pricing volumes",
    details: [
      "Administrative completeness check",
      "Technical capability validation",
      "Pricing structure verification",
      "Cross-reference all volumes for consistency"
    ],
    status: "review"
  },
  { 
    phase: "Days 16-20", 
    task: "Price & Tech Deep Dive", 
    desc: "Ensuring profitability and compliance",
    details: [
      "Commercial Sales Practice analysis",
      "Price escalation methodology",
      "Labor category descriptions",
      "Technical narrative refinement"
    ],
    status: "review"
  },
  { 
    phase: "Days 21-25", 
    task: "Final Polish", 
    desc: "White glove check for errors and omissions",
    details: [
      "Document formatting standardization",
      "Signature and certification verification",
      "Attachment checklist validation",
      "Pre-submission quality audit"
    ],
    status: "final"
  },
  { 
    phase: "Day 26-30", 
    task: "GSA Submission", 
    desc: "Official submission to Contracting Officer",
    details: [
      "Final eOffer package upload",
      "Confirmation receipt documentation",
      "CO assignment notification",
      "Clarification response preparation"
    ],
    status: "submit"
  },
];

// ============================================
// GSA BENEFITS DATA - HEAVY EMPHASIS
// ============================================

const gsaBenefits = [
  {
    title: "Pre-Vetted Credibility",
    desc: "Agencies trust GSA contractors—you've already passed rigorous government scrutiny",
    icon: BadgeCheck,
    stat: "80%",
    statLabel: "of agencies prefer GSA"
  },
  {
    title: "Streamlined Procurement",
    desc: "Agencies can buy from you in days, not months—no lengthy competitive bidding",
    icon: Zap,
    stat: "90%",
    statLabel: "faster procurement"
  },
  {
    title: "Massive Buying Pool",
    desc: "Access to $50B+ annual federal spending through GSA vehicles",
    icon: DollarSign,
    stat: "$50B+",
    statLabel: "annual spend"
  },
  {
    title: "Reduced Competition",
    desc: "Compete against 1,000s instead of 100,000s—only GSA contractors can bid",
    icon: Target,
    stat: "10X",
    statLabel: "less competition"
  },
  {
    title: "20-Year Contract",
    desc: "Initial 5-year base + three 5-year options = stable, long-term revenue",
    icon: Calendar,
    stat: "20yr",
    statLabel: "contract term"
  },
  {
    title: "GSA Advantage Visibility",
    desc: "Your products/services listed in the government's Amazon—agencies find you",
    icon: TrendingUp,
    stat: "24/7",
    statLabel: "visibility"
  }
];

// ============================================
// CONTRACT MANAGEMENT DATA
// ============================================

const contractManagementServices = [
  {
    title: "Sales Reporting",
    icon: TrendingUp,
    description: "Quarterly IFF reporting and contractor sales data submission",
    tasks: [
      "Calculate Industrial Funding Fee (0.75%)",
      "Submit quarterly sales reports",
      "Maintain transaction records",
      "Resolve discrepancy notices"
    ],
    benefit: "Avoid $10K+ penalties for late/incorrect reporting"
  },
  {
    title: "Catalog Management",
    icon: Layers,
    description: "FCP catalog maintenance and GSA Advantage visibility",
    tasks: [
      "Product/service updates",
      "Pricing modifications",
      "New SIN additions",
      "Catalog refresh submissions"
    ],
    benefit: "Stay visible to buying agencies 24/7"
  },
  {
    title: "Contract Modifications",
    icon: RefreshCw,
    description: "Administrative and technical contract changes",
    tasks: [
      "Address changes",
      "POC updates",
      "Scope expansions",
      "Option year exercises"
    ],
    benefit: "Never miss an option renewal deadline"
  },
  {
    title: "Compliance Audits",
    icon: Shield,
    description: "Proactive compliance monitoring and issue resolution",
    tasks: [
      "TDR monitoring",
      "Price reduction compliance",
      "Audit preparation support",
      "Corrective action plans"
    ],
    benefit: "Prevent contract cancellation and penalties"
  }
];

const managementBenefits = [
  "Free up 10+ hours/month of admin time",
  "Zero compliance violations on managed contracts",
  "Expert handling of CO communications",
  "Proactive issue identification before audits",
  "Option renewals never missed",
  "Dedicated account manager on your side"
];

const faqs = [
  {
    q: "How long does it take to get on the GSA Schedule?",
    a: "With our accelerated process, most clients receive their GSA Schedule within 4-6 months. The industry average is 12+ months. We achieve this through our 'Holy Trinity' review process that anticipates and addresses CO concerns before submission."
  },
  {
    q: "What are the minimum qualifications for GSA?",
    a: "You need 2 years of corporate experience, relevant past performance (typically 3-5 projects), and financial viability demonstrated through tax returns and financial statements. Specific requirements vary by SIN category."
  },
  {
    q: "What's the difference between MAS and OASIS+?",
    a: "MAS (Multiple Award Schedule) is GSA's primary contract vehicle for commercial products and services. OASIS+ is a specialized IDIQ for professional services requiring complex statements of work. We can help determine which is right for you."
  },
  {
    q: "What are the ongoing requirements after award?",
    a: "GSA contractors must submit quarterly sales reports, pay the 0.75% Industrial Funding Fee, maintain catalog pricing, respond to mass modifications, and ensure continued compliance with all terms. Our Contract Management service handles all of this."
  },
  {
    q: "Can you help if I already have a GSA Schedule?",
    a: "Absolutely. We provide ongoing Contract Management for existing GSA holders, including modifications, sales reporting, catalog updates, and compliance support. Many clients come to us after struggling to maintain their schedule on their own."
  }
];

// ============================================
// HERO STATS
// ============================================

const heroStats = [
  { value: "98%", label: "Approval Rate" },
  { value: "4–6mo", label: "Avg. Time to Award" },
  { value: "80+", label: "Active GSA Clients" },
  { value: "$500", label: "FCP Flat Fee" }
];

export default function ServicesGSA() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeManagement, setActiveManagement] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"fcp" | "submission" | "management" | "benefits">("fcp");

  const getStatusColor = (status: string) => {
    switch(status) {
      case "kickoff": return "bg-navy-light";
      case "prep": return "bg-gov-gold";
      case "review": return "bg-navy";
      case "final": return "bg-purple-500";
      case "submit": return "bg-gov-green";
      default: return "bg-slate-400";
    }
  };

  return (
    <>
      <Helmet>
        <title>GSA Schedule Services & FCP Experts | GSA Managers</title>
        <meta name="description" content="Get on the GSA Schedule in 4–6 months with a 99% approval rate. We provide flat-fee FCP Baseline Uploads and full contract management services." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent" />
        
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-semibold text-brand-blue mb-6">
                <Award size={16} />
                GSA Schedule Services
              </div>
              
              <h1 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
                The GSA Schedule.
                <br />
                <span className="text-brand-blue">Done Right. Done Fast.</span>
              </h1>

              <p className="mt-6 text-lg text-slate-700 leading-relaxed">
                We get qualified companies onto the GSA Multiple Award Schedule in 4–6 months — then manage every compliance requirement so you can focus on winning contracts, not paperwork.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" size="lg">
                  Book a Free Consultation
                  <ArrowRight size={18} className="ml-2" />
                </LinkButton>
                <LinkButton href="#services" variant="secondary" size="lg">
                  Explore Services
                </LinkButton>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-red-500/10 via-blue-500/5 to-transparent rounded-3xl blur-lg" />
              
              <Card className="relative p-6 bg-red-600 text-white border-red-700 mb-4 ring-4 ring-red-600/20" hover={false}>
                <div className="absolute -top-3 right-4">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-red-600 shadow-md">
                    ACTION REQUIRED
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-white">SIP Is Retired. FCP Is Mandatory.</h3>
                    <p className="mt-2 text-white/90 text-sm leading-relaxed">
                      Without an FCP Baseline Upload, your catalog is invisible on GSA Advantage. We can fix it in 7 days for a flat fee.
                    </p>
                    <div className="mt-4">
                      <LinkButton
                        href="#fcp-service"
                        className="bg-white text-red-600 hover:bg-slate-100 font-bold inline-flex w-full sm:w-auto"
                      >
                        Restore My Catalog
                        <ArrowRight size={16} className="ml-1.5" />
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {heroStats.slice(0, 2).map(stat => (
                  <Card key={stat.label} className="p-4 bg-white/80 backdrop-blur-sm" hover={false}>
                    <div className="font-display text-3xl font-bold text-brand-blue">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE TABS ===== */}
      <Section id="services" title="A Service for Every Stage of Your GSA Journey" kicker="Our GSA Services">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(
              [
                { id: "fcp", label: "FCP Baseline Upload", icon: Upload, urgent: true },
                { id: "submission", label: "Get on Schedule", icon: FileText },
                { id: "management", label: "Manage & Grow", icon: Shield },
                { id: "benefits", label: "Why GSA?", icon: Star }
              ]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold transition-all w-full sm:w-auto text-sm",
                  activeTab === tab.id
                    ? tab.urgent ? "bg-red-600 text-white shadow-lg ring-4 ring-red-600/20" : "bg-brand-blue text-white shadow-lg ring-4 ring-blue-600/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {tab.urgent && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
        </div>
        
        {/* Render active tab content */}
        <div>
          {/* ... FCP Content ... */}
          {/* ... Submission Content ... */}
          {/* ... Management Content ... */}
          {/* ... Benefits Content ... */}
        </div>
      </Section>

      {/* ... (rest of the page components, using the new modern style) ... */}
    </>
  );
}
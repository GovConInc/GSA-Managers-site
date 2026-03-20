import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, CheckCircle, Clock, Target, Rocket, 
  Calendar, Phone, Mail, TrendingUp, Crown, ChevronDown,
  Zap, Shield, Star, TrendingUp, Check, FileText,
  Users, Database, MessageSquare, ClipboardCheck, Award,
  Building2, Briefcase, Globe, Search, PieChart, 
  ChevronRight, Layers, Handshake, CircleDollarSign,
  Timer, AlertCircle, CheckCheck, Sparkles, ArrowDown,
  Lightbulb, Repeat, Trophy, BookOpen, Compass, Eye,
  BarChart, Send, RefreshCw, Settings, Megaphone
} from "lucide-react";
import { cn } from "../../components/cn";
import { LinkButton } from "../../components/Button";
import { LINKS } from "../../lib/constants";

// ============================================
// THE 5 C's - CORRECT VERSION
// ============================================

const fiveCsData = [
  {
    number: '1',
    name: 'Compliance',
    tagline: 'The Foundation',
    color: 'blue',
    icon: Shield,
    description: "Before you can bid, you must be registered. Before you can get paid, you must be compliant. This is where every federal contractor starts.",
    whatItMeans: "Compliance covers all required registrations, certifications, and ongoing maintenance that keeps you eligible to win and perform on government contracts.",
    elements: [
      { name: 'SAM.gov Registration', desc: 'The federal contractor database — required for all federal contracts' },
      { name: 'DSBS Profile', desc: 'SBA Dynamic Small Business Search — how COs find small businesses' },
      { name: 'FEMA Vendor Portal', desc: 'Emergency response contracting — a $20B+ market most miss' },
      { name: 'SBA Certifications', desc: '8(a), WOSB, SDVOSB, HUBZone — access to set-aside contracts' },
      { name: 'State Registrations', desc: 'State vendor portals and certifications for state/local work' },
      { name: 'Representations & Certifications', desc: 'Annual attestations required to maintain eligibility' },
    ],
    outcome: 'You become visible and eligible to pursue federal contracts.',
  },
  {
    number: '2',
    name: 'Concept',
    tagline: 'Build the Plan',
    color: 'emerald',
    icon: Lightbulb,
    description: "Before you pursue, you need a plan. Who are you? What do you sell? Who buys it? How do you stand out? This phase builds your strategic foundation.",
    whatItMeans: "Concept is about defining your value proposition, target market, and go-to-market strategy for federal contracting.",
    elements: [
      { name: 'Capabilities Statement', desc: 'Your federal business card — the #1 marketing document' },
      { name: 'Target Agency Analysis', desc: 'Which agencies buy what you sell and how much they spend' },
      { name: 'NAICS & PSC Strategy', desc: 'Proper classification determines what you can bid on' },
      { name: 'Competitive Positioning', desc: 'How you differentiate against incumbents and competitors' },
      { name: 'Pricing Strategy', desc: 'Understanding government pricing structures and expectations' },
      { name: 'Past Performance Mapping', desc: 'Translating commercial experience into federal relevance' },
    ],
    outcome: 'You have a clear strategy and professional materials to pursue opportunities.',
  },
  {
    number: '3',
    name: 'Capture',
    tagline: 'Find Opportunities',
    color: 'rose',
    icon: Target,
    description: "Now you hunt. Capture is the systematic process of finding opportunities, qualifying them, and positioning to win — before the RFP even drops.",
    whatItMeans: "Capture management is about building a pipeline of qualified opportunities and executing pre-RFP activities to maximize win probability.",
    elements: [
      { name: 'Opportunity Identification', desc: 'Finding opportunities across 2,200+ bid sources' },
      { name: 'Bid/No-Bid Analysis', desc: 'Qualifying opportunities worth your time and resources' },
      { name: 'Competitive Intelligence', desc: 'Understanding incumbents, competitors, and pricing' },
      { name: 'Pre-RFP Positioning', desc: 'Shaping requirements and building relationships early' },
      { name: 'Pipeline Management', desc: 'Tracking opportunities from identification to award' },
      { name: 'Teaming Strategy', desc: 'Finding partners to strengthen your position' },
    ],
    outcome: 'You have a qualified pipeline of opportunities you can actually win.',
  },
  {
    number: '4',
    name: 'Compete',
    tagline: 'Win the Work',
    color: 'amber',
    icon: Trophy,
    description: "The RFP drops. Now you compete. This is proposal development, pricing, reviews, and submission — the make-or-break moment.",
    whatItMeans: "Compete is the proposal phase — turning your positioning into a winning submission that scores highest against evaluation criteria.",
    elements: [
      { name: 'Proposal Management', desc: 'End-to-end coordination of the proposal process' },
      { name: 'Technical Writing', desc: 'Compelling solutions that address every requirement' },
      { name: 'Pricing Development', desc: 'Competitive pricing that protects your margins' },
      { name: 'Compliance Review', desc: 'Ensuring you answer every requirement completely' },
      { name: 'Red Team Reviews', desc: 'Simulating government evaluation to find weaknesses' },
      { name: 'Production & Submission', desc: 'Final packaging and on-time delivery' },
    ],
    outcome: 'You submit winning proposals that score highest and get awarded.',
  },
  {
    number: '5',
    name: 'Continue',
    tagline: 'Sustain & Grow',
    color: 'purple',
    icon: Repeat,
    description: "You won. Now perform, maintain compliance, and set up for recompetes. Continuity keeps you in the game long-term.",
    whatItMeans: "Continue is about contract performance, compliance maintenance, and positioning for follow-on work and recompetes.",
    elements: [
      { name: 'Contract Compliance', desc: 'Meeting all contractual and regulatory requirements' },
      { name: 'Registration Renewals', desc: 'Keeping SAM.gov, certs, and profiles current' },
      { name: 'Performance Documentation', desc: 'Building past performance for future bids' },
      { name: 'Recompete Positioning', desc: 'Starting capture 18 months before contract ends' },
      { name: 'Contract Modifications', desc: 'Adding scope, extending periods, adjusting terms' },
      { name: 'Growth Strategy', desc: 'Expanding into new agencies and contract vehicles' },
    ],
    outcome: 'You build a sustainable federal practice that grows year over year.',
  },
];

const processSteps = [
  { step: 1, title: 'Get Compliant', desc: 'Registrations & Certs', color: 'blue' },
  { step: 2, title: 'Build Concept', desc: 'Strategy & Materials', color: 'emerald' },
  { step: 3, title: 'Capture Opps', desc: 'Pipeline & Intelligence', color: 'rose' },
  { step: 4, title: 'Compete & Win', desc: 'Proposals & Awards', color: 'amber' },
  { step: 5, title: 'Continue Growing', desc: 'Perform & Expand', color: 'purple' },
];

// ============================================
// MARKETING PROGRAMS DATA - EXPANDED
// ============================================

const marketingPrograms = [
  {
    id: 'fedstart',
    name: 'FedStart',
    tagline: 'Your Compliance Foundation',
    duration: '3 Months',
    price: 3200,
    icon: Rocket,
    gradient: 'from-blue-600 to-blue-800',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    bg: 'bg-blue-600',
    idealFor: 'New contractors entering the federal market',
    overview: 'Everything you need to become a qualified, visible federal contractor. We handle all your registrations, certifications, and create your first marketing foundation — so you can start pursuing contracts within 30 days.',
    csCoverage: [
      { c: 'Compliance', level: 'Full' },
      { c: 'Concept', level: 'Foundation' },
    ],
    keyMetrics: [
      { metric: '5 Days', label: 'SAM.gov Registration' },
      { metric: '14 Days', label: 'SBA Cert Submission' },
      { metric: '1,000', label: 'Marketing Contacts' },
      { metric: 'Monthly', label: 'Strategy Calls' },
    ],
    deliverables: [
      {
        category: 'Compliance Services',
        icon: Shield,
        items: [
          { 
            name: 'SAM.gov Registration & Optimization', 
            timeline: '5 Business Days',
            description: 'Complete System for Award Management registration including CAGE code acquisition, UEI validation, entity information, NAICS code selection, and profile optimization.',
            details: [
              'Entity registration and validation',
              'CAGE code acquisition',
              'NAICS code strategy (up to 10 codes)',
              'Goods/services classification',
              'Core data optimization for searchability',
              'Representations and certifications',
            ]
          },
          { 
            name: 'DSBS Profile Creation', 
            timeline: '14 Business Days',
            description: 'SBA Dynamic Small Business Search profile — the database contracting officers are required to check before making awards under $250K.',
            details: [
              'Profile creation and optimization',
              'Capability narrative development',
              'Keyword optimization for searches',
              'Certification linkage',
              'Search ranking improvement',
            ]
          },
          { 
            name: 'FEMA Vendor Portal Registration', 
            timeline: '14 Business Days',
            description: 'Access to FEMA emergency response contracting — a massive market most contractors completely miss.',
            details: [
              'Vendor portal registration',
              'Capability documentation',
              'Emergency response classification',
              'Geographic coverage setup',
            ]
          },
          { 
            name: 'SBA Certification Submissions', 
            timeline: '14 Days to Submit',
            description: 'We analyze your eligibility and submit applications for every SBA certification you qualify for.',
            details: [
              'Eligibility analysis for all programs',
              '8(a) Business Development application',
              'WOSB/EDWOSB certification',
              'SDVOSB/VOSB certification',
              'HUBZone certification',
              'Documentation preparation',
              'Application submission and tracking',
            ]
          },
        ]
      },
      {
        category: 'Concept Development',
        icon: Lightbulb,
        items: [
          { 
            name: 'Professional Capabilities Statement', 
            timeline: 'Weeks 2-3',
            description: 'The single most important marketing document in federal contracting. Professionally designed to make an impression in 30 seconds.',
            details: [
              'Professional graphic design',
              'Core competency articulation',
              'Differentiator identification',
              'Past performance formatting',
              'Certification and contact display',
              'Print-ready and digital versions',
              'Editable template for updates',
            ]
          },
          { 
            name: 'Marketing Strategy Document', 
            timeline: 'Week 4',
            description: 'Your attack plan. Which agencies, which opportunities, which approach — customized to your capabilities.',
            details: [
              'Target agency identification (top 10)',
              'Agency spend analysis',
              'Competitor landscape overview',
              'Approach strategy recommendations',
              'Introduction templates',
              'Timeline and milestones',
            ]
          },
          { 
            name: '1,000 Targeted Contacts', 
            timeline: 'Week 4',
            description: 'Curated contact list of contracting officers, small business specialists, and program managers at your target agencies.',
            details: [
              '400 Contracting Officers',
              '200 Small Business Specialists',
              '200 Program Managers',
              '200 Prime Contractors',
              'Contact verification',
              'Agency and role mapping',
            ]
          },
        ]
      },
      {
        category: 'Ongoing Support',
        icon: MessageSquare,
        items: [
          { 
            name: 'Monthly Capture Calls', 
            timeline: 'Months 1-3',
            description: 'Standing strategy sessions to review progress, answer questions, and adjust approach.',
            details: [
              '60-minute monthly calls',
              'Opportunity review',
              'Strategy adjustments',
              'Q&A sessions',
              'Introduction facilitation',
            ]
          },
          { 
            name: 'One RFP Review', 
            timeline: 'When Ready',
            description: 'Professional review of your first proposal before submission.',
            details: [
              'Compliance matrix verification',
              'Technical approach review',
              'Pricing sanity check',
              'Narrative strengthening',
              'Submission checklist',
            ]
          },
        ]
      },
    ],
    timeline: [
      { phase: 'Week 1', title: 'Kickoff & SAM.gov', items: ['Initial consultation & document collection', 'SAM.gov registration submitted', 'CAGE code initiated'] },
      { phase: 'Week 2', title: 'Registrations & Certs', items: ['DSBS profile created', 'FEMA portal registration', 'SBA certification applications submitted'] },
      { phase: 'Weeks 3-4', title: 'Marketing Foundation', items: ['Capabilities statement design', 'Marketing strategy document', '1,000 contacts delivered'] },
      { phase: 'Months 2-3', title: 'Ongoing Support', items: ['Monthly strategy calls', 'Opportunity guidance', 'RFP review when ready'] },
    ],
    notIncluded: [
      'Federal Bid Portal access',
      'Marketing campaign execution',
      'Multiple proposal reviews',
      'Dedicated capture management',
    ],
    upgradeNote: 'Upgrade to Growth anytime — full FedStart investment applies as credit.',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Scale Your Pipeline',
    duration: '6 Months',
    price: 6500,
    icon: TrendingUp,
    gradient: 'from-rose-600 to-rose-800',
    bgLight: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-200',
    bg: 'bg-rose-600',
    popular: true,
    idealFor: 'Contractors ready to actively pursue and win contracts',
    overview: 'You have your foundation — now it\'s time to hunt. Growth adds the tools, data, and campaigns you need to build a real pipeline and start winning. Most clients see their first contract wins during this program.',
    includesPrevious: 'FedStart',
    csCoverage: [
      { c: 'Compliance', level: 'Full' },
      { c: 'Concept', level: 'Full' },
      { c: 'Capture', level: 'Full' },
      { c: 'Compete', level: 'Reviews' },
    ],
    keyMetrics: [
      { metric: '2,200+', label: 'Bid Sources' },
      { metric: '2,000', label: 'Campaign Contacts' },
      { metric: 'Unlimited', label: 'RFP Reviews' },
      { metric: '6 Months', label: 'Portal Access' },
    ],
    deliverables: [
      {
        category: 'Everything in FedStart',
        icon: CheckCheck,
        items: [
          { 
            name: 'Complete FedStart Package', 
            timeline: 'Month 1',
            description: 'All compliance services, concept development, and support from FedStart included.',
            details: [
              'SAM.gov, DSBS, FEMA registrations',
              'SBA certification submissions',
              'Capabilities statement',
              'Marketing strategy + 1,000 contacts',
              'Monthly support calls',
            ]
          },
        ]
      },
      {
        category: 'Capture Tools & Intelligence',
        icon: Target,
        items: [
          { 
            name: 'Federal Bid Portal Access', 
            timeline: '6 Months',
            description: 'Stop checking 50 different websites. Our portal aggregates 2,200+ federal and state bid sources into one searchable interface.',
            details: [
              'Full portal access (6 months)',
              '2,200+ bid source aggregation',
              'Custom search filter setup',
              'Daily bid alert configuration',
              'Award data and history',
              'Competitor tracking',
              'Forecast data access',
              'Training session included',
            ]
          },
          { 
            name: 'Daily Bid Alerts', 
            timeline: 'Automated',
            description: 'Wake up every morning to a curated list of opportunities matching your capabilities.',
            details: [
              'Customized to your NAICS codes',
              'Filtered by agency preferences',
              'Set-aside matching',
              'Geographic filtering',
              'Delivered to your inbox daily',
            ]
          },
          { 
            name: 'Opportunity Qualification Support', 
            timeline: 'Ongoing',
            description: 'We help you decide which opportunities to pursue and which to skip.',
            details: [
              'Bid/no-bid analysis framework',
              'Win probability assessment',
              'Competitive landscape review',
              'Resource requirement estimation',
            ]
          },
        ]
      },
      {
        category: 'Marketing Campaigns',
        icon: Megaphone,
        items: [
          { 
            name: '2 Email Marketing Campaigns', 
            timeline: 'Months 2 & 4',
            description: 'Professional outreach campaigns targeting contracting officers and prime contractors. These aren\'t spam blasts — they\'re strategic introductions that generate meetings.',
            details: [
              'Campaign strategy development',
              '1,000 contacts per campaign (2,000 total)',
              'Target list curation and verification',
              'Email copy and design',
              'Campaign execution from your domain',
              'Open/click/reply tracking',
              'Response handling guidance',
              'Performance reporting',
            ]
          },
          { 
            name: 'Prime Contractor Targeting', 
            timeline: 'Months 2-6',
            description: '40% of federal dollars flow through primes to subs. We identify primes who need your capabilities.',
            details: [
              'Prime contractor identification',
              'Subcontracting opportunity research',
              'Introduction facilitation',
              'Teaming agreement guidance',
              'Mentor-protégé exploration',
            ]
          },
        ]
      },
      {
        category: 'Proposal Support',
        icon: FileText,
        items: [
          { 
            name: 'Unlimited Gold Team RFP Reviews', 
            timeline: 'As Needed',
            description: 'Every proposal you submit gets a professional review. Our team evaluates your submission exactly like government evaluators would.',
            details: [
              'Unlimited reviews during 6 months',
              'Compliance matrix verification',
              'Technical approach evaluation',
              'Pricing review',
              'Strengths/weaknesses report',
              'Specific fix recommendations',
              'Debrief call after each review',
              '3-5 day turnaround',
            ]
          },
        ]
      },
      {
        category: 'Ongoing Support',
        icon: MessageSquare,
        items: [
          { 
            name: 'Regular Strategy Sessions', 
            timeline: 'Monthly',
            description: 'Standing meetings throughout the engagement to review pipeline, adjust strategy, and keep momentum.',
            details: [
              'Monthly 60-minute calls',
              'Pipeline review',
              'Campaign performance analysis',
              'Strategy adjustments',
              'Q&A and guidance',
            ]
          },
        ]
      },
    ],
    timeline: [
      { phase: 'Month 1', title: 'Foundation + Portal', items: ['Complete FedStart deliverables', 'Portal access and training', 'Search filters configured', 'Daily alerts activated'] },
      { phase: 'Month 2', title: 'Campaign 1 Launch', items: ['First campaign strategy', 'Target list curation (1,000)', 'Campaign execution', 'Begin opportunity pursuit'] },
      { phase: 'Months 3-4', title: 'Active Pursuit', items: ['Proposal reviews as needed', 'Opportunity qualification', 'Prime contractor outreach', 'Pipeline building'] },
      { phase: 'Month 4-5', title: 'Campaign 2 Launch', items: ['Second campaign strategy', 'New target list (1,000)', 'Campaign execution', 'Continued pursuit'] },
      { phase: 'Month 6', title: 'Acceleration', items: ['Pipeline review', 'Strategy refinement', 'Transition planning', 'Upgrade discussion'] },
    ],
    notIncluded: [
      'Dedicated capture manager',
      'Full proposal writing',
      'Quarterly campaigns',
      'Year-round compliance management',
    ],
    upgradeNote: 'Upgrade to Prime anytime — full Growth investment applies as credit.',
  },
  {
    id: 'prime',
    name: 'Prime',
    tagline: 'Full-Service Partnership',
    duration: '12 Months',
    price: 15500,
    icon: Crown,
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    bg: 'bg-amber-500',
    idealFor: 'Serious contractors committed to building a federal practice',
    overview: 'We become your business development team. Dedicated capture management, quarterly campaigns, up to 5 full proposal developments, and year-round compliance. This is for contractors who are serious about winning.',
    includesPrevious: 'Growth',
    csCoverage: [
      { c: 'Compliance', level: 'Full + Managed' },
      { c: 'Concept', level: 'Full + Ongoing' },
      { c: 'Capture', level: 'Dedicated' },
      { c: 'Compete', level: 'Full Proposals' },
      { c: 'Continue', level: 'Full' },
    ],
    keyMetrics: [
      { metric: 'Dedicated', label: 'Capture Manager' },
      { metric: '5', label: 'Full Proposals' },
      { metric: '4', label: 'Campaigns/Year' },
      { metric: 'Same Day', label: 'Response Time' },
    ],
    deliverables: [
      {
        category: 'Everything in Growth',
        icon: CheckCheck,
        items: [
          { 
            name: 'Complete Growth Package', 
            timeline: 'Included',
            description: 'All FedStart and Growth services included as your foundation.',
            details: [
              'All compliance registrations',
              'Capabilities statement and strategy',
              'Federal Bid Portal (12 months)',
              'Daily bid alerts',
              '2 marketing campaigns',
              'Unlimited RFP reviews',
            ]
          },
        ]
      },
      {
        category: 'Dedicated Capture Management',
        icon: PieChart,
        items: [
          { 
            name: 'Dedicated Capture Manager', 
            timeline: '12 Months',
            description: 'Your own capture manager who builds and maintains your opportunity pipeline. This is like having a full-time BD person without the salary.',
            details: [
              'Named capture manager assigned',
              'Weekly pipeline updates',
              'Opportunity identification and qualification',
              'Pre-RFP intelligence gathering',
              'Agency relationship mapping',
              'Win probability assessments',
              'Bid/no-bid recommendations',
              '30-50 opportunities tracked',
              '10-15 qualified pursuits active',
            ]
          },
          { 
            name: 'Pipeline Dashboard', 
            timeline: 'Always Current',
            description: 'Living pipeline spreadsheet tracking every opportunity from identification through award.',
            details: [
              'Real-time opportunity tracking',
              'Stage progression monitoring',
              'Action item management',
              'Win/loss tracking',
              'Forecast reporting',
            ]
          },
        ]
      },
      {
        category: 'Quarterly Marketing Campaigns',
        icon: Megaphone,
        items: [
          { 
            name: '4 Full Marketing Campaigns', 
            timeline: 'Q1, Q2, Q3, Q4',
            description: 'Sustained market presence with quarterly campaigns targeting different verticals and audiences throughout the year.',
            details: [
              'Q1: Fiscal year planning targeting',
              'Q2: Mid-year budget spending',
              'Q3: Year-end use-it-or-lose-it',
              'Q4: Next year positioning',
              'Full reply management included',
              'Meeting scheduling support',
              'Campaign performance reporting',
              'Year-over-year optimization',
            ]
          },
        ]
      },
      {
        category: 'Full Proposal Development',
        icon: FileText,
        items: [
          { 
            name: 'Up to 5 Complete Proposals', 
            timeline: 'As Opportunities Arise',
            description: 'We don\'t just review — we write. Complete proposal development from RFP analysis through submission-ready package. This alone is worth $25,000+.',
            details: [
              '5 full proposal developments included',
              'RFP analysis and compliance matrix',
              'Win theme development',
              'Technical approach writing',
              'Management plan development',
              'Past performance volume',
              'Pricing strategy and development',
              'Graphics and visual elements',
              'Red team review',
              'Final production and formatting',
              '10-14 day typical turnaround',
            ]
          },
        ]
      },
      {
        category: 'Year-Round Compliance',
        icon: Shield,
        items: [
          { 
            name: 'Compliance Management', 
            timeline: 'Continuous',
            description: 'Never worry about expirations or renewals. We monitor everything and handle it proactively.',
            details: [
              'SAM.gov annual renewal',
              'Certification maintenance',
              'Representations updates',
              'Size standard monitoring',
              'Expiration alerts',
              'Proactive renewal handling',
              'Regulation change alerts',
            ]
          },
        ]
      },
      {
        category: 'Priority Support',
        icon: Zap,
        items: [
          { 
            name: 'Priority Access', 
            timeline: 'Same Day',
            description: 'Questions don\'t wait for monthly calls. Direct access to senior consultants with same-day response.',
            details: [
              'Same-day email response',
              'Live phone or 2-hour callback',
              '1-hour text response',
              'Emergency escalation available',
              'After-hours availability',
              'Priority scheduling',
            ]
          },
          { 
            name: 'Quarterly Business Reviews', 
            timeline: '4x/Year',
            description: 'Comprehensive strategic reviews every quarter to assess results and adjust approach.',
            details: [
              '90-minute QBR sessions',
              'Win/loss analysis',
              'Pipeline health assessment',
              'Market trend briefing',
              'Strategy adjustments',
              'Next quarter planning',
              'Goal setting and accountability',
            ]
          },
        ]
      },
    ],
    timeline: [
      { phase: 'Month 1', title: 'Foundation & Setup', items: ['Complete Growth setup', 'Capture manager assigned', 'Initial pipeline build', 'Strategy alignment'] },
      { phase: 'Q1 (Months 2-3)', title: 'Ramp Up', items: ['First campaign launch', 'Pipeline development', 'First proposal pursuits', 'QBR #1'] },
      { phase: 'Q2 (Months 4-6)', title: 'Active Pursuit', items: ['Second campaign', 'Proposals 1-2', 'Pipeline refinement', 'QBR #2'] },
      { phase: 'Q3 (Months 7-9)', title: 'Acceleration', items: ['Third campaign', 'Proposals 3-4', 'Strategy optimization', 'QBR #3'] },
      { phase: 'Q4 (Months 10-12)', title: 'Optimization & Renewal', items: ['Fourth campaign', 'Proposal 5', 'Year review', 'Renewal planning', 'QBR #4'] },
    ],
    notIncluded: [],
    upgradeNote: null,
  },
];

// ============================================
// GSA SERVICES
// ============================================

const gsaServices = [
  {
    id: 'gsa-submission',
    name: 'GSA Schedule Submission',
    price: 5500,
    timeline: '60-90 Days',
    icon: FileText,
    description: 'Complete GSA Multiple Award Schedule (MAS) application from initial assessment through contract award.',
    features: [
      'Schedule eligibility assessment',
      'SIN (Special Item Number) selection strategy',
      'Pricing strategy development',
      'Complete offer package preparation',
      'FPT (Federal Procurement Tool) setup',
      'Negotiations support',
      'Award documentation',
      'GSA Advantage setup',
    ],
    requirements: [
      '2+ years in business',
      '2 years financial statements',
      'Relevant past performance',
      'Commercial pricing history',
    ],
    process: [
      { phase: 'Assessment', time: 'Week 1', desc: 'Evaluate eligibility and determine best SINs' },
      { phase: 'Preparation', time: 'Weeks 2-4', desc: 'Gather documentation, develop pricing' },
      { phase: 'Submission', time: 'Week 5', desc: 'Submit complete offer package' },
      { phase: 'Negotiations', time: 'Weeks 6-12', desc: 'Respond to GSA questions, negotiate terms' },
      { phase: 'Award', time: 'Week 12+', desc: 'Receive contract, begin GSA Advantage setup' },
    ],
  },
  {
    id: 'gsa-maintenance',
    name: 'GSA Schedule Maintenance',
    price: 2500,
    timeline: 'Annual',
    icon: Settings,
    description: 'Keep your GSA Schedule compliant and competitive with ongoing management.',
    features: [
      'Annual compliance review',
      'Price increase modifications',
      'SIN additions and deletions',
      'Mass modification processing',
      'Industrial Funding Fee (IFF) reporting',
      'Sales reporting support',
      'Option period exercises',
      'Catalog updates',
    ],
  },
  {
    id: 'fcp-migration',
    name: 'FCP Baseline Migration',
    price: 1500,
    timeline: '7-14 Days',
    icon: RefreshCw,
    description: 'Migrate from legacy SIP/EDI to the new FAS Catalog Platform (FCP) before your deadline.',
    features: [
      'Current catalog assessment',
      'Product/Services Plus file creation',
      'FCP baseline submission',
      'Compliance verification',
      'Training on new platform',
    ],
  },
];

// ============================================
// COMPARISON DATA
// ============================================

const comparisonFeatures = [
  { category: 'Compliance (C1)', features: [
    { name: 'SAM.gov Registration', fedstart: true, growth: true, prime: true },
    { name: 'DSBS & FEMA Portals', fedstart: true, growth: true, prime: true },
    { name: 'SBA Certification Submissions', fedstart: true, growth: true, prime: true },
    { name: 'State Registrations', fedstart: 'Available', growth: 'Available', prime: 'Included' },
    { name: 'Compliance Updates', fedstart: '3 months', growth: '6 months', prime: '12 months' },
    { name: 'Renewal Management', fedstart: false, growth: false, prime: true },
  ]},
  { category: 'Concept (C2)', features: [
    { name: 'Capabilities Statement', fedstart: true, growth: true, prime: true },
    { name: 'Marketing Strategy', fedstart: true, growth: true, prime: 'Ongoing' },
    { name: 'Contact Lists', fedstart: '1,000', growth: '2,000', prime: 'Quarterly' },
    { name: 'Email Campaigns', fedstart: false, growth: '2', prime: '4' },
    { name: 'Prime Targeting', fedstart: false, growth: true, prime: true },
  ]},
  { category: 'Capture (C3)', features: [
    { name: 'Federal Bid Portal Access', fedstart: false, growth: '6 months', prime: '12 months' },
    { name: 'Daily Bid Alerts', fedstart: false, growth: true, prime: true },
    { name: 'Opportunity Qualification', fedstart: false, growth: true, prime: true },
    { name: 'Capture Management', fedstart: false, growth: 'Guided', prime: 'Dedicated' },
    { name: 'Pipeline Dashboard', fedstart: false, growth: false, prime: true },
  ]},
  { category: 'Compete (C4)', features: [
    { name: 'RFP Reviews', fedstart: '1', growth: 'Unlimited', prime: 'Unlimited' },
    { name: 'Full Proposal Writing', fedstart: false, growth: false, prime: 'Up to 5' },
    { name: 'Pricing Support', fedstart: false, growth: true, prime: 'Full' },
    { name: 'Red Team Reviews', fedstart: false, growth: false, prime: true },
  ]},
  { category: 'Continue (C5)', features: [
    { name: 'Strategy Calls', fedstart: 'Monthly', growth: 'Monthly', prime: 'Priority' },
    { name: 'Response Time', fedstart: '48 hrs', growth: '24 hrs', prime: 'Same day' },
    { name: 'Quarterly Business Reviews', fedstart: false, growth: false, prime: '4x/year' },
    { name: 'Year-Round Compliance', fedstart: false, growth: false, prime: true },
  ]},
];

// ============================================
// STATS
// ============================================

const stats = [
  { value: '200+', label: 'Contractors Launched', icon: Rocket },
  { value: '87%', label: 'Client Win Rate', icon: Target },
  { value: '$109M+', label: 'Awards Facilitated', icon: CircleDollarSign },
  { value: '14 Days', label: 'Cert Turnaround', icon: Timer },
];

// ============================================
// HELPER
// ============================================

const getColorClasses = (color: string) => ({
  bg: color === 'blue' ? 'bg-blue-600' : color === 'emerald' ? 'bg-emerald-600' : color === 'rose' ? 'bg-rose-600' : color === 'amber' ? 'bg-amber-500' : 'bg-purple-600',
  bgLight: color === 'blue' ? 'bg-blue-50' : color === 'emerald' ? 'bg-emerald-50' : color === 'rose' ? 'bg-rose-50' : color === 'amber' ? 'bg-amber-50' : 'bg-purple-50',
  text: color === 'blue' ? 'text-blue-600' : color === 'emerald' ? 'text-emerald-600' : color === 'rose' ? 'text-rose-600' : color === 'amber' ? 'text-amber-600' : 'text-purple-600',
  border: color === 'blue' ? 'border-blue-200' : color === 'emerald' ? 'border-emerald-200' : color === 'rose' ? 'border-rose-200' : color === 'amber' ? 'border-amber-200' : 'border-purple-200',
  gradient: color === 'blue' ? 'from-blue-500 to-blue-700' : color === 'emerald' ? 'from-emerald-500 to-emerald-700' : color === 'rose' ? 'from-rose-500 to-rose-700' : color === 'amber' ? 'from-amber-400 to-orange-600' : 'from-purple-500 to-purple-700',
});

// ============================================
// COMPONENT
// ============================================

export default function Programs() {
  const [activeProgram, setActiveProgram] = useState<string>('growth');

  const selectedProgram = marketingPrograms.find(p => p.id === activeProgram);

  return (
    <>
      <Helmet>
        <title>Federal Contractor Programs — {LINKS.name}</title>
        <meta name="description" content="Win federal contracts with our FedStart, Growth, and Prime programs. Built on our proven 5C methodology, we provide everything from compliance to capture." />
      </Helmet>

      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Our Programs</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              From Compliant to Competitive to Prime.
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
              We've packaged our proven 5C Methodology into three distinct programs. Whether you're just starting, ready to scale, or aiming to become a prime contractor, we have a clear, deliverable-based path for your success.
            </p>
        </div>
      </Section>
      
      {/* ===== PROGRAMS OVERVIEW ===== */}
      <Section className="bg-slate-50">
        <div className="grid gap-8 lg:grid-cols-3">
            {marketingPrograms.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className={`p-8 h-full flex flex-col relative overflow-hidden ${program.id === activeProgram ? `border-2 border-blue-500 ring-4 ring-blue-500/10` : ''}`} hover>
                    {program.popular && <div className="absolute top-0 right-8 -mr-4 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-b-lg">MOST POPULAR</div>}
                    <div className="flex-grow">
                        <div className="flex items-center gap-3">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${program.bgLight} ${program.text}`}>
                                <program.icon size={24}/>
                            </div>
                            <h3 className={`font-display text-2xl font-bold ${program.text}`}>{program.name}</h3>
                        </div>
                        <p className="mt-4 text-slate-600">{program.overview}</p>
                    </div>
                    <div className="mt-6">
                        <div className="text-sm text-slate-500">{program.duration} Program</div>
                        <div className="font-display text-4xl font-bold text-slate-900">${program.price.toLocaleString()}</div>
                        <p className="text-xs text-slate-500 mt-1">{program.idealFor}</p>
                        <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" className="w-full mt-6" variant={program.id === activeProgram ? 'primary' : 'secondary'}>
                            Get Started with {program.name}
                        </LinkButton>
                    </div>
                </Card>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* ===== COMPARISON TABLE ===== */}
      <Section title="Compare Our Programs" kicker="What's Included?">
          <Card className="overflow-x-auto" hover={false}>
              <table className="w-full min-w-[800px] text-sm">
                  <thead>
                      <tr className="border-b border-slate-200">
                          <th className="text-left font-bold text-slate-900 p-4">Feature</th>
                          {marketingPrograms.map(p => (
                              <th key={p.id} className={`p-4 text-center ${p.text}`}>
                                  <div className="font-display text-lg">{p.name}</div>
                                  <div className="text-xs font-normal">${p.price.toLocaleString()}</div>
                              </th>
                          ))}
                      </tr>
                  </thead>
                  <tbody>
                      {comparisonFeatures.map(cat => (
                          <>
                            <tr key={cat.category}>
                                <td colSpan={4} className="p-4 bg-slate-50 font-bold text-slate-800">{cat.category}</td>
                            </tr>
                            {cat.features.map(feat => (
                                <tr key={feat.name} className="border-b border-slate-100">
                                    <td className="p-4 font-medium text-slate-700">{feat.name}</td>
                                    <td className="p-4 text-center">{renderCheck(feat.fedstart)}</td>
                                    <td className="p-4 text-center">{renderCheck(feat.growth)}</td>
                                    <td className="p-4 text-center">{renderCheck(feat.prime)}</td>
                                </tr>
                            ))}
                          </>
                      ))}
                  </tbody>
              </table>
          </Card>
      </Section>

       {/* ===== CTA ===== */}
      <Section title="Ready to Build Your Federal Practice?" kicker="Get Started" dark>
        <Card className="p-8 bg-white/5 border-white/10" hover={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Let's Build Your Roadmap.
              </h3>
              <p className="mt-3 text-slate-300 max-w-xl">
                Schedule a free strategy call today. We'll assess your current stage in the 5C framework and recommend the right program to help you achieve your federal contracting goals.
              </p>
            </div>
            <LinkButton 
              href={LINKS.booking} 
              target="_blank" 
              rel="noreferrer" 
              size="lg"
              className="shrink-0"
            >
              Book My Strategy Call
              <ArrowRight size={18} className="ml-2" />
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}

function renderCheck(value: boolean | string) {
    if (typeof value === 'boolean' && value) {
        return <CheckCircle size={20} className="text-green-500 mx-auto"/>
    }
    if (typeof value === 'string') {
        return <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded-full">{value}</span>
    }
    return <span className="text-slate-300">-</span>
}
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  FileText, Download, CheckCircle, Building2, Mail, Phone,
  Calendar, DollarSign, ArrowRight, ArrowLeft, Rocket, TrendingUp,
  Crown, Shield, Settings, RefreshCw, Sparkles, Eye,
  Edit3, Plus, Clock, Target, Layers, Check, AlertCircle
} from "lucide-react";
import { cn } from "../../components/cn";

// ============================================
// TYPES
// ============================================

interface ClientInfo {
  companyName: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface SelectedService {
  id: string;
  name: string;
  price: number;
  category: 'program' | 'gsa' | 'addon';
  tier?: string;
  description?: string;
  highlights?: string[];
}

interface ProposalData {
  client: ClientInfo;
  services: SelectedService[];
  validDays: number;
  notes: string;
  discount: number;
  paymentTerms: string;
  squareLink: string;
}

// ============================================
// SERVICE DATA
// ============================================

const marketingPrograms = [
  {
    id: 'fedstart',
    name: 'FedStart',
    tagline: 'Your Compliance Foundation',
    duration: '3 Months',
    price: 3200,
    category: 'program' as const,
    icon: Rocket,
    description: 'Complete compliance foundation including SAM.gov, DSBS, FEMA registrations, SBA certifications, capabilities statement, and 1,000 marketing contacts.',
    highlights: [
      'SAM.gov Registration & Optimization',
      'DSBS & FEMA Portal Setup',
      'SBA Certification Submissions',
      'Professional Capabilities Statement',
      'Marketing Strategy + 1,000 Contacts',
      'Monthly Strategy Calls (3 months)',
      '1 RFP Review'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Scale Your Pipeline',
    duration: '6 Months',
    price: 6500,
    category: 'program' as const,
    icon: TrendingUp,
    popular: true,
    description: 'Everything in FedStart plus Federal Bid Portal access, 2 email marketing campaigns, unlimited RFP reviews, and dedicated capture support.',
    highlights: [
      'Everything in FedStart',
      'Federal Bid Portal Access (6 months)',
      'Daily Bid Alerts',
      '2 Email Marketing Campaigns (2,000 contacts)',
      'Prime Contractor Targeting',
      'Unlimited Gold Team RFP Reviews',
      'Opportunity Qualification Support'
    ]
  },
  {
    id: 'prime',
    name: 'Prime',
    tagline: 'Full-Service Partnership',
    duration: '12 Months',
    price: 15500,
    category: 'program' as const,
    icon: Crown,
    description: 'Complete business development partnership with dedicated capture manager, quarterly campaigns, up to 5 full proposals, and year-round compliance management.',
    highlights: [
      'Everything in Growth',
      'Dedicated Capture Manager',
      '4 Quarterly Marketing Campaigns',
      'Up to 5 Complete Proposals',
      'Year-Round Compliance Management',
      'Priority Support (Same Day)',
      'Quarterly Business Reviews'
    ]
  }
];

// --- GSA Starter Services ---
const gsaStarterServices = [
  {
    id: 'starter-fcp-compliance',
    name: 'FCP Catalog Compliance & Update',
    tier: 'GSA Starter',
    price: 250,
    category: 'gsa' as const,
    icon: CheckCircle,
    description: 'We audit your FAS Catalog Platform listing for compliance, correct any errors or outdated entries, and complete a full catalog update on your behalf — ensuring your products and pricing are accurate, visible, and compliant on GSA Advantage.',
    highlights: [
      'FAS Catalog Platform compliance audit',
      'Error identification & correction',
      'Full catalog update completion',
      'Pricing & product accuracy verification',
      'GSA Advantage visibility confirmation',
    ]
  },
  {
    id: 'starter-fcp',
    name: 'FCP Catalog Baseline Modification',
    tier: 'GSA Starter',
    price: 1500,
    category: 'gsa' as const,
    icon: RefreshCw,
    description: 'Updates to your GSA Federal Catalog Program pricing — new rates, adjusted labor categories, revised product pricing — packaged and submitted to your GSA contracting officer with full supporting documentation. We make sure your catalog reflects your current commercial pricing so you stay competitive on GSA Advantage and eBuy without triggering a pricing audit.',
    highlights: [
      'Pricing update preparation & CO submission',
      'Labor category adjustments & rate documentation',
      'Commercial pricing compliance verification',
      'GSA Advantage & eBuy competitiveness review',
      'Full supporting documentation package',
    ]
  },
  {
    id: 'starter-minor-mods',
    name: 'Minor Modifications',
    tier: 'GSA Starter',
    price: 500,
    category: 'gsa' as const,
    icon: Edit3,
    description: 'Administrative contract changes that keep your GSA schedule current — address updates, new points of contact, phone numbers, DUNS/UEI transitions, adding new accepted credit cards, and similar housekeeping. Small changes, but missing them creates compliance flags that can delay task order awards or trigger unnecessary reviews.',
    highlights: [
      'Address & contact information updates',
      'DUNS/UEI transition management',
      'New payment method additions',
      'Compliance flag prevention',
    ]
  },
  {
    id: 'starter-mass-mods',
    name: 'Mass Mods & Sales Reporting',
    tier: 'GSA Starter',
    price: 750,
    category: 'gsa' as const,
    icon: FileText,
    description: 'Government-initiated Mass Modifications applied to your contract on time, every time — plus completion of your quarterly and annual GSA sales reporting and Industrial Funding Fee calculations. These are mandatory. Miss a mass mod deadline or a sales report and you risk contract cancellation. We track every deadline and handle every submission.',
    highlights: [
      'Mass Modification review & acceptance',
      'Quarterly 72A sales reporting',
      'Annual IFF calculations & submission',
      'Deadline tracking & on-time compliance',
    ]
  },
  {
    id: 'starter-training',
    name: 'Administrative Training (3 Sessions)',
    tier: 'GSA Starter',
    price: 1200,
    category: 'gsa' as const,
    icon: Target,
    description: 'Three focused training sessions on GSA eBuy and GSA Advantage — how to monitor for RFQs posted to your SIN codes, how to respond competitively, how to optimize your Advantage storefront, and how to track your sales activity. We do not just get you a GSA contract and walk away. We teach your team how to use it to generate revenue.',
    highlights: [
      'GSA eBuy monitoring & RFQ response training',
      'Advantage storefront optimization session',
      'Competitive bid response strategies',
      'Sales tracking & activity monitoring',
    ]
  },
];

// --- GSA Modification Services ---
const gsaModServices = [
  {
    id: 'mod-fcp',
    name: 'FCP Catalog Baseline Modification',
    tier: 'GSA Modification',
    price: 2500,
    category: 'gsa' as const,
    icon: RefreshCw,
    description: 'Complete repricing of your GSA catalog — Economic Price Adjustments, new labor category additions, rate realignments — with full documentation, commercial sales practice updates, and price narrative supporting your requested changes. We handle the negotiation with your GSA CO and push the modification to approval.',
    highlights: [
      'Economic Price Adjustment preparation',
      'New labor category additions & rate realignments',
      'Commercial sales practice documentation',
      'Price narrative & CO negotiation support',
      'End-to-end modification management to approval',
    ]
  },
  {
    id: 'mod-major',
    name: 'Major Modifications',
    tier: 'GSA Modification',
    price: 3500,
    category: 'gsa' as const,
    icon: Sparkles,
    description: 'Substantial changes to your GSA contract — adding new SIN codes to expand your scope, requesting Economic Price Adjustments, adding new product or service offerings, and any modification that requires negotiation with your contracting officer. We prepare the complete mod package, draft the supporting narrative, and manage the back-and-forth until it is approved.',
    highlights: [
      'New SIN code additions & scope expansion',
      'Economic Price Adjustment requests',
      'New product or service offering additions',
      'Complete modification package preparation',
      'CO negotiation management to approval',
    ]
  },
  {
    id: 'mod-minor',
    name: 'Minor Modifications',
    tier: 'GSA Modification',
    price: 750,
    category: 'gsa' as const,
    icon: Edit3,
    description: 'All administrative and minor changes — contact updates, address changes, NAICS additions, and similar compliance maintenance — handled alongside your major modifications so your entire contract stays clean and current at all times.',
    highlights: [
      'Contact & address updates',
      'NAICS code additions',
      'Compliance maintenance coordination',
      'Contract currency verification',
    ]
  },
  {
    id: 'mod-mass-mods',
    name: 'Mass Mods & GSA-Initiated Mods',
    tier: 'GSA Modification',
    price: 500,
    category: 'gsa' as const,
    icon: FileText,
    description: 'Mass Modifications, GSA-initiated contract changes, and clause updates applied to your schedule as they are issued. Plus your quarterly and annual sales reporting completed and submitted. We monitor the GSA modification bulletin and apply every required change before the deadline.',
    highlights: [
      'Mass Modification monitoring & acceptance',
      'GSA-initiated clause updates',
      'Quarterly & annual sales reporting',
      'Deadline monitoring & on-time submission',
    ]
  },
  {
    id: 'mod-assessment',
    name: 'GSA Contractor Assessment (Admin & Sales)',
    tier: 'GSA Modification',
    price: 1500,
    category: 'gsa' as const,
    icon: Clock,
    description: 'A full health check of your GSA contract — administrative compliance, pricing competitiveness, SIN coverage, Advantage storefront optimization, eBuy response history, and sales performance benchmarking against your category. We identify gaps, recommend changes, and build a plan to get more revenue out of your existing schedule.',
    highlights: [
      'Administrative compliance audit',
      'Pricing competitiveness benchmarking',
      'SIN coverage & scope gap analysis',
      'Advantage storefront & eBuy review',
      'Revenue optimization action plan',
    ]
  },
  {
    id: 'mod-30day',
    name: '30-Day Submission Guarantee',
    tier: 'GSA Modification',
    price: 500,
    category: 'gsa' as const,
    icon: CheckCircle,
    description: 'Your modification package submitted within 30 calendar days of engagement. We commit to the timeline because we know GSA modifications that sit in a queue for months cost you money in lost task orders and outdated pricing. We move fast because your revenue depends on it.',
    highlights: [
      '30-calendar-day submission commitment',
      'Priority processing & rapid turnaround',
      'Revenue-first timeline management',
    ]
  },
];

// --- GSA Management Services ---
const gsaMgmtServices = [
  {
    id: 'mgmt-catalog',
    name: 'GSA Catalog Management',
    tier: 'GSA Management',
    price: 400,
    category: 'gsa' as const,
    icon: Settings,
    hasBillingOptions: true,
    description: 'End-to-end management of your entire GSA catalog — pricing, compliance, modifications, reporting, and optimization — as a continuous managed service. We treat your GSA schedule like the revenue-generating asset it is and manage every aspect of it so your team never has to think about GSA administration again.',
    highlights: [
      'Ongoing catalog pricing & compliance management',
      'Continuous modification monitoring & processing',
      'Sales reporting & IFF submission',
      'Storefront optimization & eBuy monitoring',
      'Full GSA schedule administration offload',
    ]
  },
  {
    id: 'mgmt-all-mods',
    name: 'All Modifications & Negotiations',
    tier: 'GSA Management',
    price: 3500,
    category: 'gsa' as const,
    icon: Sparkles,
    description: 'Every type of GSA modification — minor, major, pricing, scope, administrative, Economic Price Adjustments, new SINs, clause updates — handled by our team on an ongoing basis. We identify when modifications are needed, prepare every package, negotiate with your CO, and push everything to approval. Your schedule stays current, competitive, and compliant at all times.',
    highlights: [
      'Minor & major modification management',
      'Economic Price Adjustment requests',
      'New SIN additions & scope expansion',
      'CO negotiation & approval tracking',
      'Proactive modification opportunity identification',
    ]
  },
  {
    id: 'mgmt-mass-mods',
    name: 'Mass Mods, Sales Reporting & GSA-Initiated Mods',
    tier: 'GSA Management',
    price: 2500,
    category: 'gsa' as const,
    icon: FileText,
    description: 'Complete management of every mandatory GSA compliance requirement — Mass Modifications applied on time, quarterly and annual sales reporting submitted accurately, IFF payments tracked, and GSA-initiated modifications processed as they are issued. Zero missed deadlines. Zero compliance flags. Zero risk to your contract.',
    highlights: [
      'Zero-miss Mass Modification processing',
      'Quarterly & annual 72A sales reporting',
      'IFF payment tracking & submission',
      'GSA-initiated modification processing',
      'Full compliance deadline management',
    ]
  },
  {
    id: 'mgmt-training',
    name: 'Training & Internal Management Documentation',
    tier: 'GSA Management',
    price: 2500,
    category: 'gsa' as const,
    icon: Target,
    description: 'Custom standard operating procedures, compliance checklists, modification request templates, and team training materials built specifically for your GSA contract. We document everything so your internal team has a playbook — and then we train them on it. This is how you build institutional knowledge that survives staff turnover.',
    highlights: [
      'Custom SOPs for GSA contract administration',
      'Compliance checklists & modification templates',
      'Team training on GSA systems & processes',
      'Institutional knowledge documentation',
    ]
  },
  {
    id: 'mgmt-ebuy',
    name: 'GSA eBuy Bid Monitoring & Advantage! Portal',
    tier: 'GSA Management',
    price: 3600,
    category: 'gsa' as const,
    icon: Eye,
    description: 'Daily monitoring of GSA eBuy for every RFQ posted to your SIN codes, plus full management and optimization of your GSA Advantage storefront. eBuy is where agencies go to get quotes from GSA contractors. If nobody is watching your eBuy queue, you are losing task orders to competitors who are. We watch it every day and alert you to every relevant opportunity.',
    highlights: [
      'Daily eBuy RFQ monitoring for all SIN codes',
      'Opportunity alerts & response support',
      'GSA Advantage storefront management',
      'Storefront optimization for maximum visibility',
    ]
  },
  {
    id: 'mgmt-5yr-options',
    name: 'GSA 5-Year Options & Assessments',
    tier: 'GSA Management',
    price: 3500,
    category: 'gsa' as const,
    icon: Calendar,
    description: 'Management of your contract option periods — the 5-year renewal windows that determine whether your GSA schedule lives or dies. We prepare the option exercise package, conduct a full pricing and compliance assessment, negotiate any required updates, and ensure your contract is extended without interruption. Losing your GSA schedule because you missed an option deadline is the most expensive mistake in government contracting. We make sure it does not happen.',
    highlights: [
      'Option period exercise package preparation',
      'Full pricing & compliance assessment',
      'CO negotiation for required updates',
      'Uninterrupted contract extension management',
      'Option deadline monitoring & advance planning',
    ]
  },
];

const addons = [
  {
    id: 'addon-capstat',
    name: 'Additional Capabilities Statement',
    price: 750,
    category: 'addon' as const,
    description: 'Additional professionally designed capabilities statement for different service lines or agencies.'
  },
  {
    id: 'addon-campaign',
    name: 'Additional Email Campaign',
    price: 1500,
    category: 'addon' as const,
    description: '1,000 targeted contacts with campaign strategy, execution, and reporting.'
  },
  {
    id: 'addon-proposal',
    name: 'Additional Proposal Development',
    price: 5000,
    category: 'addon' as const,
    description: 'Complete proposal development beyond program allocation.'
  },
  {
    id: 'addon-state',
    name: 'State Registration Package',
    price: 500,
    category: 'addon' as const,
    description: 'Single state vendor registration and certification support.'
  }
];

const gsaMgmtBillingOptions = [
  { id: 'monthly', label: 'Monthly',         price: 400,  priceLabel: '/mo',    note: 'No lock-in' },
  { id: '3mo',     label: '3-Month Lock-in',  price: 1200, priceLabel: ' total', note: '$400/mo' },
  { id: '6mo',     label: '6-Month Lock-in',  price: 2400, priceLabel: ' total', note: '$400/mo' },
  { id: 'annual',  label: 'Annual',           price: 4500, priceLabel: '/yr',    note: 'Best value — save $300' },
];

const paymentTermOptions = [
  'Due upon receipt',
  'Net 15',
  'Net 30',
  '50% upfront, 50% at completion',
  'Monthly payments (no lock-in)',
  'Monthly payments with 3-month lock-in',
  'Monthly payments with 6-month lock-in',
  'Custom (specify in notes)'
];

// ============================================
// COMPONENT
// ============================================

export default function ProposalGenerator() {
  const [step, setStep] = useState(1);
  const [proposalData, setProposalData] = useState<ProposalData>({
    client: {
      companyName: '',
      contactName: '',
      contactTitle: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    services: [],
    validDays: 30,
    notes: '',
    discount: 0,
    paymentTerms: 'Due upon receipt',
    squareLink: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [gsaMgmtBilling, setGsaMgmtBilling] = useState('annual');
  const proposalNumber = useRef('PROP-' + Date.now().toString().slice(-8));

  const updateClient = (field: keyof ClientInfo, value: string) => {
    setProposalData(prev => ({ ...prev, client: { ...prev.client, [field]: value } }));
  };

  const toggleService = (service: {
    id: string; name: string; price: number;
    category: 'program' | 'gsa' | 'addon';
    tier?: string; description?: string; highlights?: string[];
  }) => {
    setProposalData(prev => {
      const exists = prev.services.find(s => s.id === service.id);
      if (exists) return { ...prev, services: prev.services.filter(s => s.id !== service.id) };
      return {
        ...prev,
        services: [...prev.services, {
          id: service.id,
          name: service.name,
          price: service.price,
          category: service.category,
          tier: service.tier,
          description: service.description,
          highlights: service.highlights
        }]
      };
    });
  };

  const isServiceSelected = (id: string) => proposalData.services.some(s => s.id === id);

  const toggleGsaMgmt = () => {
    const option = gsaMgmtBillingOptions.find(o => o.id === gsaMgmtBilling)!;
    const svc = gsaMgmtServices.find(s => s.id === 'mgmt-catalog')!;
    setProposalData(prev => {
      const exists = prev.services.find(s => s.id === 'mgmt-catalog');
      if (exists) return { ...prev, services: prev.services.filter(s => s.id !== 'mgmt-catalog') };
      return {
        ...prev,
        services: [...prev.services, {
          id: 'mgmt-catalog',
          name: `GSA Catalog Management — ${option.label}`,
          price: option.price,
          category: 'gsa' as const,
          tier: 'GSA Management',
          description: svc.description,
          highlights: svc.highlights,
        }]
      };
    });
  };

  const changeGsaMgmtBilling = (optionId: string) => {
    setGsaMgmtBilling(optionId);
    const option = gsaMgmtBillingOptions.find(o => o.id === optionId)!;
    setProposalData(prev => {
      const exists = prev.services.find(s => s.id === 'mgmt-catalog');
      if (!exists) return prev;
      return {
        ...prev,
        services: prev.services.map(s => s.id === 'mgmt-catalog'
          ? { ...s, name: `GSA Catalog Management — ${option.label}`, price: option.price }
          : s
        )
      };
    });
  };

  const subtotal = proposalData.services.reduce((sum, s) => sum + s.price, 0);
  const discountAmount = Math.round((subtotal * proposalData.discount) / 100);
  const total = subtotal - discountAmount;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const proposalDate = new Date();
  const validUntil = new Date(proposalDate.getTime() + proposalData.validDays * 24 * 60 * 60 * 1000);

  const canProceed = () => {
    if (step === 1) return proposalData.client.companyName && proposalData.client.contactName && proposalData.client.email;
    if (step === 2) return proposalData.services.length > 0;
    return true;
  };

  const generatePDF = async () => {
    setIsGenerating(true);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the PDF');
      setIsGenerating(false);
      return;
    }

    const clientAddressHtml = (() => {
      const parts: string[] = [];
      if (proposalData.client.address) parts.push(proposalData.client.address);
      const cityStateZip = [proposalData.client.city, proposalData.client.state, proposalData.client.zip]
        .filter(Boolean).join(', ');
      if (cityStateZip) parts.push(cityStateZip);
      return parts.length > 0 ? '<br>' + parts.join('<br>') : '';
    })();

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Proposal — ${proposalData.client.companyName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', -apple-system, sans-serif; color: #1e293b; line-height: 1.6; background: white; }
          .page { max-width: 8.5in; margin: 0 auto; padding: 0.75in; }

          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 28px; border-bottom: 3px solid #0f172a; }
          .brand-name { font-size: 30px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px; }
          .brand-tagline { font-size: 13px; color: #64748b; margin-top: 3px; }
          .proposal-meta { text-align: right; }
          .proposal-meta-label { font-size: 11px; font-weight: 700; color: #dc2626; text-transform: uppercase; letter-spacing: 1px; }
          .proposal-meta-num { font-size: 12px; color: #64748b; margin-top: 3px; }
          .proposal-meta-date { font-size: 12px; color: #64748b; }

          .section-label { font-size: 10px; font-weight: 700; color: #dc2626; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 10px; }

          .client-section { margin-bottom: 36px; }
          .client-name { font-size: 22px; font-weight: 700; color: #0f172a; }
          .client-contact { font-size: 14px; color: #475569; margin-top: 3px; }
          .client-details { font-size: 13px; color: #64748b; margin-top: 6px; }

          .intro { font-size: 14px; color: #475569; margin-bottom: 36px; line-height: 1.75; }

          .services-section { margin-bottom: 36px; }
          .service-item { padding: 18px 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 14px; page-break-inside: avoid; }
          .service-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
          .service-name { font-size: 16px; font-weight: 700; color: #0f172a; }
          .service-tier { display: inline-block; font-size: 10px; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
          .service-price { font-size: 18px; font-weight: 700; color: #0f172a; white-space: nowrap; margin-left: 16px; }
          .service-desc { font-size: 12px; color: #64748b; line-height: 1.6; margin-top: 8px; }
          .service-highlights { margin-top: 10px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px 20px; padding: 0; list-style: none; }
          .service-highlights li { display: flex; align-items: flex-start; gap: 5px; font-size: 11px; color: #475569; }
          .check { color: #10b981; font-size: 11px; margin-top: 1px; flex-shrink: 0; }

          .totals { background: #f8fafc; padding: 22px 24px; border-radius: 8px; margin-bottom: 36px; }
          .total-row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px; color: #475569; }
          .total-row.subtotal { border-bottom: 1px solid #e2e8f0; padding-bottom: 14px; margin-bottom: 6px; }
          .total-row.discount { color: #16a34a; }
          .total-row.final { border-top: 2px solid #0f172a; padding-top: 14px; margin-top: 6px; font-size: 19px; font-weight: 700; color: #0f172a; }

          .terms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px; }
          .term-item { padding: 14px 16px; background: #f8fafc; border-radius: 8px; }
          .term-label { font-size: 10px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
          .term-value { font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 4px; }

          .notes-box { margin-bottom: 36px; padding: 18px 20px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b; }
          .notes-title { font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
          .notes-body { font-size: 12px; color: #64748b; white-space: pre-wrap; }

          .pay-block { margin-bottom: 36px; padding: 22px; background: #0f172a; border-radius: 8px; text-align: center; }
          .pay-hint { font-size: 12px; color: #94a3b8; margin-bottom: 5px; }
          .pay-total { font-size: 19px; font-weight: 700; color: white; margin-bottom: 14px; }
          .pay-btn { display: inline-block; padding: 11px 30px; background: #10b981; color: white; font-weight: 700; font-size: 13px; border-radius: 8px; text-decoration: none; }
          .pay-secure { font-size: 11px; color: #64748b; margin-top: 10px; }

          .sig-section { margin-top: 56px; padding-top: 36px; border-top: 1px solid #e2e8f0; max-width: 300px; }
          .sig-label { font-size: 10px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
          .sig-line { border-bottom: 1px solid #0f172a; height: 38px; margin-bottom: 6px; }
          .sig-name { font-size: 13px; font-weight: 600; color: #0f172a; }
          .sig-company { font-size: 12px; color: #64748b; }

          .footer { margin-top: 56px; padding-top: 18px; border-top: 1px solid #e2e8f0; text-align: center; }
          .footer-disclaimer { font-size: 11px; color: #94a3b8; }
          .footer-contact { font-size: 12px; color: #64748b; margin-top: 6px; }

          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div>
              <div class="brand-name">GSA Managers Inc.</div>
              <div class="brand-tagline">Federal Contractor Consulting</div>
            </div>
            <div class="proposal-meta">
              <div class="proposal-meta-label">Service Proposal</div>
              <div class="proposal-meta-num">${proposalNumber.current}</div>
              <div class="proposal-meta-date">${formatDate(proposalDate)}</div>
            </div>
          </div>

          <div class="client-section">
            <div class="section-label">Prepared For</div>
            <div class="client-name">${proposalData.client.companyName}</div>
            <div class="client-contact">${proposalData.client.contactName}${proposalData.client.contactTitle ? ', ' + proposalData.client.contactTitle : ''}</div>
            <div class="client-details">
              ${proposalData.client.email}${proposalData.client.phone ? ' &bull; ' + proposalData.client.phone : ''}
              ${clientAddressHtml}
            </div>
          </div>

          <div class="intro">
            Thank you for the opportunity to provide this proposal. GSA Managers Inc. is committed to helping your company succeed in the federal marketplace. The following outlines our recommended services based on your business objectives.
          </div>

          <div class="services-section">
            <div class="section-label">Proposed Services</div>
            ${proposalData.services.map(service => `
              <div class="service-item">
                <div class="service-header">
                  <div>
                    <div class="service-name">${service.name}</div>
                    <div class="service-tier">${service.tier || (service.category === 'program' ? 'Marketing Program' : service.category === 'addon' ? 'Add-On' : 'GSA Service')}</div>
                  </div>
                  <div class="service-price">${formatCurrency(service.price)}</div>
                </div>
                ${service.description ? `<div class="service-desc">${service.description}</div>` : ''}
                ${service.highlights && service.highlights.length > 0 ? `
                  <ul class="service-highlights">
                    ${service.highlights.map(h => `<li><span class="check">&#10003;</span>${h}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <div class="totals">
            <div class="total-row subtotal">
              <span>Subtotal</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            ${proposalData.discount > 0 ? `
              <div class="total-row discount">
                <span>Discount (${proposalData.discount}%)</span>
                <span>&minus;${formatCurrency(discountAmount)}</span>
              </div>
            ` : ''}
            <div class="total-row final">
              <span>Total Investment</span>
              <span>${formatCurrency(total)}</span>
            </div>
          </div>

          <div class="section-label">Terms</div>
          <div class="terms-grid">
            <div class="term-item">
              <div class="term-label">Valid Until</div>
              <div class="term-value">${formatDate(validUntil)}</div>
            </div>
            <div class="term-item">
              <div class="term-label">Payment Terms</div>
              <div class="term-value">${proposalData.paymentTerms}</div>
            </div>
            <div class="term-item">
              <div class="term-label">Proposal Valid</div>
              <div class="term-value">${proposalData.validDays} Days</div>
            </div>
          </div>

          ${proposalData.notes ? `
            <div class="notes-box">
              <div class="notes-title">Additional Notes</div>
              <div class="notes-body">${proposalData.notes}</div>
            </div>
          ` : ''}

          ${proposalData.squareLink ? `
            <div class="pay-block">
              <div class="pay-hint">Ready to get started?</div>
              <div class="pay-total">Pay Securely Online &mdash; ${formatCurrency(total)}</div>
              <a href="${proposalData.squareLink}" class="pay-btn">Pay Now via Square &rarr;</a>
              <div class="pay-secure">Secure payment powered by Square</div>
            </div>
          ` : ''}

          <div class="sig-section">
            <div class="sig-label">Client Acceptance</div>
            <div class="sig-line"></div>
            <div class="sig-name">${proposalData.client.contactName}</div>
            <div class="sig-company">${proposalData.client.companyName}</div>
          </div>

          <div class="footer">
            <div class="footer-disclaimer">This proposal is confidential and intended solely for the named recipient.</div>
            <div class="footer-contact">GSA Managers Inc. &bull; (813) 665-0308 &bull; Info@GSAManagers.com &bull; www.GSAManagers.com</div>
          </div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      setIsGenerating(false);
    }, 600);
  };

  // ============================================
  // REUSABLE SERVICE CARD
  // ============================================

  const ServiceCard = ({
    service,
    accentColor = 'emerald'
  }: {
    service: typeof gsaStarterServices[0];
    accentColor?: 'blue' | 'amber' | 'emerald';
  }) => {
    const Icon = service.icon;
    const selected = isServiceSelected(service.id);
    const colors = {
      blue:    { border: 'border-blue-500',    ring: 'ring-blue-500/20',    bg: 'bg-blue-50',    icon: 'bg-blue-500',    check: 'text-blue-500' },
      amber:   { border: 'border-amber-500',   ring: 'ring-amber-500/20',   bg: 'bg-amber-50',   icon: 'bg-amber-500',   check: 'text-amber-500' },
      emerald: { border: 'border-emerald-500', ring: 'ring-emerald-500/20', bg: 'bg-emerald-50', icon: 'bg-emerald-500', check: 'text-emerald-500' },
    }[accentColor];

    return (
      <button
        type="button"
        key={service.id}
        onClick={() => toggleService(service)}
        className={cn(
          'p-4 rounded-xl border-2 text-left transition-all',
          selected
            ? `${colors.border} ${colors.bg} ring-2 ${colors.ring}`
            : 'border-slate-200 bg-white hover:border-slate-300'
        )}
      >
        <div className="flex items-start justify-between mb-2">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', selected ? `${colors.icon} text-white` : 'bg-slate-100 text-slate-600')}>
            <Icon size={15} />
          </div>
          {selected && <CheckCircle size={15} className={colors.check} />}
        </div>
        <h4 className="font-semibold text-slate-900 text-sm leading-snug">{service.name}</h4>
        <p className="text-base font-bold text-slate-900 mt-1.5">{formatCurrency(service.price)}</p>
      </button>
    );
  };

  return (
    <>
      <Helmet>
        <title>Proposal Generator — GSA Managers Inc.</title>
        <meta name="description" content="Generate professional service proposals for federal contracting clients." />
      </Helmet>

      {/* HEADER */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Proposal Generator</h1>
              <p className="text-slate-400">Create professional service proposals in minutes</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-8">
            {[
              { num: 1, label: 'Client Info' },
              { num: 2, label: 'Services' },
              { num: 3, label: 'Terms' },
              { num: 4, label: 'Review' }
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setStep(s.num)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition',
                    step === s.num
                      ? 'bg-white text-slate-900'
                      : step > s.num
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-700/50 text-slate-400'
                  )}
                >
                  {step > s.num ? <CheckCircle size={18} /> : (
                    <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-sm">{s.num}</span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < 3 && <div className="w-8 h-px bg-slate-600 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 bg-slate-50 min-h-[600px]">
        <div className="max-w-5xl mx-auto px-6">

          {/* STEP 1: CLIENT INFO */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Client Information</h2>
                <p className="text-slate-600 mt-1">Enter the client details for this proposal</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
                    <input type="text" value={proposalData.client.companyName} onChange={(e) => updateClient('companyName', e.target.value)} placeholder="Acme Federal Solutions" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name *</label>
                    <input type="text" value={proposalData.client.contactName} onChange={(e) => updateClient('contactName', e.target.value)} placeholder="John Smith" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                    <input type="text" value={proposalData.client.contactTitle} onChange={(e) => updateClient('contactTitle', e.target.value)} placeholder="CEO" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                    <input type="email" value={proposalData.client.email} onChange={(e) => updateClient('email', e.target.value)} placeholder="john@acme.com" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                    <input type="tel" value={proposalData.client.phone} onChange={(e) => updateClient('phone', e.target.value)} placeholder="(555) 123-4567" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
                    <input type="text" value={proposalData.client.address} onChange={(e) => updateClient('address', e.target.value)} placeholder="123 Business Ave, Suite 100" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                    <input type="text" value={proposalData.client.city} onChange={(e) => updateClient('city', e.target.value)} placeholder="Tampa" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                      <input type="text" value={proposalData.client.state} onChange={(e) => updateClient('state', e.target.value)} placeholder="FL" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">ZIP</label>
                      <input type="text" value={proposalData.client.zip} onChange={(e) => updateClient('zip', e.target.value)} placeholder="33601" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICES */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Select Services</h2>
                <p className="text-slate-600 mt-1">Choose the services to include in this proposal</p>
              </div>

              {/* Marketing Programs */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Rocket size={20} className="text-blue-600" />
                  Marketing Programs
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {marketingPrograms.map((program) => {
                    const Icon = program.icon;
                    const selected = isServiceSelected(program.id);
                    return (
                      <button type="button" key={program.id} onClick={() => toggleService(program)} className={cn('p-5 rounded-xl border-2 text-left transition-all', selected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20' : 'border-slate-200 bg-white hover:border-slate-300')}>
                        <div className="flex items-start justify-between mb-3">
                          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', selected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600')}>
                            <Icon size={20} />
                          </div>
                          {selected && <CheckCircle size={20} className="text-blue-500" />}
                        </div>
                        <h4 className="font-bold text-slate-900">{program.name}</h4>
                        <p className="text-sm text-slate-500 mb-2">{program.duration}</p>
                        <p className="text-xl font-bold text-slate-900">{formatCurrency(program.price)}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GSA Services */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Shield size={20} className="text-emerald-600" />
                  GSA Contract Services
                </h3>

                {/* GSA Starter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">GSA Starter</span>
                    <span className="text-sm text-slate-500">Entry-Level Compliance</span>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {gsaStarterServices.map(svc => <ServiceCard key={svc.id} service={svc} accentColor="blue" />)}
                  </div>
                </div>

                {/* GSA Modification */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">GSA Modification</span>
                    <span className="text-sm text-slate-500">Contract Modification Services</span>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {gsaModServices.map(svc => <ServiceCard key={svc.id} service={svc} accentColor="amber" />)}
                  </div>
                </div>

                {/* GSA Management */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">GSA Management</span>
                    <span className="text-sm text-slate-500">Ongoing Contract Management</span>
                  </div>

                  {/* Catalog Management — billing picker */}
                  {(() => {
                    const svc = gsaMgmtServices.find(s => s.id === 'mgmt-catalog')!;
                    const selected = isServiceSelected('mgmt-catalog');
                    const activeOption = gsaMgmtBillingOptions.find(o => o.id === gsaMgmtBilling)!;
                    return (
                      <div className={cn('mb-3 p-5 rounded-xl border-2 transition-all', selected ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white')}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', selected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600')}>
                              <Settings size={16} />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{svc.name}</h4>
                              <p className="text-xs text-slate-500 mt-0.5">Select billing term below</p>
                            </div>
                          </div>
                          {selected && <CheckCircle size={16} className="text-emerald-500 shrink-0 ml-4 mt-1" />}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                          {gsaMgmtBillingOptions.map(opt => (
                            <button type="button" key={opt.id} onClick={() => changeGsaMgmtBilling(opt.id)} className={cn('p-2.5 rounded-lg border-2 text-left transition-all', gsaMgmtBilling === opt.id ? 'border-emerald-500 bg-white ring-1 ring-emerald-500/20' : 'border-slate-200 bg-white hover:border-slate-300')}>
                              <div className="text-xs font-semibold text-slate-500 mb-0.5">{opt.label}</div>
                              <div className="text-base font-bold text-slate-900 leading-none">
                                {formatCurrency(opt.price)}<span className="text-xs font-normal text-slate-500">{opt.priceLabel}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{opt.note}</div>
                            </button>
                          ))}
                        </div>
                        <button type="button" onClick={toggleGsaMgmt} className={cn('px-3 py-1.5 rounded-lg font-medium text-sm transition', selected ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800')}>
                          {selected ? 'Remove' : `Add — ${formatCurrency(activeOption.price)}${activeOption.priceLabel}`}
                        </button>
                      </div>
                    );
                  })()}

                  {/* Other management services */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {gsaMgmtServices.filter(s => !s.hasBillingOptions).map(svc => (
                      <ServiceCard key={svc.id} service={svc as typeof gsaStarterServices[0]} accentColor="emerald" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Plus size={20} className="text-purple-600" />
                  Add-On Services
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {addons.map((addon) => {
                    const selected = isServiceSelected(addon.id);
                    return (
                      <button type="button" key={addon.id} onClick={() => toggleService(addon)} className={cn('p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4', selected ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500/20' : 'border-slate-200 bg-white hover:border-slate-300')}>
                        <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center shrink-0', selected ? 'border-purple-500 bg-purple-500' : 'border-slate-300')}>
                          {selected && <Check size={14} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{addon.name}</h4>
                          <p className="text-sm text-slate-500">{addon.description}</p>
                        </div>
                        <div className="font-bold text-slate-900 shrink-0">{formatCurrency(addon.price)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Summary */}
              {proposalData.services.length > 0 && (
                <div className="mt-8 p-6 bg-slate-900 rounded-xl text-white">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-sm text-slate-400">{proposalData.services.length} service{proposalData.services.length !== 1 ? 's' : ''} selected</div>
                      <div className="text-2xl font-bold">{formatCurrency(subtotal)}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {proposalData.services.map(s => (
                        <span key={s.id} className="px-3 py-1 bg-white/10 rounded-full text-sm">{s.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: TERMS */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Proposal Terms</h2>
                <p className="text-slate-600 mt-1">Set the terms and conditions for this proposal</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Proposal Valid For</label>
                    <select title="Proposal valid for" value={proposalData.validDays} onChange={(e) => setProposalData(prev => ({ ...prev, validDays: Number(e.target.value) }))} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
                      <option value={15}>15 days</option>
                      <option value={30}>30 days</option>
                      <option value={45}>45 days</option>
                      <option value={60}>60 days</option>
                      <option value={90}>90 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Terms</label>
                    <select title="Payment terms" value={proposalData.paymentTerms} onChange={(e) => setProposalData(prev => ({ ...prev, paymentTerms: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
                      {paymentTermOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Discount (%)</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="25" step="5" title="Discount percentage" value={proposalData.discount} onChange={(e) => setProposalData(prev => ({ ...prev, discount: Number(e.target.value) }))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                    <div className="w-20 text-center">
                      <span className="text-2xl font-bold text-slate-900">{proposalData.discount}%</span>
                    </div>
                  </div>
                  {proposalData.discount > 0 && (
                    <p className="text-sm text-emerald-600 mt-2">
                      Saving client {formatCurrency(discountAmount)} ({formatCurrency(subtotal)} → {formatCurrency(total)})
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Square Payment Link</label>
                  <input type="url" value={proposalData.squareLink} onChange={(e) => setProposalData(prev => ({ ...prev, squareLink: e.target.value }))} placeholder="https://square.link/u/..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition font-mono text-sm" />
                  <p className="text-sm text-slate-500 mt-2">Paste the Square payment link for this client. It will appear as a "Pay Now" button in the proposal.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes</label>
                  <textarea value={proposalData.notes} onChange={(e) => setProposalData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Any special terms, conditions, or notes for this proposal..." rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Review Proposal</h2>
                  <p className="text-slate-600 mt-1">Review and generate your proposal</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowPreview(true)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition flex items-center gap-2">
                    <Eye size={18} />
                    Preview
                  </button>
                  <button type="button" onClick={generatePDF} disabled={isGenerating} className="px-6 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2 disabled:opacity-50">
                    {isGenerating ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
                    ) : (
                      <><Download size={18} />Generate PDF</>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-4">
                    <Building2 size={16} />CLIENT
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{proposalData.client.companyName}</h3>
                  <p className="text-slate-600 mt-1">{proposalData.client.contactName}</p>
                  {proposalData.client.contactTitle && <p className="text-slate-500 text-sm">{proposalData.client.contactTitle}</p>}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-sm text-slate-600 flex items-center gap-2"><Mail size={14} />{proposalData.client.email}</p>
                    {proposalData.client.phone && <p className="text-sm text-slate-600 flex items-center gap-2"><Phone size={14} />{proposalData.client.phone}</p>}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-4">
                    <Layers size={16} />SERVICES ({proposalData.services.length})
                  </div>
                  <div className="space-y-3">
                    {proposalData.services.map(service => (
                      <div key={service.id} className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm">{service.name}</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(service.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-4">
                    <DollarSign size={16} />PRICING
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {proposalData.discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({proposalData.discount}%)</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-slate-700 flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Valid Until</span>
                      <span>{formatDate(validUntil)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Payment</span>
                      <span>{proposalData.paymentTerms}</span>
                    </div>
                  </div>
                </div>
              </div>

              {proposalData.notes && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-2">
                    <AlertCircle size={16} />NOTES
                  </div>
                  <p className="text-amber-900 whitespace-pre-wrap">{proposalData.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* NAVIGATION */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition flex items-center gap-2">
                <ArrowLeft size={18} />Back
              </button>
            ) : <div />}

            {step < 4 && (
              <button type="button" onClick={() => setStep(step + 1)} disabled={!canProceed()} className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                Continue<ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Proposal Preview</h3>
              <div className="flex gap-2">
                <button type="button" onClick={generatePDF} className="px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2">
                  <Download size={16} />Download PDF
                </button>
                <button type="button" onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition">
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-8 bg-slate-100">
              <div className="bg-white shadow-xl rounded-lg p-12 max-w-[8.5in] mx-auto">

                {/* Header */}
                <div className="flex justify-between items-start mb-10 pb-8 border-b-4 border-slate-900">
                  <div>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">GSA Managers Inc.</h1>
                    <p className="text-slate-500 mt-1">Federal Contractor Consulting</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-600 uppercase tracking-wider">Service Proposal</div>
                    <div className="text-sm text-slate-500 mt-1">{proposalNumber.current}</div>
                    <div className="text-sm text-slate-500">{formatDate(proposalDate)}</div>
                  </div>
                </div>

                {/* Client */}
                <div className="mb-10">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Prepared For</div>
                  <h2 className="text-3xl font-bold text-slate-900">{proposalData.client.companyName}</h2>
                  <p className="text-slate-600 mt-1">{proposalData.client.contactName}{proposalData.client.contactTitle && `, ${proposalData.client.contactTitle}`}</p>
                  <p className="text-slate-500 text-sm mt-2">
                    {proposalData.client.email}{proposalData.client.phone && ` • ${proposalData.client.phone}`}
                  </p>
                  {(proposalData.client.address || proposalData.client.city) && (
                    <p className="text-slate-500 text-sm mt-1">
                      {[proposalData.client.address, [proposalData.client.city, proposalData.client.state, proposalData.client.zip].filter(Boolean).join(', ')].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>

                <p className="text-slate-600 mb-10 leading-relaxed">
                  Thank you for the opportunity to provide this proposal. GSA Managers Inc. is committed to helping your company succeed in the federal marketplace. The following outlines our recommended services based on your business objectives.
                </p>

                {/* Services */}
                <div className="mb-10">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-4">Proposed Services</div>
                  <div className="space-y-4">
                    {proposalData.services.map(service => (
                      <div key={service.id} className="p-5 border border-slate-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg text-slate-900">{service.name}</h4>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded uppercase">
                              {service.tier || (service.category === 'program' ? 'Marketing Program' : service.category === 'addon' ? 'Add-On' : 'GSA Service')}
                            </span>
                          </div>
                          <div className="text-xl font-bold text-slate-900 ml-4 shrink-0">{formatCurrency(service.price)}</div>
                        </div>
                        {service.description && <p className="text-slate-500 text-sm mt-3 leading-relaxed">{service.description}</p>}
                        {service.highlights && service.highlights.length > 0 && (
                          <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                            {service.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />{h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-slate-50 p-6 rounded-lg mb-10">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  {proposalData.discount > 0 && (
                    <div className="flex justify-between py-2 text-emerald-600">
                      <span>Discount ({proposalData.discount}%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-t-2 border-slate-900 mt-2 text-xl font-bold">
                    <span>Total Investment</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Terms */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-xs font-bold text-slate-500 uppercase">Valid Until</div>
                    <div className="font-semibold text-slate-900 mt-1">{formatDate(validUntil)}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-xs font-bold text-slate-500 uppercase">Payment Terms</div>
                    <div className="font-semibold text-slate-900 mt-1">{proposalData.paymentTerms}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-xs font-bold text-slate-500 uppercase">Proposal Valid</div>
                    <div className="font-semibold text-slate-900 mt-1">{proposalData.validDays} Days</div>
                  </div>
                </div>

                {proposalData.notes && (
                  <div className="p-5 bg-amber-50 border-l-4 border-amber-400 rounded-lg mb-10">
                    <div className="font-bold text-slate-900 mb-2">Additional Notes</div>
                    <p className="text-slate-600 whitespace-pre-wrap">{proposalData.notes}</p>
                  </div>
                )}

                {proposalData.squareLink && (
                  <div className="mt-10 p-6 bg-slate-900 rounded-xl text-center">
                    <div className="text-sm text-slate-400 mb-1">Ready to get started?</div>
                    <div className="text-white font-bold text-lg mb-3">Pay Securely Online — {formatCurrency(total)}</div>
                    <a href={proposalData.squareLink} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition text-sm">
                      Pay Now via Square →
                    </a>
                    <div className="text-xs text-slate-500 mt-3">Secure payment powered by Square</div>
                  </div>
                )}

                {/* Signature */}
                <div className="mt-10 pt-10 border-t border-slate-200 max-w-xs">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Client Acceptance</div>
                  <div className="border-b border-slate-900 h-10 mb-2" />
                  <div className="font-semibold text-slate-900">{proposalData.client.contactName}</div>
                  <div className="text-slate-500 text-sm">{proposalData.client.companyName}</div>
                </div>

                <div className="mt-16 pt-6 border-t border-slate-200 text-center">
                  <p className="text-slate-400 text-sm">This proposal is confidential and intended solely for the named recipient.</p>
                  <p className="text-slate-500 text-sm mt-2">GSA Managers Inc. • (813) 665-0308 • Info@GSAManagers.com • www.GSAManagers.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
      `}</style>
    </>
  );
}

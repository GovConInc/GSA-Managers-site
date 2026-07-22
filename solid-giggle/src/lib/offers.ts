/**
 * Master offer catalog + conversion copy dictionary.
 *
 * Pricing architecture:
 *  - Tier 1: immediate-action, a-la-carte offers (quick checkout)
 *  - Tier 2: core maintenance retainers, anchored by the $1,999 standalone mod
 *
 * Copy follows the "Because / That means" framework — every description
 * names what we take off the client's plate, then the payoff.
 */

export interface Offer {
  id: string;
  tier: 1 | 2 | 3;
  name: string;
  priceCents: number;
  displayPrice: string;
  priceNote?: string;
  monthlyOption?: string;
  badge?: string;
  hook: string;
  description: string;
  features: string[];
  orderHref: string;
  learnHref: string;
}

export const OFFERS: Offer[] = [
  {
    id: "fcp-transition",
    tier: 1,
    name: "GSA Catalog Upload & Training for New Contractors",
    priceCents: 999_00,
    displayPrice: "$999",
    priceNote: "flat fee",
    badge: "Most Urgent",
    hook: "Catalog upload, compliance audit, and 1-on-1 training — all in one.",
    description:
      "We execute your full FCP catalog migration, audit your GSA Schedule for compliance, and train your team on every GSA platform. Your catalog goes live on GSA Advantage, your pricing is verified, and you understand how to run your contract.",
    features: [
      "Complete FCP catalog migration & upload",
      "Full GSA Schedule compliance audit",
      "1-on-1 training on all GSA platforms",
      "7-day delivery guarantee",
    ],
    orderHref: "/order?service=fcp-transition",
    learnHref: "/fcp-transition-service",
  },
  {
    id: "standalone-mod",
    tier: 1,
    name: "GSA Modification",
    priceCents: 1999_00,
    displayPrice: "$1,999",
    priceNote: "flat fee",
    hook: "Any modification — prepared, submitted, tracked to completion.",
    description:
      "We prepare and submit any GSA modification: new SINs, products, services, or pricing changes. Documentation, pricing support, CO communications — all included. Submitted within 14 days.",
    features: [
      "Any modification, end-to-end",
      "New SINs, products, or services added",
      "Pricing & documentation prepared for you",
      "Submitted within 14 days",
    ],
    orderHref: "/order?service=standalone-mod",
    learnHref: "/gsa-modification-consultant",
  },
  {
    id: "core-maintenance",
    tier: 2,
    name: "GSA Core Maintenance / Back Office",
    priceCents: 1499_00,
    displayPrice: "$1,499",
    priceNote: "6 months, total",
    monthlyOption: "or $250 / month",
    hook: "6 months of GSA back-office coverage.",
    description:
      "We handle all minor modifications, run three sales assessments, and deliver three training sessions over six months. Your team stops touching GSA admin work.",
    features: [
      "All minor modifications included",
      "3 sales assessments",
      "3 sales training sessions",
      "Ongoing back-office management",
    ],
    orderHref: "/order?service=core-maintenance",
    learnHref: "/gsa-contract-management",
  },
  {
    id: "complete-management",
    tier: 2,
    name: "Complete GSA Management",
    priceCents: 4500_00,
    displayPrice: "$4,500",
    priceNote: "12 months, total",
    monthlyOption: "or $375 / month",
    badge: "Best Value",
    hook: "Full-year management — all backend, all modifications, all eBuy support included.",
    description:
      "Every major and minor modification, all backend services, IFF reporting, FCP catalog maintenance, GSA eBuy support, compliance monitoring, and CO communications — handled for 12 months. Dedicated PM, 14-day submission guarantee.",
    features: [
      "All major & minor modifications included",
      "All backend services & compliance handled",
      "GSA eBuy support & management",
      "14-day submission guarantee",
      "Dedicated project manager",
    ],
    orderHref: "/order?service=complete-management",
    learnHref: "/gsa-contract-management",
  },
  {
    id: "gsa-submission",
    tier: 3,
    name: "GSA Schedule Submission",
    priceCents: 4995_00,
    displayPrice: "$4,995",
    priceNote: "starting at",
    hook: "Full MAS submission — 45-day guarantee, 98% approval rate.",
    description:
      "We prepare and submit your complete GSA MAS offer: eligibility review, SIN selection, pricing narrative, eOffer portal build, and every required document. Submission-ready in 45 days.",
    features: [
      "Eligibility review & SIN selection",
      "Complete document preparation",
      "eOffer portal management",
      "45-day submission guarantee",
    ],
    orderHref: "/order?service=gsa-submission",
    learnHref: "/gsa-schedule-submission",
  },
  {
    id: "new-vendor",
    tier: 3,
    name: "GSA Catalog Upload & Training for New Contractors",
    priceCents: 999_00,
    displayPrice: "$999",
    priceNote: "flat fee",
    hook: "Just got your award? We make it operational.",
    description:
      "FCP catalog baseline upload, 1-on-1 training on GSA Advantage, eBuy, and sales reporting, plus compliance audit. You go from award letter to selling in weeks.",
    features: [
      "Full FCP catalog baseline upload",
      "1-on-1 training on all GSA platforms",
      "Full GSA Schedule compliance audit",
      "7-day delivery guarantee",
    ],
    orderHref: "/order?service=new-vendor",
    learnHref: "/fcp-transition-service",
  },
];

/**
 * Master hover-state copy dictionary — use these action-oriented descriptions
 * globally whenever a specific service is referenced.
 */
export const SERVICE_DICTIONARY: Record<string, string> = {
  "FCP Transition":
    "Full FAS Catalog Platform migration — data prep, baseline upload, validation cycles, and GSA Advantage verification. Your catalog goes live and stays compliant.",
  "Compliance Review":
    "We audit your entire GSA Schedule against current requirements: SAM registration, mass mod status, catalog accuracy, reporting history, and TAA documentation.",
  "Major Modifications":
    "New SINs, products, services, or pricing changes — we prepare the documentation, pricing support, and narrative, then submit and track through approval.",
  "Minor Modifications":
    "Address updates, POC changes, and routine catalog corrections. We handle the paperwork and portal submissions so your team doesn't have to.",
  "Sales Assessment":
    "We review your current catalog, pricing position, and GSA sales history to identify where you're leaving federal revenue on the table.",
  "Sales Training":
    "Practical training on how to find and respond to GSA opportunities — eBuy, GSA Advantage positioning, and agency outreach.",
  "Admin Training":
    "Hands-on training for IFF reporting, eMod submissions, FCP catalog updates, and compliance tracking so your team can handle the basics.",
  "14-Day Guarantee":
    "Every modification we prepare is submitted within 14 days of kickoff. That's a guarantee, not an estimate.",
};

export const TIER1_OFFERS = OFFERS.filter((o) => o.tier === 1);
export const TIER2_OFFERS = OFFERS.filter((o) => o.tier === 2);
export const TIER3_OFFERS = OFFERS.filter((o) => o.tier === 3);

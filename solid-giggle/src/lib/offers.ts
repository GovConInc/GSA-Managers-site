/**
 * Master offer catalog + conversion copy dictionary.
 *
 * Pricing architecture (per GSAmanager Conversion Strategy):
 *  - Tier 1: immediate-action, a-la-carte offers (quick checkout)
 *  - Tier 2: core maintenance retainers, anchored by the $2,999 standalone mod
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
    name: "FCP Transition & Compliance Assurance",
    priceCents: 499_00,
    displayPrice: "$499",
    priceNote: "flat fee",
    badge: "Most Urgent",
    hook: "The mandatory catalog migration — handled this week.",
    description:
      "We execute your mandatory FAS Catalog Platform (FCP) transition and audit your GSA Schedule to guarantee 100% compliance. Because we take on this immediate, complex heavy lifting, your team bypasses the administrative bottleneck and eliminates the risk of suspension. That means your schedule is instantly modernized, secured, and ready to sell.",
    features: [
      "Complete FCP catalog migration",
      "Full GSA Schedule compliance audit",
      "Suspension-risk elimination",
      "Catalog modernized & ready to sell",
    ],
    orderHref: "/order?service=fcp-transition",
    learnHref: "/fcp-transition-service",
  },
  {
    id: "standalone-mod",
    tier: 1,
    name: "Standalone GSA Modification",
    priceCents: 2999_00,
    displayPrice: "$2,999",
    priceNote: "flat fee",
    hook: "One major modification. Start to finish. Flawless.",
    description:
      "We flawlessly execute your single major GSA modification from start to finish. Because we handle the bureaucratic heavy lifting, your team gets new products and services live on your schedule faster — meaning you start capturing that revenue immediately.",
    features: [
      "One major modification, end-to-end",
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
    hook: "Your GSA back office — taken over.",
    description:
      "We take over your ongoing GSA back office and build your baseline revenue strategy. We handle all minor modifications and deliver targeted sales training. Because we secure your foundation, you stop losing ground and actively capture market share.",
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
    name: "GSA Complete Management",
    priceCents: 4500_00,
    displayPrice: "$4,500",
    priceNote: "12 months, total",
    monthlyOption: "or $375 / month",
    badge: "Best Value",
    hook: "A dedicated GSA team for a full year — for $1,501 more than a single mod.",
    description:
      "We act as your dedicated, end-to-end GSA management team for a full year. We execute all modifications, guarantee 14-day submissions, and deliver comprehensive training. Because we eliminate your red tape, your team focuses 100% on driving revenue.",
    features: [
      "All major & minor modifications",
      "14-day submission guarantee",
      "6 sales & admin training sessions",
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
    hook: "Not on the Schedule yet? We get you there.",
    description:
      "We prepare and submit your complete GSA MAS offer — every document, pricing narrative, and portal requirement — with a 45-day submission guarantee. Because we anticipate Contracting Officer concerns before you submit, 98% of our clients are approved.",
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
    name: "New Vendor Special",
    priceCents: 1450_00,
    displayPrice: "$1,450",
    priceNote: "flat fee",
    hook: "Just awarded? Get operational in weeks, not months.",
    description:
      "We handle your FCP Catalog Baseline upload, train your team 1-on-1 on every GSA platform, and include 90 days of complimentary contract management. Because we run your activation, your first federal sale comes faster.",
    features: [
      "Full FCP catalog baseline upload",
      "1-on-1 training on all GSA platforms",
      "Process & procedure documentation",
      "90-day contract management included",
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
    "We handle your complete FAS Catalog Platform migration from start to finish. Because we execute this mandatory shift, your team reclaims its bandwidth to focus entirely on winning bids.",
  "Compliance Review":
    "We aggressively audit and secure your GSA Schedule to guarantee 100% compliance. That means you completely eliminate the risk of suspension while saving your team hundreds of administrative hours.",
  "Major Modifications":
    "We flawlessly execute the heavy lifting of adding new SINs, products, and services to your schedule. That means you actively expand your offerings and capture more market share without draining your internal resources.",
  "Minor Modifications":
    "We offload your tedious, ongoing administrative updates. Because we manage these seamless catalog changes, your schedule stays perfectly positioned for growth while saving you countless hours.",
  "Sales Assessment":
    "We analyze your current offerings and historical data to pinpoint exact revenue opportunities. That means your schedule is strategically positioned to maximize value and win more bids.",
  "Sales Training":
    "We equip your team with data-backed, tactical strategies to win more business. Because your team learns exactly how to navigate the market, you capture more market share and maximize your revenue potential.",
  "Admin Training":
    "We train your team on the most efficient ways to handle reporting and compliance requirements. That means you eliminate bottlenecks entirely and stop wasting bandwidth on administrative red tape.",
  "14-Day Guarantee":
    "We guarantee your modifications and updates are submitted within 14 days. Because speed wins deals, your schedule is optimized and ready to generate revenue faster.",
};

export const TIER1_OFFERS = OFFERS.filter((o) => o.tier === 1);
export const TIER2_OFFERS = OFFERS.filter((o) => o.tier === 2);
export const TIER3_OFFERS = OFFERS.filter((o) => o.tier === 3);

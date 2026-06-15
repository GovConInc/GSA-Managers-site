import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Newspaper,
  Calendar,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  Shield,
  FileText,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { fetchRss } from "../lib/api";
import type { RSSItem } from "../lib/types";

/* ── Topic categories with plain-English explainers and service pitches ── */
interface TopicMatch {
  category: string;
  icon: typeof Shield;
  color: string;
  simplify: string;
  pitch: string;
  ctaLabel: string;
  ctaHref: string;
}

const TOPIC_MAP: { keywords: string[]; match: TopicMatch }[] = [
  {
    keywords: ["FCP", "FAS Catalog Platform", "catalog platform", "SIP", "catalog migration"],
    match: {
      category: "FCP & Catalog",
      icon: AlertTriangle,
      color: "text-red-600 bg-red-50 border-red-100",
      simplify:
        "This affects how your products appear on the government's online store (GSA Advantage). If your catalog isn't on the new FCP system, federal buyers literally can't find you.",
      pitch: "We handle FCP migrations for $499 flat — catalog data prep, upload, validation, and verification that your products are live and findable.",
      ctaLabel: "FCP Migration — $499",
      ctaHref: "/order?service=fcp-transition",
    },
  },
  {
    keywords: ["modification", "mod ", "eMod", "pricing adjustment", "SIN add", "contract modification"],
    match: {
      category: "Modifications",
      icon: FileText,
      color: "text-brand bg-brand/5 border-brand/10",
      simplify:
        "When GSA changes mod rules, it directly affects how you add products, adjust pricing, or expand your contract scope. Getting it wrong means rejections and weeks of delay.",
      pitch: "We submit mods within 14 days, 98% approval rate. $2,999 standalone or included in annual management ($4,500/yr).",
      ctaLabel: "Order a Modification",
      ctaHref: "/order?service=standalone-mod",
    },
  },
  {
    keywords: ["compliance", "IFF", "Industrial Funding Fee", "sales report", "72A", "TDR", "audit"],
    match: {
      category: "Compliance & Reporting",
      icon: Shield,
      color: "text-amber-700 bg-amber-50 border-amber-100",
      simplify:
        "GSA requires ongoing reporting and fee payments. Missing deadlines or filing incorrectly can put your contract at risk — up to and including cancellation.",
      pitch: "Our management plans handle all compliance — IFF reporting, catalog updates, and deadline tracking. $375/month, cancel anytime.",
      ctaLabel: "See Management Plans",
      ctaHref: "/pricing",
    },
  },
  {
    keywords: [
      "small business", "8(a)", "HUBZone", "SDVOSB", "WOSB", "set-aside",
      "disadvantaged", "woman-owned", "veteran",
    ],
    match: {
      category: "Small Business",
      icon: Users,
      color: "text-green-700 bg-green-50 border-green-100",
      simplify:
        "The government sets aside contracts specifically for small businesses, minority-owned firms, veteran-owned companies, and others. These programs give smaller companies access to deals that large firms can't compete for.",
      pitch: "A GSA Schedule combined with the right certifications opens set-aside opportunities across every federal agency. We help you get and maintain your schedule.",
      ctaLabel: "Get Started",
      ctaHref: "/order",
    },
  },
  {
    keywords: [
      "procurement", "acquisition", "solicitation", "award", "task order",
      "BPA", "IDIQ", "OASIS", "GWAC", "Alliant", "Polaris",
    ],
    match: {
      category: "Procurement & Awards",
      icon: TrendingUp,
      color: "text-sky-700 bg-sky-50 border-sky-100",
      simplify:
        "This is about how the government buys things. Changes to procurement rules or new contract vehicles affect which companies can compete for federal work — and how.",
      pitch: "Your GSA Schedule is your ticket into federal procurement. We keep it current, compliant, and ready so you can respond to opportunities instead of managing paperwork.",
      ctaLabel: "Talk to Us",
      ctaHref: "/contact",
    },
  },
  {
    keywords: [
      "MAS", "Multiple Award Schedule", "Schedule", "GSA Advantage", "eBuy",
      "eLibrary", "contract vehicle",
    ],
    match: {
      category: "GSA Schedule",
      icon: Zap,
      color: "text-cta bg-cta/5 border-cta/10",
      simplify:
        "This directly affects GSA Schedule holders. Pay attention — changes to how the MAS program works can impact your catalog, your pricing, or your eligibility.",
      pitch: "We manage GSA Schedules for hundreds of contractors. When the rules change, we adjust your contract before it becomes a problem. $375/month for full management.",
      ctaLabel: "See Management Plans",
      ctaHref: "/pricing",
    },
  },
];

const DEFAULT_TOPIC: TopicMatch = {
  category: "Federal News",
  icon: Newspaper,
  color: "text-ink-muted bg-surface border-warm-border",
  simplify:
    "This is a general update from GSA. While it may not directly affect your schedule, staying informed about federal procurement trends helps you spot opportunities.",
  pitch: "We track GSA policy changes so you don't have to. Our management clients get proactive updates when something affects their contract.",
  ctaLabel: "Learn More",
  ctaHref: "/intelligence",
};

function categorize(title: string, description: string): TopicMatch {
  const text = (title + " " + description).toLowerCase();
  for (const topic of TOPIC_MAP) {
    if (topic.keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return topic.match;
    }
  }
  return DEFAULT_TOPIC;
}

function simplifyTitle(title: string): string {
  // Strip common bureaucratic phrasing
  return title
    .replace(/^GSA\s+/i, "")
    .replace(/Administrator\s+/i, "")
    .replace(/U\.?S\.?\s+General Services Administration\s*/gi, "GSA ")
    .replace(/Federal Acquisition Service\s*/gi, "FAS ")
    .replace(/Multiple Award Schedule\s*/gi, "MAS ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays}d ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  } catch {
    return "";
  }
}

export default function GsaNewsFeed() {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRss("https://www.gsa.gov/_rssfeed/hq_newsReleases.xml");
        if (!cancelled) {
          const sorted = [...data.items].sort((a, b) => {
            if (!a.pubDate) return 1;
            if (!b.pubDate) return -1;
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
          });

          // Prioritize MAS-relevant items
          const masKeywords = ["MAS", "Schedule", "FCP", "catalog", "modification", "compliance", "small business"];
          const relevant = sorted.filter((item) => {
            const text = (item.title + " " + (item.description || "")).toLowerCase();
            return masKeywords.some((kw) => text.includes(kw.toLowerCase()));
          });
          const other = sorted.filter((item) => !relevant.includes(item));
          setItems([...relevant, ...other].slice(0, 20));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load news");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const displayed = showAll ? items : items.slice(0, 6);

  return (
    <section className="bg-ink py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_20%,rgba(182,45,62,0.1),transparent)]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
            <Newspaper size={14} className="text-cta" />
            <span className="text-xs font-semibold uppercase tracking-wide text-cta">
              Live GSA News
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
            GSA updates — simplified.
          </h2>
          <p className="mt-5 text-white/50 text-lg leading-relaxed">
            Latest GSA announcements, translated into plain English. Each update
            includes what it means for your schedule and where we can help.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-white/50">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading GSA news&hellip;</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-white/50 mb-4">Unable to load GSA news at this time.</p>
            <a
              href="https://www.gsa.gov/about-us/newsroom/news-releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cta font-semibold hover:underline"
            >
              Visit GSA Newsroom
              <ExternalLink size={16} />
            </a>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && items.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayed.map((item, idx) => {
                const topic = categorize(item.title, item.description || "");
                const isExpanded = expanded === idx;
                const TopicIcon = topic.icon;

                return (
                  <motion.div
                    key={item.link || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="group"
                  >
                    <div className="h-full rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-white/[0.09] hover:border-white/[0.15]">
                      {/* Card header */}
                      <div className="p-6 lg:p-8">
                        {/* Topic + date row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${topic.color}`}>
                            <TopicIcon size={11} />
                            {topic.category}
                          </span>
                          {item.pubDate && (
                            <span className="text-[11px] text-white/30">
                              {timeAgo(item.pubDate)}
                            </span>
                          )}
                        </div>

                        {/* Simplified title */}
                        <h3 className="font-display text-base font-bold text-white leading-snug mb-3 line-clamp-3">
                          {simplifyTitle(item.title)}
                        </h3>

                        {/* Date */}
                        {item.pubDate && (
                          <div className="flex items-center gap-1.5 text-xs text-white/30 mb-4">
                            <Calendar size={11} />
                            <time dateTime={item.pubDate}>{formatDate(item.pubDate)}</time>
                          </div>
                        )}

                        {/* "What this means" — always visible */}
                        <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 mb-4">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-cta mb-2">
                            What this means
                          </p>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {topic.simplify}
                          </p>
                        </div>

                        {/* Expand for pitch */}
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : idx)}
                          className="text-sm font-semibold text-cta hover:text-cta/80 transition-colors"
                        >
                          {isExpanded ? "Show less" : "How we help →"}
                        </button>

                        {isExpanded && (
                          <div className="mt-4 rounded-xl bg-cta/10 border border-cta/15 p-4">
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                              {topic.pitch}
                            </p>
                            <Link
                              to={topic.ctaHref}
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-cta hover:gap-2.5 transition-all"
                            >
                              {topic.ctaLabel}
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Footer — source link */}
                      <div className="border-t border-white/[0.06] px-6 py-3 lg:px-8">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/30 hover:text-white/60 transition-colors"
                        >
                          Read official GSA release
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Show more / less */}
            {items.length > 6 && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white font-semibold text-sm hover:border-cta/40 hover:text-cta transition-all"
                >
                  {showAll ? "Show Less" : `Show All ${items.length} Updates`}
                </button>
              </div>
            )}

            {/* Attribution */}
            <p className="mt-8 text-center text-xs text-white/25">
              Source:{" "}
              <a
                href="https://www.gsa.gov/about-us/newsroom/news-releases"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/50 transition-colors"
              >
                GSA Newsroom
              </a>{" "}
              — Official releases, simplified by GSA Managers
            </p>
          </>
        )}
      </div>
    </section>
  );
}

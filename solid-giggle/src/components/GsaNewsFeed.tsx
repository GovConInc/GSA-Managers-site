import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Newspaper, Calendar, RefreshCw } from "lucide-react";
import { fetchRss } from "../lib/api";
import type { RSSItem } from "../lib/types";

/** Keywords that are especially relevant to GSA MAS vendors / contractors */
const MAS_KEYWORDS = [
  "MAS",
  "Multiple Award Schedule",
  "Schedule",
  "contract",
  "contractor",
  "procurement",
  "acquisition",
  "small business",
  "vendor",
  "eBuy",
  "GSA Advantage",
  "FCP",
  "catalog",
  "compliance",
  "solicitation",
  "proposal",
  "OneGov",
  "FedRAMP",
  "transactional data",
  "TDR",
  "reseller",
  "rightsizing",
  "8(a)",
  "STARS",
  "OASIS",
  "Alliant",
  "Polaris",
  "GWAC",
  "BPA",
  "eLibrary",
  "SAM",
  "disadvantaged business",
  "HUBZone",
  "SDVOSB",
  "WOSB",
  "set-aside",
  "Indefinite Delivery",
  "IDIQ",
  "modification",
  "mod",
  "pricing",
  "Industrial Funding Fee",
  "IFF",
  "Trade Agreements Act",
  "TAA",
  "sales reporting",
  "72A",
  "FAS",
  "Federal Acquisition Service",
];

function isMasRelevant(title: string, description: string): boolean {
  const combined = (title + " " + description).toLowerCase();
  return MAS_KEYWORDS.some((kw) => combined.includes(kw.toLowerCase()));
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
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRss("https://www.gsa.gov/_rssfeed/hq_newsReleases.xml");
        if (!cancelled) {
          // Sort by date descending and filter for MAS-relevance
          const sorted = [...data.items].sort((a, b) => {
            if (!a.pubDate) return 1;
            if (!b.pubDate) return -1;
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
          });

          // Prioritize MAS-relevant items, then show others
          const relevant = sorted.filter((item) => isMasRelevant(item.title, item.description || ""));
          const other = sorted.filter((item) => !isMasRelevant(item.title, item.description || ""));
          const merged = [...relevant, ...other].slice(0, 20);

          setItems(merged);
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
    <section className="bg-white py-24 lg:py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 border border-cta/20 mb-6">
            <Newspaper size={14} className="text-cta" />
            <span className="text-xs font-semibold uppercase tracking-wide text-cta">
              Official GSA News Feed
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl tracking-tight">
            GSA News &amp; Updates
          </h2>
          <p className="mt-6 text-ink-light text-lg leading-relaxed">
            Stay current on the latest GSA announcements, policy changes, and MAS contract
            developments that affect your federal business.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-ink-light">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading GSA news&hellip;</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-ink-light mb-4">Unable to load GSA news at this time.</p>
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
                const relevant = isMasRelevant(item.title, item.description || "");
                return (
                  <motion.a
                    key={item.link || idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="group block h-full"
                  >
                    <div className="h-full rounded-2xl border border-warm-border bg-white p-6 lg:p-8 transition-all duration-300 hover:shadow-elevated hover:border-cta/40 hover:-translate-y-1 relative overflow-hidden">
                      {/* Relevance badge */}
                      {relevant && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cta/10 text-cta text-[10px] font-bold uppercase tracking-wider">
                            MAS Relevant
                          </span>
                        </div>
                      )}

                      {/* Date */}
                      {item.pubDate && (
                        <div className="flex items-center gap-1.5 text-xs text-ink-light/70 mb-3">
                          <Calendar size={12} />
                          <time dateTime={item.pubDate}>
                            {formatDate(item.pubDate)}
                          </time>
                          <span className="text-ink-light/40">·</span>
                          <span className="text-ink-light/50">{timeAgo(item.pubDate)}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-display text-base font-bold text-ink mb-2 group-hover:text-cta transition-colors leading-snug line-clamp-3">
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="text-ink-light text-sm leading-relaxed line-clamp-3 mb-4">
                          {item.description}
                        </p>
                      )}

                      {/* Read more */}
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cta group-hover:gap-2 transition-all">
                        Read full release
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Show more / less */}
            {items.length > 6 && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-warm-border bg-white text-ink font-semibold text-sm hover:border-cta/40 hover:text-cta transition-all"
                >
                  {showAll ? "Show Less" : `Show All ${items.length} Updates`}
                  <ExternalLink size={14} />
                </button>
              </div>
            )}

            {/* Attribution */}
            <p className="mt-8 text-center text-xs text-ink-light/60">
              Source:{" "}
              <a
                href="https://www.gsa.gov/about-us/newsroom/news-releases"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cta transition-colors"
              >
                GSA Newsroom
              </a>{" "}
              — Official press releases from the U.S. General Services Administration
            </p>
          </>
        )}
      </div>
    </section>
  );
}
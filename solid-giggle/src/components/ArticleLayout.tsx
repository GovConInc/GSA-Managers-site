import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { LinkButton } from "./Button";
import { BRAND } from "../lib/constants";

/* ── Article prose primitives — keep pillar pages readable and consistent ── */

export function P({ children }: { children: ReactNode }) {
  return <p className="text-ink-light text-lg leading-relaxed mb-6">{children}</p>;
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-2xl sm:text-3xl font-bold text-ink mt-14 mb-6 scroll-mt-24">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-xl font-bold text-ink mt-10 mb-4">{children}</h3>;
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3 mb-6 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-ink-light text-lg leading-relaxed">
          <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-cta shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Highlighted aside for key takeaways. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-cta bg-cta/[0.06] p-6 my-8">
      <p className="text-ink leading-relaxed font-medium">{children}</p>
    </div>
  );
}

/** Inline conversion block — the "instant relief button" at decision points. */
export function ArticleCta({
  title,
  body,
  label,
  href,
  price,
}: {
  title: string;
  body: string;
  label: string;
  href: string;
  price?: string;
}) {
  return (
    <div className="rounded-2xl bg-ink p-8 my-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
        <div>
          <h4 className="font-display text-xl font-bold text-white">{title}</h4>
          <p className="mt-2 text-white/70 text-sm leading-relaxed max-w-xl">{body}</p>
        </div>
        <div className="shrink-0 text-center">
          {price && <p className="font-display text-3xl font-bold text-white mb-2">{price}</p>}
          <LinkButton href={href} className="shadow-md whitespace-nowrap">
            {label}
            <ArrowRight size={15} className="ml-2" />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

/* ── Page shell ── */

export default function ArticleLayout({
  title,
  description,
  slug,
  datePublished,
  readTime,
  category,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  readTime: string;
  category: string;
  children: ReactNode;
}) {
  const url = `${BRAND.url}/intelligence/${slug}`;

  return (
    <div className="bg-surface selection:bg-brand/20 selection:text-ink">
      <Helmet>
        <title>{title} | GSA Intelligence Hub</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            datePublished,
            dateModified: datePublished,
            url,
            author: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
            publisher: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
            mainEntityOfPage: url,
          })}
        </script>
      </Helmet>

      {/* Header */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,#E8ECF2,transparent_60%)]" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <Link
            to="/intelligence"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-light hover:text-brand transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            GSA Intelligence Hub
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full bg-cta/10 border border-cta/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-cta mb-5">
              {category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-ink leading-[1.15]">
              {title}
            </h1>
            <div className="mt-6 flex items-center gap-5 text-sm text-ink-muted font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {new Date(datePublished + "T12:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 lg:py-20 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">{children}</div>
      </section>
    </div>
  );
}

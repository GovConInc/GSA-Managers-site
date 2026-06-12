import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "service";
  keywords?: string[];
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  city?: string;
  state?: string;
  geoRegion?: string;
  geoPlacename?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const DEFAULT_OG_IMAGE = "https://gsamanagers.com/og-image.jpg";
const SITE_URL = "https://gsamanagers.com";

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords = [],
  schema,
  noindex = false,
  city,
  state,
  geoRegion,
  geoPlacename,
  article,
}: SEOProps) {
  const fullTitle = title.includes("GSA Managers")
    ? title
    : `${title} | GSA Managers`;

  const geoKeywords = [
    "GSA Schedule consulting",
    "GSA MAS Contract help",
    "federal contracting services",
    "government contract consultants",
    ...(city ? [`GSA Schedule ${city}`, `GSA consultants ${city}`, `federal contracting ${city}`] : []),
    ...(state ? [`GSA Schedule ${state}`, `GSA MAS Contract ${state}`, `government contracts ${state}`] : []),
    ...(city && state ? [`GSA Schedule ${city} ${state}`, `federal contracting ${city} ${state}`] : []),
  ];

  const allKeywords = [...new Set([...keywords, ...geoKeywords])].join(", ");

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${SITE_URL}${canonical ?? ""}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="GSA Managers" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo / Local SEO */}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
      {city && <meta name="city" content={city} />}
      {state && <meta name="state" content={state} />}
      <meta name="country" content="United States" />
      <meta name="ICBM" content="27.9506, -82.4572" />
      <meta name="geo.position" content="27.9506;-82.4572" />

      {/* Article metadata */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

/* ─── Pre-built schema generators ─── */

export function localBusinessSchema(
  name = "GSA Managers",
  description = "Expert GSA Schedule consulting and federal contract management services.",
  url = "https://gsamanagers.com",
  telephone = "(813) 665-0308",
  email = "Info@GSAManagers.com",
  city = "Tampa",
  state = "FL",
  latitude = "27.9506",
  longitude = "-82.4572"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url,
    telephone,
    email,
    image: "https://gsamanagers.com/logo.svg",
    logo: "https://gsamanagers.com/logo.svg",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "GSA Schedule Consulting",
      "GSA MAS Contract Assistance",
      "Federal Contract Management",
      "SAM.gov Registration",
      "SBA Certification Support",
      "Government Proposal Writing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GSA Schedule Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GSA MAS Contract Submission",
            description: "End-to-end GSA Schedule submission support with 45-day guarantee.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Annual Contract Management",
            description: "Ongoing GSA compliance, modifications, and reporting.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "FCP Catalog Baseline Upload",
            description: "Federal Catalog Platform upload within 30-day mandate.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "New Vendor Special",
            description: "Fast-start package for first-time GSA Schedule holders.",
          },
        },
      ],
    },
    sameAs: [
      "https://www.linkedin.com/company/gsa-managers",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(
  name: string,
  description: string,
  url: string,
  provider = "GSA Managers"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "ProfessionalService",
      name: provider,
      url: "https://gsamanagers.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

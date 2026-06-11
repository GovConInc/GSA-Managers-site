/**
 * /api/rss — Proxies external RSS feeds to avoid CORS issues.
 * Accepts ?url= parameter; defaults to GSA News Releases.
 * Returns JSON: { url, items: [{ title, link, pubDate, description }] }
 */
export async function onRequestGet(context) {
  const DEFAULT_RSS = "https://www.gsa.gov/_rssfeed/hq_newsReleases.xml";
  const MAX_ITEMS = 20;

  const url = new URL(context.request.url);
  const feedUrl = url.searchParams.get("url") || DEFAULT_RSS;

  // Only allow gsa.gov RSS feeds for security
  if (!feedUrl.startsWith("https://www.gsa.gov/") && !feedUrl.startsWith("https://sam.gov/")) {
    return json({ error: "Only GSA and SAM.gov RSS feeds are allowed." }, 403);
  }

  try {
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent": "GSA-Managers-site/1.0 (+https://gsamanagers.com)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!res.ok) {
      return json({ error: `Upstream RSS returned ${res.status}` }, 502);
    }

    const xml = await res.text();

    // Simple XML parser — extract <item> elements
    const items = [];
    const itemRegex = /<item[\s>]/gi;
    let match;

    // Find all <item> blocks
    const itemBlocks = [];
    let searchFrom = 0;
    while ((match = itemRegex.exec(xml)) !== null) {
      const start = match.index;
      // Find closing </item>
      const closeIdx = xml.indexOf("</item>", start);
      if (closeIdx === -1) break;
      itemBlocks.push(xml.substring(start, closeIdx + "</item>".length));
      searchFrom = closeIdx + 7;
    }

    for (const block of itemBlocks) {
      if (items.length >= MAX_ITEMS) break;

      const title = extractTag(block, "title");
      const link = extractTag(block, "link");
      const pubDate = extractTag(block, "pubDate");
      const description = extractTag(block, "description");

      if (!title && !link) continue;

      items.push({
        title: decodeEntities(title || ""),
        link: decodeEntities(link || ""),
        pubDate: pubDate || undefined,
        description: decodeEntities(stripHtml(description || "")).slice(0, 300),
      });
    }

    return json({ url: feedUrl, items });
  } catch (err) {
    return json({ error: "Failed to fetch RSS: " + err.message }, 500);
  }
}

function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>\\s*([\\s\\S]*?)\\s*</${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#x200b;/g, "");
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=900, s-maxage=1800", // cache 15 min browser, 30 min CDN
    },
  });
}
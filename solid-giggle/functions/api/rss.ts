const DEFAULT_RSS_URL = "https://sam.gov/content/sam/en/about-sam/newsroom.rss";

export async function onRequestGet(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const { searchParams } = new URL(context.request.url);
    const feedUrl = searchParams.get("url") || DEFAULT_RSS_URL;

    const res = await fetch(feedUrl, {
      headers: { Accept: "application/xml, text/xml, application/rss+xml" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS feed (${res.status})`);
    }

    const xml = await res.text();

    // Simple XML-to-JSON extraction for RSS <item> elements
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[1];
      const get = (tag: string) => {
        const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return m ? (m[1] ?? m[2] ?? "").trim() : "";
      };
      items.push({
        title: get("title"),
        link: get("link"),
        description: get("description"),
        pubDate: get("pubDate"),
      });
    }

    return new Response(JSON.stringify({ items }), { headers: corsHeaders });
  } catch (err: any) {
    console.error("RSS API error:", err);
    return new Response(
      JSON.stringify({ error: err?.message ?? "Failed to fetch RSS" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

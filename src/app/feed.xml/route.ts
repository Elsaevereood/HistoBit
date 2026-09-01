import { getAllPosts } from "@/lib/mdx";

const SITE = "https://histobit.com";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const updated = posts.length ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`;
      const image = post.image.startsWith("http") ? post.image : `${SITE}${post.image}`;
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${esc(post.tag)}</category>
      <enclosure url="${esc(image)}" type="image/jpeg" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Histobit — Military History for Serious People</title>
    <link>${SITE}</link>
    <description>Deep research military history and geopolitics. No mythology.</description>
    <language>en-us</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

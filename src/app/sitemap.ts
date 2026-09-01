import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const SITE = "https://histobit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Newest post date drives the freshness signal on the hub pages
  const newest = posts.length ? new Date(posts[0].updated || posts[0].date) : new Date();
  const newestIn = (section: string) => {
    const p = posts.find((x) => x.section === section);
    return p ? new Date(p.updated || p.date) : newest;
  };

  return [
    { url: SITE, lastModified: newest, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/blog`, lastModified: newest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/blog/military-history`, lastModified: newestIn("military-history"), changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE}/blog/geopolitics`, lastModified: newestIn("geopolitics"), changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...blogUrls,
  ];
}

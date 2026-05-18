import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://histobit.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: "https://histobit.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: "https://histobit.com/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://histobit.com/newsletter", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://histobit.com/shop", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://histobit.com/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: "https://histobit.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://histobit.com/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...blogUrls,
  ];
}

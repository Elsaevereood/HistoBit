import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

export interface FaqItem {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  tag: string;           // keep for backward compat (single tag, legacy)
  tags: string[];        // NEW — array of tags e.g. ["Tactics", "Rome", "Ancient"]
  section: string;       // NEW — either "military-history" or "geopolitics"
  date: string;
  updated?: string;      // NEW — last substantive edit, feeds dateModified
  readTime: string;
  image: string;
  keywords?: string[];
  regionAliases?: string[]; // NEW — alternate historical names e.g. ["Persia"] maps to "Iran"
  faq?: FaqItem[];       // NEW — powers on-page FAQ + FAQPage schema
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: (data.title as string) || "",
    seoTitle: (data.seoTitle as string) || "",
    excerpt: (data.excerpt as string) || "",
    tag: (data.tag as string) || "",
    tags: (data.tags as string[]) || (data.tag ? [data.tag as string] : []),
    section: (data.section as string) || "military-history",
    date: (data.date as string) || "",
    updated: (data.updated as string) || "",
    readTime: (data.readTime as string) || "",
    image: (data.image as string) || "",
    keywords: (data.keywords as string[]) || [],
    regionAliases: (data.regionAliases as string[]) || [],
    faq: (data.faq as FaqItem[]) || [],
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return toMeta(slug, data);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: toMeta(slug, data), content };
}

export function getPostsBySection(section: string): PostMeta[] {
  return getAllPosts().filter((post) => post.section === section);
}

/**
 * Related posts for internal linking.
 * Scoring: shared tag = 3, same section = 2, shared keyword = 1.
 * Ties break toward the more recent post. Never returns the current post.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);

  const norm = (s: string) => s.toLowerCase().trim();
  const currentTags = new Set((current.tags || []).map(norm));
  const currentKeywords = new Set((current.keywords || []).map(norm));

  return all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      for (const t of p.tags || []) if (currentTags.has(norm(t))) score += 3;
      if (p.section === current.section) score += 2;
      for (const k of p.keywords || []) if (currentKeywords.has(norm(k))) score += 1;
      return { post: p, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map((x) => x.post);
}

/** Word count of the MDX body, used for JSON-LD wordCount. */
export function getWordCount(content: string): number {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`|\-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

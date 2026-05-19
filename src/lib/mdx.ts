import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  keywords?: string[];
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || "",
        seoTitle: data.seoTitle || "",
        excerpt: data.excerpt || "",
        tag: data.tag || "",
        date: data.date || "",
        readTime: data.readTime || "",
        image: data.image || "",
        keywords: data.keywords || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title || "",
      seoTitle: data.seoTitle || "",
      excerpt: data.excerpt || "",
      tag: data.tag || "",
      date: data.date || "",
      readTime: data.readTime || "",
      image: data.image || "",
      keywords: data.keywords || [],
    },
    content,
  };
}

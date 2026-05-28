import type { Metadata } from "next";
import { getPostsBySection } from "@/lib/mdx";
import BlogSectionClient from "../BlogSectionClient";

export const metadata: Metadata = {
  title: "Military History Archive — Battles, Tactics & Command | Histobit",
  description:
    "Deep research articles on military history. Battles, tactics, logistics, and command decisions that textbooks summarize in one paragraph. No mythology.",
  alternates: {
    canonical: "https://histobit.com/blog/military-history",
  },
};

export default function MilitaryHistoryPage() {
  const posts = getPostsBySection("military-history");
  return <BlogSectionClient posts={posts} section="military-history" />;
}

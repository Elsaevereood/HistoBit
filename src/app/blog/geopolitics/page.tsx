import type { Metadata } from "next";
import { getPostsBySection } from "@/lib/mdx";
import BlogSectionClient from "../BlogSectionClient";

export const metadata: Metadata = {
  title: "Geopolitics & World Order Analysis | Histobit",
  description:
    "Historically grounded analysis of the forces shaping today's world. Global alliances, maritime sovereignty, resources, proxy wars, and trade wars.",
  alternates: {
    canonical: "https://histobit.com/blog/geopolitics",
  },
};

export default function GeopoliticsPage() {
  const posts = getPostsBySection("geopolitics");
  return <BlogSectionClient posts={posts} section="geopolitics" />;
}

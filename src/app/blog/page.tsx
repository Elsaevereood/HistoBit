import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Military History Blog — Battles, Tactics & Command",
  description:
    "Deep research articles on military history. Battles, tactics, logistics, and command decisions that textbooks summarize in one paragraph. No mythology.",
  keywords: [
    "military history blog",
    "battle analysis",
    "ancient warfare",
    "war tactics",
    "military strategy history",
    "Kings and Generals",
    "history articles",
    "battle of Cannae",
    "Alexander the Great",
    "Roman military",
  ],
  alternates: {
    canonical: "https://histobit.com/blog",
  },
  openGraph: {
    title: "Military History Blog — Histobit",
    description:
      "Deep research articles on battles, tactics, and command decisions. No mythology. Just history the way it deserves to be told.",
    url: "https://histobit.com/blog",
    siteName: "Histobit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://histobit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Histobit Military History Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Military History Blog — Histobit",
    description: "Deep research. No mythology. Real military history.",
    images: ["https://histobit.com/og-image.png"],
    site: "@histobit",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} />;
}

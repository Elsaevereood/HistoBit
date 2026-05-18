import { getAllPosts } from "@/lib/mdx";
import BlogIndexClient from "./BlogIndexClient";

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} />;
}

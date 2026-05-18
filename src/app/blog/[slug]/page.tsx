import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      url: `https://histobit.com/blog/${slug}`,
      images: [{ url: post.meta.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.excerpt,
    },
  };
}

const components = {
  h2: (props: any) => (
    <h2
      style={{
        fontFamily: "'EB Garamond', serif",
        fontStyle: "italic",
        fontSize: "28px",
        fontWeight: 400,
        color: "#3a302a",
        marginTop: "48px",
        marginBottom: "24px",
      }}
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "17px",
        lineHeight: 1.8,
        color: "#3a302a",
        marginBottom: "24px",
      }}
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong
      style={{
        fontWeight: 600,
        color: "#3a302a",
      }}
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr
      style={{
        borderColor: "#d8d0c8",
        borderStyle: "solid",
        borderWidth: "1px 0 0 0",
        margin: "48px 0",
      }}
      {...props}
    />
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#faf5ee" }}>
      <main className="flex-grow" style={{ paddingTop: 100 }}>
        <article className="w-full" style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ marginBottom: 40 }}>
            <Link
              href="/blog"
              className="hover:underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                color: "#c2652a",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              &larr; Back to Archive
            </Link>
          </div>

          <div className="relative w-full mb-12" style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: 12 }}>
            <Image
              src={post.meta.image}
              alt={post.meta.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "#c2652a",
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              {post.meta.tag}
            </div>

            <h1
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(36px, 5vw, 56px)",
                color: "#3a302a",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {post.meta.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#8a7a6e",
              }}
            >
              <span>{new Date(post.meta.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
              <span>&middot;</span>
              <span>{post.meta.readTime}</span>
            </div>
          </div>

          <div className="blog-content pb-20">
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>

        {/* NEWSLETTER CTA STRIP */}
        <section style={{ background: "#c2652a", padding: "80px 48px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "#faf5ee",
                marginBottom: 12,
              }}
            >
              Get the Next Dispatch in Your Inbox
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(250,245,238,0.75)",
                marginBottom: 32,
              }}
            >
              Free weekly newsletter. Real history. No algorithms.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-[320px]"
                style={{
                  padding: "14px 20px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  background: "rgba(250,245,238,0.95)",
                  color: "#3a302a",
                  outline: "none",
                }}
              />
              <button
                className="w-full md:w-auto transition-colors bg-[#3a302a] hover:bg-[#2a221d] text-[#faf5ee]"
                style={{
                  padding: "14px 24px",
                  borderRadius: 8,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Subscribe Free
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

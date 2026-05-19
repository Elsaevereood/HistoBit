import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import Footer from "@/components/Footer";
import BlogAnimations from "./BlogAnimations";

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
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <>
      <h2 className="blog-heading-reveal" style={{
        fontFamily: "'EB Garamond', serif",
        fontStyle: "italic",
        fontSize: "clamp(26px, 3.8vw, 36px)",
        fontWeight: 400,
        color: "#3a302a",
        marginTop: "64px",
        marginBottom: "6px",
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
      }} {...props} />
      <span className="blog-section-rule" />
    </>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="blog-reveal" style={{
      fontFamily: "var(--font-body)",
      fontSize: "17px",
      lineHeight: 1.82,
      color: "#3a302a",
      marginBottom: "22px",
    }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 600, color: "#3a302a" }} {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em style={{ fontStyle: "italic" }} {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr style={{
      borderColor: "#d8d0c8",
      borderStyle: "solid",
      borderWidth: "1px 0 0 0",
      margin: "56px 0",
    }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="blog-reveal" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="blog-img-reveal" {...props} />
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

      {/* Reading progress bar — injected by client component */}
      <div id="blog-progress-bar" />

      {/* Client component handles all scroll animations */}
      <BlogAnimations />

      <main className="flex-grow" style={{ paddingTop: 80 }}>

          {/* Hero image — full viewport width, outside article container */}
          <div className="blog-hero-wrap-full">
            <div className="blog-hero-img" id="blog-hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.meta.image} alt={post.meta.title} />
            </div>
            <div className="blog-hero-overlay-full" />
          </div>

        <article className="w-full" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

          {/* Back link */}
          <div className="blog-reveal" style={{ marginBottom: 40, marginTop: 48 }}>
            <Link
              href="/blog"
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

          {/* Meta: tag, title, date */}
          <div className="blog-reveal" style={{ marginBottom: 44 }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{
                border: "1.5px solid #c2652a",
                borderRadius: 4,
                padding: "3px 10px",
              }}>
                {post.meta.tag}
              </span>
            </div>

            <h1 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(34px, 5vw, 54px)",
              color: "#3a302a",
              lineHeight: 1.12,
              marginBottom: 24,
              letterSpacing: "-0.01em",
            }}>
              {post.meta.title}
            </h1>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
              paddingBottom: 32,
              borderBottom: "1px solid rgba(216,208,200,0.6)",
            }}>
              <span>
                {new Date(post.meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <span>&middot;</span>
              <span>{post.meta.readTime}</span>
            </div>
          </div>

          {/* Article body */}
          <div className="blog-content">
            <MDXRemote source={post.content} components={components} />
          </div>

        </article>

        {/* Newsletter CTA */}
        <section style={{ background: "#c2652a", padding: "80px 48px", marginTop: 80 }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#faf5ee",
              marginBottom: 12,
            }}>
              Get the Next Dispatch in Your Inbox
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "rgba(250,245,238,0.75)",
              marginBottom: 32,
            }}>
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

      <Footer />
    </div>
  );
}

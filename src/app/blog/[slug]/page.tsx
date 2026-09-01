import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllPosts, getPostBySlug, getRelatedPosts, getWordCount } from "@/lib/mdx";
import { SITE_URL, SITE_NAME, AUTHOR, ORGANIZATION, SECTION_LABELS } from "@/lib/site";
import Footer from "@/components/Footer";
import BlogAnimations from "./BlogAnimations";
import ShareBar from "@/components/ui/ShareBar";
import BlogTOC from "./BlogTOC";


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

  // Use seoTitle if provided, otherwise fall back to editorial title
  const metaTitle = post.meta.seoTitle || post.meta.title;
  const canonicalUrl = `https://histobit.com/blog/${slug}`;
  const absoluteImage = post.meta.image.startsWith("http")
    ? post.meta.image
    : `https://histobit.com${post.meta.image}`;

  return {
    title: metaTitle,
    description: post.meta.excerpt,
    keywords: post.meta.keywords && post.meta.keywords.length > 0
      ? post.meta.keywords
      : ["military history", "war history", "battle analysis", "Histobit"],
    authors: [{ name: "Histobit", url: "https://histobit.com" }],
    creator: "Histobit",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: post.meta.excerpt,
      type: "article",
      url: canonicalUrl,
      siteName: "Histobit",
      locale: "en_US",
      publishedTime: new Date(post.meta.date).toISOString(),
      authors: ["Histobit"],
      tags: post.meta.keywords || [],
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: post.meta.excerpt,
      images: [absoluteImage],
      site: "@histobit",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    const hasBlock = React.Children.toArray(props.children).some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === "img" ||
          child.type === "table" ||
          typeof child.type === "function" ||
          (child.type as any) === "figure")
    );
    const Component = hasBlock ? "div" : "p";
    return (
      <Component className="blog-reveal" style={{
        fontFamily: "var(--font-body)",
        fontSize: "17px",
        lineHeight: 1.82,
        color: "#3a302a",
        marginBottom: "22px",
      }} {...props as any} />
    );
  },
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
    <blockquote className="blog-reveal" style={{
      margin: '48px 0',
      padding: '0 0 0 28px',
      borderLeft: '3px solid #c2652a',
    }} {...props} />
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="blog-img-reveal" style={{ margin: '48px 0' }}>
      <Image
        src={typeof src === 'string' ? src : ''}
        alt={alt || ''}
        width={1600}
        height={900}
        sizes="(max-width: 768px) 100vw, 760px"
        quality={80}
        loading="lazy"
        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
      />
      {alt && (
        <figcaption style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: '#8a7a6e',
          fontStyle: 'italic',
          marginTop: 10,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>{alt}</figcaption>
      )}
    </figure>
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="blog-reveal" style={{ overflowX: 'auto', margin: '40px 0' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: '#3a302a',
      }} {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead style={{ background: 'rgba(58,48,42,0.04)', borderBottom: '2px solid rgba(216,208,200,0.8)' }} {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr style={{ borderBottom: '1px solid rgba(216,208,200,0.5)' }} {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th style={{
      padding: '12px 16px',
      textAlign: 'left',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#6b5c4e',
      fontWeight: 600,
    }} {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td style={{
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#3a302a',
      lineHeight: 1.6,
    }} {...props} />
  ),

  StatBox: ({ number, label }: { number: string; label: string }) => (
    <div className="blog-reveal" style={{
      textAlign: 'center',
      padding: '56px 24px',
      margin: '56px 0',
      borderTop: '1px solid rgba(216,208,200,0.6)',
      borderBottom: '1px solid rgba(216,208,200,0.6)',
    }}>
      <div style={{
        fontFamily: "'EB Garamond', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(64px, 10vw, 104px)',
        fontWeight: 400,
        color: '#c2652a',
        lineHeight: 1,
        marginBottom: 16,
      }}>{number}</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        color: '#6b5c4e',
        maxWidth: 420,
        margin: '0 auto',
        lineHeight: 1.65,
      }}>{label}</div>
    </div>
  ),

  FactBox: ({ children }: { children: React.ReactNode }) => (
    <div className="blog-reveal" style={{
      background: 'rgba(194,101,42,0.05)',
      border: '1px solid rgba(194,101,42,0.18)',
      borderLeft: '3px solid #c2652a',
      borderRadius: '0 8px 8px 0',
      padding: '24px 28px',
      margin: '40px 0',
    }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#c2652a',
        fontWeight: 600,
        marginBottom: 10,
      }}>Key Fact</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        color: '#3a302a',
        lineHeight: 1.7,
      }}>{children}</div>
    </div>
  ),

  PullQuote: ({ text, attribution }: { text: string; attribution?: string }) => (
    <div className="blog-reveal" style={{
      margin: '56px -24px',
      padding: '48px 24px',
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #efd5a8 0%, #f5e6c8 40%, #faf5ee 100%)',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: "'EB Garamond', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(22px, 3.5vw, 32px)',
        color: '#3a302a',
        lineHeight: 1.4,
        marginBottom: attribution ? 20 : 0,
        maxWidth: 600,
        margin: '0 auto',
      }}>{text}</p>
      {attribution && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: '#8a7a6e',
          fontWeight: 500,
          marginTop: 20,
        }}>{attribution}</p>
      )}
    </div>
  ),

  Versus: ({ leftLabel, rightLabel, leftItems = [], rightItems = [] }: {
    leftLabel: string; rightLabel: string;
    leftItems?: string[]; rightItems?: string[];
  }) => (
    <div className="blog-reveal" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 40px 1fr',
      margin: '48px 0',
      border: '1px solid rgba(216,208,200,0.6)',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '32px 28px', background: '#faf5ee' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c2652a', fontWeight: 600, marginBottom: 20 }}>{leftLabel}</div>
        {leftItems.map((item: string, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
            <span style={{ color: '#c2652a', marginTop: 2, flexShrink: 0 }}>•</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3a302a', lineHeight: 1.6 }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(216,208,200,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 18, color: '#8a7a6e' }}>vs</span>
      </div>
      <div style={{ padding: '32px 28px', background: 'rgba(58,48,42,0.02)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c3c3c', fontWeight: 600, marginBottom: 20 }}>{rightLabel}</div>
        {rightItems.map((item: string, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
            <span style={{ color: '#8c3c3c', marginTop: 2, flexShrink: 0 }}>•</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3a302a', lineHeight: 1.6 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  Timeline: ({ items = [] }: { items?: Array<{ time: string; event: string }> }) => {
    const safeItems = Array.isArray(items) ? items : [];
    return (
    <div className="blog-reveal" style={{ margin: '48px 0', position: 'relative', paddingLeft: 104 }}>
      <div style={{ position: 'absolute', left: 83, top: 8, bottom: 8, width: 1, background: 'rgba(216,208,200,0.8)' }} />
      {safeItems.map((item: { time: string; event: string }, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28, position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: -104,
            width: 80,
            textAlign: 'right',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: '#8a7a6e',
            fontWeight: 500,
            letterSpacing: '0.04em',
            paddingTop: 2,
          }}>{item.time}</div>
          <div style={{
            position: 'absolute',
            left: -13,
            top: 4,
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#c2652a',
            border: '2px solid #faf5ee',
            boxShadow: '0 0 0 1px #c2652a',
            flexShrink: 0,
          }} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3a302a', lineHeight: 1.65 }}>{item.event}</div>
        </div>
      ))}
    </div>
    );
  },

  BarChart: ({
    title,
    subtitle,
    items = [],
    unit,
  }: {
    title: string;
    subtitle?: string;
    items?: Array<{ label: string; value: number; displayValue?: string; highlight?: boolean }>;
    unit?: string;
  }) => {
    const safeItems = Array.isArray(items) ? items : [];
    const max = safeItems.length > 0 ? Math.max(...safeItems.map((i) => i.value)) : 1;
    return (
      <div className="blog-reveal" style={{ margin: '48px 0', padding: '28px 32px', background: 'rgba(58,48,42,0.02)', border: '1px solid rgba(216,208,200,0.55)', borderRadius: 8 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c2652a', fontWeight: 600, marginBottom: subtitle ? 6 : 24 }}>{title}</div>
        {subtitle && <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#8a7a6e', marginBottom: 24, lineHeight: 1.5 }}>{subtitle}</div>}
        {safeItems.map((item, i) => (
          <div key={i} style={{ marginBottom: i < safeItems.length - 1 ? 20 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: item.highlight ? '#3a302a' : '#6b5c4e', fontWeight: item.highlight ? 500 : 400, lineHeight: 1.4, maxWidth: '70%' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: item.highlight ? '#c2652a' : '#8a7a6e', whiteSpace: 'nowrap', marginLeft: 12 }}>{item.displayValue ?? item.value}{unit || ''}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(216,208,200,0.45)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(item.value / max) * 100}%`, background: item.highlight ? '#c2652a' : 'rgba(194,101,42,0.28)', borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    );
  },

  OrderOfBattle: ({ title, rows = [] }: { title: string; rows?: Array<{ unit: string; commander: string; strength: string }> }) => {
    const safeRows = Array.isArray(rows) ? rows : [];
    return (
    <div className="blog-reveal" style={{ margin: '48px 0' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c2652a', fontWeight: 600, marginBottom: 16 }}>{title}</div>
      <div style={{ border: '1px solid rgba(216,208,200,0.6)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', background: 'rgba(58,48,42,0.04)', padding: '12px 20px', borderBottom: '1px solid rgba(216,208,200,0.6)' }}>
          {['Unit', 'Commander', 'Strength'].map((h: string) => (
            <div key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b5c4e', fontWeight: 600 }}>{h}</div>
          ))}
        </div>
        {safeRows.map((row: { unit: string; commander: string; strength: string }, i: number) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', padding: '14px 20px', borderBottom: i < safeRows.length - 1 ? '1px solid rgba(216,208,200,0.4)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(250,245,238,0.5)' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3a302a', fontWeight: 500 }}>{row.unit}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6b5c4e' }}>{row.commander}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6b5c4e' }}>{row.strength}</div>
          </div>
        ))}
      </div>
    </div>
    );
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const metaTitle = post.meta.seoTitle || post.meta.title;
  const canonicalUrl = `https://histobit.com/blog/${resolvedParams.slug}`;
  const absoluteImage = post.meta.image.startsWith("http")
    ? post.meta.image
    : `https://histobit.com${post.meta.image}`;

  // JSON-LD structured data (@graph: Article + Breadcrumbs + FAQ + Author)
  const sectionLabel = SECTION_LABELS[post.meta.section] || "Archive";
  const sectionUrl = `${SITE_URL}/blog/${post.meta.section}`;
  const faq = post.meta.faq || [];

  const articleSchema = {
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: metaTitle,
    name: post.meta.title,
    description: post.meta.excerpt,
    image: {
      "@type": "ImageObject",
      url: absoluteImage,
      width: 1600,
      height: 900,
    },
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}#author`,
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: AUTHOR.jobTitle,
      description: AUTHOR.description,
      sameAs: AUTHOR.sameAs,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      sameAs: ORGANIZATION.sameAs,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
    datePublished: new Date(post.meta.date).toISOString(),
    dateModified: new Date(post.meta.updated || post.meta.date).toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    url: canonicalUrl,
    keywords: (post.meta.keywords || []).join(", "),
    articleSection: sectionLabel,
    wordCount: getWordCount(post.content),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Archive", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: sectionLabel, item: sectionUrl },
      { "@type": "ListItem", position: 4, name: post.meta.title, item: canonicalUrl },
    ],
  };

  const faqSchema = faq.length
    ? {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])],
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#faf5ee" }}>

      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading progress bar — injected by client component */}
      <div id="blog-progress-bar" />

      {/* Client component handles all scroll animations */}
      <BlogAnimations />

      <main className="flex-grow" style={{ paddingTop: 80 }}>

          {/* Hero image — full viewport width, outside article container */}
          <div className="blog-hero-wrap-full">
            <div className="blog-hero-img" id="blog-hero-img">
              <Image
                src={post.meta.image}
                alt={post.meta.title}
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={80}
              />
            </div>
            <div className="blog-hero-overlay-full" />
          </div>

        <BlogTOC />

        <article className="w-full" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

          {/* Breadcrumb trail — mirrors BreadcrumbList schema */}
          <nav
            className="blog-reveal"
            aria-label="Breadcrumb"
            style={{ marginBottom: 40, marginTop: 48 }}
          >
            <ol style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
            }}>
              <li>
                <Link href="/" style={{ color: "#c2652a", textDecoration: "none" }}>Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" style={{ color: "#c2652a", textDecoration: "none" }}>Archive</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/blog/${post.meta.section}`} style={{ color: "#c2652a", textDecoration: "none" }}>
                  {SECTION_LABELS[post.meta.section] || "Dispatches"}
                </Link>
              </li>
            </ol>
          </nav>

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
                {post.meta.tags && post.meta.tags.length > 0 ? post.meta.tags[0] : post.meta.tag}
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
            <MDXRemote source={post.content} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          <ShareBar title={post.meta.title} slug={resolvedParams.slug} />

        </article>

        {/* FREQUENTLY ASKED — feeds FAQPage schema, targets question queries */}
        {faq.length > 0 && (
          <section
            className="w-full"
            style={{ maxWidth: 760, margin: "72px auto 0 auto", padding: "0 24px" }}
          >
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(26px, 3.8vw, 34px)",
              color: "#3a302a",
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              Frequently Asked
            </h2>
            <div style={{
              width: 48,
              height: 2,
              background: "#c2652a",
              opacity: 0.5,
              marginBottom: 36,
            }} />

            <div style={{ borderTop: "1px solid rgba(216,208,200,0.6)" }}>
              {faq.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "26px 0",
                    borderBottom: "1px solid rgba(216,208,200,0.6)",
                  }}
                >
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#3a302a",
                    marginBottom: 10,
                    lineHeight: 1.45,
                  }}>
                    {item.q}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15.5,
                    lineHeight: 1.78,
                    color: "#5c5048",
                    margin: 0,
                  }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RELATED DISPATCHES */}
        {(() => {
          const currentPost = post.meta;
          const relatedPosts = getRelatedPosts(currentPost.slug, 3);

          if (relatedPosts.length === 0) return null;

          return (
            <section style={{ maxWidth: 1200, margin: "80px auto 0 auto", padding: "0 48px", width: "100%" }}>
              <h3
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 32,
                  color: "#3a302a",
                  marginBottom: 32,
                  textAlign: "center",
                }}
              >
                Related Dispatches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((p) => {
                  const displayedTag = p.tags && p.tags.length > 0 ? p.tags[0] : p.tag;
                  return (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="group no-underline block h-full">
                      <div
                        className="flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:border-[#c2652a] hover:shadow-[0_8px_32px_rgba(194,101,42,0.08)] cursor-pointer"
                        style={{
                          background: "#faf5ee",
                          border: "1px solid rgba(216,208,200,0.6)",
                          borderRadius: 12,
                        }}
                      >
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", height: "auto" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt={p.title}
                            className="object-cover w-full h-full transition-all duration-500 filter grayscale group-hover:grayscale-0"
                          />
                        </div>
                        
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            letterSpacing: "0.1em",
                            color: "#c2652a",
                            fontWeight: 500,
                            marginTop: 24,
                            marginLeft: 28,
                          }}
                        >
                          {displayedTag}
                        </div>
                        
                        <h4
                          style={{
                            fontFamily: "'EB Garamond', serif",
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: 20,
                            lineHeight: 1.3,
                            color: "#3a302a",
                            padding: "10px 28px 0 28px",
                          }}
                        >
                          {p.title}
                        </h4>

                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 13,
                            lineHeight: 1.6,
                            color: "#8a7a6e",
                            padding: "12px 28px 0 28px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {p.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto" style={{ padding: "20px 28px 28px 28px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 12,
                              color: "#8a7a6e",
                            }}
                          >
                            {p.readTime}
                          </span>
                          <span
                            className="group-hover:underline"
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#c2652a",
                            }}
                          >
                            Read More &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })()}

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

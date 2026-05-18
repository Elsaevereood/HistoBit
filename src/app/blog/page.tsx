"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const posts = [
  {
    slug: "battle-of-cannae",
    tag: "TACTICS",
    title: "The Battle of Cannae: How Hannibal Destroyed a Roman Army",
    excerpt: "In 216 BC, Hannibal executed the most devastating double envelopment in military history. Rome lost 70,000 men in a single afternoon.",
    image: "/images/featured_battle_cannae.png",
    readTime: "9 min read",
  },
  {
    slug: "napoleon-russia-logistics",
    tag: "LOGISTICS",
    title: "Napoleon Didn't Lose Russia Because of Winter",
    excerpt: "The Grande Armée was dead before the first snowflake fell. Here's what actually broke the greatest army in the world.",
    image: "/images/archive_napoleon.png",
    readTime: "11 min read",
  },
  {
    slug: "alexander-supply-lines",
    tag: "COMMANDERS",
    title: "Alexander Was Undefeated in 15 Years of War. Here's What He Never Got Wrong",
    excerpt: "It wasn't courage. It wasn't genius. It was something far more boring — and far more important than both.",
    image: "/images/archive_alexander.png",
    readTime: "10 min read",
  },
  {
    slug: "mongol-logistics-empire",
    tag: "LOGISTICS",
    title: "How the Mongols Fed an Empire That Moved Faster Than Any Army in History",
    excerpt: "The Mongol army didn't carry food. It didn't need to. Their logistics system was the most sophisticated the ancient world had ever seen.",
    image: "/images/topic_logistics.png",
    readTime: "8 min read",
  },
  {
    slug: "roman-legion-system",
    tag: "ANCIENT",
    title: "The Roman Legion Wasn't Just an Army. It Was a Machine.",
    excerpt: "The secret of Rome's 700-year military dominance had nothing to do with bravery. It was engineering, repetition, and ruthless standardization.",
    image: "/images/topic_ancient.png",
    readTime: "12 min read",
  },
  {
    slug: "waterloo-final-hours",
    tag: "TACTICS",
    title: "Waterloo: The Four Hours That Ended Napoleon's Empire",
    excerpt: "By 11am on June 18, 1815, Napoleon held every advantage. By 8pm, his empire was finished. What happened in between?",
    image: "/images/youtube_waterloo.png",
    readTime: "10 min read",
  },
];

const filters = ["All", "Tactics", "Commanders", "Logistics", "Ancient", "Modern"];

function BlogCard({ post }: { post: typeof posts[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;
    
    gsap.to(cardRef.current, {
      rotateX: -yPercent * 6,
      rotateY: xPercent * 6,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.03, duration: 0.3, ease: "power2.out" });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    }
    const img = cardRef.current?.querySelector(".card-img");
    if (img) {
      gsap.to(img, { filter: "grayscale(0%)", duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power2.out" });
    }
    const img = cardRef.current?.querySelector(".card-img");
    if (img) {
      gsap.to(img, { filter: "grayscale(100%)", duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div className="relative group blog-card-wrapper" style={{ perspective: "1000px" }}>
      <div
        ref={glowRef}
        className="absolute inset-[-20px] rounded-[36px] z-0 pointer-events-none"
        style={{
          background: "rgba(194,101,42,0.18)",
          filter: "blur(48px)",
          opacity: 0,
          transform: "scale(0.85)",
        }}
      />
      <div
        ref={cardRef}
        className="relative z-10 flex flex-col overflow-hidden cursor-pointer h-full"
        style={{
          background: "#faf5ee",
          border: "1px solid rgba(216,208,200,0.6)",
          borderRadius: 12,
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", height: "auto" }}>
          <Image
            src={post.image}
            alt={post.title}
            width={700}
            height={394}
            className="card-img object-cover w-full h-full"
            style={{ filter: "grayscale(100%)" }}
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
          {post.tag}
        </div>
        
        <h3
          style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.25,
            color: "#3a302a",
            padding: "10px 28px 0 28px",
          }}
        >
          {post.title}
        </h3>
        
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.7,
            color: "#8a7a6e",
            padding: "12px 28px 0 28px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-auto" style={{ padding: "20px 28px 28px 28px" }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "#8a7a6e",
            }}
          >
            {post.readTime}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="hover:underline"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              color: "#c2652a",
              textDecoration: "none",
            }}
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogIndexPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const preLabelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        preLabelRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );
      
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll("span.word");
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power3.out" },
          "-=0.1"
        );
      }
      
      tl.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      gsap.fromTo(
        controlsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: {
            trigger: controlsRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(
        ".blog-card-wrapper",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, [activeFilter, searchQuery]);

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === "All" || post.tag === activeFilter.toUpperCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf5ee", paddingTop: 64 }}>
      {/* HERO HEADER SECTION */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: 320,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #efd5a8 0%, #f5e6c8 40%, #faf5ee 100%)",
        }}
      >
        <div className="grain-overlay" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <div
            ref={preLabelRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
            }}
          >
            MILITARY HISTORY &middot; THE ARCHIVE
          </div>
          <h1
            ref={headingRef}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(52px, 6vw, 80px)",
              color: "#3a302a",
              lineHeight: 1.05,
              marginTop: 12,
            }}
          >
            {"The Archive".split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-3 last:mr-0">{word}</span>
            ))}
          </h1>
          <p
            ref={subtextRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "#8a7a6e",
              maxWidth: 480,
              lineHeight: 1.6,
              marginTop: 16,
            }}
          >
            Every dispatch, every battle, every story. Deep research with no mythology.
          </p>
        </div>
      </section>

      {/* CONTROLS BAR */}
      <section ref={controlsRef} className="w-full" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px 0 48px" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
              fontWeight: 500,
            }}
          >
            {filteredPosts.length} Dispatches
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search the archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[220px] focus:outline-none transition-colors"
              style={{
                background: "#ffffff",
                border: "1px solid #d8d0c8",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 13,
                fontFamily: "var(--font-body)",
                color: "#3a302a",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#c2652a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d8d0c8")}
            />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="transition-colors"
                    style={{
                      borderRadius: 20,
                      padding: "8px 16px",
                      fontSize: 12,
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      background: isActive ? "#c2652a" : "transparent",
                      color: isActive ? "#faf5ee" : "#8a7a6e",
                      border: isActive ? "1px solid #c2652a" : "1px solid #d8d0c8",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#c2652a";
                        e.currentTarget.style.color = "#c2652a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#d8d0c8";
                        e.currentTarget.style.color = "#8a7a6e";
                      }
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section ref={gridRef} className="w-full" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 48px 120px 48px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-20" style={{ fontFamily: "var(--font-body)", color: "#8a7a6e" }}>
            No dispatches found matching your criteria.
          </div>
        )}
      </section>

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
              className="w-full md:w-auto transition-colors"
              style={{
                padding: "14px 24px",
                borderRadius: 8,
                background: "#3a302a",
                color: "#faf5ee",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2a221d")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3a302a")}
            >
              Subscribe Free
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

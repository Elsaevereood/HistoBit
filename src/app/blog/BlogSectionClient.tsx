"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import type { PostMeta } from "@/lib/mdx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



const SECTION_CONFIG = {
  "military-history": {
    label: "MILITARY HISTORY · THE ARCHIVE",
    heading: "The Archive",
    subtext: "Every dispatch, every battle, every story. Deep research with no mythology.",
    searchPlaceholder: "Search military history...",
    countLabel: "Dispatches",
  },
  "geopolitics": {
    label: "GEOPOLITICS · WORLD ORDER",
    heading: "World Order",
    subtext: "Historically grounded analysis of the forces shaping today's world.",
    searchPlaceholder: "Search geopolitics...",
    countLabel: "Dispatches",
  }
};

function BlogCard({ post }: { post: PostMeta }) {
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

  const displayedTag = post.tags && post.tags.length > 0 ? post.tags[0] : post.tag;

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
          {displayedTag}
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

export default function BlogSectionClient({
  posts,
  section
}: {
  posts: PostMeta[];
  section: "military-history" | "geopolitics";
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  const availableTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    posts.forEach(post => {
      const tagList = post.tags && post.tags.length > 0 ? post.tags : [post.tag];
      tagList.forEach(t => {
        if (t) tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  const preLabelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const config = SECTION_CONFIG[section];

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
  }, [section]);

  // Suggestions filter — searches existing tags from posts
  const handleTagInputChange = (val: string) => {
    setTagInputValue(val);
    if (!val.trim()) {
      setTagSuggestions([]);
      return;
    }

    const filtered = availableTags
      .filter(({ tag }) => tag.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 6)
      .map(({ tag }) => tag);
    setTagSuggestions(filtered);
  };

  // Add tag chip action
  const addActiveChip = (tag: string) => {
    const formattedTag = tag.trim();
    if (!formattedTag) return;
    
    if (!activeChips.some(c => c.toLowerCase() === formattedTag.toLowerCase())) {
      setActiveChips([...activeChips, formattedTag]);
    }
    setTagInputValue("");
    setTagSuggestions([]);
  };

  // Input key controls — allow free-form keyword chips even if no tag suggestion matches
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagSuggestions.length > 0) {
        addActiveChip(tagSuggestions[0]);
      } else if (tagInputValue.trim()) {
        // Allow adding any keyword as a chip, not just existing tags
        addActiveChip(tagInputValue.trim());
      }
    } else if (e.key === "Escape") {
      setTagInputValue("");
      setTagSuggestions([]);
    }
  };

  // Remove single chip
  const removeChip = (indexToRemove: number) => {
    setActiveChips(activeChips.filter((_, i) => i !== indexToRemove));
  };

  // Clear all chips
  const clearAllChips = () => {
    setActiveChips([]);
  };

  // Filtering logic
  const filteredPosts = posts.filter(post => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(t => t.toLowerCase().includes(searchLower)) ||
      (post.regionAliases || []).some(a => a.toLowerCase().includes(searchLower));

    // Tag chip filter — AND logic: post must match ALL active chips
    // Searches across tags, regionAliases, title, excerpt, and keywords
    // so free-form chips like "USA" or "Pearl Harbor" work even if not an exact tag
    const matchesChips = activeChips.length === 0 ||
      activeChips.every(chip => {
        const c = chip.toLowerCase();
        return (
          post.tags.some(t => t.toLowerCase().includes(c)) ||
          (post.regionAliases || []).some(a => a.toLowerCase().includes(c)) ||
          post.title.toLowerCase().includes(c) ||
          post.excerpt.toLowerCase().includes(c) ||
          (post.keywords || []).some(k => k.toLowerCase().includes(c))
        );
      });

    return matchesSearch && matchesChips;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf5ee", paddingTop: 64 }}>
      <Navigation />
      
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
            {config.label}
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
            {config.heading.split(" ").map((word, i) => (
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
            {config.subtext}
          </p>
        </div>
      </section>

      {/* CONTROLS BAR */}
      <section ref={controlsRef} className="w-full" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px 0 48px" }}>
        {availableTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {availableTags.slice(0, 12).map(({ tag, count }) => {
              const isActive = activeChips.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => isActive ? removeChip(activeChips.indexOf(tag)) : addActiveChip(tag)}
                  style={{
                    borderRadius: 20,
                    padding: "7px 14px",
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
                  {tag} <span style={{ opacity: 0.6 }}>({count})</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
              fontWeight: 500,
            }}
          >
            {filteredPosts.length} {config.countLabel}
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <input
              type="text"
              placeholder={config.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[220px] focus:outline-none transition-colors"
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

            {/* Tag Filter Input with Autocomplete Dropdown */}
            <div className="relative w-full sm:w-[180px]">
              <input
                type="text"
                placeholder="Add filter..."
                value={tagInputValue}
                onChange={(e) => handleTagInputChange(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                className="w-full focus:outline-none transition-colors"
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

              {tagInputValue.trim() && (tagSuggestions.length > 0 || tagInputValue.trim()) && (
                <div
                  className="absolute left-0 mt-1 w-full flex flex-col z-[100]"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d8d0c8",
                    borderRadius: 8,
                    boxShadow: "0 4px 16px rgba(58, 48, 42, 0.08)",
                    overflow: "hidden",
                  }}
                >
                  {tagSuggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      onClick={() => addActiveChip(suggestion)}
                      className="cursor-pointer transition-colors duration-150"
                      style={{
                        padding: "8px 16px",
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "#3a302a",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(194, 101, 42, 0.06)";
                        e.currentTarget.style.color = "#c2652a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#3a302a";
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                  {tagSuggestions.length === 0 && tagInputValue.trim() && (
                    <div
                      onClick={() => addActiveChip(tagInputValue.trim())}
                      className="cursor-pointer transition-colors duration-150"
                      style={{
                        padding: "8px 16px",
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "#8a7a6e",
                        fontStyle: "italic",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(194, 101, 42, 0.06)";
                        e.currentTarget.style.color = "#c2652a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#8a7a6e";
                      }}
                    >
                      Search for &ldquo;{tagInputValue.trim()}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ACTIVE CHIPS STRIP */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 transition-all duration-300">
            {activeChips.map((chip, idx) => (
              <div
                key={chip}
                className="flex items-center gap-1.5"
                style={{
                  background: "rgba(194, 101, 42, 0.10)",
                  border: "1px solid rgba(194, 101, 42, 0.3)",
                  borderRadius: 20,
                  padding: "6px 12px",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#c2652a",
                  fontWeight: 500,
                }}
              >
                <span>{chip}</span>
                <button
                  onClick={() => removeChip(idx)}
                  className="focus:outline-none cursor-pointer flex items-center justify-center p-0.5 rounded-full"
                  style={{
                    color: "#c2652a",
                    background: "none",
                    border: "none",
                    fontSize: 14,
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#8c3c3c")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c2652a")}
                >
                  &times;
                </button>
              </div>
            ))}
            {activeChips.length > 1 && (
              <button
                onClick={clearAllChips}
                className="focus:outline-none cursor-pointer transition-colors duration-150"
                style={{
                  background: "none",
                  border: "none",
                  color: "#8a7a6e",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  padding: "4px 8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c2652a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7a6e")}
              >
                Clear all
              </button>
            )}
          </div>
        )}
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

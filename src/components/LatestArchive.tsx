"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupImageReveal, setupHeadingAnimation, setupCardHover, setupScrollReveal } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

import type { PostMeta } from "@/lib/mdx";

interface LatestArchiveProps {
  posts: PostMeta[];
}

export default function LatestArchive({ posts }: LatestArchiveProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgWrapsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) setupHeadingAnimation(headingRef.current);
      cardsRef.current.forEach((el, i) => { if (el) setupScrollReveal(el, { delay: i * 0.1 }); });
      innerCardsRef.current.forEach((el) => { if (el) setupCardHover(el); });
      imgWrapsRef.current.forEach((el) => { if (el) setupImageReveal(el); });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="latest-archive" style={{ background: "#faf5ee", padding: "120px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500, marginBottom: 12 }}>THE ARCHIVE</div>
            <h2 ref={headingRef} style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 4vw, 48px)", color: "#3a302a", lineHeight: 1.1 }}>Latest Dispatches</h2>
          </div>
          <Link href="/blog" className="cta-link" style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#c2652a", textDecoration: "none" }}>View All Dispatches →</Link>
        </div>

        <div className="archive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {posts.map((post, i) => (
            <div key={post.slug} ref={(el) => { cardsRef.current[i] = el; }} style={{ position: "relative" }}>
              <div className="card-glow" style={{ position: "absolute", inset: -20, background: "rgba(194,101,42,0.18)", filter: "blur(48px)", borderRadius: 36, zIndex: 0, opacity: 0, transform: "scale(0.85)", transition: "opacity 400ms, transform 400ms", pointerEvents: "none" }} />
              <div ref={(el) => { innerCardsRef.current[i] = el; }} style={{ background: "#faf5ee", border: "1px solid rgba(216,208,200,0.6)", borderRadius: 12, overflow: "hidden", zIndex: 1, position: "relative", cursor: "pointer", willChange: "transform", display: "flex", flexDirection: "column" }}>
                <div className="card-sheen" />
                <div ref={(el) => { imgWrapsRef.current[i] = el; }} className="img-reveal-wrapper" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <div className="img-reveal-overlay" />
                  <Image src={post.image} alt={post.title} width={700} height={394} className="card-hover-img" style={{ objectFit: "cover", width: "100%", height: "100%", filter: "grayscale(100%)" }} />
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c2652a", fontWeight: 500, marginBottom: 10 }}>{post.tag}</div>
                  <h3 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 22, color: "#3a302a", lineHeight: 1.25, marginBottom: 12 }}>{post.title}</h3>
                  <p className="line-clamp-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: "#8a7a6e", marginBottom: 20 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e" }}>{post.readTime}</span>
                    <Link href={`/blog/${post.slug}`} className="cta-link" style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#c2652a", textDecoration: "none" }}>Read More →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`@media(max-width:1024px){.archive-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:640px){.archive-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

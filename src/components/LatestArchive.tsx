"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupImageReveal, setupHeadingAnimation, setupScrollReveal } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    category: "LOGISTICS",
    headline: "Napoleon Didn't Lose Russia Because of Winter",
    excerpt: "The Grande Armée was dead before the first snowflake fell. Here's what actually broke the greatest army in the world.",
    image: "/images/archive_napoleon.png",
    link: "#",
    linkText: "Read More",
  },
  {
    category: "COMMANDERS",
    headline: "Alexander Was Undefeated in 15 Years of War. Here's What He Never Got Wrong",
    excerpt: "It wasn't courage. It wasn't genius. It was something far more boring — and far more important.",
    image: "/images/archive_alexander.png",
    link: "#",
    linkText: "Read More",
  },
  {
    category: "COMING SOON",
    headline: "More Dispatches Arriving Soon",
    excerpt: "New research. New battles. New stories. Subscribe to the newsletter and be first when the archive opens.",
    image: "/images/archive_parchment.png",
    link: "#newsletter",
    linkText: "Get Notified →",
  },
];

export default function LatestArchive() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      setupHeadingAnimation(headingRef.current);
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      // Staggered scroll entry on the wrapper
      const wrapper = wrapperRefs.current[i];
      if (wrapper) setupScrollReveal(wrapper, { delay: i * 0.1 });

      // Image reveal
      const imgWrapper = card.querySelector(".img-reveal-wrapper");
      if (imgWrapper) setupImageReveal(imgWrapper as HTMLElement);

      // Five-layer hover — inline, targeting correct refs
      const image = card.querySelector(".card-hover-img") as HTMLElement;
      const glow = glowRefs.current[i];
      const sheen = card.querySelector(".card-sheen") as HTMLElement;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateY = ((x - cx) / cx) * 8;
        const rotateX = ((cy - y) / cy) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        if (sheen) {
          sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,235,200,0.15), transparent 60%)`;
          sheen.style.opacity = "1";
        }
      };

      const handleMouseEnter = () => {
        card.style.transition = "transform 300ms ease-out";
        card.style.transform = "perspective(1000px) scale(1.04)";
        if (image) { image.style.transition = "filter 600ms ease"; image.style.filter = "grayscale(0%)"; }
        if (glow) { glow.style.opacity = "1"; glow.style.transform = "scale(1.0)"; }
        setTimeout(() => { card.style.transition = "none"; }, 300);
      };

      const handleMouseLeave = () => {
        card.style.transition = "transform 450ms ease";
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)";
        if (image) { image.style.transition = "filter 450ms ease"; image.style.filter = "grayscale(100%)"; }
        if (glow) { glow.style.opacity = "0"; glow.style.transform = "scale(0.85)"; }
        if (sheen) { sheen.style.opacity = "0"; }
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });
  }, []);

  return (
    <section
      id="latest-archive"
      style={{
        padding: "120px 0",
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
        paddingLeft: 48,
        paddingRight: 48,
        boxSizing: "border-box",
      }}
    >
      <h2
        ref={headingRef}
        style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(36px, 4vw, 52px)",
          color: "#3a302a",
          marginBottom: 8,
        }}
      >
        Latest from the Archive
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: "#8a7a6e",
          marginBottom: 56,
        }}
      >
        New dispatches every week. No filler. No fluff.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "1fr",
          gap: 32,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {cards.map((card, i) => (
          /* Outer wrapper: relative, for glow positioning */
          <div
            key={i}
            ref={(el) => { wrapperRefs.current[i] = el; }}
            style={{ position: "relative", display: "flex", flexDirection: "column" }}
          >
            {/* Glow: outside the overflow:hidden card, never clipped */}
            <div
              ref={(el) => { glowRefs.current[i] = el; }}
              style={{
                position: "absolute",
                inset: -24,
                background: "rgba(194, 101, 42, 0.22)",
                filter: "blur(56px)",
                borderRadius: 40,
                zIndex: 0,
                opacity: 0,
                transform: "scale(0.85)",
                transition: "opacity 400ms ease, transform 400ms ease",
                pointerEvents: "none",
              }}
            />

            {/* The actual card */}
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                background: "#faf5ee",
                border: "1px solid rgba(216, 208, 200, 0.6)",
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                zIndex: 1,
                willChange: "transform",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Sheen overlay */}
              <div
                className="card-sheen"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  zIndex: 3,
                  borderRadius: "inherit",
                  opacity: 0,
                  transition: "opacity 300ms ease",
                }}
              />

              {/* Image */}
              <div
                className="img-reveal-wrapper"
                style={{ aspectRatio: "16/9", overflow: "hidden", width: "100%", position: "relative" }}
              >
                <div className="img-reveal-overlay" />
                <Image
                  src={card.image}
                  alt={card.headline}
                  width={700}
                  height={394}
                  className="card-hover-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "grayscale(100%)",
                    transition: "filter 600ms ease",
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "28px 32px 32px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#c2652a",
                    fontWeight: 500,
                    marginBottom: 12,
                  }}
                >
                  {card.category}
                </p>
                <h3
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 24,
                    lineHeight: 1.25,
                    color: "#3a302a",
                    marginBottom: 14,
                  }}
                >
                  {card.headline}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#8a7a6e",
                    marginBottom: 24,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {card.excerpt}
                </p>
                <a
                  href={card.link}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#c2652a",
                    textDecoration: "none",
                  }}
                >
                  {card.linkText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

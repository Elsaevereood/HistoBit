"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupImageReveal, setupHeadingAnimation, setupScrollReveal, setupCardHover } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    title: "The Logistics of Genghis Khan's Mongol Horde",
    views: "2.1M Views",
    image: "/images/youtube_genghis.png",
  },
  {
    title: "How Rome Built the Most Effective Army in History",
    views: "1.4M Views",
    image: "/images/youtube_rome_army.png",
  },
  {
    title: "The Real Reason Napoleon Lost at Waterloo",
    views: "980K Views",
    image: "/images/youtube_waterloo.png",
  },
];

export default function FromYouTube() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      setupHeadingAnimation(headingRef.current);
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      setupScrollReveal(card, { delay: i * 0.1 });

      const imgWrapper = card.querySelector(".img-reveal-wrapper");
      if (imgWrapper) setupImageReveal(imgWrapper as HTMLElement);

      setupCardHover(card);
    });
  }, []);

  return (
    <section
      id="from-youtube"
      style={{ padding: "120px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "#c2652a",
          fontWeight: 500,
          marginBottom: 12,
        }}
      >
        ON YOUTUBE
      </p>
      <h2
        ref={headingRef}
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontSize: "clamp(36px, 4vw, 48px)",
          color: "#3a302a",
          marginBottom: 56,
        }}
      >
        Watch the Latest
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 28 }}>
        {videos.map((video, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="interactive-card"
            style={{
              background: "#faf5ee",
              border: "1px solid rgba(216, 208, 200, 0.6)",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="card-glow" />
            <div className="card-sheen" />

            {/* Image with play icon */}
            <div
              className="img-reveal-wrapper relative"
              style={{ aspectRatio: "16/9", overflow: "hidden" }}
            >
              <div className="img-reveal-overlay" />
              <Image
                src={video.image}
                alt={video.title}
                width={600}
                height={338}
                className="card-hover-img w-full h-full object-cover"
                style={{ filter: "grayscale(100%)" }}
              />
              {/* Play icon */}
              <div
                className="absolute z-10"
                style={{
                  bottom: 12,
                  left: 12,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(194, 101, 42, 0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="#faf5ee" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "24px 28px 28px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontSize: 20,
                  lineHeight: 1.25,
                  color: "#3a302a",
                  marginBottom: 12,
                }}
              >
                {video.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#8a7a6e",
                }}
              >
                {video.views}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center" style={{ marginTop: 48 }}>
        <a
          href="#"
          className="cta-link"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 500,
            color: "#c2652a",
            textDecoration: "none",
          }}
        >
          See All Videos on YouTube <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}

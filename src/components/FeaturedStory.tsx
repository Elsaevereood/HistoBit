"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupImageReveal, setupHeadingAnimation, setupScrollReveal } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Image reveal
    if (imageWrapperRef.current) {
      setupImageReveal(imageWrapperRef.current);

      // Parallax on image
      const img = imageWrapperRef.current.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    // Headline split
    if (headlineRef.current) {
      setupHeadingAnimation(headlineRef.current);
    }

    // Right column stagger reveal
    if (rightColRef.current) {
      const children = rightColRef.current.children;
      Array.from(children).forEach((child, i) => {
        setupScrollReveal(child as HTMLElement, { delay: i * 0.1 });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-story"
      style={{ padding: "120px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}
    >
      {/* Label */}
      <p
        className="reveal"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#c2652a",
          fontWeight: 500,
          marginBottom: 32,
        }}
      >
        FEATURED DISPATCH
      </p>

      {/* Two column layout */}
      <div
        className="flex flex-col lg:flex-row items-center"
        style={{ gap: 64 }}
      >
        {/* Left column — Image */}
        <div className="w-full lg:w-[58%]">
          <div
            ref={imageWrapperRef}
            className="img-reveal-wrapper"
            style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}
          >
            <div className="img-reveal-overlay" />
            <Image
              src="/images/featured_battle_cannae.png"
              alt="The Battle of Cannae - Ancient warfare"
              width={800}
              height={600}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%)" }}
              priority
            />
          </div>
        </div>

        {/* Right column — Content */}
        <div ref={rightColRef} className="w-full lg:w-[42%]">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            ANCIENT WARFARE
          </p>

          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "clamp(32px, 3.5vw, 44px)",
              lineHeight: 1.1,
              color: "#3a302a",
              marginBottom: 20,
            }}
          >
            The Day 50,000 Romans Died Before Sunset
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.75,
              color: "#8a7a6e",
              marginBottom: 28,
            }}
          >
            Cannae. 216 BC. Hannibal had 40,000 men and no siege equipment. Rome had 86,000 soldiers and every advantage on paper. By nightfall, Rome had lost more soldiers in a single afternoon than America lost in the entire Vietnam War. This is how it happened — and why every military academy on earth still studies it.
          </p>

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
            Read the Full Dispatch <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { splitTextIntoWords } from "@/lib/animations";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const preHeadlineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subHeadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Pre-headline
    if (preHeadlineRef.current) {
      gsap.set(preHeadlineRef.current, { y: 16, opacity: 0 });
      tl.to(preHeadlineRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    }

    // Headline split animation
    if (headlineRef.current) {
      const spans = splitTextIntoWords(headlineRef.current);
      tl.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.055,
        ease: "power3.out",
      }, "+=0.1");
    }

    // Subheadline
    if (subHeadlineRef.current) {
      gsap.set(subHeadlineRef.current, { y: 20, opacity: 0 });
      tl.to(subHeadlineRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "+=0.15");
    }

    // Buttons
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { y: 16, opacity: 0 });
      tl.to(buttonsRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.2");
    }

    // Trust line
    if (trustRef.current) {
      gsap.set(trustRef.current, { opacity: 0 });
      tl.to(trustRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.15");
    }

  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: "100vh",
        background: "radial-gradient(ellipse 90% 80% at 50% 35%, #efd5a8 0%, #f5e6c8 35%, #faf5ee 75%)",
      }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ maxWidth: 820, padding: "0 24px" }}
      >
        {/* Pre-headline */}
        <p
          ref={preHeadlineRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#c2652a",
            fontWeight: 500,
            marginBottom: 20,
          }}
        >
          MILITARY HISTORY · EST. 2022
        </p>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="hero-headline"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(44px, 6vw, 82px)",
            lineHeight: 1.05,
            color: "#3a302a",
            textAlign: "center",
          }}
        >
          The History They Didn&apos;t Teach You.
        </h1>

        {/* Subheadline */}
        <p
          ref={subHeadlineRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#8a7a6e",
            textAlign: "center",
            maxWidth: 520,
            margin: "24px auto 0",
          }}
        >
          Deep research. No mythology. Every week — for people who actually want to understand war.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center justify-center"
          style={{ marginTop: 32, gap: 16 }}
        >
          <button
            id="hero-read-blog"
            className="transition-all duration-200"
            style={{
              background: "#c2652a",
              color: "#faf5ee",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 8,
              padding: "14px 32px",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a8521f";
              e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#c2652a";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Read the Blog
          </button>
          <button
            id="hero-newsletter"
            className="transition-all duration-200"
            style={{
              background: "transparent",
              color: "#c2652a",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 8,
              padding: "14px 32px",
              border: "1px solid #c2652a",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(194, 101, 42, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Join the Newsletter
          </button>
        </div>

        {/* Trust line */}
        <p
          ref={trustRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "#8a7a6e",
            letterSpacing: "0.04em",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          40,000 subscribers · 8 million views · 60 countries
        </p>
      </div>

    </section>
  );
}

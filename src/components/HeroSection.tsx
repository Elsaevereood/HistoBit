"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextIntoWords } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      if (labelRef.current) {
        gsap.set(labelRef.current, { y: 20, opacity: 0 });
        gsap.to(labelRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
        });
      }

      // Timeline for headline lines
      const tl = gsap.timeline({ delay: 0.6 });

      // Line 1 — word-by-word reveal
      if (line1Ref.current) {
        const spans = splitTextIntoWords(line1Ref.current);
        tl.to(spans, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
        });
      }

      // Line 2 — slide in from left
      if (line2Ref.current) {
        gsap.set(line2Ref.current, { x: -30, opacity: 0 });
        tl.to(
          line2Ref.current,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          ">"
        );
      }

      // Line 3 — fade in
      if (line3Ref.current) {
        gsap.set(line3Ref.current, { opacity: 0 });
        tl.to(
          line3Ref.current,
          {
            opacity: 1,
            duration: 0.6,
          },
          ">"
        );
      }

      // Subheadline
      if (subRef.current) {
        gsap.set(subRef.current, { y: 20, opacity: 0 });
        tl.to(
          subRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          ">"
        );
      }

      // Buttons
      if (btnsRef.current) {
        gsap.set(btnsRef.current, { y: 16, opacity: 0 });
        tl.to(
          btnsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">"
        );
      }

      // Scroll indicator dot loop
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          y: 56,
          opacity: 0,
          duration: 1.4,
          ease: "power1.inOut",
          repeat: -1,
        });
      }

      // Fade in scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });
        gsap.to(scrollIndicatorRef.current, {
          opacity: 1,
          delay: 2,
          duration: 0.8,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      style={{
        background: "#1a1008",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Large decorative background text */}
      <div
        style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(120px, 18vw, 280px)",
          color: "rgba(250,245,238,0.03)",
          position: "absolute",
          bottom: -30,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.02em",
          zIndex: 1,
        }}
      >
        HISTOBIT
      </div>

      {/* Horizontal line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(250,245,238,0.04)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          padding: "0 32px",
          paddingTop: 80,
        }}
      >
        {/* Pre-label */}
        <div
          ref={labelRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#c2652a",
            fontWeight: 500,
            marginBottom: 36,
          }}
        >
          MILITARY HISTORY · EST. 2022
        </div>

        {/* Headline Line 1 */}
        <span
          ref={line1Ref}
          style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(52px, 8vw, 112px)",
            lineHeight: 0.9,
            color: "#faf5ee",
            display: "block",
          }}
        >
          The History
        </span>

        {/* Headline Line 2 — accent word */}
        <div
          ref={line2Ref}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(52px, 8vw, 112px)",
              lineHeight: 0.9,
              color: "#faf5ee",
            }}
          >
            They
          </span>
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(60px, 9vw, 124px)",
              color: "#c2652a",
              fontStyle: "normal",
            }}
          >
            {" Didn't "}
          </span>
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(52px, 8vw, 112px)",
              lineHeight: 0.9,
              color: "#faf5ee",
            }}
          >
            Teach You.
          </span>
        </div>

        {/* Line 3 — year range */}
        <div
          ref={line3Ref}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(250,245,238,0.25)",
            marginTop: 24,
          }}
        >
          2022 — Present
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "rgba(250,245,238,0.55)",
            letterSpacing: "0.02em",
            maxWidth: 480,
            textAlign: "center",
            marginTop: 48,
          }}
        >
          Deep research. No mythology. Every week.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => (window.location.href = "/blog")}
            style={{
              background: "#c2652a",
              color: "#faf5ee",
              padding: "16px 36px",
              borderRadius: 8,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              transition: "background 200ms, transform 200ms",
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
            onClick={() => (window.location.href = "/newsletter")}
            style={{
              background: "transparent",
              color: "rgba(250,245,238,0.8)",
              padding: "16px 32px",
              borderRadius: 8,
              border: "1px solid rgba(250,245,238,0.2)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 200ms, color 200ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(250,245,238,0.5)";
              e.currentTarget.style.color = "#faf5ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(250,245,238,0.2)";
              e.currentTarget.style.color = "rgba(250,245,238,0.8)";
            }}
          >
            Join the Newsletter
          </button>
        </div>

        {/* Trust line */}
        <div
          style={{
            marginTop: 20,
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(250,245,238,0.3)",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          40,000 subscribers · 8 million views · 60 countries
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 1,
            height: 60,
            background: "rgba(250,245,238,0.15)",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            ref={dotRef}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#c2652a",
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(250,245,238,0.25)",
            marginTop: 8,
          }}
        >
          SCROLL
        </div>
      </div>
    </section>
  );
}

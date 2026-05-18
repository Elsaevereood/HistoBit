"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupImageReveal, setupHeadingAnimation, setupScrollReveal } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsHistobit() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageWrapperRef.current) {
      setupImageReveal(imageWrapperRef.current);

      const img = imageWrapperRef.current.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: -12,
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

    if (headlineRef.current) {
      setupHeadingAnimation(headlineRef.current);
    }

    if (rightColRef.current) {
      const children = rightColRef.current.children;
      Array.from(children).forEach((child, i) => {
        setupScrollReveal(child as HTMLElement, { delay: i * 0.08 });
      });
    }
  }, []);

  const identityLines = [
    "Weekly deep dives — never daily noise",
    "Primary sources — not Wikipedia",
    "Military history only — no compromises",
  ];

  return (
    <section
      id="what-is-histobit"
      style={{ padding: "120px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}
    >
      <div
        className="flex flex-col lg:flex-row items-center"
        style={{ gap: 80 }}
      >
        {/* Left — Image */}
        <div className="w-full lg:w-1/2">
          <div
            ref={imageWrapperRef}
            className="img-reveal-wrapper"
            style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "3/4" }}
          >
            <div className="img-reveal-overlay" />
            <Image
              src="/images/historian_portrait.png"
              alt="Historian studying military history documents"
              width={600}
              height={800}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
        </div>

        {/* Right — Content */}
        <div ref={rightColRef} className="w-full lg:w-1/2">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            THE CHANNEL
          </p>

          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "clamp(28px, 3vw, 36px)",
              lineHeight: 1.2,
              color: "#3a302a",
              marginBottom: 24,
            }}
          >
            History Without the Mythology.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.75,
              color: "#8a7a6e",
              marginBottom: 32,
            }}
          >
            Most history content tells you what happened. Histobit tells you why it happened, how it was possible, and what it cost. We cover the battles, the logistics, the supply chains, the command failures, and the turning points that textbooks summarize in one paragraph. Because the real story is always in the details.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {identityLines.map((line, i) => (
              <div key={i} className="flex items-center" style={{ gap: 12 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 2,
                    background: "#c2652a",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#3a302a",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

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
            Watch on YouTube <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

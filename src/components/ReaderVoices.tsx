"use client";

import { useEffect, useRef } from "react";
import { setupHeadingAnimation, setupScrollReveal } from "@/lib/animations";

const quotes = [
  {
    text: "I've watched Kings and Generals for years. But the logistics content on this channel hits different. The Napoleon video changed how I think about warfare entirely.",
    name: "James T., Texas",
    source: "via YouTube",
  },
  {
    text: "Finally a history channel that doesn't dumb things down. The research depth is something else. Keep going.",
    name: "Mark R., London",
    source: "via YouTube",
  },
  {
    text: "I showed the Cannae video to my students. Three of them subscribed that same day.",
    name: "David L., Toronto — History Teacher",
    source: "via YouTube",
  },
];

export default function ReaderVoices() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      setupHeadingAnimation(headingRef.current);
    }

    cardsRef.current.forEach((card, i) => {
      if (card) {
        setupScrollReveal(card, { delay: i * 0.1 });
      }
    });
  }, []);

  return (
    <section
      id="reader-voices"
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
        FROM THE COMMUNITY
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
        What 40,000 Subscribers Are Saying
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 28 }}>
        {quotes.map((quote, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              background: "#faf5ee",
              border: "1px solid rgba(216, 208, 200, 0.6)",
              borderRadius: 12,
              padding: 32,
            }}
          >
            {/* Quote mark */}
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: 64,
                color: "#c2652a",
                opacity: 0.3,
                lineHeight: 0,
                display: "block",
                marginBottom: 16,
                paddingTop: 32,
              }}
            >
              &ldquo;
            </span>

            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.6,
                color: "#3a302a",
                marginBottom: 24,
              }}
            >
              {quote.text}
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#8a7a6e",
              }}
            >
              — {quote.name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "#c2652a",
                marginTop: 4,
              }}
            >
              {quote.source}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { setupImageReveal, setupHeadingAnimation, setupScrollReveal, setupCardHover } from "@/lib/animations";

const products = [
  {
    name: "The Campaign Tee",
    material: "100% washed cotton · Olive",
    price: "₹1,499",
    image: "/images/merch_tee.png",
  },
  {
    name: "The Historian Hoodie",
    material: "Heavyweight fleece · Sand",
    price: "₹2,999",
    image: "/images/merch_hoodie.png",
  },
];

export default function MerchPreview() {
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
      id="merch-preview"
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
        THE STORE
      </p>
      <h2
        ref={headingRef}
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontSize: "clamp(36px, 4vw, 48px)",
          color: "#3a302a",
          marginBottom: 8,
        }}
      >
        Wear the History
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: "#8a7a6e",
          marginBottom: 56,
        }}
      >
        Minimal pieces. Warm materials. For people who take history seriously.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 28 }}>
        {products.map((product, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="interactive-card"
            style={{
              position: "relative",
              cursor: "pointer",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="card-glow" />
            <div className="card-sheen" />

            {/* Image */}
            <div
              className="img-reveal-wrapper"
              style={{
                aspectRatio: "3/4",
                overflow: "hidden",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <div className="img-reveal-overlay" />
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={800}
                className="card-hover-img w-full h-full object-cover"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                padding: "24px 28px 28px",
                background: "#faf5ee",
                border: "1px solid rgba(216, 208, 200, 0.6)",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "#3a302a",
                  marginBottom: 6,
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#8a7a6e",
                  marginBottom: 8,
                }}
              >
                {product.material}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "#c2652a",
                  marginBottom: 12,
                }}
              >
                {product.price}
              </p>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#c2652a",
                  textDecoration: "none",
                }}
              >
                Shop Now →
              </a>
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "#8a7a6e",
          marginTop: 32,
        }}
      >
        Fulfilled by Qikink · Ships across India
      </p>
    </section>
  );
}

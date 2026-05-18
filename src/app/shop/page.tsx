"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { splitTextIntoWords } from "@/lib/animations"

const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

const merchProducts = [
  {
    tag: "APPAREL",
    name: "The Campaign Tee",
    detail: "100% washed cotton · Olive · Unisex",
    price: "₹1,499",
    image: "/images/merch_tee.png",
  },
  {
    tag: "APPAREL",
    name: "The Historian Hoodie",
    detail: "Heavyweight fleece · Sand · Unisex",
    price: "₹2,999",
    image: "/images/merch_hoodie.png",
  },
  {
    tag: "COMING SOON",
    name: "The Field Cap",
    detail: "Washed canvas · Olive · One size",
    price: "₹899",
    image: "/images/topic_commanders.png",
  },
  {
    tag: "COMING SOON",
    name: "The Dispatch Tote",
    detail: "Heavy cotton canvas · Natural",
    price: "₹699",
    image: "/images/topic_logistics.png",
  },
]

export default function ShopPage() {
  const preRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  const ebookImageRef = useRef<HTMLDivElement>(null)
  const ebookContentRef = useRef<HTMLDivElement>(null)

  const merchHeadRef = useRef<HTMLHeadingElement>(null)
  const merchSubRef = useRef<HTMLParagraphElement>(null)

  const whyHeadRef = useRef<HTMLHeadingElement>(null)

  const finalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // HERO ANIMATIONS (delay 0.2s)
    const tl = gsap.timeline({ delay: 0.2 })

    if (preRef.current) {
      tl.fromTo(preRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
    }

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll(".word")
      if (words.length > 0) {
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.055, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
      }
    }

    if (subRef.current) {
      tl.fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
    }

    if (badgesRef.current) {
      tl.fromTo(badgesRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3")
    }

    // EBOOK CONTENT ANIMATIONS
    if (ebookImageRef.current) {
      gsap.fromTo(
        ebookImageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ebookImageRef.current,
            start: "top 80%",
            once: true,
          },
          onComplete: () => {
            gsap.to(ebookImageRef.current, {
              y: "-=6",
              duration: 3,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            })
          },
        }
      )
    }

    if (ebookContentRef.current) {
      const children = ebookContentRef.current.children
      gsap.fromTo(
        children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ebookContentRef.current,
            start: "top 80%",
            once: true,
          },
        }
      )
    }

    // MERCH SECTION
    if (merchHeadRef.current) {
      const words = merchHeadRef.current.querySelectorAll(".word")
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: merchHeadRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }
    }

    if (merchSubRef.current) {
      gsap.fromTo(
        merchSubRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: merchSubRef.current,
            start: "top 85%",
            once: true,
          },
        }
      )
    }

    gsap.fromTo(
      ".merch-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".merch-grid",
          start: "top 85%",
          once: true,
        },
      }
    )

    // WHY HISTOBIT
    if (whyHeadRef.current) {
      const words = whyHeadRef.current.querySelectorAll(".word")
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyHeadRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }
    }

    gsap.fromTo(
      ".why-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".why-grid",
          start: "top 85%",
          once: true,
        },
      }
    )

    // FINAL CTA
    if (finalRef.current) {
      gsap.fromTo(
        finalRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: finalRef.current,
            start: "top 85%",
            once: true,
          },
        }
      )
    }
  }, [])

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    card.style.transform = `scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main style={{ backgroundColor: "#faf5ee", paddingTop: 64 }}>
        {/* === SECTION 1: HERO HEADER === */}
        <section
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, #efd5a8 0%, #f5e6c8 40%, #faf5ee 100%)",
            height: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div className="grain-overlay" />
          <div style={{ maxWidth: 720, padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div
              ref={preRef}
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
              HISTOBIT · THE STORE
            </div>
            <h1
              ref={headingRef}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(48px, 6vw, 80px)",
                lineHeight: 1.05,
                color: "#3a302a",
                textAlign: "center",
                margin: 0,
              }}
              dangerouslySetInnerHTML={{ __html: splitTextIntoWords("Wear the History.") }}
            />
            <p
              ref={subRef}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                color: "#8a7a6e",
                lineHeight: 1.65,
                maxWidth: 480,
                margin: "24px auto 0",
                textAlign: "center",
              }}
            >
              Minimal pieces for people who take history seriously.
              Warm materials. Timeless design. Made to last.
            </p>
            <div ref={badgesRef} style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#8a7a6e",
                  border: "1px solid rgba(216,208,200,0.8)",
                  borderRadius: 20,
                  padding: "6px 14px",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c2652a", flexShrink: 0 }} />
                Fulfilled by Qikink
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#8a7a6e",
                  border: "1px solid rgba(216,208,200,0.8)",
                  borderRadius: 20,
                  padding: "6px 14px",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c2652a", flexShrink: 0 }} />
                Ships Across India
              </div>
            </div>
          </div>
        </section>

        {/* === SECTION 2: EBOOK FEATURED PRODUCT === */}
        <section
          style={{
            backgroundColor: "#faf5ee",
            padding: "100px 48px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 48,
            }}
          >
            DIGITAL PRODUCT
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">
            {/* LEFT COLUMN */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div ref={ebookImageRef} style={{ display: "inline-block", position: "relative" }}>
                <div
                  style={{
                    width: 280,
                    height: 380,
                    background: "linear-gradient(135deg, #3a302a 0%, #1a1008 100%)",
                    borderRadius: "4px 12px 12px 4px",
                    boxShadow: "-8px 8px 32px rgba(58,48,42,0.4), -2px 2px 8px rgba(0,0,0,0.3)",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 32,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(250,245,238,0.02) 2px, rgba(250,245,238,0.02) 4px)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 18,
                      background: "linear-gradient(to right, #0d0804, #1a1008)",
                      borderRadius: "4px 0 0 4px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 22,
                      color: "#faf5ee",
                      textAlign: "center",
                      lineHeight: 1.3,
                      marginBottom: 16,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    The Logistic Nightmare
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 1,
                      background: "rgba(194,101,42,0.6)",
                      margin: "0 auto 16px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(250,245,238,0.5)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    Histobit
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 24,
                      right: 24,
                      fontFamily: "'EB Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 64,
                      color: "rgba(250,245,238,0.06)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    H
                  </div>
                </div>
                <div
                  style={{
                    width: 240,
                    height: 20,
                    background: "radial-gradient(ellipse, rgba(58,48,42,0.25) 0%, transparent 70%)",
                    margin: "16px auto 0",
                    filter: "blur(8px)",
                  }}
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div ref={ebookContentRef}>
              <div
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
                EBOOK · PDF DOWNLOAD
              </div>
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.1,
                  color: "#3a302a",
                  marginBottom: 8,
                }}
              >
                The Logistic Nightmare
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "#8a7a6e",
                  marginBottom: 24,
                  lineHeight: 1.5,
                }}
              >
                Ancient Military Logistics — Alexander, Rome, Hannibal, the Mongols, Napoleon
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
                <div style={{ color: "#c2652a", fontSize: 16, letterSpacing: 2 }}>★★★★★</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", marginLeft: 10 }}>
                  4.9 · 127 readers
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#3a302a",
                  marginBottom: 32,
                }}
              >
                Every army in history ran on one thing that had nothing to do with courage: logistics. This book is the story of how the greatest commanders in ancient history fed, moved, and sustained armies across deserts, mountains, and oceans — and how those who failed to solve the supply problem lost everything. Alexander the Great. The Roman Legion. Hannibal crossing the Alps. The Mongol war machine. Napoleon's catastrophic Russian march. Six commanders. Six logistics systems. One brutal truth: you win before the battle begins, or you don't win at all.
              </p>
              <div>
                {[
                  "6 deep chapters — one per commander, one per logistics system",
                  "87 pages of original research — no Wikipedia, no mythology",
                  "Instant PDF delivery to your inbox after purchase",
                  "Written in Histobit's cinematic, authoritative style",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "#c2652a", flexShrink: 0 }} />
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#3a302a", lineHeight: 1.5 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32, marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 40,
                    color: "#c2652a",
                    fontWeight: 400,
                  }}
                >
                  ₹499
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    color: "#8a7a6e",
                    textDecoration: "line-through",
                  }}
                >
                  ₹799
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 500,
                    background: "rgba(194,101,42,0.12)",
                    color: "#c2652a",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  38% OFF
                </div>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "16px 32px",
                  borderRadius: 8,
                  background: "#c2652a",
                  color: "#faf5ee",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 200ms, transform 150ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#a8521f"
                  e.currentTarget.style.transform = "scale(0.98)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#c2652a"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                Buy Now — Instant PDF Delivery
              </button>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#8a7a6e",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                Secure payment · Instant delivery · PDF format
              </div>
            </div>
          </div>
        </section>

        {/* === SECTION 3: DIVIDER === */}
        <section
          style={{
            backgroundColor: "#faf5ee",
            padding: "0 48px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 1,
              height: 80,
              background: "rgba(216,208,200,0.8)",
              margin: "0 auto",
            }}
          />
        </section>

        {/* === SECTION 4: MERCH SECTION === */}
        <section
          style={{
            backgroundColor: "#faf5ee",
            padding: "80px 48px 120px 48px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            THE COLLECTION
          </div>
          <h2
            ref={merchHeadRef}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "#3a302a",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
            dangerouslySetInnerHTML={{ __html: splitTextIntoWords("Wear the Archive") }}
          />
          <p
            ref={merchSubRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "#8a7a6e",
              marginBottom: 56,
            }}
          >
            Minimal pieces. Warm materials. Designed for people who read history, not just watch it.
          </p>

          <div className="merch-grid grid grid-cols-1 md:grid-cols-2 gap-[32px]">
            {merchProducts.map((product, i) => (
              <div
                key={i}
                className="merch-card group"
                style={{ position: "relative" }}
              >
                <div
                  className="glow-layer opacity-0 group-hover:opacity-100 scale-85 group-hover:scale-100 transition-all duration-400"
                  style={{
                    position: "absolute",
                    inset: -20,
                    background: "rgba(194,101,42,0.18)",
                    filter: "blur(48px)",
                    borderRadius: 36,
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    background: "#faf5ee",
                    border: "1px solid rgba(216,208,200,0.6)",
                    borderRadius: 12,
                    overflow: "hidden",
                    zIndex: 1,
                    position: "relative",
                    cursor: "pointer",
                    willChange: "transform",
                    display: "flex",
                    flexDirection: "column",
                    perspective: 1000,
                    transform: "scale(1) rotateX(0deg) rotateY(0deg)",
                    transition: "transform 300ms ease-out",
                  }}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transition = "none"
                  }}
                >
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", width: "100%", position: "relative" }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "filter 500ms" }}
                      className="group-hover:grayscale-0"
                    />
                  </div>
                  <div style={{ padding: "24px 28px 28px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#c2652a",
                        fontWeight: 500,
                        marginBottom: 10,
                      }}
                    >
                      {product.tag}
                    </div>
                    <div
                      style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "#3a302a",
                        lineHeight: 1.2,
                        marginBottom: 6,
                      }}
                    >
                      {product.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "#8a7a6e",
                        marginBottom: 12,
                      }}
                    >
                      {product.detail}
                    </div>
                    <div
                      style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "#c2652a",
                        marginBottom: 20,
                      }}
                    >
                      {product.price}
                    </div>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#c2652a",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      Shop on Qikink &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
              marginTop: 40,
              textAlign: "center",
            }}
          >
            All merch is fulfilled by Qikink and ships across India within 5–7 business days.
          </div>
        </section>

        {/* === SECTION 5: WHY HISTOBIT STORE === */}
        <section
          style={{
            backgroundColor: "#3a302a",
            padding: "100px 48px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2
              ref={whyHeadRef}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#faf5ee",
                marginBottom: 16,
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: splitTextIntoWords("Why People Buy from Histobit") }}
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "rgba(250,245,238,0.65)",
                textAlign: "center",
                maxWidth: 520,
                margin: "16px auto 64px",
              }}
            >
              We don't make merch to make money. We make it for readers who want to carry the history with them.
            </p>

            <div className="why-grid grid grid-cols-1 md:grid-cols-3 gap-[32px]">
              <div
                className="why-card"
                style={{
                  background: "rgba(250,245,238,0.04)",
                  border: "1px solid rgba(250,245,238,0.1)",
                  borderRadius: 12,
                  padding: 36,
                }}
              >
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 48,
                    color: "#c2652a",
                    opacity: 0.6,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  01
                </div>
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "#faf5ee",
                    marginBottom: 12,
                  }}
                >
                  Quality First
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "rgba(250,245,238,0.65)",
                    lineHeight: 1.7,
                  }}
                >
                  Every piece is tested before it's listed. Washed cotton that actually feels worn-in. Heavyweight fleece that lasts winters. No fast fashion.
                </div>
              </div>

              <div
                className="why-card"
                style={{
                  background: "rgba(250,245,238,0.04)",
                  border: "1px solid rgba(250,245,238,0.1)",
                  borderRadius: 12,
                  padding: 36,
                }}
              >
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 48,
                    color: "#c2652a",
                    opacity: 0.6,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  02
                </div>
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "#faf5ee",
                    marginBottom: 12,
                  }}
                >
                  Minimal Design
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "rgba(250,245,238,0.65)",
                    lineHeight: 1.7,
                  }}
                >
                  No logos plastered everywhere. No slogans. Just quiet, considered design for people who already know what they're about.
                </div>
              </div>

              <div
                className="why-card"
                style={{
                  background: "rgba(250,245,238,0.04)",
                  border: "1px solid rgba(250,245,238,0.1)",
                  borderRadius: 12,
                  padding: 36,
                }}
              >
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 48,
                    color: "#c2652a",
                    opacity: 0.6,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  03
                </div>
                <div
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "#faf5ee",
                    marginBottom: 12,
                  }}
                >
                  Ships Fast
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "rgba(250,245,238,0.65)",
                    lineHeight: 1.7,
                  }}
                >
                  Fulfilled by Qikink, India's best print-on-demand partner. Every order ships within 2 business days and arrives in 5–7.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === SECTION 6: FINAL CTA === */}
        <section
          ref={finalRef}
          style={{
            backgroundColor: "#c2652a",
            padding: "100px 48px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              color: "#faf5ee",
              marginBottom: 16,
            }}
          >
            Start with the Ebook.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              color: "rgba(250,245,238,0.75)",
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "0 auto 40px",
            }}
          >
            87 pages. 6 commanders. One brutal truth about why armies win and lose. Instant PDF delivery. ₹499.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                background: "#3a302a",
                color: "#faf5ee",
                padding: "16px 36px",
                borderRadius: 8,
                fontFamily: "var(--font-body)",
                fontSize: 15,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "background 200ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1008")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3a302a")}
            >
              Buy the Ebook — ₹499
            </button>
            <button
              style={{
                background: "transparent",
                color: "#faf5ee",
                padding: "16px 36px",
                borderRadius: 8,
                fontFamily: "var(--font-body)",
                fontSize: 15,
                fontWeight: 500,
                border: "2px solid rgba(250,245,238,0.4)",
                cursor: "pointer",
                transition: "border-color 200ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(250,245,238,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,245,238,0.4)")}
            >
              Browse the Merch &rarr;
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

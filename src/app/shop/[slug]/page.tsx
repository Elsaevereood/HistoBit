"use client"

import dynamic from "next/dynamic"
import { useParams, notFound } from "next/navigation"
import { getProductBySlug } from "@/data/products"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { splitTextIntoWords } from "@/lib/animations"

gsap.registerPlugin(ScrollTrigger)

const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLUListElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const galleryRef = useRef<(HTMLDivElement | null)[]>([])
  
  const storyHeadRef = useRef<HTMLHeadingElement>(null)
  const storyPRcfs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (!product) return

    // 1. Initial Load Animations (Sticky Column)
    const tl = gsap.timeline()

    if (titleRef.current) {
      const words = splitTextIntoWords(titleRef.current)
      tl.to(words, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out"
      })
    }

    if (priceRef.current) {
      tl.fromTo(priceRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
    }

    if (descRef.current) {
      tl.fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
    }

    if (featuresRef.current) {
      tl.fromTo(featuresRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
    }

    // 2. Gallery Scroll Animations
    const validGallery = galleryRef.current.filter(Boolean) as HTMLDivElement[]
    validGallery.forEach((img, i) => {
      gsap.fromTo(img,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            once: true
          }
        }
      )
    })

    // 3. Story Section Animations
    if (storyHeadRef.current) {
      ScrollTrigger.create({
        trigger: storyHeadRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (storyHeadRef.current) {
            const words = splitTextIntoWords(storyHeadRef.current)
            gsap.to(words, { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 })
          }
        }
      })
    }

    const validStoryPs = storyPRcfs.current.filter(Boolean) as HTMLParagraphElement[]
    if (validStoryPs.length > 0) {
      gsap.fromTo(validStoryPs,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: validStoryPs[0],
            start: "top 85%",
            once: true
          }
        }
      )
    }

  }, [product])

  if (!product) {
    notFound()
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
      
      <main style={{ backgroundColor: "#faf5ee", minHeight: "100vh" }}>
        
        {/* TOP NAV SPACER */}
        <div style={{ height: 100 }} />

        {/* BREADCRUMBS */}
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: 40,
          fontFamily: "var(--font-body)",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#8a7a6e"
        }}>
          <Link href="/shop" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#c2652a"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8a7a6e"}
          >
            SHOP
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span style={{ color: "#3a302a" }}>{product.name}</span>
        </div>

        {/* SPLIT SCREEN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-24 max-w-[1400px] mx-auto px-6 pb-32">
          
          {/* LEFT: STICKY INFO */}
          <div style={{ position: "relative" }}>
            <div style={{ 
              position: "sticky", 
              top: 140, 
              display: "flex", 
              flexDirection: "column",
              paddingBottom: 40
            }}>
              
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#c2652a",
                fontWeight: 500,
                marginBottom: 20
              }}>
                {product.tag}
              </div>
              
              <h1 ref={titleRef} style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.05,
                color: "#1a1008",
                marginBottom: 24,
                marginTop: 0
              }}>
                {product.name}
              </h1>

              <div ref={priceRef} style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
                <div style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 40,
                  color: "#1a1008",
                  fontWeight: 400,
                  lineHeight: 1
                }}>
                  {product.price}
                </div>
                {product.originalPrice && (
                  <>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 18,
                      color: "#8a7a6e",
                      textDecoration: "line-through"
                    }}>
                      {product.originalPrice}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#faf5ee",
                      background: "#c2652a",
                      padding: "4px 10px",
                      borderRadius: 4,
                      alignSelf: "center"
                    }}>
                      SALE
                    </div>
                  </>
                )}
              </div>

              <p ref={descRef} style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "#5a4a40",
                lineHeight: 1.6,
                marginBottom: 32,
                marginTop: 0
              }}>
                {product.description}
              </p>

              <ul ref={featuresRef} style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 40px 0",
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}>
                {product.features.map((feat, idx) => (
                  <li key={idx} style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "#8a7a6e",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10
                  }}>
                    <span style={{ color: "#c2652a", marginTop: 2 }}>✦</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                ref={ctaRef}
                style={{
                  width: "100%",
                  padding: "20px 32px",
                  borderRadius: 8,
                  background: "#1a1008",
                  color: "#faf5ee",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  transition: "background 300ms, transform 300ms"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#c2652a"
                  e.currentTarget.style.transform = "scale(0.98)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1a1008"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                {product.type === "digital" ? "Buy Now — Instant Delivery" : "Add to Cart"}
              </button>

              <div style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                gap: 24,
                flexWrap: "wrap"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e" }}>
                  <span>🔒</span> Secure checkout
                </div>
                {product.type === "physical" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e" }}>
                    <span>📦</span> Worldwide shipping
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: GALLERY & STORY */}
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
            
            {/* Gallery Images */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {product.gallery.map((imgSrc, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { galleryRef.current[idx] = el }}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/5",
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: "#e8dfd5"
                  }}
                >
                  <Image 
                    src={imgSrc}
                    alt={`${product.name} Gallery Image ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={idx === 0}
                  />
                  {/* Subtle grain overlay for cinematic feel */}
                  <div className="grain-overlay" style={{ opacity: 0.3 }} />
                </div>
              ))}
            </div>

            {/* Story Section */}
            <div style={{ 
              padding: "60px 0",
              borderTop: "1px solid rgba(138, 122, 110, 0.2)"
            }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#c2652a",
                fontWeight: 500,
                marginBottom: 32
              }}>
                THE STORY
              </div>

              <h2 ref={storyHeadRef} style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: 1.1,
                color: "#1a1008",
                marginBottom: 40,
                marginTop: 0
              }}>
                {product.story.headline}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {product.story.paragraphs.map((p, idx) => (
                  <p 
                    key={idx}
                    ref={(el) => { storyPRcfs.current[idx] = el }}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 17,
                      color: "#5a4a40",
                      lineHeight: 1.7,
                      margin: 0
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

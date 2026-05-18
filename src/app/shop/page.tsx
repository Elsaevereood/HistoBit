"use client"

import dynamic from "next/dynamic"
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import { splitTextIntoWords } from "@/lib/animations"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function ShopPage() {
  const heroLabelRef = useRef<HTMLDivElement>(null)
  const heroLine1Ref = useRef<HTMLHeadingElement>(null)
  const heroLine2Ref = useRef<HTMLHeadingElement>(null)
  const heroTagRef = useRef<HTMLParagraphElement>(null)
  const heroBtnsRef = useRef<HTMLDivElement>(null)
  const heroScrollDotRef = useRef<HTMLDivElement>(null)
  
  const bookColRef = useRef<HTMLDivElement>(null)
  const buyColRef = useRef<HTMLDivElement>(null)
  
  const storyLabelRef = useRef<HTMLDivElement>(null)
  const storyHead1Ref = useRef<HTMLHeadingElement>(null)
  const storyHead2Ref = useRef<HTMLHeadingElement>(null)
  const storyAttrRef = useRef<HTMLParagraphElement>(null)
  const storyP1Ref = useRef<HTMLParagraphElement>(null)
  const storyP2Ref = useRef<HTMLParagraphElement>(null)
  
  const testimonialsCardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const merchHeadRef = useRef<HTMLHeadingElement>(null)
  const merchCardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const ctaContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Hero
    const tl = gsap.timeline()
    
    if (heroLabelRef.current) {
      tl.fromTo(heroLabelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.3
      )
    }

    if (heroLine1Ref.current && heroLine2Ref.current) {
      const words1 = splitTextIntoWords(heroLine1Ref.current)
      const words2 = splitTextIntoWords(heroLine2Ref.current)
      
      tl.to([...words1, ...words2], {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 1,
        ease: "power3.out"
      }, "+=0")
    }
    
    if (heroTagRef.current) {
      tl.fromTo(heroTagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "+=0"
      )
    }
    
    if (heroBtnsRef.current) {
      tl.fromTo(heroBtnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "+=0"
      )
    }

    if (heroScrollDotRef.current) {
      gsap.fromTo(heroScrollDotRef.current,
        { y: 0, opacity: 1 },
        { y: 56, opacity: 0, duration: 1.5, ease: "power1.inOut", repeat: -1 }
      )
    }
    
    // 2. Product Split
    if (bookColRef.current) {
      gsap.fromTo(bookColRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: bookColRef.current,
            start: "top 75%",
            once: true
          },
          onComplete: () => {
            const bookCover = bookColRef.current?.querySelector(".book-cover")
            if (bookCover) {
              gsap.fromTo(bookCover, 
                { y: 0 },
                { y: -8, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true }
              )
            }
          }
        }
      )
    }
    
    if (buyColRef.current) {
      gsap.fromTo(buyColRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15,
          scrollTrigger: {
            trigger: buyColRef.current,
            start: "top 75%",
            once: true
          }
        }
      )
    }
    
    // 3. Story
    if (storyLabelRef.current) {
      ScrollTrigger.create({
        trigger: storyLabelRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(storyLabelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
          
          if (storyHead1Ref.current && storyHead2Ref.current) {
            const words1 = splitTextIntoWords(storyHead1Ref.current)
            const words2 = splitTextIntoWords(storyHead2Ref.current)
            gsap.to([...words1, ...words2], {
              y: 0, opacity: 1, stagger: 0.05, duration: 0.8, delay: 0.2
            })
          }
          
          if (storyAttrRef.current) {
            gsap.fromTo(storyAttrRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.8 })
          }
          
          if (storyP1Ref.current && storyP2Ref.current) {
            gsap.fromTo([storyP1Ref.current, storyP2Ref.current], 
              { y: 24, opacity: 0 }, 
              { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, delay: 1 }
            )
          }
        }
      })
    }

    // 4. Testimonials
    const validTestimonials = testimonialsCardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (validTestimonials.length > 0) {
      gsap.fromTo(validTestimonials,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: {
            trigger: validTestimonials[0],
            start: "top 85%",
            once: true
          }
        }
      )
    }
    
    // 5. Merch
    if (merchHeadRef.current) {
      ScrollTrigger.create({
        trigger: merchHeadRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (merchHeadRef.current) {
            const words = splitTextIntoWords(merchHeadRef.current)
            gsap.to(words, { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 })
          }
        }
      })
    }
    
    const validMerchCards = merchCardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (validMerchCards.length > 0) {
      gsap.fromTo(validMerchCards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: {
            trigger: validMerchCards[0],
            start: "top 85%",
            once: true
          }
        }
      )
    }

    validMerchCards.forEach((wrapper) => {
      const glow = wrapper.querySelector(".merch-glow") as HTMLElement
      const inner = wrapper.querySelector(".merch-inner") as HTMLElement
      const image = wrapper.querySelector("img") as HTMLElement

      if (!inner) return

      function handleMouseMove(e: MouseEvent) {
        const rect = inner.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateY = ((x - centerX) / centerX) * 6
        const rotateX = ((centerY - y) / centerY) * 6
        
        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
      }

      function handleMouseEnter() {
        inner.style.transition = "transform 300ms ease-out"
        inner.style.transform = "perspective(1000px) scale(1.03)"
        
        if (glow) {
          glow.style.opacity = "1"
          glow.style.transform = "scale(1.0)"
        }
        if (image) {
          image.style.transition = "filter 500ms ease"
          image.style.filter = "grayscale(0%)"
        }
        
        setTimeout(() => {
          inner.style.transition = "none"
        }, 300)
      }

      function handleMouseLeave() {
        inner.style.transition = "transform 400ms ease"
        inner.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)"
        
        if (glow) {
          glow.style.opacity = "0"
          glow.style.transform = "scale(0.85)"
        }
        if (image) {
          image.style.filter = "grayscale(100%)"
        }
      }

      inner.addEventListener("mousemove", handleMouseMove)
      inner.addEventListener("mouseenter", handleMouseEnter)
      inner.addEventListener("mouseleave", handleMouseLeave)
    })
    
    // 6. CTA
    if (ctaContentRef.current) {
      gsap.fromTo(ctaContentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: ctaContentRef.current,
            start: "top 85%",
            once: true
          }
        }
      )
    }

  }, [])

  const scrollToMerch = () => {
    const section = document.getElementById("merch-section")
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" })
    }
  }

  const merchData = [
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
  ]

  return (
    <>
      <CustomCursor />
      <Navigation />
      
      <main style={{ backgroundColor: "#faf5ee", paddingTop: 64 }}>
        {/* SECTION 1 — CINEMATIC HERO */}
        <section style={{ 
          minHeight: "100vh", 
          backgroundColor: "#1a1008", 
          position: "relative", 
          overflow: "hidden" 
        }}>
          <div className="grain-overlay" />
          
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(120px, 18vw, 280px)",
            fontWeight: 400,
            color: "rgba(250, 245, 238, 0.03)",
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.02em",
            zIndex: 1
          }}>
            HISTOBIT
          </div>
          
          <div style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            padding: "80px 24px 0 24px"
          }}>
            <div ref={heroLabelRef} style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 28
            }}>
              THE HISTOBIT STORE
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 ref={heroLine1Ref} style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px, 8vw, 120px)",
                lineHeight: 0.95,
                color: "#faf5ee",
                margin: 0
              }}>
                The Logistic
              </h1>
              <h1 ref={heroLine2Ref} style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px, 8vw, 120px)",
                lineHeight: 0.95,
                color: "#faf5ee",
                marginLeft: "clamp(0px, 6vw, 80px)",
                margin: 0
              }}>
                Nightmare.
              </h1>
            </div>
            
            <div style={{
              width: 60,
              height: 1,
              background: "#c2652a",
              margin: "40px auto",
              opacity: 0.6
            }} />
            
            <p ref={heroTagRef} style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              color: "rgba(250, 245, 238, 0.65)",
              letterSpacing: "0.02em",
              maxWidth: 520,
              textAlign: "center",
              lineHeight: 1.5,
              margin: 0
            }}>
              Ancient Military Logistics. Six Commanders. One Brutal Truth.
            </p>
            
            <div ref={heroBtnsRef} style={{
              marginTop: 48,
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <button 
                style={{
                  background: "#c2652a",
                  color: "#faf5ee",
                  padding: "16px 40px",
                  borderRadius: 8,
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "background 200ms, transform 200ms"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#a8521f"
                  e.currentTarget.style.transform = "scale(0.97)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#c2652a"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                Get the Ebook — ₹499
              </button>
              
              <button 
                onClick={scrollToMerch}
                style={{
                  background: "transparent",
                  color: "rgba(250, 245, 238, 0.75)",
                  padding: "16px 32px",
                  borderRadius: 8,
                  border: "1px solid rgba(250, 245, 238, 0.25)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border-color 200ms, color 200ms"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(250, 245, 238, 0.6)"
                  e.currentTarget.style.color = "#faf5ee"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(250, 245, 238, 0.25)"
                  e.currentTarget.style.color = "rgba(250, 245, 238, 0.75)"
                }}
              >
                Browse Merch ↓
              </button>
            </div>
          </div>
          
          <div style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10
          }}>
            <div style={{ position: "relative", width: 1, height: 60, background: "rgba(250, 245, 238, 0.2)" }}>
              <div ref={heroScrollDotRef} style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#c2652a",
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)"
              }} />
            </div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(250, 245, 238, 0.3)",
              marginTop: 8,
              textAlign: "center"
            }}>
              SCROLL
            </div>
          </div>
        </section>

        {/* SECTION 2 — PRODUCT SPLIT */}
        <section style={{
          backgroundColor: "#faf5ee",
          padding: "120px 48px"
        }}>
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-14 md:gap-20 max-w-[1160px] mx-auto">
            {/* LEFT COLUMN */}
            <div ref={bookColRef} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "fit-content" }}>
                  <div className="book-cover" style={{
                    width: "clamp(240px, 100%, 300px)",
                    height: "clamp(336px, 100%, 420px)",
                    background: "linear-gradient(160deg, #2a1e14 0%, #1a1008 60%, #0d0804 100%)",
                    borderRadius: "6px 16px 16px 6px",
                    boxShadow: "-12px 16px 48px rgba(0,0,0,0.5), -3px 3px 12px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.05)",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 32px",
                    cursor: "default"
                  }}>
                    {/* Layer 1 - texture lines overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(250,245,238,0.015) 3px, rgba(250,245,238,0.015) 4px)",
                      pointerEvents: "none",
                      zIndex: 1
                    }} />
                    
                    {/* Layer 2 - top accent stripe */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "linear-gradient(to right, #c2652a, rgba(194, 101, 42, 0.3))",
                      zIndex: 2
                    }} />
                    
                    {/* Layer 3 - spine shadow on the left */}
                    <div style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 24,
                      background: "linear-gradient(to right, #080402, rgba(0,0,0,0))",
                      zIndex: 2,
                      borderRadius: "6px 0 0 6px"
                    }} />
                    
                    {/* Layer 4 - centered content */}
                    <div style={{
                      position: "relative",
                      zIndex: 3,
                      textAlign: "center",
                      width: "100%"
                    }}>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(194, 101, 42, 0.7)",
                        marginBottom: 32
                      }}>
                        HISTOBIT PUBLISHING
                      </div>
                      
                      <div style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontSize: 26,
                        color: "#faf5ee",
                        lineHeight: 1.2,
                        textAlign: "center",
                        marginBottom: 20
                      }}>
                        The Logistic Nightmare
                      </div>
                      
                      <div style={{
                        width: 32,
                        height: 1,
                        background: "rgba(194, 101, 42, 0.5)",
                        margin: "0 auto 20px"
                      }} />
                      
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(250, 245, 238, 0.4)",
                        marginBottom: 40
                      }}>
                        Ancient Military Logistics
                      </div>
                    </div>
                    
                    {/* Large H monogram watermark */}
                    <div style={{
                      fontFamily: "'EB Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 80,
                      color: "rgba(250, 245, 238, 0.04)",
                      lineHeight: 1,
                      userSelect: "none",
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                      zIndex: 0
                    }}>
                      H
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{
                width: 260,
                height: 24,
                background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)",
                margin: "12px auto 0",
                filter: "blur(10px)"
              }} />
              
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "#8a7a6e",
                textAlign: "center",
                marginTop: 20,
                letterSpacing: "0.04em"
              }}>
                87 pages · PDF · Instant delivery
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div ref={buyColRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#c2652a",
                fontWeight: 500,
                marginBottom: 20
              }}>
                DIGITAL PRODUCT · EBOOK
              </div>
              
              <h2 style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: 1.05,
                color: "#3a302a",
                marginBottom: 12,
                marginTop: 0
              }}>
                The Logistic Nightmare
              </h2>
              
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "#8a7a6e",
                lineHeight: 1.5,
                marginBottom: 24,
                marginTop: 0
              }}>
                Ancient Military Logistics — Alexander, Rome, Hannibal, the Mongols, Napoleon
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
                <div style={{ fontSize: 15, color: "#c2652a", letterSpacing: 3 }}>★★★★★</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", marginLeft: 12 }}>
                  4.9 out of 5 · 127 readers
                </div>
              </div>
              
              <div style={{ width: "100%", height: 1, background: "rgba(216, 208, 200, 0.6)", marginBottom: 32 }} />
              
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
                <div style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 52,
                  color: "#3a302a",
                  fontWeight: 400,
                  lineHeight: 1
                }}>
                  ₹499
                </div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  color: "#8a7a6e",
                  textDecoration: "line-through"
                }}>
                  ₹799
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
                  38% OFF
                </div>
              </div>
              
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#8a7a6e",
                marginBottom: 28
              }}>
                One-time payment. Yours forever. Instant PDF delivery.
              </div>
              
              <button 
                style={{
                  width: "100%",
                  padding: "18px 32px",
                  borderRadius: 8,
                  background: "#c2652a",
                  color: "#faf5ee",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "background 200ms, transform 200ms"
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
              
              <div style={{
                marginTop: 20,
                display: "flex",
                gap: 24,
                flexWrap: "wrap"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e" }}>
                  <span>🔒</span> Secure payment
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e" }}>
                  <span>📄</span> PDF format
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e" }}>
                  <span>⚡</span> Instant delivery
                </div>
              </div>
              
              <div style={{ width: "100%", height: 1, background: "rgba(216, 208, 200, 0.6)", marginTop: 32, marginBottom: 32 }} />
              
              <div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#8a7a6e",
                  fontWeight: 500,
                  marginBottom: 20
                }}>
                  WHAT YOU GET
                </div>
                
                {[
                  "6 deep chapters — one per commander, one per logistics system",
                  "87 pages of original research — no Wikipedia, no mythology",
                  "Written in Histobit's cinematic, authoritative style",
                  "Instant PDF to your inbox the moment you pay"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: 3,
                      background: "#c2652a",
                      flexShrink: 0,
                      marginTop: 2
                    }} />
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#3a302a", lineHeight: 1.5 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — STORY SECTION */}
        <section style={{
          background: "linear-gradient(180deg, #faf5ee 0%, #f0e8dc 100%)",
          padding: "120px 48px"
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div ref={storyLabelRef} style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 24
            }}>
              THE BOOK
            </div>
            
            <h2 ref={storyHead1Ref} style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              color: "#3a302a",
              marginBottom: 8,
              marginTop: 0
            }}>
              War is not won by armies.
            </h2>
            <h2 ref={storyHead2Ref} style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              color: "#3a302a",
              marginBottom: 40,
              marginLeft: "clamp(0px, 4vw, 60px)",
              marginTop: 0
            }}>
              It is won by the man who feeds them.
            </h2>
            
            <p ref={storyAttrRef} style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
              marginBottom: 64,
              marginTop: 0
            }}>
              — Ancient military proverb
            </p>
            
            <p ref={storyP1Ref} style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.85,
              color: "#3a302a",
              maxWidth: 720,
              margin: "0 auto 28px auto"
            }}>
              "Every battle you know by name was decided before it began. Not in strategy meetings, not in the brilliance of the charge — but in the supply lines, the grain depots, the river crossings, and the men who kept 50,000 soldiers fed across 2,000 miles of hostile territory. This is the history that gets left out of every documentary."
            </p>
            
            <p ref={storyP2Ref} style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.85,
              color: "#3a302a",
              maxWidth: 720,
              margin: "0 auto 28px auto"
            }}>
              "The Logistic Nightmare traces six of the greatest military machines in history and the one question that defined them all: how do you keep an army alive long enough to win? Alexander solved it. Hannibal almost solved it. Napoleon didn't. The Mongols rewrote the rules entirely. This book tells you exactly how — and why it still matters."
            </p>
          </div>
        </section>

        {/* SECTION 4 — SOCIAL PROOF */}
        <section style={{
          backgroundColor: "#faf5ee",
          padding: "100px 48px"
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 40px)",
              color: "#3a302a",
              marginBottom: 56,
              textAlign: "center",
              marginTop: 0
            }}>
              What Readers Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[
                {
                  quote: "I've studied military history for 20 years. This is the first book that made me understand why the battles ended the way they did — not who fought, but who ate.",
                  name: "James K.",
                  location: "Chicago, USA",
                  initial: "J"
                },
                {
                  quote: "The chapter on the Mongols alone is worth the price. I had no idea logistics was this cinematic. Read it in one sitting.",
                  name: "Sarah M.",
                  location: "London, UK",
                  initial: "S"
                },
                {
                  quote: "Histobit writes history the way it should be written. No textbook tone. No mythology. Just the brutal, fascinating truth.",
                  name: "David R.",
                  location: "Toronto, Canada",
                  initial: "D"
                }
              ].map((card, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { if (el) testimonialsCardsRef.current[idx] = el }}
                  style={{
                    backgroundColor: "#faf5ee",
                    border: "1px solid rgba(216, 208, 200, 0.6)",
                    borderRadius: 12,
                    padding: "36px 32px",
                    boxShadow: "0 2px 16px rgba(58, 48, 42, 0.04)",
                    transition: "box-shadow 300ms, transform 300ms",
                    cursor: "default"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 40px rgba(58, 48, 42, 0.1)"
                    e.currentTarget.style.transform = "translateY(-4px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(58, 48, 42, 0.04)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <span style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 56,
                    color: "#c2652a",
                    lineHeight: 0.7,
                    display: "block",
                    marginBottom: 20
                  }}>
                    "
                  </span>
                  <div style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    lineHeight: 1.65,
                    color: "#3a302a",
                    marginBottom: 28
                  }}>
                    {card.quote}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #c2652a, #8c3c3c)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#faf5ee"
                      }}>
                        {card.initial}
                      </span>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#3a302a"
                      }}>
                        {card.name}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "#8a7a6e",
                        marginTop: 2
                      }}>
                        {card.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — MERCH */}
        <section id="merch-section" style={{
          backgroundColor: "#f5ede0",
          padding: "120px 48px"
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 16
            }}>
              THE COLLECTION
            </div>
            
            <h2 ref={merchHeadRef} style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 4.5vw, 56px)",
              color: "#3a302a",
              lineHeight: 1.05,
              marginBottom: 12,
              marginTop: 0
            }}>
              Wear the Archive.
            </h2>
            
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "#8a7a6e",
              marginBottom: 60,
              maxWidth: 500,
              marginTop: 0
            }}>
              Minimal pieces. Warm materials. Designed for people who read history, not just watch it. Fulfilled by Qikink. Ships across India.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {merchData.map((item, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { if (el) merchCardsRef.current[idx] = el }}
                  style={{ position: "relative" }}
                >
                  <div className="merch-glow" style={{
                    position: "absolute",
                    inset: -20,
                    background: "rgba(194, 101, 42, 0.15)",
                    filter: "blur(48px)",
                    borderRadius: 36,
                    zIndex: 0,
                    opacity: 0,
                    transform: "scale(0.85)",
                    transition: "opacity 400ms, transform 400ms",
                    pointerEvents: "none"
                  }} />
                  
                  <div className="merch-inner" style={{
                    backgroundColor: "#faf5ee",
                    border: "1px solid rgba(216, 208, 200, 0.6)",
                    borderRadius: 12,
                    overflow: "hidden",
                    zIndex: 1,
                    position: "relative",
                    cursor: "pointer",
                    willChange: "transform",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}>
                    <div style={{
                      aspectRatio: "3/4",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      <Image 
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "filter 500ms ease" }}
                      />
                    </div>
                    
                    <div style={{ padding: "24px 28px 28px" }}>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#c2652a",
                        fontWeight: 500,
                        marginBottom: 10
                      }}>
                        {item.tag}
                      </div>
                      
                      <div style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "#3a302a",
                        lineHeight: 1.2,
                        marginBottom: 6
                      }}>
                        {item.name}
                      </div>
                      
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "#8a7a6e",
                        marginBottom: 12
                      }}>
                        {item.detail}
                      </div>
                      
                      <div style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "#c2652a",
                        marginBottom: 20
                      }}>
                        {item.price}
                      </div>
                      
                      <Link href="#" target="_blank" style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#c2652a",
                        textDecoration: "none"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                      >
                        Shop on Qikink →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#8a7a6e",
              textAlign: "center",
              marginTop: 40
            }}>
              More pieces dropping soon. Follow on Instagram for early access.
            </div>
          </div>
        </section>

        {/* SECTION 6 — FINAL CTA */}
        <section style={{
          backgroundColor: "#1a1008",
          padding: "120px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="grain-overlay" />
          
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(140px, 22vw, 320px)",
            color: "rgba(250, 245, 238, 0.03)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none"
          }}>
            ₹499
          </div>
          
          <div ref={ctaContentRef} style={{ position: "relative", zIndex: 10 }}>
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 68px)",
              color: "#faf5ee",
              lineHeight: 1.0,
              marginBottom: 0,
              marginTop: 0
            }}>
              87 pages. 6 commanders.
            </h2>
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 68px)",
              color: "#c2652a",
              lineHeight: 1.0,
              marginBottom: 32,
              marginLeft: "clamp(0px, 5vw, 80px)",
              marginTop: 0
            }}>
              One brutal truth.
            </h2>
            
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              color: "rgba(250, 245, 238, 0.6)",
              marginBottom: 48
            }}>
              Instant PDF delivery. ₹499. Yours forever.
            </div>
            
            <button style={{
              padding: "18px 56px",
              borderRadius: 8,
              background: "#c2652a",
              color: "#faf5ee",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "background 200ms, transform 200ms"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a8521f"
              e.currentTarget.style.transform = "scale(0.97)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#c2652a"
              e.currentTarget.style.transform = "scale(1)"
            }}>
              Get the Ebook — ₹499
            </button>
            
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(250, 245, 238, 0.35)",
              marginTop: 16
            }}>
              No subscription. No account needed. Just the book.
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}

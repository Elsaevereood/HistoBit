"use client"

import dynamic from "next/dynamic"
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { splitTextIntoWords } from "@/lib/animations"

gsap.registerPlugin(ScrollTrigger)

export default function ShopPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const emailFormRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: badgeRef.current,
        start: "top 75%",
        once: true
      }
    })

    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, 
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }
      )
    }

    if (headlineRef.current) {
      const words = splitTextIntoWords(headlineRef.current)
      tl.fromTo(words,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.055, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      )
    }

    const elements = [
      sublineRef.current,
      dividerRef.current,
      bodyRef.current,
      emailFormRef.current,
      detailsRef.current
    ].filter(Boolean) as HTMLElement[]

    if (elements.length > 0) {
      tl.fromTo(elements,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      )
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email")
      return
    }
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "shop_notify" })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to subscribe")
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
      
      <main style={{ backgroundColor: "#faf5ee", paddingTop: 64, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <section style={{ 
          background: "#faf5ee", 
          padding: "140px 48px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        }}>
          
          <div ref={badgeRef} style={{
            background: "rgba(194, 101, 42, 0.1)",
            color: "#c2652a",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 24
          }}>
            COMING SOON
          </div>

          <h1 ref={headlineRef} style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(40px, 5vw, 64px)",
            color: "#3a302a",
            lineHeight: 1.05,
            margin: 0,
            marginTop: 24
          }}>
            The Logistic Nightmare
          </h1>

          <h2 ref={sublineRef} style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 24px)",
            color: "#8a7a6e",
            margin: 0,
            marginTop: 8,
            fontWeight: 400
          }}>
            A deep history of ancient military logistics
          </h2>

          <div ref={dividerRef} style={{
            width: "100%",
            maxWidth: 480,
            margin: "40px auto",
            background: "#d8d0c8",
            height: 1
          }} />

          <p ref={bodyRef} style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "#6b5c4e",
            lineHeight: 1.8,
            maxWidth: 520,
            textAlign: "center",
            margin: "0 auto"
          }}>
            How did Alexander feed 50,000 men crossing the Hindu Kush? How did Rome supply its legions at the edge of the known world? The answers changed history. This book tells that story.
          </p>

          <div ref={emailFormRef} style={{
            marginTop: 40,
            width: "100%",
            maxWidth: 480,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "#8a7a6e",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 12
            }}>
              NOTIFY ME WHEN IT LAUNCHES
            </div>
            
            {success ? (
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#c2652a",
                padding: "16px 0"
              }}>
                You&apos;re on the list. We&apos;ll tell you first.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", width: "100%" }}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      height: 48,
                      background: "white",
                      border: "1px solid #d8d0c8",
                      borderRadius: "8px 0 0 8px",
                      padding: "0 20px",
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#3a302a",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#c2652a"}
                    onBlur={(e) => e.target.style.borderColor = "#d8d0c8"}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      height: 48,
                      background: "#c2652a",
                      color: "#faf5ee",
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: 500,
                      padding: "0 28px",
                      borderRadius: "0 8px 8px 0",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "background 200ms",
                      opacity: loading ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#a8521f" }}
                    onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#c2652a" }}
                  >
                    {loading ? "..." : "Notify Me"}
                  </button>
                </div>
                {error && (
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "#c2652a",
                    marginTop: 8
                  }}>
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>

          <div ref={detailsRef} style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "center",
            gap: 32,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#8a7a6e",
            flexWrap: "wrap"
          }}>
            <span>PDF + Digital Edition</span>
            <span>·</span>
            <span>Launching 2026</span>
            <span>·</span>
            <span>Free for paid subscribers</span>
          </div>
          
        </section>
      </main>
      
      <Footer />
    </>
  )
}

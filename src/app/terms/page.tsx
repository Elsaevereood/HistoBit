"use client";

import dynamic from "next/dynamic";
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextIntoWords } from "@/lib/animations";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TermsOfService() {
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mount animations
    const tl = gsap.timeline();

    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.3
      );
    }

    if (line1Ref.current) {
      const words = splitTextIntoWords(line1Ref.current);
      tl.fromTo(
        words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        ">"
      );
    }

    if (line2Ref.current) {
      tl.fromTo(
        line2Ref.current,
        { scale: 0.9, opacity: 0, rotation: -2 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
    }

    if (stampRef.current) {
      tl.fromTo(
        stampRef.current,
        { scale: 0.8, opacity: 0, rotation: 15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      );
    }

    if (dateRef.current) {
      tl.fromTo(
        dateRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        ">"
      );
    }

    // Parallax Stamp
    if (stampRef.current) {
      gsap.to(stampRef.current, {
        y: 100,
        rotation: 10,
        ease: "none",
        scrollTrigger: {
          trigger: stampRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // ScrollTrigger for Quick Grid Cards
    const cards = gsap.utils.toArray<HTMLElement>(".quick-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".quick-grid-container",
            start: "top 80%",
            once: true,
          },
          delay: i * 0.15,
        }
      );
    });

    // ScrollTrigger for Each Policy Section
    const sections = gsap.utils.toArray<HTMLElement>(".policy-section");
    sections.forEach((section) => {
      const leftCol = section.querySelector(".left-col");
      const rightCol = section.querySelector(".right-col");
      
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      if (leftCol) {
        st.fromTo(leftCol, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
      }
      if (rightCol) {
        const children = rightCol.children;
        st.fromTo(children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0.2);
      }
    });

    // Pinned Titles Effect (using ScrollTrigger for pinning)
    ScrollTrigger.matchMedia({
      // Desktop only pinning
      "(min-width: 1024px)": function() {
        const sections = gsap.utils.toArray<HTMLElement>(".policy-section");
        sections.forEach((section) => {
          const leftCol = section.querySelector(".left-col");
          if (leftCol) {
            ScrollTrigger.create({
              trigger: section,
              start: "top 120px",
              end: "bottom bottom",
              pin: leftCol,
              pinSpacing: false,
            });
          }
        });
      }
    });

    // ScrollTrigger for Bottom Contact
    if (bottomRef.current) {
      gsap.fromTo(
        bottomRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const termsContent = [
    {
      id: "01",
      title: "Who These Terms Apply To",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            These Terms of Service govern your use of Histobit.com and all content, products, and services offered through it. By accessing this site, purchasing any product, or subscribing to any plan, you agree to these terms in full.
          </p>
          <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 22, color: "#c2652a", marginBottom: 20 }}>
            If you do not agree, do not use this site.
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#8a7a6e" }}>
            For any legal correspondence, write to <a href="mailto:info@histobit.com" style={{ color: "#c2652a", textDecoration: "underline" }}>info@histobit.com</a>.
          </p>
        </>
      ),
    },
    {
      id: "02",
      title: "What Histobit Offers",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 24 }}>
            Histobit.com provides the following:
          </p>
          {[
            { title: "Free Content.", desc: "The blog and YouTube channel are free to access. No account required." },
            { title: "Free Newsletter.", desc: "A free email newsletter covering military history, tactics, and historical analysis. You can unsubscribe at any time from any email we send." },
            { title: "Paid Newsletter (Subscriber Plan).", desc: "A premium newsletter subscription billed on a recurring basis via Razorpay. Includes exclusive content delivered to your inbox." },
            { title: "Digital Products.", desc: "Currently: The Logistic Nightmare — a PDF ebook on ancient military logistics. Delivered digitally via a secure download link sent to your email after payment is confirmed." },
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: 20, display: "flex", gap: 16 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c2652a", flexShrink: 0, marginTop: 10 }} />
              <div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#3a302a", marginRight: 8 }}>{item.title}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#3a302a" }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </>
      ),
    },
    {
      id: "03",
      title: "Purchases and Payments",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 24 }}>
            All payments are processed by Razorpay. By completing a purchase, you agree to Razorpay's terms of service in addition to ours.
          </p>
          <div style={{ background: "#faf5ee", border: "1px solid rgba(216,208,200,0.7)", borderRadius: 12, padding: "24px 28px", marginBottom: 20 }}>
            <h4 style={{ fontFamily: "var(--font-body)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e", fontWeight: 500, marginBottom: 8 }}>Ebook</h4>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "#3a302a", margin: 0 }}>
              A one-time payment. After payment is confirmed, you will receive a download link via email. The link expires after 48 hours. If you have trouble downloading, contact us at info@histobit.com.
            </p>
          </div>
          <div style={{ background: "#faf5ee", border: "1px solid rgba(216,208,200,0.7)", borderRadius: 12, padding: "24px 28px", marginBottom: 24 }}>
            <h4 style={{ fontFamily: "var(--font-body)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e", fontWeight: 500, marginBottom: 8 }}>Paid Newsletter</h4>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "#3a302a", margin: 0 }}>
              A recurring subscription. Your card is charged at the start of each billing cycle. You can cancel at any time — your access continues until the end of the period you already paid for.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "04",
      title: "Refund Policy",
      content: (
        <>
          <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 26, color: "#c2652a", marginBottom: 20 }}>
            All sales are final. We do not offer refunds on digital products or newsletter subscriptions.
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            This is because our products are delivered digitally and instantly — there is no way to return them once received. We encourage you to read the free blog content to understand the quality of Histobit's work before purchasing.
          </p>
          <div style={{ paddingLeft: 20, borderLeft: "3px solid rgba(194,101,42,0.3)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#8a7a6e", margin: 0 }}>
              If there is a technical failure on our end — you paid but never received your download link or subscription confirmation — contact us within 7 days at info@histobit.com and we will resolve it.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "05",
      title: "Your Account and Subscription",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 16 }}>
            You are responsible for maintaining the confidentiality of any account credentials. Do not share your subscription or download access with others.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
            Each purchase is for individual use only. <strong style={{ fontWeight: 600 }}>Redistributing, reselling, or sharing purchased content is a violation of these terms.</strong>
          </p>
        </>
      ),
    },
    {
      id: "06",
      title: "Intellectual Property",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            Everything on Histobit.com — the blog posts, newsletters, ebook, scripts, images, and all other content — is owned exclusively by Histobit.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#c2652a", marginBottom: 20, fontWeight: 500 }}>
            You may not copy, reproduce, republish, distribute, sell, or adapt any Histobit content without explicit written permission from info@histobit.com.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#8a7a6e" }}>
            Brief quotations with attribution (e.g., in academic or review contexts) are acceptable under standard fair use principles. Everything else requires permission.
          </p>
        </>
      ),
    },
    {
      id: "07",
      title: "Acceptable Use",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            When using this site, you agree not to:
          </p>
          <ul style={{ listStyleType: "none", padding: 0, margin: "0 0 24px 0" }}>
            {[
              "Scrape, copy, or harvest any content from the site in bulk.",
              "Attempt to access any part of the site through unauthorized means.",
              "Use any Histobit content for commercial purposes without permission.",
              "Submit false information in any form or purchase flow.",
              "Impersonate Histobit in any context."
            ].map((text, idx) => (
              <li key={idx} style={{ position: "relative", paddingLeft: 24, marginBottom: 12, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "#3a302a" }}>
                <span style={{ position: "absolute", left: 0, color: "#c2652a" }}>×</span>
                {text}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#8a7a6e" }}>
            We reserve the right to block access or cancel subscriptions if these terms are violated, without refund.
          </p>
        </>
      ),
    },
    {
      id: "08",
      title: "Disclaimers",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            Histobit content is for educational and informational purposes only. It does not constitute professional advice of any kind — military, legal, financial, or otherwise.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            We make reasonable efforts to ensure accuracy, but history is contested. If you find a factual error, email us and we will review it.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#8a7a6e" }}>
            The site is provided as-is. We cannot guarantee uninterrupted availability.
          </p>
        </>
      ),
    },
    {
      id: "09",
      title: "Limitation of Liability",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            To the maximum extent permitted under Indian law, Histobit shall not be liable for any indirect, incidental, or consequential damages arising from your use of this site or its content.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
            Our total liability for any claim shall not exceed the amount you paid to Histobit in the 30 days preceding the claim.
          </p>
        </>
      ),
    },
    {
      id: "10",
      title: "Changes to These Terms",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 20 }}>
            We may update these terms as the site and its products evolve. When we do, we will update the effective date at the top of this page.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 2, height: 20, background: "#c2652a", flexShrink: 0, marginTop: 4 }} />
            <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8a7a6e", lineHeight: 1.7 }}>
              If you are a paid subscriber, we will notify you of material changes by email before they take effect.
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#3a302a" }}>
            Continued use of the site after changes are posted means you accept the updated terms.
          </p>
        </>
      ),
    },
    {
      id: "11",
      title: "Governing Law",
      content: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: "#f5ede0", borderRadius: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a1008", color: "#faf5ee", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 18 }}>§</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "#3a302a", margin: 0 }}>
              These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in <strong style={{ fontWeight: 600 }}>Darbhanga, Bihar, India.</strong>
            </p>
          </div>
        </>
      ),
    },
    {
      id: "12",
      title: "Contact",
      content: (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 24 }}>
            For any questions about these terms, write to us at info@histobit.com. We respond within 3 business days.
          </p>
          <a
            href="mailto:info@histobit.com"
            style={{
              background: "#3a302a",
              color: "#faf5ee",
              padding: "16px 32px",
              borderRadius: 8,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
              transition: "200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#c2652a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#3a302a")}
          >
            Email info@histobit.com
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <CustomCursor />
      <Navigation />
      
      <main style={{ background: "#faf5ee", paddingTop: 64 }}>
        {/* SECTION 1 — HERO HEADER */}
        <section
          style={{
            background: "#1a1008",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            padding: "120px 48px",
          }}
        >
          <div className="grain-overlay" />
          
          {/* Parallax Stamp */}
          <div
            ref={stampRef}
            style={{
              position: "absolute",
              right: "10%",
              top: "20%",
              width: "clamp(300px, 30vw, 500px)",
              height: "clamp(300px, 30vw, 500px)",
              border: "2px solid rgba(194, 101, 42, 0.08)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <div style={{
              width: "90%",
              height: "90%",
              border: "1px dashed rgba(194, 101, 42, 0.05)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "clamp(48px, 6vw, 100px)",
                color: "rgba(194, 101, 42, 0.08)",
                transform: "rotate(-15deg)",
              }}>
                Valid
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: 1000,
            }}
          >
            <div
              ref={labelRef}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#c2652a",
                fontWeight: 500,
                marginBottom: 32,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 32, height: 1, background: "#c2652a" }} />
              AGREEMENT & POLICIES
            </div>
            
            <h1 style={{ margin: 0, padding: 0 }}>
              <span
                ref={line1Ref}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(64px,10vw,140px)",
                  lineHeight: 0.9,
                  color: "#faf5ee",
                  display: "block",
                }}
              >
                Terms of
              </span>
              <span
                ref={line2Ref}
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "clamp(72px,11vw,160px)",
                  color: "#c2652a",
                  lineHeight: 0.9,
                  display: "block",
                  marginLeft: "clamp(40px,10vw,200px)",
                  marginTop: -10,
                }}
              >
                Service.
              </span>
            </h1>

            <div
              ref={dateRef}
              style={{
                marginTop: 64,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(250,245,238,0.45)",
                letterSpacing: "0.06em",
              }}>
                Effective Date: May 18, 2026
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(250,245,238,0.45)",
                letterSpacing: "0.06em",
              }}>
                Jurisdiction: India | Governed by the IT Act 2000
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — QUICK SUMMARY GRID */}
        <section className="quick-grid-container" style={{ padding: "80px 48px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 20, marginTop: -40 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "No Refunds", desc: "All sales are final on digital goods." },
              { title: "Personal Use Only", desc: "Do not resell or redistribute." },
              { title: "Secure Payments", desc: "Processed safely by Razorpay." },
              { title: "Indian Jurisdiction", desc: "Governed by the laws of India." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="quick-card"
                style={{
                  background: "#faf5ee",
                  boxShadow: "0 20px 40px rgba(58,48,42,0.05)",
                  border: "1px solid rgba(216,208,200,0.8)",
                  borderRadius: 16,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c2652a", fontWeight: 600, marginBottom: 8 }}>
                  Rule 0{idx + 1}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 28, color: "#3a302a", marginBottom: 8 }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8a7a6e" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — OFFSET TWO-COLUMN CONTENT */}
        <section style={{ padding: "60px 48px 120px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ height: 1, background: "rgba(216,208,200,0.6)", marginBottom: 100 }} />

          {termsContent.map((section, idx) => (
            <div
              key={section.id}
              className="policy-section"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 40,
                marginBottom: idx === termsContent.length - 1 ? 0 : 120,
              }}
            >
              {/* Desktop layout uses absolute/sticky positioning via GSAP, so we just structure it cleanly */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[60px] lg:gap-[100px]">
                
                {/* LEFT COL: Sticky Number & Title */}
                <div className="left-col" style={{ alignSelf: "flex-start", paddingTop: 8 }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ 
                      fontFamily: "'EB Garamond', serif", 
                      fontStyle: "italic", 
                      fontSize: "clamp(60px, 8vw, 100px)", 
                      color: "rgba(194,101,42,0.15)", 
                      lineHeight: 0.8,
                      marginBottom: 16,
                      display: "block" 
                    }}>
                      {section.id}
                    </span>
                    <h2 style={{ 
                      fontFamily: "var(--font-heading)", 
                      fontStyle: "italic", 
                      fontWeight: 400, 
                      fontSize: 32, 
                      color: "#3a302a", 
                      lineHeight: 1.15,
                    }}>
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* RIGHT COL: Detailed Content */}
                <div className="right-col" style={{ paddingTop: 16 }}>
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION 4 — BOTTOM CTA */}
        <section
          ref={bottomRef}
          style={{
            background: "#1a1008",
            padding: "100px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div className="grain-overlay" />
          <div style={{ position: "relative", zIndex: 10, maxWidth: 600, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(32px,4vw,56px)",
                color: "#faf5ee",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              Still have questions?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "rgba(250,245,238,0.6)",
                lineHeight: 1.6,
                marginBottom: 40,
              }}
            >
              We've tried to make these terms as clear as possible. If something doesn't make sense, just ask.
            </p>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "center" }}>
              <Link
                href="/privacy"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#c2652a",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Read Privacy Policy
              </Link>
              <div style={{ width: 1, height: 16, background: "rgba(250,245,238,0.2)" }} />
              <a
                href="mailto:info@histobit.com"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#faf5ee",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

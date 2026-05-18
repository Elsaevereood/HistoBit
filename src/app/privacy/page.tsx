"use client";

import dynamic from "next/dynamic";
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { splitTextIntoWords } from "@/lib/animations";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PrivacyPolicy() {
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>("section-commitment");

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
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.07 },
        ">"
      );
    }

    if (line2Ref.current) {
      tl.fromTo(
        line2Ref.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        ">"
      );
    }

    if (dateRef.current) {
      tl.fromTo(
        dateRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        ">"
      );
    }

    // ScrollTrigger for Key Points summary box
    gsap.fromTo(
      ".summary-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".summary-card",
          start: "top 85%",
          once: true,
        },
      }
    );

    // ScrollTrigger for Sidebar
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // ScrollTrigger for Each Section
    const sections = gsap.utils.toArray<HTMLElement>(".policy-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // ScrollTrigger for Bottom Strip
    if (bottomRef.current) {
      gsap.fromTo(
        bottomRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // IntersectionObserver for Sidebar Active Link
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "section-commitment", label: "Our Commitment" },
    { id: "section-collect", label: "Information We Collect" },
    { id: "section-use", label: "How We Use It" },
    { id: "section-processors", label: "Who Processes Your Data" },
    { id: "section-cookies", label: "Cookies" },
    { id: "section-retention", label: "Data Retention" },
    { id: "section-rights", label: "Your Rights" },
    { id: "section-contact", label: "Contact" },
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
            minHeight: "52vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="grain-overlay" />
          
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(100px,16vw,220px)",
              color: "rgba(250,245,238,0.03)",
              position: "absolute",
              bottom: -20,
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
              letterSpacing: "-0.02em",
              zIndex: 1,
            }}
          >
            PRIVACY
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: 860,
              padding: "0 32px",
              textAlign: "center",
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
                marginBottom: 28,
              }}
            >
              LEGAL · HISTOBIT.COM
            </div>
            
            <h1 style={{ margin: 0, padding: 0 }}>
              <span
                ref={line1Ref}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(56px,9vw,120px)",
                  lineHeight: 0.9,
                  color: "#faf5ee",
                  display: "block",
                }}
              >
                Privacy
              </span>
              <span
                ref={line2Ref}
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "clamp(60px,9.5vw,128px)",
                  color: "#c2652a",
                  lineHeight: 1.1,
                  display: "block",
                  marginLeft: "clamp(0px,8vw,120px)",
                }}
              >
                Policy.
              </span>
            </h1>

            <div
              ref={dateRef}
              style={{
                marginTop: 32,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(250,245,238,0.35)",
                letterSpacing: "0.06em",
              }}
            >
              Effective date: May 18, 2026
            </div>
          </div>
        </section>

        {/* SECTION 2 — KEY POINTS SUMMARY BOX */}
        <section
          style={{
            background: "#faf5ee",
            padding: "80px 48px 0 48px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div
            className="summary-card"
            style={{
              background: "linear-gradient(135deg, #f5ede0 0%, #faf5ee 100%)",
              border: "1px solid rgba(194,101,42,0.2)",
              borderRadius: 16,
              padding: 48,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 4,
                height: "100%",
                background: "#c2652a",
                borderRadius: "16px 0 0 16px",
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 32,
                color: "#3a302a",
                marginBottom: 8,
              }}
            >
              At a Glance
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#8a7a6e",
                marginBottom: 36,
              }}
            >
              Five things you should know before reading further.
            </p>

            {[
              "We only collect your email address. Nothing else.",
              "We never sell your data. Not now, not ever.",
              "Payments are handled by Razorpay. Your card details never touch our servers.",
              "You can request deletion of your data at any time by emailing info@histobit.com.",
              "This policy is governed by Indian law under the Digital Personal Data Protection Act, 2023.",
            ].map((text, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 28,
                    color: "#c2652a",
                    lineHeight: 1,
                    minWidth: 32,
                    opacity: 0.7,
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#3a302a",
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — STICKY SIDEBAR + CONTENT LAYOUT */}
        <section
          style={{
            background: "#faf5ee",
            padding: "80px 48px 120px 48px",
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 48,
          }}
          className="flex-col lg:flex-row"
        >
          {/* LEFT COLUMN */}
          <div
            ref={sidebarRef}
            className="hidden lg:block"
            style={{
              width: 260,
              position: "sticky",
              top: 100,
              alignSelf: "flex-start",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#8a7a6e",
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              CONTENTS
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: isActive ? "#3a302a" : "#8a7a6e",
                      padding: "8px 0",
                      paddingLeft: 16,
                      borderLeft: `2px solid ${isActive ? "#c2652a" : "transparent"}`,
                      cursor: "pointer",
                      transition: "200ms",
                      textDecoration: "none",
                      background: "none",
                      borderRight: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#3a302a";
                        e.currentTarget.style.borderLeftColor = "#c2652a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#8a7a6e";
                        e.currentTarget.style.borderLeftColor = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: 1 }}>
            {/* 01 COMMITMENT */}
            <div
              id="section-commitment"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>01</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>OUR COMMITMENT</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                We built this on trust.
              </h2>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                Your privacy matters to us. This policy explains, in plain language, exactly what information Histobit collects when you use our website, why we collect it, what we do with it, and what rights you have over it. We have written this to be read by a person, not a lawyer.
                
                <span style={{ display: "block", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 22, color: "#c2652a", marginTop: 24 }}>
                  We do not sell your data. We never have.
                </span>
              </div>
            </div>

            {/* 02 INFORMATION WE COLLECT */}
            <div
              id="section-collect"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>02</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>INFORMATION WE COLLECT</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                Only what you choose to give us.
              </h2>
              
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e", fontWeight: 500, marginBottom: 12, marginTop: 28 }}>
                When you subscribe to the newsletter
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                We collect your email address and, if you choose to provide it, your first name. Nothing else.
              </p>

              <h3 style={{ fontFamily: "var(--font-body)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7a6e", fontWeight: 500, marginBottom: 12, marginTop: 28 }}>
                When you make a purchase
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                We collect your email address to deliver your purchase and confirm your transaction. Payment details — your card number, billing address, and transaction data — are handled entirely by Razorpay, our payment processor. This information is never seen by us, never stored on our servers, and never touches Histobit infrastructure.
              </p>

              <div
                style={{
                  background: "rgba(194,101,42,0.06)",
                  border: "1px solid rgba(194,101,42,0.15)",
                  borderLeft: "3px solid #c2652a",
                  borderRadius: "0 8px 8px 0",
                  padding: "20px 24px",
                  marginTop: 24,
                }}
              >
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#3a302a", lineHeight: 1.6, margin: 0 }}>
                  We do not use invisible tracking, behavioral profiling, or third-party advertising pixels on this website.
                </p>
              </div>
            </div>

            {/* 03 HOW WE USE IT */}
            <div
              id="section-use"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>03</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>HOW WE USE IT</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                Three purposes. No exceptions.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                Your email address is used for exactly three purposes:
              </p>

              <div style={{ marginTop: 24 }}>
                {[
                  "To deliver the Histobit weekly newsletter, if you subscribed to it.",
                  "To send your purchased ebook or confirm your subscription upgrade.",
                  "To notify you of changes that directly affect your account or access.",
                ].map((text, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 2, height: 20, background: "#c2652a", flexShrink: 0, marginTop: 4 }} />
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#3a302a", lineHeight: 1.7 }}>
                      {text}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#8a7a6e", marginTop: 24 }}>
                We will never use your email to market third-party products, share it with advertisers, or contact you about anything unrelated to Histobit.
              </p>
            </div>

            {/* 04 WHO PROCESSES YOUR DATA */}
            <div
              id="section-processors"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>04</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>WHO PROCESSES YOUR DATA</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                Three trusted partners. Nothing more.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                To operate this website, we work with three technology partners. Each is contractually bound by data protection obligations and is not permitted to use your information for any purpose beyond providing services to us.
              </p>

              {[
                { initial: "S", name: "Supabase", desc: "Stores subscriber email addresses and subscription status in a secure, encrypted database. SOC 2 Type II certified." },
                { initial: "R", name: "Resend", desc: "Delivers emails from Histobit to your inbox. Your email address is transmitted solely for this purpose." },
                { initial: "R", name: "Razorpay", desc: "Processes all payments. PCI-DSS Level 1 certified — the highest level of payment security available. Your payment data is governed entirely by Razorpay's own privacy policy." },
              ].map((partner, idx) => (
                <div key={idx} style={{ background: "#faf5ee", border: "1px solid rgba(216,208,200,0.7)", borderRadius: 12, padding: "28px 32px", marginTop: 20, display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 36, color: "#c2652a", lineHeight: 1, minWidth: 40 }}>
                    {partner.initial}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#3a302a", marginBottom: 6 }}>
                      {partner.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e", lineHeight: 1.6 }}>
                      {partner.desc}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 22, color: "#c2652a", borderLeft: "3px solid #c2652a", paddingLeft: 20, marginTop: 32 }}>
                No data is shared beyond these three partners. No exceptions.
              </div>
            </div>

            {/* 05 COOKIES */}
            <div
              id="section-cookies"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>05</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>COOKIES</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                We don't track you.
              </h2>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                <p style={{ marginBottom: 16 }}>
                  Histobit.com does not use advertising cookies, tracking cookies, or third-party analytics cookies. We do not track you across the web. We do not build a profile of your browsing behavior.
                </p>
                <p>
                  When you visit this website, we do not know who you are until you choose to tell us by subscribing or making a purchase.
                </p>
              </div>
            </div>

            {/* 06 DATA RETENTION */}
            <div
              id="section-retention"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>06</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>DATA RETENTION</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                We keep it only as long as needed.
              </h2>
              
              <div style={{ marginTop: 24 }}>
                {[
                  "While you are subscribed, we retain your email address and subscription status.",
                  "If you unsubscribe, your data is removed from our active systems within 7 days.",
                ].map((text, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 2, height: 20, background: "#c2652a", flexShrink: 0, marginTop: 4 }} />
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#3a302a", lineHeight: 1.7 }}>
                      {text}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginTop: 24 }}>
                If you request complete deletion of your data, we will action it within 30 days and confirm by email when it is done.
              </p>
            </div>

            {/* 07 YOUR RIGHTS */}
            <div
              id="section-rights"
              className="policy-section"
              style={{
                paddingBottom: 72,
                borderBottom: "1px solid rgba(216,208,200,0.5)",
                marginBottom: 72,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>07</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>YOUR RIGHTS</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                You are in control.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a" }}>
                Under the Digital Personal Data Protection Act, 2023 (India), you have the following rights as a Data Principal:
              </p>

              <div style={{ marginTop: 24 }}>
                {[
                  { chip: "Information", text: "You may ask us what personal data we hold about you and how it is being used." },
                  { chip: "Correction", text: "You may ask us to correct any inaccurate or incomplete personal data." },
                  { chip: "Erasure", text: "You may ask us to delete your personal data entirely at any time." },
                  { chip: "Withdraw Consent", text: "You may withdraw consent to data processing at any time without affecting the lawfulness of prior processing." },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, color: "#faf5ee", background: "#c2652a", padding: "4px 10px", borderRadius: 4, whiteSpace: "nowrap", marginTop: 3, flexShrink: 0 }}>
                      {item.chip}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#3a302a", lineHeight: 1.6 }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#3a302a", lineHeight: 1.85, marginTop: 28 }}>
                To exercise any of these rights, email us at <a href="mailto:info@histobit.com" style={{ color: "#c2652a", textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")} onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}>info@histobit.com</a>. We will respond within 30 days.
              </p>
            </div>

            {/* 08 CONTACT */}
            <div
              id="section-contact"
              className="policy-section"
              style={{
                marginBottom: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 48, color: "rgba(194,101,42,0.2)", lineHeight: 1 }}>08</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500 }}>CONTACT</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 24 }}>
                We're easy to reach.
              </h2>
              
              <div
                style={{
                  background: "#1a1008",
                  borderRadius: 16,
                  padding: 48,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div className="grain-overlay" />
                <div style={{ position: "relative", zIndex: 10 }}>
                  <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(250,245,238,0.08)" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(250,245,238,0.35)", fontWeight: 500, marginBottom: 6 }}>EMAIL</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#faf5ee", lineHeight: 1.4 }}>
                      <a href="mailto:info@histobit.com" style={{ color: "#c2652a", textDecoration: "none" }}>info@histobit.com</a>
                    </div>
                  </div>
                  <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(250,245,238,0.08)" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(250,245,238,0.35)", fontWeight: 500, marginBottom: 6 }}>WEBSITE</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#faf5ee", lineHeight: 1.4 }}>histobit.com</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(250,245,238,0.35)", fontWeight: 500, marginBottom: 6 }}>RESPONSE TIME</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#faf5ee", lineHeight: 1.4 }}>Within 30 days</div>
                  </div>
                </div>
              </div>

              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(250,245,238,0.3)", lineHeight: 1.6, marginTop: 8 }}>
                This policy is governed by the laws of India. Disputes arising from this policy are subject to Indian jurisdiction.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — BOTTOM CALLOUT STRIP */}
        <section
          ref={bottomRef}
          style={{
            background: "linear-gradient(135deg, #f5ede0 0%, #faf5ee 100%)",
            padding: "80px 48px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px,3.5vw,44px)",
              color: "#3a302a",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Questions about your privacy?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "#8a7a6e",
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 520,
              margin: "16px auto 36px",
            }}
          >
            We're a small team and we take this seriously. Email us directly — a real person will respond.
          </p>
          <a
            href="mailto:info@histobit.com"
            style={{
              background: "#c2652a",
              color: "#faf5ee",
              padding: "16px 40px",
              borderRadius: 8,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
              transition: "200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a8521f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#c2652a")}
          >
            Email info@histobit.com
          </a>

          <div style={{ marginTop: 24 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e" }}>
              Also read:{" "}
            </span>
            <Link
              href="/terms"
              style={{
                color: "#c2652a",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Terms of Service →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

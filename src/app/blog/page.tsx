import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Military History & Geopolitics Blog — Histobit",
  description:
    "Deep research articles on military history and geopolitics. Battles, tactics, logistics, and world order. No mythology.",
  keywords: [
    "military history blog",
    "geopolitics blog",
    "battle analysis",
    "world order",
    "war tactics",
    "military strategy history",
    "history articles",
  ],
  alternates: {
    canonical: "https://histobit.com/blog",
  },
  openGraph: {
    title: "Military History & Geopolitics Blog — Histobit",
    description:
      "Deep research articles on military history and geopolitics. No mythology. Just history the way it deserves to be told.",
    url: "https://histobit.com/blog",
    siteName: "Histobit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://histobit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Histobit Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Military History & Geopolitics Blog — Histobit",
    description: "Deep research. No mythology. Real history & geopolitics.",
    images: ["https://histobit.com/og-image.png"],
    site: "@histobit",
  },
};

export default function BlogLandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#faf5ee", paddingTop: 64 }}>
      <Navigation />

      {/* HERO HEADER */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: 320,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #efd5a8 0%, #f5e6c8 40%, #faf5ee 100%)",
        }}
      >
        <div className="grain-overlay" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
            }}
          >
            HISTOBIT DISPATCHES
          </div>
          <h1
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 5vw, 72px)",
              color: "#3a302a",
              lineHeight: 1.1,
              marginTop: 12,
            }}
          >
            The Archive
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "#8a7a6e",
              maxWidth: 520,
              lineHeight: 1.6,
              marginTop: 16,
            }}
          >
            Deep research and historically grounded analysis. Choose a section to explore our dispatches.
          </p>
        </div>
      </section>

      {/* 2-CARD SECTION PORTAL */}
      <section
        className="flex-grow flex items-center justify-center"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px 120px 48px", width: "100%" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Card 1: Military History */}
          <Link href="/blog/military-history" className="group no-underline block h-full">
            <div
              className="flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] cursor-pointer border border-[#d8d0c8]/60 group-hover:border-[#c2652a] group-hover:shadow-[0_8px_32px_rgba(194,101,42,0.08)]"
              style={{
                background: "#faf5ee",
                borderRadius: 12,
                padding: "48px 40px",
                boxShadow: "0 2px 16px rgba(58, 48, 42, 0.04)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#c2652a",
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                01 &middot; Campaign Archive
              </div>
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 36,
                  color: "#3a302a",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                Military History
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#8a7a6e",
                  marginBottom: 40,
                }}
              >
                Every dispatch, every battle, every story. Deep research into the tactics, logistics, and commanders that shaped historical warfare, with no mythology.
              </p>
              <div
                className="mt-auto group-hover:underline flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#c2652a",
                }}
              >
                Enter Archive &rarr;
              </div>
            </div>
          </Link>

          {/* Card 2: Geopolitics */}
          <Link href="/blog/geopolitics" className="group no-underline block h-full">
            <div
              className="flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] cursor-pointer border border-[#d8d0c8]/60 group-hover:border-[#c2652a] group-hover:shadow-[0_8px_32px_rgba(194,101,42,0.08)]"
              style={{
                background: "#faf5ee",
                borderRadius: 12,
                padding: "48px 40px",
                boxShadow: "0 2px 16px rgba(58, 48, 42, 0.04)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#c2652a",
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                02 &middot; World Order Analysis
              </div>
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 36,
                  color: "#3a302a",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                Geopolitics
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#8a7a6e",
                  marginBottom: 40,
                }}
              >
                Historically grounded analysis of the forces shaping today&apos;s world. Delving deep into global alliances, resources, trade conflicts, and maritime sovereignty.
              </p>
              <div
                className="mt-auto group-hover:underline flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#c2652a",
                }}
              >
                Enter Archive &rarr;
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

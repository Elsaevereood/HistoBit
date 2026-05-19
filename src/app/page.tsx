import { getAllPosts } from "@/lib/mdx";

import dynamic from "next/dynamic"
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"))
const CustomCursor = dynamic(() => import("@/components/CustomCursor"))
const Navigation = dynamic(() => import("@/components/Navigation"))
const HeroSection = dynamic(() => import("@/components/HeroSection"))
const FeaturedStory = dynamic(() => import("@/components/FeaturedStory"))
import LatestArchive from "@/components/LatestArchive"
const TopicExplorer = dynamic(() => import("@/components/TopicExplorer"))
const WhatIsHistobit = dynamic(() => import("@/components/WhatIsHistobit"))
const TrustBar = dynamic(() => import("@/components/TrustBar"))
const ReaderVoices = dynamic(() => import("@/components/ReaderVoices"))
const Newsletter = dynamic(() => import("@/components/Newsletter"))
const Footer = dynamic(() => import("@/components/Footer"))
import Link from "next/link"

const ArchiveTeaser = () => (
  <section style={{ padding: "80px 48px", background: "#faf5ee", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a" }}>
      THE ARCHIVE
    </div>
    <h2 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "clamp(28px, 3vw, 42px)", color: "#3a302a", marginTop: 12, marginBottom: 0 }}>
      Books, maps, and field guides for serious history readers.
    </h2>
    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8a7a6e", marginTop: 12, marginBottom: 0 }}>
      The first title drops in 2026. Paid subscribers get it free.
    </p>
    <Link href="/newsletter" className="hover:bg-[#c2652a] hover:text-[#faf5ee] transition-colors duration-200" style={{
      marginTop: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 48,
      background: "transparent",
      border: "1.5px solid #c2652a",
      color: "#c2652a",
      fontFamily: "var(--font-body)",
      fontSize: 14,
      fontWeight: 500,
      borderRadius: 8,
      padding: "0 32px",
      textDecoration: "none"
    }}>
      Join to Get Early Access →
    </Link>
  </section>
);

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedStory />
        <LatestArchive posts={posts} />
        <TopicExplorer />
        <WhatIsHistobit />
        <ArchiveTeaser />
        <TrustBar />
        <ReaderVoices />
        <Newsletter />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

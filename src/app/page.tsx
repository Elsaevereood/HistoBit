"use client";

import dynamic from "next/dynamic";

// Dynamic imports to prevent SSR issues with GSAP
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const FeaturedStory = dynamic(() => import("@/components/FeaturedStory"), { ssr: false });
const LatestArchive = dynamic(() => import("@/components/LatestArchive"), { ssr: false });
const TopicExplorer = dynamic(() => import("@/components/TopicExplorer"), { ssr: false });
const WhatIsHistobit = dynamic(() => import("@/components/WhatIsHistobit"), { ssr: false });
const FromYouTube = dynamic(() => import("@/components/FromYouTube"), { ssr: false });
const TrustBar = dynamic(() => import("@/components/TrustBar"), { ssr: false });
const MerchPreview = dynamic(() => import("@/components/MerchPreview"), { ssr: false });
const ReaderVoices = dynamic(() => import("@/components/ReaderVoices"), { ssr: false });
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedStory />
        <LatestArchive />
        <TopicExplorer />
        <WhatIsHistobit />
        <FromYouTube />
        <TrustBar />
        <MerchPreview />
        <ReaderVoices />
        <Newsletter />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

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
        <TrustBar />
        <ReaderVoices />
        <Newsletter />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

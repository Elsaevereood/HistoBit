import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Archive — Military History Blog",
  description: "Every Histobit dispatch. Deep military history — battles, logistics, commanders, and the decisions that changed the world. No mythology. No filler.",
  keywords: [
    "military history blog",
    "war history articles",
    "battle analysis",
    "ancient warfare",
    "military strategy",
    "history research",
    "American Revolution",
    "Roman warfare",
    "Napoleonic wars",
  ],
  alternates: {
    canonical: "https://histobit.com/blog",
  },
  openGraph: {
    title: "The Archive — Military History Blog | Histobit",
    description: "Deep research on battles, commanders, logistics, and turning points. Every article fact-checked. No mythology.",
    url: "https://histobit.com/blog",
    siteName: "Histobit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://histobit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Histobit — Military History Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Archive — Military History Blog | Histobit",
    description: "Deep research on battles, commanders, and the decisions that changed history.",
    images: ["https://histobit.com/og-image.png"],
    site: "@histobit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

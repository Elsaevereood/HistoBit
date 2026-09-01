import type { Metadata } from "next";
import { EB_Garamond, Manrope, Dancing_Script } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://histobit.com"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Histobit — Military History for Serious People",
    template: "%s | Histobit",
  },
  description:
    "Deep research. No mythology. Every week — military history told the way it deserves. Battles, logistics, command failures, and the turning points that textbooks summarize in one paragraph.",
  keywords: [
    "military history",
    "war history",
    "ancient warfare",
    "battle analysis",
    "historical research",
    "military strategy",
    "history newsletter",
    "Kings and Generals",
    "Epic History TV",
  ],
  authors: [{ name: "Aniket Jha", url: "https://histobit.com/about" }],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Histobit Dispatches" }],
    },
  },
  creator: "Histobit",
  openGraph: {
    title: "Histobit — Military History for Serious People",
    description:
      "Deep research. No mythology. Every week — for people who actually want to understand war.",
    url: "https://histobit.com",
    siteName: "Histobit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Histobit — Military History for Serious People",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Histobit — Military History for Serious People",
    description: "Deep research. No mythology. Every week.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${manrope.variable} ${dancingScript.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { EB_Garamond, Manrope, Dancing_Script } from "next/font/google";
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
  title: "Histobit — Military History for Serious People",
  description:
    "Deep research. No mythology. Every week — military history told the way it deserves. Battles, logistics, command failures, and the turning points that textbooks summarize in one paragraph.",
  keywords: [
    "military history",
    "war history",
    "ancient warfare",
    "battle analysis",
    "historical research",
  ],
  openGraph: {
    title: "Histobit — Military History for Serious People",
    description:
      "Deep research. No mythology. Every week — for people who actually want to understand war.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${manrope.variable} ${dancingScript.variable}`}>
      <body>{children}</body>
    </html>
  );
}

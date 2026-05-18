import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Histobit",
  description: "Histobit is a military history channel and newsletter for serious history readers. Deep research, no mythology, told the way it deserves.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

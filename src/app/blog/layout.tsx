import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Archive",
  description: "Every Histobit dispatch. Deep military history — battles, logistics, commanders, and the decisions that changed the world. No mythology.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

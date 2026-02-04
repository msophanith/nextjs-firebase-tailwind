import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy Valentine's Day My Love 💕",
  description: "A special Valentine's Day surprise made with love",
  robots: "noindex, nofollow", // Keep it private
};

export default function ValentineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

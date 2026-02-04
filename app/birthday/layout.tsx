import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy Birthday My Love 💕",
  description: "A special birthday surprise made with love",
  robots: "noindex, nofollow", // Keep it private
};

export default function BirthdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

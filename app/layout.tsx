import type { Metadata, Viewport } from "next";
import { Work_Sans, Playfair_Display, Caveat } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { Toaster } from "@/components/ui/toaster";
import { MobileDebugHelper } from "@/components/mobile-debug-helper";
import { ReactNode } from "react";

const font = Work_Sans({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Vibe Coding - Intelligence",
  description: "Intelligence",
  keywords: "Intelligence",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(font.className, playfair.variable, caveat.variable)}>
        <MyFirebaseProvider>
          {children}
          <Toaster />
          <MobileDebugHelper />
        </MyFirebaseProvider>
      </body>
    </html>
  );
}

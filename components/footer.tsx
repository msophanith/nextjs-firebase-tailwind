"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/upload") return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50 pointer-events-none px-4">
      <footer className="pointer-events-auto px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl shadow-black/10 transition-all hover:scale-105 max-w-full sm:max-w-md">
        <p className="text-[12px] md:text-sm font-medium text-muted-foreground flex items-center justify-center gap-1.5 md:gap-2 text-center leading-tight">
          <span className="whitespace-nowrap">Created with</span>
          <Heart
            className="fill-red-500 text-red-500 animate-pulse shrink-0"
            size={14}
          />
          <span>for anyone who needs it.</span>
        </p>
      </footer>
    </div>
  );
};

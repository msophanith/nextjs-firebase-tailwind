"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/upload") return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50 pointer-events-none">
      <footer className="pointer-events-auto px-6 py-3 transition-all hover:scale-105">
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 whitespace-nowrap drop-shadow-sm">
          Created with{" "}
          <Heart
            className="fill-red-500 text-red-500 animate-pulse"
            size={14}
          />{" "}
          for the people who need it.
        </p>
      </footer>
    </div>
  );
};

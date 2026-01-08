"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";

// Dynamically import the Map component to avoid SSR issues
const WeddingMap = dynamic(() => import("@/components/WeddingMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse min-h-[400px]" />
  ),
});

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl font-bold text-[#8B0000] mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.location.title}
        </h2>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 relative group z-0">
          <WeddingMap key="wedding-map-instance" />
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="outline"
            className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/search/?api=1&query=The+Premier+Center+Sen+Sok",
                "_blank"
              )
            }
          >
            {t.location.button}
          </Button>
        </div>
      </div>
    </section>
  );
}

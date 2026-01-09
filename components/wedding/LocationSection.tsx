"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

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
    <section className="py-20 px-4 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2
          className="text-3xl font-bold text-[#8B0000] mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.location.title}
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 relative group z-0"
        >
          <WeddingMap key="wedding-map-instance" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center gap-4"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}

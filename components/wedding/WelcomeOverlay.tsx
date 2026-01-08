"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

interface WelcomeOverlayProps {
  guestName: string | null;
  showOverlay: boolean;
  onOpen: () => void;
}

export default function WelcomeOverlay({
  guestName,
  showOverlay,
  onOpen,
}: WelcomeOverlayProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {showOverlay && guestName && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#FDFBF7] flex flex-col items-center justify-center p-4 text-center"
        >
          {/* Decorative Border */}
          <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/30 rounded-3xl pointer-events-none"></div>
          <div className="absolute inset-6 sm:inset-10 border border-[#D4AF37]/10 rounded-2xl pointer-events-none"></div>

          <div className="max-w-2xl w-full space-y-8 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
              className="w-20 h-20 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-8"
            >
              <Sparkles className="w-10 h-10 text-[#D4AF37]" />
            </motion.div>

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-slate-500 uppercase tracking-[0.2em] text-sm"
              >
                {t.welcome.invite}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-5xl sm:text-7xl font-bold text-[#8B0000] py-4"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                {guestName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-slate-500 uppercase tracking-[0.2em] text-sm"
              >
                {t.welcome.celebration}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-[#D4AF37] font-serif italic text-xl mt-2"
              >
                {t.welcome.date}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="pt-12"
            >
              <Button
                onClick={onOpen}
                className="bg-[#8B0000] hover:bg-[#6d0000] text-white px-10 py-6 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {t.welcome.open}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

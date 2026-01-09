"use client";

import { Calendar, ArrowDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/khmer-couple.png"
          alt="Couple"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FDFBF7]"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-white/90 text-sm sm:text-base uppercase mb-4 font-medium drop-shadow-md"
        >
          {t.hero.gettingMarried}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-6xl sm:text-8xl font-bold text-white mb-6 drop-shadow-lg"
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          Sokha & Devi
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="inline-flex items-center gap-4 text-white/90 backdrop-blur-sm bg-white/10 px-6 py-2 rounded-full border border-white/20"
        >
          <Calendar className="w-4 h-4" />
          <span className="tracking-widest text-sm">{t.hero.date}</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </header>
  );
}

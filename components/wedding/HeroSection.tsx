"use client";

import { Calendar, ArrowDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="/khmer-couple.png"
          alt="Couple"
          className="w-full h-full object-cover object-top scale-105 animate-in fade-in duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FDFBF7]"></div>
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 text-center px-4 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 fill-mode-forwards opacity-0"
        style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      >
        <p className="text-white/90 tracking-[0.3em] text-sm sm:text-base uppercase mb-4 font-medium drop-shadow-md">
          {t.hero.gettingMarried}
        </p>
        <h1
          className="text-6xl sm:text-8xl font-bold text-white mb-6 drop-shadow-lg"
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          Sokha & Devi
        </h1>
        <div className="inline-flex items-center gap-4 text-white/90 backdrop-blur-sm bg-white/10 px-6 py-2 rounded-full border border-white/20">
          <Calendar className="w-4 h-4" />
          <span className="tracking-widest text-sm">{t.hero.date}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
        <ArrowDown className="w-6 h-6" />
      </div>
    </header>
  );
}

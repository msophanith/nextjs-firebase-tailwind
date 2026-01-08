"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

export default function CountdownTimer() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-12T07:00:00"); // Wedding Date

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-20 -mt-16 px-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-[#D4AF37]/20 p-8 md:p-10">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-8 md:w-16 bg-[#D4AF37]/40"></div>
          <p className="text-[#8B0000] text-xl md:text-2xl font-serif italic tracking-wide">
            {t.countdown.date}
          </p>
          <div className="h-px w-8 md:w-16 bg-[#D4AF37]/40"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center text-center divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20">
          {/* Days */}
          <div className="flex flex-col p-2">
            <span
              className="text-5xl md:text-6xl font-bold text-[#8B0000]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {timeLeft.days}
            </span>
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-medium mt-2">
              {t.countdown.days}
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col p-2">
            <span
              className="text-5xl md:text-6xl font-bold text-[#8B0000]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {timeLeft.hours}
            </span>
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-medium mt-2">
              {t.countdown.hours}
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col p-2">
            <span
              className="text-5xl md:text-6xl font-bold text-[#8B0000]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {timeLeft.minutes}
            </span>
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-medium mt-2">
              {t.countdown.minutes}
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col p-2">
            <span
              className="text-5xl md:text-6xl font-bold text-[#8B0000]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {timeLeft.seconds}
            </span>
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-medium mt-2">
              {t.countdown.seconds}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

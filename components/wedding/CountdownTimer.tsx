"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative group">
      {/* Background Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-b from-[#D4AF37]/10 to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative w-20 h-24 md:w-28 md:h-32 bg-white/10 backdrop-blur-2xl rounded-[1.25rem] border border-white/30 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
        {/* Animated Number */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
            className="text-4xl md:text-5xl font-bold text-[#8B0000] font-playfair tracking-tighter"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>

        {/* Glass Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </div>

    {/* Label with subtle animation */}
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-black mt-4 drop-shadow-sm"
    >
      {label}
    </motion.span>
  </div>
);

export default function CountdownTimer() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-12T07:00:00");

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
    <section className="relative z-30 -mt-20 px-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/30 backdrop-blur-3xl border border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] p-8 md:p-12">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#D4AF37]/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#8B0000]/10 blur-[120px] rounded-full" />

          {/* Subtle Floating Hearts or Sparkles could go here */}

          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex items-center gap-4 md:gap-6 mb-10"
            >
              <div className="hidden md:block h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#D4AF37] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-1">
                  Save The Date
                </span>
                <h3 className="text-[#8B0000] text-xl md:text-3xl font-playfair italic tracking-wider text-center px-4">
                  {t.countdown.date}
                </h3>
              </div>
              <div className="hidden md:block h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
            </motion.div>

            {/* Timer Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              <TimeUnit value={timeLeft.days} label={t.countdown.days} />
              <TimeUnit value={timeLeft.hours} label={t.countdown.hours} />
              <TimeUnit value={timeLeft.minutes} label={t.countdown.minutes} />
              <TimeUnit value={timeLeft.seconds} label={t.countdown.seconds} />
            </div>

            {/* Bottom Accent */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-[1px] bg-[#D4AF37]/30 mt-10"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

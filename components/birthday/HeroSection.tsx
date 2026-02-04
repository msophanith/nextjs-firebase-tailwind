"use client";

import { motion } from "framer-motion";
import { ChevronDown, Heart, Sparkles, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  greeting: string;
  subtitle: string;
  onScrollClick: () => void;
}

export function HeroSection({
  greeting,
  subtitle,
  onScrollClick,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f070f]">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-fuchsia-900 to-indigo-900 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,100,200,0.15),transparent_60%)]" />
      </div>

      {/* Floating Sparkles/Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Sparkles className="w-2 h-2 text-pink-300" />
          </motion.div>
        ))}
      </div>

      {/* Floating Hearts Animation - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{
              x: Math.random() * dimensions.width,
              y: dimensions.height + 100,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: -100,
              x: (Math.random() - 0.5) * 200 + dimensions.width / 2,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
            ) : (
              <span className="text-4xl">{i % 2 === 0 ? "💕" : "💖"}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Glassmorphic Date Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-xl shadow-pink-500/10 hover:shadow-pink-500/40 transition-all duration-500"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <HelpCircle className="w-4 h-4 text-pink-300" />
            </motion.div>
            <span className="text-white/90 text-sm font-medium tracking-widest uppercase">
              February 14, 2026
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {Array.from(greeting).map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.05 + 1,
                  duration: 0.5,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-2xl md:text-4xl text-pink-200/90 mb-12 drop-shadow-md"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            {subtitle}
          </motion.p>

          <motion.button
            onClick={onScrollClick}
            className="group relative px-10 py-5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-full text-white font-medium text-xl hover:from-pink-500/40 hover:to-purple-500/40 transition-all duration-500 border-2 border-white/30 shadow-2xl hover:shadow-pink-500/20"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <span className="flex items-center gap-3">
              Open My Heart
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-pink-300" />
              </motion.span>
            </span>

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
          </motion.button>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-0 left-0 p-12 opacity-40 hidden md:block"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <span className="text-6xl text-pink-300">🎀</span>
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-0 p-12 opacity-40 hidden md:block"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <span className="text-6xl text-pink-300">🌹</span>
      </motion.div>
    </section>
  );
}

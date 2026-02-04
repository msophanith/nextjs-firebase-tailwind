"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { ValentineMemory } from "@/app/valentine/data";

interface MemoriesSectionProps {
  memories: ValentineMemory[];
}

export function MemoriesSection({ memories }: MemoriesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen py-24 px-6 bg-gradient-to-br from-[#1a0b1a] via-[#4d0b2d] to-[#1a0b1a] relative overflow-hidden"
    >
      {/* Background decoration - Enhanced Cute Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[150px] animate-pulse" />

        {/* Floating Cute Icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-30 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {["🧸", "💌", "🌹", "🎀", "🍭", "🌙"][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block text-pink-400 font-medium tracking-tighter mb-4 text-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Captured Moments ✨
          </motion.span>
          <h2
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Our Beautiful Journey
          </h2>
          <p
            className="text-2xl text-pink-200/80 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            Every snapshot tells a story of the love we share �
          </p>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-4">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{
                  opacity: 0,
                  x: 50,
                  rotate: index % 2 === 0 ? -2 : 2,
                }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="flex-shrink-0 w-80 md:w-[400px] snap-center group"
              >
                {/* Polaroid Style Card */}
                <motion.div
                  className="relative bg-white p-4 pb-12 shadow-2xl transition-all duration-500 transform border border-gray-100"
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    y: -10,
                    boxShadow: "0 30px 60px -12px rgba(255,100,200,0.3)",
                  }}
                >
                  {/* Image container */}
                  <div className="relative h-80 md:h-[450px] overflow-hidden bg-gray-100">
                    <Image
                      src={memory.image}
                      alt={memory.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 320px, 400px"
                    />

                    {/* Fallback placeholder (removed 📸) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" />

                    {/* Overlay subtle grain */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Floating hearts on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-2xl"
                          initial={{
                            x: Math.random() * 100 + "%",
                            y: "100%",
                          }}
                          animate={{
                            y: "-20%",
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          �
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Content - Polaroid Style Text */}
                  <div className="pt-6 px-2">
                    {memory.date && (
                      <div className="mb-2">
                        <span className="text-xs font-bold tracking-widest text-pink-500 uppercase">
                          {memory.date}
                        </span>
                      </div>
                    )}
                    <p
                      className="text-gray-800 text-2xl leading-tight"
                      style={{ fontFamily: "var(--font-caveat), cursive" }}
                    >
                      {memory.caption}
                    </p>
                  </div>

                  {/* Polaroid Decorative Elements */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-white">
                    ✨
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center mt-4 text-white/50"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.div>
            <p className="text-sm font-medium tracking-widest uppercase">
              Slide to explore
            </p>
            <motion.div
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Memory } from "@/app/birthday/data";

interface MemoriesSectionProps {
  memories: Memory[];
}

export function MemoriesSection({ memories }: MemoriesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#1a0b1a] via-[#4d0b2d] to-[#1a0b1a] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Our Beautiful Moments
          </h2>
          <p className="text-xl text-white/70">
            Every memory with you is a treasure 💝
          </p>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 md:w-96 snap-center group"
              >
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                  {/* Image container */}
                  <div className="relative h-80 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                    {/* Actual image - will show placeholder text if image doesn't load */}
                    <Image
                      src={memory.image}
                      alt={memory.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, 384px"
                      onError={(e) => {
                        // Show placeholder if image fails to load
                        const target = e.currentTarget;
                        target.style.display = "none";
                      }}
                    />

                    {/* Fallback placeholder (shown if image fails) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4 opacity-50">📸</div>
                      </div>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Floating hearts on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(5)].map((_, i) => (
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
                            delay: i * 0.3,
                          }}
                        >
                          💕
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {memory.date && (
                      <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white mb-3 border border-white/30">
                        {memory.date}
                      </div>
                    )}
                    <p className="text-white text-lg leading-relaxed drop-shadow-sm font-light">
                      {memory.caption}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                    ✨
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-white/50"
        >
          <p className="text-sm">← Scroll to see more memories →</p>
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

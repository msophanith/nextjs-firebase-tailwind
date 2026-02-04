"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import type { LoveNote } from "@/app/valentine/data";
import { Heart, Star, Sparkles, Gift } from "lucide-react";

interface InteractiveRevealProps {
  messages: LoveNote[];
}

const icons = [Heart, Star, Sparkles, Gift];

export function InteractiveReveal({
  messages: initialMessages,
}: InteractiveRevealProps) {
  const [messages, setMessages] = useState(initialMessages);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const revealedCount = messages.filter((m) => m.revealed).length;
  const allRevealed = revealedCount === messages.length;

  const handleReveal = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, revealed: true } : msg)),
    );
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-24 px-6 bg-gradient-to-br from-rose-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Animated cute background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,182,193,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(221,160,221,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles - Enhanced with Cute Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10 select-none text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {["🍭", "⭐️", "🍯", "🍬", "🎈"][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Unlock My Secrets
          </h2>
          <p
            className="text-2xl text-pink-200/80 mb-8"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            Click the magical icons to reveal what my heart says... 💌
          </p>
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <p className="text-white font-medium text-lg">
              {revealedCount} of {messages.length} revealed
            </p>
          </div>
        </motion.div>

        {/* Interactive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {messages.map((message, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.button
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleReveal(message.id)}
                disabled={message.revealed}
                className={`
                  relative aspect-square rounded-[2rem] p-6 transition-all duration-700
                  ${
                    message.revealed
                      ? "bg-white text-rose-600 shadow-[0_20px_50px_rgba(255,100,200,0.3)] rotate-0"
                      : "bg-white/5 backdrop-blur-md border-2 border-white/10 hover:bg-white/15 hover:border-white/30 cursor-pointer -rotate-3"
                  }
                `}
                whileHover={!message.revealed ? { scale: 1.05, rotate: 0 } : {}}
                whileTap={!message.revealed ? { scale: 0.95 } : {}}
              >
                {!message.revealed ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon
                        className="w-16 h-16 text-pink-300 drop-shadow-glow"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex items-center justify-center"
                  >
                    <p
                      className="text-2xl md:text-3xl font-bold text-center leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-caveat), cursive" }}
                    >
                      {message.message}
                    </p>
                  </motion.div>
                )}

                {/* Celebration Sparkle on Reveal */}
                {message.revealed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <Sparkles className="w-20 h-20 text-pink-400" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* All revealed celebration */}
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-center"
          >
            <div className="inline-block px-12 py-6 bg-gradient-to-r from-pink-400 to-rose-600 rounded-full shadow-[0_20px_60px_-15px_rgba(236,72,153,0.5)]">
              <p className="text-white text-2xl font-black italic flex items-center gap-3">
                <Gift className="w-8 h-8 animate-bounce" />
                EVERY SECRET UNLOCKED! YOU'RE MY FAVORITE PERSON!
                <Gift className="w-8 h-8 animate-bounce" />
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

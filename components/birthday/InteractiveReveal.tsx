"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import type { HiddenMessage } from "@/app/birthday/data";
import { Heart, Star, Sparkles } from "lucide-react";

interface InteractiveRevealProps {
  messages: HiddenMessage[];
}

const icons = [Heart, Star, Sparkles];

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
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-rose-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,182,193,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(221,160,221,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Unlock Sweet Messages
          </h2>
          <p className="text-xl text-white/80 mb-6">
            Click the hearts and stars to reveal hidden messages 💫
          </p>
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <p className="text-white font-medium">
              {revealedCount} of {messages.length} revealed
            </p>
          </div>
        </motion.div>

        {/* Interactive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {messages.map((message, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.button
                key={message.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleReveal(message.id)}
                disabled={message.revealed}
                className={`
                  relative aspect-square rounded-3xl p-6 transition-all duration-500
                  ${
                    message.revealed
                      ? "bg-white/20 backdrop-blur-md border-2 border-white/30"
                      : "bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:bg-white/10 hover:scale-105 cursor-pointer"
                  }
                `}
                whileHover={!message.revealed ? { scale: 1.05 } : {}}
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
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon
                        className="w-12 h-12 text-white/60"
                        fill="currentColor"
                      />
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex items-center justify-center"
                  >
                    <p className="text-white text-sm md:text-base font-medium text-center leading-relaxed">
                      {message.message}
                    </p>
                  </motion.div>
                )}

                {/* Reveal animation */}
                {message.revealed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-6xl">✨</div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* All revealed celebration */}
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl">
              <p className="text-white text-xl font-bold">
                🎉 You found all the messages! You're amazing! 🎉
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

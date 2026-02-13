"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Stars } from "lucide-react";

// Floating Background Hearts
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<
    Array<{
      id: number;
      left: number;
      duration: number;
      size: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 15,
      size: 15 + Math.random() * 25,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px]"
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: "-110vh",
            opacity: [0, 0.4, 0.4, 0],
            x: Math.sin(heart.id) * 50,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{ left: `${heart.left}%` }}
        >
          <Heart
            size={heart.size}
            fill="#fbcfe8"
            className="text-pink-200 opacity-30"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function ValentineGiftPage() {
  const [isClicked, setIsClicked] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 2000);
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff1f2] via-[#fdf2f8] to-[#fce7f3] px-4 py-8">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        {/* Animated Centerpiece */}
        <motion.div
          animate={
            isClicked
              ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
              : { y: [0, -10, 0] }
          }
          transition={
            isClicked
              ? { duration: 0.5, repeat: Infinity }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative mb-8"
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-pink-300/20 blur-3xl rounded-full"
            />
            <Heart
              size={120}
              fill="#fb7185"
              className="text-rose-500 drop-shadow-[0_0_20px_rgba(244,114,182,0.5)]"
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-serif italic font-bold text-rose-600 mb-4">
            For My Dearest
          </h1>
          <p className="text-pink-600/70 text-lg font-medium">
            Every moment with you is a beautiful adventure.
          </p>
        </motion.div>

        {/* Button & Hidden Content */}
        <AnimatePresence mode="wait">
          {!isClicked ? (
            <motion.button
              key="button"
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-bold text-lg shadow-[0_10px_25px_-5px_rgba(244,114,182,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(244,114,182,0.6)] transition-all duration-300"
            >
              <span className="flex items-center gap-2">Click me ❤️</span>
              <motion.div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-xl max-w-sm"
            >
              <Stars className="text-yellow-400 mb-4 mx-auto" size={32} />
              <h2 className="text-2xl font-serif italic font-bold text-rose-500 mb-4">
                Surprise! 🎁
              </h2>
              <p className="text-pink-700 leading-relaxed text-lg italic">
                "I love you more than all the stars in the night sky. Will you
                continue being my favorite person today, tomorrow, and forever?"
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-6 text-rose-400 text-3xl"
              >
                💕
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pop-up Sparkles */}
        <AnimatePresence>
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1,
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 300,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute"
                >
                  <Stars className="text-yellow-300" size={24} />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 text-pink-300/50 text-sm font-medium tracking-widest uppercase">
        Valentime 2026
      </div>
    </main>
  );
}

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Heart, Sparkles, Gift, Stars } from "lucide-react";

interface FinalBirthdayMomentProps {
  title: string;
  subtitle: string;
  easterEgg: string;
  musicUrl?: string;
}

export function FinalBirthdayMoment({
  title,
  subtitle,
  easterEgg,
  musicUrl,
}: FinalBirthdayMomentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const confettiColors = [
    "#ff6b9d",
    "#ff8fb3",
    "#f472b6",
    "#ec4899",
    "#d946ef",
    "#818cf8",
  ];

  useEffect(() => {
    if (clickCount >= 5 && !showEasterEgg) {
      setShowEasterEgg(true);
    }
  }, [clickCount, showEasterEgg]);

  useEffect(() => {
    if (isInView && musicUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [isInView, musicUrl]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) audioRef.current.play();
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f070f]"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-pink-600 to-indigo-900">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,200,0.3)_0%,transparent_70%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`final-particle-${i}`}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              y: [0, -40, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {i % 3 === 0 ? "✨" : i % 3 === 1 ? "🎈" : "🍰"}
          </motion.div>
        ))}
      </div>

      {/* Confetti - Only when in view */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: confettiColors[i % confettiColors.length],
                left: `${Math.random() * 100}%`,
                top: -50,
              }}
              animate={{
                y: dimensions.height + 100,
                rotate: Math.random() * 1000,
                x: (Math.random() - 0.5) * 200,
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-30 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          onClick={() => setClickCount((prev) => prev + 1)}
          className="cursor-pointer group select-none"
        >
          <motion.div
            className="mb-8 inline-block"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-8xl">💝</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-9xl font-black text-white mb-8 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-3xl md:text-5xl text-pink-200/95 mb-12 drop-shadow-md"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            {subtitle}
          </motion.p>

          {/* Celebration Icons Bar */}
          <motion.div
            className="flex justify-center gap-6 mb-16 items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            {[Heart, Sparkles, Gift, Stars, Sparkles, Heart].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  scale: [1, 1.3, 1],
                  rotate: [0, 20, -20, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Icon
                  className={`w-12 h-12 ${i % 2 === 0 ? "text-pink-400" : "text-amber-300"} fill-current opacity-80`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Easter Egg Content */}
          <AnimatePresence>
            {showEasterEgg && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", duration: 1, bounce: 0.5 }}
                className="mt-8 p-10 bg-white/10 backdrop-blur-2xl rounded-[3rem] border-2 border-white/30 shadow-[0_20px_50px_rgba(255,100,200,0.4)]"
              >
                <motion.p
                  className="text-white text-3xl md:text-5xl font-black leading-tight italic"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ {easterEgg} ✨
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {!showEasterEgg && clickCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <div className="inline-block px-6 py-2 bg-white/10 rounded-full border border-white/20">
                <p className="text-white/80 text-sm tracking-widest uppercase">
                  Reveal the surprise: {clickCount}/5 clicks
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Elements Background - Cohesive Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`env-heart-${i}`}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart className="w-12 h-12 text-pink-300 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Music control - HIDDEN */}
      {/* 
      {musicUrl && (
        <>
          <audio ref={audioRef} loop muted={isMuted}>
            <source src={musicUrl} type="audio/mpeg" />
          </audio>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 }}
            onClick={toggleMute}
            className={`fixed bottom-10 right-10 z-50 p-6 rounded-full border-2 transition-all duration-500 shadow-2xl ${
              isMuted ? "bg-white/5 border-white/10 text-white/50" : "bg-pink-500 border-white/50 text-white animate-pulse"
            }`}
            whileHover={{ scale: 1.1, rotate: isMuted ? 0 : 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
          </motion.button>
        </>
      )}
      */}
    </section>
  );
}

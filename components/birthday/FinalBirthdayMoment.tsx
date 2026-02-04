"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

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

  // Confetti particles
  const confettiColors = [
    "#ff6b9d",
    "#c44569",
    "#f8b500",
    "#ffa801",
    "#9b59b6",
    "#3498db",
  ];

  useEffect(() => {
    if (clickCount >= 5 && !showEasterEgg) {
      setShowEasterEgg(true);
    }
  }, [clickCount, showEasterEgg]);

  // Auto-play music when in view (muted by default for browser policies)
  useEffect(() => {
    if (isInView && musicUrl && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay was prevented, user needs to interact
      });
    }
  }, [isInView, musicUrl]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        audioRef.current.play();
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-rose-600">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Confetti animation */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: confettiColors[i % confettiColors.length],
                left: `${Math.random() * 100}%`,
                top: -20,
              }}
              initial={{ y: -20, rotate: 0, opacity: 1 }}
              animate={{
                y: dimensions.height + 100,
                rotate: Math.random() * 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, type: "spring" }}
          onClick={() => setClickCount((prev) => prev + 1)}
          className="cursor-pointer"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 drop-shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-white/95 mb-12 font-light drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {subtitle}
          </motion.p>

          {/* Animated hearts */}
          <motion.div
            className="flex justify-center gap-4 text-6xl mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            {["❤️", "💕", "💖", "💗", "💝"].map((heart, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {heart}
              </motion.span>
            ))}
          </motion.div>

          {/* Easter egg */}
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mt-8 p-6 bg-white/20 backdrop-blur-md rounded-3xl border-2 border-white/30"
            >
              <p className="text-white text-xl md:text-2xl font-medium">
                {easterEgg}
              </p>
            </motion.div>
          )}

          {!showEasterEgg && clickCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/70 text-sm mt-4"
            >
              Keep clicking... ({clickCount}/5)
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Music control */}
      {musicUrl && (
        <>
          <audio ref={audioRef} loop muted={isMuted}>
            <source src={musicUrl} type="audio/mpeg" />
          </audio>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={toggleMute}
            className="fixed bottom-8 right-8 z-50 p-4 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </>
      )}

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-4xl"
            initial={{
              x: Math.random() * dimensions.width,
              y: dimensions.height + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * dimensions.width,
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            💕
          </motion.div>
        ))}
      </div>
    </section>
  );
}

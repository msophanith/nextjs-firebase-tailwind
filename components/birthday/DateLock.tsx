"use client";

import { motion } from "framer-motion";
import { Lock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface DateLockProps {
  targetDate: string; // YYYY-MM-DD format
  onUnlock: () => void;
  children: React.ReactNode;
}

export function DateLock({ targetDate, onUnlock, children }: DateLockProps) {
  const [bypassCode, setBypassCode] = useState("");
  const [showBypass, setShowBypass] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);
  const [sparkles, setSparkles] = useState<
    Array<{ x: number; y: number; delay: number }>
  >([]);
  const [daysUntil, setDaysUntil] = useState<number>(0);
  const [isDateUnlocked, setIsDateUnlocked] = useState(false);

  useEffect(() => {
    // Random particles
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    );
    setSparkles(
      [...Array(30)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      })),
    );

    // Date calculation on client to avoid timezone mismatches
    const today = new Date();
    const target = new Date(targetDate);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    setIsDateUnlocked(today >= target);
    setDaysUntil(
      Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    );
  }, [targetDate]);

  const target = new Date(targetDate); // Keep for display formatting which is safe with en-US

  // Secret bypass code (change this to something meaningful)
  const SECRET_CODE = "iloveyou";

  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bypassCode.toLowerCase() === SECRET_CODE) {
      setIsUnlocking(true);
      // Delay to show unlock animation
      setTimeout(() => {
        setIsBypassed(true);
        setIsUnlocking(false);
        onUnlock();
      }, 2000);
    } else {
      alert("Wrong code! Try again 💕");
      setBypassCode("");
    }
  };

  // Show content if unlocked by date OR bypassed (and not currently unlocking)
  if (isDateUnlocked || (isBypassed && !isUnlocking)) {
    return <>{children}</>;
  }

  // Show unlocking animation
  if (isUnlocking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-9xl mb-6"
          >
            💝
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            Unlocking your surprise...
          </motion.h2>
        </motion.div>

        {/* Sparkle burst */}
        {sparkles.map((sparkle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: "50vw",
              y: "50vh",
              scale: 0,
            }}
            animate={{
              x: `${sparkle.x}vw`,
              y: `${sparkle.y}vh`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: sparkle.delay,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border-2 border-white/20"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-8"
          >
            <Lock className="w-24 h-24 text-white mx-auto" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Something Special Awaits...
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-white/80" />
            <p className="text-xl text-white/90">
              This surprise unlocks on{" "}
              <span className="font-bold text-pink-300">
                {target.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>

          <p className="text-lg text-white/70 mb-8">
            {daysUntil === 1
              ? "Just 1 more day! 🎉"
              : `Only ${daysUntil} days to go! 💕`}
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="text-3xl"
              >
                💝
              </motion.div>
            ))}
          </div>

          {/* Secret bypass option */}
          {!showBypass ? (
            <button
              onClick={() => setShowBypass(true)}
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              Can't wait? Click here...
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleBypassSubmit}
              className="mt-6"
            >
              <p className="text-white/70 text-sm mb-3">
                Enter the secret code to unlock early 🔓
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bypassCode}
                  onChange={(e) => setBypassCode(e.target.value)}
                  placeholder="Secret code..."
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium hover:shadow-lg transition-all"
                >
                  Unlock
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

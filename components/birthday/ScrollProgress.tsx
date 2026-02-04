"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating heart indicator */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        style={{ opacity: scrollYProgress }}
      >
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
          className="text-4xl drop-shadow-lg"
        >
          💕
        </motion.div>
      </motion.div>
    </>
  );
}

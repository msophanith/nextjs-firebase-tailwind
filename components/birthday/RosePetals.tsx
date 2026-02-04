"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function RosePetals() {
  const [petals, setPetals] = useState<
    Array<{
      left: number;
      duration: number;
      delay: number;
      x1: number;
      x2: number;
    }>
  >([]);

  useEffect(() => {
    setPetals(
      [...Array(15)].map(() => ({
        left: Math.random() * 100,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5,
        x1: Math.random() * 100 - 50,
        x2: Math.random() * 100 - 50,
      })),
    );
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: -50,
          }}
          initial={{ y: -50, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            rotate: 360, // Simplified rotation for consistency
            opacity: [0, 0.6, 0.4, 0],
            x: [0, petal.x1, petal.x2],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2C10 2 6 5 6 8C6 10 7.5 11 10 11C12.5 11 14 10 14 8C14 5 10 2 10 2Z"
              fill="#ff6b9d"
              opacity="0.8"
            />
            <path
              d="M10 11C10 11 7 13 7 15C7 16.5 8 17 10 17C12 17 13 16.5 13 15C13 13 10 11 10 11Z"
              fill="#ff8fb3"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

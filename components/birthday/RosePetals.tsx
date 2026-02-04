"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function RosePetals() {
  const [elements, setElements] = useState<
    Array<{
      id: number;
      left: number;
      duration: number;
      delay: number;
      x1: number;
      x2: number;
      scale: number;
      type: "petal" | "heart";
      color: string;
    }>
  >([]);

  useEffect(() => {
    const colors = ["#ff6b9d", "#ff8fb3", "#f472b6", "#ec4899", "#d946ef"];
    setElements(
      [...Array(30)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
        x1: Math.random() * 150 - 75,
        x2: Math.random() * 150 - 75,
        scale: Math.random() * 0.5 + 0.5,
        type: Math.random() > 0.4 ? "petal" : "heart",
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    );
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.left}%`,
            top: -50,
          }}
          initial={{ y: -50, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            rotate: 360,
            opacity: [0, 0.7, 0.5, 0],
            x: [0, el.x1, el.x2],
            scale: el.scale,
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {el.type === "petal" ? (
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10 2 6 5 6 8C6 10 7.5 11 10 11C12.5 11 14 10 14 8C14 5 10 2 10 2Z"
                fill={el.color}
                opacity="0.6"
              />
              <path
                d="M10 11C10 11 7 13 7 15C7 16.5 8 17 10 17C12 17 13 16.5 13 15C13 13 10 11 10 11Z"
                fill={el.color}
                opacity="0.4"
              />
            </svg>
          ) : (
            <div
              className="text-2xl"
              style={{
                color: el.color,
                filter: "drop-shadow(0 0 5px rgba(255,100,200,0.3))",
              }}
            >
              ❤️
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

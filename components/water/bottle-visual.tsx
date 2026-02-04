"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BottleSize } from "@/app/water/constants";

interface BottleVisualProps {
  selectedSize: BottleSize;
}

export function BottleVisual({ selectedSize }: BottleVisualProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative aspect-[4/3] lg:aspect-square max-w-lg mx-auto my-8 lg:my-0 flex items-center justify-center perspective-1000 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/40 via-blue-100/20 to-transparent rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" />

      {/* Bottle Container */}
      <motion.div
        key={selectedSize}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        {/* Bottle Shape */}
        <div
          className={`
            relative overflow-hidden transition-all duration-500 ease-in-out
            bg-gradient-to-br from-white/20 to-blue-50/10 backdrop-blur-sm
            border border-white/40 shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)]
            ${
              selectedSize === "330ml"
                ? "w-32 h-64 rounded-[2rem]"
                : selectedSize === "500ml"
                  ? "w-40 h-80 rounded-[2.5rem]"
                  : "w-56 h-[28rem] rounded-[3rem]"
            }
          `}
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Cap */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-lg shadow-md z-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-2 bg-blue-700/20 blur-[1px] z-10" />

          {/* Water Liquid */}
          <div className="absolute bottom-0 left-0 right-0 h-[92%] bg-gradient-to-t from-blue-500/30 via-cyan-400/10 to-transparent overflow-hidden">
            {/* Bubbles */}
            <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-[rise_4s_infinite_ease-in]" />
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-white/30 rounded-full animate-[rise_6s_infinite_ease-in_0.5s]" />
            <div className="absolute bottom-0 left-3/4 w-1.5 h-1.5 bg-white/50 rounded-full animate-[rise_5s_infinite_ease-in_1s]" />

            {/* Surface Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 blur-[2px]" />
          </div>

          {/* Label */}
          <div className="absolute top-[45%] left-0 right-0 h-24 bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transform -translate-y-1/2">
            <div className="text-center px-4">
              <span className="block text-[10px] font-bold tracking-[0.2em] text-blue-900 uppercase mb-1">
                AquaPure
              </span>
              <span className="block text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {selectedSize}
              </span>
              <div className="w-8 h-0.5 bg-blue-200 mx-auto mt-2 rounded-full" />
            </div>
          </div>

          {/* Dynamic Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-30 pointer-events-none"
            style={{ x: shineX, opacity: 0.5 }}
          />

          {/* Highlights & Reflections */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-8 right-4 w-2 h-32 bg-white/40 rounded-full blur-[2px]" />
          <div className="absolute bottom-8 left-4 w-1 h-16 bg-white/20 rounded-full blur-[1px]" />
        </div>

        {/* Shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-blue-900/20 blur-xl rounded-full transition-transform duration-200"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>
    </div>
  );
}

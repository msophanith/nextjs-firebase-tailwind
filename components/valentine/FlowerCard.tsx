"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Rose3D } from "./Rose3D";

interface FlowerCardProps {
  readonly name: string;
  readonly meaning: string;
  readonly image: string;
  readonly color: string;
  readonly delay: number;
}

export function FlowerCard({
  name,
  meaning,
  image,
  color,
  delay,
}: FlowerCardProps) {
  const [isPicked, setIsPicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10 }}
      className="relative group bg-white/[0.03] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:border-pink-500/30"
    >
      <div className="relative h-80 w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-black/40">
        <Rose3D
          color={color}
          size={220}
          isBlooming={!isPicked}
          className="transition-transform duration-700 group-hover:scale-110"
        />

        {isPicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-pink-500/10 backdrop-blur-[1px]"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white/10 p-5 rounded-full border border-white/20 backdrop-blur-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <h3
          className={`text-2xl font-bold mb-2 text-white transition-colors duration-500 ${isPicked ? "text-pink-300" : ""}`}
          style={{ textShadow: `0 0 10px ${color}` }}
        >
          {name} {isPicked && "💝"}
        </h3>
        <p className="text-pink-100/80 text-sm leading-relaxed min-h-[60px]">
          {isPicked
            ? "This rose is now part of our virtual bouquet. A token of my eternal affection for you."
            : meaning}
        </p>

        <motion.button
          onClick={() => setIsPicked(!isPicked)}
          whileTap={{ scale: 0.95 }}
          className={`mt-4 w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
            isPicked
              ? "bg-pink-500/40 border-pink-400 text-white"
              : "bg-white/10 border-white/20 text-white hover:bg-white/20"
          }`}
        >
          {isPicked ? "Picked with Love" : "Pick This Rose"}
        </motion.button>
      </div>

      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full blur-md opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-150"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

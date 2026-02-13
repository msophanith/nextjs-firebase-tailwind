"use client";

import { motion } from "framer-motion";

interface Rose3DProps {
  color?: string;
  size?: number;
  className?: string;
  isBlooming?: boolean;
}

export function Rose3D({
  color = "#e11d48",
  size = 200,
  className = "",
  isBlooming = true,
}: Rose3DProps) {
  const petals = [
    { rotate: 0, delay: 0, scale: 1, top: "50%", left: "50%" },
    { rotate: 45, delay: 0.1, scale: 0.9, top: "50%", left: "50%" },
    { rotate: 90, delay: 0.2, scale: 0.8, top: "50%", left: "50%" },
    { rotate: 135, delay: 0.3, scale: 0.7, top: "50%", left: "50%" },
    { rotate: 180, delay: 0.4, scale: 0.6, top: "50%", left: "50%" },
    { rotate: 225, delay: 0.5, scale: 0.5, top: "50%", left: "50%" },
    { rotate: 270, delay: 0.6, scale: 0.4, top: "50%", left: "50%" },
    { rotate: 315, delay: 0.7, scale: 0.3, top: "50%", left: "50%" },
  ];

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Stem */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: size }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 w-1.5 bg-green-800 rounded-full"
        style={{ left: "calc(50% - 3px)" }}
      >
        {/* Leaf 1 */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: -45 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-1/2 -left-6 w-8 h-4 bg-green-700 rounded-[50%_0_50%_0]"
        />
        {/* Leaf 2 */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute top-1/3 -right-6 w-8 h-4 bg-green-700 rounded-[0_50%_0_50%]"
        />
      </motion.div>

      {/* Flower Head */}
      <motion.div
        className="relative w-full h-full"
        initial={{ scale: 0 }}
        animate={{ scale: isBlooming ? 1 : 0.4 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
      >
        {petals.map((petal, i) => (
          <motion.div
            key={petal.rotate}
            className="absolute rounded-[50%_50%_50%_50% / 40%_40%_60%_60%] shadow-inner"
            style={{
              width: "60%",
              height: "70%",
              backgroundColor: color,
              top: "15%",
              left: "20%",
              transformOrigin: "center bottom",
              rotate: `${petal.rotate}deg`,
              zIndex: 10 - i,
              filter: `brightness(${100 - i * 5}%)`,
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: petal.scale,
              rotate: petal.rotate + (isBlooming ? 0 : 10),
            }}
            transition={{
              duration: 2,
              delay: 0.5 + petal.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {/* Texture/Glow on petal */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        ))}

        {/* Center of the rose */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-20 shadow-lg"
          style={{ backgroundColor: color, filter: "brightness(50%)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Animated Glow */}
      <div
        className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

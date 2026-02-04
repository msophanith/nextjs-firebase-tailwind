"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";

interface Reason {
  id: number;
  reason: string;
  icon: string;
}

interface WhyILoveYouProps {
  reasons: Reason[];
}

export function WhyILoveYou({ reasons }: WhyILoveYouProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [elements, setElements] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
      icon: string;
    }>
  >([]);

  useEffect(() => {
    const icons = ["❤️", "💖", "✨", "🧸", "💌", "🌸", "🍭"];
    setElements(
      [...Array(25)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
        icon: icons[Math.floor(Math.random() * icons.length)],
      })),
    );
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen py-24 px-6 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        {elements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl select-none"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
            }}
          >
            {el.icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6 inline-block"
          >
            💝
          </motion.div>
          <h2
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Why I Love You
          </h2>
          <p
            className="text-2xl text-pink-200/80"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            Every day I find new reasons to fall for you... ✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 hover:border-pink-500/50 overflow-hidden">
                {/* Soft card glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Number badge - Cute Style */}
                <div className="absolute -top-2 -left-2 w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                  <span className="text-white font-black text-xl">
                    {item.id}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6 text-center group-hover:scale-125 transition-transform duration-500 ease-out">
                  {item.icon}
                </div>

                {/* Reason text */}
                <p
                  className="text-white text-3xl text-center leading-tight drop-shadow-md pb-4"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {item.reason}
                </p>

                {/* Decorative heart sparks */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-pink-300 fill-pink-300/30" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: reasons.length * 0.1 + 0.5 }}
          className="text-center mt-20"
        >
          <motion.div
            className="inline-block px-12 py-6 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-xl rounded-full shadow-2xl border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <p
              className="text-white text-3xl font-medium"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              And a million more reasons every single day 💕
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

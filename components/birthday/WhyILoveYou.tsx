"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart } from "lucide-react";

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
  const [hearts, setHearts] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    setHearts(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 2,
      })),
    );
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] relative overflow-hidden"
    >
      {/* Background hearts */}
      <div className="absolute inset-0 opacity-5">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            💕
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Why I Love You
          </h2>
          <p className="text-xl text-white/80">Let me count the ways... 💝</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {item.id}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Reason text */}
                <p className="text-white text-lg text-center leading-relaxed font-light">
                  {item.reason}
                </p>

                {/* Decorative heart */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
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
          className="text-center mt-16"
        >
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl">
            <p className="text-white text-xl font-medium">
              And a million more reasons every day 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

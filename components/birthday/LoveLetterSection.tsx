"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface LoveLetterSectionProps {
  title: string;
  paragraphs: string[];
}

export function LoveLetterSection({
  title,
  paragraphs,
}: LoveLetterSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;

    if (currentParagraph < paragraphs.length) {
      const paragraph = paragraphs[currentParagraph];

      if (currentChar < paragraph.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const newText = [...prev];
            newText[currentParagraph] = paragraph.slice(0, currentChar + 1);
            return newText;
          });
          setCurrentChar((prev) => prev + 1);
        }, 30); // Typing speed

        return () => clearTimeout(timeout);
      } else {
        // Move to next paragraph after a pause
        const timeout = setTimeout(() => {
          setCurrentParagraph((prev) => prev + 1);
          setCurrentChar(0);
        }, 500);

        return () => clearTimeout(timeout);
      }
    }
  }, [isInView, currentParagraph, currentChar, paragraphs]);

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#2a1b1b] via-[#4d1616] to-[#2a1b1b] relative overflow-hidden"
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDRhZjM3IiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h2>
        </motion.div>

        {/* Letter paper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-amber-300 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-amber-300 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-amber-300 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-amber-300 rounded-br-lg" />

          {/* Letter content */}
          <div className="space-y-6 font-serif text-gray-800">
            {displayedText.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`
                  text-lg md:text-xl leading-relaxed
                  ${index === 0 ? "text-2xl font-semibold text-rose-600" : ""}
                  ${index === paragraphs.length - 2 ? "mt-8" : ""}
                  ${index === paragraphs.length - 1 ? "text-right italic text-rose-600 font-medium" : ""}
                `}
              >
                {text}
                {currentParagraph === index &&
                  currentChar < paragraphs[index].length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-6 bg-rose-600 ml-1"
                    />
                  )}
              </motion.p>
            ))}
          </div>

          {/* Decorative hearts */}
          <div className="absolute -top-6 -right-6 text-5xl opacity-80">💕</div>
          <div className="absolute -bottom-6 -left-6 text-4xl opacity-60">
            ✨
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {i % 2 === 0 ? "💝" : "🌹"}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

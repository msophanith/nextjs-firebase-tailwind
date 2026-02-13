"use client";

import { motion } from "framer-motion";
import { FlowerCard } from "./FlowerCard";

const flowers = [
  {
    name: "Crimson Desire",
    meaning:
      "The classic symbol of deep love and passion. A rose that speaks of a heart that beats only for you.",
    image: "", // Image prop is no longer used by FlowerCard
    color: "#e11d48",
  },
  {
    name: "Pink Grace",
    meaning:
      "Representing admiration, gentleness, and joy. This rose expresses my deep appreciation for your presence in my life.",
    image: "",
    color: "#ec4899",
  },
  {
    name: "Golden Loyalty",
    meaning:
      "A symbol of friendship turned into eternal love. Bright and cheerful, just like the light you bring to my world.",
    image: "",
    color: "#facc15",
  },
  {
    name: "Purple Enchantment",
    meaning:
      "Signifying love at first sight and enchantment. You cast a spell on my heart from the moment we met.",
    image: "",
    color: "#a855f7",
  },
  {
    name: "White Purity",
    meaning:
      "Representing the purity of our commitment and a new beginning. A love that is clean, honest, and forever.",
    image: "",
    color: "#ffffff",
  },
  {
    name: "Midnight Passion",
    meaning:
      "A rare and mysterious love that grows deeper in the quiet moments. Intense, unique, and deeply felt.",
    image: "",
    color: "#4c0519",
  },
];

export function FlowerSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 italic">
          Bouquet of Eternal Roses
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mb-6" />
        <p className="text-pink-100/70 max-w-2xl mx-auto text-lg">
          Unlike real flowers that fade, these digital roses bloom forever—just
          like my love for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flowers.map((flower, index) => (
          <FlowerCard key={flower.name} {...flower} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}

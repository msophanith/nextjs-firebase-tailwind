"use client";

import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#8B0000] text-white py-16 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-5xl font-bold mb-6"
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          Sokha & Devi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white/60 text-sm tracking-widest uppercase"
        >
          {t.footer.thanks}
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="h-px bg-white/20 mx-auto mt-8"
        ></motion.div>
      </motion.div>
    </footer>
  );
}

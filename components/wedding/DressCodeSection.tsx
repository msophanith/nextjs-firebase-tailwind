"use client";

import { Shirt } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

export default function DressCodeSection() {
  const { t } = useLanguage();

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-4"
        >
          <Shirt className="w-6 h-6 text-[#D4AF37]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-12"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.dressCode.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Morning Attire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/20"
          >
            <h3
              className="text-xl font-bold text-slate-800 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t.dressCode.morning.title}
            </h3>
            <p className="text-[#D4AF37] font-medium uppercase tracking-widest text-xs mb-6">
              {t.dressCode.morning.subtitle}
            </p>

            <div className="flex justify-center gap-4 mb-6">
              {[
                { color: "#D4AF37", label: t.dressCode.morning.colors.gold },
                { color: "#F5E6D3", label: t.dressCode.morning.colors.cream },
                { color: "#E6B8B8", label: t.dressCode.morning.colors.rose },
              ].map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-full shadow-md border-2 border-white ring-1 ring-[#D4AF37]/30"
                    style={{ backgroundColor: c.color }}
                  ></div>
                  <span className="text-xs text-slate-500">{c.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.dressCode.morning.desc}
            </p>
          </motion.div>

          {/* Evening Attire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/20"
          >
            <h3
              className="text-xl font-bold text-slate-800 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t.dressCode.evening.title}
            </h3>
            <p className="text-[#8B0000] font-medium uppercase tracking-widest text-xs mb-6">
              {t.dressCode.evening.subtitle}
            </p>

            <div className="flex justify-center gap-4 mb-6">
              {[
                {
                  color: "#8B0000",
                  label: t.dressCode.evening.colors.burgundy,
                },
                { color: "#1A1A1A", label: t.dressCode.evening.colors.black },
                { color: "#C0C0C0", label: t.dressCode.evening.colors.silver },
              ].map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-full shadow-md border-2 border-white ring-1 ring-slate-200"
                    style={{ backgroundColor: c.color }}
                  ></div>
                  <span className="text-xs text-slate-500">{c.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.dressCode.evening.desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

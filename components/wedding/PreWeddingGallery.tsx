"use client";

import { Camera } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, Variants } from "framer-motion";

export default function PreWeddingGallery() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-4">
            <Camera className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t.gallery.title}
          </h2>
          <p className="text-slate-500 italic">{t.gallery.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4"
        >
          {/* Photo 1 Placeholder */}
          <motion.div
            variants={itemVariants}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400"
          >
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-serif text-sm tracking-widest uppercase">
              Photo 1
            </p>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
              <p className="text-white font-serif tracking-widest text-sm uppercase">
                The Beginning
              </p>
            </div>
          </motion.div>

          {/* Photo 2 Placeholder - Staggered */}
          <motion.div
            variants={itemVariants}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 md:mt-12 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400"
          >
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-serif text-sm tracking-widest uppercase">
              Photo 2
            </p>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
              <p className="text-white font-serif tracking-widest text-sm uppercase">
                Together Forever
              </p>
            </div>
          </motion.div>

          {/* Photo 3 Placeholder */}
          <motion.div
            variants={itemVariants}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400"
          >
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-serif text-sm tracking-widest uppercase">
              Photo 3
            </p>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
              <p className="text-white font-serif tracking-widest text-sm uppercase">
                Endless Love
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

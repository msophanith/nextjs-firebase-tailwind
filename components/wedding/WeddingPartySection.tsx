"use client";

import { useLanguage } from "./LanguageContext";
import { motion, Variants } from "framer-motion";

export default function WeddingPartySection() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t.party.title}
          </h2>
          <p className="text-slate-500 italic">{t.party.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Groomsmen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center border-b border-[#D4AF37]/20 pb-4 mb-8">
              <h3
                className="text-2xl font-bold text-slate-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {t.party.groomsmen}
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { name: "Dara Sok", role: t.party.bestMan, highlight: true },
                { name: "Vibol Chea", role: t.party.groomsman },
                { name: "Rithy Chan", role: t.party.groomsman },
                { name: "Sambath Keo", role: t.party.groomsman },
              ].map((person, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <span className="text-xs uppercase font-bold">Photo</span>
                    </div>
                  </div>
                  <h4
                    className={`font-bold ${
                      person.highlight ? "text-[#8B0000]" : "text-slate-700"
                    }`}
                  >
                    {person.name}
                  </h4>
                  <p
                    className={`text-xs uppercase tracking-widest mt-1 ${
                      person.highlight ? "text-[#D4AF37]" : "text-slate-500"
                    }`}
                  >
                    {person.role}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bridesmaids */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center border-b border-[#D4AF37]/20 pb-4 mb-8">
              <h3
                className="text-2xl font-bold text-slate-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {t.party.bridesmaids}
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  name: "Bopha Lim",
                  role: t.party.maidOfHonor,
                  highlight: true,
                },
                { name: "Sophea Chan", role: t.party.bridesmaid },
                { name: "Kanya So", role: t.party.bridesmaid },
                { name: "Leakena Tep", role: t.party.bridesmaid },
              ].map((person, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <span className="text-xs uppercase font-bold">Photo</span>
                    </div>
                  </div>
                  <h4
                    className={`font-bold ${
                      person.highlight ? "text-[#8B0000]" : "text-slate-700"
                    }`}
                  >
                    {person.name}
                  </h4>
                  <p
                    className={`text-xs uppercase tracking-widest mt-1 ${
                      person.highlight ? "text-[#D4AF37]" : "text-slate-500"
                    }`}
                  >
                    {person.role}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

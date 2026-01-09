"use client";

import { Clock, Music, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, Variants } from "framer-motion";

export default function EventsSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 sm:py-24 px-4 relative bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
        <img
          src="/khmer-texture.png"
          className="w-full h-full object-cover"
          alt="texture"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-center text-[#8B0000] mb-12 sm:mb-16"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.events.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Morning Ceremony Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/20 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3
                  className="text-2xl font-bold text-slate-800"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {t.events.morning.title}
                </h3>
                <p className="text-[#D4AF37] font-medium uppercase tracking-wide text-xs sm:text-sm">
                  {t.events.morning.subtitle}
                </p>
              </div>
            </div>

            {/* Timeline Items */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-8 relative pl-2"
            >
              {/* Vertical Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#D4AF37]/20"
              ></motion.div>

              {/* Item 1 */}
              <motion.div variants={itemVariants} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-[#D4AF37] rounded-full z-10"></div>
                <h4 className="font-bold text-[#8B0000] text-lg">
                  {t.events.morning.item1.time}
                </h4>
                <p className="font-medium text-slate-800">
                  {t.events.morning.item1.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {t.events.morning.item1.desc}
                </p>
              </motion.div>

              {/* Item 2 */}
              <motion.div variants={itemVariants} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-[#D4AF37] rounded-full z-10"></div>
                <h4 className="font-bold text-[#8B0000] text-lg">
                  {t.events.morning.item2.time}
                </h4>
                <p className="font-medium text-slate-800">
                  {t.events.morning.item2.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {t.events.morning.item2.desc}
                </p>
              </motion.div>

              {/* Item 3 */}
              <motion.div variants={itemVariants} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-[#D4AF37] rounded-full z-10"></div>
                <h4 className="font-bold text-[#8B0000] text-lg">
                  {t.events.morning.item3.time}
                </h4>
                <p className="font-medium text-slate-800">
                  {t.events.morning.item3.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {t.events.morning.item3.desc}
                </p>
              </motion.div>

              {/* Item 4 */}
              <motion.div variants={itemVariants} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-[#D4AF37] rounded-full z-10"></div>
                <h4 className="font-bold text-[#8B0000] text-lg">
                  {t.events.morning.item4.time}
                </h4>
                <p className="font-medium text-slate-800">
                  {t.events.morning.item4.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {t.events.morning.item4.desc}
                </p>
              </motion.div>

              {/* Item 5 */}
              <motion.div variants={itemVariants} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-[#D4AF37] rounded-full z-10"></div>
                <h4 className="font-bold text-[#8B0000] text-lg">
                  {t.events.morning.item5.time}
                </h4>
                <p className="font-medium text-slate-800">
                  {t.events.morning.item5.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {t.events.morning.item5.desc}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Evening Reception Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group bg-[#8B0000] text-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-fit lg:sticky lg:top-24"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-500">
                <Music className="w-6 h-6 text-white group-hover:text-[#8B0000] transition-colors" />
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {t.events.evening.title}
                </h3>
                <p className="text-white/70 font-medium uppercase tracking-wide text-xs sm:text-sm">
                  {t.events.evening.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-white/90">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-lg">
                    {t.events.evening.item1.time}
                  </p>
                  <p className="text-white/80">{t.events.evening.item1.desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Music className="w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-lg">
                    {t.events.evening.item2.time}
                  </p>
                  <p className="text-white/80">{t.events.evening.item2.desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-lg">
                    {t.events.evening.location.title}
                  </p>
                  <p className="text-white/80">
                    {t.events.evening.location.name}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {t.events.evening.location.detail}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="italic text-white/80">{t.events.evening.quote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

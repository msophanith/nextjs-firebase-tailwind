"use client";

import { Heart, Sparkles, Gift } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, Variants } from "framer-motion";

export default function LoveStorySection() {
  const { t } = useLanguage();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8B0000]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Heart className="w-8 h-8 text-[#8B0000] mx-auto mb-4 animate-pulse" />
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t.loveStory.title}
          </h2>
          <p className="text-slate-500 italic">{t.loveStory.subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Adjusted for mobile */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 bg-[#D4AF37]/20"
          ></motion.div>

          <div className="space-y-12 sm:space-y-24">
            {/* Story Item 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="relative flex flex-col sm:flex-row items-center justify-between gap-8 group"
            >
              <div className="w-full sm:w-5/12 text-left sm:text-right pl-12 sm:pl-0 order-2 sm:order-1">
                <h3
                  className="text-xl font-bold text-[#8B0000]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {t.loveStory.firstMet.title}
                </h3>
                <p className="text-[#D4AF37] text-sm font-bold mb-2">
                  {t.loveStory.firstMet.date}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.loveStory.firstMet.description}
                </p>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-2 border-[#D4AF37] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500 order-1 sm:order-2">
                <Heart className="w-4 h-4 text-[#8B0000] fill-[#8B0000]" />
              </div>
              <div className="hidden sm:block w-5/12 order-3"></div>
            </motion.div>

            {/* Story Item 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="relative flex flex-col sm:flex-row items-center justify-between gap-8 group"
            >
              <div className="hidden sm:block w-5/12 order-3 sm:order-1"></div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-2 border-[#D4AF37] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500 order-1 sm:order-2">
                <Sparkles className="w-4 h-4 text-[#8B0000]" />
              </div>
              <div className="w-full sm:w-5/12 text-left sm:text-left pl-12 sm:pl-0 order-2 sm:order-3">
                <h3
                  className="text-xl font-bold text-[#8B0000]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {t.loveStory.firstDate.title}
                </h3>
                <p className="text-[#D4AF37] text-sm font-bold mb-2">
                  {t.loveStory.firstDate.date}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.loveStory.firstDate.description}
                </p>
              </div>
            </motion.div>

            {/* Story Item 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="relative flex flex-col sm:flex-row items-center justify-between gap-8 group"
            >
              <div className="w-full sm:w-5/12 text-left sm:text-right pl-12 sm:pl-0 order-2 sm:order-1">
                <h3
                  className="text-xl font-bold text-[#8B0000]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {t.loveStory.proposal.title}
                </h3>
                <p className="text-[#D4AF37] text-sm font-bold mb-2">
                  {t.loveStory.proposal.date}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.loveStory.proposal.description}
                </p>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-2 border-[#D4AF37] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500 order-1 sm:order-2">
                <Gift className="w-4 h-4 text-[#8B0000]" />
              </div>
              <div className="hidden sm:block w-5/12 order-3"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

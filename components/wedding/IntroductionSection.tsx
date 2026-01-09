import { useLanguage } from "./LanguageContext";
import { motion, Variants } from "framer-motion";

export default function IntroductionSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.img
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="/khmer-border.png"
          className="w-24 h-24 mx-auto mb-6 opacity-60 rotate-180"
          alt="ornament"
        />
        <motion.h2
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.intro.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-slate-600 leading-relaxed text-lg mb-12 max-w-2xl mx-auto"
        >
          {t.intro.quote}
        </motion.p>

        {/* Elegant Invitation Card */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white p-8 sm:p-16 rounded-3xl shadow-2xl border border-[#D4AF37]/10 mx-auto overflow-hidden"
        >
          {/* Traditional Khmer Corner Frames */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              <path
                d="M100 2 H24 A22 22 0 0 0 2 24 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path
                d="M100 8 H30 A22 22 0 0 0 8 30 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.4"
              />
              {/* Khmer Ornament Detail */}
              <circle cx="2" cy="24" r="1.5" fill="#D4AF37" />
              <circle cx="24" cy="2" r="1.5" fill="#D4AF37" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none p-4 rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              <path
                d="M100 2 H24 A22 22 0 0 0 2 24 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path
                d="M100 8 H30 A22 22 0 0 0 8 30 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.4"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none p-4 -rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              <path
                d="M100 2 H24 A22 22 0 0 0 2 24 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path
                d="M100 8 H30 A22 22 0 0 0 8 30 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.4"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none p-4 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              <path
                d="M100 2 H24 A22 22 0 0 0 2 24 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path
                d="M100 8 H30 A22 22 0 0 0 8 30 V100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.4"
              />
            </svg>
          </div>

          <div className="relative z-10 space-y-12">
            <motion.p
              variants={itemVariants}
              className="text-slate-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
            >
              {t.intro.together}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 items-start">
              {/* Groom's Family */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-1">
                  <h3
                    className="text-2xl sm:text-3xl text-slate-800 font-semibold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Mr. Chan Sothea
                  </h3>
                  <h3
                    className="text-2xl sm:text-3xl text-slate-800 font-semibold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Mrs. Keo Bopha
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-10 bg-[#D4AF37]/30" />
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">
                    {t.intro.groomParents}
                  </p>
                  <div className="h-[1px] w-10 bg-[#D4AF37]/30" />
                </div>
              </motion.div>

              {/* Bride's Family */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-1">
                  <h3
                    className="text-2xl sm:text-3xl text-slate-800 font-semibold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Mr. Sok Visal
                  </h3>
                  <h3
                    className="text-2xl sm:text-3xl text-slate-800 font-semibold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Mrs. Lim Maly
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-10 bg-[#D4AF37]/30" />
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">
                    {t.intro.brideParents}
                  </p>
                  <div className="h-[1px] w-10 bg-[#D4AF37]/30" />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="py-4">
              <p className="text-slate-400 font-serif italic text-xl sm:text-2xl leading-relaxed max-w-lg mx-auto">
                {t.intro.request}
              </p>
            </motion.div>

            {/* Couple Names */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-3">
                <h2
                  className="text-6xl sm:text-8xl text-[#8B0000]"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Chan Sokha
                </h2>
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-bold">
                  {t.intro.groom}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-8"
              >
                <div className="h-[1px] w-20 sm:w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                <span className="font-serif text-[#D4AF37] text-3xl italic">
                  &
                </span>
                <div className="h-[1px] w-20 sm:w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <h2
                  className="text-6xl sm:text-8xl text-[#8B0000]"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Sok Devi
                </h2>
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-bold">
                  {t.intro.bride}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

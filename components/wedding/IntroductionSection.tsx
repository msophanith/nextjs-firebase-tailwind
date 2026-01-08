import { useLanguage } from "./LanguageContext";

export default function IntroductionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/khmer-border.png"
          className="w-24 h-24 mx-auto mb-6 opacity-60 rotate-180"
          alt="ornament"
        />
        <h2
          className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.intro.title}
        </h2>
        <p className="text-slate-600 leading-relaxed text-lg mb-12 max-w-2xl mx-auto">
          {t.intro.quote}
        </p>

        {/* Elegant Invitation Card */}
        <div className="relative bg-white p-8 sm:p-16 rounded-xl shadow-2xl border border-[#D4AF37]/20 mx-auto overflow-hidden">
          {/* Corner Ornaments */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-[3px] border-l-[3px] border-[#D4AF37] rounded-tl-3xl m-4 opacity-60" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-[3px] border-r-[3px] border-[#D4AF37] rounded-tr-3xl m-4 opacity-60" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-[3px] border-l-[3px] border-[#D4AF37] rounded-bl-3xl m-4 opacity-60" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[3px] border-r-[3px] border-[#D4AF37] rounded-br-3xl m-4 opacity-60" />

          <div className="relative z-10 space-y-10">
            <p className="text-slate-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-medium">
              {t.intro.together}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-start">
              {/* Groom's Family */}
              <div className="space-y-3">
                <h3
                  className="text-xl sm:text-2xl text-slate-800 font-medium"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mr. Chan Sothea
                </h3>
                <h3
                  className="text-xl sm:text-2xl text-slate-800 font-medium"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mrs. Keo Bopha
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-px w-8 bg-[#D4AF37]/40" />
                  <p className="text-[#D4AF37] text-xs uppercase tracking-widest">
                    {t.intro.groomParents}
                  </p>
                  <div className="h-px w-8 bg-[#D4AF37]/40" />
                </div>
              </div>

              {/* Bride's Family */}
              <div className="space-y-3">
                <h3
                  className="text-xl sm:text-2xl text-slate-800 font-medium"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mr. Sok Visal
                </h3>
                <h3
                  className="text-xl sm:text-2xl text-slate-800 font-medium"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mrs. Lim Maly
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-px w-8 bg-[#D4AF37]/40" />
                  <p className="text-[#D4AF37] text-xs uppercase tracking-widest">
                    {t.intro.brideParents}
                  </p>
                  <div className="h-px w-8 bg-[#D4AF37]/40" />
                </div>
              </div>
            </div>

            <div className="py-2">
              <p className="text-slate-400 font-serif italic text-lg sm:text-xl">
                {t.intro.request}
              </p>
            </div>

            {/* Couple Names */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2
                  className="text-5xl sm:text-7xl text-[#8B0000]"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Chan Sokha
                </h2>
                <p className="text-[#D4AF37] text-sm uppercase tracking-[0.3em]">
                  {t.intro.groom}
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 opacity-60">
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <span className="font-serif text-[#D4AF37] text-2xl italic">
                  &
                </span>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>

              <div className="space-y-2">
                <h2
                  className="text-5xl sm:text-7xl text-[#8B0000]"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Sok Devi
                </h2>
                <p className="text-[#D4AF37] text-sm uppercase tracking-[0.3em]">
                  {t.intro.bride}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

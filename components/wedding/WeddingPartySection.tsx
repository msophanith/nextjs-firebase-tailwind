import { useLanguage } from "./LanguageContext";

export default function WeddingPartySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t.party.title}
          </h2>
          <p className="text-slate-500 italic">{t.party.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Groomsmen */}
          <div className="space-y-8">
            <div className="text-center border-b border-[#D4AF37]/20 pb-4 mb-8">
              <h3
                className="text-2xl font-bold text-slate-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {t.party.groomsmen}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Best Man */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-[#8B0000]">Dara Sok</h4>
                <p className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">
                  {t.party.bestMan}
                </p>
              </div>

              {/* Groomsman 1 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-700">Vibol Chea</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {t.party.groomsman}
                </p>
              </div>

              {/* Groomsman 2 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-700">Rithy Chan</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {t.party.groomsman}
                </p>
              </div>

              {/* Groomsman 3 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-700">Sambath Keo</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {t.party.groomsman}
                </p>
              </div>
            </div>
          </div>

          {/* Bridesmaids */}
          <div className="space-y-8">
            <div className="text-center border-b border-[#D4AF37]/20 pb-4 mb-8">
              <h3
                className="text-2xl font-bold text-slate-800"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {t.party.bridesmaids}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Maid of Honor */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-[#8B0000]">Bopha Lim</h4>
                <p className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">
                  {t.party.maidOfHonor}
                </p>
              </div>

              {/* Bridesmaid 1 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-700">Sophea Chan</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {t.party.bridesmaid}
                </p>
              </div>

              {/* Bridesmaid 2 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-700">Kanya So</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {t.party.bridesmaid}
                </p>
              </div>

              {/* Bridesmaid 3 */}
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                    <span className="text-xs uppercase font-bold">Photo</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-700">Leakena Tep</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {t.party.bridesmaid}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

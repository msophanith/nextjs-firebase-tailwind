import { Shirt } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function DressCodeSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-4">
          <Shirt className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2
          className="text-3xl sm:text-4xl font-bold text-[#8B0000] mb-12"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t.dressCode.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Morning Attire */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/20">
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
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] shadow-md border-2 border-white ring-1 ring-[#D4AF37]/30"></div>
                <span className="text-xs text-slate-500">
                  {t.dressCode.morning.colors.gold}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#F5E6D3] shadow-md border-2 border-white ring-1 ring-[#D4AF37]/30"></div>
                <span className="text-xs text-slate-500">
                  {t.dressCode.morning.colors.cream}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#E6B8B8] shadow-md border-2 border-white ring-1 ring-[#D4AF37]/30"></div>
                <span className="text-xs text-slate-500">
                  {t.dressCode.morning.colors.rose}
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.dressCode.morning.desc}
            </p>
          </div>

          {/* Evening Attire */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/20">
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
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#8B0000] shadow-md border-2 border-white ring-1 ring-[#8B0000]/30"></div>
                <span className="text-xs text-slate-500">
                  {t.dressCode.evening.colors.burgundy}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] shadow-md border-2 border-white ring-1 ring-slate-200"></div>
                <span className="text-xs text-slate-500">
                  {t.dressCode.evening.colors.black}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#C0C0C0] shadow-md border-2 border-white ring-1 ring-slate-200"></div>
                <span className="text-xs text-slate-500">
                  {t.dressCode.evening.colors.silver}
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.dressCode.evening.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

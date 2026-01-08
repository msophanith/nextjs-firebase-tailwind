"use client";

import { Camera } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function PreWeddingGallery() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {/* Photo 1 Placeholder */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400">
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
          </div>

          {/* Photo 2 Placeholder - Staggered */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 md:mt-12 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400">
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
          </div>

          {/* Photo 3 Placeholder */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400">
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
          </div>
        </div>
      </div>
    </section>
  );
}

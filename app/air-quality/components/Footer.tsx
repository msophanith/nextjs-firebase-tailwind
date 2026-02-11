"use client";

import { Language } from "../types";

interface FooterProps {
  readonly t: any;
  readonly language: Language;
}

export function Footer({ t, language }: FooterProps) {
  return (
    <div className="mt-20 pt-12 border-t border-dashed border-gray-200 text-center pb-12 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-pink-100/20 to-purple-100/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="flex flex-col items-center gap-6 group">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-blue-50 text-[10px] font-bold text-blue-400 tracking-wider uppercase shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></div>
          {t.source}
        </div>

        <div className="relative cursor-default transform transition-all duration-500 group-hover:scale-110">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-gray-500/80 italic">
              {language === "km" ? "រៀបចំឡើងដោយ" : "Handcrafted with"}
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-gradient-to-r from-transparent to-pink-300"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
                {language === "km" ? "❤️ ពី Jay" : "Jay ❤️"}
              </span>
              <div className="h-px w-6 bg-gradient-to-l from-transparent to-pink-300"></div>
            </div>
          </div>

          <div className="absolute -top-2 -right-4 text-amber-400 animate-bounce delay-100">
            ✨
          </div>
          <div className="absolute -bottom-1 -left-4 text-pink-400 animate-bounce">
            ✨
          </div>
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-pink-200 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

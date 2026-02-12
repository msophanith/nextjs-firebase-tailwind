"use client";

import { Language } from "../types";
import { Heart, Globe } from "lucide-react";

interface FooterProps {
  readonly t: any;
  readonly language: Language;
}

export function Footer({ t, language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 pt-20 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative localized glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="flex flex-col items-center gap-12 max-w-4xl mx-auto px-6">
        {/* Source Badge */}
        <div className="group flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-gray-50 border border-gray-100 text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
            <Globe className="w-3 h-3 text-blue-500 animate-pulse" />
            {t.source}
          </div>
        </div>

        {/* Brand & Made By */}
        <div className="flex flex-col items-center text-center gap-8">
          <div className="space-y-2">
            <h4 className="text-xl font-black text-gray-900 tracking-tight">
              AirQuality Live
            </h4>
            <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">
              Real-time environmental monitoring for a healthier tomorrow.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                Handcrafted by
              </span>
              <a
                href="https://portfolio-sophanithmey.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group/name cursor-pointer"
              >
                <span className="text-sm font-black text-gray-800 border-b-2 border-transparent group-hover/name:border-rose-500 transition-all duration-300">
                  Jay
                </span>
                <Heart
                  className="w-4 h-4 text-rose-500 group-hover/name:scale-125 transition-transform"
                  fill="currentColor"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between py-10 border-t border-gray-50 gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            © {currentYear} All Rights Reserved
          </p>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-100" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

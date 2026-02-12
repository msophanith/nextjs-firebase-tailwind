"use client";

import { Calendar, ChevronRight, TrendingUp, Sparkles } from "lucide-react";
import { AirQualityData, Language } from "../types";
import { getAQILevel } from "../utils";

interface ForecastSectionProps {
  readonly forecast: AirQualityData["forecast"];
  readonly t: any;
  readonly language: Language;
  readonly stationUrl?: string;
}

export function ForecastSection({
  forecast,
  t,
  language,
  stationUrl,
}: ForecastSectionProps) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[60px] p-8 md:p-14 shadow-[0_60px_120px_rgba(0,0,0,0.08)] group/section">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 group-hover/section:scale-110 transition-transform duration-1000" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] shadow-[0_20px_40px_rgba(79,70,229,0.3)] ring-8 ring-indigo-50/50">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-relaxed tracking-tighter">
                {t.forecast.title}
              </h3>
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">
                Next 5-Day Trend Prediction
              </p>
            </div>
          </div>
        </div>

        {stationUrl && (
          <a
            href={stationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 font-black text-xs md:text-sm text-gray-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 active:scale-95 group/btn"
          >
            <span>VIEW DETAILED REPORT</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        )}
      </div>

      <div className="flex flex-row overflow-x-auto pb-8 gap-8 custom-scrollbar snap-x snap-mandatory lg:snap-none -mx-4 px-4 lg:mx-0 lg:px-0">
        {forecast.map((item, idx) => {
          const level = getAQILevel(item.avg);
          const date = new Date(item.day);
          const isTomorrow = idx === 0;

          return (
            <div
              key={item.day}
              className="flex-shrink-0 w-[300px] lg:flex-1 group relative flex flex-col items-center p-10 bg-white border border-gray-50 rounded-[54px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_60px_100px_rgba(0,0,0,0.12)] hover:-translate-y-4 transition-all duration-700 active:scale-95 group/card snap-center lg:snap-align-none"
            >
              {/* Card Hover Reveal Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${level.color} opacity-0 group-hover/card:opacity-[0.03] rounded-[54px] transition-opacity duration-700`}
              />

              <div className="flex flex-col items-center mb-8 relative z-10">
                <span className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-4 drop-shadow-sm">
                  {isTomorrow &&
                    (language === "km" ? t.forecast.tomorrow : "TOMORROW")}
                  {!isTomorrow &&
                    date.toLocaleDateString(
                      language === "km" ? "km-KH" : "en-US",
                      { weekday: "long" },
                    )}
                </span>

                <div className="text-3xl font-black text-gray-900 tracking-tighter">
                  {date.toLocaleDateString(
                    language === "km" ? "km-KH" : "en-US",
                    { month: "short", day: "numeric" },
                  )}
                </div>
              </div>

              <div
                className={`w-36 h-36 rounded-full ${level.bgColor} flex flex-col items-center justify-center mb-8 group-hover/card:scale-110 transition-all duration-700 relative shadow-inner border-[12px] border-white`}
              >
                {/* Active Indicator Dot */}
                <div
                  className={`absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-br ${level.color} shadow-[0_0_20px_rgba(0,0,0,0.2)] border-2 border-white animate-pulse`}
                />
                <span className="text-6xl font-black text-gray-900 tracking-tighter">
                  {item.avg}
                </span>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`px-8 py-3 rounded-2xl ${level.bgColor} ${level.textColor} shadow-[0_10px_25px_rgba(0,0,0,0.05)] border-2 border-white mb-6 group-hover/card:scale-110 transition-all duration-500`}
                >
                  <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap">
                    {t.aqiLevels[level.level as keyof typeof t.aqiLevels]}
                  </span>
                </div>

                <div className="flex items-center gap-2 group-hover/card:gap-3 transition-all duration-500 opacity-60">
                  <div className="h-px w-6 bg-gray-300" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                    Avg Index
                  </span>
                  <div className="h-px w-6 bg-gray-300" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
          border-radius: 20px;
          margin: 0 40px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #6366f1, #a855f7);
          border-radius: 20px;
          border: 2px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #4f46e5, #9333ea);
        }
      `}</style>
    </div>
  );
}
